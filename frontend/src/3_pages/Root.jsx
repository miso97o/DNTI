import Navbar from "../2_templates/Navbar";
import Footer from "../2_templates/Footer";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios";
import { setUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { selectDong, selectGu } from "../features/dong/guDongSlice";

export default function Root() {
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const user = useSelector((state) => state.user);
  const guDong = useSelector((state) => state.guDong);
  const email = cookies["userEmail"];

  useEffect(() => {
    console.log("email ==================================");
    console.log(email);
    if (email !== "undefined" && email !== undefined) {
      axios.get(`/users/${email}`).then(({ data }) => {
        dispatch(setUser(data.response));
        dispatch(selectGu(data.response.gu));
        // dispatch(selectDong(data.response.dong));
        console.log(data.response);
      });
    }
  }, [email]);

  console.log("after reduce : user-------------------------");
  console.log(user);
  return (
    <div className="min-h-1080px font-dnti">
      <div className="min-h-1080px pb-24">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
