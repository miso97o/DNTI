import { Pagination, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReviewRow from "../../../1_molecules/ReviewRow";
export default function ReviewMainComponent() {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex flex-col h-4/5 w-full p-5">
        <ReviewRow
          title="제목을 뭐로 할까요"
          writer="tttkim"
          score={3}
          tags={["#태그"]}
          likes="333"
        />
      </div>
      <div className="flex flex-row justify-center items-center pb-10">
        <TextField variant="outlined" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </div>
      <Pagination count={10} variant="outlined" color="primary" />
    </div>
  );
}
