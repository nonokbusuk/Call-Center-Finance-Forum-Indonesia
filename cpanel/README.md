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

---

# v2 — Full Site Control + Keyword Trend + Direktori Perusahaan

Update v2 menambah **kontrol penuh seluruh struktur situs** dari Admin Dashboard, tanpa perlu coding.

## Halaman admin baru

| Halaman | Fungsi |
|---|---|
| `pengaturan.php` | Edit identitas situs: nama, tagline, announcement bar, hero, kontak/footer, SEO meta, Google Analytics ID |
| `halaman.php` | CMS halaman custom — buat/edit halaman baru dengan konten HTML + meta SEO |
| `menu.php` | Kelola navigasi header/footer (label, URL, urutan, aktif/nonaktif) |
| `perusahaan.php` | **Direktori perusahaan finance** — CRUD lengkap: nama, kategori, **nomor call center**, WhatsApp, email, website, alamat, rating, verified, featured, publish |
| `keyword.php` | **Pemantau trend keyword** — saran keyword live dari Google Suggest, grafik tren 14 hari, statistik pencarian 24 jam / 7 hari / total, tambah/hapus keyword |

## Tabel database baru

`settings`, `pages`, `menu_items`, `finance_companies`, `keywords`, `keyword_searches`

**Penting:** nomor telepon perusahaan di seed masih **placeholder** (`0812-0000-000X`) — ganti dengan nomor call center asli via menu **Direktori Perusahaan** setelah deploy.

## Upgrade dari v1 (instalasi lama)

Kalau `database.sql` v1 sudah terlanjur di-import, jalankan `upgrade-v2.sql` di phpMyAdmin (tab SQL / Import). Isi: 6 tabel baru + data seed. Instalasi baru cukup import `database.sql` (sudah v1+v2 merged).

## API publik (untuk situs statis / frontend lain)

Semua endpoint JSON, CORS terbuka (`*`), hanya data published:

```js
// 1. Semua pengaturan situs (site_name, hero_title, announcement, dll)
fetch('https://domain-anda.com/admin/api/settings.php')
  .then(r => r.json())
  .then(d => console.log(d.settings));

// 2. Direktori perusahaan finance — filter kategori & pencarian
//    Setiap pencarian (q=) OTOMATIS dicatat sebagai data trend keyword
fetch('https://domain-anda.com/admin/api/companies.php?category=Pinjaman%20Online&q=easycash')
  .then(r => r.json())
  .then(d => d.companies.forEach(c => {
    console.log(c.name, c.phone, c.whatsapp, c.rating, c.is_verified);
  }));

// 3. Catat pencarian pengunjung dari situs publik ke trend tracker
fetch('https://domain-anda.com/admin/api/track-search.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ keyword: 'call center easycash hubungi' })
}).then(r => r.json()); // { ok: true }

// 4. Halaman CMS & menu navigasi
fetch('https://domain-anda.com/admin/api/pages.php?slug=tentang-kami') // 1 halaman
fetch('https://domain-anda.com/admin/api/pages.php') // semua halaman + menu aktif
```

Contoh integrasi search box di situs publik yang sekaligus mencatat trend:

```js
function cariPerusahaan(q) {
  fetch('https://domain-anda.com/admin/api/companies.php?q=' + encodeURIComponent(q))
    .then(r => r.json())
    .then(d => renderHasil(d.companies));
}
```

## Keyword trend tracker (`keyword.php`)

- **Cek Saran**: ambil saran keyword live dari Google Suggest (Bahasa Indonesia) — tanpa API key, gratis. Tombol **+ Pantau** langsung menambahkan keyword ke daftar pantauan.
- **Grafik 14 hari**: batang CSS murni, menampilkan jumlah pencarian per keyword per hari.
- **Sumber data trend**: pencarian pengunjung yang masuk lewat `api/companies.php?q=` dan `api/track-search.php` dicatat otomatis ke `keyword_searches`.
- Kalau hosting memblokir `file_get_contents` ke URL eksternal, fitur Cek Saran menampilkan pesan error yang jelas — fitur lain tetap jalan. (Kebanyakan cPanel mengizinkan.)

## Verifikasi v2 (dilakukan sebelum delivery)

- `php -l` lolos untuk semua file PHP baru
- Uji end-to-end 22 asersi, semua PASS:
  - Login, guard route, logout
  - Simpan pengaturan situs → tersimpan & terbaca via API
  - CRUD perusahaan (create, tampil di daftar, muncul via API)
  - Pencarian `?q=easycash` mencatat trend otomatis
  - `track-search.php` mencatat keyword publik
  - Halaman keyword: grafik render, tambah/hapus keyword
  - CRUD halaman CMS + fetch via API per-slug
  - CRUD menu navigasi
