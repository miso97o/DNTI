import { Outlet, Link } from "react-router-dom";

export default function DntiPage() {
  return (
    <div>
      <h1>This is DntiPage</h1>
      <Link to={``}>테스트 메인 페이지</Link>
      <Link to={`test`}>테스트 페이지</Link>
      <Link to={`result`}>결과 페이지</Link>
      <Outlet />
    </div>
  );
}
