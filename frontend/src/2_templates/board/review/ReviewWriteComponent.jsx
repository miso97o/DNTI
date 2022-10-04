import * as React from "react";
import { Link, useNavigate, useLocation, useHistory } from "react-router-dom";
import { Button, Rating, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../../utils/axios";

export default function ReviewWriteComponent() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const guDong = useSelector((state) => state.guDong);
  const location = useLocation();
  const [reviewTitle, setReviewTitle] = React.useState("");
  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };
  const [reviewContents, setReviewContents] = React.useState("");
  const handleReviewContentsChange = (event) => {
    setReviewContents(event.target.value);
  };
  const [rentScore, setRentScore] = React.useState(0);
  const [infraScore, setInfraScore] = React.useState(0);
  const [envScore, setEnvScore] = React.useState(0);
  const [safeScore, setSafeScore] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const [payload, setPayload] = React.useState({
    email: user.userId,
    content: reviewContents,
    title: reviewTitle,
  });

  useEffect(() => {
    console.log("location state ====================");
    console.log(location.state.reviewId);
    if (guDong.selectedGu !== user.gu) {
      alert("이 지역 분이 아니신가봐요!");
      navigate(`/board/review`, true);
      return;
    }
    if (location.state.reviewId !== "newReview") {
      axios
        .get(`/review/detail/${location.state.reviewId}`)
        .then(({ data }) => {
          setReviewContents(data.response.content);
          setReviewTitle(data.response.title);
          setRentScore(data.response.rental);
          setInfraScore(data.response.infra);
          setEnvScore(data.response.environment);
          setSafeScore(data.response.safety);
          setTotalScore(data.response.score);
        });
    }
  }, []);

  useEffect(() => {
    updateTotalScore();
    setPayload({
      email: user.userId,
      content: reviewContents,
      environment: envScore,
      infra: infraScore,
      rental: rentScore,
      safety: safeScore,
      title: reviewTitle,
    });
  }, [rentScore, infraScore, envScore, safeScore]);

  console.log(payload);

  const updateTotalScore = () => {
    setTotalScore((rentScore + infraScore + envScore + safeScore) / 4);
    console.log(`totalScore : ${totalScore}`);
  };

  const submitReview = () => {
    if (user.userId == null) {
      alert("로그인이 필요합니다.");
      // 로그인되어있지 않은 경우, 로그인 화면으로 redirect
      navigate("/login", { replace: true });
    }
    if (payload.title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (payload.content === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    if (location.state.reviewId === "newReview") {
      axios
        .post("/review/save", payload)
        .then(() => {
          alert("리뷰가 작성되었습니다.");
          navigate("/board/review", { replace: true });
        })
        .catch(() => {
          console.log("review post error");
        });
    } else {
      axios
        .put(`/review/udpate/${location.state.reviewId}`, payload)
        .then(() => {
          alert("리뷰 수정이 완료되었습니다.");
          navigate("/board/review/view", {
            state: { reviewId: location.state.reviewId },
            replace: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  let controlPanel = null;
  if (location.state.reviewId !== "newReview") {
    controlPanel = (
      <div className="flex flex-row w-full justify-center pt-5">
        <button className="bluebtn-s" onClick={submitReview}>
          글쓰기
        </button>
        <Link
          to="/board/review/view"
          state={{ reviewId: location.state.reviewId }}
        >
          <button className="graybtn-s">취소</button>
        </Link>
      </div>
    );
  } else {
    controlPanel = (
      <div className="flex flex-row w-full justify-center pt-5">
        <div className="flex flex-row w-[15rem] justify-between">
          <button
            onClick={(e) => {
              submitReview(payload, e);
            }}
            className="bluebtn-s"
          >
            수정
          </button>
          <Link to="/board/review">
            <button className="graybtn-s">취소</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full">
          <div className="flex flex-col w-full items-center dnticard">
            <div className="flex flex-row w-full justify-between items-center">
              <p className="">{user.dong}</p>
              <p className="">{user.nickname}</p>
            </div>
            <div className="flex flex-col w-full h-4/5 p-3">
              <div className="mb-5">
                <TextField
                  id="standard-basic"
                  label="제목"
                  variant="standard"
                  value={reviewTitle}
                  onChange={handleReviewTitleChange}
                  fullWidth
                />
              </div>

              <TextField
                multiline
                label="내용"
                fullWidth
                minRows={10}
                value={reviewContents}
                onChange={handleReviewContentsChange}
              />
            </div>
            <div className="flex flex-col w-[45rem] items-center py-2">
              <div className="flex flex-row w-2/5 justify-between pb-1">
                <p className="text-lg">총점</p>
                <Rating
                  name="total"
                  value={totalScore}
                  precision={0.25}
                  size="large"
                  readOnly
                />
              </div>
              <div className="flex flex-row w-1/3 justify-between">
                <p>임대료</p>
                <Rating
                  name="total"
                  value={rentScore}
                  onChange={(event, newValue) => {
                    setRentScore(newValue);
                  }}
                />
              </div>
              <div className="flex flex-row w-1/3 justify-between">
                <p>인프라</p>
                <Rating
                  name="total"
                  value={infraScore}
                  onChange={(event, newValue) => {
                    setInfraScore(newValue);
                  }}
                />
              </div>
              <div className="flex flex-row w-1/3 justify-between">
                <p>환경</p>
                <Rating
                  name="total"
                  value={envScore}
                  onChange={(event, newValue) => {
                    setEnvScore(newValue);
                  }}
                />
              </div>
              <div className="flex flex-row w-1/3 justify-between">
                <p>안전</p>
                <Rating
                  name="total"
                  value={safeScore}
                  onChange={(event, newValue) => {
                    setSafeScore(newValue);
                  }}
                />
              </div>
            </div>
            {controlPanel}
          </div>
        </div>
      </div>
    </div>
  );
}
