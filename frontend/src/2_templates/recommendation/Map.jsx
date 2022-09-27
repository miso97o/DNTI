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

  }
  


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.TmpMap} id="kakaoMap"></div>
          
      </div>
    </div>
  );
}
export default Map;
