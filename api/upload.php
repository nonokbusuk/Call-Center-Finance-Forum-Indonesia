<?php
// Image upload - admin only
require __DIR__ . '/config.php';

session_name(SESSION_NAME);
session_start();
if (empty($_SESSION['admin_id'])) { json_out(['error' => 'Unauthorized'], 401); }

if (!is_dir(UPLOAD_DIR)) { @mkdir(UPLOAD_DIR, 0755, true); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { json_out(['error' => 'Method not allowed'], 405); }

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
  json_out(['error' => 'File gambar wajib diupload'], 400);
}

$file = $_FILES['image'];
if ($file['size'] > MAX_UPLOAD_SIZE) {
  json_out(['error' => 'Ukuran file maksimal 5MB'], 400);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);
if (!in_array($mime, ALLOWED_IMAGE_TYPES)) {
  json_out(['error' => 'Tipe file tidak diizinkan (jpg, png, webp, gif)'], 400);
}

$ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'][$mime];
$name = 'img-' . date('Ymd-His') . '-' . substr(uniqid(), -6) . '.' . $ext;
$dest = UPLOAD_DIR . '/' . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
  json_out(['error' => 'Gagal menyimpan file'], 500);
}

json_out(['success' => true, 'url' => UPLOAD_URL . '/' . $name, 'name' => $name]);
