import styles from "./Priority.module.css";
import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Select from 'react-select'
import BusLogo from "../../0_atoms/Icon/BusLogo.png";
import SubwayLogo from "../../0_atoms/Icon/SubwayLogo.png";
import BikeLogo from "../../0_atoms/Icon/BikeLogo.png";
import OYLogo from "../../0_atoms/Icon/OYLogo.png";
import DaisoLogo from "../../0_atoms/Icon/DaisoLogo.png";
import MartLogo from "../../0_atoms/Icon/MartLogo.png";
import CVSLogo from "../../0_atoms/Icon/CVSLogo.png";
import ParkLogo from "../../0_atoms/Icon/ParkLogo.png";
import GymLogo from "../../0_atoms/Icon/GymLogo.png";




const options = [
  {
    value: "rent",
    label: 
    // <div>
    //   <img src={BusLogo} alt="BusLogo" className={styles.BusLogo}/>
    //   <p className={styles.labelTxt}>버스정류장</p>
    // </div>
    <p className={styles.labelTxt}>전월세</p>,
    image:
    <img src={BusLogo} alt="BusLogo" className={styles.BusLogo}/>,
    key: "1",
    checked : false

  },
  {
    value: "restaurant",
    label: 
    <p className={styles.labelTxt}>식생활</p>,
    image:
    <img src={SubwayLogo} alt="SubwayLogo" className={styles.SubwayLogo}/>,
    key: "2",
    checked : false
  },
  {
    value: "safety",
    label: 
    <p className={styles.labelTxt}>안전</p>,
    image:
    <img src={BikeLogo} alt="BikeLogo" className={styles.BikeLogo}/>,
    key: "3",
    checked : false
  },
  {
    value: "environment",
    label: 
    <p className={styles.labelTxt}>환경</p>,
    image:
    <img src={OYLogo} alt="OYLogo" className={styles.OYLogo}/>,
    key: "4",
    checked : false
  },
  {
    value: "traffic",
    label: 
    <p className={styles.labelTxt}>교통</p>,
    image:
    <img src={DaisoLogo} alt="DaisoLogo" className={styles.DaisoLogo}/>,
    key: "5",
    checked : false
  },
  {
    value: "culture",
    label: 
    <p className={styles.labelTxt}>문화</p>,
    image:
    <img src={MartLogo} alt="MartLogo" className={styles.MartLogo}/>,
    key: "6",
    checked : false
  },
  
];
function Priority({addSelectedProp}) {
  const [opt, setOpt] = useState()
  const addSelected =(e)=> {
    addSelectedProp(e)
    setOpt(e)
    // console.log(opt)
  }

  const [num, setNum] = useState(0)

  function changeChecked(e) {
    if (e.checked) {
      e.checked = false
      console.log('실행안됨')
    } else {
      e.checked = true
      if(num < 6) {
        setNum(num + 1)
        addSelected(e)
        console.log(`${e.value}, ${num}, 실행됨`)
      }
    }
  }
  

  return (
    <div className={styles.page}>
      <div className={styles.dropdownHeader}>
        {/* {selected.image} */}
      </div>
      <div className={styles.dropdownOpts}>
        {options.map((option) => (
          <li key={option.value} 
            onClick={(e) => {
              // addSelected(option)
              changeChecked(option)
            }}
            className={styles.eachOpt}>
            {option.image}{option.label}
          </li>
			  ))}
      </div>
    </div>
  );
}
export default Priority
