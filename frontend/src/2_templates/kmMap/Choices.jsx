import Search from "../../1_molecules/kmMap/Search";
import Show from "../../1_molecules/kmMap/Show";
import Favorites from "../../1_molecules/kmMap/Favorites";
import styles from "./Choices.module.css";

function Choices() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* <p>ChoiceBoxArea</p> */}
        {/* <div className={styles.search}>
          <Search />
        </div> */}
        <div className={styles.show}>
          <Show />
        </div>
        <div className={styles.favorites}>
          <Favorites />
        </div>
        
      </div>
    </div>
  );
}
export default Choices
