-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 03:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `budget` decimal(8,2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `domains`
--

INSERT INTO `domains` (`id`, `domain_name`, `budget`, `category_id`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
(25, 'www.examples.com', '12.35', 3, 1, 2, '2023-09-15 10:30:46', '2023-09-15 12:13:51'),
(30, 'besticoder.com', '12.36', 2, 1, 2, '2023-09-15 10:33:42', '2023-09-15 10:33:42'),
(31, 'testbesticoder.com', '12.36', 2, 1, 2, '2023-09-15 10:38:39', '2023-09-15 10:38:39'),
(32, 'testbesticoder.test', '12.36', 2, 1, 2, '2023-09-15 10:39:21', '2023-09-15 10:39:21'),
(35, 'jayesh.com', '12.36', 2, 1, 2, '2023-09-15 10:41:01', '2023-09-15 10:41:01'),
(36, 'www.jayesh.org', '12.36', 2, 1, 2, '2023-09-15 10:49:08', '2023-09-15 10:49:08'),
(38, 'www.testdomain.com', '12.36', 2, 1, 2, '2023-09-15 12:07:43', '2023-09-15 12:07:43'),
(40, 'www.testdomain.org', '12.36', 2, 1, 11, '2023-09-20 09:27:26', '2023-09-20 10:27:35'),
(43, 'avcc.com', '12.00', 3, 1, 11, '2023-09-20 09:31:32', '2023-09-20 09:31:32'),
(44, '123.com', '12.00', 3, 1, 11, '2023-09-20 09:55:26', '2023-09-20 09:55:26'),
(45, 'user.in', '12.00', 3, 1, 11, '2023-09-20 09:55:38', '2023-09-20 10:41:31');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `domain_categories`
--

INSERT INTO `domain_categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(2, 'Testing ', 'Testing description', '2023-09-15 12:38:58', '2023-09-15 12:38:58'),
(3, 'Two', 'Testing description Two', '2023-09-15 16:40:49', '2023-09-15 16:40:49');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `email_type` text DEFAULT NULL,
  `email_content` text DEFAULT NULL,
  `header` text DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_formats`
--

INSERT INTO `email_formats` (`id`, `email_title`, `email_type`, `email_content`, `header`, `file`, `createdAt`, `updatedAt`) VALUES
(2, 'Registration', 'registration', '<p><span style=\"font-size: 18pt;\"><strong>Hello {user_name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Thank you very much for your registration.</span></span></p>\n<p><span style=\"font-size: 12pt;\">Please confirm your email address\n {user_email} with this link:</span></p>\n<p><span style=\"background-color: rgb(192, 222, 96);\"><strong><span style=\"font-size: 12pt; background-color: rgb(192, 222, 96);\">{verification_Link}</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'Please complete registration', NULL, '2023-09-19 11:27:57', '2023-09-19 11:27:57'),
(3, 'New Order', 'create_new_order', '<p><span style=\"font-size: 18pt;\"><strong>{name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">The Backlink team has created the order \"{order_name}\" for you.</span></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Register now on the platform:</span></span></p>\n<p><span style=\"background-color: rgb(192, 222, 96); font-size: 12pt;\"><strong><span style=\"font-size: medium;\">Backlink</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'Backlink has created an order ', NULL, '2023-09-22 12:16:36', '2023-09-22 12:16:36'),
(4, 'Order status changes', 'order_status', '<p><span style=\"font-size: 18pt;\"><strong>Hello,</strong></span></p>\n<p><span style=\"font-size: 12pt;\">The status of the order  \"<strong>{order_name}</strong>\" has been changed to \"<strong>{order_status}</strong>\".</span></p>\n<p><span style=\"font-size: 12pt;\">Take a look at your order now:</span></p>\n<p><span style=\"background-color: rgb(192, 222, 96);\"><strong><span style=\"font-size: medium;\">https://</span></strong></span></p>\n<p>&nbsp;</p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'There is news about your order', NULL, '2023-09-26 12:04:46', '2023-09-26 12:04:46'),
(5, 'Welcome', 'welcome', '<p><span style=\"font-size: 18pt;\"><strong>Hello {user_name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Thank you very much for your registration and Verify email your account now activated .</span></span></p>\n<a style=\"font-size: 12pt; background-color: rgb(192, 222, 96);text-decoration:none;padding:10px\" href=\"https://www.google.co.in/\" title=\"Login to access account\" target=\"_blank\">Login</a>', 'Welcome to Backling family', 'attachement_1695786722177.pdf', '2023-09-27 09:22:02', '2023-09-27 09:22:02');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `email_message_received`, `email_order_accepted`, `email_order_completed`, `email_order_created`, `email_order_declined`, `email_order_missing_details`, `email_payment_failed`, `email_payment_reminder`, `email_payment_succeeded`, `email_recommendations_available`, `created_at`, `updated_at`) VALUES
(1, 11, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, '2023-09-20 07:53:06', '2023-09-20 13:22:20'),
(5, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-09-26 04:26:08', '2023-09-26 04:26:08'),
(7, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-09-26 13:17:55', '2023-09-26 13:17:55');

-- --------------------------------------------------------

--
-- Table structure for table `orderfiles`
--

CREATE TABLE `orderfiles` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `isLink` tinyint(1) NOT NULL DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderfiles`
--

INSERT INTO `orderfiles` (`id`, `order_id`, `file_name`, `original_name`, `file_path`, `isLink`, `link`, `created_at`, `updated_at`) VALUES
(1, 49, 'final_file1695387549321.JPG', 'jayesh', 'assets/order_assets/', 0, '', '2023-09-26 07:34:11', '2023-09-26 07:34:11'),
(3, 49, 'final_file1695714963980.jpg', 'jayeshs', 'assets/order_assets/', 0, NULL, '2023-09-26 07:56:03', '2023-09-26 09:32:58'),
(18, 49, NULL, 'ahref npm tutorial', NULL, 1, 'https://github.com/ybonnefond/node-ahrefs/tree/master', '2023-09-26 09:46:35', '2023-09-26 09:46:35'),
(19, 49, NULL, 'ahref token link', NULL, 1, 'https://app.ahrefs.com/api/profile', '2023-09-26 09:46:35', '2023-09-26 09:46:35'),
(20, 48, NULL, 'Googles', NULL, 1, 'https://www.google.co.in', '2023-09-26 09:47:27', '2023-09-26 10:24:10');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `total_amount`, `ordername`, `description`, `orderfile`, `orderstatus`, `orderpriority`, `update_status_admin`, `update_status`, `created_at`, `updated_at`, `soft_delete`) VALUES
(48, 11, '0.00', 'This order updated', 'This order updated by api', NULL, 1, 2, 2, 0, '2023-09-22 08:12:12', '2023-09-26 07:16:08', ''),
(49, 11, '0.00', 'Second Name', 'Description', NULL, 1, 1, 1, 1, '2023-09-22 09:46:09', '2023-09-26 09:33:45', '');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `cancellation_period` int(11) DEFAULT NULL,
  `max_domains_per_month` int(11) DEFAULT NULL,
  `max_orders` int(11) DEFAULT NULL,
  `credits_price` decimal(10,2) DEFAULT NULL,
  `credits_quota` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `description`, `price`, `cancellation_period`, `max_domains_per_month`, `max_orders`, `credits_price`, `credits_quota`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 'Basic plan for indiindividual use', 60, 30, 10, 5, NULL, NULL, 1, '2023-09-27 05:20:00', '2023-09-27 07:29:36'),
(2, 'Medium ', 'Medium plan for indiindividual use', 110, 30, 50, 25, NULL, NULL, 1, '2023-09-27 05:22:07', '2023-09-27 07:29:23'),
(3, 'Agency', 'Agency plan for Agency use', 200, 30, 100, 50, NULL, NULL, 1, '2023-09-27 05:23:28', '2023-09-27 07:29:11');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `payment_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transaction_id` varchar(255) DEFAULT NULL,
  `isPlan` tinyint(1) NOT NULL DEFAULT 0,
  `paymentData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`paymentData`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `amount`, `transaction_type`, `description`, `payment_created`, `transaction_id`, `isPlan`, `paymentData`, `created_at`) VALUES
(1, 15, '60.00', 'checkout.session.completed', 'Subscription Plans : Basic', '2023-09-27 12:51:54', 'pi_3NuxDzSC7x5vD10M0iqAnYgB', 1, '{\"id\":\"cs_test_a1DP5Hw8ZPgvIlOw9XSkOxDeaUGyglT4MEOEFPakaRKeIfIOVQrLpd6P99\",\"object\":\"checkout.session\",\"after_expiration\":null,\"allow_promotion_codes\":null,\"amount_subtotal\":6000,\"amount_total\":6000,\"automatic_tax\":{\"enabled\":false,\"status\":null},\"billing_address_collection\":null,\"cancel_url\":\"http://localhost:300/cancel.html\",\"client_reference_id\":null,\"consent\":null,\"consent_collection\":null,\"created\":1695819114,\"currency\":\"inr\",\"currency_conversion\":null,\"custom_fields\":[],\"custom_text\":{\"shipping_address\":null,\"submit\":null,\"terms_of_service_acceptance\":null},\"customer\":\"cus_OiNzQMqfJE1j74\",\"customer_creation\":null,\"customer_details\":{\"address\":{\"city\":null,\"country\":\"IN\",\"line1\":null,\"line2\":null,\"postal_code\":null,\"state\":null},\"email\":\"nagherajayesh2087@gmail.com\",\"name\":\"Jayesh Naghera\",\"phone\":null,\"tax_exempt\":\"none\",\"tax_ids\":[]},\"customer_email\":null,\"expires_at\":1695905514,\"invoice\":null,\"invoice_creation\":{\"enabled\":false,\"invoice_data\":{\"account_tax_ids\":null,\"custom_fields\":null,\"description\":null,\"footer\":null,\"metadata\":{},\"rendering_options\":null}},\"livemode\":false,\"locale\":null,\"metadata\":{\"userid\":\"15\",\"planId\":\"1\"},\"mode\":\"payment\",\"payment_intent\":\"pi_3NuxDzSC7x5vD10M0iqAnYgB\",\"payment_link\":null,\"payment_method_collection\":\"if_required\",\"payment_method_configuration_details\":null,\"payment_method_options\":{},\"payment_method_types\":[\"card\"],\"payment_status\":\"paid\",\"phone_number_collection\":{\"enabled\":false},\"recovered_from\":null,\"setup_intent\":null,\"shipping_address_collection\":null,\"shipping_cost\":null,\"shipping_details\":null,\"shipping_options\":[],\"status\":\"complete\",\"submit_type\":null,\"subscription\":null,\"success_url\":\"https://6812-150-129-148-240.ngrok-free.app/getPayments\",\"total_details\":{\"amount_discount\":0,\"amount_shipping\":0,\"amount_tax\":0},\"url\":null}', '2023-09-27 12:52:25');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified`, `firstName`, `lastName`, `password`, `profile`, `phone`, `isAdmin`, `created_at`, `updated_at`) VALUES
(2, 'rjnaghera@gmail.com', 1, 'Admin', 'User', '$2a$11$fCg11cAgOk7RvVCffz7TuulHBoIYOMATc6iq6PjtlbbB5ieju4dG2', 'profileImg_1695097731854.jpeg', '09033389733', 1, '2023-09-13 17:40:39', '2023-09-19 10:02:11'),
(6, 'test@gmail.com', 1, 'Test', 'Customer', '$2a$11$fRqk7yh94dGpBAXdZnlnnOvlJ3h8NC8IVqPF9Ykb1MQxABdgDqxjW', 'profileImg_1695101939136.png', '1234567809', 0, '2023-09-19 11:08:59', '2023-09-19 11:08:59'),
(7, 'user@gmail.com', 1, 'User', 'User', '$2a$11$wDyyQ3bJE4.Am3niE46JC.eA2IzkheYZUMqfH6FOE4guD8q/8EML6', 'profileImg_1695185820745.png', '1234567809', 0, '2023-09-20 10:27:01', '2023-09-20 10:27:01'),
(9, '123@gmail.com', 1, 'test', 'test', '$2a$11$uADreLR8rD3x7TF0dg54n.natIDMyUCFh/l1yKutPnLpkif5D5F1e', NULL, '1234567809', 0, '2023-09-20 10:55:10', '2023-09-20 10:55:10'),
(10, 'devuser@gmail.com', 1, 'Dev', 'User', '$2a$11$q9QmEe0ZOvFcsci5Y9pjpO4iBx.z9VyAf45AElj.TF3xN4hJH6GvO', 'profileImg_1695188498849.jpg', '1234567809', 0, '2023-09-20 11:11:39', '2023-09-20 11:11:39'),
(11, 'customer@test.com', 1, 'Customer', 'Customer', '$2a$11$zUU62EIftcI7V8bU8XCN6O8ynRwhalVmVzlG4EYCVTadW1ZbjK9iO', 'profileImg_1695188498849.jpg', '1234567809', 0, '2023-09-20 13:23:06', '2023-09-20 13:24:52'),
(15, 'nagherajayesh2087@gmail.com', 1, 'Jayesh', 'Naghera', '$2a$11$bw6B8GeAU94tv01rXm4N..AiVoePSht4NmJpN71yIIRekbIYmXZc2', NULL, '9033389733', 0, '2023-09-26 09:56:08', '2023-09-26 09:56:08'),
(18, '1323@gmail.com', 1, 'Test', 'Customer', '$2a$11$2uW7YFE7S1btWgvoLN9ORuSzZ9tApUz9L1zeXDuvDz4pwlQG9ox/q', NULL, '1234567809', 0, '2023-09-26 18:47:55', '2023-09-26 18:51:51');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_subscriptions`
--

INSERT INTO `user_subscriptions` (`id`, `user_id`, `plan_id`, `start_date`, `end_date`, `cancel_date`, `info`, `credits`, `transaction_id`, `status`) VALUES
(1, 15, 1, '2023-09-27 18:22:26', '2023-10-27 12:52:26', NULL, NULL, 0, 1, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `domain_categories`
--
ALTER TABLE `domain_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `domain_tags`
--
ALTER TABLE `domain_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `email_formats`
--
ALTER TABLE `email_formats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orderfiles`
--
ALTER TABLE `orderfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users_wallet`
--
ALTER TABLE `users_wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Constraints for table `orderfiles`
--
ALTER TABLE `orderfiles`
  ADD CONSTRAINT `orderfiles_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

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
