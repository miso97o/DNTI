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
import { Co2Sharp } from "@mui/icons-material";

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
  const guDong = useSelector((state) => state.guDong);
  const handleCriteriaChange = (event) => {
    setSelectedCriteria(event.target.value);
  };
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

  useEffect(() => {
    console.log(guDong);

    axios
      .get(
        `/review/search?search=title&page=${currentPage - 1}&gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&page=0&size=7`
      )
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
        console.log(data);
        setTotalPage(data.response.totalPages);
        setReviews(data.response.content);
        console.log(reviews);
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
      criteria = "id";
    }

    axios
      .get(
        `/review/search?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&search=${criteria}&word=${searchWord}&page=${currentPage - 1}&size=10`
      )
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
        console.log(data);
        setReviews(data.response.content);
        console.log(reviews);
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
      <div className="h-[23rem] w-full dnticard">
        <div className="flex flex-col w-full">
          {hotReviews &&
            hotReviews.map((hotReview) => {
              return (
                <HotReviewRow
                  key={hotReview.id + "hot"}
                  id={hotReview.id}
                  title={hotReview.title}
                  writer={hotReview.email}
                  score={hotReview.score}
                  likes={hotReview.reviewLike}
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
                  writer={review.email}
                  score={review.score}
                  likes={review.reviewLike}
                />
              );
            })}
        </div>
      </div>
      <div className="flex flex-row justify-center items-start py-10">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="criteria">검색</InputLabel>
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
