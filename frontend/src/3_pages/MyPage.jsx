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

        <div className={st.middleColContainer}>
            <FrequentPlace myPlace={myPlace}/>
            <RecommendedRegion info={myInfo.dongList}/>
        </div>

        <div style={{borderLeft: "0.2rem solid", height: "90%"}}></div>
        
        <div className={st.middleColContainer}>
          <MyRegion info={myInfo.user} />
          <MyReview info={myInfo.reviewList}/>
          <MyPosts info={myInfo.boardList} />
        </div>

      </div>
    </div> : <h2>로딩중</h2>}
  </>
  );
}

const ProfileCard = (props) => {
  return (
    <div className={st.profileContainer}>
      <Avatar src="" sx={{width:"5rem", height:"5rem", margin: '10px' }} />

      <div className={st.colContainer}>

        <div className={st.rowContainer}>
          <p style={{fontSize: "24px", fontWeight: "bold", marginRight: "20px"}}>{props.info.nickname}</p>
          <p style={{color:"gray"}}>{props.info.userId}</p>
        </div>

        <div className={st.rowContainer}>
          <p style={{fontSize: "20px", fontWeight: "bold", marginRight: "50px"}}>{props.dnti.type ? props.dnti.type : "dnti검사를 해주세요!"}</p>
          <p style={{fontSize: "20px", fontWeight: "bold"}}>{`#${props.dnti.hashtag1} #${props.dnti.hashtag2}`}</p>
        </div>

      </div>
      <div className={st.profileColContainer}>
        <div style={{margin : "20px auto"}}>
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
            <Button>DNTI 다시 검사하기</Button>
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
      <div className={st.frequentRowContainer}>
        <p style={{fontSize: "18px", fontWeight: "bold"}}>{props.name}{props.address}</p>
        <IconButton>
          <ClearIcon onClick={() => deleteFavorite(props.favoriteId)}/>
        </IconButton>
      </div>
  );
};

function FrequentPlace(props) {

  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p style={{fontSize: "24px", fontWeight: "bold", marginRight: "20px"}}>자주 가는 곳</p>
          <Button style={{margin: "auto 20px"}}>추가</Button>
        <p style={{fontSize: "12px", color:"red", fontWeight: "bold", marginRight: "20px"}}>최대 3곳까지 등록 가능합니다.</p>
      </div>
      <div className={st.bodyColContainer}>
        {props.myPlace.map((place,index)=> {
            return(
            <div key={index} style={{width:"100%"}}>
              <FrequentRow favoriteId={place.favoriteId} name={place.name} address={place.address} />
            </div>)
          
        })}
      </div>
    </div>
  );
};

function RecommendRow(props) {
  return (
    <div className={st.RecommendRowContainer}>
      <div>
        <p style={{fontSize: "18px", fontWeight: "bold", marginRight: "20px"}}>{props.dong}</p>
      </div>
      <Link to="/dnRecommend">
        <Button>보러 가기</Button>
      </Link>
    </div>
  );
}

function RecommendedRegion(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p style={{fontSize: "24px", fontWeight: "bold", marginRight: "20px"}}>나와 어울리는 지역</p>
        </div>      
      <div className={st.bodyColContainer}>
      {props.info.map((region, index)=> {
            return(
            <div key={index} style={{width:"100%"}}>
              <RecommendRow dong={region.dongName} />
            </div>)
          
        })}
      </div>
    </div>
  );
}

function MyRegion(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p style={{fontSize: "24px", fontWeight: "bold", marginRight: "20px"}}>나의 지역</p>
        <Button>바꾸기</Button>
      </div>
      <div style={{ border: '1px solid', width: '100%', margin: '0px' }}>
        <p style={{fontSize: "20px", fontWeight: "bold", marginRight: "20px", textAlign:"center"}}>{`${props.info.gu} ${props.info.dong}`}</p>
      </div>
    </div>
  );
}

function MyReview(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p style={{fontSize: "24px", fontWeight: "bold", marginRight: "20px"}}>나의 리뷰</p>
        <Link to="/board/review">
          <p style={{fontSize: "14px", fontWeight: "bold", marginRight: "20px"}}>더보기</p>
        </Link>
      </div>
      <div className={st.bodyColContainer}>
      {props.info.map((review,index)=> {
            return(
            <div key={index}>
              <ReviewRow gu={review.gu} title={review.title} score={review.score} />
            </div>)
          
        })}
      </div>
      </div>
  );
}

function MyPosts(props) {
  return (
    <div className={st.colContainer}>
      <div className={st.headRowContainer}>
        <p style={{fontSize: "24px", fontWeight: "bold", marginRight: "20px"}}>작성한 글</p>
        <Link to="/board/post">
          <p style={{fontSize: "14px", fontWeight: "bold", marginRight: "20px"}}>더보기</p>
        </Link>
      </div>
      <div className={st.bodyColContainer}>
      {props.info.map((post,index)=> {
            return(
            <div key={index} className={st.bodyColContainer}>
              <PostRow title={post.title} boardLike={post.boardLike} hit={post.hit} commentCount={post.commentCount}/>
            </div>)
          
        })}
      </div>
    </div>
  );
}


