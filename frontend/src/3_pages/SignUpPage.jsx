import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";
import * as React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useCookies } from "react-cookie";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/ko";
import axios from "../utils/axios";
import { FormControlUnstyledContext } from "@mui/base";

export default function SignUpPage() {
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];
  console.log(email);

  const [nickName, setNickName] = React.useState("");
  const [mainAddr, setMainAddr] = React.useState("");
  const [gu, setGu] = React.useState("");
  const [dong, setDong] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  console.log(nickName);

  let userInfo = {
    birthYear: moment(birthDate).format("YYYYMMDD") * 1,
    dong: dong,
    gu: gu,
    nickname: nickName,
    userId: email,
  };

  const signUp = (userInfo, e) => {
    console.log(e.target.value);
    console.log(userInfo);
    if (userInfo.nickName === "") {
      alert("닉네임을 입력해주세요.");
      return;
    } else if (userInfo.birthDate === "Invalid date") {
      alert("생년월일을 입력해주세요.");
      return;
    } else if (!userInfo.gu || !userInfo.dong) {
      alert("주소를 입력해주세요.");
      return;
    } else if (!userInfo.email) {
      alert("잘못된 접근입니다.");
      return;
    }

    axios.post("/users", userInfo).then((data) => {
      console.log(data);
    });
  };

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let sigungu = data.sigungu;
    let dong = data.bname;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setMainAddr(fullAddress);
    setGu(sigungu);
    setDong(dong);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  const handleBirthDateChange = (newValue) => {
    setBirthDate(newValue);
  };
  const handleNickNameChange = (event) => {
    setNickName(event.target.value);
    console.log(nickName);
  };

  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <p className="text-6xl m-10">회원가입</p>
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="">
                <TextField
                  label="닉네임"
                  color="primary"
                  value={nickName}
                  onChange={handleNickNameChange}
                />
              </div>
              <div className="">
                <Button>중복 확인</Button>
              </div>
            </div>
            <p className="txt-893">사용할 수 있는 닉네임입니다.</p>
          </div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="생년월일"
              inputFormat="YYYY/MM/DD"
              value={birthDate}
              onChange={handleBirthDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div className="flex flex-row">
            <div className="signupinputzipcodebtn flex-col-hcenter-vcenter">
              <Button onClick={handleClick}>주소 찾기</Button>
            </div>
          </div>
          <div className="">
            <TextField
              label="주소"
              color="primary"
              value={mainAddr}
              fullWidth
              disabled
            />
          </div>
        </div>
        <Button
          onClick={(e) => {
            signUp(userInfo, e);
          }}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
