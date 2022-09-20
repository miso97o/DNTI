import Ranking from "../../1_molecules/statistics/Ranking";
import Details from "../../1_molecules/statistics/Details";
import styles from "./Statistics.module.css";

function Statistics() {
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
