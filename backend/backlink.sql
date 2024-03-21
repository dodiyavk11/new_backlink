-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 03:29 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `author`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Updated', '<h1>This is a Updated</h1><p>This is a Updated blog.</p>', 2, 1, '2023-09-19 09:54:49', '2023-09-19 11:28:38');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(30) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `status` int(1) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `email`, `mobile`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Jayesh Naghera', 'rjnaghera@gmail.com', '09033389733', 'Testing for publisher side', 1, '2024-01-24 09:55:21', '2024-01-24 10:53:33'),
(2, 'Jayesh Naghera', 'rjnaghera@gmail.com', '09033389733', 'Testing for user side', 0, '2024-01-24 09:58:51', '2024-01-24 09:58:51'),
(3, 'Jayesh Naghera', 'rjnaghera@gmail.com', '09033389733', '22222', 1, '2024-01-24 10:01:07', '2024-01-24 11:57:47'),
(4, 'Jayesh Naghera', 'rjnaghera@gmail.com', '09033389733', '3333333333', 0, '2024-01-24 10:01:38', '2024-01-24 11:58:00'),
(5, 'Jayesh Naghera', 'rjnaghera@gmail.com', '09033389733', '444444', 0, '2024-01-24 10:02:29', '2024-01-24 11:58:03'),
(6, 'Jayesh Naghera', 'rjnaghera@gmail.com', '09033389733', 'dasds', 1, '2024-01-24 10:13:30', '2024-01-24 11:56:29'),
(7, 'Jayesh Nagherassssssssssssssssssssssss', 'rjnaghera@gmail.com', '09033389733', 'dss', 0, '2024-01-24 19:18:26', '2024-01-24 19:18:26'),
(8, 'Jayesh Nagheradsdsdsdsdsdsd', 'rjnaghera@gmail.com', '09033389733', 'dsdsdsds', 0, '2024-01-24 19:18:46', '2024-01-24 19:18:46');

-- --------------------------------------------------------

--
-- Table structure for table `customer_domain_data`
--

