<?php
// Database configuration - edit sesuai akun cPanel kamu
// cPanel: lihat di "MySQL Databases" untuk detail
define('DB_HOST', 'localhost');
define('DB_NAME', 'callcenter_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// URL website (ubah ke domain kamu)
define('SITE_URL', 'https://www.call-center.id');

// Upload config
define('UPLOAD_DIR', __DIR__ . '/uploads');
define('UPLOAD_URL', SITE_URL . '/api/uploads');
define('MAX_UPLOAD_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// Admin session config
define('SESSION_NAME', 'cc_admin');
define('ADMIN_DEFAULT_USER', 'admin');

// CORS & JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// Error reporting (matikan display_errors di production)
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

function db() {
  static $pdo = null;
  if ($pdo === null) {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
    try {
      $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
      ]);
    } catch (PDOException $e) {
      http_response_code(500);
      echo json_encode(['error' => 'Database connection failed', 'detail' => $e->getMessage()]);
      exit;
    }
  }
  return $pdo;
}

function json_out($data, $code = 200) {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function body_json() {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function slugify($text) {
  $text = strtolower(trim($text));
  $text = preg_replace('/[^a-z0-9-]/', '-', $text);
  $text = preg_replace('/-+/', '-', $text);
  $text = trim($text, '-');
  return $text ?: 'artikel-' . time();
}
