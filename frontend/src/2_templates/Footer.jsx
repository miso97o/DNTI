import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer flex-col-hstart-vstart">
      <div className="frame-33 flex-row-vcenter-hstart">
        <div className="navbarlinktolandingbtn flex-row-vcenter-hcenter">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/cjztbof8gb9-332%3A538?alt=media&token=5271a2e5-96b4-45f0-999d-caca6bc12259"
            alt="Not Found"
            className="maki-town"
          />
          <p className="txt-842">동네TI</p>
        </div>
        <p className="txt-116">
          ssafy A601 신규진 김태하 박예진 양택훈 호인영 황준원
        </p>
      </div>
    </div>
  );
}
