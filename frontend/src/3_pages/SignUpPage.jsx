import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";
import * as React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function SignUpPage() {
  const [nickName, setNickName] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [mainAddr, setMainAddr] = React.useState("");
  const [detailAddr, setDetailAddr] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
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
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <p className="text-6xl m-10">회원가입</p>
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="">
                <TextField label="닉네임" color="primary" />
              </div>
              <div className="">
                <Button>중복 확인</Button>
              </div>
            </div>
            <p className="txt-893">사용할 수 있는 닉네임입니다.</p>
          </div>
          <div className="flex flex-row">
            <div className="signupinputzipcode flex-col-hstart-vcenter">
              <TextField label="우편번호" color="primary" disabled />
            </div>
            <div className="signupinputzipcodebtn flex-col-hcenter-vcenter">
              <Button onClick={handleClick}>주소 찾기</Button>
            </div>
          </div>
          <div className="">
            <TextField label="주소" color="primary" fullWidth disabled />
          </div>
          <div className="">
            <TextField label="상세주소" color="primary" fullWidth />
          </div>
        </div>
        <div className="signupinputarea flex-col-hcenter-vstart">
          <TextField label="휴대전화" id="fullWidth" fullWidth />
          <p className="txt-1102">
            올바른 형식으로 입력해주세요.(000-0000-0000)
          </p>
        </div>
        <Link to="/">
          <Button>회원가입</Button>
        </Link>
      </div>
    </div>
  );
}
