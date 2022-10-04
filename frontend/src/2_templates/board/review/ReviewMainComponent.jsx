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
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ReviewRow from "../../../1_molecules/ReviewRow";
import HotReviewRow from "../../../1_molecules/HotReviewRow";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ReviewMainComponent() {
  const [reviews, setReviews] = React.useState();
  const [hotReviews, setHotReviews] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);
  const [selectedCriteria, setSelectedCriteria] = React.useState("제목");
  const [criteriaList, setCriteriaList] = React.useState([
    "제목",
    "내용",
    "아이디",
  ]);
  const [searchWord, setSearchWord] = React.useState("");
  const [fromMyPage, setFromMyPage] = React.useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.userId);
  const guDong = useSelector((state) => state.guDong);
  const handleCriteriaChange = (event) => {
    setSelectedCriteria(event.target.value);
  };

  useEffect(() => {
    if (location.state.isFromMyPage) {
      setSearchWord(location.state.userId);
      setSelectedCriteria("아이디");
      setFromMyPage(true);
    }
  }, []);

  // fromMyPage가 스위치 역할을 한다.
  useEffect(() => {
    searchReview();
  }, [fromMyPage]);

  // 인기 리뷰 초기 세팅
  useEffect(() => {
    axios
      .get(
        `/review/hot?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${guDong.selectedDong !== "전체" ? guDong.selectedDong : ""}`
      )
      .then(({ data }) => {
        console.log("hotReview ========");
        console.log(data);
        setHotReviews(data.response);
        setCurrentPage(1);
        console.log(hotReviews);
      });
  }, [guDong]);

  // 초기 접속, 지역 변경, 페이지 변경 시 리뷰 조회
  useEffect(() => {
    axios
      .get(
        `/review/search?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&search=title&page=${currentPage - 1}&size=5`
      )
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
        console.log(data);
        setTotalPage(data.response.totalPages);
        setReviews(data.response.content);
        console.log(reviews);
        if (location.state.isFromMyPage) {
          location.state.isFromMyPage = false;
        }
      })
      .catch(() => {
        console.log("리뷰 조회에 실패했습니다.");
      });
  }, [guDong, currentPage]);

  const searchReview = () => {
    let criteria = "title";
    if (selectedCriteria === "내용") {
      criteria = "content";
    } else if (selectedCriteria === "아이디") {
      console.log("아이디로 변했다!!!!!!!!!!!!!");
      criteria = "id";
    }

    axios
      .get(
        `/review/search?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&search=${criteria}&word=${searchWord}&page=${currentPage - 1}&size=5`
      )
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
        console.log(data);
        setTotalPage(data.response.totalPages);
        setReviews(data.response.content);
        console.log(reviews);
        if (location.state.isFromMyPage) {
          location.state.isFromMyPage = false;
        }
      })
      .catch(() => {
        console.log("리뷰 조회에 실패했습니다.");
      });
  };
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value);
  };

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
        <div className="flex flex-col w-full">
          {reviews &&
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
            })}
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
          <Link to="/board">
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
