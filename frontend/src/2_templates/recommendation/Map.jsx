/* global kakao */
import React, { useEffect } from "react";
// import cn from "classnames";
import styles from "./Map.module.css";
import geojson from "../../0_atoms/data/seoul_geojson";
// import { AddMarker } from "../../1_molecules/kmMap/AddMarker";
// import { selected } from "../../1_molecules/kmMap/Show";


  const { kakao } = window;


function Map() {

  useEffect(() => {
    let data = geojson.features;
    let coordinates = []; //좌표 저장 배열
    let name = ''; //행정구 이름

    let polygons = [];

    const mapContainer = document.getElementById('kakaoMap'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.567000, 126.975702), // 지도의 중심좌표
      
      level: 8, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});

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

        customOverlay.setContent('<div className={styles.title}>' + name + '</div>');

        // customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });


      // 커스텀 오버레이를 지도에서 제거합니다
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: '#fff' });
        customOverlay.setMap(null);
      });


    };



    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      name = val.properties.EMD_NM;
      displayArea(coordinates, name);
    });
 }, []);

  


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.TmpMap} id="kakaoMap"></div>
          
      </div>
    </div>
  );
}
export default Map;
