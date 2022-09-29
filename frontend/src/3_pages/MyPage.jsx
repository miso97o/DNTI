import { Avatar, Button, IconButton } from '@mui/material';
import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ReviewRow from '../1_molecules/ReviewRow';
import PostRow from '../1_molecules/PostRow';
import Tooltip from '@mui/material/Tooltip';
import st from './MyPage.module.css';
import {useSelector} from "react-redux";
import {useState,useEffect} from 'react';
import axios from 'axios';



const ProfileCard = (props) => {
  return (
    <div className={st.profileContainer}>
      <div>
        <Avatar src="" sx={{ width: '70%', height: '70%', margin: '10px' }} />
      </div>
      <div className={st.colContainer}>
        <div className={st.rowContainer}>
          <span>{props.nickname}</span>
          <span>{props.email}</span>
        </div>
        <div className={st.rowContainer}>
          <span>{props.dnti ? props.dnti : "dnti검사를 해주세요!"}</span>

          <span>#해쉬태그1 #해쉬태그2</span>
        </div>
      </div>
      <div className={st.colContainer}>
        <div>
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
        <div>
          <Link to="/dnti">
            <Button>다시 검사하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FrequentRow = () => {
  return (
    <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
      <div className={st.frequentRowContainer}>
        <p className="">멀티캠퍼스</p>
        <p className="">강남구 테헤란로 212</p>
        <IconButton>
          <ClearIcon />
        </IconButton>
      </div>
      <div className={st.frequentRowContainer}>
        <p className="">멀티캠퍼스</p>
        <p className="">강남구 테헤란로 212</p>
        <IconButton>
          <ClearIcon />
        </IconButton>
      </div>
      <div className={st.frequentRowContainer}>
        <p className="">멀티캠퍼스</p>
        <p className="">강남구 테헤란로 212</p>
        <IconButton>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

const FrequentPlace = (props) => {
  console.log("자주가는장소: ")
  console.log(props);
  return (
    <div className={st.colContainer}>
      <div className={st.rowContainer}>
        <p className="font-medium text-2xl">자주 가는 곳</p>
        <Button>추가</Button>
        <p className="txt-959">최대 3곳까지 등록 가능합니다.</p>
      </div>
      <div>
        <FrequentRow />
      </div>
    </div>
  );
};

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
    <div>
      <div className="flex flex-row">
        <p className="font-medium text-2xl">나의 지역</p>
        <Button>바꾸기</Button>
      </div>
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
        <p>서울특별시 광진구 구의1동</p>
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
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
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
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
        <PostRow />
      </div>
    </div>
  );
}

export default function MyPage() {
  const user = useSelector((state) => state.user);
  const [FrequentPlace, setFrequentPlace] = useState([]);
  console.log(user);

  useEffect(()=>{
    if(user !== null){
      axios.get(`/favorite/${user.userId}`).then(({data})=>{
        setFrequentPlace(data);
      })
    }
    console.log(FrequentPlace);
  })

  return (
    <div className={st.mainContainer}>
      <ProfileCard nickname={user.nickname} email={user.userId} dnti={user.dnti}/>
      <div className={st.rowContainer}>
        <div>
          <FrequentPlace place={FrequentPlace}/>
        </div>
        <div>
          <MyRegion />
          <MyReview />
          <MyPosts />
        </div>
      </div>
      <div className="flex flex-row w-full h-3/4">
        <div className="flex flex-col w-1/2 h-full p-5">{/* <RecommendedRegion /> */}</div>
        <div className="flex flex-col w-1/2 h-full p-5"></div>
      </div>
    </div>
  );
}
