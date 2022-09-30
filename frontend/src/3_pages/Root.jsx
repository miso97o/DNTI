import Navbar from "../2_templates/Navbar";
import Footer from "../2_templates/Footer";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios";
import { setUser } from "../features/user/userSlice";
import { useEffect } from "react";

export default function Root() {
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const user = useSelector((state) => state.user);
  const email = cookies["userEmail"];

  useEffect(() => {
    console.log("email ==================================");
    console.log(email);
    if (email !== "undefined" && email !== undefined) {
      axios.get(`/users/${email}`).then(({ data }) => {
        dispatch(setUser(data.response));

        console.log(data.response);
      });
    }
  });
  console.log("after reduce : user-------------------------");
  console.log(user);
  return (
    <div class="h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
