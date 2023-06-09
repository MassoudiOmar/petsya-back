SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema railway
-- ------------------------------------------------------
-- -----------------------------------------------------
-- Schema railway
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `railway`;

CREATE SCHEMA IF NOT EXISTS `railway` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `railway`;

-- -----------------------------------------------------
-- Table `railway`.`railway`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `railway`.`chat` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `convertSation_id` VARCHAR(10) NOT NULL ,
  `sender_id` VARCHAR(10) NOT NULL,
  `reciever_id` VARCHAR(10) NOT NULL,
  `message` VARCHAR(200) DEFAULT NULL,
  `timestamp` VARCHAR(40) DEFAULT NULL,
  `status` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (
    `message_id`
  )
);


-- -----------------------------------------------------
-- Table `railway`.`questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `railway`.`user_has_posts` (
  `id` VARCHAR(10) NOT NULL,
  `user_id` VARCHAR(10) DEFAULT NULL,
  `content` VARCHAR(200) DEFAULT NULL,
  `attachment` VARCHAR(200) DEFAULT NULL,
  `date` VARCHAR(10) DEFAULT NULL,
  `user_owner_id` VARCHAR(10) DEFAULT NULL,
  `sharer_id` VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `railway`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `railway`.`users` (
  `id` VARCHAR(200) NOT NULL,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `railway`.`users_has_notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `railway`.`users_has_notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` VARCHAR(10) NOT NULL,
  `post_id` VARCHAR(10) NOT NULL,
  `receiver_id` VARCHAR(10) NOT NULL,
  `date` VARCHAR(45) NULL DEFAULT NULL,
  `seen` VARCHAR(10) NULL DEFAULT NULL,
  `action` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `railway`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` VARCHAR(10) NOT NULL,
  `post_id` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `railway`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` VARCHAR(10) NOT NULL,
  `post_id` VARCHAR(10) NOT NULL,
  `comment` VARCHAR(100) NULL DEFAULT NULL,
  `date` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
