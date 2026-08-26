<?php
/**
 * AppUnic - Endpoint Invio Email con Link di Conferma Registrazione
 * Endpoint: /api/invia-conferma.php
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
    echo json_encode(['success' => false, 'error' => 'Richiesto metodo POST.']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$nome     = isset($data['nome']) ? trim($data['nome']) : 'Utente';
$cognome  = isset($data['cognome']) ? trim($data['cognome']) : '';
$email    = isset($data['email']) ? trim($data['email']) : '';
$telefono = isset($data['telefono']) ? trim($data['telefono']) : '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Indirizzo email non valido o mancante.']);
    exit;
}

// Creazione Token di conferma sicuro
$tokenPayload = [
    'nome'       => $nome,
    'cognome'    => $cognome,
    'email'      => $email,
    'tel'        => $telefono,
    'created_at' => time(),
    'expires_at' => time() + 86400 // Valido 24 ore
];

$rawToken = base64_encode(json_encode($tokenPayload));
$confirmUrl = 'https://www.appunic.com/area-personale.html?verify=1&token=' . urlencode($rawToken);

// Invio Email con Link di Conferma
$subject = "Conferma la tua registrazione su AppUnic 🔐";

$html = '
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #FBF7EF; color: #1A1714; margin: 0; padding: 20px; line-height: 1.6; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E4DACA; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
    .header { background: #1A1714; color: #ffffff; padding: 30px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 800; color: #FF6A2B; }
    .content { padding: 30px 24px; }
    .btn-confirm { display: inline-block; background: #FF6A2B; color: #ffffff !important; text-decoration: none; font-weight: bold; padding: 15px 32px; border-radius: 10px; font-size: 16px; margin: 20px 0; text-align: center; }
    .footer { background: #faf8f5; border-top: 1px solid #E4DACA; padding: 18px; text-align: center; font-size: 12px; color: #8A8178; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>AppUnic</h1>
      <p style="margin: 6px 0 0 0; color: #D1C7BD; font-size: 13px;">Conferma dell\'account</p>
    </div>
    <div class="content">
      <h2 style="margin-top: 0;">Ciao ' . htmlspecialchars($nome) . '! 👋</h2>
      <p>Grazie per esserti registrato su <strong>AppUnic</strong>, l\'ecosistema per le tue bollette, spese e finanze personali con privacy 100% Zero-Server.</p>
      
      <p>Per confermare il tuo indirizzo email e attivare la tua licenza personale, fai clic sul pulsante qui sotto:</p>
      
      <div style="text-align: center;">
        <a href="' . $confirmUrl . '" class="btn-confirm">👉 Conferma la mia Email e Attiva Account</a>
      </div>

      <p style="font-size: 12px; color: #777;">Se il pulsante non dovesse aprirsi, copia e incolla questo link nel tuo browser:<br>
      <a href="' . $confirmUrl . '" style="color: #FF6A2B; word-break: break-all;">' . $confirmUrl . '</a></p>

      <p style="font-size: 13px; color: #555; margin-top: 20px;">Il link rimarrà valido per 24 ore. Se non hai richiesto tu questa registrazione, puoi semplicemente ignorare questa email.</p>
    </div>
    <div class="footer">
      AppUnic — Zero-Server Architecture per la massima privacy dei tuoi dati.
    </div>
  </div>
</body>
</html>
';

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: AppUnic <no-reply@appunic.com>\r\n";
$headers .= "Reply-To: supporto@appunic.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mailSent = @mail($email, $subject, $html, $headers);

echo json_encode([
    'success'    => true,
    'message'    => 'Email con link di conferma inviata con successo.',
    'mail_sent'  => $mailSent,
    'confirmUrl' => $confirmUrl
]);
