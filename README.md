# 🚀 TravelOps Pro - Tour & Travel Office Management System

## ⚠️ PRODUCTION READY - Database Required

**This application requires a MySQL database connection to run.**

The system includes a DatabaseGuard component that prevents the application from running if the database is not connected. Users will see a detailed error screen with troubleshooting steps if the database is unavailable.

---

## 🎯 Overview

TravelOps Pro is a comprehensive web-based tour and travel office management system designed for travel agencies in Nepal. It provides end-to-end management of leads, bookings, vendors, invoices, and operations with Nepal-specific features including NPR currency formatting and local business logic.

### Key Features

- 📊 **Dashboard** - Real-time statistics and insights
- 👥 **Customer Management** - Lead tracking and customer database
- 📅 **Bookings** - Complete booking lifecycle management
- 🏢 **Vendors** - Supplier and vendor directory
- 📝 **Operations** - Service assignments and tracking
- 💰 **Invoices** - Billing and payment management
- 📈 **Reports** - Financial and operational analytics
- ⚙️ **Settings** - System configuration

---

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **PHP 7.4+** REST API
- **MySQL/MariaDB** database
- **PDO** for database operations
- **JWT** for authentication (future)

### Deployment
- **cPanel** shared hosting compatible
- **Apache** with mod_rewrite
- **HTTPS** recommended

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MySQL 5.7+ or MariaDB 10.3+
- PHP 7.4+ with PDO extension
- Apache web server

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd travelops-pro

# 2. Install dependencies
npm install

# 3. Create MySQL database
mysql -u root -p
CREATE DATABASE travelops;
CREATE USER 'travelops_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON travelops.* TO 'travelops_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 4. Import database schema
mysql -u travelops_user -p travelops < backend/database/schema.sql

# 5. Configure database connection
# Edit backend/api/config/Database.php with your credentials

# 6. Build the frontend
npm run build

# 7. Deploy to your server
# Upload dist/ and backend/ to your web server
```

---

## 📁 Project Structure

```
travelops-pro/
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
├── src/
│   ├── components/
│   │   ├── DatabaseGuard.tsx          # Database connectivity check
│   │   ├── common/
│   │   │   └── ProtectedRoute.tsx
│   │   └── layout/
│   │       ├── DashboardLayout.tsx
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Bookings.tsx
│   │   ├── Customers.tsx
│   │   ├── Vendors.tsx
│   │   ├── Operations.tsx
│   │   ├── Invoices.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   └── Login.tsx
│   ├── services/
│   │   ├── api.ts                     # API service layer
│   │   └── database.ts                # Database service
│   ├── utils/
│   │   └── currency.ts                # NPR currency formatting
│   ├── App.tsx
│   └── main.tsx
├── dist/                              # Production build
├── .htaccess                          # Root routing
├── DEPLOYMENT.md                      # Deployment guide
├── PRODUCTION_READY.md                # Production checklist
└── README.md                          # This file
```

---

## 🔒 Database Connection Check

The application includes a **DatabaseGuard** component that:

1. **Checks database connectivity** on every page load
2. **Shows loading screen** while checking connection
3. **Displays error screen** if database is unavailable
4. **Provides troubleshooting steps** for common issues
5. **Prevents app usage** until database is connected

### Health Check Endpoint

Test your database connection:
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

---

## 🇳🇵 Nepal-Specific Features

### Currency Formatting
- **NPR (Nepalese Rupee)** symbol: रू
- **Indian numbering system**: 1,00,000 (1 lakh), 1,00,00,000 (1 crore)
- Automatic formatting throughout the application

### Local Business Logic
- Nepal-based dummy data
- Local vendor types (Vehicle, Guide, Hotel, etc.)
- Nepali phone number formats
- Local destination names

---

## 📊 Database Schema

### Tables

| Table | Description | Records |
|-------|-------------|---------|
| `users` | System users | 4 default users |
| `leads` | Customer leads | 8 sample leads |
| `bookings` | Confirmed bookings | 8 sample bookings |
| `vendors` | Suppliers/vendors | 16 sample vendors |
| `assignments` | Service assignments | 4 sample assignments |
| `invoices` | Customer invoices | 5 sample invoices |
| `supplier_expenses` | Vendor expenses | 8 sample expenses |

### Sample Data

All sample data is **Nepal-based** with realistic scenarios:
- Annapurna Base Camp treks
- Everest helicopter tours
- Pokhara corporate retreats
- Chitwan jungle safaris
- Local vendors and suppliers

---

## 🎨 UI/UX Features

### Material Design Inspired
- Large icon cards for navigation
- Rounded corners (24px border radius)
- Gradient backgrounds
- Smooth animations
- Responsive design

### Brand Colors
- **Primary**: #012871 (Deep Navy Blue)
- **Accent**: #f35500 (Vibrant Orange)
- Consistent throughout the application

### Accessibility
- Keyboard navigation support
- ARIA labels
- Focus indicators
- Color contrast compliance

---

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

### Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://yourdomain.com/api
```

