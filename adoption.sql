-- Adminer 4.8.1 MySQL 5.5.5-10.6.4-MariaDB-1:10.6.4+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

USE `adoption`;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `availability`;
CREATE TABLE `availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `availability` (`id`, `description`) VALUES
(1,	'Not Available'),
(2,	'Available'),
(3,	'Pending'),
(4,	'Adopted');

DROP TABLE IF EXISTS `breed`;
CREATE TABLE `breed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `breed_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `breed` (`id`, `name`, `type_id`) VALUES
(1,	'Corgi',	1),
(2,	'Rat Terrier',	1),
(3,	'German Shepard',	1),
(4,	'Siamese',	2);

DROP TABLE IF EXISTS `disposition`;
CREATE TABLE `disposition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `disposition` (`id`, `description`) VALUES
(1,	'Good with children'),
(2,	'Good with other animals'),
(3,	'Animal must be leashed at all times');

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news` varchar(570) NOT NULL,
  `date_entered` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(570) NOT NULL,
  `pic` varchar(240) NOT NULL,
  `type_id` int(10) unsigned NOT NULL,
  `breed_id` int(11) NOT NULL,
  `availability_id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `breed_id` (`breed_id`),
  KEY `availability_id` (`availability_id`),
  KEY `news_id` (`news_id`),
  CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `profile_ibfk_2` FOREIGN KEY (`breed_id`) REFERENCES `breed` (`id`),
  CONSTRAINT `profile_ibfk_3` FOREIGN KEY (`availability_id`) REFERENCES `availability` (`id`),
  CONSTRAINT `profile_ibfk_4` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `type` (`id`, `name`) VALUES
(1,	'dog'),
(2,	'cat'),
(3,	'other');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2021-10-15 02:07:40
