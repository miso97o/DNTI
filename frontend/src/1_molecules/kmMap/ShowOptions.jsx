import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Select from 'react-select'
import styles from "./ShowOptions.module.css";
import BusLogo from "../../0_atoms/Icon/BusLogo.png";
import SubwayLogo from "../../0_atoms/Icon/SubwayLogo.png";
import BikeLogo from "../../0_atoms/Icon/BikeLogo.png";
import OYLogo from "../../0_atoms/Icon/OYLogo.png";
import DaisoLogo from "../../0_atoms/Icon/DaisoLogo.png";
import MartLogo from "../../0_atoms/Icon/MartLogo.png";
import CVSLogo from "../../0_atoms/Icon/CVSLogo.png";
import ParkLogo from "../../0_atoms/Icon/ParkLogo.png";
import KaraokeLogo from "../../0_atoms/Icon/KaraokeLogo.png";
import RestaurantLogo from "../../0_atoms/Icon/RestaurantLogo.png";




const options = [
  {
    value: "bus",
    label: 
    // <div>
    //   <img src={BusLogo} alt="BusLogo" className={styles.BusLogo}/>
    //   <p className={styles.labelTxt}>버스정류장</p>
    // </div>
    <p className={styles.labelTxt}>버스정류장</p>,
    image:
    <img src={BusLogo} alt="BusLogo" className={styles.BusLogo}/>,
    key: "bus",
    checked : false
  },
  {
    value: "subway",
    label: 
    <p className={styles.labelTxt}>지하철역</p>,
    image:
    <img src={SubwayLogo} alt="SubwayLogo" className={styles.SubwayLogo}/>,
    key: "subway",
    checked : false
  },
  {
    value: "bike",
    label: 
    <p className={styles.labelTxt}>따릉이</p>,
    image:
    <img src={BikeLogo} alt="BikeLogo" className={styles.BikeLogo}/>,
    key: "bike",
    checked : false
  },
  {
    value: "oliveyoung",
    label: 
    <p className={styles.labelTxt}>올리브영</p>,
    image:
    <img src={OYLogo} alt="OYLogo" className={styles.OYLogo}/>,
    key: "oliveyoung",
    checked : false
  },
  {
    value: "daiso",
    label: 
    <p className={styles.labelTxt}>다이소</p>,
    image:
    <img src={DaisoLogo} alt="DaisoLogo" className={styles.DaisoLogo}/>,
    key: "daiso",
    checked : false
  },
  {
    value: "mart",
    label: 
    <p className={styles.labelTxt}>대형마트</p>,
    image:
    <img src={MartLogo} alt="MartLogo" className={styles.MartLogo}/>,
    key: "mart",
    checked : false
  },
  {
    value: "cvs",
    label: 
    <p className={styles.labelTxt}>편의점</p>,
    image:
    <img src={CVSLogo} alt="CVSLogo" className={styles.CVSLogo}/>,
    key: "cvs",
    checked : false
  },
  {
    value: "park",
    label: 
    <p className={styles.labelTxt}>공원</p>,
    image:
    <img src={ParkLogo} alt="ParkLogo" className={styles.ParkLogo}/>,
    key: "park",
    checked : false
  },
  {
    value: "karaoke",
    label: 
    <p className={styles.labelTxt}>노래방</p>,
    image:
    <img src={KaraokeLogo} alt="KaraokeLogo" className={styles.KaraokeLogo}/>,
    key: "karaoke",
    checked : false
  },
  {
    value: "restaurant",
    label: 
    <p className={styles.labelTxt}>식당</p>,
    image:
    <img src={RestaurantLogo} alt="RestaurantLogo" className={styles.RestaurantLogo}/>,
    key: "restaurant",
    checked : false
  },
];



function ShowOptions({addSelectedProp, deleteSelectedProp}) {
  const addSelected =(e)=> {
    addSelectedProp(e)
  }
  const deleteSelected =(e) => {
    deleteSelectedProp(e)
  }

  const [num, setNum] = useState(0)

  function changeChecked(e) {
    if (e.checked) {
      setNum(num - 1)
      e.checked = false
      deleteSelected(e)
    } else {
      e.checked = true
      if(num < 5) {
        setNum(num + 1)
        addSelected(e)
      }
    }
  }
  
  
  

  return (
    <div>
      <div className={styles.dropdownOpts}>
        {options.map((option) => (
          <li key={option.value} 
            onClick={(e) => {
              changeChecked(option)
            }}
            className={styles.eachOpt}>
            {option.image}{option.label}
          </li>
			  ))}
      </div>
    </div>
  )
}

export default ShowOptions;
