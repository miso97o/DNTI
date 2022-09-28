import * as React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./PrimaryNavigation.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../features/user/userSlice";

function PrimaryNavigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (dest) => {
    console.log(dest);
    setAnchorEl(null);
    return redirect(`/${dest}`);
  };

  const logOut = (dest) => {
    removeCookie("userEmail");
    dispatch(resetUser());
    handleClose(dest);
    navigate("/", { replace: true });
  };

  let logInButton;
  if (user.userId !== null) {
    logInButton = (
      <div className="flex flex-col">
        <p className="flex flex-row w-full px-4 mb-2">{user.nickname}</p>
        <Link to="mypage">
          <MenuItem onClick={handleClose}>마이페이지</MenuItem>
        </Link>
        <Link to="/">
          <MenuItem onClick={logOut}>로그아웃</MenuItem>
        </Link>
      </div>
    );
  } else {
    logInButton = (
      <Link to="login">
        <MenuItem onClick={handleClose}>로그인</MenuItem>
      </Link>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to={`dnti`} className={styles.link}>
            <p>동네TI</p>
          </Link>
        </div>
        <div className={styles.content}>
          <Link to={`dnrecommend`} className={styles.link}>
            <p>동네추천</p>
          </Link>
        </div>
        <div className={styles.content}>
          <Link to={`kmMap`} className={styles.link}>
            <p>1KM</p>
          </Link>
        </div>
        <div className={styles.content}>
          <Link to={`board`} className={styles.link}>
            <p>게시판</p>
          </Link>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m3va4v13wz-I22%3A104%3B22%3A44?alt=media&token=1f92b154-97c5-41c3-829c-1cdd04119c37"
          alt="Not Found"
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {logInButton}
        </Menu>
      </div>
    </div>
  );
}

export default PrimaryNavigation;
