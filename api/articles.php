<?php
// Articles API - CRUD (admin) + public read
require __DIR__ . '/config.php';

session_name(SESSION_NAME);
session_start();

$method = $_SERVER['REQUEST_METHOD'];
$is_admin = !empty($_SESSION['admin_id']);

// GET: list (public) atau single article by slug (public)
if ($method === 'GET') {
  $slug = $_GET['slug'] ?? '';

  // Single article by slug
  if ($slug !== '') {
    $stmt = db()->prepare('SELECT * FROM articles WHERE slug = ? AND status = "published" LIMIT 1');
    $stmt->execute([$slug]);
    $article = $stmt->fetch();
    if (!$article) { json_out(['error' => 'Artikel tidak ditemukan'], 404); }

    // increment views
    db()->prepare('UPDATE articles SET views = views + 1 WHERE id = ?')->execute([$article['id']]);

    $article['tags'] = $article['tags'] ? array_map('trim', explode(',', $article['tags'])) : [];
    json_out(['article' => $article]);
  }

  // List (admin lihat semua, public hanya published)
  $where = $is_admin ? '' : 'WHERE status = "published"';
  $order = 'ORDER BY publish_date DESC, id DESC';
  $stmt = db()->query("SELECT id, title, slug, excerpt, author, category, tags, image, meta_title, meta_keywords, status, views, publish_date, read_time FROM articles $where $order");
  $rows = $stmt->fetchAll();
  foreach ($rows as &$r) {
    $r['tags'] = $r['tags'] ? array_map('trim', explode(',', $r['tags'])) : [];
  }
  json_out(['articles' => $rows, 'count' => count($rows)]);
}

// POST: create (admin only)
if ($method === 'POST' && $is_admin) {
  $data = body_json();
  $title = trim($data['title'] ?? '');
  if ($title === '') { json_out(['error' => 'Judul wajib diisi'], 400); }

  $slug = trim($data['slug'] ?? '') ?: slugify($title);

  // ensure unique slug
  $check = db()->prepare('SELECT id FROM articles WHERE slug = ? LIMIT 1');
  $check->execute([$slug]);
  if ($check->fetch()) {
    $slug = $slug . '-' . substr(uniqid(), -5);
  }

  $fields = [
    'title' => $title,
    'slug' => $slug,
    'excerpt' => trim($data['excerpt'] ?? ''),
    'content' => $data['content'] ?? '',
    'author' => trim($data['author'] ?? 'Tim Redaksi'),
    'category' => trim($data['category'] ?? 'Umum'),
    'tags' => is_array($data['tags'] ?? null) ? implode(',', $data['tags']) : trim($data['tags'] ?? ''),
    'image' => trim($data['image'] ?? ''),
    'meta_title' => trim($data['meta_title'] ?? $title),
    'meta_description' => trim($data['meta_description'] ?? ''),
    'meta_keywords' => is_array($data['meta_keywords'] ?? null) ? implode(',', $data['meta_keywords']) : trim($data['meta_keywords'] ?? ''),
    'canonical' => trim($data['canonical'] ?? SITE_URL . '/artikel/' . $slug . '/'),
    'og_title' => trim($data['og_title'] ?? $title),
    'og_description' => trim($data['og_description'] ?? trim($data['meta_description'] ?? '')),
    'status' => in_array($data['status'] ?? 'published', ['draft', 'published']) ? $data['status'] : 'published',
    'publish_date' => trim($data['publish_date'] ?? date('Y-m-d')) ?: date('Y-m-d'),
    'read_time' => (int)($data['read_time'] ?? 5),
  ];

  $cols = implode(',', array_keys($fields));
  $placeholders = implode(',', array_fill(0, count($fields), '?'));
  $stmt = db()->prepare("INSERT INTO articles ($cols) VALUES ($placeholders)");
  $stmt->execute(array_values($fields));
  $id = db()->lastInsertId();
  $fields['id'] = (int)$id;
  json_out(['success' => true, 'article' => $fields], 201);
}

