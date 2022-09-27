import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PostRow from "../../1_molecules/PostRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function FreeMainComponent() {
  return (
    <div className="container mx-auto flex flex-col h-full w-screen items-center">
      <div className="flex flex-row w-4/5 justify-start">
        <Link to="/board">
          <Button>뒤로</Button>
        </Link>
      </div>
      <div className="flex flex-row w-4/5 justify-between items-center">
        <p>자유 게시판</p>
        <Link to="/board/postwrite">
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="flex flex-col h-full w-4/5 items-center">
        <div className="flex flex-col h-4/5 w-full">
          <PostRow
            title="제목을 뭐로 할까요"
            writer="tttkim"
            date="2022-09-05"
            replies="20"
            views="500"
            likes="333"
          />
        </div>
        <div className="flex flex-row justify-center items-center m-10">
          <TextField variant="outlined" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
        <Pagination count={10} variant="outlined" color="primary" />
      </div>
    </div>
  );
}
