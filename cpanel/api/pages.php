<?php
// API publik: halaman CMS + menu navigasi
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$slug = trim($_GET['slug'] ?? '');

if ($slug !== '') {
    $page = db_fetch_one('SELECT title, slug, content, meta_title, meta_description FROM pages WHERE slug = ? AND published = 1', [$slug]);
    echo json_encode(['ok' => true, 'page' => $page]);
    exit;
}

$pages = db_fetch_all('SELECT title, slug, meta_title, meta_description FROM pages WHERE published = 1 ORDER BY title ASC');
$menus = db_fetch_all('SELECT label, url, location FROM menu_items WHERE is_active = 1 ORDER BY location ASC, sort_order ASC');

echo json_encode(['ok' => true, 'pages' => $pages, 'menus' => $menus]);
