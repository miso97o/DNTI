import { useState } from "react";
import ShowOptions from "./ShowOptions"
// import { Selected} from "../../0_atoms/selected"
import styles from "./Show.module.css";

function Show() {
  const [selected, setSelected] = useState([])
  const [text, setText] = useState('')
  return (
    <div className={styles.page}>
      <div className={styles.container}>
      {/* <div className="flex flex-col gap-x-4"> */}
        <div className={styles.title}>
          <p>지도에 표시할 항목</p>
        </div>
        <div className={styles.selectedContainer}>
        {/* <div className="flex flex-row pb-2.5 justify-between"> */}
          <div className={styles.selectedOptArea}>
          {/* <div className="flex items-end w-15 h-17"> */}
            <div className={styles.selectedOptIcon}>
            {/* <div className="w-15 h-15 object-cover"> */}
              {selected.image}
            </div>
          </div>
          <div className={styles.selectedOptArea}>
            <div className={styles.selectedOptIcon}>
              <div className={styles.selectedBlank} />
            </div>
          </div>
          <div className={styles.selectedOptArea}>
            <div className={styles.selectedOptIcon}>
              <div className={styles.selectedBlank} />
            </div>
          </div>
          <div className={styles.selectedOptArea}>
            <div className={styles.selectedOptIcon}>
              <div className={styles.selectedBlank} />
            </div>
          </div>
          <div className={styles.selectedOptArea}>
            <div className={styles.selectedOptIcon}>
              <div className={styles.selectedBlank} />
            </div>
          </div>
          
        </div>
        <hr className={styles.selectedUnderline} />
        <div className={styles.options}>
          
          <ShowOptions selected={selected} setSelected={setSelected}/>
          
        </div>
      </div>
    </div>
  );
}
export default Show
