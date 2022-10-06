import IconLink from "../1_molecules/IconLink";
import PrimaryNavigation from "../1_molecules/PrimaryNavigation";
import styles from "./Navbar.module.css";
import React, { useEffect, useState, setState } from "react";

function Navbar() {
  const [makeBlack, setmakeBlack] = useState(false)
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <IconLink makeBlack={makeBlack} setmakeBlack={setmakeBlack}/>
        <PrimaryNavigation makeBlack={makeBlack} setmakeBlack={setmakeBlack} />
      </div>
      <hr className="navUnderline" />
    </div>
  );
}
export default Navbar;
