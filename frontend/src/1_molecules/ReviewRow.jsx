import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function ReviewRow({ id, title, datetime, score, likes }) {
  return (
    <Link to="/board/review/view" state={{ reviewId: id }}>
      <div className="flex flex-row h-8 w-full justify-between items-center px-1 hover:linehover border-b-slate-200 border-b-2 box-border">
        <div className="flex flex-row w-3/5 items-stretch justify-between">
          <p>{title}</p>
        </div>
        <div className="flex flex-row w-2/5 justify-end items-center text-sm">
          <Rating value={score} size="small" readOnly />
          <p>{datetime}</p>

          <div className="flex flex-row items-center ml-3">
            <div className="px-1"></div>
            <FavoriteBorderOutlinedIcon fontSize="small" />
            <p>{likes}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
