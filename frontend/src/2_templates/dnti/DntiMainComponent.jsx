import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function DntiMainComponent() {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center">
        <p className="font-medium text-5xl m-20">DNTI</p>
        <div className="flex flex-col items-center">
          <p className="font-medium text-xl m-5">
            DNTI 검사는 15개의 문항으로 이루어져 있습니다.
          </p>
          <p className="font-medium text-xl m-5">
            둘 중에 가장 본인과 가깝다고 생각하는 쪽을 선택해주세요.
          </p>
        </div>
        <Link to={`test`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            className="m-10 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
          >
            검사 시작
          </Button>
        </Link>
      </div>
    </div>
  );
}
