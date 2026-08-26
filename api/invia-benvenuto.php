<?php
/**
 * AppUnic - Endpoint Invio Email di Benvenuto (post conferma email)
 * Endpoint: /api/invia-benvenuto.php
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

$nome       = isset($data['nome']) ? trim($data['nome']) : 'Utente';
$cognome    = isset($data['cognome']) ? trim($data['cognome']) : '';
$email      = isset($data['email']) ? trim($data['email']) : '';
$telefono   = isset($data['telefono']) ? trim($data['telefono']) : '';
$licenseKey = isset($data['license']) ? trim($data['license']) : ('APPU-' . strtoupper(substr(md5($email . 'SALT'), 0, 4)) . '-' . strtoupper(substr(md5($email . 'KEY'), 0, 4)));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Email non valida.']);
    exit;
}

$subject = "Benvenuto in AppUnic! 🎉 La tua suite personale e privata è attiva";

$html = '
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #FBF7EF; color: #1A1714; margin: 0; padding: 20px; line-height: 1.6; }
    .wrapper { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; border: 1px solid #E4DACA; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
    .header { background: #1A1714; color: #ffffff; padding: 32px 28px; text-align: center; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px; color: #FF6A2B; }
    .header p { margin: 8px 0 0 0; color: #D1C7BD; font-size: 14px; }
    .content { padding: 32px 28px; }
    .badge { display: inline-block; background: #E2F1E6; color: #1F7A4D; font-weight: 700; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 15px; }
    .box-privato { background: #FFF8F2; border-left: 4px solid #FF6A2B; padding: 16px 20px; border-radius: 8px; margin: 24px 0; }
    .box-licenza { background: #faf8f5; border: 1px dashed #E4DACA; border-radius: 12px; padding: 18px; text-align: center; margin: 24px 0; }
    .key-text { font-family: monospace; font-size: 20px; font-weight: bold; color: #FF6A2B; letter-spacing: 2px; }
    .moduli-grid { margin: 20px 0; }
    .modulo-item { margin-bottom: 12px; font-size: 14px; }
    .modulo-item strong { color: #1A1714; }
    .btn-cta { display: inline-block; background: #FF6A2B; color: #ffffff !important; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 10px; margin: 15px 0; text-align: center; }
    .footer { background: #faf8f5; border-top: 1px solid #E4DACA; padding: 20px; text-align: center; font-size: 12px; color: #8A8178; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>AppUnic</h1>
      <p>Tutta la tua vita quotidiana, protetta e senza pensieri.</p>
    </div>

    <div class="content">
      <span class="badge">✓ EMAIL CONFERMATA & ACCOUNT ATTIVO</span>
      <h2 style="margin-top:0; font-size: 22px;">Ciao ' . htmlspecialchars($nome) . ', benvenuto/a in AppUnic! 👋</h2>
      
      <p>Siamo davvero felici di averti a bordo. Abbiamo creato <strong>AppUnic</strong> per offrirti una piattaforma unica e potente capace di aiutarti nella gestione pratica di tutti i giorni: dal risparmio sulle bollette alla spesa intelligente, dalla pianificazione finanziaria alla cura dei tuoi ricordi e della tua salute.</p>

      <div class="box-privato">
        <h3 style="margin-top: 0; color: #E24E12; font-size: 16px;">🛡️ Il Nostro Grande Punto di Forza: La Privacy Zero-Server</h3>
        <p style="margin: 0; font-size: 14px;">A differenza di qualsiasi altro servizio sul web, <strong>AppUnic non invia e non memorizza i tuoi documenti, conti, scontrini o note personali su server centrali</strong>.<br><br>
        Tutti i tuoi dati restano custoditi <strong>esclusivamente sul tuo dispositivo</strong>. Nessun tracciamento nascosto, nessuna vendita di informazioni a terzi: la tua riservatezza è protetta al 100% per principio tecnologico.</p>
      </div>

      <h3 style="font-size: 16px; margin-bottom: 10px;">I moduli attivi a tua disposizione:</h3>
      <div class="moduli-grid">
        <div class="modulo-item">⚡ <strong>Confronto Bollette:</strong> Verifica la correttezza dei costi di luce e gas e confrontali col catalogo ufficiale ARERA.</div>
        <div class="modulo-item">🛒 <strong>SpesaSmart:</strong> Fotografa i tuoi scontrini per indicizzare i prodotti e tracciare la spesa alimentare con l\'IA.</div>
        <div class="modulo-item">💰 <strong>Finanze Personali:</strong> Gestisci conti, carte, entrate e crea le tue buste di spesa con budget chiaro e subtotali automatici.</div>
        <div class="modulo-item">📅 <strong>Organizzazione & Task:</strong> Gestisci promemoria, scadenze e notifiche vocali.</div>
        <div class="modulo-item">💊 <strong>Memorie & Diario:</strong> Salva farmaci, contatti d\'emergenza, ristoranti e luoghi preferiti in totale riservatezza.</div>
        <div class="modulo-item">🧠 <strong>Cervello Vocale IA:</strong> Collega gratuitamente la tua chiave Google Gemini per parlare liberamente con l\'assistente.</div>
      </div>

      <div class="box-licenza">
        <div style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">La tua Licenza Personale Attiva</div>
        <div class="key-text">' . htmlspecialchars($licenseKey) . '</div>
        <div style="font-size: 12px; color: #888; margin-top: 4px;">Account: ' . htmlspecialchars($email) . '</div>
      </div>

      <div style="text-align: center;">
        <a href="https://www.appunic.com/area-personale.html" class="btn-cta">Accedi alla tua Area Personale →</a>
      </div>

      <p style="font-size: 13px; color: #666; margin-top: 25px;">Per qualsiasi necessità o riscontro, puoi rispondere direttamente a questa email.</p>
      <p style="margin-bottom: 0;">A presto,<br><strong>Il Team di AppUnic</strong><br><span style="font-size: 12px; color: #888;">www.appunic.com</span></p>
    </div>

    <div class="footer">
      Ricevi questa email perché hai confermato il tuo account su AppUnic.<br>
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
    'success'   => true,
    'message'   => 'Email di benvenuto inviata con successo.',
    'mail_sent' => $mailSent
]);
