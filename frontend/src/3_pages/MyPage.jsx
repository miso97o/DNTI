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




export default function MyPage() {
  const user = useSelector((state) => state.user);
  const [myPlace, setMyPlace] = useState([]);
  const [myInfo, setMyInfo] = useState([]);
  
  
  useEffect(()=>{
    if(user !== null){
      axios.get(`/users/mypage/${user.userId}`).then(({data})=>{
        setMyPlace(data.response.favoriteList);
        setMyInfo(data.response);
      })
    }
    
  },[])

  return (
    <>
    {myInfo.length !== 0 && myPlace.length !== 0 ? 
    <div className={st.mainContainer}>
      <ProfileCard info={myInfo.user} dnti={myInfo.dnti} />
      <div className={st.rowContainer}>
        <div>
          <FrequentPlace myPlace={myPlace}/>
        </div>
        <div>
          <MyRegion info={myInfo.user} />
          <MyReview info={myInfo.reviewList}/>
          <MyPosts info={myInfo.boardList} />
        </div>
      </div>
      <div className="flex flex-row w-full h-3/4">
        <div className="flex flex-col w-1/2 h-full p-5"><RecommendedRegion info={myInfo.dongList}/></div>
        <div className="flex flex-col w-1/2 h-full p-5"></div>
      </div>
    </div> : null}
  </>
  );
}

const ProfileCard = (props) => {
  return (
    <div className={st.profileContainer}>
      <div>
        <Avatar src="" sx={{ width: '70%', height: '70%', margin: '10px' }} />
      </div>
      <div className={st.colContainer}>
        <div className={st.rowContainer}>
          <span>{props.info.nickname}</span>
          <span>{props.info.userId}</span>
        </div>
        <div className={st.rowContainer}>
          <span>{props.dnti.type ? props.dnti.type : "dnti검사를 해주세요!"}</span>

          <span>{`#${props.dnti.hashtag1}  #${props.dnti.hashtag2}`}</span>
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

// 즐겨찾기
const FrequentRow = (props) => {

  // 삭제버튼 클릭시
  const deleteFavorite = (id) => {
    axios.delete(`/favorite/${id}`).then((data)=>{
      alert("삭제되었습니다.")
    })
  }
  
  
  return (
    <div>
      <div className={st.frequentRowContainer}>
        <p className="">{props.name}</p>
        <p className="">{props.address}</p>
        <IconButton>
          <ClearIcon onClick={() => deleteFavorite(props.favoriteId)}/>
        </IconButton>
      </div>
    </div>
  );
};

function FrequentPlace(props) {

  return (
    <div className={st.colContainer}>
      <div className={st.rowContainer}>
        <p className="font-medium text-2xl">자주 가는 곳</p>
        <Button>추가</Button>
        <p className="txt-959">최대 3곳까지 등록 가능합니다.</p>
      </div>
      <div>
        {props.myPlace.map((place)=> {
            return(
            <div key={place.name}>
            <FrequentRow favoriteId={place.favoriteId} name={place.name} address={place.address} />
            </div>)
          
        })}
      </div>
    </div>
  );
};

function RecommendRow(props) {
  return (
    <div className="flex flex-row justify-between">
      <p className="">{props.dong}</p>
      <Link to="/dnRecommend">
        <Button>보러 가기</Button>
      </Link>
    </div>
  );
}

function RecommendedRegion(props) {
  return (
    <div className="flex flex-col h-1/2">
      <p className="font-medium text-2xl">나와 어울리는 지역</p>
      <div className="flex flex-col">
      {props.info.map((region)=> {
            return(
            <div key={region.index} className="flex flex-row justify-around">
              <RecommendRow dong={region.dongName} />
            </div>)
          
        })}
      </div>
    </div>
  );
}

function MyRegion(props) {
  return (
    <div>
      <div className="flex flex-row">
        <p className="font-medium text-2xl">나의 지역</p>
        <Button>바꾸기</Button>
      </div>
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
        <p>{`${props.info.gu} ${props.info.dong}`}</p>
      </div>
    </div>
  );
}

function MyReview(props) {
  return (
    <div className="flex flex-col h-2/6">
      <div className="flex flex-row items-end">
        <p className="font-medium text-2xl">나의 리뷰</p>
        <Link to="/board/review">
          <p className="txt-542 flex-hcenter">더보기</p>
        </Link>
      </div>
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
      {props.info.map((review)=> {
            return(
            <div key={review.index} className="flex flex-row justify-around">
              <p>{review.gu}</p>
              <ReviewRow title={review.title} score={review.score} />
            </div>)
          
        })}
      </div>
    </div>
  );
}

function MyPosts(props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-end">
        <p className="font-medium text-2xl">작성한 글</p>
        <Link to="/board/post">
          <p className="txt-542 flex-hcenter">더보기</p>
        </Link>
      </div>
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
      {props.info.map((post)=> {
            return(
            <div key={post.name}>
            <PostRow title={post.title} boardLike={post.boardLike} hit={post.hit} commentCount={post.commentCount}/>
            </div>)
          
        })}
      </div>
    </div>
  );
}


