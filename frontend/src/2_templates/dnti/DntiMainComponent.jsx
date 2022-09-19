import { Link } from "react-router-dom";

export default function DntiMainComponent() {
  return (
    <div className="dntimain flex-col-hstart-vstart clip-contents">
      <div className="group-133 flex-col-hcenter">
        <div className="frame-49 flex-col-hcenter-vstart">
          <div className="frame-51 flex-col-hcenter-vstart">
            <div className="frame-50 flex-row-vstart-hstart">
              <p className="txt-860">DNTI</p>
            </div>
            <div className="frame-49 flex-col-hcenter-vstart">
              <p className="txt-644">
                DNTI 검사는 15개의 문항으로 이루어져 있습니다.
              </p>
              <p className="txt-464">
                둘 중에 가장 본인과 가깝다고 생각하는 쪽을 선택해주세요.
              </p>
            </div>
          </div>
          <Link to={`test`} style={{ textDecoration: "none" }}>
            <button className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
              검사 시작
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
