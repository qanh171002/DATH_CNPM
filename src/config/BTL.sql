-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 16, 2024 lúc 09:45 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `organic_food_shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bills`
--

CREATE TABLE `bills` (
  `id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bills`
--

INSERT INTO `bills` (`id`, `order_id`, `created_at`) VALUES
('bill1', 'o1', '2024-11-01 05:00:00'),
('bill2', 'o2', '2024-11-02 08:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `buyers`
--

CREATE TABLE `buyers` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `buyers`
--

INSERT INTO `buyers` (`id`, `user_id`) VALUES
('b2', 'u1'),
('b1', 'u2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `buyer_id` varchar(36) NOT NULL,
  `product_id` varchar(36) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `added_at` datetime DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Còn hàng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`buyer_id`, `product_id`, `quantity`, `added_at`, `status`) VALUES
('b1', 'p1', 2, '2024-11-01 10:00:00', 'Còn hàng'),
('b1', 'p3', 1, '2024-11-03 09:00:00', 'Còn hàng'),
('b1', 'p2', 100, '2024-11-17 02:53:31', 'Hết hàng');

--
-- Bẫy `cart`
--
DELIMITER $$
CREATE TRIGGER `set_cart_status` AFTER INSERT ON `cart` FOR EACH ROW BEGIN
    -- Lấy số lượng của sản phẩm từ bảng products
    DECLARE product_quantity INT;

    SELECT quantity INTO product_quantity
    FROM products
    WHERE id = NEW.product_id;

    -- Nếu số lượng sản phẩm là 0 -> Đặt trạng thái là 'Hết hàng'
    IF product_quantity = 0 THEN
        UPDATE cart
        SET status = 'Hết hàng'
        WHERE buyer_id = NEW.buyer_id AND product_id = NEW.product_id;
    -- Nếu số lượng sản phẩm > 0 -> Đặt trạng thái là 'Còn hàng'
    ELSE
        UPDATE cart
        SET status = 'Còn hàng'
        WHERE buyer_id = NEW.buyer_id AND product_id = NEW.product_id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
('c1', 'Electronics', 'Devices and gadgets'),
('c2', 'Books', 'All kinds of books');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_percent` decimal(5,2) DEFAULT NULL CHECK (`discount_percent` between 0 and 100),
  `due_date` date NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `coupons`
--

INSERT INTO `coupons` (`id`, `name`, `description`, `discount_percent`, `due_date`, `quantity`) VALUES
('cp1', 'SUMMER2024', 'Summer sale coupon', 10.00, '2024-12-31', 50);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `deliveried_by`
--

CREATE TABLE `deliveried_by` (
  `id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `expected_date` date DEFAULT NULL,
  `arrival_date` date DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `shipper_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `deliveried_by`
--

INSERT INTO `deliveried_by` (`id`, `order_id`, `expected_date`, `arrival_date`, `departure_date`, `shipper_id`) VALUES
('db1', 'o1', '2024-11-03', NULL, '2024-11-01', 'ship1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `delivery`
--

CREATE TABLE `delivery` (
  `id` varchar(36) NOT NULL,
  `deliveried_by_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `delivery`
--

INSERT INTO `delivery` (`id`, `deliveried_by_id`) VALUES
('d1', 'db1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(36) NOT NULL,
  `buyer_id` varchar(36) NOT NULL,
  `date` date NOT NULL,
  `status` enum('Pending','Accepted','Delivered') DEFAULT 'Pending',
  `number_of_products` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `buyer_id`, `date`, `status`, `number_of_products`, `total_price`) VALUES
('o1', 'b1', '2024-11-01', 'Pending', 2, 1399.98),
('o2', 'b2', '2024-11-02', 'Accepted', 1, 19.99),
('o3', 'b1', '2024-11-03', 'Pending', 1, 99.99),
('o2', 'b2', '2024-11-04', 'Accepted', 2, 199.98),
('o4', 'b2', '2024-11-04', 'Accepted', 2, 199.98);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` longtext DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `seller_id` varchar(36) DEFAULT NULL,
  `category_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `quantity`, `description`, `price`, `seller_id`, `category_id`) VALUES
('p1', 'Book', 100, 'dùng để đọc', 50000.00, 's1', 'c1'),
('p2', 'BookTA', 0, 'dùng để đọc', 50000.00, 's1', 'c1'),
('p3', 'gaming', 2, 'dùng để chơi', 50000.00, 's2', 'c2');

--
-- Bẫy `products`
--
DELIMITER $$
CREATE TRIGGER `update_cart_status` AFTER UPDATE ON `products` FOR EACH ROW BEGIN
    -- Nếu quantity của sản phẩm là 0 -> Đặt trạng thái trong cart là 'Hết hàng'
    IF NEW.quantity = 0 THEN
        UPDATE cart
        SET status = 'Hết hàng'
        WHERE product_id = NEW.id;
    -- Nếu quantity > 0 -> Đặt trạng thái trong cart là 'Còn hàng'
    ELSE
        UPDATE cart
        SET status = 'Còn hàng'
        WHERE product_id = NEW.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `buyer_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `rate` int(11) DEFAULT NULL CHECK (`rate` between 1 and 5),
  `comment` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `order_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`buyer_id`, `product_id`, `rate`, `comment`, `image`, `added_at`, `order_id`) VALUES
