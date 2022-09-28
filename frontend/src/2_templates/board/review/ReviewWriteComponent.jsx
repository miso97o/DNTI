import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Rating, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ReviewWriteComponent() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.userId == null) {
      alert("로그인이 필요합니다.");
      // 로그인되어있지 않은 경우, 로그인 화면으로 redirect
      navigate("/login", { replace: true });
    }
  });

  const [postContents, setPostContents] = React.useState("");
  const handlePostContentsChange = (event) => {
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
            <div className="flex flex-row justify-between">
              <p className="txt-123">{user.dong}</p>
              <p className="txt-197">제목</p>
              <p className="txt-073">{user.nickname}</p>
            </div>
            <div className="flex h-4/5 p-5">
              <TextField
                multiline
                fullWidth
                minRows={10}
                value={postContents}
                onChange={handlePostContentsChange}
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
