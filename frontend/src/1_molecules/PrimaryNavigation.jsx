import { Link } from "react-router-dom";

export default function PrimaryNavigation() {
  return (
    <div>
      <h1>This is PrimaryNavigation</h1>
      <Link to={`dnti`}>dnti</Link>
      <Link to={`dnrecommend`}>동네추천</Link>
      <Link to={`kmMap`}>1km</Link>
      <Link to={`myPage`}>마이페이지</Link>
      <Link to={`board`}>게시판</Link>
    </div>
  );
}
