import IconLink from "../1_molecules/IconLink";
import PrimaryNavigation from "../1_molecules/PrimaryNavigation";
import styles from "./Navbar.module.css";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios";
import { setUser } from "../features/user/userSlice";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const email = cookies["userEmail"];
    console.log("email ==================================");
    console.log(email);
    if (email !== "undefined" && email !== undefined) {
      axios.get(`/users/${email}`).then(({ data }) => {
        dispatch(setUser(data.response));

        console.log(data.response);
      });
    }
  }, [cookies]);
  console.log("after reduce : user-------------------------");
  console.log(user);
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <IconLink />
        <PrimaryNavigation />
      </div>
      <hr className="navUnderline" />
    </div>
  );
}
export default Navbar;
