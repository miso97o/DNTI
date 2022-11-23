![배너](exec/images/배너.png)
## 프로젝트 소개

동네TI는 MBTI처럼 간단한 테스트를 통해 사용자의 유형을 파악하고 그에 맞는 동네를 추천해주는 서비스입니다.

## 주요 기능

### 동네 유형 검사

- 간단한 밸런스 게임을 통해 사용자의 동네 유형을 검사하는 기능입니다.
- 선택지에 따라 점수를 주고 이를 32개의 유형으로 나누었습니다.

![유형검사](exec/images/유형검사.gif)

### 동네 추천 기능

- 사용자 유형이나 지정한 지표를 통해 동네를 추천해주는 기능입니다.
- 약 100만 개의 공공 데이터를 하둡 맵리듀스를 사용해 정제하고 점수로 환산했습니다.
- 이렇게 환산한 점수에 사용자 유형에 따라 가중치를 두어 총점을 계산하고 순위를 나눠 추천해주었습니다.
    
![동네추천.gif](exec/images/동네추천.gif)
    

### 1KM 인프라 찾기

- 지도에서 사용자가 지정한 지점 직경 1KM의 실질적인 인프라 (올리브영, 노래방, 다이소, 마트 등) 들을 마커로 표시해주는 기능입니다.
- 즐겨찾기로 등록한 장소는 지정한 좌표에서 대중교통으로 걸리는 시간을 알려줍니다.
    
![1키로.gif](exec/images/1키로.gif)
    

### 자유/리뷰 게시판

- 4개의 주제로 실제 사는 동네에 점수를 매기고 이를 다른 사람들이 확인할 수 있는 기능입니다.
    
![리뷰게시판.gif](exec/images/리뷰게시판.gif)
    
- 자유게시판에서는 실제 거주자는 인증 마크가 달린 글을 작성할 수 있고 외지 사람과 소통할 수 있습니다.
- 동 별로 게시판이 나눠져있어 원하는 동네의 정보를 얻을 수 있습니다.
    
![자유게시판.gif](exec/images/자유게시판.gif)
    

### 마이페이지

- 맞춤 데이터를 추천받기 위해 즐겨찾는 장소, 현재 거주 지역 등을 설정할 수 있습니다.
    
![마이페이지.gif](exec/images/마이페이지.gif)
    

## 기술스택

<h3 align="center">Back-end</h3>

<p align="center">
	<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
    <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
    <img src="https://img.shields.io/badge/hibernate-59666C?style=for-the-badge&logo=hibernate security&logoColor=white">
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
    <img src="https://img.shields.io/badge/apache hadoop-66CCFF?style=for-the-badge&logo=apache hadoop&logoColor=white">

</p>


<h3 align="center">Front-end</h3>
<p align="center">
	<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
    <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
    <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
    <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white">
</p>


<h3 align="center">CI/CD</h3>
<p align="center">
	<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
	<img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">
	<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
    <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
    <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
</p>

<br>


## ERD

![ERD](exec/images/ERD.png)

## 아키텍처

![아키텍쳐](exec/images/아키텍쳐.png)

## 팀원소개 및 역할

![팀원및역할](exec/images/팀원및역할.png)
