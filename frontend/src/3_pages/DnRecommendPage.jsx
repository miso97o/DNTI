import { useState } from "react";
import axios from "axios";

import Choose from "../2_templates/recommendation/Choose";
import Statistics from "../2_templates/recommendation/Statistics";
import Map from "../2_templates/recommendation/Map";
import styles from "./DnRecommendPage.module.css";

function DnRecommendPage() {

  const [goStatistics, setGoStatics] = useState(false)
  function Search() {
    if (goStatistics) {
      setGoStatics(false)
    } else {setGoStatics(true)}
  }



  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.choose}>
          {goStatistics ? (
            <div className={styles.inChoose}>
              <button className={styles.backBtn} onClick={Search}>←</button>
              <Statistics />
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
          <Map />
        </div>
      </div>
    </div>
  );
}
export default DnRecommendPage