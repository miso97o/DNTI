import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import { useState } from "react";
import DntiResultComponent from "./DntiResultComponent";
import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: "40px" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

function LinearWithValueLabel({ progress }) {
  //const [progress, setProgress] =useState(0);
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

function TestSelectCard({ imgsrc, description, label }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-[12px] w-96 overflow-hidden border-4 border-dntiblue border-solid">
      <img src={imgsrc} alt="Not Found" className="w-full " />
      <p className="font-medium text-center text-xl p-5">
        {description}
        <br />
        {label}
      </p>
    </div>
  );
}

var result = { S: 0, N: 0, P: 0, I: 0 };
var sortable = [];
let arr = [0, 0, 0, 0];

export default function DntiList() {
  function LinearWithValueLabel() {
    return (
      <Box sx={{ width: "96%" }}>
        <LinearProgressWithLabel
          value={progress}
          sx={{
            height: 20,
            borderRadius: "20px",
          }}
        />
      </Box>
    );
  }

  const text = [
    "피톤치드 듬뿍인데,",
    "동네 경찰 마동석인데,",
    "새벽 3시에 조깅해도 안전한데,",
    "요즘 뜨는 핫플동네인데,",
    "새벽2시 골목길도 안전 그자체인데,",
    "월세 40인데,",
    "주변이 푸릇푸릇 공세권인데,",
    "서울 어디든 30분컷인데,",
    "뻐국이가 직접 모닝콜해주는데,",
    "월세 아껴서 뿌링클 10개 가능한데,",
    "5분 거리 혼밥식당 30개인데,",
    "혼자 월세 감당 가능한데,",
  ];
  const person = [
    "동네 범죄자 손석구인 동네",
    "일산화탄소 그득그득한 동네",
    "주변에 코노, 다이소 없음",
    "택배 도난률 80%",
    "월세 70",
    "조금만 어둑해도 수리남",
    "지하철 역까지 30분",
    "빌딩숲에서 매연 드링킹 필수",
    "월세 내면 일주일동안 라면만 먹어야됨",
    "매일아침에 굴삭기가 모닝콜해줌",
    "부모님한테 용돈받아야 생활 가능",
    "주변에 식당없어서 강제 요리 필수",
  ];

  const Type = ["N", "S", "S", "I", "S", "P", "N", "I", "N", "P", "I", "P"];

  const [index, setIndex] = useState(1);

  const [gotoresult, setGotoresult] = useState(false);

  const [progress, setProgress] = useState(0);

  const [win, setWin] = useState([]);
  const [lose, setLose] = useState([]);

  function handleNext(widx, lidx) {
    setIndex(index + 1);
    setProgress(progress + 16);
    const temp = Type[widx];
    result[`${temp}`] += 1;
    setWin([...win, Type[widx]]);
    setLose([...lose, Type[lidx]]);
    if (index > 5) {
      TypeResult();
      setGotoresult(true);
    }
  }

  function TypeResult() {
    for (const name in result) {
      sortable.push([name, result[`${name}`]]);
    }
    console.log(sortable);
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
  }

  useEffect(() => {
    return () => {
      sortable = [];
      result = { S: 0, N: 0, P: 0, I: 0 };
      console.log("clean up", sortable);
      console.log("clean up", result);
    };
  }, []);

  const src1 = "/img/dnti_test/" + index + "-1.png";
  const src2 = "/img/dnti_test/" + index + "-2.png";

  return (
    <div>
      {gotoresult ? (
        <DntiResultComponent
          arr={arr}
          sortable={sortable}
          win={win}
          lose={lose}
        />
      ) : (
        <div className="flex flex-col items-center w-full">
          <p className="font-bold text-4xl m-10">DNTI 테스트</p>
          <div className="flex flex-row items-center mt-5 ml-10 mr-10">
            <div
              onClick={() => handleNext(index * 2 - 2, index * 2 - 1)}
              className=""
            >
              <TestSelectCard
                imgsrc={src1}
                description={text[index * 2 - 2]}
                label={person[index * 2 - 2]}
              />
            </div>
            <p className="font-extrabold text-5xl m-3 text-dntiblue">VS</p>
            <div onClick={() => handleNext(index * 2 - 1, index * 2 - 2)}>
              <TestSelectCard
                imgsrc={src2}
                description={text[index * 2 - 1]}
                label={person[index * 2 - 1]}
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full pl-7">
            <LinearWithValueLabel progress={progress} />
          </div>
        </div>
      )}
    </div>
  );
}
