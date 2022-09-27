import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <h1 className="text-6xl m-10">로그인/회원가입</h1>
      <img src="img/btn_google_login.png" alt="googleLogin" />
      <div className="flex flex-col place-content-center place-items-center">
        <p>회원가입</p>
        <Link to={`/signup`} style={{ textDecoration: "none" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/w1yuhngvkv-222%3A1074?alt=media&token=69dc3706-e89a-4b9a-a91f-51905693c111"
            alt="Not Found"
            className="signupbtnarea"
          />
        </Link>
      </div>
    </div>
  );
}
