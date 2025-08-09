-- MySQL schema for DIU Admissions
CREATE DATABASE IF NOT EXISTS `diu_admissions` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `diu_admissions`;

CREATE TABLE IF NOT EXISTS `applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` VARCHAR(20) NOT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `nationality` VARCHAR(100) NOT NULL,
  `program` VARCHAR(100) NOT NULL,
  `level` VARCHAR(50) NOT NULL,
  `previous_institution` VARCHAR(255) NULL,
  `gpa` DECIMAL(3,2) NULL,
  `wants_newsletter` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

