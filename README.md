# Call Center Finance Indonesia

## Admin Panel (Opsi B - Backend Penuh)

Aplikasi ini sekarang punya backend penuh: **Prisma + SQLite**, API routes, dan **admin panel** di `/admin`.

**Tidak ada halaman login/registrasi publik** — hanya admin panel yang butuh login.

### Setup

```sh
npm i
cp .env.example .env       # sesuaikan JWT_SECRET & kredensial admin
npm run db:push            # buat skema database
npm run db:seed            # seed kategori, thread, artikel, akun admin
npm run dev
```

### Akses Admin

- URL: `/admin` (redirect ke `/admin/login` jika belum masuk)
- Kredensial default (ubah lewat env saat seed): username `admin`, password `Admin123!`
- Ganti `JWT_SECRET` di production!

### Fitur Admin

- Dashboard statistik (artikel, thread, balasan, pesan)
- CRUD artikel (publish/draft)
- CRUD thread forum (pin/lock)
- Moderasi balasan (hapus)
- Kelola kategori forum
- Inbox pesan kontak (tandai dibaca / hapus)

### API

| Endpoint | Auth | Method |
|---|---|---|
| `/api/auth/login`, `/api/auth/logout` | - | POST |
| `/api/articles`, `/api/articles/[id]` | admin (tulis/ubah/hapus) | GET/POST/PUT/DELETE |
| `/api/threads`, `/api/threads/[id]` | admin (tulis/ubah/hapus) | GET/POST/PUT/DELETE |
| `/api/replies` | admin | GET/POST/DELETE |
| `/api/categories` | admin (selain GET) | GET/POST/PUT/DELETE |
| `/api/messages` | publik POST saja, admin sisanya | GET/POST/PUT/DELETE |
| `/api/stats` | admin | GET |

> **Catatan hosting:** butuh runtime Node.js (Vercel/VPS/Render), bukan cPanel static.

---

# Welcome to your OnSpace project

## How can I edit this code?

There are several ways of editing your application.

**Use OnSpace**

Simply visit the [OnSpace Project]() and start prompting.

Changes made via OnSpace will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in OnSpace.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [OnSpace]() and click on Share -> Publish.
