function BtnGoogleSignIn() {
  return (
    <div className="flex flex-row w-64 items-center border-2 py-2 pr-6 shadow-md">
      <div className="h-10 w-10 mx-5">
        <img src="img/google.png" alt="google login" />
      </div>
      <p className="font-sans">Sign in with google</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container mx-auto h-full w-screen flex flex-col items-center">
      <h1 className="text-3xl m-10">로그인/회원가입</h1>
      <div className="flex flex-row h-1/5 w-1/3 justify-center items-center dnticard">
        <a
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20email%20openid&response_type=code&redirect_uri=${process.env.REACT_APP_BACK}/api/google/login/redirect&client_id=429814945555-cvulqpkcp494j5n0ujmnnd6slp7ehieh.apps.googleusercontent.com`}
        >
          <BtnGoogleSignIn />
        </a>
      </div>
    </div>
  );
}
