import Pagination from "@mui/material/Pagination";
import ReviewRow from "../../1_molecules/ReviewRow";

export default function ReviewMainComponent() {
  return (
    <div className="container mx-auto flex flex-col w-screen items-center">
      <div className="flex flex-row w-4/5 justify-between items-center">
        <p>자유 게시판</p>
        <p>글쓰기</p>
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex flex-col w-full">
          <ReviewRow />
        </div>
        <div className="flex flex-row justify-center">
          <p>검색창</p>
        </div>
        <Pagination count={10} variant="outlined" color="primary" />
      </div>
    </div>
  );
}