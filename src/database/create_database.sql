DROP TABLE IF EXISTS `cart_items`, `carts`, `delivery`, `deliveried_by`, `shippers`, `coupons`, `reviews`, `orders`, `bills`, `buyers`, `sellers`, `products`, `categories`, `users`;

-- Create table for users (includes both buyers and sellers)
CREATE TABLE `users` (
  `id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `address_street` VARCHAR(255),
  `address_town` VARCHAR(255),
  `address_district` VARCHAR(255),
  `address_city` VARCHAR(255),
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `search_history` TEXT,
  `phone_number` VARCHAR(20),
  `bank_name` VARCHAR(255),
  `account_number` VARCHAR(50)
);


CREATE TABLE `sellers` (
  `id` VARCHAR(36) PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `tax_code` VARCHAR(50) NOT NULL,
  `description` TEXT,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);


CREATE TABLE `buyers` (
  `id` VARCHAR(36) PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);


CREATE TABLE `categories` (
  `id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT
);


CREATE TABLE `products` (
  `id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `description` LONGTEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `seller_id` VARCHAR(36),
  `category_id` VARCHAR(36),
  FOREIGN KEY (`seller_id`) REFERENCES `sellers`(`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
);


CREATE TABLE `orders` (
  `id` VARCHAR(36) PRIMARY KEY,
  `buyer_id` VARCHAR(36) NOT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('Pending', 'Accepted', 'Delivered') DEFAULT 'Pending',
  `number_of_products` INT NOT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`buyer_id`) REFERENCES `buyers`(`id`)
);


CREATE TABLE `bills` (
  `id` VARCHAR(36) PRIMARY KEY,
  `order_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
);


CREATE TABLE `reviews` (
  `id` VARCHAR(36) PRIMARY KEY,
  `order_id` VARCHAR(36) NOT NULL,
  `rate` INT CHECK (`rate` BETWEEN 1 AND 5),
  `comment` TEXT,
  `image` VARCHAR(255),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
);


CREATE TABLE `coupons` (
  `id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `discount_percent` DECIMAL(5, 2) CHECK (`discount_percent` BETWEEN 0 AND 100),
  `due_date` DATE NOT NULL,
  `quantity` INT NOT NULL
);


CREATE TABLE `shippers` (
  `id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(20)
);


CREATE TABLE `deliveried_by` (
  `id` VARCHAR(36) PRIMARY KEY,
  `order_id` VARCHAR(36) NOT NULL,
  `expected_date` DATE,
  `arrival_date` DATE,
  `departure_date` DATE,
  `shipper_id` VARCHAR(36) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`),
  FOREIGN KEY (`shipper_id`) REFERENCES `shippers`(`id`)
);


CREATE TABLE `delivery` (
  `id` VARCHAR(36) PRIMARY KEY,
  `deliveried_by_id` VARCHAR(36) NOT NULL,
  FOREIGN KEY (`deliveried_by_id`) REFERENCES `deliveried_by`(`id`)
);


CREATE TABLE `carts` (
  `id` VARCHAR(36) PRIMARY KEY,
  `buyer_id` VARCHAR(36) NOT NULL,
  FOREIGN KEY (`buyer_id`) REFERENCES `buyers`(`id`)
);


CREATE TABLE `cart_items` (
  `cart_id` VARCHAR(36),
  `product_id` VARCHAR(36),
  `quantity` INT NOT NULL,
  PRIMARY KEY (`cart_id`, `product_id`),
  FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);
