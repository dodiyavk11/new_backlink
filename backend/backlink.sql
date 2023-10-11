-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2023 at 03:44 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` int(11) NOT NULL,
  `domain_name` varchar(255) NOT NULL,
  `tld` varchar(25) NOT NULL,
  `budget` decimal(8,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL,
  `hash_id` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `domain_name`, `tld`, `budget`, `category_id`, `status`, `user_id`, `hash_id`, `created_at`, `updated_at`) VALUES
(1, 'google.com', 'com', '0.00', 6, 1, 15, 'y8n78xoy', '2023-10-11 13:05:15', '2023-10-11 13:05:15');

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_formats`
--

INSERT INTO `email_formats` (`id`, `email_title`, `email_type`, `email_content`, `header`, `file`, `createdAt`, `updatedAt`) VALUES
(2, 'Registration', 'registration', '<p><span style=\"font-size: 18pt;\"><strong>Hello {user_name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Thank you very much for your registration.</span></span></p>\n<p><span style=\"font-size: 12pt;\">Please confirm your email address\n {user_email} with this link:</span></p>\n<p><span style=\"background-color: rgb(192, 222, 96);\"><strong><span style=\"font-size: 12pt; background-color: rgb(192, 222, 96);\">{verification_Link}</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'Please complete registration', NULL, '2023-09-19 11:27:57', '2023-09-19 11:27:57'),
(3, 'New Order', 'create_new_order', '<p><span style=\"font-size: 18pt;\"><strong>{name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">The Backlink team has created the order \"{order_name}\" for you.</span></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Register now on the platform:</span></span></p>\n<p><span style=\"background-color: rgb(192, 222, 96); font-size: 12pt;\"><strong><span style=\"font-size: medium;\">Backlink</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'Backlink has created an order ', NULL, '2023-09-22 12:16:36', '2023-09-22 12:16:36'),
(4, 'Order status changes', 'order_status', '<p><span style=\"font-size: 18pt;\"><strong>Hello,</strong></span></p>\n<p><span style=\"font-size: 12pt;\">The status of the order  \"<strong>{order_name}</strong>\" has been changed to \"<strong>{order_status}</strong>\".</span></p>\n<p><span style=\"font-size: 12pt;\">Take a look at your order now:</span></p>\n<p><span style=\"background-color: rgb(192, 222, 96);\"><strong><span style=\"font-size: medium;\">https://</span></strong></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'There is news about your order', NULL, '2023-09-26 12:04:46', '2023-09-26 12:04:46'),
(5, 'Welcome', 'welcome', '<p><span style=\"font-size: 18pt;\"><strong>Hello {user_name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Thank you very much for your registration and Verify email your account now activated .</span></span></p>\n<a style=\"font-size: 12pt; background-color: rgb(192, 222, 96);text-decoration:none;padding:10px\" href=\"https://www.google.co.in/\" title=\"Login to access account\" target=\"_blank\">Login</a>', 'Welcome to Backling family', 'attachement_1695786722177.pdf', '2023-09-27 09:22:02', '2023-09-27 09:22:02'),
(6, 'Subscription Confirmed', 'subscription_purchase', '<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n    <tr>\n        <td align=\"center\">\n            <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #ffffff; padding: 20px;\">\n                <tr>\n                    <td align=\"center\" style=\"padding: 30px 0;\">\n                        <h1 style=\"color: #333; font-size: 28px; margin: 0;\">Subscription Confirmed</h1>\n                    </td>\n                </tr>\n                <tr>\n                    <td style=\"padding: 20px;\">\n                        <p style=\"color: #555; font-size: 16px; line-height: 1.5;\">\n                            Dear {username},<br><br>\n                            Thank you for subscribing to our plan. You\'re now part of our exclusive community!<br><br>\n                            Here are your subscription details:<br>\n                        </p>\n                        <ul style=\"list-style: none; padding-left: 0;\">\n                            <li><strong>Plan Name:</strong> {planname}</li>\n                            <li><strong>Price:</strong> {price}</li>\n                            <li><strong>Start Date:</strong> {startdate}</li>\n                            <li><strong>End Date:</strong> {enddate}</li>\n                        </ul>\n                        <p style=\"color: #555; font-size: 16px; line-height: 1.5;\">\n                            If you have any questions or need assistance, feel free to contact our support team.<br><br>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td align=\"center\" style=\"background-color: #f2f2f2; padding: 20px 0;\">\n                        <p style=\"color: #777; font-size: 14px;\">Best regards, <b>Backlink.com<b></p>\n                    </td>\n                </tr>\n            </table>\n        </td>\n    </tr>\n</table>', 'Your Subscription is Confirmed.', NULL, '2023-09-28 13:17:59', '2023-09-28 13:17:59'),
(7, 'Subscription Expired', 'subscription_expire', '<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n    <tr>\n        <td align=\"center\">\n            <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #ffffff; padding: 20px;\">\n                <tr>\n                    <td align=\"center\" style=\"padding: 30px 0;\">\n                        <h1 style=\"color: #333; font-size: 28px; margin: 0;\">Subscription Plan Expired</h1>\n                    </td>\n                </tr>\n                <tr>\n                    <td style=\"padding: 20px;\">\n                        <p style=\"color: #555; font-size: 16px; line-height: 1.5;\">\n                            Dear {username},<br><br>\n                            We regret to inform you that your subscription plan has expired. Your access to our services is now limited.<br><br>\n                            Here are the details of your expired subscription plan:<br>\n                        </p>\n                        <ul style=\"list-style: none; padding-left: 0;\">\n                            <li><strong>Plan Name:</strong> {planname}</li>\n                            <li><strong>Price:</strong> {price}</li>\n                            <li><strong>Start Date:</strong> {startdate}</li>\n                            <li><strong>End Date:</strong> {enddate}</li>\n                        </ul>\n                        <p style=\"color: #555; font-size: 16px; line-height: 1.5;\">\n                            If you wish to continue using our services, please renew your subscription plan.<br><br>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td align=\"center\" style=\"background-color: #f2f2f2; padding: 20px 0;\">\n                        <p style=\"color: #777; font-size: 14px;\">Best regards, <b>Backlinks</b></p>\n                    </td>\n                </tr>\n            </table>\n        </td>\n    </tr>\n</table>', 'Subscription Plan Expired', NULL, '2023-09-28 14:58:33', '2023-09-28 14:58:33'),
(8, 'New domain added', 'new_domain_added', '<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n    <tr>\n        <td align=\"center\">\n            <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #ffffff; padding: 20px;\">\n                <tr>\n                    <td align=\"center\" style=\"padding: 30px 0;\">\n                        <h1 style=\"color: #333; font-size: 28px; margin: 0;\">New domain added in your Portfolio</h1>\n                    </td>\n                </tr>\n                <tr>\n                    <td style=\"padding: 20px;\">\n                        <p style=\"color: #555; font-size: 16px; line-height: 1.5;\">\n                            Dear {username},<br><br>\n                            We inform you that your Portfolio added new domain.                                </p>\n                       <p> Here are the details of your new added domain</p>\n                        <ul style=\"list-style: none; padding-left: 0;\">\n                            <li><strong>Domain name:</strong> {domain_name}</li>\n                            <li><strong>Price:</strong> {price}</li>\n                            <li><strong>Category:</strong> {category}</li>\n                        </ul>                        \n                    </td>\n                </tr>\n                <tr>\n                    <td align=\"center\" style=\"background-color: #f2f2f2; padding: 20px 0;\">\n                        <p style=\"color: #777; font-size: 14px;\">Best regards, <b>Backlinks</b></p>\n                    </td>\n                </tr>\n            </table>\n        </td>\n    </tr>\n</table>', 'New Domain added in your Portfolio', NULL, '2023-10-11 15:14:59', '2023-10-11 15:14:59');

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
(1, 'nagherajayesh2087@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZ2hlcmFqYXllc2gyMDg3QGdtYWlsLmNvbSIsImlhdCI6MTY5NDYwNjc1OCwiZXhwIjoxNjk0NjA3MzU4fQ.VL8axfUjj3XkM1F3DR-FIgMCi86K4-KQgzljSyBKgP0', '2023-09-13 17:35:58', '2023-09-13 17:35:58');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `files` text DEFAULT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `new_orders`
--

CREATE TABLE `new_orders` (
  `id` int(11) NOT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `status` enum('Placed','Approved','Decline','Completed','Cancelled') DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `anchortext` varchar(100) DEFAULT NULL,
  `linktarget` varchar(255) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `project_id` varchar(50) DEFAULT NULL,
  `hash_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `new_orders`
--

INSERT INTO `new_orders` (`id`, `publisher_id`, `customer_id`, `domain_id`, `status`, `total_price`, `anchortext`, `linktarget`, `publication_date`, `note`, `project_id`, `hash_id`, `created_at`, `updated_at`) VALUES
(1, 11, 15, 3, 'Placed', '153.00', 'Click Here', 'https://www.example.com/test.html', '2023-12-15', 'test', 'y8n78xoy', '2ix82ctm', '2023-10-11 13:36:49', '2023-10-11 13:36:49');

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
(1, 11, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, '2023-09-20 07:53:06', '2023-09-20 13:22:20'),
(5, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-09-26 04:26:08', '2023-09-26 04:26:08');

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
(1, 1, 'new_order_1697031409371.pdf', NULL, 'assets/order_assets/', 0, NULL, '2023-10-11 13:36:49', '2023-10-11 13:36:49');

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

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `publisher_id`, `domain_id`, `total_amount`, `ordername`, `description`, `orderfile`, `orderstatus`, `orderpriority`, `update_status_admin`, `update_status`, `created_at`, `updated_at`, `soft_delete`) VALUES
(48, 15, 0, 2, '0.00', 'This order updated', 'This order updated by api', NULL, 1, 2, 2, 0, '2023-09-27 18:30:00', '2023-09-29 12:20:37', ''),
(49, 15, 0, 2, '0.00', 'Second Name', 'Description', NULL, 1, 1, 1, 1, '2023-09-28 05:09:32', '2023-09-29 13:09:06', ''),
(51, 15, 0, 1, '0.00', 'Second Name', 'Description', NULL, 1, 1, 1, 0, '2023-10-04 12:37:18', '2023-10-04 12:38:33', '');

-- --------------------------------------------------------

--
-- Table structure for table `publisher_backlinks`
--

CREATE TABLE `publisher_backlinks` (
  `id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL,
  `traffic` int(11) NOT NULL DEFAULT 0,
  `anchor_text` varchar(50) DEFAULT NULL,
  `delivery_time` varchar(50) DEFAULT NULL,
  `link` varchar(50) DEFAULT NULL,
  `language` varchar(15) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `visibility_index` decimal(10,2) DEFAULT 0.00,
  `domain_rating` int(11) NOT NULL,
  `rating` decimal(1,1) NOT NULL DEFAULT 0.0,
  `referring` int(11) NOT NULL DEFAULT 0,
  `citation_flow` int(11) DEFAULT 0,
  `trust_flow` int(11) NOT NULL DEFAULT 0,
  `authority` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publisher_backlinks`
--

INSERT INTO `publisher_backlinks` (`id`, `domain_id`, `traffic`, `anchor_text`, `delivery_time`, `link`, `language`, `price`, `visibility_index`, `domain_rating`, `rating`, `referring`, `citation_flow`, `trust_flow`, `authority`, `created_at`, `updated_at`) VALUES
(1, 2, 10, 'tee', '4.8', 'follow', 'en', '160.00', '10.60', 68, '0.0', 12, 15, 68, 1, '2023-10-11 05:29:07', '2023-10-11 05:29:07'),
(3, 3, 1, 'test', '1.2', 'ddd', 'en', '153.00', '15.00', 12, '0.0', 3, 26, 63, 12, '2023-10-11 06:05:20', '2023-10-11 06:05:20'),
(4, 6, 55, '55', '55', '55', 'en', '55.00', '55.00', 55, '0.0', 55, 55, 55, 55, '2023-10-11 06:18:04', '2023-10-11 06:18:19');

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
  `user_id` int(11) NOT NULL,
  `hash_id` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publisher_domains`
--

INSERT INTO `publisher_domains` (`id`, `domain_name`, `tld`, `price`, `category_id`, `status`, `user_id`, `hash_id`, `created_at`, `updated_at`) VALUES
(2, 'test.com', 'com', '480.00', 8, 1, 11, 'vqxyvl9w', '2023-10-10 10:54:02', '2023-10-10 12:27:26'),
(3, 'google.com', 'net', '5000.00', 15, 1, 11, '2ix82ctm', '2023-10-10 10:54:52', '2023-10-11 06:17:35'),
(6, 'besticoder.com', 'com', '5000.00', 2, 1, 11, '8bs7vyk3', '2023-10-10 13:06:35', '2023-10-10 13:06:35'),
(8, 'jayesh.com', 'com', '5000.00', 4, 1, 11, '3fc562lq', '2023-10-11 09:55:48', '2023-10-11 09:55:48');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `description`, `price`, `cancellation_period`, `max_domains_per_month`, `max_orders`, `credits_price`, `credits_quota`, `status`, `validity`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 'Basic plan for indiindividual use', 60, 30, 10, 5, NULL, NULL, 1, 30, '2023-09-27 05:20:00', '2023-09-29 07:05:15'),
(2, 'Medium ', 'Medium plan for indiindividual comapany use', 110, 30, 50, 25, NULL, NULL, 1, 30, '2023-09-27 05:22:07', '2023-09-28 06:42:18'),
(3, 'Agency', 'for Agency use', 200, 30, 100, 50, NULL, NULL, 1, 30, '2023-09-27 05:23:28', '2023-09-28 06:43:03');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL COMMENT 'payment for plan or extra order',
  `payment_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transaction_id` varchar(255) DEFAULT NULL,
  `isPlan` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0: order or other extra payment, 1: subscription plan payment',
  `status` varchar(25) NOT NULL,
  `paymentData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`paymentData`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `amount`, `transaction_type`, `description`, `payment_created`, `transaction_id`, `isPlan`, `status`, `paymentData`, `created_at`) VALUES
(1, 15, '60.00', 'checkout.session.completed', 'Subscription Plans : Basic', '2023-09-28 10:31:25', 'pi_3NuxDzSC7x5vD10M0iqAnYgB', 1, 'paid', '{\"id\":\"cs_test_a1DP5Hw8ZPgvIlOw9XSkOxDeaUGyglT4MEOEFPakaRKeIfIOVQrLpd6P99\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":6000,\"amount_total\":6000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:300/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695819114,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OiNzQMqfJE1j74\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"Jayesh Naghera\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695905514,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\",\"planId\":\"1\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NuxDzSC7x5vD10M0iqAnYgB\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://6812-150-129-148-240.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-27 12:52:25'),
(5, 11, '110.00', 'checkout.session.completed', 'Subscription Plans : Medium ', '2023-09-28 10:31:21', 'pi_3NvFUASC7x5vD10M1MvwlTis', 1, 'paid', '{\"id\":\"cs_test_a1aj5i4Sngbg06LLFZAiEWYXexSXogW8uHrPVjI9horxRFWv8y9QKFUsCA\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":11000,\"amount_total\":11000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:300/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695889326,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OigrFlC9HJhbPq\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"customer@test.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695975726,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"11\",\"planId\":\"2\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvFUASC7x5vD10M1MvwlTis\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 08:22:18'),
(6, 15, '200.00', 'checkout.session.completed', NULL, '2023-09-28 10:31:19', 'pi_3NvHEVSC7x5vD10M1FGecOkx', 0, 'paid', '{\"id\":\"cs_test_a1PLhu2YjI0QkgieWIgMq5LAeWMWJnHQHJiHVg6zqnSNbwiVEmYFITmHTZ\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695896040,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_Oiifni6BPu5X8K\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695982440,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHEVSC7x5vD10M1FGecOkx\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 10:14:16'),
(7, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:31:16', 'pi_3NvHHhSC7x5vD10M1Aw1Ia5p', 0, 'paid', '{\"id\":\"cs_test_a1lALZTLeCmYQzK6X6BI8USKKwJNRBdZbDzbZ3lWaRgLTbsPFq0WPPnd8p\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695896235,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OiiiNVgxKfJquh\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"123645555555\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695982635,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHHhSC7x5vD10M1Aw1Ia5p\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 10:17:36'),
(8, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:30:37', 'pi_3NvHUlSC7x5vD10M08o0syQ9', 0, 'paid', '{\"id\":\"cs_test_a1S8TBXuhCDkBZczlfiKuDZCSoHBrm0BYog8H6Yzv9b2irFbcn8Audb6Pl\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695897037,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OiiwDgNF939XKp\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695983437,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHUlSC7x5vD10M08o0syQ9\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 10:31:03'),
(9, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:38:01', 'pi_3NvHblSC7x5vD10M1x55UWhJ', 0, 'paid', '{\"id\":\"cs_test_a1JKhN6k2Rl0FSylaItjV0nFQJiDQfeA0UvLJlK55iU3uoEvp3NtPZJmCn\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695897481,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_Oij3Opw4ttjvu1\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695983881,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHblSC7x5vD10M1x55UWhJ\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:38:21'),
(10, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:40:05', 'pi_3NvHdnSC7x5vD10M1Kwa4FBt', 0, 'paid', '{\"id\":\"cs_test_a12XZ37MfJsrTGR4wd3jIRDmfHmnxyLDMNONmWncWhKgjaL3EU4Bz79p7C\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695897605,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_Oij5uH2XLOO8eZ\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"111111111\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695984005,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHdnSC7x5vD10M1Kwa4FBt\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:40:41'),
(11, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:42:35', 'pi_3NvHgDSC7x5vD10M1FG0BIYZ', 0, 'paid', '{\"id\":\"cs_test_a11x7BNAejt0uNMeEw89Af7dcz14tft17wyOunViWimUhfQfDubRO4oWcb\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695897755,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_Oij8L9aWOCAupE\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695984155,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHgDSC7x5vD10M1FG0BIYZ\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:44:07'),
(12, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:44:54', 'pi_3NvHiMSC7x5vD10M1nIJ50vs', 0, 'paid', '{\"id\":\"cs_test_a1rURGyihUbQphVTXQIQbkSQQHdqjIamw0nyrldUmYee90uAm4arA0LJy7\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695897894,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OijALBgCDPJCeq\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695984294,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHiMSC7x5vD10M1nIJ50vs\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:44:27'),
(13, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:48:38', 'pi_3NvHm5SC7x5vD10M0KXolvbH', 0, 'paid', '{\"id\":\"cs_test_a1GqhZc9u2QwSkEOFttkoA5M3ppqdhCVS4jOVFOzhk2ClaHyLyMZIy8GeC\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695898118,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OijEVhzCYoFlZW\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695984517,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHm5SC7x5vD10M0KXolvbH\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:49:37'),
(14, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:49:48', 'pi_3NvHn6SC7x5vD10M0zoRivzA', 0, 'paid', '{\"id\":\"cs_test_a1U16LEtAJXfbO9mdJXWuM9hqP9795uGb7fo28yUPPjY9BjqUr2InQYEJm\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695898188,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OijF8GZ2yhPahH\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695984588,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHn6SC7x5vD10M0zoRivzA\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:50:23'),
(15, 15, '200.00', 'checkout.session.completed', 'Order', '2023-09-28 10:52:46', 'pi_3NvHpzSC7x5vD10M1WvKinxX', 0, 'paid', '{\"id\":\"cs_test_a1BQ7UifrzL89gePFEK4R1sAnXYXHvMBgOoi99wwbdLotc7VQgeUX0j8rj\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":20000,\"amount_total\":20000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:3000/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695898366,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OijIhxkXDHoYGq\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"12321\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695984766,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NvHpzSC7x5vD10M1WvKinxX\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://4fef-103-247-54-225.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-28 11:53:09');

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
  `isAdmin` int(11) NOT NULL DEFAULT 0 COMMENT '0:customer,1:admin,2:publisher',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified`, `firstName`, `lastName`, `password`, `profile`, `phone`, `isAdmin`, `created_at`, `updated_at`) VALUES
(2, 'rjnaghera@gmail.com', 1, 'Admin', 'User', '$2a$11$fCg11cAgOk7RvVCffz7TuulHBoIYOMATc6iq6PjtlbbB5ieju4dG2', 'profileImg_1695097731854.jpeg', '09033389733', 1, '2023-09-13 17:40:39', '2023-09-19 10:02:11'),
(6, 'test@gmail.com', 1, 'Test', 'Customer', '$2a$11$fRqk7yh94dGpBAXdZnlnnOvlJ3h8NC8IVqPF9Ykb1MQxABdgDqxjW', 'profileImg_1695101939136.png', '1234567809', 0, '2023-09-19 11:08:59', '2023-09-19 11:08:59'),
(9, '123@gmail.com', 1, 'test', 'test', '$2a$11$uADreLR8rD3x7TF0dg54n.natIDMyUCFh/l1yKutPnLpkif5D5F1e', NULL, '1234567809', 0, '2023-09-20 10:55:10', '2023-09-20 10:55:10'),
(10, 'devuser@gmail.com', 1, 'Dev', 'User', '$2a$11$q9QmEe0ZOvFcsci5Y9pjpO4iBx.z9VyAf45AElj.TF3xN4hJH6GvO', 'profileImg_1695188498849.jpg', '1234567809', 0, '2023-09-20 11:11:39', '2023-09-20 11:11:39'),
(11, 'customer@test.com', 1, 'Customer', 'Customer', '$2a$11$zUU62EIftcI7V8bU8XCN6O8ynRwhalVmVzlG4EYCVTadW1ZbjK9iO', 'profileImg_1695188498849.jpg', '1234567809', 2, '2023-09-20 13:23:06', '2023-09-20 13:24:52'),
(15, 'nagherajayesh2087@gmail.com', 1, 'Jayesh', 'Naghera', '$2a$11$bw6B8GeAU94tv01rXm4N..AiVoePSht4NmJpN71yIIRekbIYmXZc2', NULL, '9033389733', 0, '2023-09-26 09:56:08', '2023-09-26 09:56:08');

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
(1, 15, '2000.00', '2023-09-28 11:53:09', '2023-09-28 11:53:09');

-- --------------------------------------------------------

--
-- Table structure for table `user_subscriptions`
--

CREATE TABLE `user_subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime DEFAULT NULL,
  `cancel_date` timestamp NULL DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `credits` int(11) DEFAULT 0,
  `transaction_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 is Active Plan\r\n0 Expire '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_subscriptions`
--

INSERT INTO `user_subscriptions` (`id`, `user_id`, `plan_id`, `start_date`, `end_date`, `cancel_date`, `info`, `credits`, `transaction_id`, `status`) VALUES
(1, 15, 1, '2023-09-27 00:00:00', '2023-10-27 12:52:26', NULL, NULL, 0, 1, 1),
(5, 11, 2, '2023-09-28 13:52:18', '2023-10-28 08:22:18', NULL, NULL, 0, 5, 1);

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
-- Indexes for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
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
-- Indexes for table `publisher_backlinks`
--
ALTER TABLE `publisher_backlinks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `domain_id` (`domain_id`);

--
-- Indexes for table `publisher_domains`
--
ALTER TABLE `publisher_domains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_hash_id` (`hash_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`user_id`);

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
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `domain_categories`
--
ALTER TABLE `domain_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `domain_tags`
--
ALTER TABLE `domain_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `email_formats`
--
ALTER TABLE `email_formats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `new_orders`
--
ALTER TABLE `new_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orderfiles`
--
ALTER TABLE `orderfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `publisher_backlinks`
--
ALTER TABLE `publisher_backlinks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `publisher_domains`
--
ALTER TABLE `publisher_domains`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users_wallet`
--
ALTER TABLE `users_wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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
  ADD CONSTRAINT `user_subscriptions_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
