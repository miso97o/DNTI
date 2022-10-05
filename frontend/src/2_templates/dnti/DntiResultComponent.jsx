import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import DntiCarousel from "../../1_molecules/DntiCarousel";
import Chart from "../../1_molecules/DntiChart";

function DntiResultCard({ imgsrc, type, content, arr }) {
  const [count, setCount] = React.useState(0);
  const [dntiPer, setDntiPer] = React.useState(0);
  const [keyword, setKeyword] = React.useState("");
  const [hash1, setHash1] = React.useState("");
  const [hash2, setHash2] = React.useState("");
  const [dongList, setDongList] = React.useState([]);
  const user = useSelector((state) => state.user);
  const [dntiAll, setDntiAll] = React.useState([]);

  useEffect((e) => {
    if (user.userId) saveDnti();
    voteDnti();
    getStat();
    getAllStat();
    getDongbyDnti();
    getDnti();
    getCount();
  }, []);

  async function getCount() {
    await axios.get(`/dnti/count`).then((res) => {
      setCount(res.data.response);
    });
  }

  async function getDnti() {
    await axios.get(`/dnti/all`).then((res) => {
      setDntiAll(res.data.response);
    });
  }

  function saveDnti() {
    axios
      .put(`/users/savednti`, {
        type: type,
      })
      .then((res) => {
        console.log(res);
      });
  }

  function voteDnti() {
    axios.patch(`/dnti/count/${type}`).then((res) => console.log(res.data));
  }

  function getStat() {
    axios.get(`/dnti/${type}`).then((res) => {
      console.log(res.data);
      setDntiPer(res.data.response.percent);
      setKeyword(res.data.response.keyword);
      setHash1(res.data.response.hashtag1);
      setHash2(res.data.response.hashtag2);
    });
  }

  function getAllStat() {
    axios.get(`/dnti/all`).then((res) => {
      console.log(res.data);
    });
  }

  function getDongbyDnti() {
    axios.get(`/dong/${type}`).then((res) => {
      console.log(res.data);
      setDongList(res.data.response);
    });
  }

  useEffect(() => {
    if (dongList.length > 0) {
    setSelected(dongList[0].dongName)
    }
  }, [dongList])

  const data = {
    labels: arr.map((x) =>
      x[0] === "S"
        ? "S(안전)"
        : x[0] === "P"
        ? "P(가격)"
        : x[0] === "N"
        ? "N(자연)"
        : "I(인프라)"
    ),
    datasets: [
      {
        data: arr.map((x) => (x[1] * 100) / 6.0),
        borderWidth: 1,
        backgroundColor: [
          "rgba(244, 118, 130, 1)",
          "rgba(61, 164, 234, 1)",
          "rgba(187, 237, 56, 1)",
          "rgba(255, 218, 3, 1)",
        ],
        borderColor: [
          "rgba(244, 118, 130, 1)",
          "rgba(61, 164, 234, 1)",
          "rgba(187, 237, 56, 1)",
          "rgba(255, 218, 3, 1)",
        ],
      },
    ],
  };

  let [selectedClass, setSelectedClass] = useState([
    "ranking yesss",
    "ranking nooooo",
    "ranking nooooo",
    "ranking nooooo",
    "ranking nooooo",
  ]);

  const [selected, setSelected] = useState();

  const [num, setNum] = useState(0);
  function handleSelect(e, i) {
    setSelected(e);
    setNum(i);
    let tmp = [];
    for (let n = 0; n < dongList.length; n++) {
      if (n === i) {
        tmp[n] = "ranking yesss";
      } else {
        tmp[n] = "ranking nooooo";
      }
    }
    setSelectedClass(tmp);
    // console.log(selectedClass)
  }

  return (
    <Card variant="outlined">
      <div className="flex flex-col m-10">
        <p className="text-center font-extrabold text-2xl mb-5">
          📋테스트 결과
        </p>
        <div className="flex flex-row">
          <div className=" rounded-3xl">
            <img src={imgsrc} alt="dnti_img" className="w-72 h-72" />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col m-10">
              <p className="font-bold text-xl mb-2">나의 DNTI는</p>
              <p className="font-black text-6xl mb-2">[{type}]</p>
              <p className="font-bold text-xl mb-1">"{keyword}" 유형</p>
              <p className="font-bold text-base text-blue-500">
                #{hash1} #{hash2}
              </p>
              <p className="text-sm mt-8">{dntiPer}%의 유형</p>
            </div>
          </div>
          <div className="flex flex-row m-10 w-60 h-60">
            <Doughnut data={data} />
          </div>
        </div>
        <hr />
        <div className="flex flex-col m-12 items-center">
          <p className="text-center font-bold text-2xl mb-5">
            🏡
            <span className="font-extrabold font-dnti items-center">
              {type}
            </span>
            에게 어울리는 동네는?
          </p>
          <div className="flex gap-10 w-4/5">
            <div className="w-4/12 flex flex-col gap-2 min-w-min">
              {dongList.map((x, idx) => {
                const src = "/img/rank/" + (idx + 1) + ".png";
                return (
                  <div className="flex items-center">
                    <img src={src} alt="" className="w-8 h-8" />
                    <p className="font-bold text-start text-xl" onClick={() => handleSelect(x.dongName, idx)}>
                      위. {x.guName} {x.dongName}
                    </p>
                  </div>
                );
              })}
              
            </div>
            <div className="w-8/12 h-full flex items-center	mt-2">
              {selected && <Chart rank={dongList} num={num} />} 
            </div>
                      
          </div>

          
          
          <div className="flex flex-col justify-center items-center pt-10">
            <p className="text-sm mb-3">더 자세한 동네추천을 원한다면?</p>
            <Link
              to={`/dnRecommend`}
              style={{ textDecoration: "none" }}
              state={{ dnti: type }}
            >
              <Button onClick={saveDnti} variant="contained">
                동네추천 보러가기
              </Button>
            </Link>
          </div>
        </div>

        <hr />
        <div className="flex flex-col m-10">
          <p className="text-center font-bold text-2xl mb-5">
            📊DNTI 유형 랭킹
          </p>
          <p className="text-center text-gray-600 mb-2">
            {count}명의 DNTI유형 랭킹
          </p>
          <div className="w-[52rem] p-10">
            <DntiCarousel data={dntiAll} />
          </div>
        </div>
      </div>
    </Card>
  );
}

