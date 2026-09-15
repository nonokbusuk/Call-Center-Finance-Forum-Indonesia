<?php
// Admin auth - login, logout, session check
require __DIR__ . '/config.php';

session_name(SESSION_NAME);
session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
  $data = body_json();
  $username = trim($data['username'] ?? '');
  $password = $data['password'] ?? '';

  if ($username === '' || $password === '') {
    json_out(['error' => 'Username dan password wajib diisi'], 400);
  }

  $stmt = db()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');
  $stmt->execute([$username]);
  $admin = $stmt->fetch();

  if (!$admin || !password_verify($password, $admin['password_hash'])) {
    json_out(['error' => 'Username atau password salah'], 401);
  }

  $_SESSION['admin_id'] = $admin['id'];
  $_SESSION['admin_user'] = $admin['username'];
  json_out(['success' => true, 'admin' => $admin['username']]);
}

if ($method === 'DELETE' || (isset($_GET['logout']) && $_GET['logout'] == 1)) {
  session_unset();
  session_destroy();
  json_out(['success' => true, 'message' => 'Logged out']);
}

if ($method === 'GET') {
  if (!empty($_SESSION['admin_id'])) {
    json_out(['authenticated' => true, 'admin' => $_SESSION['admin_user'] ?? 'admin']);
  }
  json_out(['authenticated' => false], 401);
}

json_out(['error' => 'Method not allowed'], 405);