CREATE TABLE `customer_domain_data` (
  `id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL,
  `traffic` int(11) NOT NULL DEFAULT 0,
  `anchor_text` varchar(50) DEFAULT NULL,
  `delivery_time` varchar(50) DEFAULT NULL,
  `link` varchar(50) DEFAULT NULL,
  `language` varchar(15) DEFAULT NULL,
  `visibility_index` decimal(10,2) DEFAULT 0.00,
  `domain_rating` int(11) NOT NULL DEFAULT 0,
  `rating` decimal(1,1) NOT NULL DEFAULT 0.0,
  `referring` int(11) NOT NULL DEFAULT 0,
  `citation_flow` int(11) NOT NULL DEFAULT 0,
  `trust_flow` int(11) NOT NULL DEFAULT 0,
  `authority` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_domain_data`
--

INSERT INTO `customer_domain_data` (`id`, `domain_id`, `traffic`, `anchor_text`, `delivery_time`, `link`, `language`, `visibility_index`, `domain_rating`, `rating`, `referring`, `citation_flow`, `trust_flow`, `authority`, `created_at`, `updated_at`) VALUES
(1, 1, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 04:36:22', '2023-12-20 04:36:22'),
(2, 2, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 04:36:59', '2023-12-20 04:36:59'),
(3, 3, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 04:51:43', '2023-12-20 04:51:43'),
(4, 4, 0, NULL, NULL, NULL, NULL, '0.00', 0, '0.0', 0, 0, 0, 0, '2024-01-26 08:37:21', '2024-01-26 08:37:21'),
(5, 5, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2024-01-31 11:43:27', '2024-01-31 11:43:27'),
(6, 6, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2024-01-31 11:47:59', '2024-01-31 11:47:59'),
(7, 7, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2024-02-08 10:40:52', '2024-02-08 10:40:52'),
(8, 8, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2024-03-14 04:46:27', '2024-03-14 04:46:27'),
(9, 9, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2024-03-21 04:05:19', '2024-03-21 04:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` int(11) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `tld` varchar(25) NOT NULL,
  `budget` decimal(8,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `isArchieved` int(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `hash_id` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `domain_name`, `tld`, `budget`, `category_id`, `status`, `isArchieved`, `user_id`, `hash_id`, `created_at`, `updated_at`) VALUES
(1, 'besticoder.com', 'com', '0.00', NULL, 1, 0, 51, 'qmewbubj', '2023-12-20 04:36:12', '2023-12-20 04:36:12'),
(2, 'w3schools.com', 'com', '0.00', NULL, 1, 0, 51, 'bxmudk8h', '2023-12-20 04:36:47', '2024-01-26 06:49:01'),
(3, 'placehold.co', 'co', '0.00', NULL, 1, 1, 51, 'vz9rznhj', '2023-12-20 04:51:34', '2024-01-26 06:48:52'),
(4, 'jayeshnaghera.com', 'com', '0.00', 6, 1, 0, 51, '1zkpu99s', '2024-01-26 08:37:03', '2024-01-31 12:04:58'),
(5, 'music.com', 'com', '0.00', 31, 1, 0, 51, 'pez4cshj', '2024-01-31 11:42:54', '2024-01-31 11:46:28'),
(6, 'javatpoint.com', 'com', '0.00', 23, 1, 0, 51, '28jp152x', '2024-01-31 11:47:09', '2024-01-31 11:47:09'),
(7, 'www.listelligent.com', 'com/', '0.00', 16, 1, 0, 55, 'hgj216zu', '2024-02-08 10:40:15', '2024-03-14 04:15:22'),
(8, 'backlinked.com', 'com', '10.00', 31, 1, 1, 55, '5ujge9vl', '2024-03-14 04:46:05', '2024-03-14 06:34:30'),
(9, 'example.com', 'com/', '0.00', 6, 1, 0, 56, '6u0y5j8c', '2024-03-21 04:05:11', '2024-03-21 04:05:11');

-- --------------------------------------------------------

--
-- Table structure for table `domain_categories`
--

CREATE TABLE `domain_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `domain_categories`
--

INSERT INTO `domain_categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(4, 'Tourism & Travel', 'Tourism & Travel', '2023-10-10 13:20:58', '2023-10-10 13:20:58'),
(5, 'Electronics & Computers', 'Electronics & Computers', '2023-10-10 13:21:50', '2023-10-10 13:21:50'),
(6, 'Internet & SEO', 'Internet & SEO', '2023-10-10 13:23:12', '2023-10-10 13:23:12'),
(7, 'Telecommunications', 'Telecommunications', '2023-10-10 13:23:17', '2023-10-10 13:23:17'),
(8, 'Finances & Insurances', 'Finances & Insurances', '2023-10-10 13:23:30', '2023-10-10 13:23:30'),
(9, 'Politics & Economy', 'Politics & Economy', '2023-10-10 13:23:45', '2023-10-10 13:23:45'),
(10, 'News & Media', 'News & Media', '2023-10-10 13:24:00', '2023-10-10 13:24:00'),
(11, 'PC Games & Toys', 'PC Games & Toys', '2023-10-10 13:24:22', '2023-10-10 13:24:22'),
(12, 'Nutrition', 'Nutrition', '2023-10-10 13:24:38', '2023-10-10 13:24:38'),
(13, 'Free time & hobbies', 'Free time & hobbies', '2023-10-10 13:24:48', '2023-10-10 13:24:48'),
(14, 'Health & Recreation', 'Health & Recreation', '2023-10-10 13:25:06', '2023-10-10 13:25:06'),
(15, 'Sports & Training', 'Sports & Training', '2023-10-10 13:25:23', '2023-10-10 13:25:23'),
(16, 'Business & Marketing', 'Business & Marketing', '2023-10-10 13:25:44', '2023-10-10 13:25:44'),
(17, 'Car & Motorcycle', 'Car & Motorcycle', '2023-10-10 13:26:06', '2023-10-10 13:26:06'),
(18, 'Eroticism & Love', 'Eroticism & Love', '2023-10-10 13:26:23', '2023-10-10 13:26:23'),
(19, 'People & Relationships', 'People & Relationships', '2023-10-10 13:26:43', '2023-10-10 13:26:43'),
(20, 'Events', 'Events', '2023-10-10 13:27:19', '2023-10-10 13:27:19'),
(21, 'Job & Career', 'Job & Career', '2023-10-10 13:27:32', '2023-10-10 13:27:32'),
(22, 'Society', 'Society', '2023-10-10 13:27:48', '2023-10-10 13:27:48'),
(23, 'Other', 'Other', '2023-10-10 13:28:02', '2023-10-10 13:28:02'),
(24, 'Shopping', 'Shopping', '2023-10-10 13:28:15', '2023-10-10 13:28:15'),
(25, 'Machines & Technology', 'Machines & Technology', '2023-10-10 13:28:26', '2023-10-10 13:28:26'),
(26, 'Home & Garden', 'Home & Garden', '2023-10-10 13:28:41', '2023-10-10 13:28:41'),
(27, 'Real Estate & Housing', 'Real Estate & Housing', '2023-10-10 13:28:55', '2023-10-10 13:28:55'),
(28, 'Family & Education', 'Family & Education', '2023-10-10 13:29:12', '2023-10-10 13:29:12'),
(29, 'Culture', 'Culture', '2023-10-10 13:29:29', '2023-10-10 13:29:29'),
(30, 'Lifestyle & Fashion', 'Lifestyle & Fashion', '2023-10-10 13:29:39', '2023-10-10 13:29:39'),
(31, 'Education & Knowledge', 'Education & Knowledge', '2023-10-10 13:29:53', '2023-10-10 13:29:53'),
(32, 'Environment & Nature', 'Environment & Nature', '2023-10-10 13:30:07', '2023-10-10 13:30:07'),
(33, 'Animals & Accessories', 'Animals & Accessories', '2023-10-10 13:30:22', '2023-10-10 13:30:22'),
(34, 'Science', 'Science', '2023-10-10 13:30:38', '2023-10-10 13:30:38'),
(35, 'Law & Taxes', 'Law & Taxes', '2023-10-10 13:30:55', '2023-10-10 13:30:55'),
(36, 'Local & Regional', 'Local & Regional', '2023-10-10 13:31:09', '2023-10-10 13:31:09'),
(37, 'Beauty & Wellness', 'Beauty & Wellness', '2023-10-10 13:31:23', '2023-10-10 13:31:23'),
(38, 'Casino & Sports Betting', 'Casino & Sports Betting', '2023-10-10 13:31:36', '2023-10-10 13:31:36'),
(39, 'Cannabis', 'Cannabis', '2023-10-10 13:31:51', '2023-10-10 13:31:51'),
(40, 'Cryptocurrency', 'Cryptocurrency', '2023-10-10 13:32:01', '2023-10-10 13:32:01');

-- --------------------------------------------------------

--
-- Table structure for table `domain_request`
--

CREATE TABLE `domain_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `pmessage` text DEFAULT NULL,
  `status` int(1) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `domain_request`
--

INSERT INTO `domain_request` (`id`, `user_id`, `publisher_id`, `domain_id`, `message`, `pmessage`, `status`, `created_at`, `updated_at`) VALUES
(1, 55, 53, 6, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 2, '2024-03-14 09:59:29', '2024-03-21 13:46:19'),
(2, 55, 53, 4, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 0, '2024-03-14 10:27:46', '2024-03-14 10:27:46'),
(3, 55, 53, 3, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 0, '2024-03-14 03:13:16', '2024-03-14 10:15:34'),
(4, 56, 53, 6, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 1, '2024-03-21 10:17:51', '2024-03-21 13:47:05'),
(5, 56, 53, 4, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 1, '2024-03-21 11:29:10', '2024-03-21 17:55:21'),
(6, 57, 53, 6, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 1, '2024-03-21 12:58:08', '2024-03-21 18:32:51'),
(7, 57, 53, 4, 'Ich interessiere mich für den Domainnamen. Können Sie mir diesen bitte mitteilen?', NULL, 1, '2024-03-21 12:59:09', '2024-03-21 16:51:34');

-- --------------------------------------------------------

--
-- Table structure for table `domain_tags`
--

CREATE TABLE `domain_tags` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `domain_tags`
--

INSERT INTO `domain_tags` (`id`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(3, 'Test', 1, '2023-09-15 18:05:44', '2023-09-15 18:13:47'),
(6, 'Tags 55', 1, '2023-09-15 18:12:02', '2023-09-15 18:12:02');

-- --------------------------------------------------------

--
-- Table structure for table `email_formats`
--

CREATE TABLE `email_formats` (
  `id` int(11) NOT NULL,
  `email_title` varchar(255) DEFAULT NULL,
  `email_type` text DEFAULT NULL COMMENT 'use to find template base on require',
  `email_content` text DEFAULT NULL,
  `header` text DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `isDefault` int(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_formats`
--

INSERT INTO `email_formats` (`id`, `email_title`, `email_type`, `email_content`, `header`, `file`, `isDefault`, `createdAt`, `updatedAt`) VALUES
(2, 'Registration', 'registration', '<p><strong>Hello {user_name},</strong></p><p>Thank you very much for your registration.</p><p>Please confirm your email address {user_email} with this link:</p><p><strong style=\"background-color: rgb(192, 222, 96);\">{verification_Link}</strong></p><p><strong>Best regards</strong></p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>FairLinked.com</strong></a></p>', 'Please complete registration', NULL, 1, '2023-09-19 11:27:57', '2023-12-18 15:48:43'),
(3, 'New Order', 'create_new_order', '<p><span style=\"font-size: 18pt;\"><strong>{name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">The Backlink team has created the order \"{order_name}\" for you.</span></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Register now on the platform:</span></span></p>\n<p><span style=\"background-color: rgb(192, 222, 96); font-size: 12pt;\"><strong><span style=\"font-size: medium;\">Backlink</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'Backlink has created an order ', NULL, 1, '2023-09-22 12:16:36', '2023-09-22 12:16:36'),
(4, 'Order status changes', 'order_status', '<p><strong>Hello,</strong> {name}</p><p>The status of your order \"<strong>{order_name}</strong>\" has been changed to \"<strong>{order_status}</strong>\".</p><p>Take a look at your order now:</p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\">Login</a>&nbsp;</p>', 'There is news about your order', NULL, 1, '2023-09-26 12:04:46', '2023-12-18 13:19:57'),
(5, 'Welcome', 'welcome', '<p><strong>Hello {user_name},</strong></p><p>Thank you very much for your registration and Verify email your account now activated .</p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgb(192, 222, 96);\">Login</a></p>', 'Welcome to Backling family', 'attachement_1702894693356.pdf', 1, '2023-09-27 09:22:02', '2023-12-18 15:48:13'),
(6, 'Subscription Confirmed', 'subscription_purchase', '<h1>Subscription Confirmed</h1><p>Dear {username},</p><p><br></p><p>Thank you for subscribing to our plan. You\'re now part of our exclusive community!</p><p><br></p><p>Here are your subscription details:</p><ul><li><strong>Plan Name:</strong> {planname}</li><li><strong>Price:</strong> {price}</li><li><strong>Start Date:</strong> {startdate}</li><li><strong>End Date:</strong> {enddate}</li></ul><p>If you have any questions or need assistance, feel free to contact our support team.</p><p><br></p><p>Best regards, <a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>FairLinked.com</strong></a></p>', 'Your Subscription is Confirmed.', NULL, 1, '2023-09-28 13:17:59', '2023-12-18 13:22:15'),
(7, 'Subscription Expired', 'subscription_expire', '<h1>Subscription Plan Expired</h1><p>Dear {username},</p><p><br></p><p>We regret to inform you that your subscription plan has expired. Your access to our services is now limited.</p><p><br></p><p>Here are the details of your expired subscription plan:</p><ul><li><strong>Plan Name:</strong> {planname}</li><li><strong>Price:</strong> {price}</li><li><strong>Start Date:</strong> {startdate}</li><li><strong>End Date:</strong> {enddate}</li></ul><p>If you wish to continue using our services, please renew your subscription plan.</p><p><br></p><p>Best regards, <a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>FairLinked</strong></a></p>', 'Subscription Plan Expired', NULL, 1, '2023-09-28 14:58:33', '2023-12-18 13:21:40'),
(8, 'New domain added', 'new_domain_added', '<h1>New domain added in your Portfolio</h1><p>Dear {username},</p><p><br></p><p>We inform you that your Portfolio added new domain.</p><p>Here are the details of your new added domain</p><ul><li><strong>Domain name:</strong> {domain_name}</li><li><strong>Price:</strong> {price}</li><li><strong>Category:</strong> {category}</li></ul><p>Best regards, <a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>FairLinked</strong></a></p>', 'New Domain added in your Portfolio', NULL, 1, '2023-10-11 15:14:59', '2023-12-18 13:20:45'),
(9, 'Order Cancel', 'order_cancel', '<p><strong>Hello,</strong> {name}</p><p>The status of your order \"<strong>{order_name}</strong>\" has been changed to \"<strong>{order_status}</strong>\".</p><p>Your order has been Cancelled successfully,and <strong>Rs.{amount}</strong> refunded in your wallet.</p><p>Take a look at your order now:</p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgb(192, 222, 96);\"><strong>Login</strong></a></p><p>&nbsp;</p>', 'Your order has been Cancelled successfully', NULL, 1, '2023-10-12 14:13:23', '2023-12-18 13:20:23'),
(11, 'Order Delete', 'order_delete', '<p>Hi {username},</p><p>Your Order {ordername} has been deleted successfully.</p><p><strong>Best regards</strong></p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><em>login</em> to view</a></p>', 'Your Order has been delete ', NULL, 0, '2023-12-18 16:05:47', '2023-12-18 16:06:32'),
(12, 'Forgot Password Link', 'forgot_password', '<p>Hello <strong>{user_name},</strong></p><p>Please click here below link to reset your account password :</p><p><strong style=\"background-color: rgb(192, 222, 96);\">{verification_Link}</strong></p><p><strong>Best regards</strong></p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>FairLinked.com</strong></a></p>', 'Click link to reset password', NULL, 1, '2023-12-20 10:51:19', '2023-12-20 10:58:22'),
(13, 'User contact us', 'user_contact_us', '<p>Hi Admin,</p><p>Our FairLinked user has contacted us with an issue.</p><p><br></p><p><strong>Name : </strong>{name}</p><p><strong>Email : </strong>{email}</p><p><strong>Phone : </strong>{phone}</p><p><strong>Problem : </strong>{problem}</p>', 'User Contact us', NULL, 1, '2024-01-24 09:31:10', '2024-01-24 09:31:10'),
(14, 'Backlink Activation', 'backlink_actived', '<p><strong>Hello {user_name},</strong></p><p>Your submitted <strong>{backlink_name}</strong> backlink has been reviewed and activated by our <strong>FairLinked</strong> team.</p><p><br></p><p><strong>Best regards</strong></p><p><a href=\"http://fairlinked.bestprojectmanagementtool.com/app/login\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>FairLinked.com</strong></a></p>', 'Your submitted backlink has been reviewed.', NULL, 1, '2024-02-19 15:23:46', '2024-02-19 15:23:46'),
(15, 'New domain reveal request', 'domain_reveal_request', '<p><strong>Hello {user_name},</strong></p><p>Your domain <strong>{domain_name} </strong>have new Reveal request.</p><p><strong>Message: </strong>{message}</p><p><br></p><p><strong>FairLinked</strong> team.</p>', 'You have new Domain reveal request', NULL, 1, '2024-02-20 10:15:17', '2024-02-20 10:15:17'),
(16, 'Domain reveal request update', 'domain_reveal_request_update', '<p><strong>Hello {user_name},</strong></p><p>Your request to reveal the domain <strong>{domain_name}</strong> has been <strong>{status}</strong>.</p><p><br></p><p><strong>FairLinked</strong> team.</p>', 'Your domain reveal request is update', NULL, 1, '2024-02-20 14:48:05', '2024-02-20 14:48:05');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `status`, `created_at`, `updated_at`) VALUES
(1, 'How to add project', 'go to register and register then verify email and sign to show project menu to add project ', 1, '2023-09-19 12:39:23', '2023-09-19 12:39:23'),
(2, 'How to Vefiry email after register', 'Login and goto profile section click on account...', 1, '2023-09-19 12:40:14', '2023-09-19 12:52:29'),
(3, 'How to change password', 'Login and goto profile section click on account', 1, '2023-09-19 12:42:15', '2023-09-19 12:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_products`
--

CREATE TABLE `favorite_products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `forgotpasswords`
--

CREATE TABLE `forgotpasswords` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forgotpasswords`
--

INSERT INTO `forgotpasswords` (`id`, `email`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 'userside@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzaWRlQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA0OTQyMiwiZXhwIjoxNzAzMDUwMDIyfQ.KawsCRuPzLlLLCMSeWZm1f0Iif8z4wPJL4VJ8YkYaR4', '2023-12-20 10:47:02', '2023-12-20 10:47:02'),
(2, 'userside@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzaWRlQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA0OTk0MSwiZXhwIjoxNzAzMDUwNTQxfQ.be_gC7J8Uhvl6hl4SDgvkqfhNJQVzzRZhXteV7svBB0', '2023-12-20 10:55:41', '2023-12-20 10:55:41'),
(3, 'userside@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzaWRlQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA1MDExMSwiZXhwIjoxNzAzMDUwNzExfQ.R4oBaLIQhm1GS_vve7Z2BdAB6pH6Yx_U3KIrwuMIjvg', '2023-12-20 10:58:31', '2023-12-20 10:58:31'),
(4, 'userside@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzaWRlQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA1MDE0MCwiZXhwIjoxNzAzMDUwNzQwfQ.dJ9vZJPmdCbPubkVzV2-4rhl91Eaq6dIaiZiqgilf-M', '2023-12-20 10:59:00', '2023-12-20 10:59:00'),
(5, 'userside@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzaWRlQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA1MDIxMCwiZXhwIjoxNzAzMDUwODEwfQ.zWzHEVFL6MaBmBznofUEKweIn9bLbvb-7wKRO-rRPe8', '2023-12-20 11:00:10', '2023-12-20 11:00:10'),
(6, 'userside@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzaWRlQGdtYWlsLmNvbSIsImlhdCI6MTcwMzA1MDI0MSwiZXhwIjoxNzAzMDUwODQxfQ.AvUFE-MTdoXHAHsmsr99eQVnzp0Oy3R-_3W8RH5yo8U', '2023-12-20 11:00:41', '2023-12-20 11:00:41'),
(7, 'publisher2@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1Ymxpc2hlcjJAZ21haWwuY29tIiwiaWF0IjoxNzAzMDUwMzU3LCJleHAiOjE3MDMwNTA5NTd9.MtiM3VL-CapGIBXbrh6MYwZvhfhkvh5zDuoPZzUb4FE', '2023-12-20 11:02:37', '2023-12-20 11:02:37');

-- --------------------------------------------------------

--
-- Table structure for table `link_bundle_blog`
--

CREATE TABLE `link_bundle_blog` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `link_bundle_blog`
--

INSERT INTO `link_bundle_blog` (`id`, `heading`, `description`) VALUES
(1, 'Ultimate link building starting at 347 Euro', '<p>You lack the time or expertise to search backlinks from our portfolio? Our team will gladly take over this task for you!</p><p>Our link packages not only have impressively high visibility values, the content also achieves maximum topic relevance. We create an individual article for each backlink and publish it with selected publishers.</p><p>After your booking, you can easily personalize your link package by selecting the desired link targets, anchor texts as well as the date of publication. Then our team plans the link building measures according to your specifications. As soon as all backlinks from the booked link package have been completed, you will receive a detailed link report. If you have any questions about our link packages, our support team will be happy to help you. You can reach us by e-mail, live chat or phone at 0228 / 286 795 60.</p><p>Note: We reserve the right to refuse any booking. Please note that we generally refuse bookings from the following areas: Eroticism, Cannabis / CBD, Tobacco &amp; Co. or Mechanical Engineering.Note: We reserve the right to refuse any booking. Please note that we generally refuse bookings from the following areas: Eroticism, Cannabis / CBD, Tobacco &amp; Co. or Mechanical Engineering.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) DEFAULT 0,
  `order_id` int(11) NOT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `files` text DEFAULT NULL,
  `role` int(11) NOT NULL,
  `isRead` int(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `order_id`, `domain_id`, `message`, `files`, `role`, `isRead`, `created_at`, `updated_at`) VALUES
(1, 56, 53, 0, 6, 'Hi i am user1 side1', NULL, 0, 1, '2024-03-21 13:02:01', '2024-03-21 13:40:05'),
(2, 57, 53, 0, 6, 'i am user1 side2', NULL, 0, 1, '2024-03-21 13:03:04', '2024-03-21 13:40:09'),
(3, 57, 53, 0, 4, 'for new domain user2 side2 placeholder', NULL, 0, 1, '2024-03-21 13:03:31', '2024-03-21 13:40:07'),
(4, 56, 53, 0, 4, 'i am another user1 for placeholder.com', NULL, 0, 1, '2024-03-21 13:04:01', '2024-03-21 13:40:02');

-- --------------------------------------------------------

--
-- Table structure for table `new_orders`
--

CREATE TABLE `new_orders` (
  `id` int(11) NOT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `backlink_id` int(11) NOT NULL,
  `status` enum('Pending','Inprogress','Completed','Cancelled','Rejected','MissingDetails') DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `anchortext` varchar(100) DEFAULT NULL,
  `linktarget` varchar(255) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `project_id` varchar(50) DEFAULT NULL,
  `hash_id` varchar(50) DEFAULT NULL,
  `textCreation` varchar(50) NOT NULL,
  `wordCount` int(10) NOT NULL,
  `approveText` int(1) NOT NULL,
  `textCreationPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `approveTextPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `chooseByBacklink` int(1) NOT NULL DEFAULT 0,
  `isBundle` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `new_orders`
--

INSERT INTO `new_orders` (`id`, `publisher_id`, `customer_id`, `domain_id`, `backlink_id`, `status`, `total_price`, `price`, `anchortext`, `linktarget`, `publication_date`, `note`, `project_id`, `hash_id`, `textCreation`, `wordCount`, `approveText`, `textCreationPrice`, `approveTextPrice`, `chooseByBacklink`, `isBundle`, `created_at`, `updated_at`) VALUES
(1, 53, 51, 3, 3, 'Cancelled', '627.00', '550.00', 'First Test', 'https://backlinked.com/', '0000-00-00', 'Note is note', 'bxmudk8h', 'ioq9a4xt', 'Editorial', 1000, 1, '50.00', '27.00', 0, 0, '2023-12-20 04:41:14', '2023-12-20 04:41:37'),
(2, 53, 51, 2, 2, 'MissingDetails', '422.00', '422.00', 'Anchor text hereee', 'https://backlinked.com/', '0000-00-00', 'Note is note', 'qmewbubj', 'sc8fw0b6', 'Own', 0, 0, '0.00', '0.00', 0, 0, '2023-12-20 04:42:30', '2024-01-29 09:26:29'),
(3, 53, 51, 3, 3, 'Pending', '627.00', '550.00', 'Testing', 'https://getbootstrap.com/docs/4.0/utilities/flex/111', '2023-12-30', 'Noteeeeeeeeeeeeee', 'vz9rznhj', 'ioq9a4xt', 'Editorial', 1000, 1, '50.00', '27.00', 0, 0, '2023-12-20 04:52:37', '2023-12-20 04:52:37'),
(4, 53, 51, 6, 5, 'Cancelled', '927.00', '850.00', '121212', 'https://getbootstrap.com/docs/4.0/utilities/flex/', '0000-00-00', 'fgfg', 'vz9rznhj', 'g6cr1wux', 'Editorial', 1000, 1, '50.00', '27.00', 0, 0, '2023-12-20 05:57:10', '2023-12-20 06:01:01'),
(5, 52, 51, 1, 1, 'Pending', '350.00', '350.00', 'sdsd', 'https://backlinked.com/', '2024-01-27', 'Testing', '', 'za5fnvp0', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-25 09:24:54', '2024-01-25 09:24:54'),
(6, 53, 51, 6, 5, 'Pending', '850.00', '850.00', 'Backlinked', 'https://backlinked.com/', '2024-01-31', '', '', 'g6cr1wux', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-25 13:40:21', '2024-01-25 13:40:21'),
(7, 52, 51, 1, 1, 'Pending', '350.00', '350.00', '25012024', 'https://p1.2024web.com/', '2024-04-15', '15042024', 'vz9rznhj', 'za5fnvp0', 'Own', 0, 0, '0.00', '0.00', 0, 0, '2024-01-25 13:41:31', '2024-01-25 13:41:31'),
(8, 53, 51, 4, 4, 'Pending', '1050.00', '1050.00', 'FairlLinked', 'https://p1.2024web.com/', '0000-00-00', 'FairlLinked', '', '36weorau', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 03:46:24', '2024-01-26 03:46:24'),
(9, 53, 51, 3, 3, 'Pending', '550.00', '550.00', 'bestprojectmanagementtool', 'http://fairlinked.bestprojectmanagementtool.com', '0000-00-00', '', '', 'ioq9a4xt', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 03:46:24', '2024-01-26 03:46:24'),
(10, 53, 51, 2, 2, 'Pending', '422.00', '422.00', 'Stripe', 'https://stripe.com/docs/testing', '2024-01-31', 'Note test for change`', '', 'sc8fw0b6', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 03:52:05', '2024-01-26 03:52:05'),
(11, 52, 51, 1, 1, 'Pending', '350.00', '350.00', 'Note after placeorder view summary', 'https://stripe.com', '2024-02-01', 'Note after placeorder view summary`', '', 'za5fnvp0', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 03:52:06', '2024-01-26 03:52:06'),
(12, 52, 51, 1, 1, 'Pending', '350.00', '350.00', 'Backlinked', 'https://mail.google.com/', '2024-02-10', 'Gtesoo', 'vz9rznhj', 'za5fnvp0', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 03:59:33', '2024-01-26 03:59:33'),
(13, 53, 51, 4, 4, 'Pending', '1050.00', '1050.00', 'Local`', 'http://localhost', '2024-02-15', 'Localhost', '', '36weorau', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 04:55:48', '2024-01-26 04:55:48'),
(14, 53, 51, 6, 5, 'Pending', '927.00', '850.00', '', 'https://stackoverflow.com/', '2024-01-31', 'Stack', 'qmewbubj', 'g6cr1wux', 'Editorial', 1000, 1, '50.00', '27.00', 1, 0, '2024-01-26 06:02:04', '2024-01-26 06:02:04'),
(15, 53, 51, 2, 2, 'Pending', '422.00', '422.00', 'Backlinked', 'https://getbootstrap.com/docs/4.0/utilities/flex/111', '2024-01-31', 'sdsdsds', '', 'sc8fw0b6', 'Editorial', 500, 0, '0.00', '0.00', 0, 0, '2024-01-26 06:03:26', '2024-01-26 06:03:26'),
(16, 53, 51, 3, 3, 'Pending', '627.00', '550.00', '', 'https://backlinked.com/', '2024-01-31', 'sdsds', 'vz9rznhj', 'ioq9a4xt', 'Editorial', 1000, 1, '50.00', '27.00', 1, 0, '2024-01-26 06:05:59', '2024-01-26 06:05:59'),
(17, 53, 51, 6, 5, 'Pending', '850.00', '850.00', '22222222222222222', 'https://backlinked.com/', '0000-00-00', 'd', '', 'g6cr1wux', 'Own', 0, 0, '0.00', '0.00', 0, 0, '2024-01-29 11:45:50', '2024-01-29 11:45:50'),
(18, 53, 55, 4, 4, 'Pending', '1050.00', '1050.00', 'List', 'https://www.listelligent.com/', '2024-04-15', 'testt 08022024', 'hgj216zu', '36weorau', 'Own', 0, 0, '0.00', '0.00', 0, 0, '2024-02-08 10:43:31', '2024-02-08 10:43:31');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email_message_received` tinyint(1) DEFAULT 1,
  `email_order_accepted` tinyint(1) DEFAULT 1,
  `email_order_completed` tinyint(1) DEFAULT 1,
  `email_order_created` tinyint(1) DEFAULT 1,
  `email_order_declined` tinyint(1) DEFAULT 1,
  `email_order_missing_details` tinyint(1) DEFAULT 1,
  `email_payment_failed` tinyint(1) DEFAULT 1,
  `email_payment_reminder` tinyint(1) DEFAULT 1,
  `email_payment_succeeded` tinyint(1) DEFAULT 1,
  `email_recommendations_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `email_message_received`, `email_order_accepted`, `email_order_completed`, `email_order_created`, `email_order_declined`, `email_order_missing_details`, `email_payment_failed`, `email_payment_reminder`, `email_payment_succeeded`, `email_recommendations_available`, `created_at`, `updated_at`) VALUES
(1, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2023-12-20 04:27:15', '2023-12-20 04:54:01'),
(2, 52, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-12-20 04:29:14', '2023-12-20 04:29:14'),
(3, 53, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-12-20 04:33:08', '2023-12-20 04:33:08'),
(5, 55, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, '2024-02-08 10:39:17', '2024-03-14 06:36:41'),
(6, 56, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2024-03-21 03:26:08', '2024-03-21 03:26:08'),
(7, 57, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2024-03-21 03:48:29', '2024-03-21 03:48:29');

-- --------------------------------------------------------

--
-- Table structure for table `orderfiles`
--

CREATE TABLE `orderfiles` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL COMMENT 'for file name or Link name',
  `file_path` varchar(255) DEFAULT NULL,
  `isLink` tinyint(1) NOT NULL DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderfiles`
--

INSERT INTO `orderfiles` (`id`, `order_id`, `file_name`, `original_name`, `file_path`, `isLink`, `link`, `created_at`, `updated_at`) VALUES
(1, 2, 'textFile1703047342557.docx', 'Dummy.docx', 'assets/order_assets/', 0, NULL, '2023-12-20 04:42:30', '2023-12-20 04:42:30'),
(2, 7, 'textFile1706190071281.docx', 'Dummy.docx', 'assets/order_assets/', 0, NULL, '2024-01-25 13:41:31', '2024-01-25 13:41:31'),
(3, 17, 'textFile1706528719892.docx', 'Review.docx', 'order_assets/', 0, NULL, '2024-01-29 11:45:50', '2024-01-29 11:45:50'),
(4, 18, 'textFile1707388904878.docx', 'Dummy.docx', 'order_assets/', 0, NULL, '2024-02-08 10:43:31', '2024-02-08 10:43:31');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `ordername` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `orderfile` varchar(255) DEFAULT NULL,
  `orderstatus` int(1) NOT NULL DEFAULT 1,
  `orderpriority` int(1) NOT NULL DEFAULT 1,
  `update_status_admin` int(1) NOT NULL DEFAULT 1,
  `update_status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `soft_delete` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `publisher_domains`
--

CREATE TABLE `publisher_domains` (
  `id` int(11) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `tld` varchar(25) NOT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `anchorText` varchar(100) DEFAULT NULL,
  `deliveryTime` int(11) NOT NULL DEFAULT 0,
  `attribute` varchar(50) DEFAULT NULL,
  `sensitiveTopic` int(1) NOT NULL,
  `sensitiveTopicCharge` decimal(10,2) DEFAULT NULL,
  `minWordCount` int(11) NOT NULL DEFAULT 0,
  `textByCustomer` int(1) NOT NULL DEFAULT 0,
  `textInclude` int(1) NOT NULL,
  `language` varchar(15) NOT NULL DEFAULT 'en',
  `user_id` int(11) NOT NULL,
  `hash_id` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publisher_domains`
--

INSERT INTO `publisher_domains` (`id`, `domain_name`, `tld`, `price`, `category_id`, `status`, `anchorText`, `deliveryTime`, `attribute`, `sensitiveTopic`, `sensitiveTopicCharge`, `minWordCount`, `textByCustomer`, `textInclude`, `language`, `user_id`, `hash_id`, `created_at`, `updated_at`) VALUES
(1, 'google.com', 'com', '350.00', 10, 1, 'As desired', 10, 'dofollow', 0, '0.00', 0, 0, 1, 'en', 52, 'za5fnvp0', '2023-12-20 04:31:49', '2023-12-20 04:32:20'),
(2, 'getbootstrap.com', 'com', '422.39', 10, 1, 'As desired', 11, 'dofollow', 0, '0.00', 0, 0, 1, 'en', 53, 'sc8fw0b6', '2023-12-20 04:34:17', '2024-02-19 10:29:26'),
(3, 'backlinked.com', 'com', '550.00', 6, 1, 'As desired', 15, 'dofollow', 0, '0.00', 0, 0, 1, 'en', 53, 'ioq9a4xt', '2023-12-20 04:35:13', '2023-12-20 04:35:25'),
(4, 'placeholder.com', 'com', '1050.00', 23, 1, 'As desired / No restrictions', 5, 'dofollow', 0, '20.00', 400, 0, 0, 'en', 53, '36weorau', '2023-12-20 05:01:01', '2023-12-20 05:01:30'),
(5, 'tutorialspoint.com', 'com', '655.00', 25, 0, 'As desired', 20, 'dofollow', 0, '0.00', 0, 0, 1, 'en', 53, 'oaun65va', '2023-12-20 05:39:49', '2024-03-14 06:37:15'),
(6, 'chat.openai.com', 'com', '850.00', 31, 1, 'As desired', 20, 'dofollow', 0, '0.00', 0, 0, 1, 'en', 53, 'g6cr1wux', '2023-12-20 05:41:08', '2024-03-21 10:28:07');

-- --------------------------------------------------------

--
-- Table structure for table `publisher_domain_data`
--

CREATE TABLE `publisher_domain_data` (
  `id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL,
  `traffic` int(11) DEFAULT 0,
  `anchor_text` varchar(50) DEFAULT NULL,
  `delivery_time` varchar(50) DEFAULT NULL,
  `link` varchar(50) DEFAULT NULL,
  `language` varchar(15) DEFAULT NULL,
  `visibility_index` decimal(10,2) DEFAULT 0.00,
  `domain_rating` int(11) NOT NULL DEFAULT 0,
  `rating` decimal(1,1) NOT NULL DEFAULT 0.0,
  `referring` int(11) NOT NULL DEFAULT 0,
  `citation_flow` int(11) NOT NULL DEFAULT 0,
  `trust_flow` int(11) NOT NULL DEFAULT 0,
  `authority` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publisher_domain_data`
--

INSERT INTO `publisher_domain_data` (`id`, `domain_id`, `traffic`, `anchor_text`, `delivery_time`, `link`, `language`, `visibility_index`, `domain_rating`, `rating`, `referring`, `citation_flow`, `trust_flow`, `authority`, `created_at`, `updated_at`) VALUES
(1, 1, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 04:32:03', '2023-12-20 04:32:03'),
(2, 2, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 04:34:25', '2023-12-20 04:34:25'),
(3, 3, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 04:35:20', '2023-12-20 04:35:20'),
(4, 4, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 05:01:16', '2023-12-20 05:01:16'),
(5, 6, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 05:41:15', '2023-12-20 05:41:15'),
(6, 5, 0, NULL, NULL, NULL, NULL, '0.00', 91, '0.0', 0, 0, 0, 0, '2023-12-20 05:55:59', '2023-12-20 05:55:59');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `vat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `vat`) VALUES
(1, 19);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT 'NULL',
  `price` decimal(10,2) NOT NULL,
  `stripe_product_id` varchar(55) DEFAULT NULL,
  `stripe_price_id` varchar(55) DEFAULT NULL,
  `validity` int(11) NOT NULL,
  `max_request_per_day` int(11) NOT NULL COMMENT 'Per Day',
  `max_request_per_month` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `name`, `description`, `price`, `stripe_product_id`, `stripe_price_id`, `validity`, `max_request_per_day`, `max_request_per_month`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 'Basic plan for personal use', '25.00', NULL, NULL, 30, 2, NULL, 1, '2024-03-15 10:52:03', '2024-03-15 13:21:23'),
(2, 'Medium', 'Medium plan for your company', '50.00', NULL, NULL, 30, 5, NULL, 1, '2024-03-15 10:52:32', '2024-03-15 10:52:32'),
(3, 'Agency', 'Agency plan for Enterprise', '75.00', NULL, NULL, 30, 10, NULL, 1, '2024-03-15 10:53:00', '2024-03-21 04:47:44');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `cancellation_period` int(11) DEFAULT NULL COMMENT 'in Days',
  `max_domains_per_month` int(11) DEFAULT NULL,
  `max_orders` int(11) DEFAULT NULL,
  `credits_price` decimal(10,2) DEFAULT NULL,
  `credits_quota` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `validity` int(11) NOT NULL COMMENT 'in Days',
  `placement_in` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `description`, `price`, `cancellation_period`, `max_domains_per_month`, `max_orders`, `credits_price`, `credits_quota`, `status`, `validity`, `placement_in`, `created_at`, `updated_at`) VALUES
(1, 'Basics', 'Basic plan for indiindividual use', 350, 30, 2, 2, '0.00', 0, 1, 30, 'Blog,Magazines,Newspapers', '2023-09-27 05:20:00', '2024-03-15 11:24:44'),
(2, 'Medium s', 'Medium plan for indiindividual comapany use', 600, 30, 4, 25, NULL, NULL, 1, 30, 'Blog,Magazines,Newspapers', '2023-09-27 05:22:07', '2024-03-15 11:24:47'),
(3, 'Agencys', 'for Agency use', 900, 30, 6, 50, NULL, NULL, 1, 30, 'Blog,Magazines,Newspapers', '2023-09-27 05:23:28', '2024-03-15 11:24:51');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `inc_vat` decimal(10,2) DEFAULT 0.00,
  `transaction_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL COMMENT 'payment for plan or extra order',
  `payment_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transaction_id` varchar(255) DEFAULT NULL,
  `isPlan` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: order or other extra payment, 1: subscription plan payment',
  `plan_id` int(11) NOT NULL,
  `status` varchar(25) NOT NULL,
  `paymentData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `amount`, `inc_vat`, `transaction_type`, `description`, `payment_created`, `transaction_id`, `isPlan`, `plan_id`, `status`, `paymentData`, `order_id`, `created_at`) VALUES
(1, 55, '50.00', '59.50', 'Subscription plan Medium', 'succeeded', '2024-03-18 07:12:54', 'pi_3OvaNOSC7x5vD10M1ENlCkfI', 1, 2, 'paid', '{\"id\":\"pi_3OvaNOSC7x5vD10M1ENlCkfI\",\"object\":\"payment_intent\",\"amount\":5950,\"amount_details\":{\"tip\":{}},\"automatic_payment_methods\":null,\"canceled_at\":null,\"cancellation_reason\":null,\"capture_method\":\"automatic\",\"client_secret\":\"pi_3OvaNOSC7x5vD10M1ENlCkfI_secret_WmIw3AEEg3eQpnRDRONE2dFWm\",\"confirmation_method\":\"automatic\",\"created\":1710745974,\"currency\":\"inr\",\"description\":null,\"last_payment_error\":null,\"livemode\":false,\"next_action\":null,\"payment_method\":\"pm_1OvaNOSC7x5vD10MuMSUxnLv\",\"payment_method_configuration_details\":null,\"payment_method_types\":[\"card\"],\"processing\":null,\"receipt_email\":null,\"setup_future_usage\":null,\"shipping\":null,\"source\":null,\"status\":\"succeeded\"}', 0, '2024-03-18 07:12:54'),
(2, 56, '75.00', '89.25', 'Subscription plan Agency', 'succeeded', '2024-03-21 03:35:10', 'pi_3OwcPKSC7x5vD10M05l8s9rX', 1, 3, 'paid', '{\"id\":\"pi_3OwcPKSC7x5vD10M05l8s9rX\",\"object\":\"payment_intent\",\"amount\":8925,\"amount_details\":{\"tip\":{}},\"automatic_payment_methods\":null,\"canceled_at\":null,\"cancellation_reason\":null,\"capture_method\":\"automatic\",\"client_secret\":\"pi_3OwcPKSC7x5vD10M05l8s9rX_secret_Nz0c5E3qVH0nlP9AAu65Bb2Z6\",\"confirmation_method\":\"automatic\",\"created\":1710992110,\"currency\":\"inr\",\"description\":null,\"last_payment_error\":null,\"livemode\":false,\"next_action\":null,\"payment_method\":\"pm_1OwcPLSC7x5vD10MQGB84ZsM\",\"payment_method_configuration_details\":null,\"payment_method_types\":[\"card\"],\"processing\":null,\"receipt_email\":null,\"setup_future_usage\":null,\"shipping\":null,\"source\":null,\"status\":\"succeeded\"}', 0, '2024-03-21 03:35:10'),
(3, 57, '25.00', '29.75', 'Subscription plan Basic', 'succeeded', '2024-03-21 07:27:56', 'pi_3Owg2aSC7x5vD10M0gDET8uB', 1, 1, 'paid', '{\"id\":\"pi_3Owg2aSC7x5vD10M0gDET8uB\",\"object\":\"payment_intent\",\"amount\":2975,\"amount_details\":{\"tip\":{}},\"automatic_payment_methods\":null,\"canceled_at\":null,\"cancellation_reason\":null,\"capture_method\":\"automatic\",\"client_secret\":\"pi_3Owg2aSC7x5vD10M0gDET8uB_secret_XDW2TGhB7LKPWsN33HxcKFTt8\",\"confirmation_method\":\"automatic\",\"created\":1711006076,\"currency\":\"inr\",\"description\":null,\"last_payment_error\":null,\"livemode\":false,\"next_action\":null,\"payment_method\":\"pm_1Owg2bSC7x5vD10M6eZR5gxt\",\"payment_method_configuration_details\":null,\"payment_method_types\":[\"card\"],\"processing\":null,\"receipt_email\":null,\"setup_future_usage\":null,\"shipping\":null,\"source\":null,\"status\":\"succeeded\"}', 0, '2024-03-21 07:27:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `postal_code` int(11) NOT NULL DEFAULT 0,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL DEFAULT 'Germany',
  `company` varchar(255) NOT NULL,
  `vat_id` varchar(100) DEFAULT NULL,
  `bulk_invoice` int(1) NOT NULL DEFAULT 0,
  `invoice_email` varchar(255) NOT NULL,
  `isAdmin` int(11) NOT NULL DEFAULT 0 COMMENT '0:customer,1:admin,2:publisher',
  `isDeleted` int(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified`, `firstName`, `lastName`, `password`, `profile`, `phone`, `postal_code`, `address`, `city`, `country`, `company`, `vat_id`, `bulk_invoice`, `invoice_email`, `isAdmin`, `isDeleted`, `created_at`, `updated_at`) VALUES
(2, 'jayesh.besticoder@gmail.com', 1, 'Admin', 'Side', '$2a$11$fCg11cAgOk7RvVCffz7TuulHBoIYOMATc6iq6PjtlbbB5ieju4dG2', 'profileImg_1701080292599.png', '1234567890', 123, 'admin', 'admin', 'Germany', 'Admin', 'null', 0, '', 1, 0, '2023-09-13 17:40:39', '2023-11-28 18:36:04'),
(51, 'urjwpwhoso@zlorkun.com', 1, 'Users', 'Sides', '$2a$11$JRvGg878F9NbRiomWLj2OOcogSgLyrKR3Q1yAfGxQ0JJViiC7NLjy', 'profileImg_1703046435122.png', '123456789', 1233, 'vrl', 'new', 'Germany', 'Bus', 'VAT123AT', 1, 'example@mail.com', 0, 0, '2023-12-20 09:57:15', '2023-12-20 11:41:07'),
(52, 'publisher@gmail.com', 1, 'publisher', 'Side', '$2a$11$AyGO9mjpnaNiOKXhEztUo.VDBAfuXZUw6Wcx6lO3AdHiMio.jLmoi', 'profileImg_1703046553894.png', '123456789', 0, NULL, '', 'Germany', '', NULL, 0, '', 2, 0, '2023-12-20 09:59:14', '2024-01-24 12:53:35'),
(53, 'publisher2@gmail.com', 1, 'Publisher22', 'Side 22', '$2a$11$JDIXcKDP1maRbhZvWwl.B.EMBD.ZA/RbhSPS/U1/lkcKulA0AoJou', NULL, '123456789', 0, NULL, '', 'Germany', '', NULL, 0, '', 2, 0, '2023-12-20 10:03:08', '2024-01-24 12:56:29'),
(55, 'epys84x532@bloheyz.com', 1, 'Tests', 'Dev User', '$2a$11$/IrYNKKj.wgXAtKvduVTUei1H8SNBt5zwraM1HzybjdFJ3ZKMME3m', NULL, '132345', 123456, 'Test', 'Veraval', 'Germany', 'test', 'null', 0, '', 0, 0, '2024-02-08 16:09:17', '2024-03-14 12:06:11'),
(56, 'v5iu7f46e9@myinfoinc.com', 1, 'User1', 'Side1', '$2a$11$Gdqdht7RlmUXV0Pq7vbeoOU22cfQOhKu8Gr42h4mvVqdEFAEtDerK', 'profileImg_1710991568537.png', '123456789', 0, NULL, '', 'Germany', '', NULL, 0, '', 0, 0, '2024-03-21 08:56:08', '2024-03-21 08:57:12'),
(57, 'u9xfgk3t77@skygazerhub.com', 1, 'User2', 'Side2', '$2a$11$.zDZzttLUleH1WNwLU6GruAiLehMolcqcaGpJITuzed..kcRwbuMO', NULL, '1232', 0, NULL, '', 'Germany', '', NULL, 0, '', 0, 0, '2024-03-21 09:18:29', '2024-03-21 09:18:43');

-- --------------------------------------------------------

--
-- Table structure for table `users_wallet`
--

CREATE TABLE `users_wallet` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_wallet`
--

INSERT INTO `users_wallet` (`id`, `user_id`, `balance`, `created_at`, `updated_at`) VALUES
(1, 51, '845.00', '2024-02-01 10:54:01', '2024-02-01 10:54:01'),
(2, 55, '225.00', '2024-03-18 06:28:56', '2024-03-18 06:28:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_cart`
--

CREATE TABLE `user_cart` (
  `id` int(11) NOT NULL,
  `cart_id` varchar(25) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hash_id` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_subscriptions`
--

CREATE TABLE `user_subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `start_date` date NOT NULL DEFAULT current_timestamp(),
  `end_date` date DEFAULT NULL,
  `cancel_date` date DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `credits` int(11) DEFAULT 0,
  `transaction_id` varchar(255) NOT NULL,
  `payment_data` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 is Active Plan\r\n0 Expire '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_subscriptions`
--

INSERT INTO `user_subscriptions` (`id`, `user_id`, `plan_id`, `start_date`, `end_date`, `cancel_date`, `info`, `credits`, `transaction_id`, `payment_data`, `status`) VALUES
(1, 55, 2, '2024-03-18', '2024-04-18', NULL, NULL, 0, 'pi_3OvaNOSC7x5vD10M1ENlCkfI', 'pi_3OvaNOSC7x5vD10M1ENlCkfI', 1),
(2, 56, 3, '2024-03-21', '2024-04-21', NULL, NULL, 0, 'pi_3OwcPKSC7x5vD10M05l8s9rX', 'pi_3OwcPKSC7x5vD10M05l8s9rX', 1),
(3, 57, 1, '2024-03-21', '2024-04-21', NULL, NULL, 0, 'pi_3Owg2aSC7x5vD10M0gDET8uB', 'pi_3Owg2aSC7x5vD10M0gDET8uB', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_domain_data`
--
ALTER TABLE `customer_domain_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `domain_id` (`domain_id`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_hash_id` (`hash_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `domain_categories`
--
ALTER TABLE `domain_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `domain_request`
--
ALTER TABLE `domain_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `domain_tags`
--
ALTER TABLE `domain_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_formats`
--
ALTER TABLE `email_formats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorite_products`
--
ALTER TABLE `favorite_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_bundle_blog`
--
ALTER TABLE `link_bundle_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `new_orders`
--
ALTER TABLE `new_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orderfiles`
--
ALTER TABLE `orderfiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderfiles_ibfk_1` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `publisher_domains`
--
ALTER TABLE `publisher_domains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_hash_id` (`hash_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `publisher_domain_data`
--
ALTER TABLE `publisher_domain_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `domain_id` (`domain_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_wallet`
--
ALTER TABLE `users_wallet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`user_id`);

--
-- Indexes for table `user_cart`
--
ALTER TABLE `user_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `domain_id` (`hash_id`);

--
-- Indexes for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `customer_domain_data`
--
ALTER TABLE `customer_domain_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `domain_categories`
--
ALTER TABLE `domain_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `domain_request`
--
ALTER TABLE `domain_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `domain_tags`
--
ALTER TABLE `domain_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `email_formats`
--
ALTER TABLE `email_formats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favorite_products`
--
ALTER TABLE `favorite_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `link_bundle_blog`
--
ALTER TABLE `link_bundle_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `new_orders`
--
ALTER TABLE `new_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orderfiles`
--
ALTER TABLE `orderfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `publisher_domains`
--
ALTER TABLE `publisher_domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `publisher_domain_data`
--
ALTER TABLE `publisher_domain_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `users_wallet`
--
ALTER TABLE `users_wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_cart`
--
ALTER TABLE `user_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`);

--
-- Constraints for table `domains`
--
ALTER TABLE `domains`
  ADD CONSTRAINT `domains_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `domain_categories` (`id`),
  ADD CONSTRAINT `domains_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_wallet`
--
ALTER TABLE `users_wallet`
  ADD CONSTRAINT `users_wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  ADD CONSTRAINT `user_subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_subscriptions_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `subscription` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
