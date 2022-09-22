import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Pagination, TextField, IconButton } from "@mui/material";
import Reply from "../../1_molecules/post/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PostViewComponent() {
  const [value, setValue] = React.useState("이 글은 어떠셨나요?");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="flex flex-col w-4/5 h-full items-center m-5">
      <div className="flex flex-row w-full m-5">
        <p className="font-medium text-2xl">게시판 글 보기</p>
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
        <div className="flex h-4/5 m-5">본문</div>
        <div className="flex flex-row justify-center">
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <FavoriteBorderIcon />
          </IconButton>
        </div>
        <div className="flex flex-row justify-center items-center m-5">
          <Link to="/board/postwrite">
            <Button>수정</Button>
          </Link>
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
          <div className="flex m-3">닉네임</div>
          <div className="flex flex-row w-full justify-center m-3">
            <TextField
              multiline
              fullWidth
              maxRows={4}
              value={value}
              onChange={handleChange}
            />
            <Button>입력</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/5 items-center m-5">
        <div className="flex flex-col w-full">
          <Reply
            nickname={"tttkim"}
            datetime={"2022-09-21 11:54:00"}
            contents={"댓글 내용"}
          />
        </div>
        <Pagination />
      </div>
    </div>
  );
}
