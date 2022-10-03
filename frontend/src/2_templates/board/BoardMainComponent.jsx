import * as React from "react";
import PostRow from "../../1_molecules/PostRow";
import ReviewRow from "../../1_molecules/ReviewRow";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Button } from "@mui/material";
import HotReviewRow from "../../1_molecules/HotReviewRow";
import HotPostRow from "../../1_molecules/HotPostRow";
import Carousel from "../../1_molecules/Carousel";

function Item({ url, thumbnail, title }) {
  return (
    <div
      className=" cursor-pointer"
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
  const guDong = useSelector((state) => state.guDong);
  const [boardList, setBoardList] = React.useState([]);
  const [reviewList, setReviewList] = React.useState([]);
  const [hotBoardList, setHotBoardList] = React.useState([]);
  const [hotReviews, setHotReviews] = React.useState();

  async function getBoard(page) {
    await axios.get(`/board?page=${page - 1}`).then((res) => {
      // console.log(res.data);
      setBoardList(res.data.response.content);
    });
  }

  async function getHotReview() {
    axios
      .get(
        `/review/hot?gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${guDong.selectedDong !== "전체" ? guDong.selectedDong : ""}`
      )
      .then(({ data }) => {
        console.log("hotReview ========");
        console.log(data);
        setHotReviews(data.response);
        console.log(hotReviews);
      });
  }

  async function getHotBoard() {
    axios
      .get(
        `/board/hot?gu=${
          guDong.selectedGu === "전체" ? "" : guDong.selectedGu
        }&dong=${guDong.selectedDong === "전체" ? "" : guDong.selectedDong}`
      )
      .then(({ data }) => {
        setHotBoardList(data.response);
      });
  }

  async function searchBoard() {
    console.log(guDong);
    await axios
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

  async function getReview() {
    await axios
      .get(
        `/review/search?search=title&gu=${
          guDong.selectedGu !== "전체" ? guDong.selectedGu : ""
        }&dong=${
          guDong.selectedDong !== "전체" ? guDong.selectedDong : ""
        }&page=0&size=6`
      )
      .then((res) => {
        console.log(res.data);
        setReviewList(res.data.response.content);
      });
  }

  async function getYoutubeItems(gu) {
    await axios.get(`/youtube/${gu}`).then(({ data }) => {
      console.log(data.response);
      setYoutubeItems(data.response);
    });
  }

  useEffect(() => {
    console.log("BoardMainComponent useEffect([])");
    console.log("boardMain initialize");
    searchBoard();
    getReview(1);
  }, []);

  const mounted = React.useRef(false);
  useEffect(() => {
    console.log("BoardMainComponent useEffect(guDong)");
    if (!mounted.current) mounted.current = true;
    else {
      console.log("guDong changed");
      setTimeout(() => {
        getYoutubeItems(guDong.selectedGu);
        searchBoard();
        getReview();
        getHotReview();
        getHotBoard();
      }, 0);
    }
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

            <div className="flex flex-col h-[40rem] items-center justify-between px-5">
              <div className="h-full w-full dnticard">
                <div className="flex flex-col w-full">
                  {hotBoardList.map((x) => {
                    return (
                      <HotPostRow
                        key={x.boardId + "hotpost"}
                        Id={x.boardId}
                        title={x.title}
                        writer={x.nickname}
                        date={x.createdTime.substring(2, 10)}
                        replies={x.commentCount}
                        views={x.hit}
                        likes={x.boardLike}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-col w-full">
                  {boardList &&
                    boardList.map((x) => {
                      return (
                        <PostRow
                          key={x.boardId + "post"}
                          Id={x.boardId}
                          title={x.title}
                          writer={x.nickname}
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
          </div>
          <div className="flex flex-col w-1/2 h-full">
            <div className="flex flex-col h-full px-3">
              <div className="flex flex-row justify-between items-center p-5">
                <p className="font-medium text-2xl">리뷰게시판</p>
                <Link to="review">
                  <p>더보기...</p>
                </Link>
              </div>
              <div className="flex flex-col h-full w-full justify-between">
                <div className="flex flex-col h-1/2 items-center px-5">
                  <div className="h-[20rem] w-full dnticard">
                    <div className="flex flex-col w-full">
                      {hotReviews &&
                        hotReviews.map((hotReview) => {
                          return (
                            <HotReviewRow
                              key={hotReview.id + "hotReview"}
                              id={hotReview.id}
                              title={hotReview.title}
                              writer={hotReview.email}
                              score={hotReview.score}
                              likes={hotReview.reviewLike}
                            />
                          );
                        })}
                    </div>
                    <div className="flex flex-col w-full">
                      {reviewList &&
                        reviewList.map((x) => {
                          return (
                            <ReviewRow
                              key={x.id + "review"}
                              id={x.id}
                              title={x.title}
                              likes={x.reviewLike}
                              score={x.score}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-1/2 items-center p-5">
                  <div className="flex flex-col h-full w-full justify-start">
                    <p className="font-medium text-2xl mb-5">관련 영상</p>
                    <div className="h-full w-full dnticard">
                      {/* <Carousel className="h-54" navButtonsAlwaysVisible="true">
                        {youtubeItems.map((item) => (
                          <Item
                            key={item.youtubeId}
                            url={item.url}
                            thumbnail={item.thumbnail}
                            title={item.title}
                          />
                        ))}
                      </Carousel> */}
                      <Carousel></Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
