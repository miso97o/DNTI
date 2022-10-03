import axios from "axios";
import { useEffect, useState } from "react";
import District from "../../1_molecules/recommendation/District";
import Priority from "../../1_molecules/recommendation/Priority";
import {options} from "../../0_atoms/data/RecommendOpts";
import styles from "./Choose.module.css";
import "./Choose.css";

function Choices(props) {
  const [selectedList, setSelectedList] = useState([])
  const addSelected = selected => {
    setSelectedList([...selectedList, selected.key])
    // alert( `${selected.key} added!`)
    console.log(selectedList, '지금까지 선택된것들')

  }
  // console.log(selectedList)

  function renderList() {
    selectedList.map((item, index) => 
    <div key={index}>{item}</div>)
  }



  // useEffect(() => {
  //   localStorage.setItem("selectedStorage", JSON.stringify(selectedList))
  //   console.log('더해요',selectedList)
  // }, [selectedList]);



  console.log(styles.color+`${selectedList[0]}`)

  
  const number1 = "selectedOptArea1 color"+selectedList[0]
  const number2 = "selectedOptArea2 color"+selectedList[1]
  const number3 = "selectedOptArea3 color"+selectedList[2]
  const number4 = "selectedOptArea4 color"+selectedList[3]
  const number5 = "selectedOptArea5 color"+selectedList[4]
  const number6 = "selectedOptArea6 color"+selectedList[5]

  function cancel(idx) {
    console.log('몇번째', idx)
    let tmp = selectedList;
    console.log('지우기 전',tmp)
    tmp.splice(idx,1);
    console.log('지운 후', tmp)
    setSelectedList([...tmp]);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.search}>
          <District />
        </div>

        <div className={styles.favorites}>
          <div className={styles.title}>
            <p>설정된 지표 우선순위</p>
          </div>
          <div className={styles.selectedContainer}>
            <div className={number1} onClick={() => cancel(0)} style={{cursor:"pointer"}}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length ? options[selectedList[0]-1].image : 
                <div className={styles.color0} />
                }
              </div>
            </div>
            <div className={number2} onClick={() => cancel(1)} style={{cursor:"pointer"}}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 1 ? options[selectedList[1]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={number3} onClick={() => cancel(2)} style={{cursor:"pointer"}}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 2 ? options[selectedList[2]-1].image : 
                  <div className={styles.selectedBlank} />
                }
                </div>
            </div>
            <div className={number4} onClick={() => cancel(3)} style={{cursor:"pointer"}}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 3 ? options[selectedList[3]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={number5} onClick={() => cancel(4)} style={{cursor:"pointer"}}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 4 ? options[selectedList[4]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={number6} onClick={() => cancel(5)} style={{cursor:"pointer"}}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 5 ? options[selectedList[5]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            
          </div>
          <hr className={styles.selectedUnderline} />
          <div className={styles.options}>
            <div>우선순위 선택</div>
            <Priority addSelectedProp = {addSelected} selectedList = {selectedList}/>
            
          </div>
        </div>

        
        
      </div>
    </div>
  );
}
export default Choices
