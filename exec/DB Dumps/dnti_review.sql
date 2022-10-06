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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `content` varchar(254) DEFAULT NULL,
  `dong` varchar(10) DEFAULT NULL,
  `environment` int(11) DEFAULT NULL,
  `gu` varchar(10) DEFAULT NULL,
  `hit` int(11) DEFAULT NULL,
  `infra` int(11) DEFAULT NULL,
  `rental` int(11) DEFAULT NULL,
  `review_like` int(11) DEFAULT NULL,
  `safety` int(11) DEFAULT NULL,
  `score` double DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2022-09-20 09:30:22.232051','2022-10-06 13:34:38.252000','사실 교통 뿐만 아니라 다 있어요!','역삼동',3,'강남구',41,3,4,2,4,3.5,'교통의 중심지~~~ 강남','skj@gmail.com'),(6,'2022-09-20 18:33:22.232051','2022-10-06 15:49:27.242000','없는거 빼고 다 있는 동네입니다!!','서교동',3,'마포구',5,3,4,0,4,3.5,'마포구 좋아요','dummy1@gmail.com'),(7,'2022-09-20 18:36:22.232051','2022-10-06 15:49:28.601000','특히 힙한 식당들 너무 좋아','서교동',4,'마포구',3,4,4,0,4,4,'마포구 맛집 짱 많음...ㅎ','dummy2@gmail.com'),(8,'2022-09-20 18:40:22.232051','2022-09-20 18:40:22.232051','지하철, 버스만 타면 다 갈 수 있어요!!','서교동',5,'마포구',1,5,5,0,5,5,'교통 너무 좋아!!','dummy3@gmail.com'),(9,'2022-09-20 18:41:22.232051','2022-09-20 18:41:22.232051','1111','강일동',3,'강동구',1,3,4,0,4,3.5,'복싱장이 좋아요','kth@gmail.com'),(10,'2022-09-20 18:45:22.232051','2022-09-20 18:45:22.232051','1111','강일동',3,'강동구',1,3,4,0,4,3.5,'반찬가게','kth@gmail.com'),(11,'2022-09-20 13:30:22.232051','2022-10-03 22:23:26.085000','1111','상도동',3,'동작구',33,3,4,0,4,3.5,'안녕','pyj@gmail.com'),(12,'2022-09-20 14:30:22.232051','2022-09-20 14:30:22.232051','1111','신대방동',3,'동작구',64,3,4,0,4,3.5,'동작 불주먹','pyj@gmail.com'),(13,'2022-09-20 15:30:22.232051','2022-10-03 22:23:33.340000','1111','상도동',3,'동작구',257,3,4,0,4,3.5,'디자인킹','pyj@gmail.com'),(14,'2022-09-20 16:30:22.232051','2022-10-04 15:18:11.641000','1111','동작동',3,'동작구',561,3,4,0,4,3.5,'상경한 1인가구','pyj@gmail.com'),(15,'2022-09-20 18:30:22.232051','2022-10-06 11:50:51.704000','1111zzz','흑석동',5,'동작구',1209,5,5,1,5,3.5,'거제 불주먹zzz','pyj@gmail.com'),(16,'2022-09-20 13:30:22.232051','2022-10-04 11:36:00.847000','1111','서초동',3,'서초구',4,3,4,0,4,3.5,'안녕','yth@gmail.com'),(17,'2022-09-20 14:30:22.232051','2022-09-20 14:30:22.232051','1111','서초동',3,'서초구',4,3,4,0,4,3.5,'안녕하십네까','yth@gmail.com'),(18,'2022-09-20 15:30:22.232051','2022-09-20 15:30:22.232051','1111','서초동',3,'서초구',8,3,4,0,4,3.5,'오늘 반찬','yth@gmail.com'),(19,'2022-09-20 16:30:22.232051','2022-09-20 16:30:22.232051','1111','서초동',3,'서초구',16,3,4,0,4,3.5,'매머드커피','yth@gmail.com'),(20,'2022-09-20 17:30:22.232051','2022-09-20 17:30:22.232051','1111','서초동',3,'서초구',32,3,4,0,4,3.5,'메가커피 좋아','yth@gmail.com'),(21,'2022-09-20 11:30:22.232051','2022-09-20 11:30:22.232051','1111','신대방동',3,'동작구',100,3,4,0,4,3.5,'안녕안녕','hjw@gmail.com'),(22,'2022-09-20 12:30:22.232051','2022-10-03 22:23:23.201000','1111','신대방동',3,'동작구',1002,3,4,0,4,3.5,'안녕','hjw@gmail.com'),(23,'2022-09-20 13:30:22.232051','2022-09-20 13:30:22.232051','1111','상도동',3,'동작구',1,3,4,0,4,3.5,'농구하실분','hjw@gmail.com'),(24,'2022-09-20 14:30:22.232051','2022-09-20 14:30:22.232051','1111','상도동',3,'동작구',1,3,4,0,4,3.5,'헬스 가실분','hjw@gmail.com'),(25,'2022-09-20 15:30:22.232051','2022-09-20 15:30:22.232051','1111','신대방동',3,'동작구',1,3,4,0,4,3.5,'서울대입구역','hjw@gmail.com'),(26,'2022-09-20 11:30:22.232051','2022-09-20 11:30:22.232051','1111','삼전동',3,'송파구',1,3,4,0,4,3.5,'안녕하세요','hiy@gmail.com'),(27,'2022-09-20 12:30:22.232051','2022-09-20 12:30:22.232051','1111','삼전동',3,'송파구',2,3,4,0,4,3.5,'송파 주민입니다.','hiy@gmail.com'),(28,'2022-09-20 13:30:22.232051','2022-09-20 13:30:22.232051','1111','삼전동',3,'송파구',5,3,4,0,4,3.5,'치킨드실분','hiy@gmail.com'),(29,'2022-09-20 14:30:22.232051','2022-10-04 02:51:13.461000','1111','삼전동',3,'송파구',12,3,4,0,4,3.5,'양념치킨 가능??','hiy@gmail.com'),(30,'2022-09-20 15:30:22.232051','2022-10-04 09:43:25.263000','1111','능동',3,'광진구',26,3,4,0,4,3.5,'공원 너무 좋아요!','hiy@gmail.com'),(31,'2022-10-02 17:01:10.924000','2022-10-02 17:01:10.924000','내용','상도동',3,'동작구',0,3,4,0,4,3.5,'제목','pyj@gmail.com'),(32,'2022-10-04 17:04:07.254000','2022-10-04 17:04:07.254000','경찰서 많고 거리가 밝아요!','자양동',3,'광진구',0,3,3,0,3,3,'광진구는 치안이 좋아요!','kth1324006@gmail.com'),(33,'2022-10-05 09:07:30.365000','2022-10-05 09:17:56.865000','임대료가 싸구요..\n근데 교통이 좀 안좋을지도','능동',4,'광진구',1,4,5,0,4,4.25,'저희 광진구는요..','kth1324006@gmail.com'),(34,'2022-10-05 09:18:20.811000','2022-10-05 09:18:20.811000','굿','봉천동',4,'관악구',0,4,4,0,4,4,'ㅎㅇㅎㅇ','miso97o@gmail.com'),(35,'2022-10-05 09:19:59.363000','2022-10-05 09:19:59.363000','구','봉천동',3,'관악구',0,4,4,0,2,3.25,'과낙','miso97o@gmail.com'),(36,'2022-10-05 09:20:31.270000','2022-10-05 09:21:10.818000','동','봉천동',4,'관악구',3,4,4,0,3,3.5,'봉천','miso97o@gmail.com');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-06 16:36:56
