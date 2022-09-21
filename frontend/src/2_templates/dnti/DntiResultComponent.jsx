import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

function DntiResultCard({ imgsrc, type }) {
  return (
    <Card variant="outlined">
      <div className="flex flex-col items-center m-10">
        <img src={imgsrc} alt="Not Found" className="m-10" />
        <div className="flex flex-row items-center m-10">
          <p className="font-medium text-xl">{type}</p>
          <p className="font-medium text-xl">이시네요!</p>
        </div>
        <div className="util-button flex-row-vcenter-hcenter">
          <Link to={`/dnRecommend`} style={{ textDecoration: "none" }}>
            <Button variant="contained">동네 확인하기</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function DntiResultComponent() {
  return (
    <div className="flex flex-col items-center">
      <p className="font-medium text-5xl m-10">DNTI 결과</p>
      <DntiResultCard
        imgsrc="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ab4a5y0k9me-252%3A439?alt=media&token=f3d6284b-e39c-428f-9d09-5965b9ab1c36"
        type="유형 1"
      />
    </div>
  );
}
