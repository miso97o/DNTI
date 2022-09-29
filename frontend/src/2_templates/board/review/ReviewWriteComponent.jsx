import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Rating, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../../utils/axios";

export default function ReviewWriteComponent() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.userId == null) {
      alert("로그인이 필요합니다.");
      // 로그인되어있지 않은 경우, 로그인 화면으로 redirect
      navigate("/login", { replace: true });
    }
  });

  const [postTitle, setPostTitle] = React.useState("");
  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };
  const [postContents, setPostContents] = React.useState("");
  const handlePostContentsChange = (event) => {
    setPostContents(event.target.value);
  };
  const [rentScore, setRentScore] = React.useState(2);
  const [infraScore, setInfraScore] = React.useState(2);
  const [envScore, setEnvScore] = React.useState(2);
  const [safeScore, setSafeScore] = React.useState(2);
  const [totalScore, setTotalScore] = React.useState(
    (rentScore + infraScore + envScore + safeScore) / 4
  );

  let payload = {
    content: postContents,
    environment: envScore,
    infra: infraScore,
    rental: rentScore,
    safety: safeScore,
    title: postTitle,
  };

  const submitReview = (payload) => {
    if (payload.content === "") {
      alert("내용을 ");
    }

    axios
      .post("/review/save", payload)
      .then((data) => {
        console.log("review post success");
        console.log("data================");
        console.log(data);
      })
      .catch(() => {
        console.log("review post error");
      });
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <p className="mb-5">리뷰 글 작성</p>
          <div className="">
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
                  value={postTitle}
                  onChange={handlePostTitleChange}
                  fullWidth
                />
              </div>

              <TextField
                multiline
                label="내용"
                fullWidth
                minRows={10}
                value={postContents}
                onChange={handlePostContentsChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-row">
                <p>총점</p>
                <Rating
                  name="total"
                  value={totalScore}
                  precision={0.1}
                  readOnly
                />
              </div>
              <div className="flex flex-row">
                <p>임대료</p>
                <Rating name="total" value={rentScore} />
              </div>
              <div className="flex flex-row">
                <p>인프라</p>
                <Rating name="total" value={infraScore} />
              </div>
              <div className="flex flex-row">
                <p>환경</p>
                <Rating name="total" value={envScore} />
              </div>
              <div className="flex flex-row">
                <p>안전</p>
                <Rating name="total" value={safeScore} />
              </div>
            </div>

            <div className="flex flex-row w-full justify-center mt-10">
              <Button
                onClick={(e) => {
                  submitReview(payload, e);
                }}
              >
                등록
              </Button>
              <Link to="/board/review/view">
                <Button>취소</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
