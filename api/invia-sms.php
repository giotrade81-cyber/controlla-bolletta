<?php
/**
 * AppUnic - Gateway Invio SMS OTP via Aruba SMS
 * Endpoint: /api/invia-sms.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Metodo non consentito. Richiesto POST.']);
    exit;
}

// -------------------------------------------------------------
// CONFIGURAZIONE CREDENZIALI ARUBA SMS
// Inserisci qui le tue credenziali del pannello Aruba SMS
// -------------------------------------------------------------
$ARUBA_CONFIG = [
    'username' => 'TUO_USERNAME_ARUBA', // Es: 'SMS012345' o username pannello
    'password' => 'TUA_PASSWORD_ARUBA', // La password del servizio SMS Aruba
    'sender'   => 'AppUnic',            // Mittente personalizzato (certificato su Aruba) o lascia vuoto per mittente standard
    'type'     => 'GP'                  // GP = Alta Qualità / Notifica immediata con mittente
];

// Lettura Payload JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$telefono = isset($data['telefono']) ? trim($data['telefono']) : '';
$nome     = isset($data['nome']) ? trim($data['nome']) : 'Utente';
$cognome  = isset($data['cognome']) ? trim($data['cognome']) : '';
$email    = isset($data['email']) ? trim($data['email']) : '';

if (empty($telefono)) {
    echo json_encode(['success' => false, 'error' => 'Numero di telefono mancante.']);
    exit;
}

// Normalizzazione numero telefono (standard internazionale es: +393331234567)
$telefonoPulito = preg_replace('/[^0-9+]/', '', $telefono);
if (strpos($telefonoPulito, '+') !== 0 && strpos($telefonoPulito, '00') !== 0) {
    if (strlen($telefonoPulito) === 10 && strpos($telefonoPulito, '3') === 0) {
        $telefonoPulito = '+39' . $telefonoPulito;
    }
}

// Generazione Codice OTP a 6 cifre
$otp = (string)random_int(100000, 999999);

// Salvataggio temporaneo OTP per la successiva verifica (usando sessione o file cache)
session_start();
$_SESSION['APPUNIC_OTP_' . $telefonoPulito] = [
    'code'       => $otp,
    'nome'       => $nome,
    'cognome'    => $cognome,
    'email'      => $email,
    'telefono'   => $telefonoPulito,
    'created_at' => time(),
    'expires_at' => time() + 600 // Valido 10 minuti
];

// Salva anche su cache temporanea su disco nel caso di chiamate stateless/senza cookie
$cacheDir = __DIR__ . '/../scratch/otp_cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0777, true);
}
$safeTelKey = md5($telefonoPulito);
file_put_contents($cacheDir . '/' . $safeTelKey . '.json', json_encode([
    'code'       => $otp,
    'telefono'   => $telefonoPulito,
    'nome'       => $nome,
    'cognome'    => $cognome,
    'email'      => $email,
    'expires_at' => time() + 600
]));

$testoMessaggio = "AppUnic: Il tuo codice di verifica è $otp. Valido per 10 minuti.";

// -------------------------------------------------------------
// CHIAMATA API REST ARUBA SMS
// -------------------------------------------------------------
$arubaApiBase = 'https://smspanel.aruba.it/API/v1.0/REST';

// Se non sono ancora configurate le credenziali reali, ritorna modalità simulata protetta
if ($ARUBA_CONFIG['username'] === 'TUO_USERNAME_ARUBA') {
    echo json_encode([
        'success' => true,
        'simulated' => true,
        'message' => 'Richiesta ricevuta. Inserisci le tue credenziali in api/invia-sms.php per la spedizione su rete GSM.',
        'telefono' => $telefonoPulito
    ]);
    exit;
}

// 1. Step Login Aruba SMS
$ch = curl_init($arubaApiBase . '/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'username' => $ARUBA_CONFIG['username'],
    'password' => $ARUBA_CONFIG['password']
]));
$loginRes = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$loginData = json_decode($loginRes, true);

if ($httpCode !== 200 || !isset($loginData['user_key']) || !isset($loginData['Session_key'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Autenticazione Aruba SMS fallita. Controlla username e password nel file invia-sms.php.',
        'aruba_response' => $loginData
    ]);
    exit;
}

$userKey    = $loginData['user_key'];
$sessionKey = $loginData['Session_key'];

// 2. Step Invio SMS
$smsPayload = [
    'message_type' => $ARUBA_CONFIG['type'],
    'message'      => $testoMessaggio,
    'recipient'    => [$telefonoPulito]
];

if (!empty($ARUBA_CONFIG['sender'])) {
    $smsPayload['sender'] = $ARUBA_CONFIG['sender'];
}

$ch = curl_init($arubaApiBase . '/sms');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'user_key: ' . $userKey,
    'Session_key: ' . $sessionKey
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($smsPayload));
$smsRes = curl_exec($ch);
$smsHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$smsData = json_decode($smsRes, true);

if ($smsHttpCode === 200 || $smsHttpCode === 201) {
    echo json_encode([
        'success' => true,
        'message' => 'SMS inviato con successo tramite Aruba SMS.',
        'telefono' => $telefonoPulito
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Errore durante la spedizione SMS con Aruba.',
        'details' => $smsData
    ]);
}
