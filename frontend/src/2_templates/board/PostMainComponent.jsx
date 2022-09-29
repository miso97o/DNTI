import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PostRow from "../../1_molecules/PostRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";

export default function FreeMainComponent() {

  async function getBoard(page) {
    await axios.get(`/board?page=${page-1}`)
      .then((res) => {
        console.log(res.data);
        setBoardList(res.data.response.content);
      })
  }

  const [boardList, setBoardList] = React.useState([]);

  useEffect(() => {
    getBoard(1)
  },[])
  
  return (
    <div className="flex flex-col h-full w-4/5 items-center">
      <div className="flex flex-row w-full justify-start">
        <Link to="/board">
          <Button>뒤로</Button>
        </Link>
      </div>
      <div className="flex flex-col h-4/5 w-full px-6">
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-medium text-2xl">자유 게시판</p>
          <Link to="/board/postwrite">
            <Button>글쓰기</Button>
          </Link>
        </div>
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-col h-4/5 w-full">
            {boardList.map((x => {
              return (
                <PostRow
                  Id={x.boardId}
                  title={x.title}
                  writer={x.email}
                  date={x.createdTime.substring(0,10)}
                  replies={x.commentCount}
                  views={x.hit}
                  likes={x.boardLike}
                />
              )
            }))}
            {/* <PostRow
              title="제목을 뭐라할까"
              writer="tttkim"
              date="2022-09-05"
              replies="20"
              views="500"
              likes="333"
            /> */}
          </div>
          <div className="flex flex-row justify-center items-center m-10">
            <TextField variant="outlined" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <Pagination count={10} variant="outlined" color="primary" onChange={(e) => getBoard(e.target.outerText)}/>
        </div>
      </div>
    </div>
  );
}
