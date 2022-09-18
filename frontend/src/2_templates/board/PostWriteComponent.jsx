import "./PostWriteComponent.css";

export default function ReviewWriteComponent() {
  return (
    <div className="reviewwritepost flex-col-hstart-vstart clip-contents">
      <div className="group-459 flex-col-hcenter">
        <div className="group-8105 flex-col">
          <p className="txt-572">글 작성</p>
          <div className="group-795 flex-col-hcenter">
            <div className="group-374 flex-row-vend">
              <div className="line-5" />
              <p className="txt-123">동</p>
              <p className="txt-197">제목</p>
              <p className="txt-073">작성자</p>
              <p className="txt-456">작성일시</p>
              <p className="txt-9210">좋아요</p>
            </div>
            <div className="group-171 flex-col">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/91y737opfd9-244%3A454?alt=media&token=e1ba9f77-2c49-4b59-a0bd-2d9c29899187"
                alt="Not Found"
                className="stareval"
              />
              <div className="rectangle-66" />
            </div>
            <div className="group-760 flex-row">
              <div className="util-button flex-row-vcenter-hcenter">
                <div className="label-_wrap flex-row-vcenter-hstart">
                  <p className="txt-521 flex-hcenter">등록</p>
                </div>
              </div>
              <div className="util-button-1 flex-row-vcenter-hcenter">
                <div className="label-_wrap flex-row-vcenter-hstart">
                  <p className="txt-292 flex-hcenter">취소</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
