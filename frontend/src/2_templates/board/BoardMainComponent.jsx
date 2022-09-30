import PostRow from "../../1_molecules/PostRow";
import ReviewRow from "../../1_molecules/ReviewRow";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";

function YoutubeItem({ title }) {
  return (
    <div className="flex justify-center items-center h-64 w-full m-15px">
      {title}
    </div>
  );
}

export default function BoardMainComponent() {
  const youtubeItems = [
    { id: 1, title: "item1" },
    { id: 2, title: "item2" },
    { id: 3, title: "item3" },
    { id: 4, title: "item4" },
    { id: 5, title: "item5" },
  ];

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  async function getBoard(page) {
    await axios.get(`/board?page=${page-1}`)
      .then((res) => {
        console.log(res.data);
        setBoardList(res.data.response.content);
      })
  }

  const [boardList, setBoardList] = React.useState([]);

  useEffect(() => {
    getBoard(1)
  },[])

  return (
    <div className="flex flex-col h-full w-4/5 items-center">
      <div className="flex flex-col h-full w-full items-center">
        <div className="flex flex-row w-full justify-center h-full">
          <div className="flex flex-col w-1/2 h-full px-3">
            <div className="flex flex-row justify-between items-center p-5">
              <p className="font-medium text-2xl">자유게시판</p>

              <Link to="post">
                <p>더보기...</p>
              </Link>
            </div>

            <div className="flex flex-col h-full items-center justify-between px-5">
              <div className="flex flex-col h-full w-full">
                {boardList.map((x => {
                return (
                  <PostRow
                    Id={x.boardId}
                    title={x.title}
                    writer={x.nickname}
                    date={x.createdTime.substring(0,10)}
                    replies={x.commentCount}
                    views={x.hit}
                    likes={x.boardLike}
                  />
                )}))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 h-full">
            <div className="flex flex-col h-full px-3">
              <div className="flex flex-row justify-between items-center p-5">
                <p className="font-medium text-2xl">리뷰 게시판</p>
                <Link to="review">
                  <p>더보기...</p>
                </Link>
              </div>

              <div className="flex flex-col h-full justify-between items-center px-5">
                <div className="flex flex-col h-full w-full">
                  <ReviewRow
                    key={1}
                    title="제목을 뭐로 할까요"
                    keywords="# 키워드"
                    date="2022-09-05"
                    views="500"
                    likes="333"
                    tags={["tag1", "tag2"]}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center p-5">
                <div className="flex flex-row w-full justify-start">
                  <p className="font-medium text-2xl">관련 영상</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
