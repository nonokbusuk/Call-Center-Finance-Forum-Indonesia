<?php
require_once __DIR__ . '/includes/auth.php';

session_start();
if (isset($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (admin_login($_POST['username'] ?? '', $_POST['password'] ?? '')) {
        header('Location: index.php');
        exit;
    }
    $error = 'Username atau password salah';
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Login Admin | Call Center Finance Indonesia</title>
<link rel="stylesheet" href="assets/admin.css?v=3">
</head>
<body class="login-body">
<div class="login-card">
  <h1>Admin Panel</h1>
  <p class="login-sub">Call Center Finance Indonesia</p>
  <?php if ($error): ?>
    <div class="alert error"><?= e($error) ?></div>
  <?php endif; ?>
  <form method="post">
    <div class="field">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required autofocus>
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required>
    </div>
    <button type="submit" class="btn btn-block">Masuk</button>
  </form>
</div>
</body>
</html>
