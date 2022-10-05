import React, { useEffect, useState, setState } from "react";
import http from "../../utils/axios";
import axios from "axios";
import { useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useCookies } from "react-cookie";
import plusWhite from "../../0_atoms/Img/plusWhite.png";
import pencilPurple from "../../0_atoms/Img/pencilPurple.png";
import timePurple from "../../0_atoms/Img/timePurple.png";
import deletePurple from "../../0_atoms/Img/deletePurple.png";
import styles from "./Favorites.module.css";

const { kakao } = window;

let check = false

function Favorites({options}) {
  const user = useSelector((state) => state.user);
  const geocoder = new kakao.maps.services.Geocoder();
  const [time0, setTime0] = useState();
  const [time1, setTime1] = useState();
  const [time2, setTime2] = useState();
  const [showEdits, setShowEdits] = useState(false)
  const [mainAddr, setMainAddr] = React.useState("");
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];

  function changeShow() {
    if (showEdits) {
      setShowEdits(false)
    } else {
      setShowEdits(true)
    }
    }
  // let timesArray = [0, 0, 0];
  async function getTime(EX, EY, name, n) {
    console.log("거리계산시작");
    await axios(
      `https://api.odsay.com/v1/api/searchPubTransPathT?apiKey=6AcPH4j50wwRSa9i3EdRzQ&SX=${options.center.La}&SY=${options.center.Ma}&EX=${EX}&EY=${EY}`
    )
      .then((res) => {
        console.log(res.data)
        if (n === 0) {
          setTime0(res.data.result);
          console.log(n, res.data.result.path[0])
        } else if (n === 1) {
          setTime1(res.data.result);
          console.log(n, res.data.result.path[0])
        } else if(n === 2) {
          console.log(n, res.data.result.path[0])
          setTime2(res.data.result);
        }
        console.log(n, res.data.result, name);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }

  
  // 즐겨찾기: 페이지 처음에 한번 랜더
  const [fav, setFav] = useState();
  async function getFavorites() {
    // await axios(`http://j7a601.p.ssafy.io:9090/api/favorite/${email}`, {
    //   method: "GET",
    // })
    await axios(`/favorite/${email}`, {
      method: "GET",
    })
      .then((res) => {
        setFav(res.data.response);
      })
      .catch((error) => {
        console.error("실패:", error);
      });
  }
  useEffect(() => {
    getFavorites();
  }, []);
  const [favCheck, setFavCheck] = useState(false);
  const updateFav = el => {
    setFav()
  }

  useEffect(() => {
    if (fav) {
      console.log(fav)
      for (let i = 0; i < fav.length; i++) {
        geocoder.addressSearch(fav[i].address, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const EX = result[0].x;
            const EY = result[0].y;
            getTime(EX, EY, fav[i].address, i);
          }
        });
      }
      setFavCheck(true)
    }
  }, [fav, options, check]);




  async function deleteFavs(e) {
    // await axios(`http://j7a601.p.ssafy.io:9090/api/favorite/${e}`, {
    //   method: "DELETE",
    // })
    await axios(`/favorite/${e}`, {
      method: "DELETE",
    })
    .then((res) => {
      console.log(e, "삭제성공")
      getFavorites()
    })
    .catch((error) => {
      console.error("실패:", error);
    });
    }




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
    favoritePlace.address = fullAddress
    addFavs(favoritePlace)
    async function addFavs(favorite) {
      // await axios(`http://j7a601.p.ssafy.io:9090/api/favorite`, {
      //   method: "POST",
      //   data: favorite,
      // })
      await axios(`/favorite`, {
        method: "POST",
        data: favorite,
      })
      .then((res) => {
        console.log(favorite)
        setFav([...fav, favorite])
        console.log(res.data)
      })
      .catch((error) => {
        console.error("실패:", error);
      });
    }
  };

  
  function openDaum() {
    open({ onComplete: handleComplete })
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {user.userId ? (
          <div>
            <div className={styles.title}>
              즐겨찾기
              {showEdits? (
                <div className={styles.twoBtns}>
                  <button className={styles.goTime} onClick={changeShow}>
                    {/* <img src={timePurple} alt="timePurple" className={styles.timePurple} /> */}
                    <p>시간</p>
                  </button>
                  {favCheck && fav.length < 3 ? (
                    <button onClick={openDaum} className={styles.addBtn}>
                      <img src={plusWhite} alt="plusWhite" className={styles.plusWhite} />
                    </button>
                  ):null}
                  
                </div>
                ) : (
                <button className={styles.goEdit} onClick={changeShow}>
                  <img src={pencilPurple} alt="pencilPurple" className={styles.pencilPurple} />
                  <p>수정</p>
              </button>
              ) }
              
            </div>
            {favCheck ? (
              <div>
                {fav[0] ? (
                  <div className={styles.favListColumn}>
                    <div className={styles.favName}>{fav[0].address}</div>
                    {showEdits? (
                      <div className={styles.twoBtns}>
                        <Edit className={styles.editBtn} favoriteId={fav[0].favoriteId} num={0} getFavorites={getFavorites} />
                        <button className={styles.deleteBtn} onClick={() => deleteFavs(fav[0].favoriteId)}>
                          <img src={deletePurple} alt="deletePurple" className={styles.deletePurple} />
                        </button>
                      </div>
                      ) : (
                      <div className={styles.favTime}>
                        {time0 ? (
                          <div>{time0.path[0].info.totalTime}분 소요</div>
                        ) : (
                          <div>10분 이내</div>
                        )}
                      </div>                      
                    )}
                  </div>
                ) : (
                  <div>즐겨찾기를 추가해 주세요</div>
                )}
                {fav[1] ? (
                  <div className={styles.favListColumn}>
                    <div className={styles.favName}>{fav[1].address}</div>
                    {showEdits? (
                      <div className={styles.twoBtns}>
                        <Edit className={styles.editBtn} favoriteId={fav[1].favoriteId} num={1} getFavorites={getFavorites} />
                        <button className={styles.deleteBtn} onClick={() => deleteFavs(fav[1].favoriteId)}>
                          <img src={deletePurple} alt="deletePurple" className={styles.deletePurple} />
                        </button>
                      </div>
                      ) : (
                      <div className={styles.favTime}>
                        {time1 ? (
                          <div>{time1.path[0].info.totalTime}분 소요</div>
                        ) : (
                          <div>10분 이내</div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
                {fav[2] ? (
                  <div className={styles.favListColumn}>
                    <div className={styles.favName}>{fav[2].address}</div>
                    {showEdits? (
                      <div className={styles.twoBtns}>
                        <Edit className={styles.editBtn} favoriteId={fav[2].favoriteId} num={2} getFavorites={getFavorites} />
                        <button className={styles.deleteBtn} onClick={() => deleteFavs(fav[2].favoriteId)}>
                          <img src={deletePurple} alt="deletePurple" className={styles.deletePurple} />
                        </button>
                      </div>
                      ) : (
                      <div className={styles.favTime}>
                        {time2 ? (
                          <div>{time2.path[0].info.totalTime}분 소요</div>
                        ) : (
                          <div>10분 이내</div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div>즐겨찾기 가져오는중...</div>
            )}
          </div>
        ) : (
          <div>
            로그인을 하고 자주가는 장소와의 거리를 알아보세요
          </div>
        )}
      </div>
    </div>
  );
}
export default Favorites


function Edit({favoriteId, num, getFavorites}) {
  const [mainAddr, setMainAddr] = React.useState("");
  const [cookies, setCookie] = useCookies(["userEmail"]);
  const email = cookies["userEmail"];
  let eFavoritePlace = {
    name: "일단 고정값",
    userId: email,
    address: mainAddr,
    favoriteId: favoriteId
  };
  
  const open = useDaumPostcodePopup();
  const editComplete = (data) => {
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
    eFavoritePlace.address = fullAddress
    console.log(eFavoritePlace)
    editFavs(eFavoritePlace)

  async function editFavs(eFavoritePlace) {
    // await axios(`http://j7a601.p.ssafy.io:9090/api/favorite`, {
    //   method: "PATCH",
    //   data: eFavoritePlace,
    // })
    await axios(`/favorite`, {
      method: "PATCH",
      data: eFavoritePlace,
    })
    .then((res) => {
      console.log(res.data)
      getFavorites()
    })
    
    .catch((error) => {
      console.error("실패:", error);
    });
  }    
};
  function editDaum(e) {
    open({ onComplete: editComplete })
    // console.log(open({ onComplete: editComplete }))
  }
  return (
    <button className={styles.editBtn} onClick={editDaum}>
      <img src={pencilPurple} alt="pencilPurple" className={styles.pencilPurple} />
    </button>
  )
}
