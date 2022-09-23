import * as React from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export default function PostWriteComponent() {
  const [postContents, setPostContents] = React.useState("");
  const handleChange = (event) => {
    setPostContents(event.target.value);
  };
  return (
    <div className="flex flex-col w-4/5 h-full items-center m-5">
      <div className="flex flex-row w-full m-5">
        <p className="font-medium text-2xl">게시판 글 작성</p>
      </div>
      <div className="flex flex-row w-full justify-between m-5">
        <div className="flex flex-row w-1/2">
          <p className="w-1/4">동</p>
          <p>제목</p>
        </div>
        <div className="flex flex-row w-1/2 justify-between">
          <p>작성자</p>
          <p>작성일시</p>
          <p>좋아요</p>
        </div>
      </div>
      <div className="flex flex-col h-4/5 w-full m-5">
        <div className="flex h-4/5 m-5">
          <TextField
            multiline
            fullWidth
            minRows={20}
            value={postContents}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row justify-center"></div>
        <div className="flex flex-row justify-center items-center m-5">
          <Link to="/board/postview">
            <Button>수정</Button>
          </Link>
          <Link to="/board/postview">
            <Button>취소</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
