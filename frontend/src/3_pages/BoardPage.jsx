import { Outlet, Link } from "react-router-dom";

export default function Boardpage() {
  return (
    <div>
      <h1>This is BoardPage</h1>
      <Link to={``}>게시판 메인</Link>
      <Link to={`postview`}>글 보기</Link>
      <Link to={`postwrite`}>글 쓰기</Link>
      <Link to={`reviewview`}>리뷰 보기</Link>
      <Link to={`reviewwrite`}>리뷰 쓰기</Link>
      <Outlet />
    </div>
  );
}
