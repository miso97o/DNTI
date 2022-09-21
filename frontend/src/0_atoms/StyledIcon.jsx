import React from "react"
import styles from "./StyledIcon.module.css";

export default function StyledIcon() {
  return (
    <div className={styles.click}>
      <div className={styles.container}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m3va4v13wz-I22%3A104%3B28%3A144?alt=media&token=dcf6ef75-51e0-47ce-8479-375341b11cec"
          alt="Not Found"
          className={styles.logoImg}
        />
        <p className={styles.title}>동네TI</p>
      </div>
    </div>
  );
}
