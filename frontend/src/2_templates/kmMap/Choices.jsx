import { useEffect, useState } from "react";
import CancleImg from "../../0_atoms/Img/cancelWhite.png";
import styles from "./Choices.module.css";
import ShowOptions from "../../1_molecules/kmMap/ShowOptions"


function Choices(props) {
  const [selectedList, setSelectedList] = useState([])
  const addSelected = selected => {
    setSelectedList([...selectedList, selected])
  }
  const deleteSelected = selected => {
    const tmpList = selectedList.filter((data) => {
      return data !== selected
    })
    setSelectedList(tmpList)
  }

  function sendSelected() {
    props.setGetList(selectedList)
  }



  useEffect(() => {

    sendSelected()
  }, [selectedList]);

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
                {selectedList.length ?
                <div>
                  <div className={styles.deleteArea}>
                    <button className={styles.deleteBtn} onClick={() => cancel(0)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {selectedList[0].image }
                  </div>
                </div> :
                <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 1 ?
                <div>
                  <div className={styles.deleteArea}>
                    <button className={styles.deleteBtn} onClick={() => cancel(1)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {selectedList[1].image }
                  </div>
                </div> :
                <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 2 ?
                <div>
                  <div className={styles.deleteArea}>
                    <button className={styles.deleteBtn} onClick={() => cancel(2)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {selectedList[2].image }
                  </div>
                </div> :
                <div className={styles.selectedBlank} />
                }
                </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 3 ?
                <div>
                  <div className={styles.deleteArea}>
                    <button className={styles.deleteBtn} onClick={() => cancel(3)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {selectedList[3].image }
                  </div>
                </div> :
                <div className={styles.selectedBlank} />
                }
              </div>
            </div>
            <div className={styles.selectedOptArea}>
              <div className={styles.selectedOptIcon}>
                {selectedList.length > 4 ?
                <div>
                  <div className={styles.deleteArea}>
                    <button className={styles.deleteBtn} onClick={() => cancel(4)}>
                      <img src={CancleImg} alt="CancleImg" className={styles.CancleImg} />
                    </button>
                  </div>
                  <div className={styles.selectedImage}>
                    {selectedList[4].image }
                  </div>
                </div> :
                <div className={styles.selectedBlank} />
                }
              </div>
            </div>
          </div>
          <hr className={styles.selectedUnderline} />
          <div className={styles.options}>
            {/* <ShowOptions selectedList={selectedList} setSelectedList={setSelectedList}/> */}
            <ShowOptions addSelectedProp = {addSelected} deleteSelectedProp = {deleteSelected}/>
          </div>
        </div>
        <div className={styles.favorites}>
          {/* <Favorites /> */}
        </div>
        
      </div>
    </div>
  );
}
export default Choices
