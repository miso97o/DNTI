import * as React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [count, setCount] = React.useState(0);
  const [dntiAll, setDntiAll] = React.useState([]);

  useEffect(() => {
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

  return (
    <div className="container mx-auto flex flex-col h-full w-screen items-center ">
      <p className="font-bold text-3xl m-20">나의 동네 유형은 뭘까?</p>
      <div></div>
      <div className="m-20">
        <p className="text-center">현재, {count}명이 참여했어요!</p>
        <Link to={`dnti`} style={{ textDecoration: "none" }}>
          <button className="bluebtn">동네TI 검사하기</button>
        </Link>
      </div>
    </div>
  );
}
