<?php
// API publik: direktori perusahaan finance + pencarian keyword
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../includes/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $category = trim($_GET['category'] ?? '');
    $search = trim($_GET['q'] ?? '');

    $where = 'published = 1';
    $params = [];
    if ($category !== '') {
        $where .= ' AND category = ?';
        $params[] = $category;
    }
    if ($search !== '') {
        $where .= ' AND (name LIKE ? OR category LIKE ? OR description LIKE ?)';
        $like = '%' . $search . '%';
        array_push($params, $like, $like, $like);
    }

    $companies = db_fetch_all(
        "SELECT name, slug, category, phone, whatsapp, email, website, address, description, rating, is_verified, is_featured
         FROM finance_companies WHERE $where
         ORDER BY is_featured DESC, is_verified DESC, rating DESC, name ASC",
        $params
    );

    // catat keyword pencarian publik untuk trend tracker
    if ($search !== '') {
        $existing = db_fetch_one('SELECT id FROM keywords WHERE keyword = ?', [$search]);
        if ($existing) {
            db_query('INSERT INTO keyword_searches (keyword_id, source) VALUES (?, ?)', [(int) $existing['id'], 'public']);
        } else {
            db_query('INSERT INTO keywords (keyword, category) VALUES (?, ?)', [$search, 'pencarian publik']);
            db_query('INSERT INTO keyword_searches (keyword_id, source) VALUES (?, ?)', [db_last_id(), 'public']);
        }
    }

    echo json_encode(['ok' => true, 'companies' => $companies]);
    exit;
}

http_response_code(405);
echo json_encode(['ok' => false, 'error' => 'Method tidak diizinkan']);