var arr = [0, 0, 0, 0];

const info = {
  PISN: "#알뜰한 현대인",
  PINS: "#용감한 낭만인",
  PSNI: "#소소한 산책러",
  PSIN: "#속세에 찌든 도시인",
  PNIS: "#검소한 현실 주의자",
  PNSI: "#예비 귀농인",
  IPSN: "#현실적인 야망인",
  IPNS: "#해맑은 외향인",
  ISPN: "#뼛속까지 도시인",
  ISNP: "#신도시 킬러",
  INSP: "#본투비 부자",
  INPS: "#겁없는 모순주의자",
  SPIN: "#의심많은 도시인",
  SPNI: "#안전제일 꼼꼼이",
  SIPN: "#현실적인 안전 과민러",
  SINP: "#흥청망청 신혼 부부",
  SNPI: "#아재 개그치는 예민이",
  SNIP: "#신중한 개척자",
  NPIS: "#예비 자연인",
  NPSI: "#나는 자연인",
  NIPS: "#겂없는 모순 덩어리",
  NISP: "#모순적인 부자",
  NSPI: "#욕심없는 애늙은이",
  NSIP: "#돈 많은 예비 시골인",
  NOTI: "#우유부단한 자연인",
  NOTP: "#우유부단한 부자",
  NOTS: "#우유부단한 현대인",
  NOTN: "#우유부단한 대장부",
  TOPI: "#찐 자연인",
  TOPN: "#찐 대장부",
  TOPS: "#찐 현대인",
  TOPP: "#찐 부자",
};

export default function DntiResultComponent({ sortable, win, lose }) {
  console.log(sortable[0][1], sortable[1][1], sortable[2][1], sortable[3][1]);
  if (sortable[0][1] === sortable[1][1] && sortable[1][1] === sortable[2][1]) {
    arr[0] = "N";
    arr[1] = "O";
    arr[2] = "T";
    arr[3] = sortable[3][0];
  } else if (
    sortable[1][1] === sortable[2][1] &&
    sortable[2][1] === sortable[3][1]
  ) {
    arr[0] = "T";
    arr[1] = "O";
    arr[2] = "P";
    arr[3] = sortable[0][0];
  } else {
    for (let i = 0; i < 3; i++) {
      console.log(arr);
      if (sortable[i][1] === sortable[i + 1][1]) {
        if (
          (sortable[i][0] === "N" && sortable[i + 1][0] === "P") |
          (sortable[i][0] === "P" && sortable[i + 1][0] === "N")
        ) {
          arr[i] = win[4];
          arr[i + 1] = lose[4];
        } else if (
          (sortable[i][0] === "N" && sortable[i + 1][0] === "I") |
          (sortable[i][0] === "I" && sortable[i + 1][0] === "N")
        ) {
          arr[i] = win[3];
          arr[i + 1] = lose[3];
        } else if (
          (sortable[i][0] === "N" && sortable[i + 1][0] === "S") |
          (sortable[i][0] === "S" && sortable[i + 1][0] === "N")
        ) {
          arr[i] = win[0];
          arr[i + 1] = lose[0];
        } else if (
          (sortable[i][0] === "S" && sortable[i + 1][0] === "I") |
          (sortable[i][0] === "I" && sortable[i + 1][0] === "S")
        ) {
          arr[i] = win[1];
          arr[i + 1] = lose[1];
        } else if (
          (sortable[i][0] === "S" && sortable[i + 1][0] === "P") |
          (sortable[i][0] === "P" && sortable[i + 1][0] === "S")
        ) {
          arr[i] = win[2];
          arr[i + 1] = lose[2];
        } else if (
          (sortable[i][0] === "P" && sortable[i + 1][0] === "I") |
          (sortable[i][0] === "I" && sortable[i + 1][0] === "P")
        ) {
          arr[i] = win[5];
          arr[i + 1] = lose[5];
        }
      } else {
        if (arr[i] === 0) {
          arr[i] = sortable[i][0];
        }
      }
      console.log(arr);
    }
    if (arr[3] === 0) {
      arr[3] = sortable[3][0];
    }
  }

  let dntitype = arr.join("");

  arr = [0, 0, 0, 0];
  const src = "/img/dnti_type/" + dntitype + ".png";
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-4xl m-10">DNTI 테스트</p>
      <DntiResultCard
        imgsrc={src}
        type={dntitype}
        content={info[dntitype]}
        arr={sortable}
      />
    </div>
  );
}
