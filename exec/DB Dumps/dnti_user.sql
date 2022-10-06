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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `birth_year` int(11) DEFAULT NULL,
  `dnti` varchar(4) DEFAULT NULL,
  `dong` varchar(10) DEFAULT NULL,
  `gu` varchar(10) DEFAULT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('dummy10@gmail.com',1997,'PNSI','서교동','마포구','헬리오스'),('dummy11@gmail.com',1996,'NPIS','서교동','마포구','글렌피딕'),('dummy1@gmail.com',1999,'PNIS','서교동','마포구','더그아웃'),('dummy2@gmail.com',1997,'PNSI','방화동','강서구','콩쥐들쥐'),('dummy3@gmail.com',1998,'PSIN','서교동','마포구','밀라니온'),('dummy4@gmail.com',1996,'SINP','서교동','마포구','메두사'),('dummy5@gmail.com',1998,'NOTS','서교동','마포구','클린샷'),('dummy6@gmail.com',1999,'IPNS','서교동','마포구','샬롯'),('dummy7@gmail.com',2000,'IPSN','서교동','마포구','earpearp'),('dummy8@gmail.com',1998,'NOTN','서교동','마포구','다보탑'),('dummy9@gmail.com',1996,'NPIS','서교동','마포구','북이랑장구랑'),('hamilton@gmail.com',2000,'PNSI','능동','광진구','꿀벌모양하둡'),('hiy@gmail.com',1996,'NSIP','잠실동','송파구','팽나무'),('hjw@gmail.com',1997,'NIPS','상월곡동','성북구','타르트'),('icebreakers@gmail.com',1999,'PNSI','번동','강북구','흐아암'),('kor.hoonie@gmail.com',1993,'NSPI','번동','강북구','사우루스'),('kth1324006@gmail.com',1995,'NPSI','능동','광진구','토마토'),('kth@gmail.com',1993,'PNIS','능동','광진구','꼬리밤나비'),('miso97o@gmail.com',1998,'PSNI','상월곡동','성북구','황씨'),('pyj@gmail.com',1997,'INSP','번동','강북구','까치산족제비'),('pyjin802@gmail.com',1999,'ISNP','능동','광진구','프린조'),('skj@gmail.com',1994,'PISN','능동','광진구','부거티'),('ssafyskj@gmail.com',1996,'NSPI','서교동','마포구','시연용'),('tjdytpq0310@gmail.com',1994,'NOTN','상월곡동','성북구','hohossafy'),('yth@gmail.com',1993,'SNPI','번동','강북구','초록매실');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06 16:36:57
