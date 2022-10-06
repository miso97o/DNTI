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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `board_like` bigint(20) DEFAULT '0',
  `contents` varchar(254) DEFAULT NULL,
  `dong` varchar(10) DEFAULT NULL,
  `gu` varchar(10) DEFAULT NULL,
  `hit` bigint(20) DEFAULT '0',
  `title` varchar(100) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `is_certified` bit(1) DEFAULT b'0',
  PRIMARY KEY (`board_id`),
  KEY `FKfyf1fchnby6hndhlfaidier1r` (`user_id`),
  CONSTRAINT `FKfyf1fchnby6hndhlfaidier1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'2022-07-21 09:30:22.232051','2022-10-05 16:57:06.846000',0,'이사 왔는데 혹시 능동에 진행중인 독서모임 있나요 ?','능동','광진구',4,'능동 독서모임 있나요??','yth@gmail.com',_binary '\0'),(2,'2022-07-20 09:30:22.232051','2022-10-06 15:26:11.167000',0,'안녕하세요!!!','서교동','마포구',8,'안녕하세요','dummy1@gmail.com',_binary '\0'),(3,'2022-07-23 09:30:22.232051','2022-10-06 14:50:49.317000',0,'반가워요~~~','서교동','마포구',5,'반갑습니다!!!','dummy2@gmail.com',_binary '\0'),(4,'2022-07-16 09:30:22.232051','2022-10-06 14:50:25.601000',0,'맛집 알려주세요!!','서교동','마포구',4,'서교동 맛집 알려주세요~~~','dummy3@gmail.com',_binary ''),(5,'2022-07-18 09:30:22.232051','2022-10-06 14:50:35.650000',0,'허리를 삐끗했는데 정형외과 진료 잘 보는 곳 있을까요?','서교동','마포구',4,'정형외과 진료 잘 보는 곳 있나요?','dummy4@gmail.com',_binary ''),(6,'2022-07-25 09:30:22.232051','2022-10-05 17:54:08.131000',0,'처음 이사 왔는데 혹시 맛집 리스트 공유 가능하실까요? 댓글 부탁드립니다~~','능동','광진구',1,'능동 맛집 리스트 공유 부탁드려요!!!','skj@gmail.com',_binary '\0'),(9,'2022-10-03 16:37:27.436000','2022-10-06 15:26:07.476000',0,'책상, 의자 등등 나눔합니다~~~','능동','광진구',21,'안 쓰는 가구 나눔합니다~~~ 능동 직거래!','kth1324006@gmail.com',_binary ''),(14,'2022-10-04 10:27:13.777000','2022-10-05 11:41:36.551000',0,'능동 동사무소 근처에서 잃어버린거 같습니다,,,, 댓글 부탁드려요 ㅠ','능동','광진구',3,'혹시 지갑 습득하신 분 계실까요? ㅜㅜㅜ','pyj@gmail.com',_binary '\0'),(15,'2022-10-04 10:54:49.207000','2022-10-05 13:30:47.804000',0,'어제 능동 현대아파트에 이사왔습니다! 잘 부탁드려요~~~','능동','광진구',6,'안녕하세요~~~','miso97o@gmail.com',_binary '\0'),(18,'2022-10-05 09:45:23.529000','2022-10-06 09:47:44.741000',0,'dnti검사를 했는데 능동이 1위로 추천받았어요 ㅎㅎㅎㅎ','능동','광진구',4,'반갑습니다!!','pyjin802@gmail.com',_binary ''),(19,'2022-10-05 17:45:23.529000','2022-10-06 15:48:33.359000',0,'반갑습니다~~~','능동','광진구',4,'이사왔어요~~~~','icebreakers@gmail.com',_binary ''),(20,'2022-10-03 14:45:23.529000','2022-10-06 15:48:46.542000',0,'여기 가성비 짱이고 직원분도 친절해요!','능동','광진구',7,'삼겹살집 추천합니다!!','hamilton@gmail.com',_binary ''),(21,'2022-10-05 17:41:27.071000','2022-10-06 10:12:46.300000',0,'능동에 치과 진료 잘하는 병원 있나요??','능동','광진구',2,'치과 진료 잘하는 병원 추천 부탁드립니다!!','kor.hoonie@gmail.com',_binary '\0'),(22,'2022-10-01 14:45:23.529000','2022-10-06 09:47:51.729000',0,'혼밥러입니다...','능동','광진구',5,'혼밥하기 좋은 식당 있나요??','icebreakers@gmail.com',_binary '\0'),(23,'2022-10-06 09:16:57.155000','2022-10-06 09:19:10.593000',0,'회원가입입니다~~','서교동','마포구',2,'안녕하세요','ssafyskj@gmail.com',_binary ''),(24,'2022-10-06 09:17:17.452000','2022-10-06 15:26:16.586000',0,'안녕하세요 반갑습니다~~~','남현동','관악구',3,'안녕하세요','ssafyskj@gmail.com',_binary ''),(27,'2022-10-06 14:29:20.244000','2022-10-06 14:50:51.923000',0,'느낌 있는 카페 찾고 있어요~~~','서교동','마포구',2,'이쁜 카페 추천부탁해요!!','hiy@gmail.com',_binary '\0'),(29,'2022-10-06 14:29:20.244000','2022-10-06 15:52:10.922000',0,'평일 저녁에 농구하실 분 계신가요?','서교동','마포구',4,'가볍게 농구 뛰실 분 모집합니다~~~','dummy5@gmail.com',_binary ''),(31,'2022-10-06 15:29:20.244000',NULL,0,'여기 디저트 완전 맛있어요','서교동','마포구',0,'디저트 맛있는 카페 추천해요','dummy6@gmail.com',_binary ''),(32,'2022-10-02 15:29:20.244000',NULL,0,'안녕하세요~~~','서교동','마포구',0,'안녕하세요!!','dummy7@gmail.com',_binary '');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
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
