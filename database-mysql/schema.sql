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
-- Schema petsya
-- ------------------------------------------------------
-- -----------------------------------------------------
-- Schema petsya
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `petsya`;

CREATE SCHEMA IF NOT EXISTS `petsya` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `petsya`;

-- -----------------------------------------------------
-- Table `petsya`.`petsya`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petsya`.`chat` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `convertSation_id` VARCHAR(10) NOT NULL ,
  `sender_id` INT NOT NULL,
  `reciever_id` INT NOT NULL,
  `message` VARCHAR(200) DEFAULT NULL,
  `timestamp` VARCHAR(40) DEFAULT NULL,
  `status` VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (
    `message_id`
  )
);


-- -----------------------------------------------------
-- Table `petsya`.`questions_has_contract_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petsya`.`user_has_posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` VARCHAR(200) DEFAULT NULL,
  `attachment` VARCHAR(200) DEFAULT NULL,
  `likes` INT NULL DEFAULT NULL,
  `comments` VARCHAR(200) DEFAULT NULL,
  `shares` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `petsya`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petsya`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `petsya`.`users_has_notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petsya`.`users_has_notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `post_id` INT NOT NULL,
  `receiver_id` INT NULL DEFAULT NULL,
  `date` VARCHAR(45) NULL DEFAULT NULL,
  `seen` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
