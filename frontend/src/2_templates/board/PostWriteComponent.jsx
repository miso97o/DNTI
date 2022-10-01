import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

export default function PostWriteComponent() {
  const [postContents, setPostContents] = React.useState("");
  const [postTitle, setPostTitle] = React.useState("");
  const handleChangeContents = (event) => {
    setPostContents(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setPostTitle(event.target.value);
  };
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const boardId = location.state.boardId;
  useEffect(() => {
    if (user.userId == null) {
      alert("로그인이 필요합니다.");
      // 로그인되어있지 않은 경우, 로그인 화면으로 redirect
      navigate("/login", { replace: true });
    }
  });

  useEffect(() => {
    if(boardId) {
      axios.get(`/board/${boardId}`)
      .then((res) => {
        console.log(res.data);
        setPostContents(res.data.response.contents)
        setPostTitle(res.data.response.title)
      })
    }
  },[])

  function writePost() {    //수정으로 들어가면 수정, 아니면 작성
    if(boardId) 
    axios.patch(`/board/${boardId}`, {
      email: user.userId,
      title: postTitle,
      contents: postContents
    })
    .then((res) => {
      console.log('update', res.data);
      navigate('/board/postview', {state: {boardId: boardId}})
      alert("게시글이 수정되었습니다!")
    })
    else {
      axios.post(`/board`,{
        email: user.userId,
        title: postTitle,
        contents: postContents
      })
      .then((res) => {
        console.log(res.data);
        navigate("/board/postview", {state: {boardId: res.data.response}})
        alert("게시글이 작성되었습니다!!")
      })
    }
  }

  return (
    <div className="flex flex-col w-4/5 h-full items-center m-5">
      <div className="flex flex-row w-full m-5">
        <p className="font-medium text-2xl">게시판 글 작성</p>
      </div>
      <div className="flex flex-row w-full justify-between m-5">
        <div className="flex flex-row w-1/2">
          <p className="w-1/4">{user.dong}</p>
          <TextField
            value={postTitle}
            onChange={handleChangeTitle}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>{user.nickname}</p>
        </div>
      </div>
      <div className="flex flex-col h-4/5 w-full m-5">
        <div className="flex h-4/5 m-5">
          <TextField
            multiline
            fullWidth
            minRows={20}
            value={postContents}
            onChange={handleChangeContents}
            placeholder="내용을 입력하세요"
          />
        </div>
        <div className="flex flex-row justify-center"></div>
        <div className="flex flex-row justify-center items-center m-5">
          <Link >
            <Button onClick={() => writePost()}>{boardId ? "수정" : "등록"}</Button>
          </Link>
          <Link to={boardId ? "/board/postview" : "/board/post"}>
            <Button>취소</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
