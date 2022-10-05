import * as React from "react";
import PostRow from "../../1_molecules/PostRow";
import ReviewRow from "../../1_molecules/ReviewRow";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HotReviewRow from "../../1_molecules/HotReviewRow";
import HotPostRow from "../../1_molecules/HotPostRow";
import Carousel from "../../1_molecules/Carousel";

export default function BoardMainComponent() {
  const [youtubeItems, setYoutubeItems] = React.useState([]);
  const [numOfSlides, setNumOfSlides] = React.useState(1);
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
        console.log(res.data, "리뷰 데이터 확인");
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
            <div className="flex flex-row justify-between items-center mb-2">
              <p className="font-bold text-2xl">자유게시판</p>
              <Link to="post" state={{ from: 0 }}>
                <p className="mr-2 hover:text-dntiblue">더보기 &gt;</p>
              </Link>
            </div>

            <div className="flex flex-col h-[42rem] items-center justify-between">
              <div className="h-full w-full dnticard">
                <div className="flex flex-col w-full">
                  {hotBoardList &&
                    hotBoardList.map((x) => {
                      return (
                        <HotPostRow
                          key={x.boardId + "hotpost"}
                          Id={x.boardId}
                          title={x.title}
                          writer={x.nickname}
                          date={x.createdTime
                            .substring(2, 10)
                            .replaceAll("-", ".")}
                          replies={x.commentCount}
                          views={x.hit}
                          likes={x.boardLike}
                          isCertified={x.isCertified}
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
                          date={x.createdTime
                            .substring(2, 10)
                            .replaceAll("-", ".")}
                          replies={x.commentCount}
                          views={x.hit}
                          likes={x.boardLike}
                          isCertified={x.isCertified}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 h-full">
            <div className="flex flex-col h-full px-3">
              <div className="flex flex-row justify-between items-center mb-2">
                <p className="font-bold text-2xl">리뷰게시판</p>
                <Link to="review" state={{ isFromMyPage: false }}>
                  <p className="mr-2 hover:text-dntiblue">더보기 &gt;</p>
                </Link>
              </div>
              <div className="flex flex-col h-full w-full justify-between">
                <div className="flex flex-col h-1/2 items-center">
                  <div className="h-[27rem] w-full dnticard">
                    <div className="flex flex-col w-full">
                      {hotReviews &&
                        hotReviews.map((hotReview) => {
                          return (
                            <HotReviewRow
                              key={hotReview.id + "hotReview"}
                              id={hotReview.id}
                              title={hotReview.title}
                              writer={hotReview.email}
                              datetime={hotReview.createdTime
                                .substring(2, 10)
                                .replaceAll("-", ".")}
                              score={hotReview.score}
                              likes={hotReview.reviewLike}
                              hit={hotReview.hit}
                              nickname={hotReview.nickname}
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
                              datetime={x.createdTime
                                .substring(2, 10)
                                .replaceAll("-", ".")}
                              likes={x.reviewLike}
                              score={x.score}
                              hit={x.hit}
                              nickname={x.nickname}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-1/2 items-center p-5">
                  <div className="flex flex-col h-full w-full justify-start">
                    <p className="font-bold text-2xl mb-2 mt-8">관련 영상</p>
                    <div className="h-full w-full dnticard">
                      <Carousel data={youtubeItems} />
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
