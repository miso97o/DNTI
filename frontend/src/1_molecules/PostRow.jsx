import { Link } from "react-router-dom";

export default function PostRow({
  title,
  writer,
  date,
  replies,
  views,
  likes,
}) {
  return (
    <Link to="/board/postview">
      <div className="flex flex-row w-full items-center">
        <div className="flex flex-row w-full items-stretch justify-between">
          <div className="flex flex-row items-center w-1/2">
            <p>{title}</p>
          </div>
          <div className="flex flex-row justify-between items-center w-1/2">
            <div className="flex flex-row items-center w-1/10">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-357%3A682?alt=media&token=d1643e84-9fe3-48b9-b80a-2ce3eb03efba"
                alt="Not Found"
              />
              <p>{writer}</p>
            </div>
            <p>{date}</p>
            <div className="flex flex-row items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-357%3A682?alt=media&token=d1643e84-9fe3-48b9-b80a-2ce3eb03efba"
                alt="Not Found"
              />
              <p>{replies}</p>
            </div>
            <div className="flex flex-row items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-332%3A499?alt=media&token=ee5cbef4-b128-489b-979f-bd01554717ca"
                alt="Not Found"
              />
              <p>{views}</p>
            </div>
            <div className="flex flex-row items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-332%3A502?alt=media&token=99d639ef-8fa1-4d91-9e35-bcaf8184eb41"
                alt="Not Found"
              />
              <p>{likes}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
