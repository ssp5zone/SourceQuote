/*
SQLyog Community v12.2.4 (64 bit)
MySQL - 5.6.5-m8 : Database - xnode
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`xnode` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `xnode`;

/*Table structure for table `source_quote` */

DROP TABLE IF EXISTS `source_quote`;

CREATE TABLE `source_quote` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `quote` varchar(400) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

/*Data for the table `source_quote` */

insert  into `source_quote`(`id`,`quote`,`source`,`type`) values 
(8,'You can do anything, but not everything.','David','My neighbour'),
(9,'The richest man is not he who has the most, but he who needs the least.','Unknown Author',''),
(12,'Work like you don’t need money, love like you’ve never been hurt, and dance like no one’s watching.','Unknown',''),
(14,'You’ve heard of the golden rule, haven’t you? Whoever has the gold makes the rules.','Crazy hunch-backed old guy in Aladdin','Cartoon'),
(15,'Never be afraid to laugh at yourself, after all, you could be missing out on the joke of the century.','Dame Edna Everage','Someone'),
(17,'Advice is what we ask for when we already know the answer but wish we didn’t.','Erica Jong','American novelist'),
(20,'The human heart has hidden treasures, In secret kept, in silence sealed; The thoughts, the hopes, the dreams, the pleasures, Whose charms were broken if revealed.','Jane Eyre','Novel'),
(21,'For you a thousand times over.','The kite runner','Novel');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
