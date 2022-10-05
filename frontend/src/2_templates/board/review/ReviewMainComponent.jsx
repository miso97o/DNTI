import * as React from "react";
import {
  Pagination,
  TextField,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReviewRow from "../../../1_molecules/ReviewRow";
import HotReviewRow from "../../../1_molecules/HotReviewRow";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDidMountEffect from "../../../utils/useDidmountEffect";

export default function ReviewMainComponent() {
  const [reviews, setReviews] = React.useState();
  const [hotReviews, setHotReviews] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);
  const [selectedCriteria, setSelectedCriteria] = React.useState("제목");
  const [fromOtherPage, setFromOtherPage] = React.useState(false);
  const [criteriaList, setCriteriaList] = React.useState([
    "제목",
    "내용",
    "아이디",
  ]);
  const [searchWord, setSearchWord] = React.useState("");
  const location = useLocation();
  const user = useSelector((state) => state.userId);
  const guDong = useSelector((state) => state.guDong);
  const handleCriteriaChange = (event) => {
    setSelectedCriteria(event.target.value);
  };

  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value);
  };

  function getHotReview() {
    axios
      .get(
        `/review/hot?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${guDong.selectedDong !== "전체" ? guDong.selectedDong : ""}`
      )
      .then(({ data }) => {
        setHotReviews(data.response);
        setCurrentPage(1);
      });
  }

  const searchReview = () => {
    let criteria = "title";
    if (selectedCriteria === "내용") {
      criteria = "content";
    } else if (selectedCriteria === "아이디") {
      criteria = "id";
    }
    console.log("리뷰 찾는다");
    console.log("selectedGu", guDong.selectedGu);
    console.log("selectedDong", guDong.selectedDong);
    console.log("selectedCriteria", selectedCriteria);
    console.log("searchWord", searchWord);
    axios
      .get(
        `/review/search?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&search=${criteria}&word=${searchWord}&page=${currentPage - 1}&size=7`
      )
      .then(({ data }) => {
        setTotalPage(data.response.totalPages);
        setReviews(data.response.content);
        if (location.state.from !== 0) {
          location.state.from = 0;
        }
      })
      .catch(() => {
        console.log("리뷰 조회에 실패했습니다.");
      });
  };

  useEffect(() => {
    if (location.state.from === 1) {
      console.log("마이페이지에서 왔구나");
      setSearchWord(location.state.userId);
      setSelectedCriteria("아이디");
      setFromOtherPage(true);
    }
  }, []);

  useEffect(() => {
    if (searchWord !== "" && selectedCriteria === "아이디") {
      console.log("fromOtherPage");
      getHotReview();
      searchReview();
    }
  }, [fromOtherPage]);

  useEffect(() => {
    if (location.state.from === 1) return;
    console.log("guDong");
    getHotReview();
    searchReview();
  }, [guDong]);

  // 초기 접속, 지역 변경, 페이지 변경 시 리뷰 조회
  useDidMountEffect(() => {
    if (location.state.from === 1) return;
    console.log("currentpage");
    searchReview();
  }, [currentPage]);

  return (
    <div className="flex flex-col h-full w-full items-center mx-3">
      <div className="h-[27rem] w-full dnticard">
        <div className="flex flex-col w-full">
          {hotReviews &&
            hotReviews.map((hotReview) => {
              return (
                <HotReviewRow
                  key={hotReview.id + "hot"}
                  id={hotReview.id}
                  title={hotReview.title}
                  datetime={hotReview.createdTime
                    .substring(2, 10)
                    .replaceAll("-", ".")}
                  writer={hotReview.email}
                  score={hotReview.score}
                  likes={hotReview.reviewLike}
                  hit={hotReview.hit}
                  nickname={hotReview.nickname}
                />
              );
            })}
        </div>
        <div className="flex flex-col h-full w-full">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => {
              return (
                <ReviewRow
                  key={review.id}
                  id={review.id}
                  title={review.title}
                  datetime={review.createdTime
                    .substring(2, 10)
                    .replaceAll("-", ".")}
                  writer={review.email}
                  score={review.score}
                  likes={review.reviewLike}
                  hit={review.hit}
                  nickname={review.nickname}
                />
              );
            })
          ) : (
            <div className="flex flex-row h-full w-full justify-center items-center">
              등록된 글이 없습니다.
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-start py-10 w-full">
        <div className="w-1/5"></div>
        <div className="flex flex-row justify-center items-start">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="criteria">카테고리</InputLabel>
              <Select
                labelId="criteria"
                id="criteriaSelect"
                value={selectedCriteria}
                label="검색"
                onChange={handleCriteriaChange}
                size="small"
              >
                {criteriaList.map((criteria) => {
                  return (
                    <MenuItem key={criteria} value={criteria}>
                      {criteria}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <div className="ml-3">
            <TextField
              variant="outlined"
              value={searchWord}
              onChange={handleSearchWordChange}
              size="small"
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={searchReview}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/board" state={{ from: 0 }}>
            <button className="graybtn-s">목록</button>
          </Link>
          <Link to="/board/review/write" state={{ reviewId: "newReview" }}>
            <button className="bluebtn-s">글쓰기</button>
          </Link>
        </div>
      </div>

      <Pagination
        count={totalPage}
        page={currentPage}
        variant="outlined"
        color="primary"
        onChange={handleCurrentPageChange}
      />
    </div>
  );
}
