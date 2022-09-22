import PostRow from "../../1_molecules/PostRow";
import ReviewRow from "../../1_molecules/ReviewRow";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

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

  return (
    <div className="container mx-auto flex flex-col h-full w-screen items-center">
      <div className="flex flex-col h-full w-screen items-center">
        <div className="flex flex-row w-screen justify-center h-full">
          <div className="flex flex-col w-1/2 h-full">
            <div className="flex flex-row justify-between items-center m-10">
              <p className="font-medium text-2xl">자유게시판</p>

              <Link to="post">
                <p>더보기...</p>
              </Link>
            </div>

            <div className="flex flex-col h-full items-center justify-between m-10">
              <div className="flex flex-col h-full w-full">
                <PostRow
                  title="제목을 뭐로 할까요"
                  writer="tttkim"
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
            </div>
          </div>
          <div className="flex flex-col w-1/2 h-full">
            <div className="flex flex-col h-full">
              <div className="flex flex-row justify-between items-center m-10">
                <p className="font-medium text-2xl">리뷰 게시판</p>
                <Link to="review">
                  <p>더보기...</p>
                </Link>
              </div>

              <div className="flex flex-col h-full justify-between items-center m-10">
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
              <div className="flex flex-col items-start m-10">
                <p className="font-medium text-2xl">관련 영상</p>
                <Carousel breakPoints={breakPoints}>
                  {youtubeItems &&
                    youtubeItems.map((item) => (
                      <YoutubeItem key={item.id} title={item.title} />
                    ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
