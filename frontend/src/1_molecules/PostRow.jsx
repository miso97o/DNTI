import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import CertifiedMark from "../0_atoms/Icon/CertifiedMark.png";

export default function PostRow({
  Id,
  title,
  writer,
  date,
  replies,
  views,
  likes,
  isCertified,
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
      <div className="flex flex-row h-8 w-full items-center p-5 border-b-slate-200 border-b-2 box-border hover:bg-purple-200">
        <div className="flex flex-row w-full items-stretch justify-between">
          <div className="flex flex-row items-center w-7/12">
            {isCertified && (
              <img src={CertifiedMark} alt="인증 마크" className="w-6 mr-2" />
            )}
            <p className="text-ellipsis overflow-hidden font-bold">{title}</p>
          </div>
          <div className="grid grid-cols-11 justify-end items-center w-5/12 text-sm">
            <div className="col-span-3 flex flex-row items-center justify-end mr-2">
              <p>{writer}</p>
            </div>

            <div className="col-span-2 flex flex-row items-center ml-1 justify-start">
              <ChatBubbleOutlineOutlinedIcon fontSize="small" className="text-gray-700" />
              <p className="ml-0.5">{replies}</p>
            </div>
            <div className="col-span-2 flex flex-row items-center ml-1 justify-start">
              <VisibilityOutlinedIcon fontSize="small" className="text-gray-700" />
              <p className="ml-0.5">{views}</p>
            </div>
            <div className="col-span-2 flex flex-row items-center ml-1 justify-start">
              <FavoriteBorderOutlinedIcon fontSize="small" className="text-gray-700" />
              <p className="ml-0.5">{likes}</p>
            </div>
            <p className="col-span-2 ml-1 flex justify-end">{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
