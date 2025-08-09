# DIU Admission Application

Full-stack admission app with PHP 8 + MySQL backend and a Bootstrap 5 frontend. Applicants submit details; admins can log in and view submissions.

## Features

- Frontend (Bootstrap 5)
  - Responsive UI, dropdown menus, carousel banner
  - Real‑time form validation, progress bar, auto‑save, print view
  - Custom classes simplified: `banner`, `features`, `feat-icon`, `register`, `fab` (Bootstrap classes remain unchanged)

- Backend (PHP + MySQL)
  - Stores applications in MySQL (`applications` table)
  - Simple admin auth (session-based)
  - Admin dashboard with search
  - Auto-creates DB and table if missing

Note: File uploads are removed (no photo/transcript/certificate/CV handling).

## Quick Start

Requirements: PHP 8+, MySQL 8+, internet for CDN assets.

1) Configure database in `db_config.php`:
```php
$DB_HOST = 'localhost';          // or '127.0.0.1' (MAMP: '127.0.0.1:8889')
$DB_USER = 'root';               // or your MySQL user
$DB_PASS = 'your_password';      // set your password
$DB_NAME = 'diu_admissions';
```

2) (Recommended) Create a dedicated DB user (in MySQL shell):
```sql
CREATE DATABASE IF NOT EXISTS diu_admissions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'diu_user'@'localhost' IDENTIFIED BY 'StrongPassword!123';
GRANT ALL PRIVILEGES ON diu_admissions.* TO 'diu_user'@'localhost';
FLUSH PRIVILEGES;
```
Then update `db_config.php` to use that user.

3) Run the dev server from the project folder:
```bash
php -S 127.0.0.1:8000 or
php -S localhost:8000
(If DB connect issues arise, use php -S 127.0.0.1:8000 in db_config.php)
```

4) Open in your browser:
- Applicant form: `http://127.0.0.1:8000/registration.html`
- Admin login: `http://127.0.0.1:8000/admin_login.php`

## Admin Credentials

- Default username: `admin`
- Default password: `changeme123`

Change them in `db_config.php`. To set a new password hash, generate one and paste it as a static string:
```bash
php -r "echo password_hash('YourNewPassword', PASSWORD_DEFAULT), PHP_EOL;"
```
Then set:
```php
$ADMIN_USERNAME = 'your_username';
$ADMIN_PASSWORD_HASH = 'PASTE_THE_HASH_HERE';
```

## Database

- On first run, the app creates the database (if permitted) and the `applications` table.
- SQL schema is also available in `schema.sql`.
- Columns include: name, email, phone, DOB, gender, address, city, postal code, country, nationality, program, level, previous institution, GPA, newsletter flag, created_at. Upload columns were removed.

## Class Names (Custom)

- `banner` (was `banner-section`)
- `features` (was `features-section`)
- `feat-icon` (was `feature-icon`)
- `register` (was `registration-section`)
- `fab` (was `floating-action-btn`)

Bootstrap classes like `navbar`, `dropdown-menu`, `btn`, etc., are kept as-is for compatibility.

## Troubleshooting

- Access denied (MySQL): update credentials in `db_config.php` or use the recommended dedicated user.
- MAMP: host `127.0.0.1:8889`, user `root`, pass `root`.
- Hard refresh after CSS changes (Cmd+Shift+R).

## Security Notes

- Do not commit real passwords. Prefer env vars for production.
- Replace default admin credentials immediately.
- Add CSRF protection and stricter input validation for production.