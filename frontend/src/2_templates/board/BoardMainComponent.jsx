import * as React from "react";
import PostRow from "../../1_molecules/PostRow";
import ReviewRow from "../../1_molecules/ReviewRow";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Item({ url, thumbnail, title }) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        window.open(url);
      }}
    >
      <Paper>
        <div className="h-36">
          <img src={thumbnail} alt="유튜브 썸네일" />
        </div>
        <h2>{title}</h2>
      </Paper>
    </div>
  );
}

export default function BoardMainComponent() {
  const [youtubeItems, setYoutubeItems] = React.useState([]);

  async function getBoard(page) {
    await axios.get(`/board?page=${page - 1}`).then((res) => {
      // console.log(res.data);
      setBoardList(res.data.response.content);
    });
  }

  function searchBoard() {
    console.log(guDong);
    axios
      .get(
        `/board/search?gu=${
          guDong.selectedGu === "전체" ? "" : guDong.selectedGu
        }&dong=${
          guDong.selectedDong === "전체" ? "" : guDong.selectedDong
        }&category=0`
      )
      .then((res) => {
        console.log(res);
        setBoardList(res.data.response.content);
      });
  }

  async function getReview(page) {
    await axios.get(`/review/list?page=${page - 1}&&size=10`).then((res) => {
      // console.log(res.data);
      setReviewList(res.data.response);
    });
  }

  async function getYoutubeItems(gu) {
    await axios.get(`/youtube/${gu}`).then(({ data }) => {
      console.log(data.response);
      setYoutubeItems(data.response);
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
    getYoutubeItems(guDong.selectedGu);
    searchBoard();
  }, [guDong]);

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
                        writer={x.nickname}
                        date={x.createdTime.substring(0, 10)}
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

              <div className="flex flex-col h-1/2 justify-between items-center px-5">
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
              <div className="flex flex-col h-1/2 items-center p-5">
                <div className="flex flex-col h-full w-full justify-start">
                  <p className="font-medium text-2xl">관련 영상</p>
                  <Carousel navButtonsAlwaysVisible="true">
                    {youtubeItems.map((item) => (
                      <Item
                        key={item.youtubeId}
                        url={item.url}
                        thumbnail={item.thumbnail}
                        title={item.title}
                      />
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
