# 🚀 TravelOps Pro - Production Deployment Package

## ⚠️ IMPORTANT: Database Connection Required

**This application will NOT run without a MySQL database connection.**

The system includes a DatabaseGuard component that checks database connectivity on startup. If the database is not connected, users will see a detailed error screen with troubleshooting steps.

---

## 📦 What's Included

### Frontend (React + Vite)
- **dist/** - Production build (upload to cPanel root)
- **src/** - Source code
- **index.html** - Entry point
- **.htaccess** - Apache routing rules

### Backend (PHP API)
- **backend/api/** - REST API endpoints
  - `health.php` - Database health check
  - `index.php` - API router
  - `config/Database.php` - Database configuration
  - `controllers/` - API controllers
- **backend/database/schema.sql** - Database schema

### Documentation
- **DEPLOYMENT.md** - Complete deployment guide
- **README.md** - Project overview

---

## 🎯 Quick Start (5 Minutes)

### 1. Create Database in cPanel
```
Database Name: travelops
Username: travelops_user
Password: [generate strong password]
```

### 2. Import Database Schema
- Open phpMyAdmin in cPanel
- Select your database
- Import `backend/database/schema.sql`

### 3. Configure Database Connection
Edit `backend/api/config/Database.php`:
```php
private $host = 'localhost';
private $dbname = 'your_database_name';
private $username = 'your_username';
private $password = 'your_password';
```

### 4. Upload Files
Upload to cPanel `public_html/`:
- Upload `dist/*` to root
- Upload `backend/` folder
- Upload `.htaccess`

### 5. Test
Visit your domain. The app will:
1. Check database connection
2. Show login page if connected ✅
3. Show error screen if not connected ❌

---

## 🔒 Security Features

### Database Guard
- Checks database connectivity on every page load
- Shows detailed error if database is unavailable
- Prevents app from running without database
- Provides troubleshooting steps

### API Security
- CORS headers configured
- Input validation on all endpoints
- SQL injection protection (prepared statements)
- Error handling without exposing sensitive data

### Frontend Security
- Protected routes with role-based access
- JWT token authentication
- Secure session management

---

## 🧪 Testing the Deployment

### Test Health Check Endpoint
```bash
curl https://yourdomain.com/api/health.php
```

**Success Response:**
```json
{
  "status": "healthy",
  "database": {
    "connected": true,
    "host": "localhost",
    "name": "travelops"
  },
  "tables": {
    "exist": true,
    "total": 7
  }
}
```

**Failure Response:**
```json
{
  "status": "unhealthy",
  "database": {
    "connected": false,
    "message": "Access denied for user..."
  }
}
```

---

## 📋 Deployment Checklist

Before going live, verify:

- [ ] Database created in cPanel
- [ ] Database user has ALL PRIVILEGES
- [ ] Schema imported successfully (7 tables created)
- [ ] Database credentials updated in `Database.php`
- [ ] Files uploaded to correct locations
- [ ] File permissions set (755 for dirs, 644 for files)
- [ ] Health check endpoint returns "healthy"
- [ ] Frontend loads without errors
- [ ] Can login with admin credentials
- [ ] HTTPS/SSL enabled (recommended)
- [ ] Default admin password changed

---

## 🛠️ Troubleshooting

### "Database Connection Failed" Error

**Symptoms:** App shows red error screen

**Solutions:**
1. Check database credentials in `backend/api/config/Database.php`
2. Verify MySQL service is running (contact hosting support)
3. Ensure database user has proper permissions
4. Check database name (cPanel may add prefix)

### "404 Not Found" on API

**Symptoms:** API endpoints return 404

**Solutions:**
1. Verify `.htaccess` files are uploaded
2. Check `mod_rewrite` is enabled
3. Verify file permissions (755 for directories)

### "500 Internal Server Error"

**Symptoms:** Server error on API calls

**Solutions:**
1. Check PHP error logs in cPanel
2. Verify PHP version is 7.4+
3. Ensure PDO MySQL extension is enabled
4. Check `.htaccess` syntax

---

## 📊 System Requirements

### Server Requirements
- **PHP**: 7.4 or higher
- **MySQL**: 5.7+ or MariaDB 10.3+
- **Apache**: 2.4+ with mod_rewrite
- **SSL**: Recommended (HTTPS)

### PHP Extensions Required
- PDO
- PDO_MySQL
- JSON
- mbstring

### Browser Requirements
- Modern browser with ES6 support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 🔄 Updating the Application

### Update Frontend Only
```bash
# Local machine
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
# 1. Backup current database!
# 2. Export current data
# 3. Import new schema.sql
# Note: May overwrite existing data
```

---

## 📞 Support & Resources

- **Deployment Guide**: See `DEPLOYMENT.md`
- **API Documentation**: Visit `/api/health.php` for status
- **Database Schema**: See `backend/database/schema.sql`
- **Source Code**: See `src/` directory

---

## 🎓 Default Credentials

After first deployment:
- **Email**: `admin@travelops.pro`
- **Password**: `admin123`

⚠️ **Change immediately after first login!**

---

## ✅ Success Indicators

You know deployment is successful when:

1. ✅ Health check returns `"status": "healthy"`
2. ✅ Login page loads without errors
3. ✅ Can login with default credentials
4. ✅ Dashboard shows data from database
5. ✅ All navigation works correctly
6. ✅ CRUD operations work (create, read, update, delete)

---

## 🎉 You're Ready!

Your TravelOps Pro is now production-ready with:
- ✅ Database connectivity checks
- ✅ Comprehensive error handling
- ✅ Security best practices
- ✅ Complete documentation
- ✅ Production-optimized build

**Good luck with your deployment!** 🚀
