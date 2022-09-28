import { useEffect, useState } from "react";
import Favorites from "../../1_molecules/kmMap/Favorites";
import styles from "./Choices.module.css";
import ShowOptions from "../../1_molecules/kmMap/ShowOptions"
import axios from "axios";


function Choices(props) {
  const [selectedList, setSelectedList] = useState([])
  const addSelected = selected => {
    setSelectedList([...selectedList, selected])
    alert( `${selected.value} added!`)
    console.log(selectedList, '지금까지 선택된것들')
    // sendSelected()
  }
  // console.log(selectedList)

  function sendSelected() {
    props.setGetList(selectedList)
  }



  useEffect(() => {
    localStorage.setItem("selectedStorage", JSON.stringify(selectedList))
    console.log('더해요',selectedList)
    sendSelected()
  }, [selectedList]);


  

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <div className={styles.search}>
          <Search />
        </div> */}
        <div className={styles.show}>
          {/* <Show /> */}
          <div className={styles.title}>
            <p>지도에 표시할 항목</p>
          </div>
          <div className={styles.selectedContainer}>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length ? selectedList[0].image : 
                <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 1 ? selectedList[1].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 2 ? selectedList[2].image : 
                  <div className={styles.selectedBlank} />
                }
                </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 3 ? selectedList[3].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 4 ? selectedList[4].image : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
          </div>
          <hr className={styles.selectedUnderline} />
          <div className={styles.options}>
            {/* <ShowOptions selectedList={selectedList} setSelectedList={setSelectedList}/> */}
            <ShowOptions addSelectedProp = {addSelected}/>
          </div>
        </div>
        <div className={styles.favorites}>
          <Favorites />
        </div>
        
      </div>
    </div>
  );
}
export default Choices
