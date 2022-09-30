import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Pagination, TextField, IconButton } from "@mui/material";
import Reply from "../../1_molecules/post/Reply";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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

  function getDetail() {
    axios.get(`/board/${boardId}`)
    .then((res) => {
      console.log(res.data);
      setPostDetail(res.data.response);
    })
  }
  function deletePost() {
    if(window.confirm("게시글을 삭제하시겠습니까?")){
      axios.delete(`/board/${boardId}`)
      .then((res) => {
        console.log(res.data);
        navigate("/board/post")
        alert("게시글이 삭제되었습니다!")
      })
    }
  }
  function getReply(page) {
    console.log('boardId', boardId)
    axios.get(`/reply/${boardId}?page=${page-1}`)
    .then((res) => {
      console.log('reply', res.data);
      setReplies(res.data.response.content);
    })
  }
  function writeReply() {
    axios.post(`/reply`,{
      email: user.userId,
      boardId: boardId,
      contents: value
    })
    .then((res) => {
      console.log('write', res.data);
      setValue("")
      getReply(1);
    })
  }
  function clickLike() {
    setLike(!like);
    // axios.patch(`/board/increase-like`)
    // .then((res) => {
    //   console.log(res.data);
    // })
  }
  
  useEffect(() => {
    getDetail();
    getReply(1);
  },[])
  
  return (
    <div className="flex flex-col w-4/5 h-full items-center m-5">
      <div className="flex flex-row w-full">
        <p className="font-medium text-2xl">게시판 글 보기</p>
      </div>
      <div className="flex flex-row w-full justify-between m-5">
        <div className="flex flex-row w-1/2">
          <p className="w-1/4">{postDetail.dong}</p>
          <p>{postDetail.title}</p>
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>{postDetail.nickname}</p>
          {
            postDetail.createdTime === undefined ? null : <p>{postDetail.createdTime.substring(0,10)}</p>
          }
          <div className="flex flex-row">
            <FavoriteIcon sx={{ color: pink[500] }} />
            <p>{postDetail.boardLike}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-4/5 w-full m-5">
        <div className="flex h-4/5 m-5">{postDetail.contents}</div>
        <div className="flex flex-row justify-center">
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={() => {clickLike()}}>
            {like ? <FavoriteIcon sx={{color: pink[500]}}/> : <FavoriteBorderIcon /> }
          </IconButton>
        </div>
        <div className="flex flex-row justify-center items-center m-5">
          {
          user.userId === postDetail.email && 
            <Link to="/board/postwrite" state={{boardId: boardId}}>
              <Button>수정</Button>
            </Link>
          }
          {
          user.userId === postDetail.email && 
            <Link>
              <Button style={{color: 'red'}} onClick={() => deletePost()}>삭제</Button>
            </Link>
          }
          <Link to="/board/post">
            <Button>목록</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center w-full m-5">
        <div className="flex flex-row w-full m-3">
          <p>댓글</p>
        </div>
        <div className="flex flex-col w-4/5">
          <div className="flex m-3">{user.nickname}</div>
          <div className="flex flex-row w-full justify-center m-3">
            <TextField
              multiline
              fullWidth
              maxRows={4}
              value={value}
              onChange={handleChange}
              placeholder="이글은 어떠셨나요?"
            />
            <Button onClick={() => {writeReply()}}>입력</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/5 items-center m-5">
        <div className="flex flex-col w-full">
          {replies && replies.map((x => {
              return (
                <Reply
                  Id={x.replyId}
                  nickname={x.nickname}
                  datetime={x.createdTime.substring(0,10)}
                  contents={x.contents}
                  mine={x.email === user.userId}
                  getReply={getReply}
                />
              )
            }))}
        </div>
        <Pagination count={10} variant="outlined" color="primary" onChange={(e) => getReply(e.target.outerText)}/>
      </div>
    </div>
  );
}
