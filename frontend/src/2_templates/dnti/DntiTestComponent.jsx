import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import { useState } from "react";
import DntiResultComponent from "./DntiResultComponent";
import React from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};


function LinearWithValueLabel({progress}) {
  //const [progress, setProgress] =useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

function TestSelectCard({ imgsrc, description, label }) {
  return (
      <Card variant="outlined" className="m-5">
        <div className="flex flex-col items-center">
          <img src={imgsrc} alt="Not Found" className="image" />
          <p className="font-medium text-xl m-1">{description}</p>
          <p className="font-medium text-xl m-1">{label}</p>
        </div>
      </Card>
  );
}

var result={'S':0,'N':0,'P':0,'I':0}
var sortable = [];
let arr=[0,0,0,0]

export default function DntiList(){

  function LinearWithValueLabel() {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    );
  }

  const text=['피톤치드 듬뿍',"동네 경찰 마동석","새벽 3시 조깅 안전","요즘 뜨는 핫플","새벽2시 골목길도 편안함","월세 40",
    "주변이 푸릇푸릇 공세권","서울 어디든 30분","뻐국이가 직접 모닝콜","월세 아껴서 소고기 가능","5분 거리 식당 20개","혼자 월세 감당 가능 "
    ]
  const person=['동네 범죄자 손석구',"일산화탄소 그득그득","주변 1KM 무유흥지대","택배 도난률 80%","월세 70","조금만 어둑해도 수리남",
    "지하철 역까지 30분 거리","매연 가득 빌딩 숲","월세 내고 라면으로 떄우기","굴삭기가 모닝콜","부모님한테 용돈받아야 생활 가능","1km반경 식당 없어서 요리 필수"
    ]

  const Type=['N','S','S','I','S','P','N','I','N','P','I','P']

  const [index, setIndex] = useState(1)

  const [gotoresult,setGotoresult]=useState(false)

  const [progress, setProgress] =useState(0);

  const [win,setWin]=useState([])
  const [lose,setLose]=useState([])

  function handleNext(widx,lidx){
    setIndex(index+1)
    setProgress(progress+16)
    const temp=Type[widx]
    result[`${temp}`]+=1
    setWin([...win,Type[widx]])
    setLose([...lose,Type[lidx]])
    if(index>5){
      TypeResult()
      setGotoresult(true)
    }
  }

  function TypeResult(){
    for (const name in result) {
      sortable.push([name,result[`${name}`]])
    }
    console.log(sortable)
    sortable.sort(function(a,b){
      return b[1]-a[1]
    });
  }

  useEffect(() => {
    return () => {
      sortable = [];
      result={'S':0,'N':0,'P':0,'I':0}
      console.log('clean up', sortable)
      console.log('clean up', result)
    };
  }, []);

  const src1="/img/dnti_test/"+index+"-1.png"
  const src2="/img/dnti_test/"+index+"-2.png"

  return (
    <div>
      {gotoresult?(<DntiResultComponent arr={arr} sortable={sortable} win={win} lose={lose}/>
      ) : (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <p className="font-medium text-5xl m-10">DNTI 검사페이지</p>
          <LinearWithValueLabel progress={progress} />
        </div>
        <div className="flex flex-row items-center m-10">
          <div onClick={e => handleNext(index*2 -2,index*2-1)}>
            <TestSelectCard
              imgsrc ={src1}
              description={text[index*2-2]}
              label={person[index*2-2]}
            />
          </div>
          <p className="font-medium text-5xl m-3">VS</p>
          <div onClick={e => handleNext(index*2 -1,index*2-2)}>
          <TestSelectCard
            imgsrc={src2}
            description={text[index*2-1]}
            label={person[index*2-1]}
          />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

