import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

function Progressbar() {
  return (
    <img
      src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/iz8zxnh4p6l-225%3A703?alt=media&token=8ac25855-a56f-471e-9aa5-5eeb9de7c66e"
      alt="Not Found"
      className="progressbar"
    />
  );
}

function TestSelectCard({ imgsrc, description, label }) {
  return (
    <Link to={`/dnti/result`} style={{ textDecoration: "none" }}>
      <Card variant="outlined" className="m-5">
        <div className="flex flex-col items-center">
          <img src={imgsrc} alt="Not Found" className="image" />
          <p className="font-medium text-xl m-1">{description}</p>
          <p className="font-medium text-xl m-1">{label}</p>
        </div>
      </Card>
    </Link>
  );
}

export default function DntiTestComponent() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <p className="font-medium text-5xl m-10">DNTI 검사페이지</p>
        <Progressbar />
      </div>
      <div className="flex flex-row items-center m-10">
        <TestSelectCard
          imgsrc="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/iz8zxnh4p6l-I225%3A654%3B225%3A649?alt=media&token=e60af54b-75fc-4fca-a1e8-b3acc629cc04"
          description="나는 자연이 좋다!"
          label="자연주의자"
        />
        <p className="font-medium text-5xl m-3">VS</p>
        <TestSelectCard
          imgsrc="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/iz8zxnh4p6l-I225%3A661%3B225%3A649?alt=media&token=00884af7-801b-4719-921e-bb6f7a0544ed"
          description="노는게 제일 좋아"
          label="나는야 문화인"
        />
      </div>
    </div>
  );
}