// PUT: update (admin only)
if ($method === 'PUT' && $is_admin) {
  $data = body_json();
  $id = (int)($data['id'] ?? 0);
  if (!$id) { json_out(['error' => 'ID wajib diisi'], 400); }

  $stmt = db()->prepare('SELECT * FROM articles WHERE id = ? LIMIT 1');
  $stmt->execute([$id]);
  $existing = $stmt->fetch();
  if (!$existing) { json_out(['error' => 'Artikel tidak ditemukan'], 404); }

  $title = trim($data['title'] ?? $existing['title']);
  $slug = trim($data['slug'] ?? '') ?: $existing['slug'];
  if ($slug !== $existing['slug']) {
    $check = db()->prepare('SELECT id FROM articles WHERE slug = ? AND id != ? LIMIT 1');
    $check->execute([$slug, $id]);
    if ($check->fetch()) { $slug = $slug . '-' . substr(uniqid(), -5); }
  }

  $updates = [
    'title' => $title,
    'slug' => $slug,
    'excerpt' => trim($data['excerpt'] ?? $existing['excerpt']),
    'content' => $data['content'] ?? $existing['content'],
    'author' => trim($data['author'] ?? $existing['author']),
    'category' => trim($data['category'] ?? $existing['category']),
    'tags' => is_array($data['tags'] ?? null) ? implode(',', $data['tags']) : trim($data['tags'] ?? $existing['tags']),
    'image' => trim($data['image'] ?? $existing['image']),
    'meta_title' => trim($data['meta_title'] ?? $existing['meta_title'] ?? $title),
    'meta_description' => trim($data['meta_description'] ?? $existing['meta_description']),
    'meta_keywords' => is_array($data['meta_keywords'] ?? null) ? implode(',', $data['meta_keywords']) : trim($data['meta_keywords'] ?? $existing['meta_keywords']),
    'canonical' => trim($data['canonical'] ?? SITE_URL . '/artikel/' . $slug . '/'),
    'og_title' => trim($data['og_title'] ?? $existing['og_title'] ?? $title),
    'og_description' => trim($data['og_description'] ?? $existing['og_description']),
    'status' => in_array($data['status'] ?? $existing['status'], ['draft', 'published']) ? $data['status'] : $existing['status'],
    'publish_date' => trim($data['publish_date'] ?? $existing['publish_date']) ?: $existing['publish_date'],
    'read_time' => (int)($data['read_time'] ?? $existing['read_time']),
  ];

  $set = [];
  foreach (array_keys($updates) as $k) { $set[] = "$k = ?"; }
  $sql = 'UPDATE articles SET ' . implode(', ', $set) . ' WHERE id = ?';
  $params = array_values($updates);
  $params[] = $id;
  db()->prepare($sql)->execute($params);

  $updates['id'] = $id;
  json_out(['success' => true, 'article' => $updates]);
}

// DELETE: hapus artikel (admin only)
if ($method === 'DELETE' && $is_admin) {
  $id = (int)($_GET['id'] ?? 0);
  if (!$id) {
    $d = body_json();
    $id = (int)($d['id'] ?? 0);
  }
  if (!$id) { json_out(['error' => 'ID wajib diisi'], 400); }

  $stmt = db()->prepare('SELECT image FROM articles WHERE id = ? LIMIT 1');
  $stmt->execute([$id]);
  $row = $stmt->fetch();
  if (!$row) { json_out(['error' => 'Artikel tidak ditemukan'], 404); }

  // hapus gambar lokal jika ada
  if ($row['image'] && strpos($row['image'], UPLOAD_URL) === 0) {
    $file = UPLOAD_DIR . '/' . basename($row['image']);
    if (is_file($file)) { @unlink($file); }
  }

  db()->prepare('DELETE FROM articles WHERE id = ?')->execute([$id]);
  json_out(['success' => true, 'message' => 'Artikel dihapus']);
}

// Unauthorized
if (!$is_admin) { json_out(['error' => 'Unauthorized - login admin diperlukan'], 401); }
json_out(['error' => 'Method not allowed'], 405);
