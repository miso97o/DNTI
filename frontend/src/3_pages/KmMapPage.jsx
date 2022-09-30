import React, { useEffect, useState, setState } from "react";
import axios from "axios";
import Choices from "../2_templates/kmMap/Choices";
import { coffeePositions, bikePositions, cvsPositions } from "../0_atoms/data/MarkerData";
import BusMarker from "../0_atoms/markers/BusMarker.png";
import BikeMarker from "../0_atoms/markers/BikeMarker.png";
import CVSMarker from "../0_atoms/markers/CVSMarker.png";
import styles from "./KmMapPage.module.css";


const { kakao } = window;

function KmMap() {
    // const getChange = [0, 0, 0]
    const [getList, setGetList] = useState()
    const [forCoors, setForCoors] = useState()

    console.log(getList, "==============================")
    // useEffect(() => {
    //   JSON.parse(localStorage.getItem("selectedStorage"))
    //   const tmpList = JSON.parse(localStorage.getItem("selectedStorage"))
    //   console.log('!!!!!!!!!!!!!!다시랜더되나??', tmpList)

    //   if(tmpList.length > 0) {
    //     for(let i = 0; i < tmpList.length; i++) {
    //       if (tmpList[i].value === "bike") {
    //         getChange[0] = 1
    //       }
    //     console.log("here========================", tmpList[i].value)
          
    //     }
    //   }
    // }, [getList]);
 


    // 지도 초기설정
    const [options, setOptions] = useState({
      // center: new kakao.maps.LatLng(37.525078, 126.975702), // 서울중심어딘가
      center: new kakao.maps.LatLng(37.497486063, 127.027661548),
      level: 3,
      isPanto: true,
      disableDoubleClickZoom: true
    });
    // 주소검색
    const [searchAddress, SetSearchAddress] = useState();
    const SearchMap = () => {
      const geocoder = new kakao.maps.services.Geocoder();
      const ps = new kakao.maps.services.Places()
      let callback = function(result, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          const newSearch = result[0]
          setOptions({
            // center: { lat: newSearch.y, lng: newSearch.x }
            center: new kakao.maps.LatLng(newSearch.y, newSearch.x) 
          })
          console.log('중심좌표변경 실행됨')
          console.log(options.center,'sssssCENTER')
        }
      };
        // geocoder.addressSearch(`${searchAddress}`, callback);
        
        ps.keywordSearch(`${searchAddress}`, callback); 
      }
    
    const handleSearchAddress = (e) => {
      SetSearchAddress(e.target.value)
    }
    
    // ================== MAP ==========================
    const mapscript = () => {
      let container = document.getElementById("kakaoMap");

      console.log("loading kakaomap", options.center)
  
      //map
      const map = new kakao.maps.Map(container, options);
      kakao.maps.event.addListener(map, 'dblclick', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        console.log(options.center.La)

        setOptions({
          center: new kakao.maps.LatLng(latlng.Ma, latlng.La)
        })
        console.log(options.center.La)
        getMarker()
        // alert('double click! ' + latlng.toString().substr(1, latlng.toString().length-2));
      });
  
      // ---------------- 마커 -------------------
  
      const markerSize = new kakao.maps.Size(30 , 39)  // 가로 세로
      const markerPlace = {offset: new kakao.maps.Point(14, 39)}

      function makeCoffeeMarker() {
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
      }




      bikePositions.forEach((el) => {
        // 마커를 생성합니다
        new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: map,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el.lat, el.lng),
          // position: new kakao.maps.Latlng(), // 마커를 표시할 위치
          //마커에 hover시 나타날 title
          title: el.title,
          image: new kakao.maps.MarkerImage(BikeMarker, markerSize, markerPlace)
        });
      });

  
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
      // 지도에 원을 표시
      circle.setMap(map);
    };


    async function getMarker() {
      await axios(`http://j7a601.p.ssafy.io:9090/api/km?lat=${options.center.Ma}&lon=${options.center.La}`, {
        method: "GET",
        headers: {
          // Authorization: jwt,
          "Content-Type": "application/string",
        },
      })
        .then(res => {
          setForCoors(res.data.response);
          console.log(res.data.response, '!!!!!!!!!!즐겨찾기!@', options.center.La);
        })
        .catch(error => {
          console.error("실패:", error);
        });
    }

    // 맵 옵션 변경될때마다 로딩
    useEffect(() => {
      mapscript()
    }, [options]);

    
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.choices}>
          <div className={styles.search}>
            <input className={styles.searchInput} onChange={handleSearchAddress} placeholder='원하는 지점을 검색해주세요' />
            <span className={styles.field__labelwrap} aria-hidden="true">
              <span className={styles.field__label}>주소 검색</span>
            </span>
            <button className={styles.searchBtn} onClick={SearchMap}>검색</button>            
          </div>

          <Choices setGetList={setGetList}>

          </Choices>

        </div>
        <div className={styles.map}>
          <div className={styles.kakaoMap} id="kakaoMap"></div>
        </div>
      </div>
    </div>
  );
}

export default KmMap;
