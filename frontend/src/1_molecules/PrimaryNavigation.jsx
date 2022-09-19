import { Link } from "react-router-dom";

function PrimaryNavigation() {
  return (
    <div>
      <div>
        <div>
          <Link to={`dnti`} style={{ textDecoration: "none" }}>
            <p>동네TI</p>
          </Link>
        </div>
        <div>
          <Link to={`dnrecommend`}>
            <p>동네추천</p>
          </Link>
        </div>
        <div>
          <Link to={`kmMap`}>
            <p>1KM</p>
          </Link>
        </div>
        <div>
          <Link to={`board`}>
            <p>게시판</p>
          </Link>
        </div>
        <Link to={`mypage`}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m3va4v13wz-I22%3A104%3B22%3A44?alt=media&token=1f92b154-97c5-41c3-829c-1cdd04119c37"
            alt="Not Found"
          />
        </Link>
      </div>
    </div>
  );
}

export default PrimaryNavigation;
