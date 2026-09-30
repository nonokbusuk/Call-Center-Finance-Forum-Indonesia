<?php
// Endpoint form kontak (dipanggil dari halaman statis via fetch)
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method tidak diizinkan']);
    exit;
}

require_once __DIR__ . '/../includes/db.php';

// Izinkan dipanggil dari domain sendiri (sesuaikan bila perlu)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Vary: Origin');

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'Umum') ?: 'Umum';
$message = trim($input['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Nama, email valid, dan pesan wajib diisi']);
    exit;
}

if (strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Pesan terlalu panjang']);
    exit;
}

db_query(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [substr($name, 0, 150), substr($email, 0, 150), substr($subject, 0, 200), $message]
);

echo json_encode(['ok' => true]);
