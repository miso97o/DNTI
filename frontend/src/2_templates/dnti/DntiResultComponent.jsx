import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import axios from "axios";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

function DntiResultCard({ imgsrc, type, content, arr }) {
  const [dntiPer, setDntiPer] = React.useState(0);
  const [keyword, setKeyword] = React.useState("");
  const [hash1, setHash1] = React.useState("");
  const [hash2, setHash2] = React.useState("");
  const [dongList, setDongList] = React.useState([]);
  const user = useSelector((state) => state.user);

  useEffect((e) => {
    if (user.userId) saveDnti();
    voteDnti();
    getStat();
    getAllStat();
    getDongbyDnti();
  }, []);

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

  const data = {
    labels: arr.map((x) => x[0]),
    datasets: [
      {
        data: arr.map((x) => (x[1] * 100) / 6.0),
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  return (
    <Card variant="outlined">
      <div className="flex flex-col m-10">
        <div className="flex flex-row">
          <img src={imgsrc} alt="Not Found" className="w-80 h-80" />
          <div className="flex flex-col items-center">
            <div className="flex flex-col m-10">
              <p className="font-bold text-xl mb-3">나의 동네유형은?</p>
              <p className="font-black text-6xl">{type}</p>
              <p className="font-medium text-xl">{keyword}</p>
              <p className="font-medium text-base">
                #{hash1} #{hash2}
              </p>
              <p className="font-bold text-lg mt-10">
                {dntiPer}%의 유형입니다.
              </p>
            </div>
          </div>
          <div className="flex flex-row m-10 w-72 h-72">
            <Doughnut data={data} />
          </div>
        </div>
        <hr />
        <div className="flex flex-col m-10">
          <p className="font-bold text-3xl mb-5">{type}에 어울리는 동네는?</p>
          {dongList.map((x, idx) => {
            return (
              <p className="font-bold">
                {idx + 1}위 {x.dongName}
              </p>
            );
          })}
        </div>
        <div className="flex flex-row justify-center items-center">
          <Link to={`/dnRecommend`} style={{ textDecoration: "none" }} state={{dnti: type}}>
            <Button onClick={saveDnti} variant="contained">
              동네 확인하기
            </Button>
          </Link>
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
      <p className="font-bold text-4xl m-10">DNTI 결과</p>
      <DntiResultCard
        imgsrc={src}
        type={dntitype}
        content={info[dntitype]}
        arr={sortable}
      />
    </div>
  );
}
