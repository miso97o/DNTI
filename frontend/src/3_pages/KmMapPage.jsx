import React, { useEffect, useState, setState } from "react";
import http from "../utils/axios";
import axios from "axios";
import Choices from "../2_templates/kmMap/Choices";
import Favorites from "../1_molecules/kmMap/Favorites";
// import Loading from "../1_molecules/kmMap/Loading";
import MoonLoader from "react-spinners/MoonLoader"
import { useSelector } from "react-redux";
import BusMarker from "../0_atoms/markers/BusMarker.png";
import SubwayMarker from "../0_atoms/markers/SubwayMarker.png";
import BikeMarker from "../0_atoms/markers/BikeMarker.png";
import OyMarker from "../0_atoms/markers/OyMarker.png";
import DaisoMarker from "../0_atoms/markers/DaisoMarker.png";
import MartMarker from "../0_atoms/markers/MartMarker.png";
import CVSMarker from "../0_atoms/markers/CVSMarker.png";
import ParkMarker from "../0_atoms/markers/ParkMarker.png";
import KaraokeMarker from "../0_atoms/markers/KaraokeMarker.png";
import RestaurantMarker from "../0_atoms/markers/RestaurantMarker.png";
import {
  checkBus,
  checkSubway,
  checkBike,
  checkOliveyoung,
  checkDaiso,
  checkMart,
  checkCVS,
  checkPark,
  checkKaraoke,
  checkRestaurant,
} from "../0_atoms/check";
import styles from "./KmMapPage.module.css";

const { kakao } = window;

function KmMap() {
  const [getList, setGetList] = useState();
  const [forCoors, setForCoors] = useState();
  const [dbClicked, setDbClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const forKeyEnter = (e) => {
    if (e.key ==='Enter') {
      SearchMap()
    }
  }

  // 지도 초기설정
  const [options, setOptions] = useState({
    center: new kakao.maps.LatLng(37.525078, 126.975702), // 서울중심어딘가
    // center: new kakao.maps.LatLng(37.497486063, 127.027661548),
    level: 7,
    isPanto: true,
    disableDoubleClickZoom: true,
  });
  // 주소검색
  const [searchAddress, SetSearchAddress] = useState();
  const SearchMap = () => {
    const ps = new kakao.maps.services.Places();
    let callback = function (result, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setOptions({
          // center: { lat: newSearch.y, lng: newSearch.x }
          center: new kakao.maps.LatLng(newSearch.y, newSearch.x),
        });
        console.log("중심좌표변경 실행됨");
        console.log(options.center, "sssssCENTER");
      }
      setDbClicked(true);
    };
    // geocoder.addressSearch(`${searchAddress}`, callback);

    ps.keywordSearch(`${searchAddress}`, callback);
  };

  const handleSearchAddress = (e) => {
    SetSearchAddress(e.target.value);
  };

  // ================== MAP ==========================
  const mapscript = () => {
    let container = document.getElementById("kakaoMap");

    console.log("loading kakaomap", options.center);

    //map
    const map = new kakao.maps.Map(container, options);
    kakao.maps.event.addListener(map, "dblclick", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      console.log(options.center.La);

      setOptions({
        center: new kakao.maps.LatLng(latlng.Ma, latlng.La),
        level: 3,
      });
      setDbClicked(true);
    });

    // ---------------- 마커 -------------------

    const markerSize = new kakao.maps.Size(30, 39); // 가로 세로
    const markerPlace = { offset: new kakao.maps.Point(14, 39) };

    if (forCoors && getList.length > 0) {
      // const tmp = forCoors.slice(0,20)
      setLoading(false)
      console.log(getList);
      forCoors.forEach((el) => {
        if (el.type === "버스" && getList.some(checkBus)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              BusMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "지하철" && getList.some(checkSubway)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              SubwayMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "따릉이" && getList.some(checkBike)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              BikeMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "올리브영" && getList.some(checkOliveyoung)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              OyMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "다이소" && getList.some(checkDaiso)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              DaisoMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "마트" && getList.some(checkMart)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              MartMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "편의점" && getList.some(checkCVS)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              CVSMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "공원" && getList.some(checkPark)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              ParkMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "노래방" && getList.some(checkKaraoke)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              KaraokeMarker,
              markerSize,
              markerPlace
            ),
          });
        } else if (el.type === "식당" && getList.some(checkRestaurant)) {
          new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(el.lat, el.lon),
            title: el.name,
            image: new kakao.maps.MarkerImage(
              RestaurantMarker,
              markerSize,
              markerPlace
            ),
          });
        }
      });
    }

      
    // --------------- 원 ------------------
    const circle = new kakao.maps.Circle({
      center: options.center, // 원의 중심좌표
      radius: 500, // 미터 단위의 원의 반지름
      strokeWeight: 2, // 선 두께
      strokeColor: "#7a08ff", // 선 색깔
      strokeOpacity: 0.8, // 선의 불투명도 1에서 0 사이의 값 0에 가까울수록 투명
      strokeStyle: "solid", // 선의 스타일
      fillColor: "#7a08ff", // 채우기 색깔
      fillOpacity: 0.05, // 채우기 불투명도
    });
    // 지도에 원을 표시
    if (dbClicked) {
      circle.setMap(map);
    }
  };

  useEffect(() => {
    mapscript();
    if (forCoors) {
      setLoading(false)
    }
  }, [forCoors, getList]);

  async function getMarker() {
    setLoading(true)
    await axios(`http://j7a601.p.ssafy.io:9090/api/km?lat=${options.center.Ma}&lon=${options.center.La}`, {
      method: "GET",
      headers: {
        // Authorization: jwt,
        "Content-Type": "application/string",
      },
    })
    // await http
    //   .get(`km?lat=${options.center.Ma}&lon=${options.center.La}`)
      .then((res) => {
        setForCoors(res.data.response);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }



  // 첫 더블클릭 이후 맵 옵션 변경될때마다 로딩
  useEffect(() => {
    if (dbClicked) {
      getMarker();
    }
  }, [options]);



  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.choices}>
          <div className={styles.search}>
            <input
              className={styles.searchInput}
              onChange={handleSearchAddress}
              onKeyPress={forKeyEnter}
              placeholder="원하는 지점을 검색해주세요"
            />
            <span className={styles.fieldLabelWrap} aria-hidden="true">
              <span className={styles.fieldLabel}>주소 검색</span>
            </span>
            <button className={styles.searchBtn} onClick={SearchMap}>
              검색
            </button>
          </div>

          <Choices setGetList={setGetList}></Choices>
          <Favorites options={options} />
          
        </div>
        <div className={styles.map}>
          {loading && 
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className={styles.loading}
          >
            <MoonLoader
              color="#7a08ff"
              size={150}
              speedMultiplier={0.5}
            />
          </div>}
          <div className={styles.kakaoMap} id="kakaoMap">
          </div>
          <div className={styles.text}>찾고자 하는 지점을 더블클릭 해주세요</div>
        </div>
      </div>
    </div>
  );
}

export default KmMap;
