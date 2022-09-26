import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Rating, TextField } from "@mui/material";

export default function ReviewWriteComponent() {
  const [postContents, setPostContents] = React.useState("");
  const handleChange = (event) => {
    setPostContents(event.target.value);
  };
  const [totalScore, setTotalScore] = React.useState(2);
  const [rentScore, setRentScore] = React.useState(2);
  const [infraScore, setInfraScore] = React.useState(2);
  const [envScore, setEnvScore] = React.useState(2);
  const [safeScore, setSafeScore] = React.useState(2);
  return (
    <div className="reviewwritepost flex-col-hstart-vstart clip-contents">
      <div className="group-459 flex-col-hcenter">
        <div className="group-8105 flex-col">
          <p className="txt-572">리뷰 글 작성</p>
          <div className="group-795 flex-col-hcenter">
            <div className="group-374 flex-row-vend">
              <div className="line-5" />
              <p className="txt-123">동</p>
              <p className="txt-197">제목</p>
              <p className="txt-073">작성자</p>
              <p className="txt-456">작성일시</p>
              <p className="txt-9210">좋아요</p>
            </div>
            <div className="flex h-4/5 p-5">
              <TextField
                multiline
                fullWidth
                minRows={10}
                value={postContents}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-row">
                <p>총점</p>
                <Rating name="total" value={totalScore} readOnly />
              </div>
              <div className="flex flex-row">
                <p>임대료</p>
                <Rating name="total" value={rentScore} />
              </div>
              <div className="flex flex-row">
                <p>인프라</p>
                <Rating name="total" value={infraScore} />
              </div>
              <div className="flex flex-row">
                <p>환경</p>
                <Rating name="total" value={envScore} />
              </div>
              <div className="flex flex-row">
                <p>안전</p>
                <Rating name="total" value={safeScore} />
              </div>
            </div>

            <div className="flex flex-row w-full justify-center mt-10">
              <Link to="/board/review/view">
                <Button>등록</Button>
              </Link>
              <Link to="/board/review/view">
                <Button>취소</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
