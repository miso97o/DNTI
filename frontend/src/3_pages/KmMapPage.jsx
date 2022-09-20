import Choices from "../2_templates/kmMap/Choices";
import Map from "../2_templates/kmMap/Map";
import styles from "./KmMapPage.module.css";

function KmMap() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.choices}>
          <Choices />
        </div>
        <div className={styles.map}>
          <Map />
        </div>
      </div>
    </div>
  );
}
export default KmMap