/* global kakao */
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
// import cn from "classnames";
import styles from "./Map.module.css";
import geojson from "../../0_atoms/data/seoul_geojson";
// import { AddMarker } from "../../1_molecules/kmMap/AddMarker";
// import { selected } from "../../1_molecules/kmMap/Show";



function Map() {
  const { kakao } = window;
  const [check, setCheck] = useState(true);



  useEffect(() => {
    let data = geojson.features;
    // console.log(data)
    let coordinates = []; //좌표 저장 배열
    let name = ''; //행정구 이름

    let polygons = [];

    const mapContainer = document.getElementById('kakaoMap'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.525078, 126.975702), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});
    const infowindow = new kakao.maps.InfoWindow({ removable: true });

    const displayArea = (coordinates, name) => {
      let path = [];
      let points = [];


      coordinates[0].forEach((coordinate) => {
        let point = {};
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
      });

      let polygon = new kakao.maps.Polygon({
        map: map,
        path: path, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 1, // 선의 두께입니다
        strokeColor: '#999999', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.4, // 채우기 불투명도 입니다
      });

      polygons.push(polygon);

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        polygon.setOptions({ fillColor: '#09f' });

        // customOverlay.setContent('<div className={styles.title}>' + name + '</div>');
        // customOverlay.setPosition(mouseEvent.latLng);
        // customOverlay.setMap(map);
      });



      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
        customOverlay.setMap(null);
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
      // kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
      //   const content =
      //     name;

      //   infowindow.setContent(content);
      //   infowindow.setPosition(mouseEvent.latLng);
      //   infowindow.setMap(map);
      // });
    };

    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      customOverlay.setContent('<div className={styles.title}>' + name + '</div>');

      customOverlay.setPosition(coordinates);
      name = val.properties.EMD_NM;

      displayArea(coordinates, name);
    });
 }, []);

  // const mapscript = () => {
  //   let container = document.getElementById("kakaoMap");
  //   let options = {
  //     // center: new kakao.maps.LatLng(37.525078, 126.975702), // 서울중심어딘가
  //     center: new kakao.maps.LatLng(37.497486063, 127.027661548),
  //     level: 4,
  //   };
  //   console.log("loading kakaomap")

  //   //map
  //   const map = new kakao.maps.Map(container, options);
  // }
  // useEffect(() => {
  //   if (rank) {
  //     for (let i = 0; 1 < rank.length; i ++){
  //     localStorage.setItem("dongResult", rank[i])
  //     }
  //     setCheck(true);
  //     console.log(rank)      
      
  //   }
  // })


  return (
    <div>
      {check ? (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.TmpMap} id="kakaoMap"></div>
            
        </div>
      </div>
      ) : (
        <div>map loading...</div>
      )}
    </div>
  );
}
export default Map;
