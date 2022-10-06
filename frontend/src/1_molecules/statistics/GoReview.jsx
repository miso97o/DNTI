import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import styles from "./GoReview.module.css";
import http from "../../utils/axios";

function GoReview({ dong }) {
  const [reviews, setReviews] = useState();
  const [rCheck, setRCheck] = useState(false);
  const [boards, setBoards] = useState();
  const [bCheck, setBCheck] = useState(false);

  async function getReview() {
    // await axios(`http://j7a601.p.ssafy.io:9090/api/review/hot?dong=${dong}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    await http
      .get(`/review/hot?dong=${dong}`)

      .then(function (res) {
        setReviews(res.data.response);
        // console.log("data", reviews);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }

  async function getBoard() {
    // await axios(`http://j7a601.p.ssafy.io:9090/api/board/hot?dong=${dong}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    await http
      .get(`/board/hot?dong=${dong}`)
      .then(function (res) {
        setBoards(res.data.response);
        console.log(res.data.response);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }

  useEffect(() => {
    getReview();
    getBoard();
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
            {rCheck && reviews[0] ? (
              <Link
                to={`../board/review`}
                state={{
                  gu: `${reviews[0].gu}`,
                  dong: `${reviews[0].dong}`,
                  from: 2,
                }}
              >
                <button className={styles.moreBtn}>MORE</button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          {rCheck ? (
            <div className={styles.contentArea}>
              {reviews[0] ? (
                <div className={styles.contentLine}>
                  <div className={styles.contentTitle}>{reviews[0].title}</div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={reviews[0].score}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </div>
              ) : (
                <p className={styles.contentLine}>리뷰가 없습니다</p>
              )}
              {reviews[1] && (
                <div className={styles.contentLine}>
                  <div className={styles.contentTitle}>{reviews[1].title}</div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={reviews[1].score}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </div>
              )}
              {reviews[2] && (
                <div className={styles.contentLine}>
                  <div className={styles.contentTitle}>{reviews[2].title}</div>
                  <Rating
                    name="half-rating-read"
                    defaultValue={reviews[2].score}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </div>
              )}
            </div>
          ) : (
            <div>loading</div>
          )}
        </div>

        <div className={styles.titleArea}>
          <div className={styles.title}>{dong} 게시글</div>
          {bCheck && boards[0] ? (
            <Link
              to={`../board/post`}
              state={{
                gu: `${boards[0].gu}`,
                dong: `${boards[0].dong}`,
                from: 2,
              }}
            >
              <button className={styles.moreBtn}>MORE</button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
        {bCheck ? (
          <div className={styles.contentArea}>
            {boards[0] ? (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{boards[0].title}</div>
                <div className={styles.heart}>
                  <FavoriteIcon sx={{ color: pink[500] }} fontSize="small" />
                  <p>{boards[0].boardLike}</p>
                </div>
              </div>
            ) : (
              <p className={styles.contentLine}>게시물이 없습니다</p>
            )}
            {boards[1] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{boards[1].title}</div>
                <div className={styles.heart}>
                  <FavoriteIcon sx={{ color: pink[500] }} fontSize="small" />
                  <p>{boards[1].boardLike}</p>
                </div>
              </div>
            )}
            {boards[2] && (
              <div className={styles.contentLine}>
                <div className={styles.contentTitle}>{boards[2].title}</div>
                <div className={styles.heart}>
                  <FavoriteIcon sx={{ color: pink[500] }} fontSize="small" />
                  <p>{boards[2].boardLike}</p>
                </div>
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
export default GoReview;
