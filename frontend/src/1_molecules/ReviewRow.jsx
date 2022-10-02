import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

export default function ReviewRow({ id, title, datetime, score, likes }) {
  return (
    <Link to="/board/review/view" state={{ reviewId: id }}>
      <div className="flex flex-row w-full justify-between items-center px-1 hover:linehover">
        <div className="flex flex-row w-3/5 items-stretch justify-between">
          <p>{title}</p>
        </div>
        <div className="flex flex-row w-2/5 justify-end items-center">
          <Rating value={score} size="small" readOnly />
          <p>{datetime}</p>

          <div className="flex flex-row items-center ml-3">
            <div className="px-1">
              <FavoriteIcon sx={{ color: pink[500] }} />
            </div>

            <p>{likes}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
