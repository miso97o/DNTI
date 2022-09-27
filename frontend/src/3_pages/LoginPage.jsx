import { Link } from "react-router-dom";

function BtnGoogleSignIn() {
  return (
    <div className="flex flex-row items-center border-2 py-2 pr-6 shadow-md">
      <div className="h-10 w-10 mx-5">
        <img src="img/google.png" alt="google login" />
      </div>
      <p className="font-sans">Sign in with google</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <h1 className="text-6xl m-10">로그인/회원가입</h1>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20email%20openid&response_type=code&redirect_uri=http://localhost:9090/api/google/login/redirect&client_id=429814945555-cvulqpkcp494j5n0ujmnnd6slp7ehieh.apps.googleusercontent.com">
        로그인
      </a>
      <BtnGoogleSignIn />
      <div className="flex flex-col place-items-center">
        <p>회원가입</p>
        <Link to={`/signup`} style={{ textDecoration: "none" }}>
          <div className="h-20 w-20 mx-5">
            <img src="img/google.png" alt="google signin" />
          </div>
        </Link>
      </div>
    </div>
  );
}
