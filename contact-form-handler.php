<?php
/* ============================================================
   DES CONTACT FORM — server-side mail handler
   ------------------------------------------------------------
   Submissions are emailed directly to the address below using
   PHP's built-in mail() function. No third-party form service
   (e.g. FormSubmit.co) is used.

   REQUIREMENTS:
   - This file must be uploaded to a PHP-enabled web server
     (PHP 7+). Static hosts (e.g. GitHub Pages) cannot run it.
   - The server's mail() function must be configured to send
     mail (true on most shared hosting; on some servers you may
     need to set sendmail_path in php.ini, or switch the
     mail() call below to SMTP via PHPMailer if your host
     blocks the local mail() function).

   To change WHERE submissions are sent, edit RECIPIENT_EMAIL
   below. That is the only place the destination address lives.
   ============================================================ */

// ---- Config ----
const RECIPIENT_EMAIL = 'info@desglobal.com';
const SITE_NAME       = 'Dynamic Energy Systems';

// ---- Basic setup ----
header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Accept either JSON body (fetch with Content-Type: application/json)
// or a normal urlencoded/multipart form POST.
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: [];
} else {
    $data = $_POST;
}

// ---- Honeypot spam trap ----
// Real visitors never see or fill this field; bots often do.
if (!empty($data['_honey'])) {
    // Silently pretend success so the bot doesn't try again.
    echo json_encode(['success' => true]);
    exit;
}

// ---- Helper: sanitize a single-line field ----
function clean_line($value) {
    $value = is_string($value) ? $value : '';
    $value = str_replace(["\r", "\n"], ' ', $value); // strip header-injection newlines
    return trim($value);
}

// ---- Collect + validate fields ----
$firstName = clean_line($data['First_Name'] ?? '');
$lastName  = clean_line($data['Last_Name'] ?? '');
$company   = clean_line($data['Company'] ?? '');
$role      = clean_line($data['Role'] ?? '');
$email     = clean_line($data['Email'] ?? '');
$phone     = clean_line($data['Phone'] ?? '');
$inquiry   = clean_line($data['Inquiry_Type'] ?? '');
$urgency   = clean_line($data['urgency'] ?? '');
$details   = is_string($data['Facility_Details'] ?? '') ? trim($data['Facility_Details']) : '';

$required = [
    'First_Name'       => $firstName,
    'Last_Name'        => $lastName,
    'Company'          => $company,
    'Email'            => $email,
    'Phone'            => $phone,
    'Facility_Details' => $details,
];

$missing = [];
foreach ($required as $label => $value) {
    if ($value === '') { $missing[] = $label; }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $missing[] = 'Email (invalid format)';
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => 'Missing or invalid required field(s): ' . implode(', ', $missing),
    ]);
    exit;
}

// ---- Build the email ----
$subject = 'New Website Inquiry - DES Contact Form';

$bodyLines = [
    'A new inquiry was submitted through the ' . SITE_NAME . ' website contact form.',
    '',
    'First Name:        ' . $firstName,
    'Last Name:         ' . $lastName,
    'Company / Facility: ' . $company,
    'Role:               ' . ($role !== '' ? $role : '-'),
    'Email:              ' . $email,
    'Phone:              ' . $phone,
    'Nature of Inquiry:  ' . ($inquiry !== '' ? $inquiry : '-'),
    'Response Priority:  ' . ($urgency !== '' ? $urgency : '-'),
    '',
    'Facility Details:',
    $details,
    '',
    '---',
    'Submitted: ' . date('Y-m-d H:i:s T'),
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
];
$body = implode("\n", $bodyLines);

// Headers: From uses the site's own domain (many mail servers reject/spam-flag
// a From: address it does not control); Reply-To is set to the visitor so
// hitting "Reply" in the inbox goes straight back to them.
$fromDomain = $_SERVER['SERVER_NAME'] ?? 'desglobal.com';
$fromAddress = 'website@' . $fromDomain;

$headers   = [];
$headers[] = 'From: ' . SITE_NAME . ' Website <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . $firstName . ' ' . $lastName . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

// ---- Send ----
$sent = @mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'The mail server could not send the message. Please try again or email us directly.',
    ]);
}
