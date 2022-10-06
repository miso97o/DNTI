/* global kakao */
import React from "react";
import { useState, useEffect } from "react";
// import cn from "classnames";
import styles from "./Map.module.css";
import geojson from "../../0_atoms/data/seoul_geojson";
import { useSelector } from "react-redux";
// import { selected } from "../../1_molecules/kmMap/Show";



function Map() {
  const { kakao } = window;
  const [check, setCheck] = useState(true);
  const recommend = useSelector((state) => state.recommend.rank);
  console.log(recommend)

  useEffect(() => {
    let data = geojson.features;
    // console.log(data)
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
    let color="#fff"

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
        fillColor: color, // 채우기 색깔입니다
        fillOpacity: 0.3, // 채우기 불투명도 입니다
      });

      polygons.push(polygon);

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
      kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        polygon.setOptions({ fillColor: '#7a08ff' });
      });

      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        var latlng = mouseEvent.latLng;
        const level = 4
        map.setLevel(level, {anchor: latlng, animate: {
          duration:200
        }})
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경
      kakao.maps.event.addListener(polygon, 'mouseout', function () {
        polygon.setOptions({ fillColor: color });
        customOverlay.setMap(null);
      });
    };

    data.forEach((val) => {
      coordinates = val.geometry.coordinates;
      let tLat = 0
      let tLon = 0
      let path = []
      if (coordinates.length === 1) {
        for(let i=0; i < coordinates[0].length; i++) {
          tLat += coordinates[0][i][1]
          tLon += coordinates[0][i][0]
          path.push(new kakao.maps.LatLng(coordinates[0][i][1], coordinates[0][i][0]))
        }        
        const points = new kakao.maps.LatLng(tLat/coordinates[0].length, tLon/coordinates[0].length)
        name = val.properties.EMD_NM;
        console.log(name)
        const mapCustomOverlay = new kakao.maps.CustomOverlay({
          position: points,
          content: "<p>" + name + "</p>",
          xAnchor: 0.5,
          yAnchor: 0.5,
        });
        recommend.forEach((el) => {
          if (name === el.dongName) {
            let polygon = new kakao.maps.Polygon({
              map: map,
              path: path, // 그려질 다각형의 좌표 배열입니다
              strokeWeight: 3, // 선의 두께입니다
              strokeColor: "#7a08ff", // 선의 색깔입니다
              strokeOpacity: 1, // 선의 불투명도
              strokeStyle: 'solid', // 선의 스타일입니다
              fillColor: "#7a08ff", // 채우기 색깔입니다
              fillOpacity: 0.3, // 채우기 불투명도 입니다
            });
            polygons.push(polygon);

            // color = "#333333"
            mapCustomOverlay.setMap(map);
          } else {
          }
        })
      }


      displayArea(coordinates, name);
    });
 }, [recommend]);




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
