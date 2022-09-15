import "./DntiTestComponent.css";

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
    <div className="testselectcard flex-col-hcenter-vstart">
      <img src={imgsrc} alt="Not Found" className="image" />
      <p className="txt-492 flex-hcenter">{description}</p>
      <p className="txt-774 flex-hcenter">{label}</p>
    </div>
  );
}

export default function DntiTestComponent() {
  return (
    <div className="dntifirstpage flex-col-hstart-vstart clip-contents">
      <div className="rectangle-39" />
      <div className="frame-32 flex-col-hcenter-vstart">
        <div className="frame-31 flex-row-vcenter-hstart">
          <p className="txt-057">DNTI 검사페이지</p>
          <Progressbar />
        </div>
        <div className="testquestionarea flex-row-vcenter-hstart">
          <TestSelectCard
            imgsrc="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/iz8zxnh4p6l-I225%3A654%3B225%3A649?alt=media&token=e60af54b-75fc-4fca-a1e8-b3acc629cc04"
            description="나는 자연이 좋다!"
            label="자연주의자"
          />
          <p className="txt-245 flex-hcenter">VS</p>
          <TestSelectCard
            imgsrc="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/iz8zxnh4p6l-I225%3A661%3B225%3A649?alt=media&token=00884af7-801b-4719-921e-bb6f7a0544ed"
            description="노는게 제일 좋아"
            label="나는야 문화인"
          />
        </div>
      </div>
    </div>
  );
}
