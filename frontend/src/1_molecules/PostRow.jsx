import style from "./PostRow.module.css";

export default function PostRow({ title, date, replies, views, likes }) {
  return (
    <div className={`${style.postRow} ${style.flexRowSpaceBetween}`}>
      <div className={`${style.wrapper} ${style.flexRowSpaceBetween}`}>
        <div className={style.textArea}>
          <p className={style.title}>{title}</p>
        </div>
        <div className={`${style.infoArea} ${style.flexRowSpaceBetween}`}>
          <p className={style.infoTxt}>{date}</p>
          <div className={`${style.replies} ${style.flexRowSpaceBetween}`}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-357%3A682?alt=media&token=d1643e84-9fe3-48b9-b80a-2ce3eb03efba"
              alt="Not Found"
              className={style.repliesIcon}
            />
            <p className={style.infoTxt}>{replies}</p>
          </div>
          <div className={`${style.views} ${style.flexRowSpaceBetween}`}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-332%3A499?alt=media&token=ee5cbef4-b128-489b-979f-bd01554717ca"
              alt="Not Found"
              className={style.viewsIcon}
            />
            <p className={style.infoTxt}>{views}</p>
          </div>
          <div className={`${style.likes} ${style.flexRowSpaceBetween}`}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/jyb5vmsqhak-332%3A502?alt=media&token=99d639ef-8fa1-4d91-9e35-bcaf8184eb41"
              alt="Not Found"
              className={style.likesIcon}
            />
            <p className={style.infoTxt}>{likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
