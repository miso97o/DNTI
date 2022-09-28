import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios";
import { setUser } from "../features/user/userSlice";
import { useEffect } from "react";

export default function LandingPage() {
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const email = cookies["userEmail"];
    if (email !== "undefined") {
      axios.get(`/users/${email}`).then(({ data }) => {
        dispatch(setUser(data.response));

        console.log(data.response);
      });
    }
  }, [cookies]);
  console.log("after reduce-------------------------");
  console.log(user);
  return (
    <div className="container mx-auto flex flex-col h-full w-screen items-center ">
      <p className="font-medium text-5xl m-20">나와 딱맞는 동네는 어딜까?</p>
      <div className="m-20">
        <Link to={`dnti`} style={{ textDecoration: "none" }}>
          <button className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
            동네TI 검사하러 가기
          </button>
        </Link>
      </div>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/mr87ysvf2h-187%3A125?alt=media&token=2b15e9ee-9c19-40ca-ad41-b940f1fde7f4"
        alt="Not Found"
      />
    </div>
  );
}
