# TravelOps Pro - cPanel Deployment Guide

## 🚀 Production Deployment for Shared cPanel Hosting

This guide will help you deploy TravelOps Pro to your cPanel shared hosting with MySQL database.

---

## 📋 Prerequisites

- cPanel hosting account with PHP 7.4+ and MySQL/MariaDB
- FTP/SFTP access or cPanel File Manager
- Domain or subdomain configured

---

## 🗂️ Project Structure

```
your-domain.com/
├── backend/
│   ├── api/
│   │   ├── config/
│   │   │   └── Database.php          # Database configuration
│   │   ├── controllers/
│   │   │   ├── LeadController.php
│   │   │   ├── BookingController.php
│   │   │   ├── VendorController.php
│   │   │   └── InvoiceController.php
│   │   ├── .htaccess                  # API routing
│   │   ├── health.php                 # Health check endpoint
│   │   └── index.php                  # API router
│   └── database/
│       └── schema.sql                 # Database schema
├── dist/                              # Build output (upload this)
│   ├── index.html
│   └── assets/
└── .htaccess                          # Root routing
```

---

## 📦 Step-by-Step Deployment

### Step 1: Create MySQL Database

1. Login to your cPanel
2. Go to **MySQL Databases** or **MySQL Database Wizard**
3. Create a new database:
   - Database Name: `travelops` (or `cpaneluser_travelops`)
   - Username: `travelops_user` (or `cpaneluser_dbuser`)
   - Password: Generate a strong password
   - **Save these credentials!**

4. Add the user to the database with **ALL PRIVILEGES**

### Step 2: Import Database Schema

1. Go to **phpMyAdmin** in cPanel
2. Select your database from the left sidebar
3. Click **Import** tab
4. Choose the file: `backend/database/schema.sql`
5. Click **Go** to import

### Step 3: Configure Database Connection

1. Open `backend/api/config/Database.php`
2. Update the credentials:

```php
private $host = 'localhost';  // Usually 'localhost' on cPanel
private $dbname = 'cpaneluser_travelops';  // Your database name
private $username = 'cpaneluser_dbuser';    // Your database username
private $password = 'your_secure_password'; // Your database password
```

### Step 4: Build the Frontend

On your local machine:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates the `dist/` folder with optimized files.

### Step 5: Upload Files via FTP/cPanel File Manager

#### Option A: Using cPanel File Manager

1. Go to **File Manager** in cPanel
2. Navigate to `public_html/` (or your domain's root)
3. Upload the entire `backend/` folder
4. Upload the contents of `dist/` folder to the root

#### Option B: Using FTP/SFTP

```bash
# Connect to your server
ftp your-ftp-server.com

# Upload backend
put -r backend/ public_html/backend/

# Upload frontend build
put -r dist/* public_html/
```

### Step 6: Set File Permissions

Via cPanel File Manager or SSH:

```bash
# Directories should be 755
chmod 755 backend/
chmod 755 backend/api/
chmod 755 backend/api/config/
chmod 755 backend/api/controllers/

# PHP files should be 644
chmod 644 backend/api/*.php
chmod 644 backend/api/config/*.php
chmod 644 backend/api/controllers/*.php
```

### Step 7: Test the Deployment

1. Visit your domain: `https://yourdomain.com`
2. The app will check database connection automatically
3. If database is connected, you'll see the login page
4. If database fails, you'll see the error screen with troubleshooting steps

---

## 🔧 Configuration Options

### Environment Variables (Optional)

Create `.env` file in `backend/api/` (not required, but recommended):

```env
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_username
DB_PASS=your_password
```

### API Base URL

If your API is at a different location, create `.env` in the frontend root:

```env
VITE_API_URL=https://yourdomain.com/api
```

Then rebuild: `npm run build`

---

## 🧪 Testing the Health Check

Test if the database connection is working:

```bash
curl https://yourdomain.com/api/health.php
```

Expected response (success):
```json
{
  "status": "healthy",
  "timestamp": "2026-03-15T10:30:00+00:00",
  "version": "1.0.0",
  "database": {
    "connected": true,
    "host": "localhost",
    "name": "your_database",
    "message": "Database connection successful"
  },
  "tables": {
    "exist": true,
    "total": 7,
    "existing": ["users", "leads", "bookings", ...],
    "missing": []
  }
}
```

Expected response (failure):
```json
{
  "status": "unhealthy",
  "database": {
    "connected": false,
    "message": "SQLSTATE[HY000] [1045] Access denied for user..."
  }
}
```

---

## 🛠️ Troubleshooting

### Issue: "Database Connection Failed"

**Solutions:**
1. Verify database credentials in `backend/api/config/Database.php`
2. Check if MySQL service is running (contact hosting support)
3. Ensure database user has proper permissions
4. Verify database name is correct (cPanel often adds prefix)

### Issue: "404 Not Found" on API endpoints

**Solutions:**
1. Check if `.htaccess` files are uploaded correctly
2. Verify `mod_rewrite` is enabled (ask hosting support)
3. Check file permissions (directories: 755, files: 644)

### Issue: "500 Internal Server Error"

**Solutions:**
1. Check PHP error logs in cPanel
2. Verify PHP version is 7.4 or higher
3. Ensure PDO MySQL extension is enabled
4. Check `.htaccess` syntax

### Issue: CORS Errors

**Solutions:**
1. The API already includes CORS headers
2. If using a subdomain, update the CORS origin in PHP files
3. Contact hosting support to ensure CORS is not blocked

---

## 🔒 Security Recommendations

1. **Change default admin password** after first login
2. **Use HTTPS** (enable SSL in cPanel)
3. **Restrict phpMyAdmin access** to your IP only
4. **Regular backups** of your database
5. **Keep PHP updated** to latest version
6. **Use strong database passwords** (20+ characters)

---

## 📊 Database Tables

The schema creates these tables:

| Table | Description |
|-------|-------------|
| `users` | System users (admin, sales, operations, accountant) |
| `leads` | Customer leads and inquiries |
| `bookings` | Confirmed bookings |
| `vendors` | Suppliers and vendors |
| `assignments` | Service assignments |
| `invoices` | Customer invoices |
| `supplier_expenses` | Vendor expenses tracking |

---

## 🔄 Updating the Application

### Update Frontend Only

```bash
# Make changes locally
npm run build

# Upload dist/ folder to server
# Overwrite existing files
```

### Update Backend Only

```bash
# Upload backend/ folder to server
# Overwrite existing files
# No need to re-import database
```

### Update Database Schema

```bash
# Export current database (backup!)
# Import new schema.sql
# Note: This may overwrite existing data
```

---

## 📞 Support

- **Documentation**: https://docs.travelops.pro
- **Email**: support@travelops.pro
- **cPanel Support**: Contact your hosting provider

---

## ✅ Deployment Checklist

- [ ] Database created in cPanel
- [ ] Database user created with all privileges
- [ ] Database schema imported via phpMyAdmin
- [ ] Database credentials updated in `Database.php`
- [ ] Frontend built with `npm run build`
- [ ] Files uploaded to server
- [ ] File permissions set correctly (755/644)
- [ ] Health check endpoint working (`/api/health.php`)
- [ ] Application loads without errors
- [ ] Can login with default admin credentials
- [ ] HTTPS/SSL enabled (recommended)

---

**🎉 Your TravelOps Pro is now live!**

Default login credentials:
- Email: `admin@travelops.pro`
- Password: `admin123` (change immediately!)
