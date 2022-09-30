import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { selectGu, selectDong } from "../features/dong/guDongSlice";

export default function Boardpage() {
  const dispatch = useDispatch();
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
  const handleGuChange = (event) => {
    dispatch(selectGu(event.target.value));
    setSelectedGu(event.target.value);
  };
  console.log(guDong.selectedGu);

  const handleDongChange = (event) => {
    dispatch(selectDong(event.target.value));
    setSelectedDong(event.target.value);
  };
  console.log(guDong.selectedDong);

  return (
    <div className="flex flex-col w-full h-full items-center p-10">
      <div className="flex w-4/5 p-5">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="guSelect">구</InputLabel>
            <Select
              labelId="guSelect"
              id="guSelect"
              value={selectedGu}
              label="구"
              onChange={handleGuChange}
            >
              {guList.map((gu) => {
                return <MenuItem value={gu}>{gu}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="dongSelect">동</InputLabel>
            <Select
              labelId="dongSelect"
              id="dongSelect"
              value={selectedDong}
              label="동"
              onChange={handleDongChange}
            >
              {dongList.map((dong) => {
                return <MenuItem value={dong}>{dong}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <Outlet />
    </div>
  );
}
