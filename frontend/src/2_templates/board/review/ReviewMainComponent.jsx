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
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useSelector, useDispatch } from "react-redux";

export default function ReviewMainComponent() {
  const [reviews, setReviews] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(0);
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
    console.log(guDong);
    axios
      .get(
        `/review/search?search=title&page=${currentPage}&gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&page=0&size=10`
      )
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
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
        }&search=${criteria}&word=${searchWord}`
      )
      .then(({ data }) => {
        console.log("리뷰 조회 성공!");
        setReviews(data.response);
        console.log(reviews);
      })
      .catch(() => {
        console.log("리뷰 조회에 실패했습니다.");
      });
  };

  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <div className="flex flex-col h-full w-full items-center mx-3">
      <div className="h-full w-full dnticard">
        <div className="flex flex-col h-4/5 w-full">
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
      <Pagination count={10} variant="outlined" color="primary" />
    </div>
  );
}
