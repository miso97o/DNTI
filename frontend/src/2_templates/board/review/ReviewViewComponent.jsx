import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Rating, TextField } from "@mui/material";

export default function ReviewViewComponent() {
  const [postContents, setPostContents] = React.useState("");
  const handleChange = (event) => {
    setPostContents(event.target.value);
  };
  const [totalScore, setTotalScore] = React.useState(2);
  const [rentScore, setRentScore] = React.useState(2);
  const [infraScore, setInfraScore] = React.useState(2);
  const [envScore, setEnvScore] = React.useState(2);
  const [safeScore, setSafeScore] = React.useState(2);
  return (
    <div className="flex flex-col h-full">
      <p className="">리뷰 보기</p>
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row w-1/2">
            <p className="w-1/4">동</p>
            <p className="txt-197">제목</p>
          </div>
          <div className="flex flex-row w-1/2 justify-between">
            <p className="txt-073">작성자</p>
            <p className="txt-456">작성일시</p>
            <p className="txt-9210">좋아요</p>
          </div>
        </div>
        <div className="flex h-80 p-5">
          <p>리뷰 내용</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <p>총점</p>
            <Rating name="total" value={totalScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>임대료</p>
            <Rating name="total" value={rentScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>인프라</p>
            <Rating name="total" value={infraScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>환경</p>
            <Rating name="total" value={envScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>안전</p>
            <Rating name="total" value={safeScore} readOnly />
          </div>
        </div>

        <div className="flex flex-row w-full justify-center mt-20">
          <Link to="/board/review/write">
            <Button>수정</Button>
          </Link>
          <Link to="/board/review">
            <Button>목록</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
