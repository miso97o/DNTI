import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRanks } from "../features/recommend/recommendSlice";
import Choose from "../2_templates/recommendation/Choose";
import Statistics from "../2_templates/recommendation/Statistics";
import Map1 from "../2_templates/recommendation/Map";
import backArrow from "../0_atoms/Img/arrowBlack.png";
import Map2 from "../1_molecules/statistics/Map";
import styles from "./DnRecommendPage.module.css";
import { useLocation } from "react-router-dom";

function DnRecommendPage() {

  const [goStatistics, setGoStatics] = useState(false)
  const location = useLocation();
  const dispatch = useDispatch();
  const [dnti, setDnti] = useState(0 || location.state.dnti);
  // var type = 0 || location.state.dnti
  // console.log(type)

  function Search() {
    setDnti(0);
    if (goStatistics) {
      setGoStatics(false)
      dispatch(setRanks([]));
      localStorage.setItem("guStorage", [])
    } else {setGoStatics(true)}
  }
 
  useEffect(() => {
    if(dnti) {
      setGoStatics(true)
    }
  },[])

  // useEffect(() => {
  //   type = 0;
  // },[goStatistics])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.choose}>
          {goStatistics ? (
            <div className={styles.inChoose}>
              <button className={styles.backBtn} onClick={Search}>
                <img src={backArrow} alt="backArrow" className={styles.backArrow}/>
                BACK
              </button>
              <Statistics dnti={dnti} />
            </div>
          ) : (
          <div className={styles.inChoose}>
            <Choose />
            <div className={styles.btnArea}>
              <button className={styles.searchBtn} onClick={Search}>검색</button>
            </div>
          </div>
          )}
          
        </div>
        <div className={styles.map}>
          {goStatistics ? (
            <Map2 />
          ) : (
            <Map1 />
          )}
        </div>
      </div>
    </div>
  );
}
export default DnRecommendPage
