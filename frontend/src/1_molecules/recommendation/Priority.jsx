import styles from "./Priority.module.css";
import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Select from 'react-select'
import {options} from "../../0_atoms/data/RecommendOpts";





localStorage.setItem("priorityStorage", [])



function Priority({addSelectedProp, selectedList, deleteSelectedProp}) {
  const [opt, setOpt] = useState()
  const addSelected =(e)=> {
    addSelectedProp(e)
    setOpt(e)
    // console.log(opt)
  }
  const deleteSelected =(e) => {
    deleteSelectedProp(e)
  }
  const [num, setNum] = useState(0)
  function changeChecked(e) {
    console.log(selectedList)
    if (e.checked) {
      setNum(num - 1)
      e.checked = false
      deleteSelected(e)
    } else {
      e.checked = true
      if(num < 6) {
        setNum(num + 1)
        addSelected(e)
      } else {
      }
    }
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
