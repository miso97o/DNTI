import * as React from "react";
import { Link, useNavigate, useLocation, useHistory } from "react-router-dom";
import { Button, Rating, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import DntiBtn from "../../../0_atoms/DntiBtn";

export default function ReviewWriteComponent() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
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
  const [totalScore, setTotalScore] = React.useState(
    (rentScore + infraScore + envScore + safeScore) / 4
  );

  useEffect(() => {
    console.log("location state ====================");
    console.log(location.state.reviewId);
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
  const updateTotalScore = () => {
    setTotalScore((rentScore + infraScore + envScore + safeScore) / 4);
    console.log(`totalScore : ${totalScore}`);
  };

  let payload = {
    email: user.userId,
    content: reviewContents,
    environment: envScore,
    infra: infraScore,
    rental: rentScore,
    safety: safeScore,
    title: reviewTitle,
  };

  const submitReview = (payload) => {
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
        .then((data) => {
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
      <div className="flex flex-row w-full justify-center mt-10">
        <DntiBtn
          text="등록"
          type="yellow"
          onClick={(e) => {
            submitReview(payload, e);
          }}
        />
        <Link
          to="/board/review/view"
          state={{ reviewId: location.state.reviewId }}
        >
          <DntiBtn text="취소" type="white" />
        </Link>
      </div>
    );
  } else {
    controlPanel = (
      <div className="flex flex-row w-full justify-center mt-10">
        <div className="flex flex-row w-1/3 justify-between">
          <DntiBtn
            text="등록"
            type="yellow"
            onClick={(e) => {
              submitReview(payload, e);
            }}
          />
          <Link to="/board/review">
            <DntiBtn text="취소" type="white" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        <div className="mx-3">
          <div className="dnticard">
            <div className="flex flex-row justify-between items-center">
              <p className="">{user.dong}</p>
              <p className="">{user.nickname}</p>
            </div>
            <div className="flex flex-col h-4/5 p-5">
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
            <div className="flex flex-col items-center  my-5">
              <div className="flex flex-row w-1/3 justify-between mb-3">
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
                    updateTotalScore();
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
                    updateTotalScore();
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
                    updateTotalScore();
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
                    updateTotalScore();
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
