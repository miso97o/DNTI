import {
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Tooltip,
  Input,
  Rating,
} from "@mui/material";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonIcon from "@mui/icons-material/Person";
import st from "./MyPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useCookies } from "react-cookie";
import { setUser, resetUser } from "../features/user/userSlice";
import { selectGu } from "../features/dong/guDongSlice";

export default function MyPage() {
  const user = useSelector((state) => state.user);
  const [myInfo, setMyInfo] = useState([]);
  const [myFavorite, setMyFavorite] = useState([]);
  const [dong, setDong] = useState("");
  const [gu, setGu] = useState("");

  const addFavorite = (favorite) => {
    setMyFavorite([...myFavorite, favorite]);
  };

  const deleteFavorite = (id) => {
    setMyFavorite(myFavorite.filter((place) => place.favoriteId !== id));
  };

  const changePlace = (sigungu, dong) => {
    setGu(sigungu);
    setDong(dong);
  };

  useEffect(() => {
    if (user.userId !== null) {
      axios.get(`/users/mypage/${user.userId}`).then(({ data }) => {
        setMyInfo(data.response);
        setMyFavorite(data.response.favoriteList);
        setDong(data.response.user.dong);
        setGu(data.response.user.gu);
      });
    } else {
    }
  }, [user]);

  return (
    <>
      {myInfo.length !== 0 ? (
        <div className={st.mainContainer}>
          <ProfileCard info={myInfo.user} dnti={myInfo.dnti} />
          <div className={st.rowContainer}>
            <div className={st.middleColContainer}>
              <FrequentPlace
                myPlace={myFavorite}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
              />
              <RecommendedRegion info={myInfo.dongList} />
            </div>

            <div style={{ borderLeft: "0.2rem solid", height: "90%" }}></div>

            <div className={st.middleColContainer}>
              <MyRegion
                dong={dong}
                gu={gu}
                info={myInfo.user}
                changePlace={changePlace}
              />
              <MyReview info={myInfo.reviewList} />
              <MyPosts info={myInfo.boardList} />
            </div>
          </div>
        </div>
      ) : (
        <h2>로딩중</h2>
      )}
    </>
  );
}

const ProfileCard = (props) => {
  const [cookies, removeCookie] = useCookies(["userEmail"]);
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState(props.info.nickname);
  const dispatch = useDispatch();
  const [isValidNickName, setIsValidNickName] = React.useState(false);
  const [nick, setNick] = useState(nickname);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteUser = (id) => {
    axios.delete(`/users/${id}`).then((data) => {
      removeCookie("userEmail");
      dispatch(resetUser());
      alert("탈퇴 되었습니다.");
      window.location.replace("/");
    });
  };

  const toggleEdit = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const checkIfDuplicated = () => {
    axios.get(`/users/nickname?nickname=${nickname}`).then(({ data }) => {
      if (nickname !== "" && !data.response) {
        setIsValidNickName(true);
      } else {
        setIsValidNickName(false);
      }
    });
  };

  useEffect(() => {
    checkIfDuplicated();
  }, [nickname]);

  const nicknameChange = (event) => {
    setNickname(event.target.value);
  };

  let account = {
    userId: props.info.userId,
    dong: props.info.dong,
    gu: props.info.gu,
    birthYear: props.info.birthYear,
    nickname: nickname,
  };

  const changeNickname = () => {
    if (isValidNickName) {
      axios.patch("/users", account).then((data) => {
        axios.get(`/users/${account.userId}`).then((data) => {
          dispatch(setUser(data.data.response));
          dispatch(selectGu(data.data.response.gu));
        });
        toggleEdit();
      });
    }
  };
  const cancelChangeNickname = () => {
    setNickname(props.info.nickname);
    toggleEdit();
  };

  return (
    <div className={st.profileContainer}>
      <Avatar
        src={`${process.env.PUBLIC_URL}/img/dnti_type/${props.info.dnti}.png`}
        sx={{ width: "10rem", height: "10rem", margin: "10px" }}
      />
      <div className={st.colContainer}>
        <div className={st.ProfileRowContainer}>
          {editMode ? (
            <>
              <Input
                id="new-nickname"
                type="text"
                aria-describedby="text-helper-text"
                value={nickname}
                onChange={nicknameChange}
              />
              {isValidNickName ? (
                <Button
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                  onClick={changeNickname}
                  disabled={!isValidNickName}
                >
                  변경
                </Button>
              ) : (
                <p
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  사용할 수 없는 닉네임입니다.
                </p>
              )}

              <Button
                style={{ marginRight: "10px" }}
                onClick={cancelChangeNickname}
              >
                취소
              </Button>
            </>
          ) : (
            <>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginLeft: "20px",
                }}
              >
                {nickname}
              </p>
              <Tooltip title="닉네임 변경" style={{ marginRight: "20px" }}>
                <IconButton onClick={toggleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </>
          )}

          <p style={{ color: "gray" }}>{props.info.userId}</p>
        </div>
        <div style={{ borderBottom: "0.1rem dashed", width: "60%" }}></div>
        <div className={st.ProfileRowContainer}>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginLeft: "20px",
              marginRight: "50px",
            }}
          >
            {props.dnti ? props.dnti.type : "dnti검사를 해주세요!"}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {props.dnti
              ? `#${props.dnti.hashtag1} #${props.dnti.hashtag2}`
              : null}
          </p>
        </div>
      </div>
      <div className={st.profileColContainer}>
        <div style={{ margin: "20px auto" }}>
          <Tooltip title="회원 탈퇴">
            <IconButton onClick={() => setShowDeleteModal(true)}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <Dialog open={showDeleteModal}>
            <DialogContent style={{ position: "relative" }}>
              <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={() => setShowDeleteModal(false)}
              >
                <DisabledByDefaultOutlinedIcon />
              </IconButton>
              <div>
                <div className={st.modalTitle}> 정말 탈퇴하시겠습니까 ?</div>
                <div className={st.modalButton}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(props.info.userId)}
                  >
                    예
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setShowDeleteModal(false);
                    }}
                  >
                    아니오
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Link to="/dnti">
            <Button>DNTI 검사하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 즐겨찾기
