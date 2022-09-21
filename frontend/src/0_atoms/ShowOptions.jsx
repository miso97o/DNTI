import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Select from 'react-select'
import styles from "./ShowOptions.module.css";
import BusLogo from "./Icon/BusLogo.png";
import SubwayLogo from "./Icon/SubwayLogo.png";
import BikeLogo from "./Icon/BikeLogo.png";
import OYLogo from "./Icon/OYLogo.png";
import DaisoLogo from "./Icon/DaisoLogo.png";
import MartLogo from "./Icon/MartLogo.png";
import CVSLogo from "./Icon/CVSLogo.png";
import ParkLogo from "./Icon/ParkLogo.png";
import GymLogo from "./Icon/GymLogo.png";




const options = [
  {
    value: "bus_station",
    label: 
    // <div>
    //   <img src={BusLogo} alt="BusLogo" className={styles.BusLogo}/>
    //   <p className={styles.labelTxt}>버스정류장</p>
    // </div>
    <p className={styles.labelTxt}>버스정류장</p>,
    image:
    <img src={BusLogo} alt="BusLogo" className={styles.BusLogo}/>,
    key: "bus_station"
    // checked: true,
  },
  {
    value: "subway",
    label: 
    <p className={styles.labelTxt}>지하철역</p>,
    image:
    <img src={SubwayLogo} alt="SubwayLogo" className={styles.SubwayLogo}/>,
    key: "subway"
  },
  {
    value: "bike",
    label: 
    <p className={styles.labelTxt}>따릉이</p>,
    image:
    <img src={BikeLogo} alt="BikeLogo" className={styles.BikeLogo}/>,
    key: "bike"
  },
  {
    value: "oliveyoung",
    label: 
    <p className={styles.labelTxt}>올리브영</p>,
    image:
    <img src={OYLogo} alt="OYLogo" className={styles.OYLogo}/>,
    key: "oliveyoung"
  },
  {
    value: "daiso",
    label: 
    <p className={styles.labelTxt}>다이소</p>,
    image:
    <img src={DaisoLogo} alt="DaisoLogo" className={styles.DaisoLogo}/>,
    key: "daiso"
  },
  {
    value: "mart",
    label: 
    <p className={styles.labelTxt}>마트</p>,
    image:
    <img src={MartLogo} alt="MartLogo" className={styles.MartLogo}/>,
    key: "mart"
  },
  {
    value: "cvs",
    label: 
    <p className={styles.labelTxt}>편의점</p>,
    image:
    <img src={CVSLogo} alt="CVSLogo" className={styles.CVSLogo}/>,
    key: "cvs"
  },
  {
    value: "park",
    label: 
    <p className={styles.labelTxt}>공원</p>,
    image:
    <img src={ParkLogo} alt="ParkLogo" className={styles.ParkLogo}/>,
    key: "park"
  },
  {
    value: "gym",
    label: 
    <p className={styles.labelTxt}>체육시설</p>,
    image:
    <img src={GymLogo} alt="GymLogo" className={styles.GymLogo}/>,
    key: "gym"
  },
];

// const options = ['bus', 'train', 'daiso']

// const Opts = (props) => {
//   return (
// 		<select>
// 			{props.options.map((option) => (
// 				<option
// 					key={option.value}
// 					value={option.value}
// 				>
// 					{option.label}
// 				</option>
// 			))}
// 		</select>
//   );
// }

function ShowOptions({selected, setSelected}) {

  const [chosen, setChosen] = useState(false)
  function choose(option) {
    if (chosen) {
      setChosen(false)
      console.log({option},'선택취소')
    } else {setChosen(true)
      console.log({option},'선택')
  }
  addSelect(option)
  }
  const addSelect = (option) => {
    setSelected([...selected, option.label])
  }

  // const select
	// return <Select options={options}></Select>;
  return (
    <div>
      <div className={styles.dropdownHeader}>
        {/* {selected.image} */}
      </div>
      <div className={styles.dropdownOpts}>
        {options.map((option) => (
          <li key={option.value} 
            onClick={(e) => {
              setSelected(option)
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
