import styles from "./Priority.module.css";
import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Select from 'react-select'
import {options} from "../../0_atoms/data/RecommendOpts";





localStorage.setItem("priorityStorage", [])



function Priority({addSelectedProp, selectedList}) {
  const [opt, setOpt] = useState()
  const addSelected =(e)=> {
    addSelectedProp(e)
    setOpt(e)
    // console.log(opt)
  }
  const [num, setNum] = useState(0)
  function changeChecked(e) {
    console.log(selectedList)
    for(let el of selectedList) {
      if(e.key === el) {
        e.checked = true;
        alert("이미 추가됨")
        return;
      }
    }
    addSelected(e)
    // if (e.checked) {
    //   e.checked = false
    //   console.log('실행안됨')
    // } else {
    //   e.checked = true
    //   if(num < 6) {
    //     setNum(num + 1)
    //     addSelected(e)
    //     console.log(`${e.value}, ${num}, 실행됨`)
    //     const tmp = (localStorage.getItem("priorityStorage") + (e.key + ","))
    //     localStorage.setItem("priorityStorage", (tmp))
    //     // console.log(localStorage.getItem("priorityStorage").length)
    //   }
    // }
  }
  

  return (
    <div className={styles.page}>
      <div className={styles.dropdownHeader}>
        {/* {selected.image} */}
      </div>
      <div className={styles.dropdownOpts} style={{cursor:"pointer"}}>
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
