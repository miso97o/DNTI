import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';
import styles from "./GoReview.module.css";


function GoReview({dong}) {
  const [reviews, setReviews] = useState()
  const [rCheck, setRCheck] = useState(false)
  const [boards, setBoards] = useState()
  const [bCheck, setBCheck] = useState(false)


  async function getReview() {
    await axios(`http://j7a601.p.ssafy.io:9090/api/review/hot?dong=${dong}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function(res) {
        setReviews(res.data.response);
        console.log("data", reviews);
        
      })
      .catch(error => {
        console.error("실패:", error);
      });
  }
  
  async function getBoard() {
    await axios(`http://j7a601.p.ssafy.io:9090/api/board/hot?dong=${dong}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function(res) {
        setBoards(res.data.response);        
      })
      .catch(error => {
        console.error("실패:", error);
      });
  }

  useEffect(() => {
    getReview()
    getBoard()
  }, [dong]);

  useEffect(() => {
    if (reviews) { 
      setRCheck(true);
    }
  }, [reviews]);

  useEffect(() => {
    if (boards) { 
      setBCheck(true);
    }
  }, [boards]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.review}>
          <div className={styles.titleArea}>
            <div className={styles.title}>{dong} 리뷰</div>
            <Link to={`../board/post`}>
              <button className={styles.moreBtn}>MORE</button>            
            </Link>
          </div>
          {rCheck? (
          <div className={styles.contentArea}>
            {reviews[0] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{reviews[0].title}</div>
                <Rating name="half-rating-read" defaultValue={reviews[0].score} precision={0.5} readOnly />
              </div>
            )}
            {reviews[1] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{reviews[1].title}</div>
                <Rating name="half-rating-read" defaultValue={reviews[1].score} precision={0.5} readOnly />
              </div>
            )}
            {reviews[2] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{reviews[2].title}</div>
                <Rating name="half-rating-read" defaultValue={reviews[2].score} precision={0.5} readOnly />
              </div>
            )}
          </div>            
          ) : (
            <div>loading</div>
          )}

        </div>

        <div className={styles.titleArea}>
          <div className={styles.title}>{dong} 게시글</div>
          <Link to={`../board/review`}>
            <button className={styles.moreBtn}>MORE</button>            
          </Link>
        </div>
        {bCheck? (
          <div className={styles.contentArea}>
            {boards[0] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{boards[0].title}</div>
                <div>{boards[0].boardLike}</div>
              </div>
            )}
            {boards[1] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{boards[1].title}</div>
                <div>{boards[1].boardLike}</div>
              </div>
            )}
            {boards[2] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{boards[2].title}</div>
                <div className={styles.contentTitle}>{boards[2].boardLike}</div>
              </div>
            )}
          </div>            
          ) : (
            <div>loading</div>
          )}
      </div>
    </div>
  );
}
export default GoReview
