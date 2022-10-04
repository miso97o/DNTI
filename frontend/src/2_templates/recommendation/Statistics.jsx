import axios from "axios";
import http from "../../utils/axios";
import { useState, useEffect } from "react";
import Chart from "../../1_molecules/statistics/Chart";
import GoReview from "../../1_molecules/statistics/GoReview";
import RankImg from "../../0_atoms/Img/Rank.png";
import styles from "./Statistics.module.css";
import { useDispatch } from "react-redux";
import { setRanks } from "../../features/recommend/recommendSlice";
import "./Statistics.css";

function Statistics() {
  const [check, setCheck] = useState(false);
  const [rank, setRank] = useState();
  const dispatch = useDispatch();
  const temp = localStorage.getItem("selectedStorage");
  // let filtered = temp.filter((element) => element ==="1" || element === "2" || element === "3" || element === "4" || element === "5" || element === "6");
  const priorities = temp.substring(1, temp.length-1)
  // const priorities = temp
  const arr = priorities.split(',')
  const arr2 = arr.map(x => x.charAt(1))
  
  console.log("==========================",priorities, arr, arr2)
 
  let gus = localStorage.getItem("guStorage");
  if (gus && gus.length > 0) {
    gus = "&gu=" + gus;
  }

  async function getRank() {
    await axios(
      `http://j7a601.p.ssafy.io:9090/api/dong/rank?priorities=${arr2}${gus}`,
      {
        method: "GET",
      }
    )
    // await http
    //   .get(`/dong/rank?priorities=${priorites}${gus}`)
      .then(function (res) {
        setRank(res.data.response);
        // console.log("data", res.data.response);
        dispatch(setRanks(res.data.response));
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }


  let [selectedClass, setSelectedClass] = useState([
    "ranking yesss",
    "ranking nooooo",
    "ranking nooooo",
    "ranking nooooo",
    "ranking nooooo",
  ]);

  useEffect(() => {
    if (rank) {
      localStorage.setItem("dongResult", []);
      for (let i = 0; i < rank.length; i++) {
        const tmp = localStorage.getItem("dongResult");
        localStorage.setItem("dongResult", tmp + rank[i].dongName);
      }
      setCheck(true);
      setSelected(rank[0].dongName);
    }
  }, [rank]);

  useEffect(() => {
    getRank();
  }, []);
  const [selected, setSelected] = useState();

  const [num, setNum] = useState(0);
  function handleSelect(e, i) {
    setSelected(e);
    setNum(i);
    let tmp = [];
    for (let n = 0; n < rank.length; n++) {
      if (n === i) {
        tmp[n] = "ranking yesss";
      } else {
        tmp[n] = "ranking nooooo";
      }
    }
    setSelectedClass(tmp);
    // console.log(selectedClass)
  }

  return (
    <div>
      {check ? (
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.rankingContainer}>
              <div className={styles.title}>동네랭킹</div>

              <div
                className={selectedClass[0]}
                onClick={(e) => handleSelect(e.target.textContent, 0)}
              >
                <img src={RankImg} alt="RankImg" className={styles.RankImg} />
                {rank[0].dongName}
              </div>
              <div
                className={selectedClass[1]}
                onClick={(e) => handleSelect(e.target.textContent, 1)}
              >
                <div></div>
                {rank.length > 1 ? rank[1].dongName : <div />}
              </div>
              <div
                className={selectedClass[2]}
                onClick={(e) => handleSelect(e.target.textContent, 2)}
              >
                <div></div>
                {rank.length > 2 ? rank[2].dongName : <div />}
              </div>
              <div
                className={selectedClass[3]}
                onClick={(e) => handleSelect(e.target.textContent, 3)}
              >
                <div></div>
                {rank.length > 3 ? rank[3].dongName : <div />}
              </div>
              <div
                className={selectedClass[4]}
                onClick={(e) => handleSelect(e.target.textContent, 4)}
              >
                <div></div>
                {rank.length > 4 ? rank[4].dongName : <div />}
              </div>
            </div>
            <div className={styles.favorites}>
              <Chart rank={rank} num={num} />
            </div>
            <div className={styles.review}>
              <GoReview dong={rank[num].dongName} />
            </div>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
export default Statistics;
