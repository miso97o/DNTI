import { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

function Chart({rank,num}) {
  let bgColor = []

  for (let i = 0; i < rank.length; i ++){
    if (i === num) {
      bgColor[i]="rgba(0, 0, 200, 0.7)"
    } else {
      bgColor[i]="rgba(155, 155, 155, 0.6)"
    }
  }


  const [userData, setUserData] = useState({
    labels: rank.map((data) => data.dongName),
    datasets: [{
      label: "동별 점수",
      data: rank.map((data) => data.totalScore),
      backgroundColor: bgColor,
      duration: 0.5
    }]
  })
  
  useEffect(() => {
    setUserData({
      labels: rank.map((data) => data.dongName),
      datasets: [{
        label: "동별 점수",
        data: rank.map((data) => data.totalScore),
        backgroundColor: bgColor,
        duration: 0.1

      }]
    });
  }, [num]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Bar data={userData} />
      </div>
    </div>
  );
}
export default Chart
