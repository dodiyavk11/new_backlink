-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2023 at 03:38 PM
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
-- Table structure for table `customer_wallet`
--

CREATE TABLE `customer_wallet` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(2, 'Registration', 'registration', '<p><span style=\"font-size: 18pt;\"><strong>Moin,</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">vielen Dank f&uuml;r Deine Registrierung.</span></span></p>\n<p><span style=\"font-size: 12pt;\">Best&auml;tige bitte Deine E-Mailadresse {user_email} mit diesem Link:</span></p>\n<p><span style=\"background-color: rgb(192, 222, 96);\"><strong><span style=\"font-size: 12pt; background-color: rgb(192, 222, 96);\">{verification_Link}</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Viele Gr&uuml;&szlig;e</strong></span></p>', 'Please complete registration', NULL, '2023-09-19 11:27:57', '2023-09-19 11:27:57'),
(3, 'New Order', 'create_new_order', '<p><span style=\"font-size: 18pt;\"><strong>{name},</strong></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">The Backlink team has created the order \"{order_name}\" for you.</span></span></p>\n<p><span style=\"font-size: 12pt;\"><span style=\"font-size: medium;\">Register now on the platform:</span></span></p>\n<p><span style=\"background-color: rgb(192, 222, 96); font-size: 12pt;\"><strong><span style=\"font-size: medium;\">Backlink</span></strong></span></p>\n<p><span style=\"font-size: 14pt;\"><strong>Best regards</strong></span></p>', 'Backlink has created an order ', NULL, '2023-09-22 12:16:36', '2023-09-22 12:16:36');

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
(1, 11, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, '2023-09-20 07:53:06', '2023-09-20 13:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `orderfiles`
--

CREATE TABLE `orderfiles` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderfiles`
--

INSERT INTO `orderfiles` (`id`, `order_id`, `file_name`, `original_name`, `file_path`) VALUES
(1, 49, 'final_file1695387549321.JPG', 'jayesh', 'assets/order_assets/');

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
(48, 11, '0.00', 'This order updated', 'This order updated by api', NULL, 2, 2, 2, 0, '2023-09-22 08:12:12', '2023-09-22 13:28:45', ''),
(49, 11, '0.00', 'Second Name', 'Description', NULL, 1, 1, 1, 1, '2023-09-22 09:46:09', '2023-09-22 12:59:09', '');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(11, 'customer@test.com', 1, 'Customer', 'Customer', '$2a$11$zUU62EIftcI7V8bU8XCN6O8ynRwhalVmVzlG4EYCVTadW1ZbjK9iO', 'profileImg_1695188498849.jpg', '1234567809', 0, '2023-09-20 13:23:06', '2023-09-20 13:24:52');

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
-- Indexes for table `customer_wallet`
--
ALTER TABLE `customer_wallet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

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
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customer_wallet`
--
ALTER TABLE `customer_wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orderfiles`
--
ALTER TABLE `orderfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`);

--
-- Constraints for table `customer_wallet`
--
ALTER TABLE `customer_wallet`
  ADD CONSTRAINT `customer_wallet_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);

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
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
