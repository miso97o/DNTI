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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import st from "./MyPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useCookies } from "react-cookie";
import { setUser, resetUser } from "../features/user/userSlice";
import { selectGu } from "../features/dong/guDongSlice";
import { padding } from "@mui/system";

export default function MyPage() {
  const user = useSelector((state) => state.user);
  const [myInfo, setMyInfo] = useState([]);
  const [myFavorite, setMyFavorite] = useState([]);
  const [dong, setDong] = useState("");
  const [gu, setGu] = useState("");
  const [lastFavIdx, setLastFavIdx] = useState(-1);

  const addFavorite = (favorite) => {
    axios.post("/favorite", favorite).then((data) => {
      axios.get(`/users/mypage/${user.userId}`).then(({ data }) => {
        setMyFavorite(data.response.favoriteList);
      });
    });
  };

  const editFavorite = (favorite) => {
    let copiedFavorite = [...myFavorite];
    const targetIdx = copiedFavorite.findIndex(
      (fav) => fav.favoriteId === favorite.favoriteId
    );
    if (targetIdx !== -1) {
      copiedFavorite[targetIdx] = {
        ...copiedFavorite[targetIdx],
        address: favorite.address,
      };
      setMyFavorite(copiedFavorite);
      favorite.userId = user.userId;
      console.log("변경할 값");
      console.log(favorite);
      axios.patch(`/favorite`, favorite).then((data) => {});
    }
  };

  const deleteFavorite = (targetId) => {
    console.log(`삭제할 id: ${targetId}`);
    axios.delete(`/favorite/${targetId}`).then((data) => {
      setMyFavorite(
        myFavorite.filter((place) => place.favoriteId !== targetId)
      );
    });
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
                editFavorite={editFavorite}
              />
              <RecommendedRegion info={myInfo.dongList} dnti={myInfo.dnti} />
            </div>

            <div style={{ borderLeft: "0.2rem solid", height: "90%" }}></div>

            <div style={{ borderLeft: "0.2rem solid", height: "90%" }}></div>

            <div className={st.middleColContainer}>
              <MyRegion
                dong={dong}
                gu={gu}
                info={myInfo.user}
                changePlace={changePlace}
              />
              <MyReview info={myInfo.reviewList} email={myInfo.user.userId} />
              <MyPosts info={myInfo.boardList} email={myInfo.user.userId} />
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
    <div
      className={st.profileContainer}
      style={{ width: "50%", margin: "40px" }}
    >
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
                <button
                  className="bluebtn-s"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                  onClick={changeNickname}
                  disabled={!isValidNickName}
                >
                  변경
                </button>
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

              <button
                className="squarebtn-s"
                style={{
                  marginRight: "10px",
                  minWidth: "90px",
                  fontSize: "1em",
                }}
                onClick={cancelChangeNickname}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
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
        <div className={st.ProfileRowContainer}>
          <p
            style={{
              fontSize: "30px",
              fontWeight: "900",
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
                  <button
                    className="redbtn-s"
                    onClick={() => handleDeleteUser(props.info.userId)}
                  >
                    예
                  </button>
                  <button
                    className="bluebtn-s"
                    onClick={() => {
                      setShowDeleteModal(false);
                    }}
                  >
                    아니오
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Link to="/dnti">
            <button className="lbluebtn-s">DNTI 검사하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 즐겨찾기
const FrequentRow = (props) => {
  const [mainAddr, setMainAddr] = React.useState(props.address);
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];

  let favoritePlace = {
    name: "default",
    userId: email,
    address: mainAddr,
    favoriteId: props.favoriteId,
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

    setMainAddr(fullAddress);
    favoritePlace.address = fullAddress;
    props.editFavorite(favoritePlace);
  };

  const openEditFavorite = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className={st.frequentRowContainer}>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{props.address}</p>
      <div className={st.frequentIcon}>
        <div>
          <Tooltip title="수정하기">
            <IconButton onClick={openEditFavorite}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="삭제하기">
            <IconButton onClick={() => props.deleteFavorite(props.favoriteId)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

function FrequentPlace(props) {
  const [mainAddr, setMainAddr] = React.useState("");
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];

  let favoritePlace = {
    name: "default",
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            📍 자주 가는 장소
          </p>
          <Tooltip title="자주 가는 장소 추가하기">
            <IconButton onClick={addFrequentPlace}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <p
            style={{
              fontSize: "12px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            최대 3곳까지 등록 가능합니다.
          </p>
        </div>
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
                  editFavorite={props.editFavorite}
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
        <div
          className="flex"
          style={{
            fontSize: "18px",
            marginRight: "20px",
            marginBottom: "5px",
          }}
        >
          <span className="font-bold"> {props.rank + 1}위 </span>
          &nbsp;&nbsp;&nbsp; {props.gu} {props.dong}
        </div>
      </div>
    </div>
  );
}

function RecommendedRegion(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.RecommendHeadRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          ✨ 나와 어울리는 지역
        </p>
        {props.dnti ? (
          <Link to="/dnRecommend" state={{ dnti: props.dnti.type }}>
            <p style={{ color: "#7a08ff85", fontWeight: "bold" }}>
              동네추천 페이지로 이동
            </p>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className={st.bodyColContainer}>
        {props.info !== null && props.info.length !== 0 ? (
          props.info.map((region, index) => {
            return (
              <div key={index} style={{ width: "100%" }}>
                <RecommendRow
                  rank={index}
                  gu={region.guName}
                  dong={region.dongName}
                />
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
        <Tooltip title="지역 변경">
          <IconButton onClick={changeCurrentPlace}>
            <EditIcon />
          </IconButton>
        </Tooltip>
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
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          나의 리뷰
        </p>
        <Link to="/board/review" state={{ from: 1, userId: props.email }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
            className="hover:text-dntiblue"
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
                <div style={{ width: "50%" }}>
                  <Link to="/board/review/view" state={{ reviewId: review.id }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {review.title}
                    </p>
                  </Link>
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
  const increaseHit = (id) => {
    axios.patch(`/board/hit/${id}`).then((res) => {});
  };

  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p
          style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}
        >
          작성한 글
        </p>
        <Link to="/board/post" state={{ from: 1, userId: props.email }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
            className="hover:text-dntiblue"
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
                <div style={{ width: "40%" }}>
                  <Link
                    to="/board/postview"
                    state={{ boardId: post.boardId }}
                    onClick={() => increaseHit(post.boardId)}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.title}
                    </p>
                  </Link>
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