const FrequentRow = (props) => {
  // 삭제버튼 클릭시
  const deleteFavorite = (id) => {
    axios.delete(`/favorite/${id}`).then((data) => {
      props.deleteFavorite(id);
      alert("삭제되었습니다.");
    });
  };
  return (
    <div className={st.frequentRowContainer}>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{props.address}</p>
      <IconButton onClick={() => deleteFavorite(props.favoriteId)}>
        <ClearIcon />
      </IconButton>
    </div>
  );
};

function FrequentPlace(props) {
  const [mainAddr, setMainAddr] = React.useState("");
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];

  let favoritePlace = {
    name: "일단 고정값",
    userId: email,
    address: mainAddr,
  };

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    favoritePlace.address = fullAddress;
    props.addFavorite(favoritePlace);
    axios.post("/favorite", favoritePlace).then((data) => {});
  };

  const addFrequentPlace = () => {
    if (props.myPlace.length >= 3) {
      alert("최대로 등록 가능한 개수는 3개입니다.");
    } else {
      open({ onComplete: handleComplete });
    }
  };

  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          자주 가는 곳
        </p>
        <Button style={{ margin: "auto 20px" }} onClick={addFrequentPlace}>
          추가
        </Button>
        <p
          style={{
            fontSize: "12px",
            color: "red",
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          최대 3곳까지 등록 가능합니다.
        </p>
      </div>
      <div className={st.bodyColContainer}>
        {props.myPlace.length !== 0 ? (
          props.myPlace.map((place, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                <FrequentRow
                  favoriteId={place.favoriteId}
                  name={place.name}
                  address={place.address}
                  addFavorite={props.addFavorite}
                  deleteFavorite={props.deleteFavorite}
                />
              </div>
            );
          })
        ) : (
          <p>자주 가는 지역을 추가해주세요!</p>
        )}
      </div>
    </div>
  );
}

function RecommendRow(props) {
  return (
    <div className={st.RecommendRowContainer}>
      <div>
        <p
          style={{ fontSize: "18px", fontWeight: "bold", marginRight: "20px" }}
        >
          {props.dong}
        </p>
      </div>
      <Link to="/dnRecommend">
        <Button>보러 가기</Button>
      </Link>
    </div>
  );
}

function RecommendedRegion(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          나와 어울리는 지역
        </p>
      </div>
      <div className={st.bodyColContainer}>
        {props.info !== null && props.info.length !== 0 ? (
          props.info.map((region, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                <RecommendRow dong={region.dongName} />
              </div>
            );
          })
        ) : (
          <p>DNTI 검사를 실시해주세요!</p>
        )}
      </div>
    </div>
  );
}

function MyRegion(props) {
  let currentPlace = {
    dong: props.dong,
    gu: props.gu,
    birthYear: props.info.birthYear,
    userId: props.info.userId,
  };

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let sigungu = data.sigungu;
    let dong = data.bname;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    currentPlace.dong = dong;
    currentPlace.gu = sigungu;
    props.changePlace(sigungu, dong);
    axios.patch("/users", currentPlace).then((data) => {});
  };

  const changeCurrentPlace = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          나의 지역
        </p>
        <Button onClick={changeCurrentPlace}>바꾸기</Button>
      </div>
      <div style={{ border: "1px solid", width: "100%", margin: "0px" }}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginRight: "20px",
            textAlign: "center",
          }}
        >{`${props.gu} ${props.dong}`}</p>
      </div>
    </div>
  );
}

function MyReview(props) {
  const user = useSelector((state) => state.user);
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          나의 리뷰
        </p>
        <Link
          to="/board/review"
          state={{ isFromMyPage: true, userId: user.userId }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            더보기
          </p>
        </Link>
      </div>
      <div className={st.bodyColContainer}>
        {props.info.length !== 0 ? (
          props.info.map((review, index) => {
            return (
              <div key={index} className={st.list}>
                <div>
                  <p style={{ fontWeight: "bold" }}>{review.title}</p>
                </div>
                <div className={st.postInfo}>
                  <div className={st.listComponent}>
                    <Rating value={review.score} size="small" readOnly />
                  </div>
                  <div className={st.listComponent}>
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                    <p>{review.reviewLike}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>등록한 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function MyPosts(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          작성한 글
        </p>
        <Link to="/board/post">
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            더보기
          </p>
        </Link>
      </div>
      <div className={st.bodyColContainer}>
        {props.info.length !== 0 ? (
          props.info.map((post, index) => {
            return (
              <div key={index} className={st.list}>
                <div>
                  <p style={{ fontWeight: "bold" }}>{post.title}</p>
                </div>
                <div className={st.postInfo}>
                  <div className={st.listComponent}>
                    <PersonIcon />
                    <p>{post.nickname}</p>
                  </div>
                  <div className={st.listComponent}>
                    <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                    <p>{post.commentCount}</p>
                  </div>

                  <div className={st.listComponent}>
                    <VisibilityOutlinedIcon fontSize="small" />
                    <p>{post.hit}</p>
                  </div>

                  <div className={st.listComponent}>
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                    <p>{post.boardLike}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>등록한 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
