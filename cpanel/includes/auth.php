<?php
require_once __DIR__ . '/db.php';

function admin_login(string $username, string $password): bool
{
    $user = db_fetch_one('SELECT * FROM admin_users WHERE username = ?', [$username]);
    if (!$user || !password_verify($password, $user['password'])) {
        return false;
    }
    session_start();
    $_SESSION['admin_id'] = (int) $user['id'];
    $_SESSION['admin_username'] = $user['username'];
    $_SESSION['admin_name'] = $user['name'];
    $_SESSION['admin_expires'] = time() + 86400;
    return true;
}

function admin_logout(): void
{
    session_start();
    $_SESSION = [];
    session_destroy();
}

function require_admin(): array
{
    session_start();
    if (!isset($_SESSION['admin_id']) || (($_SESSION['admin_expires'] ?? 0) < time())) {
        redirect('login.php');
    }
    return [
        'id' => $_SESSION['admin_id'],
        'username' => $_SESSION['admin_username'],
        'name' => $_SESSION['admin_name'],
    ];
}
