import * as React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link, redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./PrimaryNavigation.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../features/user/userSlice";
import { useEffect } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { color } from "@mui/system";

function PrimaryNavigation({makeBlack, setmakeBlack}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [one,setOne]=React.useState(false)
  const [two,setTwo]=React.useState(false)
  const [three,setThree]=React.useState(false)
  const [four,setFour]=React.useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (dest) => {
    // console.log(dest);
    setOne(false)
    setTwo(false)
    setThree(false)
    setFour(false)
    setAnchorEl(null);
    return redirect(`/${dest}`);
  };

  const logOut = (dest) => {
    setOne(false)
    setTwo(false)
    setThree(false)
    setFour(false)
    setAnchorEl(null);
    removeCookie("userEmail");
    dispatch(resetUser());
    handleClose(dest);
    navigate("/", { replace: true });
  };
  useEffect(() => {
    if (makeBlack) {
      setOne(false)
      setTwo(false)
      setThree(false)
      setFour(false)
    }
  }, [makeBlack])

  const change=(index) =>{
    if(index===1){
      setmakeBlack(false)
      setOne(true)
      setTwo(false)
      setThree(false)
      setFour(false)
    }else if(index===2){
      setmakeBlack(false)
      setOne(false)
      setTwo(true)
      setThree(false)
      setFour(false)
    }else if(index===3){
      setmakeBlack(false)
      setOne(false)
      setTwo(false)
      setThree(true)
      setFour(false)
    }else{
      setmakeBlack(false)
      setOne(false)
      setTwo(false)
      setThree(false)
      setFour(true)
    }
  }

  let logInButton;
  if (user.userId != null) {
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
        <div className={styles.content} onClick={(e) => change(1)}>
          {
            one===true?
          <Link to={`dnti`} className={styles.link}>
            <p style={{color: "#7a08ff"}}>동네TI</p>
          </Link>:<Link to={`dnti`} className={styles.link}>
            <p>동네TI</p>
          </Link>
          }
        </div>
        <div className={styles.content} onClick={(e) => change(2)}>
          {
            two===true?
          <Link to={`dnrecommend`} className={styles.link} state={{dnti: ""}}>
            <p style={{color: "#7a08ff"}}>동네추천</p>
          </Link>:<Link to={`dnrecommend`} className={styles.link} state={{dnti: ""}}>
            <p>동네추천</p>
          </Link>
          }
        </div>
        <div className={styles.content} onClick={(e) => change(3)}>
          {
            three===true?
            <Link to={`kmMap`} className={styles.link}>
            <p style={{color: "#7a08ff"}}>1KM</p>
          </Link>:<Link to={`kmMap`} className={styles.link}>
            <p>1KM</p>
          </Link>
          }
        </div>
        <div className={styles.content} onClick={(e) => change(4)}>
          {
            four===true?
            <Link to={`board`} className={styles.link}>
            <p style={{color: "#7a08ff"}}>게시판</p>
            </Link> :
              <Link to={`board`} className={styles.link}>
              <p>게시판</p>
            </Link>
          }
        </div>
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleClick}
        >
          <PersonOutlineOutlinedIcon fontSize="large" className="text-black" />
        </IconButton>
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
