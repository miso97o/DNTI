import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Pagination, TextField, IconButton } from "@mui/material";
import Reply from "../../1_molecules/post/Reply";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DntiBtn from "../../0_atoms/DntiBtn";

export default function PostViewComponent() {
  const [value, setValue] = React.useState("");
  const [postDetail, setPostDetail] = React.useState({});
  const [replies, setReplies] = React.useState([]);
  const [like, setLike] = React.useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.state.boardId;
  const user = useSelector((state) => state.user);
  console.log(boardId);

  function getDetail() {
    axios.get(`/board/${boardId}`).then((res) => {
      console.log(res.data);
      setPostDetail(res.data.response);
    });
  }
  function deletePost() {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios.delete(`/board/${boardId}`).then((res) => {
        console.log(res.data);
        navigate("/board/post");
        alert("게시글이 삭제되었습니다!");
      });
    }
  }
  function getReply(page) {
    console.log("boardId", boardId);
    axios.get(`/reply/${boardId}?page=${page - 1}`).then((res) => {
      console.log("reply", res.data);
      setReplies(res.data.response.content);
    });
  }
  function writeReply() {
    axios
      .post(`/reply`, {
        email: user.userId,
        boardId: boardId,
        contents: value,
      })
      .then((res) => {
        console.log("write", res.data);
        setValue("");
        getReply(1);
      });
  }
  function checkLike() {
    axios
      .get(`/board/like?boardId=${boardId}&email=${user.userId}`)
      .then((res) => {
        console.log("like check", res.data);
        setLike(res.data.response);
      });
  }

  function clickLike() {
    if (!like) {
      axios
        .patch(`/board/increase-like`, {
          email: user.userId,
          boardId: boardId,
        })
        .then((res) => {
          console.log(res.data);
          setLike(true);
        });
    } else {
      axios
        .patch(`/board/decrease-like`, {
          email: user.userId,
          boardId: boardId,
        })
        .then((res) => {
          console.log("cancel like", res.data);
          setLike(false);
        });
    }
  }

  useEffect(() => {
    getDetail();
    getReply(1);
    checkLike();
  }, [like]);

  return (
    <div className="flex flex-col w-4/5 h-full items-center p-3">
      <div className="flex flex-row w-full p-3">
        <p className="font-medium text-2xl">게시판 글 보기</p>
      </div>
      <div className="h-full w-full dnticard">
        <div className="flex flex-row w-full justify-between px-5 py-2 border-b-2 border-b-slate-200">
          <div className="flex flex-row w-1/2">
            <p>{postDetail.title}</p>
          </div>
          <div className="flex flex-row w-1/2 justify-end">
            <p className="px-3">{postDetail.nickname}</p>
            {postDetail.createdTime === undefined ? null : (
              <p className="px-5">
                {postDetail.createdTime.substring(0, 10).replaceAll("-", ".")}
              </p>
            )}
            <div className="flex flex-row px-3">
              <VisibilityOutlinedIcon />
              <p>{postDetail.hit}</p>
            </div>
            <div className="flex flex-row px-3">
              <FavoriteBorderIcon />
              <p>{postDetail.boardLike}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-4/5 w-full m-5">
          <div className="flex h-4/5 m-5">{postDetail.contents}</div>
          <div className="flex flex-row justify-center">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => {
                clickLike();
              }}
            >
              {like ? (
                <FavoriteIcon sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
          <div className="flex flex-row justify-center items-center m-5">
            {user.userId === postDetail.email && (
              <Link to="/board/postwrite" state={{ boardId: boardId }}>
                <button className="lbluebtn-s">수정</button>
              </Link>
            )}
            {user.userId === postDetail.email && (
              // <Link state={{boardId: boardId}} oncli>
              <button className="redbtn-s" onClick={deletePost}>삭제</button>
                // <DntiBtn text="삭제" type="black" onClick={deletePost} />
              // </Link>
            )}
            <Link to="/board/post">
              <button className="graybtn-s">목록</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full m-5 dnticard">
        <div className="flex flex-row w-full m-3">
          <p className="ml-5 font-bold text-2xl">댓글</p>
        </div>
        <div className="flex flex-col w-4/5">
          <div className="flex p-3">{user.nickname}</div>
          <div className="flex flex-row w-full justify-between items-center p-1">
            <div className="w-full">
              <TextField
                multiline
                fullWidth
                maxRows={4}
                value={value}
                onChange={handleChange}
                placeholder="이글은 어떠셨나요?"
              />
            </div>
            <div className="w-20 ml-5">
              <div
                onClick={() => {
                  writeReply();
                }}
              >
                <button className="bluebtn-s">입력</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-4/5 items-center m-5">
          <div className="flex flex-col max-h-[30rem] w-full overflow-y-auto">
            {replies &&
              replies.map((x) => {
                return (
                  <Reply
                    Id={x.replyId}
                    nickname={x.nickname}
                    datetime={x.createdTime
                      .substring(0, 10)
                      .replaceAll("-", ".")}
                    contents={x.contents}
                    mine={x.email === user.userId}
                    getReply={getReply}
                  />
                );
              })}
          </div>
          {/* <div className="mt-3">
            <Pagination
              count={10}
              variant="outlined"
              color="primary"
              onChange={(e) => getReply(e.target.outerText)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
