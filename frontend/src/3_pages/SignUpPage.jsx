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
import { useNavigate } from "react-router-dom";
import DntiBtn from "../0_atoms/DntiBtn";

export default function SignUpPage() {
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const navigate = useNavigate();
  const email = cookies["userEmail"];
  console.log(email);

  const [nickName, setNickName] = React.useState("");
  const [mainAddr, setMainAddr] = React.useState("");
  const [gu, setGu] = React.useState("");
  const [dong, setDong] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [isValidNickName, setIsValidNickName] = React.useState(false);
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
    } else if (userInfo.email === "") {
      alert("잘못된 접근입니다.");
      return;
    } else if (!isValidNickName) {
      alert("닉네임 중복 확인을 해주세요.");
    }

    axios.post("/users", userInfo).then((data) => {
      console.log(data);
      navigate("/", { replace: true });
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
  const checkIfDuplicated = () => {
    axios.get(`/users/nickname?nickname=${nickName}`).then(({ data }) => {
      if (!data.response) {
        alert("사용할 수 있는 닉네임입니다.");
        setIsValidNickName(true);
      } else {
        alert("중복된 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.");
        setIsValidNickName(false);
      }
    });
  };

  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <p className="text-3xl m-10">회원가입</p>
      <div className="flex flex-col h-1/2 w-1/3 justify-center items-center dnticard">
        <div className="flex flex-col mb-5">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <div className="">
                {isValidNickName ? (
                  <TextField
                    label="닉네임"
                    color="primary"
                    value={nickName}
                    onChange={handleNickNameChange}
                    size="small"
                  />
                ) : (
                  <TextField
                    label="닉네임"
                    color="primary"
                    value={nickName}
                    onChange={handleNickNameChange}
                    size="small"
                    error
                  />
                )}
              </div>
              <div className="ml-3" onClick={checkIfDuplicated}>
                <DntiBtn text="중복 확인" type="black" />
              </div>
            </div>
            {isValidNickName ? (
              <p className="text-blue-700">사용할 수 있는 닉네임입니다.</p>
            ) : (
              <p className="text-red-600">다른 닉네임을 입력해주세요.</p>
            )}
          </div>
          <div className="flex flex-col w-full items-center border-b-2 border-b-slate-200 py-8">
            <div className="w-full">
              <TextField
                label="주소"
                color="primary"
                value={mainAddr}
                fullWidth
                required
                size="small"
                disabled
              />
            </div>
            <div className="pt-3" onClick={handleClick}>
              <DntiBtn text="주소 찾기" type="white" />
            </div>
          </div>
          {/* <div className="flex flex-row w-full justify-center py-3">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="생년월일"
                inputFormat="YYYY/MM/DD"
                value={birthDate}
                onChange={handleBirthDateChange}
                renderInput={(params) => <TextField {...params} />}
                size="small"
              />
            </LocalizationProvider>
          </div> */}
        </div>
        <div
          className="pt-2"
          onClick={(e) => {
            signUp(userInfo, e);
          }}
        >
          <DntiBtn text="회원가입" type="blue" />
        </div>
      </div>
    </div>
  );
}
