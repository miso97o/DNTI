import { Avatar, Button, IconButton } from "@mui/material";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ReviewRow from "../1_molecules/ReviewRow";
import PostRow from "../1_molecules/PostRow";
import Tooltip from "@mui/material/Tooltip";

function ProfileCard() {
  return (
    <div className="flex flex-row w-5/6 h-1/4 justify-center items-start p-10">
      <div className="flex flex-row w-full h-full justify-start items-center">
        <div className="p-5">
          <Avatar src="" sx={{ width: 200, height: 200 }} />
        </div>
        <div className="flex flex-col w-2/3 h-full ">
          <div className="flex flex-row h-1/2 items-end">
            <p className="font-medium text-2xl">어둠의다크니스</p>
            <p className="font-medium text-medium">tttkim</p>
          </div>
          <div className="flex flex-row h-1/2 w-full items-start">
            <div className="flex flex-row w-5/6 items-end">
              <p className="font-medium text-2xl w-1/6">INFP</p>
              <div className="flex flex-row">
                <p className="font-medium text-xl"># 공원 좋아</p>
                <p className="font-medium text-xl"># 문화시설 좋아</p>
              </div>
            </div>
            <Link to="/dnti">
              <Button>다시 검사하기</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <Tooltip title="정보 수정">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="회원 탈퇴">
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

function FrequentPlace() {
  return (
    <div className="flex flex-col h-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="font-medium text-2xl">자주 가는 곳</p>
          <Button>추가</Button>
        </div>
        <p className="txt-959">최대 3곳까지 등록 가능합니다.</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="">멀티캠퍼스</p>
          <p className="">강남구 테헤란로 212</p>
          <IconButton>
            <ClearIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function RecommendRow() {
  return (
    <div className="flex flex-row justify-between">
      <p className="">양재동</p>
      <div className="flex flex-row">
        <p className=""># 공원 좋아</p>
      </div>
      <Link to="/dnRecommend">
        <Button>보러 가기</Button>
      </Link>
    </div>
  );
}

function RecommendedRegion() {
  return (
    <div className="flex flex-col h-1/2">
      <p className="font-medium text-2xl">나와 어울리는 지역</p>
      <div className="flex flex-col">
        <RecommendRow />
      </div>
    </div>
  );
}

function MyRegion() {
  return (
    <div className="flex flex-col h-1/6">
      <div className="flex flex-row">
        <p className="font-medium text-2xl">나의 지역</p>
        <Button>바꾸기</Button>
      </div>
      <div className="flex flex-row place-content-center">
        <p className="">서울특별시 광진구 구의1동</p>
      </div>
    </div>
  );
}

function MyReview() {
  return (
    <div className="flex flex-col h-2/6">
      <div className="flex flex-row items-end">
        <p className="font-medium text-2xl">나의 리뷰</p>
        <Link to="/board/review">
          <p className="txt-542 flex-hcenter">더보기</p>
        </Link>
      </div>
      <div className="flex flex-col">
        <ReviewRow />
      </div>
    </div>
  );
}

function MyPosts() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end">
        <p className="font-medium text-2xl">작성한 글</p>
        <Link to="/board/post">
          <p className="txt-542 flex-hcenter">더보기</p>
        </Link>
      </div>
      <div className="flex flex-col">
        <PostRow />
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <div className="flex flex-col h-full w-screen items-center">
      <div className="flex flex-col w-5/6 h-full items-center">
        <ProfileCard />
        <div className="flex flex-row w-full h-3/4">
          <div className="flex flex-col w-1/2 h-full p-5">
            <FrequentPlace />
            <RecommendedRegion />
          </div>
          <div className="flex flex-col w-1/2 h-full p-5">
            <MyRegion />
            <MyReview />
            <MyPosts />
          </div>
        </div>
      </div>
    </div>
  );
}
