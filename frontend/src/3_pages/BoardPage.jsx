import * as React from "react";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { selectGu, selectDong } from "../features/dong/guDongSlice";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Boardpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const guDong = useSelector((state) => state.guDong);
  const [selectedGu, setSelectedGu] = React.useState("전체");
  const [selectedDong, setSelectedDong] = React.useState("전체");
  const [guList, setGuList] = React.useState([
    "전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ]);
  const [dongList, setDongList] = React.useState(["전체"]);
  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];

  useEffect(() => {
    return () => {
      if (user.gu !== null && user.gu !== undefined) {
        console.log("cleanUp");
        dispatch(selectGu(user.gu));
        setSelectedGu(user.gu);
      }
    };
  }, []);

  useEffect(() => {
    if (email === "undefined" || email === undefined) {
      alert("로그인이 필요합니다.");
      navigate("/login", { replace: true });
    }
  }, [email]);

  useEffect(() => {
    console.log("BoardPage useEffect(user)");
    console.log(user.gu);
    console.log("userGu", user.gu);
    if (user.gu !== null && user.gu !== undefined) {
      setSelectedGu(user.gu);
      dispatch(selectGu(user.gu));
    }
  }, [user]);

  useEffect(() => {
    console.log("boardpage selectedgu", selectedGu);
    if (selectedGu !== "전체") {
      axios.get(`address/dong/${selectedGu}`).then(({ data }) => {
        console.log(data);
        setDongList(["전체", ...data.response]);
      });
    } else {
      setDongList(["전체"]);
    }
  }, [selectedGu]);

  useEffect(() => {
    if (dongList.length > 1 && selectedGu === user.gu) {
      setSelectedDong(user.dong);
      dispatch(selectDong(user.dong));
    } else {
      setSelectedDong("전체");
      dispatch(selectDong("전체"));
    }
  }, [dongList]);

  const handleGuChange = (event) => {
    dispatch(selectGu(event.target.value));
    setSelectedGu(event.target.value);
  };

  const handleDongChange = (event) => {
    dispatch(selectDong(event.target.value));
    setSelectedDong(event.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full items-center p-5 pb-24">
      <div className="flex flex-row justify-start w-4/5 pl-4 pt-10 pb-8">
        <div className="mr-5">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="guSelect">구</InputLabel>
              <Select
                labelId="guSelect"
                id="guSelect"
                value={selectedGu}
                label="구"
                onChange={handleGuChange}
                size="small"
              >
                {guList.map((gu) => {
                  return (
                    <MenuItem key={gu} value={gu}>
                      {gu}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="dongSelect">동</InputLabel>
              <Select
                labelId="dongSelect"
                id="dongSelect"
                value={selectedDong}
                label="동"
                onChange={handleDongChange}
                size="small"
              >
                {dongList.map((dong) => {
                  return (
                    <MenuItem key={dong} value={dong}>
                      {dong}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
