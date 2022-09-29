import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";



export default function PostRow({
  Id,
  title,
  writer,
  date,
  replies,
  views,
  likes,
}) {


  return (
    <Link to="/board/postview"
      state={{boardId: Id}}
    >
      <div className="flex flex-row w-full items-center p-1">
        <div className="flex flex-row w-full items-stretch justify-between">
          <div className="flex flex-row items-center w-1/3">
            <p>{title}</p>
          </div>
          <div className="flex flex-row justify-between items-center w-2/3">
            <div className="flex flex-row items-center w-1/3">
              <PersonIcon />

              <p>{writer}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <p>{date}</p>
              <div className="flex flex-row items-center">
                <ChatBubbleOutlineOutlinedIcon />
                <p>{replies}</p>
              </div>
              <div className="flex flex-row items-center">
                <VisibilityOutlinedIcon />
                <p>{views}</p>
              </div>
              <div className="flex flex-row items-center">
                <FavoriteIcon sx={{ color: pink[500] }} />
                <p>{likes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
