import PostRow from "../../1_molecules/PostRow";
import ReviewRow from "../../1_molecules/ReviewRow";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <div className="h-36">
        <p>{props.item.description}</p>
      </div>
    </Paper>
  );
}

export default function BoardMainComponent() {
  const youtubeItems = [
    { id: 1, name: "item1", description: "자취남 영상" },
    { id: 2, name: "item2", description: "자취남 영상" },
    { id: 3, name: "item3", description: "자취남 영상" },
    { id: 4, name: "item4", description: "자취남 영상" },
    { id: 5, name: "item5", description: "자취남 영상" },
  ];

  async function getBoard(page) {
    await axios.get(`/board?page=${page - 1}`).then((res) => {
      console.log(res.data);
      setBoardList(res.data.response.content);
    });
  }

  function searchBoard() {
    console.log(guDong)
    axios.get(`/board/search?gu=${guDong.selectedGu==='전체' ? '' : guDong.selectedGu}&dong=${guDong.selectedDong==='전체' ? '' : guDong.selectedDong}&category=0`)
    .then((res) => {
      console.log(res);
      setBoardList(res.data.response.content);
    })
  }

  async function getReview(page) {
    await axios.get(`/review/list?page=${page - 1}&&size=10`).then((res) => {
      console.log(res.data);
      setReviewList(res.data.response);
    });
  }

  const guDong = useSelector((state) => state.guDong);

  const [boardList, setBoardList] = React.useState([]);
  const [reviewList, setReviewList] = React.useState([]);

  useEffect(() => {
    getBoard(1);
    getReview(1);
  }, []);

  useEffect(() => {
    searchBoard();
  }, [guDong])

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
                {boardList &&
                  boardList.map((x) => {
                    return (
                      <PostRow
                        key={x.boardId}
                        Id={x.boardId}
                        title={x.title}
                        writer={x.email}
                        date={x.createdTime.substring(2, 10)}
                        replies={x.commentCount}
                        views={x.hit}
                        likes={x.boardLike}
                      />
                    );
                  })}
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

              <div className="flex flex-col h-2/3 justify-between items-center px-5">
                <div className="flex flex-col h-full w-full">
                  {reviewList &&
                    reviewList.map((x) => {
                      return (
                        <ReviewRow
                          key={x.id}
                          id={x.id}
                          title={x.title}
                          likes={x.reviewLike}
                          tags={["tag1", "tag2"]}
                          score={x.score}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col h-1/3 items-center p-5">
                <div className="flex flex-col h-full w-full justify-start">
                  <p className="font-medium text-2xl">관련 영상</p>
                  <Carousel>
                    {youtubeItems.map((item, i) => (
                      <Item key={i} item={item} />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
