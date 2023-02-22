-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: workmanage
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `ad_work_record`
--

DROP TABLE IF EXISTS `ad_work_record`;
/*!50001 DROP VIEW IF EXISTS `ad_work_record`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ad_work_record` AS SELECT 
 1 AS `RECORD_NO`,
 1 AS `EMP_NO`,
 1 AS `EMP_NAME`,
 1 AS `WORK_CODE`,
 1 AS `WORK_TYPE`,
 1 AS `WORK_DES`,
 1 AS `BLK_SQ`,
 1 AS `BLK_NO`,
 1 AS `HULL_SQ`,
 1 AS `HULL_NO`,
 1 AS `HULL_TYPE`,
 1 AS `SHIPYARD`,
 1 AS `NORM_MH`,
 1 AS `INP_MH`,
 1 AS `OVERTIME_MH`,
 1 AS `RES_MH`,
 1 AS `WORK_DATE`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block` (
  `BLK_SQ` int NOT NULL AUTO_INCREMENT,
  `BLK_NO` char(255) NOT NULL,
  `HULL_SQ` int NOT NULL,
  `NORM_MH` int NOT NULL,
  `RES_MH` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`BLK_SQ`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EMP_NO` char(255) NOT NULL,
  `EMP_NAME` char(255) NOT NULL,
  `EMP_PW` char(255) NOT NULL,
  `ADMIN` tinyint(1) DEFAULT '0',
  `INP_DATE` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`EMP_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hull`
--

DROP TABLE IF EXISTS `hull`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hull` (
  `HULL_SQ` int NOT NULL AUTO_INCREMENT,
  `HULL_NO` char(255) NOT NULL,
  `HULL_TYPE` char(255) NOT NULL,
  `SHIPYARD` char(255) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`HULL_SQ`,`HULL_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work` (
  `WORK_CODE` bigint NOT NULL AUTO_INCREMENT,
  `WORK_TYPE` char(20) NOT NULL,
  `WORK_DES` char(20) NOT NULL,
  PRIMARY KEY (`WORK_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_record`
--

DROP TABLE IF EXISTS `work_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_record` (
  `RECORD_NO` bigint NOT NULL AUTO_INCREMENT,
  `EMP_NO` char(255) NOT NULL,
  `WORK_CODE` bigint NOT NULL,
  `BLK_SQ` int NOT NULL,
  `HULL_SQ` int NOT NULL,
  `INP_MH` float NOT NULL,
  `WORK_DATE` char(255) DEFAULT 'NOW()',
  `OVERTIME_MH` float DEFAULT '0',
  PRIMARY KEY (`RECORD_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `ad_work_record`
--

/*!50001 DROP VIEW IF EXISTS `ad_work_record`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ad_work_record` AS select `wr`.`RECORD_NO` AS `RECORD_NO`,`wr`.`EMP_NO` AS `EMP_NO`,`e`.`EMP_NAME` AS `EMP_NAME`,`w`.`WORK_CODE` AS `WORK_CODE`,`w`.`WORK_TYPE` AS `WORK_TYPE`,`w`.`WORK_DES` AS `WORK_DES`,`b`.`BLK_SQ` AS `BLK_SQ`,`b`.`BLK_NO` AS `BLK_NO`,`h`.`HULL_SQ` AS `HULL_SQ`,`h`.`HULL_NO` AS `HULL_NO`,`h`.`HULL_TYPE` AS `HULL_TYPE`,`h`.`SHIPYARD` AS `SHIPYARD`,`b`.`NORM_MH` AS `NORM_MH`,`wr`.`INP_MH` AS `INP_MH`,`wr`.`OVERTIME_MH` AS `OVERTIME_MH`,`b`.`RES_MH` AS `RES_MH`,`wr`.`WORK_DATE` AS `WORK_DATE` from ((((`work_record` `wr` join `block` `b` on((`wr`.`BLK_SQ` = `b`.`BLK_SQ`))) join `employee` `e` on((`wr`.`EMP_NO` = `e`.`EMP_NO`))) join `work` `w` on((`wr`.`WORK_CODE` = `w`.`WORK_CODE`))) join `hull` `h` on((`wr`.`HULL_SQ` = `h`.`HULL_SQ`))) order by `wr`.`RECORD_NO` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-19 12:42:23
