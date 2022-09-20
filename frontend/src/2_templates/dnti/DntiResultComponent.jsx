import "./DntiResultComponent.css";

function DntiResultCard({ imgsrc, type }) {
  return (
    <div className="frame-30 flex-row-vstart-hstart">
      <div className="frame-29 flex-col-hcenter-vstart">
        <img src={imgsrc} alt="Not Found" className="ellipse-1" />
        <div className="frame-28 flex-row-vstart-hstart">
          <p className="txt-426 flex-hcenter">{type}</p>
          <p className="txt-313 flex-hcenter">이시네요!</p>
        </div>
        <div className="util-button flex-row-vcenter-hcenter">
          <div className="label-_wrap flex-row-vcenter-hstart">
            <p className="txt-996 flex-hcenter">동네 확인하기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DntiResultComponent() {
  return (
    <div className="dntiresult flex-col-hstart-vstart clip-contents">
      <div className="rectangle-39" />
      <p className="txt-648">DNTI 결과</p>
      <DntiResultCard
        imgsrc="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ab4a5y0k9me-252%3A439?alt=media&token=f3d6284b-e39c-428f-9d09-5965b9ab1c36"
        type="유형 1"
      />
    </div>
  );
}
