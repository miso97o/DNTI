import axios from "axios";
import { useEffect, useState } from "react";
import District from "../../1_molecules/recommendation/District";
import Priority from "../../1_molecules/recommendation/Priority";
import {options} from "../../0_atoms/data/RecommendOpts";
import styles from "./Choose.module.css";

function Choices(props) {
  const [selectedList, setSelectedList] = useState([])
  const addSelected = selected => {
    setSelectedList([...selectedList, selected.key])
    alert( `${selected.key} added!`)
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

  const [myRegions, setMyRegions] = useState()

  async function getMyRegion() {
    await axios(`http://j7a601.p.ssafy.io:9090/api/users/list`, {
      method: "GET",
      headers: {
        // Authorization: jwt,
        "Content-Type": "application/string",
      },
    })
      .then(res => {
        setMyRegions(res.data.response);
        console.log(res.data.response, '!!!!!!!!!!즐겨찾기!@');
      })
      .catch(error => {
        console.error("실패:", error);
      });
  }

  useEffect(() => {
    getMyRegion();
  }, []);
  
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
          <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length ? options[selectedList[0]-1].image : 
                <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 1 ? options[selectedList[1]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 2 ? options[selectedList[2]-1].image : 
                  <div className={styles.selectedBlank} />
                }
                </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 3 ? options[selectedList[3]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 4 ? options[selectedList[4]-1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
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
            <Priority addSelectedProp = {addSelected}/>
            
          </div>
        </div>

        
        
      </div>
    </div>
  );
}
export default Choices
