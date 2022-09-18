import { Outlet, Link } from "react-router-dom";

export default function Boardpage() {
  const gulist = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];
  return (
    <div>
      <Link to={``}>게시판 메인</Link>
      <Link to={`postview`}>글 보기</Link>
      <Link to={`postwrite`}>글 쓰기</Link>
      <Link to={`reviewview`}>리뷰 보기</Link>
      <Link to={`reviewwrite`}>리뷰 쓰기</Link>
      <div className="frame-40 flex-row-vcenter-hstart">
        <select>
          {gulist.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
      <Outlet />
    </div>
  );
}
