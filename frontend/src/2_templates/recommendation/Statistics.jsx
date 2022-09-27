import axios from "axios";
import { useState, useEffect } from "react";
import Ranking from "../../1_molecules/statistics/Ranking";
import Details from "../../1_molecules/statistics/Details";
import styles from "./Statistics.module.css";

function Statistics() {

  const [rank, setRank] = useState()
  async function getRank() {
    await axios(`http://j7a601.p.ssafy.io:9090/api/dong/rank?priorities=2,5,3&gu=마포구`, {
      method: "GET",
      headers: {
        // Authorization: jwt,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        setRank(res.data);
        console.log("data", res.data);
      })
      .catch(error => {
        console.error("실패:", error);
      });
  }

  useEffect(() => {
    getRank();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.search}>
          <Ranking />
        </div>

        <div className={styles.favorites}>
          <Details />
        </div>
        <div className={styles.review}>
          리뷰
          <button className={styles.moreBtn}>더보기</button>
        </div>
        <div className={styles.board}>
          게시글
          <button className={styles.moreBtn}>더보기</button>
        </div>
        
        
      </div>
    </div>
  );
}
export default Statistics
