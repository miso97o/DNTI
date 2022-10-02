import React from "react";
import styles from "./StyledIcon.module.css";

export default function StyledIcon() {
  return (
    <div className={styles.click}>
      <div className={styles.container}>
        <img
          src={`${process.env.PUBLIC_URL}/img/logo.png`}
          alt="Not Found"
          className={styles.logoImg}
        />
      </div>
    </div>
  );
}
