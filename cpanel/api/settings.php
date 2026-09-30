<?php
// API publik: pengaturan situs (dipanggil halaman statis via fetch)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/settings.php';

echo json_encode(['ok' => true, 'settings' => get_all_settings()]);
