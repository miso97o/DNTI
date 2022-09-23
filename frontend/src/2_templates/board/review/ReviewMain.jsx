import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";

function GuCard({ totalScore, rentScore, infraScore, envScore, safeScore }) {
  console.log(totalScore);
  return (
    <div className="w-2/5 h-1/2 p-5">
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-center">
          <p>강남구</p>
        </div>
        <div className="flex flex-row h-1/2 justify-center">이미지</div>
        <div className="flex flex-row justify-center">#인프라 #중심지</div>
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
      </div>
    </div>
  );
}

export default function ReviewMain() {
  const [totalScore, setTotalScore] = React.useState(2);
  const [rentScore, setRentScore] = React.useState(2);
  const [infraScore, setInfraScore] = React.useState(2);
  const [envScore, setEnvScore] = React.useState(2);
  const [safeScore, setSafeScore] = React.useState(2);
  return (
    <div className="flex flex-col h-full w-4/5 items-center">
      <div className="flex flex-row w-full justify-start">
        <Link to="/board">
          <Button>뒤로</Button>
        </Link>
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <p>리뷰 게시판</p>
        <Link to="/board/review/write">
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="flex flex-row h-full w-full ">
        <GuCard
          totalScore={totalScore}
          rentScore={rentScore}
          infraScore={infraScore}
          envScore={envScore}
          safeScore={safeScore}
        />
        <div className="h-full w-3/5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
