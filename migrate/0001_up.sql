-- Active: 1697898662420@@45.136.239.36@3306@store
CREATE TABLE `store`.`product_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `filename` VARCHAR(45) NOT NULL,
  `url` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`));
DROP TRIGGER IF EXISTS `store`.`product_images_BEFORE_UPDATE`;

DELIMITER $$
USE `store`$$
CREATE DEFINER = CURRENT_USER TRIGGER `store`.`product_images_BEFORE_UPDATE` BEFORE UPDATE ON `product_images` FOR EACH ROW
BEGIN
	SET NEW.updated_at = NOW();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `store`.`product_images_BEFORE_INSERT`;

DELIMITER $$
USE `store`$$
CREATE DEFINER = CURRENT_USER TRIGGER `store`.`product_images_BEFORE_INSERT` BEFORE INSERT ON `product_images` FOR EACH ROW
BEGIN
	SET NEW.created_at = NOW(), NEW.updated_at = NOW();
END$$
DELIMITER ;


CREATE TABLE `store`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL,
  `price` INT NOT NULL,
  `qty` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `updated_by` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
DROP TRIGGER IF EXISTS `store`.`products_BEFORE_INSERT`;

DELIMITER $$
USE `store`$$
CREATE DEFINER = CURRENT_USER TRIGGER `store`.`products_BEFORE_INSERT` BEFORE INSERT ON `products` FOR EACH ROW
BEGIN
	SET NEW.created_at = NOW(), NEW.updated_at = NOW();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS `store`.`products_BEFORE_UPDATE`;

DELIMITER $$
USE `store`$$
CREATE DEFINER = CURRENT_USER TRIGGER `store`.`products_BEFORE_UPDATE` BEFORE UPDATE ON `products` FOR EACH ROW
BEGIN
	SET NEW.updated_at = NOW();
END$$
DELIMITER ;


CREATE TABLE `store`.`users` (
  `uid` VARCHAR(32) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `hash` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  `deleted_at` VARCHAR(45) NULL,
  PRIMARY KEY (`uid`));