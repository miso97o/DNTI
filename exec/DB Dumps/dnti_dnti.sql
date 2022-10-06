-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: j7a601.p.ssafy.io    Database: dnti
-- ------------------------------------------------------
-- Server version	5.7.39

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
-- Table structure for table `dnti`
--

DROP TABLE IF EXISTS `dnti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dnti` (
  `dnti_id` varchar(255) NOT NULL,
  `count` bigint(20) DEFAULT NULL,
  `hashtag1` varchar(5) DEFAULT NULL,
  `hashtag2` varchar(5) DEFAULT NULL,
  `keyword` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`dnti_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dnti`
--

LOCK TABLES `dnti` WRITE;
/*!40000 ALTER TABLE `dnti` DISABLE KEYS */;
INSERT INTO `dnti` VALUES ('INPS',3,'편리미엄','자연인','겂없는 모순주의자'),('INSP',6,'편리미엄','자연인','본투비 부자'),('IPNS',3,'편리미엄','알뜰살뜰','해맑은 외향인'),('IPSN',6,'편리미엄','알뜰살뜰','현실적인 야망인'),('ISNP',5,'편리미엄','안전제일','신도시 킬러'),('ISPN',1,'편리미엄','안전제일','뼛속까지 도시인'),('NIPS',15,'자연인','편리미엄','겁없는 모순덩어리'),('NISP',12,'자연인','편리미엄','모순적인 부자'),('NOTI',5,'우유부단','자연인','우유부단한 자연인'),('NOTN',6,'우유부단','현대인','우유부단한 현대인'),('NOTP',7,'우유부단','흥청망청','우유부단한 부자'),('NOTS',2,'우유부단','용감','우유부단한 대장부'),('NPIS',2,'자연인','알뜰살뜰','예비 자연인'),('NPSI',3,'자연인','알뜰살뜰','나는 자연인'),('NSIP',83,'자연인','안전제일','돈많은 예비시골인'),('NSPI',19,'자연인','안전제일','욕심없는 애늙은이'),('PINS',1,'알뜰살뜰','편리미엄','용감한 낭만인'),('PISN',71,'알뜰살뜰','편리미엄','알뜰한 현대인'),('PNIS',3,'알뜰살뜰','자연인','검소한 현실주의자'),('PNSI',3,'알뜰살뜰','자연인','예비 귀농인'),('PSIN',48,'알뜰살뜰','편리미엄','검소한 현실주의자'),('PSNI',16,'알뜰살뜰','안전제일','소소한 산책러'),('SINP',2,'안전제일','편리미엄','흥청망청 신혼부부'),('SIPN',11,'안전제일','편리미엄','현실적인 안전과민러'),('SNIP',2,'안전제일','자연인','신중한 개척자'),('SNPI',2,'안전제일','자연인','아재개그치는 예민이'),('SPIN',12,'안전제일','알뜰살뜰','속세에 찌든 신중이'),('SPNI',20,'안전제일','알뜰살뜰','안전제일 꼼꼼이'),('TOPI',6,'편리미엄','현대인','뽀로로 그잡채'),('TOPN',1,'자연인','푸릇푸릇','자연인 그잡채'),('TOPP',4,'알뜰살뜰','검소','구두쇠 그잡채'),('TOPS',8,'안전제일','조심조심','쫄보 그잡채');
/*!40000 ALTER TABLE `dnti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06 16:36:58
