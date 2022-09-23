import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

function ReviewTag({ tagText }) {
  return <p className="mx-2">{tagText}</p>;
}

export default function ReviewRow({
  title,
  datetime,
  writer,
  tags,
  score,
  likes,
}) {
  return (
    <Link to="/board/review/view">
      <div className="flex flex-row w-full items-center">
        <div className="flex flex-row w-1/3 items-stretch justify-between">
          <p>{title}</p>
        </div>
        <div className="flex flex-row w-1/3 items-center">
          {tags &&
            tags.map((tag) => {
              return <ReviewTag tagText={tag} key={tag} />;
            })}
        </div>
        <div className="flex flex-row w-1/3 justify-between items-center">
          <Rating value={score} readOnly />
          <p>{datetime}</p>
          <div className="flex flex-row items-center">
            <div className="px-1">
              <FavoriteIcon sx={{ color: pink[500] }} />
            </div>

            <p className="txt-537">{likes}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
