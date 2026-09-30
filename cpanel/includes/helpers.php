<?php
require_once __DIR__ . '/db.php';

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

function slugify(string $text): string
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-') ?: 'item-' . time();
}

function redirect(string $path): void
{
    header('Location: ' . $path);
    exit;
}

function time_ago(string $datetime): string
{
    $diff = time() - strtotime($datetime);
    if ($diff < 60) return 'baru saja';
    $minutes = floor($diff / 60);
    if ($minutes < 60) return $minutes . ' menit lalu';
    $hours = floor($minutes / 60);
    if ($hours < 24) return $hours . ' jam lalu';
    $days = floor($hours / 24);
    return $days . ' hari lalu';
}

function format_date(string $datetime): string
{
    $bulan = [1=>'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    $t = strtotime($datetime);
    return date('j', $t) . ' ' . $bulan[(int)date('n', $t)] . ' ' . date('Y', $t);
}

function get_client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}
