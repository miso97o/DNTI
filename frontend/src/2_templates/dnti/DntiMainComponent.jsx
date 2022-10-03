import { Link } from "react-router-dom";
export default function DntiMainComponent() {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center">
        <p className="font-bold text-4xl m-20">DNTI 테스트</p>
        <div className="flex flex-col items-center">
          <p className="font-medium text-xl m-5 mb-14 text-center">
            총 6개의 문항으로 이루어져 있습니다.
            <br />둘 중 본인과 더 가깝다고 생각되는 문항을 골라주세요!
          </p>
        </div>
        <Link to={`test`}>
          <button className="bluebtn">검사 시작</button>
        </Link>
      </div>
    </div>
  );
}
