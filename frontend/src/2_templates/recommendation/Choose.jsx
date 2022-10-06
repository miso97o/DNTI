import { useEffect, useState } from "react";
import District from "../../1_molecules/recommendation/District";
import Priority from "../../1_molecules/recommendation/Priority";
import {options} from "../../0_atoms/data/RecommendOpts";
import CancleImg from "../../0_atoms/Img/cancelWhite.png";
import styles from "./Choose.module.css";
import "./Choose.css";

function Choices(props) {
  const [selectedList, setSelectedList] = useState([])
  const addSelected = selected => {
    setSelectedList([...selectedList, selected.key])
    console.log(selectedList, '지금까지 선택된것들')
  }

  function renderList() {
    selectedList.map((item, index) => 
    <div key={index}>{item}</div>)
  }

  const deleteSelected = selected => {
    console.log(selected, selectedList)
    const tmpList = selectedList.filter((data) => {
      return data !== selected.key
    })
    setSelectedList(tmpList)
  }

  useEffect(() => {
    localStorage.setItem("selectedStorage", JSON.stringify(selectedList))
    console.log('더해요',selectedList)
  }, [selectedList]);



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
            <div className={number1}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length ? 
                <div>
                  <div className="rDeleteArea">
                    <button className="rDeleteBtn" onClick={() => cancel(0)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {options[selectedList[0]-1].image}
                  </div>
                </div> : 
                <div className={styles.color0} />
                }
              </div>
            </div>
            <div className={number2}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 1 ?<div>
                  <div className="rDeleteArea">
                    <button className="rDeleteBtn" onClick={() => cancel(1)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {options[selectedList[1]-1].image}
                  </div>
                </div> : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={number3}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 2 ?
                <div>
                  <div className="rDeleteArea">
                    <button className="rDeleteBtn" onClick={() => cancel(2)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {options[selectedList[2]-1].image}
                  </div>
                </div> : 
                  <div className={styles.selectedBlank} />
                }
                </div>
            </div>
            <div className={number4}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 3 ?
                <div>
                  <div className="rDeleteArea">
                    <button className="rDeleteBtn" onClick={() => cancel(3)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {options[selectedList[3]-1].image}
                  </div>
                </div> : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={number5}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 4 ?
                <div>
                  <div className="rDeleteArea">
                    <button className="rDeleteBtn" onClick={() => cancel(4)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {options[selectedList[4]-1].image}
                  </div>
                </div> : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={number6}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 5 ?
                <div>
                  <div className="rDeleteArea">
                    <button className="rDeleteBtn" onClick={() => cancel(5)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {options[selectedList[5]-1].image}
                  </div>
                </div> : 
                  <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            
          </div>
          <hr className={styles.selectedUnderline} />
          <div className={styles.options}>
            <Priority addSelectedProp = {addSelected} selectedList = {selectedList} deleteSelectedProp = {deleteSelected}/>
            
          </div>
        </div>

        
        
      </div>
    </div>
  );
}
export default Choices
