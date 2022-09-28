import axios from "axios";
import { useState, useEffect } from "react";
import Ranking from "../../1_molecules/statistics/Ranking";
import Details from "../../1_molecules/statistics/Details";
import RankImg from "../../0_atoms/Img/Rank.png";
import styles from "./Statistics.module.css";

function Statistics() {
  const [check, setCheck] = useState(false);
  const [rank, setRank] = useState()
  const temp = localStorage.getItem("priorityStorage")

  const priorites = temp.substr(0, temp.length-1)
  console.log(priorites)
  let gus = localStorage.getItem("guStorage")
  if (gus && gus.length > 0) {
    gus = "&gu="+ gus
  }



  async function getRank() {
    await axios(`http://j7a601.p.ssafy.io:9090/api/dong/rank?priorities=${priorites}${gus}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function(res) {
        setRank(res.data.response);
        console.log("data", rank, res.data);

      })
      .catch(error => {
        console.error("실패:", error);
      });
  }
  // function changeCheck() {
  //   if(rank) {
  //     setCheck(true);
  //   }
  // }
  
  useEffect(() => {
    if (rank) {
      setCheck(true);
      console.log("changeCheck")      
      
    }
  })


  useEffect(() => {
    getRank();
  }, []);
  console.log(rank)

  return (
    <div>
    {check ? (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.rankingContainer}>
        <div className={styles.title}>동네랭킹</div>
        
        <div className={styles.ranking}>
          <img src={RankImg} alt="RankImg" className={styles.RankImg}/>
          {rank[0].dongName}
        </div>
        <div className={styles.ranking}>
          {rank.length > 1 ?  rank[1].dongName: 
            <div />
          }
        </div>
        <div className={styles.ranking}>
          {rank.length > 2 ?  rank[2].dongName: 
            <div />
          }
        </div>
        <div className={styles.ranking}>
          {rank.length > 3 ?  rank[3].dongName: 
            <div />
          }
        </div>
        <div className={styles.ranking}>
          {rank.length > 4 ?  rank[4].dongName: 
            <div />
          }
          
        </div>
        </div>
        <div className={styles.favorites}>
          <Details />
        </div>
        <div className={styles.review}>
          <div className={styles.title}>{rank[0].dongName} 리뷰</div>
          <button className={styles.moreBtn}>더보기</button>
        </div>
        <div className={styles.board}>
          <div className={styles.title}>{rank[0].dongName} 게시글</div>
          <button className={styles.moreBtn}>더보기</button>
        </div>
        
        
      </div>
    </div> 
    ) : (
      <div>loading</div>
    )
    }
    </div>
  );
}
export default Statistics
