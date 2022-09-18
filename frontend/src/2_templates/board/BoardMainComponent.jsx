// import "./BoardMainComponent.css";
import PostRow from "../../1_molecules/PostRow";

function ReviewRow({ title, keywords, date, views, likes }) {
  return (
    <div className="postrow flex-row-vcenter-hsb">
      <div className="postrowtextarea flex-row-vcenter-hsb">
        <div className="frame-41 flex-row-vcenter-hstart">
          <p className="txt-758">{title}</p>
        </div>
        <div className="frame-43 flex-row-vcenter-hstart">
          <div className="frame-42 flex-row-vcenter-hstart">
            <p className="txt-940">{keywords}</p>
          </div>
          <div className="hotrowinfoarea flex-row-vcenter-hcenter">
            <p className="txt-413">{date}</p>

            <div className="visibility-1 flex-row-vcenter-hstart">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/0vz9ap57ezz-332%3A499?alt=media&token=86c2d6ba-fc6f-47dd-9f8f-ea848fb8d667"
                alt="Not Found"
                className="visibility"
              />
              <p className="txt-1015">{views}</p>
            </div>
            <div className="hotrowlikearea flex-row-vcenter-hsb">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/0vz9ap57ezz-332%3A502?alt=media&token=68c5b29c-2982-404f-914f-e08240fef350"
                alt="Not Found"
                className="hotrowlikelogo"
              />
              <p className="txt-024">{likes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BoardMainComponent() {
  return (
    <div className="boardmain flex-col-hstart-vstart clip-contents">
      <div className="group-883 flex-col-hcenter">
        <p className="txt-790 flex-hcenter">
          Green Smart City, 강남! 아름다운 구민과 함께 어울리는 도시!
        </p>
        <div className="recentboard flex-col-hstart-vstart">
          <div className="frame-47 flex-row-vstart-hstart">
            <div className="frame-44 flex-col-hcenter-vstart">
              <div className="frame-9 flex-row-vend-hsb">
                <p className="txt-854">자유게시판</p>
                <div className="writepostbtn flex-col-hcenter-vcenter">
                  <div className=" flex-row-vcenter-hcenter">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-198%3A417?alt=media&token=ea00624b-8ee3-4858-b186-178bab54302a"
                      alt="Not Found"
                      className="pencil-1"
                    />
                    <p className="txt-012">글쓰기</p>
                  </div>
                </div>
              </div>
              <div className="recentboardbox flex-col-hstart-vstart">
                <div className="recentboard flex-col-hstart-vstart">
                  <div className="recentboardcontentarea flex-col-hstart-vstart">
                    <PostRow
                      title="제목을 뭐로 할까요"
                      date="2022-09-05"
                      replies="20"
                      views="500"
                      likes="333"
                    />
                    <PostRow
                      title="제목을 뭐로 할까요"
                      date="2022-09-05"
                      replies="20"
                      views="500"
                      likes="333"
                    />
                  </div>
                  <div className="recentboardbottomarea flex-row-vend-hcenter">
                    <div className="recentboardpaginationarea flex-row-vcenter-hsb">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-198%3A398?alt=media&token=32d2411a-cf3f-4021-8ac3-886a852075be"
                        alt="Not Found"
                        className="arrowprev"
                      />
                      <p className="txt-739">1</p>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-198%3A403?alt=media&token=3611a4ff-725d-47f8-bf3b-d9a106e4dde6"
                        alt="Not Found"
                        className="arrowprev"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-46 flex-col-hcenter-vstart">
              <div className="frame-45 flex-col-hcenter-vstart">
                <div className="frame-10 flex-row-vend-hsb">
                  <p className="txt-854">리뷰 게시판</p>
                  <div className="writepostbtn flex-col-hcenter-vcenter">
                    <div className="flex-row-vcenter-hcenter">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-198%3A627?alt=media&token=892d501d-a0d8-46a3-9dbb-a6b9ac3e3b07"
                        alt="Not Found"
                        className="pencil-1"
                      />
                      <p className="txt-012">글쓰기</p>
                    </div>
                  </div>
                </div>
                <div className="reviewboardbox flex-col-hcenter-vstart">
                  <div className="reviewboard flex-col-hcenter-vstart">
                    <div className="reviewboardcontentarea flex-col-hcenter-vstart">
                      <ReviewRow
                        title="제목을 뭐로 할까요"
                        keywords="# 키워드"
                        date="2022-09-05"
                        views="500"
                        likes="333"
                      />
                      <ReviewRow
                        title="제목을 뭐로 할까요"
                        keywords="# 키워드"
                        date="2022-09-05"
                        views="500"
                        likes="333"
                      />
                    </div>
                    <div className="reviewboardbottomarea flex-row-vend-hcenter">
                      <div className="recentboardpaginationarea flex-row-vcenter-hsb">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-198%3A495?alt=media&token=f44fe766-8723-40c2-84a7-834c7b53200c"
                          alt="Not Found"
                          className="arrowprev"
                        />
                        <p className="txt-739">1</p>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-198%3A497?alt=media&token=ca3d07cd-37ab-4457-bdf2-d22307abe2af"
                          alt="Not Found"
                          className="arrowprev"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="frame-31 flex-col-hcenter-vstart">
                <div className="frame-33 flex-row-vstart-hstart">
                  <p className="txt-591">관련 영상</p>
                </div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/i8miex9s01-328%3A631?alt=media&token=c0e8dbc3-ea0c-4973-bd6a-12d8b83d4393"
                  alt="Not Found"
                  className="_-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
