import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function HotReviewRow({
  id,
  title,
  datetime,
  score,
  hit,
  nickname,
  likes,
}) {
  return (
    <Link to="/board/review/view" state={{ reviewId: id }}>
      <div className="flex flex-row h-8 w-full justify-between items-center p-5 bg-purple-200 hover:bg-purple-300 border-b-slate-200 border-b-2 box-border">
        <div className="flex flex-row w-3/5 items-stretch justify-between">
          <p className="text-ellipsis overflow-hidden">{title}</p>
        </div>
        <div className="flex flex-row w-2/5 justify-end items-center text-sm">
          <p className="mr-2">{nickname}</p>
          <Rating value={score} size="small" readOnly />
          <p>{datetime}</p>

          <div className="flex flex-row w-[6rem] justify-between items-center ml-3">
            <div className="flex flex-row justify-between">
              <VisibilityOutlinedIcon fontSize="small" />
              <p className="w-[2rem]">{hit}</p>
            </div>
            <div className="flex flex-row justify-between">
              <FavoriteBorderOutlinedIcon fontSize="small" />
              <p className="w-[2rem]">{likes}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
