<?php
require_once __DIR__ . '/db.php';

function get_all_settings(bool $fresh = false): array
{
    static $cache = null;
    if ($fresh) $cache = null;
    if ($cache === null) {
        $cache = [];
        foreach (db_fetch_all('SELECT setting_key, setting_value FROM settings') as $row) {
            $cache[$row['setting_key']] = $row['setting_value'];
        }
    }
    return $cache;
}

function get_setting(string $key, string $default = ''): string
{
    $all = get_all_settings();
    return $all[$key] ?? $default;
}

function save_setting(string $key, string $value): void
{
    db_query(
        'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
        [$key, $value]
    );
}
