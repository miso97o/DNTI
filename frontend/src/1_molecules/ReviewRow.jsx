import style from "./ReviewRow.module.css";

export default function ReviewRow() {
  return (
    <div className="reviewrow flex-row-vcenter-hcenter">
      <div className="reviewrowtitlearea flex-row-vcenter-hstart">
        <p className="txt-131">이만한 동네 없는듯</p>
      </div>
      <div className="reviewrowtitlearea flex-row-vcenter-hstart">
        <p className="txt-537"># 가성비</p>
      </div>
      <div className="hotrowinfoarea flex-row-vcenter-hcenter">
        <div className="hotrowlikearea flex-row-vcenter-hsb">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/24olhau3htb-198%3A531?alt=media&token=04c043b4-b95c-4349-b8ee-f518c9af2d6d"
            alt="Not Found"
            className="hotrowlikelogo"
          />
          <p className="txt-537">333</p>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/24olhau3htb-379%3A432?alt=media&token=6e12f410-364c-46b3-b44e-cefb84f479bc"
          alt="Not Found"
          className="stareval"
        />
        <p className="txt-537">2022-09-05</p>
      </div>
    </div>
  );
}