('b1', 'p1', 5, 'Great product, highly recommended!', NULL, '2024-11-04 14:00:00', 'o1'),
('b1', 'p3', 3, 'Average experience, expected better.', NULL, '2024-11-06 08:45:00', 'o3'),
('b2', 'p1', 5, 'Sản phẩm rất tuyệt vời! Chắc chắn sẽ mua lần nữa.', 'http://example.com/image.jpg', '2024-11-17 03:28:00', 'o4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sellers`
--

CREATE TABLE `sellers` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `tax_code` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sellers`
--

INSERT INTO `sellers` (`id`, `user_id`, `tax_code`, `description`) VALUES
('s1', 'u1', 'TAX12345', 'Electronics seller'),
('s2', 'u2', 'TAX67890', 'Books and stationery seller');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shippers`
--

CREATE TABLE `shippers` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `shippers`
--

INSERT INTO `shippers` (`id`, `name`, `phone_number`) VALUES
('ship1', 'Fast Delivery Co.', '1231231234'),
('ship2', 'Reliable Shipping Inc.', '9879879876');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address_street` varchar(255) DEFAULT NULL,
  `address_town` varchar(255) DEFAULT NULL,
  `address_district` varchar(255) DEFAULT NULL,
  `address_city` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `search_history` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `address_street`, `address_town`, `address_district`, `address_city`, `email`, `search_history`, `phone_number`, `bank_name`, `account_number`) VALUES
('u1', 'John Doe', 'password123', '123 Main St', 'Smalltown', 'Central District', 'Big City', 'john.doe@example.com', NULL, '1234567890', 'Bank A', '123456789012'),
('u2', 'Jane Smith', 'password456', '456 Elm St', 'Largetown', 'East District', 'Big City', 'jane.smith@example.com', NULL, '0987654321', 'Bank B', '098765432109');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_ibfk_1` (`buyer_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `deliveried_by`
--
ALTER TABLE `deliveried_by`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `shipper_id` (`shipper_id`);

--
-- Chỉ mục cho bảng `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deliveried_by_id` (`deliveried_by_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Chỉ mục cho bảng `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `shippers`
--
ALTER TABLE `shippers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Các ràng buộc cho bảng `buyers`
--
ALTER TABLE `buyers`
  ADD CONSTRAINT `buyers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `buyers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_infk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE SET NULL;

--
-- Các ràng buộc cho bảng `deliveried_by`
--
ALTER TABLE `deliveried_by`
  ADD CONSTRAINT `deliveried_by_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `deliveried_by_ibfk_2` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`id`);

--
-- Các ràng buộc cho bảng `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`deliveried_by_id`) REFERENCES `deliveried_by` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `buyers` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `order_ibfk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `buyers` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
