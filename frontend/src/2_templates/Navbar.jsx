import IconLink from "../1_molecules/IconLink";
import PrimaryNavigation from "../1_molecules/PrimaryNavigation";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
      <IconLink />
      <PrimaryNavigation />
      </div>
      <hr className="navUnderline" />
    </div>
  );
}
export default Navbar
