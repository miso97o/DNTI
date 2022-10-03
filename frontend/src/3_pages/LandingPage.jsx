import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DntiCarousel from "../1_molecules/DntiCarousel";

export default function LandingPage() {
  const [count, setCount] = React.useState(0);
  const [dntiAll, setDntiAll] = React.useState([]);

  useEffect(() => {
    getCount();
    getDnti();
  }, []);

  console.log(dntiAll);
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

  return (
    <div className="container mx-auto flex flex-col h-full w-screen items-center ">
      <p className="font-bold text-3xl mt-20">나의 동네 유형은 뭘까?</p>
      <p className="font-medium mt-3 mb-20">
        밸런스게임으로 동네유형을 찾고, 나와 어울리는 동네까지 알아보자!
      </p>

      <div className="w-[40rem]">
        <DntiCarousel data={dntiAll} />
      </div>
      <div className="m-8">
        <p className="text-center text-gray-600 mb-2">
          벌써, {count}명이나 참여했어요!
        </p>
        <Link to={`dnti`} style={{ textDecoration: "none" }}>
          <button className="bluebtn">동네TI 검사하기</button>
        </Link>
      </div>
    </div>
  );
}
