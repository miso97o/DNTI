import * as React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Pagination,
  TextField,
  IconButton,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReviewRow from "../../1_molecules/ReviewRow";

function GuCard({ totalScore, rentScore, infraScore, envScore, safeScore }) {
  console.log(totalScore);
  return (
    <div className="w-2/5 h-1/2 m-5">
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-center">
          <p>강남구</p>
        </div>
        <div className="flex flex-row h-1/2 justify-center">이미지</div>
        <div className="flex flex-row justify-center">#인프라 #중심지</div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <p>총점</p>
            <Rating name="total" value={totalScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>임대료</p>
            <Rating name="total" value={rentScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>인프라</p>
            <Rating name="total" value={infraScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>환경</p>
            <Rating name="total" value={envScore} readOnly />
          </div>
          <div className="flex flex-row">
            <p>안전</p>
            <Rating name="total" value={safeScore} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewMainComponent() {
  const [totalScore, setTotalScore] = React.useState(2);
  const [rentScore, setRentScore] = React.useState(2);
  const [infraScore, setInfraScore] = React.useState(2);
  const [envScore, setEnvScore] = React.useState(2);
  const [safeScore, setSafeScore] = React.useState(2);
  return (
    <div className="container mx-auto flex flex-col h-full w-screen items-center">
      <div className="flex flex-row w-4/5 justify-start">
        <Link to="/board">
          <Button>뒤로</Button>
        </Link>
      </div>
      <div className="flex flex-row w-4/5 justify-between items-center">
        <p>리뷰 게시판</p>
        <Link to="/board/postwrite">
          <Button>글쓰기</Button>
        </Link>
      </div>
      <div className="flex flex-row h-full w-full ">
        <GuCard
          totalScore={totalScore}
          rentScore={rentScore}
          infraScore={infraScore}
          envScore={envScore}
          safeScore={safeScore}
        />
        <div className="h-full w-3/5">
          <div className="flex flex-col h-full w-4/5 items-center">
            <div className="flex flex-col h-4/5 w-full">
              <ReviewRow
                title="제목을 뭐로 할까요"
                writer="tttkim"
                score={3}
                tags={["#태그"]}
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
      </div>
    </div>
  );
}
