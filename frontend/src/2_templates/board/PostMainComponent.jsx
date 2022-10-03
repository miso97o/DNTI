import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PostRow from "../../1_molecules/PostRow";
import HotPostRow from "../../1_molecules/HotPostRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import DntiBtn from "../../0_atoms/DntiBtn";

export default function FreeMainComponent() {
  const [boardList, setBoardList] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState("");
  const [searchCat, setSearchCat] = React.useState(0);
  const [hotBoardList, setHotBoardList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);
  const guDong = useSelector((state) => state.guDong);

  function handleKeyword(e) {
    setSearchKey(e.target.value);
  }

  async function getHotBoard() {
    axios
      .get(
        `/board/hot?gu=${
          guDong.selectedGu === "전체" ? "" : guDong.selectedGu
        }&dong=${guDong.selectedDong === "전체" ? "" : guDong.selectedDong}`
      )
      .then(({ data }) => {
        setHotBoardList(data.response);
      });
  }

  async function getBoard(page) {
    await axios.get(`/board?page=${page - 1}`).then((res) => {
      console.log(res.data);
      setBoardList(res.data.response.content);
    });
  }

  function searchBoard() {
    console.log(searchCat);
    console.log(guDong);
    axios
      .get(
        `/board/search?gu=${
          guDong.selectedGu === "전체" ? "" : guDong.selectedGu
        }&dong=${
          guDong.selectedDong === "전체" ? "" : guDong.selectedDong
        }&category=${searchCat}&keyword=${searchKey}`
      )
      .then((res) => {
        console.log(res);
        setBoardList(res.data.response.content);
      });
  }

  useEffect(() => {
    // getBoard(1)
    searchBoard();
  }, []);

  useEffect(() => {
    searchBoard();
    getHotBoard();
  }, [guDong]);

  return (
    <div className="flex flex-col h-full w-4/5 items-center">
      <div className="flex flex-row w-full justify-start">
        <Link to="/board">
          <DntiBtn text={"< 뒤로"} type={"black"} />
        </Link>
      </div>
      <div className="flex flex-col h-4/5 w-full px-6">
        <div className="flex flex-row w-full justify-between items-center mb-5">
          <p className="font-medium text-2xl">자유 게시판</p>
          <Link to="/board/postwrite" state={{ boardId: 0 }}>
            <DntiBtn text={"글쓰기"} type={"square"} icon={"edit"} />
          </Link>
        </div>
        <div className="flex flex-col h-full w-full items-center">
          <div className="flex flex-col h-[24rem] w-full dnticard">
            <div className="flex flex-col w-full">
              {hotBoardList.map((x) => {
                return (
                  <HotPostRow
                    Id={x.boardId}
                    title={x.title}
                    writer={x.nickname}
                    date={x.createdTime.substring(2, 10)}
                    replies={x.commentCount}
                    views={x.hit}
                    likes={x.boardLike}
                  />
                );
              })}
            </div>
            <div className="flex flex-col w-full">
              {boardList.map((x) => {
                return (
                  <PostRow
                    Id={x.boardId}
                    title={x.title}
                    writer={x.nickname}
                    date={x.createdTime.substring(2, 10)}
                    replies={x.commentCount}
                    views={x.hit}
                    likes={x.boardLike}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center m-10">
            <select
              name="검색 조건"
              onChange={(e) => setSearchCat(e.target.value)}
            >
              <option value="0">제목</option>
              <option value="1">내용</option>
              <option value="2">아이디</option>
            </select>
            <TextField variant="outlined" onChange={(e) => handleKeyword(e)} />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => searchBoard()}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <Pagination
            count={totalPage}
            page={currentPage}
            variant="outlined"
            color="primary"
            onChange={(e) => getBoard(e.target.outerText)}
          />
        </div>
      </div>
    </div>
  );
}
