<?php
// API publik: catat keyword pencarian pelanggan dari site search halaman statis
// Dipanggil tiap kali pengunjung mencari di halaman publik.
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$kw = trim($input['keyword'] ?? '');

if ($kw === '' || strlen($kw) > 255) {
    echo json_encode(['ok' => false]);
    exit;
}

$category = trim($input['category'] ?? 'pencarian publik') ?: 'pencarian publik';

$existing = db_fetch_one('SELECT id FROM keywords WHERE keyword = ?', [$kw]);
if ($existing) {
    $kid = (int) $existing['id'];
} else {
    db_query('INSERT INTO keywords (keyword, category) VALUES (?, ?)', [$kw, $category]);
    $kid = db_last_id();
}
db_query('INSERT INTO keyword_searches (keyword_id, source) VALUES (?, ?)', [$kid, 'public']);

echo json_encode(['ok' => true]);
