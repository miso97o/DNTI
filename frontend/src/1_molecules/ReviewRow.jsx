import { Link } from "react-router-dom";

function ReviewTag({ tagText }) {
  return <p>{tagText}</p>;
}

export default function ReviewRow({ title, tags, score, likes }) {
  return (
    <Link to="/board/reviewview">
      <div className="flex flex-row w-full items-center">
        <div className="flex flex-row w-full items-stretch justify-between">
          <p>{title}</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          {tags &&
            tags.map((tag) => {
              return <ReviewTag tagText={tag} key={tag} />;
            })}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/24olhau3htb-198%3A531?alt=media&token=04c043b4-b95c-4349-b8ee-f518c9af2d6d"
              alt="Not Found"
              className="hotrowlikelogo"
            />
            <p className="txt-537">{score}</p>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/24olhau3htb-379%3A432?alt=media&token=6e12f410-364c-46b3-b44e-cefb84f479bc"
            alt="Not Found"
            className="stareval"
          />
          <p>{likes}</p>
        </div>
      </div>
    </Link>
  );
}
