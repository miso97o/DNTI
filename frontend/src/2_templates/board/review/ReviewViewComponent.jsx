import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Rating, TextField } from "@mui/material";
import axios from "../../../utils/axios";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { pink } from "@mui/material/colors";
import { useSelector } from "react-redux";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function ReviewViewComponent() {
  const [reviewContents, setReviewContents] = React.useState("");
  const [isLike, setIsLike] = React.useState(false);
  const [totalScore, setTotalScore] = React.useState(0);
  const [rentScore, setRentScore] = React.useState(0);
  const [infraScore, setInfraScore] = React.useState(0);
  const [envScore, setEnvScore] = React.useState(0);
  const [safeScore, setSafeScore] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getDetail(location.state.reviewId);
    getReviewLike(location.state.reviewId);
  }, [user, isLike]);

  function getDetail(reviewId) {
    console.log("reviewId =====================");
    console.log(reviewId);
    axios.get(`/review/detail/${reviewId}`).then((res) => {
      console.log(res.data);
      setReviewContents(res.data.response);
      setTotalScore(res.data.response.score);
      setRentScore(res.data.response.rental);
      setInfraScore(res.data.response.infra);
      setEnvScore(res.data.response.environment);
      setSafeScore(res.data.response.safety);
    });
  }

  function getReviewLike(reviewId) {
    axios
      .get(`review/reviewlike?reviewId=${reviewId}&email=${user.userId}`)
      .then(({ data }) => {
        console.log(`isLike = ${data.response}`);
        setIsLike(data.response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function deleteReview() {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      axios.delete(`/review/delete/${location.state.reviewId}`).then(() => {
        console.log("리뷰 삭제 완료!");
        navigate("/board/review", true);
      });
    }
  }

  function clickLike() {
    if (!isLike) {
      axios
        .get(
          `/review/reviewlike/save?email=${user.userId}&reviewId=${location.state.reviewId}`
        )
        .then(() => {
          console.log("좋아요 등록 성공");
        })
        .catch(() => {
          console.log("좋아요 등록 실패");
        });
    } else {
      axios
        .delete(
          `/review/reviewlike/delete?email=${user.userId}&reviewId=${location.state.reviewId}`
        )
        .then(() => {
          console.log("좋아요 취소 성공");
        })
        .catch(() => {
          console.log("좋아요 취소 실패");
        });
    }
    setIsLike(!isLike);
  }

  let reviewControlPanel;
  if (user.userId === reviewContents.email) {
    reviewControlPanel = (
      <div className="flex flex-row w-full justify-center pt-5">
        <div className="flex flex-row w-1/2 gap-5 ml-32">
          <Link
            to="/board/review/write"
            state={{ reviewId: location.state.reviewId }}
          >
            <button className="bluebtn-s">수정</button>
          </Link>
          <Link to="/board/review" state={{ isFromMyPage: false }}>
            <button className="graybtn-s">목록</button>
          </Link>
          <button className="redbtn-s" onClick={deleteReview}>
            삭제
          </button>
        </div>
      </div>
    );
  } else {
    reviewControlPanel = (
      <div className="flex flex-row w-full justify-center pt-5">
        <Link to="/board/review" state={{ isFromMyPage: false }}>
          <button className="graybtn-s">목록</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full ">
      <div className="h-full w-full dnticard">
        <div className="flex flex-col h-full">
          <div className="flex flex-row py-2 px-4 justify-between border-b-2 border-b-slate-200 align-middle">
            <div className="flex flex-row w-1/2">
              <div className="bg-dntiblue rounded-lg py-1 px-4 text-bold text-center text-white justify-center">
                {reviewContents.dong}
              </div>
              <p className="flex items-center ml-5 font-bold text-lg">
                {reviewContents.title}
              </p>
            </div>
            <div className="flex flex-row w-1/2 justify-end">
              <p className="">{reviewContents.nickname}</p>
              {reviewContents.createdTime === undefined ? null : (
                <p className="px-5">
                  {reviewContents.createdTime
                    .substring(0, 10)
                    .replaceAll("-", ".")}
                </p>
              )}
              <div className="flex flex-row ml-3">
                <div className="px-1 flex items-center">
                  <VisibilityOutlinedIcon />
                </div>
                <p className="flex items-center">{reviewContents.hit}</p>
              </div>
              <div className="flex items-center flex-row ml-3">
                <div className="px-1 flex items-center">
                  {isLike ? (
                    <FavoriteIcon sx={{ color: pink[500] }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: pink[500] }} />
                  )}
                </div>
                <p className="flex items-center">{reviewContents.reviewLike}</p>
              </div>
            </div>
          </div>
          <div className="flex h-[14rem] p-10 border-b-2 border-b-slate-200">
            <p>{reviewContents.content}</p>
          </div>
          <div className="flex flex-col items-center py-3">
            <div className="flex flex-row  w-2/5 justify-between pb-1 mt-5">
              <p className="text-lg font-bold">총점</p>
              <Rating
                name="total"
                value={totalScore}
                precision={0.25}
                size="large"
                readOnly
              />
            </div>
            <div className="flex flex-row w-1/3 justify-between">
              <p className="font-bold">임대료</p>
              <Rating name="total" value={rentScore} readOnly />
            </div>
            <div className="flex flex-row w-1/3 justify-between">
              <p className="font-bold">인프라</p>
              <Rating name="total" value={infraScore} readOnly />
            </div>
            <div className="flex flex-row w-1/3 justify-between">
              <p className="font-bold">환경</p>
              <Rating name="total" value={envScore} readOnly />
            </div>
            <div className="flex flex-row w-1/3 justify-between">
              <p className="font-bold">안전</p>
              <Rating name="total" value={safeScore} readOnly />
            </div>
          </div>
          <div className="flex w-full justify-center mb-5">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => {
                clickLike();
              }}
            >
              {isLike ? (
                <FavoriteIcon sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: pink[500] }} />
              )}
            </IconButton>
          </div>
        </div>
      </div>
      {reviewControlPanel}
    </div>
  );
}