---

## 📦 Deployment

### cPanel Deployment

See **DEPLOYMENT.md** for complete guide.

**Quick Steps:**
1. Create MySQL database in cPanel
2. Import `backend/database/schema.sql`
3. Update credentials in `backend/api/config/Database.php`
4. Build frontend: `npm run build`
5. Upload `dist/` and `backend/` to server
6. Test health check endpoint

### Requirements

- PHP 7.4+ with PDO extension
- MySQL 5.7+ or MariaDB 10.3+
- Apache with mod_rewrite
- HTTPS recommended

---

## 🔐 Security Features

### Backend
- SQL injection protection (prepared statements)
- Input validation on all endpoints
- CORS headers configured
- Error handling without exposing sensitive data

### Frontend
- Protected routes with role-based access
- Database connectivity checks
- Secure API communication
- XSS protection

### Best Practices
- Change default admin password immediately
- Use HTTPS/SSL
- Regular database backups
- Keep PHP and dependencies updated

---

## 📖 Documentation

- **DEPLOYMENT.md** - Complete deployment guide for cPanel
- **PRODUCTION_READY.md** - Production deployment checklist
- **API Documentation** - Visit `/api/health.php` for status

---

## 🐛 Troubleshooting

### Database Connection Failed

**Symptoms:** App shows red error screen

**Solutions:**
1. Check database credentials in `backend/api/config/Database.php`
2. Verify MySQL service is running
3. Ensure database user has proper permissions
4. Check database name (cPanel may add prefix)

### API Returns 404

**Solutions:**
1. Verify `.htaccess` files are uploaded
2. Check `mod_rewrite` is enabled
3. Verify file permissions (755 for directories)

### Build Fails

**Solutions:**
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Update Node.js to version 18+
3. Check for TypeScript errors: `npm run type-check`

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

- **Email**: support@travelops.pro
- **Documentation**: https://docs.travelops.pro
- **Issues**: Use GitHub Issues

---

## 🎓 Default Credentials

After deployment:
- **Email**: `admin@travelops.pro`
- **Password**: `admin123`

⚠️ **Change immediately after first login!**

---

## ✅ Success Criteria

Your deployment is successful when:

- ✅ Health check returns `"status": "healthy"`
- ✅ Login page loads without errors
- ✅ Can login with default credentials
- ✅ Dashboard shows data from database
- ✅ All navigation works correctly
- ✅ CRUD operations work properly

---

## 🚀 Ready for Production

This application is **production-ready** with:

- ✅ Complete database connectivity checks
- ✅ Comprehensive error handling
- ✅ Security best practices
- ✅ Nepal-specific features
- ✅ Complete documentation
- ✅ Production-optimized build
- ✅ cPanel deployment ready

---

**Built with ❤️ for Nepal's Travel Industry**

🇳🇵 Made in Nepal 🏔️
