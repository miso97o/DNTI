import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Reply({
  Id,
  nickname,
  datetime,
  contents,
  mine,
  getReply,
}) {
  const [content, setContent] = React.useState(contents);
  const [editable, setEditable] = React.useState(false);
  const user = useSelector((state) => state.user);
  function handleContent(e) {
    setContent(e);
  }
  function deleteReply() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.delete(`/reply/${Id}`).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) alert("댓글이 삭제되었습니다!");
        console.log(getReply);
        getReply();
      });
    }
  }
  function updateReply() {
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      axios
        .patch(`/reply/${Id}`, {
          email: user.userId,
          contents: content,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) alert("댓글이 수정되었습니다!");
          setEditable(false);
          getReply();
        });
    }
  }
  return (
    <div className="flex flex-col w-full p-3">
      <div className="flex flex-row w-full justify-between items-center border-b-2 border-b-slate-200">
        <p>{nickname}</p>
        <div className="flex flex-row items-center ">
          <p>{datetime}</p>
          {mine ? (
            <p>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="delete"
                onClick={() => {
                  deleteReply();
                }}
              >
                <ClearIcon />
              </IconButton>
              {!editable ? (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="edit"
                  onClick={() => {
                    setEditable(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="confirm"
                  onClick={() => {
                    updateReply();
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
              )}
            </p>
          ) : null}
        </div>
      </div>
      <div className="">
        {editable ? (
          <TextField
            value={content}
            onChange={(e) => {
              handleContent(e.target.value);
            }}
            multiline
          />
        ) : (
          contents
        )}
      </div>
    </div>
  );
}
