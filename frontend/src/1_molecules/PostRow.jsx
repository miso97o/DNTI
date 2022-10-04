import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PostRow({
  Id,
  title,
  writer,
  date,
  replies,
  views,
  likes,
}) {
  const user = useSelector((state) => state.user);
  function increaseHit() {
    axios.patch(`/board/hit/${Id}`).then((res) => {
      console.log(res.data);
      views++;
    });
  }

  return (
    <Link
      to="/board/postview"
      state={{ boardId: Id }}
      onClick={() => {
        increaseHit();
      }}
    >
      <div className="flex flex-row h-8 w-full items-center p-5 border-b-slate-200 border-b-2 box-border hover:hover:bg-gray-200">
        <div className="flex flex-row w-full items-stretch justify-between">
          <div className="flex flex-row items-center w-1/3">
            <p>{title}</p>
          </div>
          <div className="flex flex-row justify-end items-center w-2/3 text-sm">
            <div className="flex flex-row items-center w-1/3">
              <PersonIcon />
              <p>{writer}</p>
            </div>
            <p>{date}</p>
            <div className="flex flex-row items-center ml-3">
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              <p>{replies}</p>
            </div>
            <div className="flex flex-row items-center ml-3">
              <VisibilityOutlinedIcon fontSize="small" />
              <p>{views}</p>
            </div>
            <div className="flex flex-row items-center ml-3">
              <FavoriteBorderOutlinedIcon fontSize="small" />
              <p>{likes}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
