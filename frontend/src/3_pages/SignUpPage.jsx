import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SignUpPage() {
  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <p className="text-6xl m-10">회원가입</p>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="">
                <TextField label="닉네임" color="primary" />
              </div>
              <div className="">
                <Button variant="contained">중복 확인</Button>
              </div>
            </div>
            <p className="txt-893">사용할 수 있는 닉네임입니다.</p>
          </div>
          <div className="flex flex-row">
            <div className="signupinputzipcode flex-col-hstart-vcenter">
              <TextField label="우편번호" color="primary" />
            </div>
            <div className="signupinputzipcodebtn flex-col-hcenter-vcenter">
              <Button variant="contained">우편번호 찾기</Button>
            </div>
          </div>
          <div className="">
            <TextField label="상세주소" color="primary" />
          </div>
        </div>
        <div className="signupinputarea flex-col-hcenter-vstart">
          <TextField fullWidth label="휴대전화" id="fullWidth" />
          <p className="txt-1102">
            올바른 형식으로 입력해주세요.(000-0000-0000)
          </p>
        </div>
        <Button variant="contained">회원가입</Button>
      </div>
    </div>
  );
}
