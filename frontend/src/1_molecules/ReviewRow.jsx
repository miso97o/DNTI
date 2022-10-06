import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function ReviewRow({
  id,
  nickname,
  title,
  datetime,
  score,
  hit,
  likes,
}) {
  return (
    <Link to="/board/review/view" state={{ reviewId: id }}>
      <div className="flex flex-row h-8 w-full justify-between items-center p-5  hover:bg-purple-200 border-b-slate-200 border-b-2 box-border">
        <Rating value={score} size="small" readOnly />
        <div className="flex flex-row w-1/2 ml-5">
          <p className="text-ellipsis overflow-hidden font-bold">{title}</p>
        </div>
        <div className="flex flex-row w-1/2 justify-end items-center gap-2 text-sm">
          <div className="mr-1">{nickname}</div>
          <div className="flex flex-row gap-1">
            <VisibilityOutlinedIcon fontSize="small" className="text-gray-700" />
            <div className="w-[1.8rem]">{hit}</div>
          </div>
          <div className="flex flex-row gap-1">
            <FavoriteBorderOutlinedIcon fontSize="small" className="text-gray-700" />
            <div className="w-[1.3rem]">{likes}</div>
          </div>
          <div className="ml-1">{datetime}</div>
        </div>
      </div>
    </Link>
  );
}
