/* global kakao */
import React, { useEffect } from "react";
// import cn from "classnames";
import styles from "./Map.module.css";
import { coffeePositions } from "../../0_atoms/data/MarkerData";
import BusMarker from "../../0_atoms/markers/BusMarker.png";
// import { AddMarker } from "../../1_molecules/kmMap/AddMarker";
// import { selected } from "../../1_molecules/kmMap/Show";


const { kakao } = window;


function Map() {
  // 맵 띄우기
  useEffect(() => {
    mapscript()
  }, []);

  const mapscript = () => {
    let container = document.getElementById("kakaoMap");
    let options = {
      // center: new kakao.maps.LatLng(37.525078, 126.975702), // 서울중심어딘가
      center: new kakao.maps.LatLng(37.497486063, 127.027661548),
      level: 4,
    };
    console.log("loading kakaomap")

    //map
    const map = new kakao.maps.Map(container, options);


    // ---------------- 마커 -------------------

    const markerSize = new kakao.maps.Size(30 , 39)  // 가로 세로
    const markerPlace = {offset: new kakao.maps.Point(14, 39)}

    coffeePositions.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        // position: new kakao.maps.Latlng(), // 마커를 표시할 위치
        //마커에 hover시 나타날 title
        title: el.title,
        image: new kakao.maps.MarkerImage(BusMarker, markerSize, markerPlace)
      });
    });
    // marker.setMap(map);  


    // --------------- 원 ------------------
    const circle = new kakao.maps.Circle({
      center : options.center,  // 원의 중심좌표
      radius: 500, // 미터 단위의 원의 반지름
      strokeWeight: 2, // 선 두께
      strokeColor: '#ffffff', // 선 색깔
      strokeOpacity: 1, // 선의 불투명도 1에서 0 사이의 값 0에 가까울수록 투명
      strokeStyle: 'dashed', // 선의 스타일
      fillColor: '#ffffff', // 채우기 색깔
      fillOpacity: 0.3  // 채우기 불투명도   
    }); 

    // 지도에 원을 표시합니다 
    circle.setMap(map);
  };



  // 마커 여러개 띄우기
  


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.TmpMap} id="kakaoMap"></div>
          
      </div>
    </div>
  );
}
export default Map;
