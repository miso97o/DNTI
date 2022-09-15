import styles from "./PrimaryNavigation.module.css";
import { Link } from "react-router-dom";

function PrimaryNavigation() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to={`dnti`}>
            <p>동네TI</p>
          </Link>
        </div>
        <div className={styles.content}>
          <Link to={`dnrecommend`}>
            <p>동네추천</p>
          </Link>
        </div>
        <div className={styles.content}>
          <Link to={`kmMap`}>
            <p>1KM</p>          
          </Link>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m3va4v13wz-I22%3A104%3B22%3A44?alt=media&token=1f92b154-97c5-41c3-829c-1cdd04119c37"
          alt="Not Found"
          className={styles.image}
        />
      </div>
    </div>
  );
}

export default PrimaryNavigation;
