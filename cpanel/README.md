# Admin Panel cPanel (PHP + MySQL)

Versi admin panel yang **100% jalan di hosting cPanel biasa** — tanpa Node.js. Sesuai permintaan: **hanya admin panel controller, tanpa halaman login/registrasi publik**.

## Isi folder

```
cpanel/
├── database.sql          -> skema + seed (import ke phpMyAdmin)
├── login.php             -> login admin (satu-satunya login di situs)
├── index.php             -> dashboard statistik
├── artikel.php           -> CRUD artikel (publish/draft)
├── threads.php           -> CRUD thread forum (pin/lock)
├── balasan.php           -> moderasi balasan (hapus)
├── kategori.php          -> kelola kategori forum
├── pesan.php             -> inbox pesan kontak (baca/hapus)
├── logout.php
├── api/contact.php       -> endpoint form kontak (untuk halaman statis)
├── assets/admin.css
└── includes/             -> config, koneksi DB, auth, helper (dilindungi .htaccess)
```

## Cara deploy (±5 menit)

1. **Buat database** — cPanel > MySQL Databases: buat database + user, catat nama DB, username, password.

2. **Import database** — cPanel > phpMyAdmin > pilih database > tab Import > upload `database.sql` > Go.
   (Bila error `utf8mb4` pada MySQL lama, ganti `utf8mb4` jadi `utf8` di file SQL.)

3. **Upload file** — upload **seluruh isi folder `cpanel/`** ke dalam `public_html/admin/`
   (atau langsung ke `public_html/` kalau mau admin panel jadi situs utama).

4. **Edit konfigurasi** — buka `includes/config.php`, isi:
   ```php
   define('DB_NAME', 'cpaneluser_callcenter');   // nama database dari langkah 1
   define('DB_USER', 'cpaneluser_admin');        // user database
   define('DB_PASS', 'password-dari-langkah-1');
   define('SESSION_SECRET', 'string-acak-panjang-unik-anda');
   define('BASE_URL', 'https://www.domain-anda.com');
   ```
   > Nama database & user di cPanel selalu berprefiksi username cPanel, mis. `callcenter_finance`.

5. **Akses** — buka `https://domain-anda.com/admin/` → login:
   - Username: `admin`
   - Password: `Admin123!`
   - **Segera ganti password** (lihat bawah).

## Ganti password admin

Jalankan di phpMyAdmin (tab SQL), ganti dengan hash baru:

```sql
-- Generate hash: di php -r "echo password_hash('PasswordBaruKamu', PASSWORD_BCRYPT);"
UPDATE admin_users SET password = '$2y$12$thTTCnFlzBVTzHLf0yt8reK6uhpDT2D0hNX.mf/pQe1z6njG3GhIW' WHERE username = 'admin';
```

Atau lewat terminal PHP jika ada: `php -r "echo password_hash('PasswordBaru', PASSWORD_BCRYPT);"`

## Hubungkan form kontak (halaman statis) ke admin panel

Halaman kontak statis tinggal kirim POST ke endpoint:

```js
fetch('https://domain-anda.com/admin/api/contact.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
})
  .then(r => r.json())
  .then(d => { if (d.ok) alert('Pesan terkirim!'); });
```

Pesan masuk langsung muncul di **Pesan Kontak** admin panel.

## Keamanan

- Session admin berlaku 24 jam, cookie PHPSESSID
- `includes/config.php` & file SQL diblokir dari akses web via `.htaccess`
- Admin panel diberi `<meta name="robots" content="noindex, nofollow">`
- Semua input di-escape saat render (`htmlspecialchars`) + prepared statements (PDO)
- **Wajib**: ganti `SESSION_SECRET`, password default, dan pastikan HTTPS aktif (cPanel > SSL/TLS, Let's Encrypt gratis)

## Verifikasi (dilakukan sebelum delivery)

- `php -l` lolos untuk semua file PHP
- Uji end-to-end dengan MySQL + PHP server asli:
  - Login benar/salah, proteksi route (redirect tanpa sesi), logout
  - CRUD artikel, thread, kategori — create/update/delete semua OK
  - API kontak menyimpan pesan, muncul di inbox admin dengan badge "Baru"
