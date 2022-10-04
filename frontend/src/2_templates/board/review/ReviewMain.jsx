import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DntiBtn from "../../../0_atoms/DntiBtn";

function GuCard({
  gu,
  totalScore,
  rentScore,
  infraScore,
  envScore,
  safeScore,
}) {
  let guRatings = null;
  if (totalScore !== 0) {
    guRatings = (
      <div className="flex flex-col items-center mt-5">
        <div className="flex flex-row w-3/5 justify-between py-3">
          <p className="text-lg">총점</p>
          <Rating name="total" value={totalScore} size="large" readOnly />
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>임대료</p>
          <Rating name="total" value={rentScore} readOnly />
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>인프라</p>
          <Rating name="total" value={infraScore} readOnly />
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>환경</p>
          <Rating name="total" value={envScore} readOnly />
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>안전</p>
          <Rating name="total" value={safeScore} readOnly />
        </div>
      </div>
    );
  } else {
    guRatings = (
      <div className="flex flex-col items-center">
        <p>자료가 부족합니다!</p>
      </div>
    );
  }
  return (
    <div className="w-[25rem] p-5 dnticard">
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-center">
          <p className="text-2xl font-bold m-3">[{gu}]</p>
          <p></p>
        </div>
        <div className="flex flex-row h-1/2 justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/gu/${gu}.png`}
            alt="구 사진"
            className="h-64 w-64"
          />
        </div>
        {guRatings}
      </div>
    </div>
  );
}

export default function ReviewMain() {
  const guDong = useSelector((state) => state.guDong);
  const [totalScore, setTotalScore] = React.useState(0);
  const [rentScore, setRentScore] = React.useState(0);
  const [infraScore, setInfraScore] = React.useState(0);
  const [envScore, setEnvScore] = React.useState(0);
  const [safeScore, setSafeScore] = React.useState(0);

  useEffect(() => {
    if (guDong.selectedGu !== "전체") {
      axios.get(`/review/score/${guDong.selectedGu}`).then(({ data }) => {
        console.log(data);
        if (data.response != null) {
          setTotalScore(data.response.score);
          setRentScore(data.response.rental);
          setInfraScore(data.response.infra);
          setEnvScore(data.response.environment);
          setSafeScore(data.response.safety);
          console.log(totalScore);
        } else {
          setTotalScore(0);
          setRentScore(0);
          setInfraScore(0);
          setEnvScore(0);
          setSafeScore(0);
          console.log(totalScore);
        }
      });
    }
  }, [guDong]);

  let guCard;
  if (guDong.selectedGu !== "전체") {
    guCard = (
      <GuCard
        gu={guDong.selectedGu}
        totalScore={totalScore}
        rentScore={rentScore}
        infraScore={infraScore}
        envScore={envScore}
        safeScore={safeScore}
      />
    );
  } else {
    guCard = (
      <div className="w-[25rem] h-[32rem] p-5 dnticard">
        <div className="flex flex-row h-full justify-content items-center text-xl">
          <p className="text-center">구를 선택해주세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-4/5 items-center">
      <div className="flex flex-row h-16 w-full justify-between items-center">
        <p className="text-3xl font-bold">리뷰 게시판</p>
        <Link to="/board/review/write" state={{ reviewId: "newReview" }}>
          <button className="bluebtn-s">글쓰기</button>
        </Link>
      </div>
      <div className="flex flex-row h-full w-full justify-start">
        <div className="flex flex-row h-[32rem] w-[25rem]">{guCard}</div>
        <div className="h-full w-4/5 mx-3 pb-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
