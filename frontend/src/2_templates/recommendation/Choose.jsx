import District from "../../1_molecules/recommendation/District";
import Priority from "../../1_molecules/recommendation/Priority";
import styles from "./Choose.module.css";

function Choices() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.search}>
          <District />
        </div>

        <div className={styles.favorites}>
          <Priority />
        </div>

        
        
      </div>
    </div>
  );
}
export default Choices
