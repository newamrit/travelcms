-- TravelOps Pro Database Schema
-- Run this SQL in your cPanel phpMyAdmin to create the database tables

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `role` ENUM('admin','sales_agent','operations_manager','accountant') NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Leads table
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `lead_number` VARCHAR(50) NOT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `client_email` VARCHAR(255) DEFAULT NULL,
  `client_phone` VARCHAR(50) DEFAULT NULL,
  `client_whatsapp` VARCHAR(50) DEFAULT NULL,
  `client_country` VARCHAR(100) DEFAULT 'Nepal',
  `pax_adults` INT(11) DEFAULT 1,
  `pax_children` INT(11) DEFAULT 0,
  `travel_date_from` DATE DEFAULT NULL,
  `travel_date_to` DATE DEFAULT NULL,
  `budget_min` DECIMAL(15,2) DEFAULT 0,
  `budget_max` DECIMAL(15,2) DEFAULT 0,
  `currency` VARCHAR(10) DEFAULT 'NPR',
  `lead_source` VARCHAR(50) DEFAULT 'website',
  `status` ENUM('new','contacted','requirements_gathered','quoting','negotiation','won','lost') DEFAULT 'new',
  `assigned_agent_id` INT(11) DEFAULT NULL,
  `assigned_agent_name` VARCHAR(255) DEFAULT NULL,
  `priority` ENUM('low','medium','high','urgent') DEFAULT 'medium',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lead_number` (`lead_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bookings table
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `booking_number` VARCHAR(50) NOT NULL,
  `lead_id` INT(11) DEFAULT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `destination` VARCHAR(255) DEFAULT NULL,
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `pax_adults` INT(11) DEFAULT 1,
  `pax_children` INT(11) DEFAULT 0,
  `total_amount` DECIMAL(15,2) DEFAULT 0,
  `currency` VARCHAR(10) DEFAULT 'NPR',
  `status` ENUM('confirmed','in_progress','completed','cancelled') DEFAULT 'confirmed',
  `category` ENUM('school_college','corporate_retreat','vacation_family') DEFAULT 'vacation_family',
  `special_requests` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_number` (`booking_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vendors table
CREATE TABLE IF NOT EXISTS `vendors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type` ENUM('Vehicle','Guide','Hotel','Restaurant','Activity','Permit','Others') NOT NULL,
  `contact_person` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `rating` DECIMAL(3,2) DEFAULT 0,
  `vehicle_number` VARCHAR(50) DEFAULT NULL,
  `vehicle_type` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Assignments table
CREATE TABLE IF NOT EXISTS `assignments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `assignment_number` VARCHAR(50) NOT NULL,
  `booking_id` INT(11) DEFAULT NULL,
  `booking_number` VARCHAR(50) DEFAULT NULL,
  `client_name` VARCHAR(255) DEFAULT NULL,
  `items` JSON DEFAULT NULL,
  `total_amount` DECIMAL(15,2) DEFAULT 0,
  `status` ENUM('pending','confirmed','in_progress','completed','cancelled') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `assignment_number` (`assignment_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Invoices table
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_number` VARCHAR(50) NOT NULL,
  `booking_id` INT(11) DEFAULT NULL,
  `booking_number` VARCHAR(50) DEFAULT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `subtotal` DECIMAL(15,2) DEFAULT 0,
  `tax_percent` DECIMAL(5,2) DEFAULT 13,
  `tax_amount` DECIMAL(15,2) DEFAULT 0,
  `discount_amount` DECIMAL(15,2) DEFAULT 0,
  `total_amount` DECIMAL(15,2) DEFAULT 0,
  `currency` VARCHAR(10) DEFAULT 'NPR',
  `status` ENUM('draft','sent','partial','paid','overdue','cancelled') DEFAULT 'draft',
  `invoice_date` DATE DEFAULT NULL,
  `due_date` DATE DEFAULT NULL,
  `payments` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Supplier Expenses table
CREATE TABLE IF NOT EXISTS `supplier_expenses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `assignment_id` INT(11) DEFAULT NULL,
  `vendor_id` INT(11) DEFAULT NULL,
  `vendor_name` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `quoted_amount` DECIMAL(15,2) DEFAULT 0,
  `actual_amount` DECIMAL(15,2) DEFAULT 0,
  `payment_status` ENUM('unpaid','partial','paid') DEFAULT 'unpaid',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user
INSERT INTO `users` (`first_name`, `last_name`, `email`, `role`, `phone`) VALUES
('System', 'Admin', 'admin@travelops.pro', 'admin', '+977-9841234567');

-- Insert sample data
INSERT INTO `leads` (`lead_number`, `client_name`, `client_email`, `client_phone`, `client_country`, `pax_adults`, `pax_children`, `budget_min`, `budget_max`, `currency`, `lead_source`, `status`, `priority`, `notes`) VALUES
('LD-2026-0001', 'Hari Bahadur Thapa', 'hari.thapa@gmail.com', '+977-9841111222', 'Nepal', 4, 2, 85000, 120000, 'NPR', 'website', 'quoting', 'high', 'Family trip to Annapurna Base Camp trek'),
('LD-2026-0002', 'Priya Maharjan', 'priya.m@yahoo.com', '+977-9852222333', 'Nepal', 2, 0, 45000, 65000, 'NPR', 'referral', 'negotiation', 'urgent', 'Honeymoon package - Pokhara and Mustang');

INSERT INTO `bookings` (`booking_number`, `client_name`, `destination`, `start_date`, `end_date`, `pax_adults`, `pax_children`, `total_amount`, `currency`, `status`, `category`, `special_requests`) VALUES
('BK-2026-0001', 'Sunil Karki', 'Pokhara Corporate Retreat', '2026-06-15', '2026-06-18', 15, 0, 285000, 'NPR', 'confirmed', 'corporate_retreat', 'Conference hall, team building activities'),
('BK-2026-0002', 'Kamala Devi (School)', 'Chitwan National Park', '2026-07-20', '2026-07-23', 30, 5, 215000, 'NPR', 'confirmed', 'school_college', 'Educational guide, jungle safari');

INSERT INTO `vendors` (`name`, `type`, `contact_person`, `email`, `phone`, `location`, `rating`, `vehicle_number`, `vehicle_type`) VALUES
('Himalayan Safari Wheels', 'Vehicle', 'Dipak Rai', 'info@himalayanwheels.com.np', '+977-01-4567890', 'Kathmandu, Nepal', 5.00, 'Ba 2 Ka 1234', 'Scorpio'),
('Hotel Yak & Yeti', 'Hotel', 'Suman Shakya', 'reservations@yakyeti.com.np', '+977-01-4234567', 'Kathmandu, Nepal', 5.00, NULL, NULL);
