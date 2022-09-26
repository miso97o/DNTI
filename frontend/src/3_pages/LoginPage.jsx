import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "../utils/axios";

function googleLogIn() {
  console.log("googleLogIn()");
  // window.location.replace("http://j7a601.p.ssafy.io/api/google/login");
  axios.get(`/google/login`).then((data) => {
    console.log(data);
  });
}

function BtnGoogleSignIn() {
  return (
    <div className="flex flex-row items-center border-2 py-2 pr-6 shadow-md">
      <div className="h-10 w-10 mx-5">
        <img src="img/google.png" alt="google signin" />
      </div>
      <p className="font-sans">Sign in with google</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container mx-auto h-full w-screen flex flex-col items-center">
      <h1 className="text-6xl m-10">로그인/회원가입</h1>
      <Button onClick={googleLogIn}>로그인</Button>
      <BtnGoogleSignIn />
      <div className="flex flex-col place-items-center">
        <p>회원가입</p>
        <Link to={`/signup`} style={{ textDecoration: "none" }}>
          <div className="h-20 w-20 mx-5">
            <img src="img/google.png" />
          </div>
        </Link>
      </div>
    </div>
  );
}
