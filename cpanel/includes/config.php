<?php
// ===== KONFIGURASI =====
// Ubah sesuai kredensial cPanel kamu (lihat cPanel > MySQL Databases)

define('DB_HOST', 'localhost');
define('DB_NAME', 'callcenter_finance');
define('DB_USER', 'callcenter_admin');
define('DB_PASS', 'ganti-password-db-kamu');

// Kunci sesi admin — WAJIB diganti dengan string acak panjang
define('SESSION_SECRET', 'ganti-dengan-string-acak-yang-panjang-dan-unik');

// URL dasar situs (tanpa trailing slash)
define('BASE_URL', 'https://www.call-center.id');

date_default_timezone_set('Asia/Jakarta');
