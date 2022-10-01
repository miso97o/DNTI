import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

function DntiResultCard({ imgsrc, type,content }) {
  return (
    <Card variant="outlined">
      <div className="flex flex-col items-center m-10">
        <img src={imgsrc} alt="Not Found" className="m-10" />
        <div className="flex flex-row items-center m-10">
          <p className="font-medium text-xl">{type}</p>
          <p className="font-medium text-xl">이시네요!</p>
        </div>
        <div className="flex flex-row items-center m-10">
          <p className="font-medium text-xl">{content}</p>
        </div>
        <div className="util-button flex-row-vcenter-hcenter">
          <Link to={`/dnRecommend`} style={{ textDecoration: "none" }}>
            <Button variant="contained">동네 확인하기</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

const arr=[0,0,0,0]

export default function DntiResultComponent({sortable,win,lose}) {
  console.log(sortable,"결과값")
  console.log(win,'승리값')
  console.log(lose,'패배값')
  if((sortable[0][1]===sortable[1][1])&&(sortable[1][1]===sortable[2][1])){
    arr[0]='N'
    arr[1]='O'
    arr[2]='T'
    arr[3]=sortable[3][0]
  }else if((sortable[1][1]===sortable[2][1])&&(sortable[2][1]===sortable[3][1])){
    arr[0]='T'
    arr[1]='O'
    arr[2]='P'
    arr[3]=sortable[0][0]
  }else{
    let temp
    for(let i=0;i<3;i++){
      console.log(i,"좌표값")
      console.log(sortable[i][1],sortable[i+1][1],'지정값')
      console.log(sortable[i][0],sortable[i+1][0],'지정타입')
      if(sortable[i][1]===sortable[i+1][1]){
        console.log(sortable[i][1],sortable[i+1][1],'지정값')
        console.log(sortable[i][0],sortable[i+1][0],'지정타입')
        if((sortable[i][0]==='N'&&sortable[i+1][0]==='P')|(sortable[i][0]==='P'&&sortable[i+1][0]==='N')){
          arr[i]=win[4]
          arr[i+1]=lose[4]
        }else if((sortable[i][0]==='N'&&sortable[i+1][0]==='I')|(sortable[i][0]==='I'&&sortable[i+1][0]==='N')){
          arr[i]=win[3]
          arr[i+1]=lose[3]
        }else if((sortable[i][0]==='N'&&sortable[i+1][0]==='S')|(sortable[i][0]==='S'&&sortable[i+1][0]==='N')){
          arr[i]=win[0]
          arr[i+1]=lose[0]
        }else if((sortable[i][0]==='S'&&sortable[i+1][0]==='I')|(sortable[i][0]==='I'&&sortable[i+1][0]==='S')){
          arr[i]=win[1]
          arr[i+1]=lose[1]
        }else if((sortable[i][0]==='S'&&sortable[i+1][0]==='P')|(sortable[i][0]==='P'&&sortable[i+1][0]==='S')){
          arr[i]=win[2]
          arr[i+1]=lose[2]
        }else if((sortable[i][0]==='P'&&sortable[i+1][0]==='I')|(sortable[i][0]==='I'&&sortable[i+1][0]==='P')){
          arr[i]=win[5]
          arr[i+1]=lose[5]
        }
      }else{
        if(arr[i]===0){
          arr[i]=sortable[i][0]
        }
      }
      console.log(arr)
    }
    if(arr[3]===0){
      arr[3]=sortable[3][0]
    }
  }

  console.log(arr)
  let dntitype=arr.join("")
  console.log(dntitype)

  const src="/img/dnti_type/"+dntitype+".png"
  return (
    <div className="flex flex-col items-center">
      <p className="font-medium text-5xl m-10">DNTI 결과</p>
      <DntiResultCard
        imgsrc={src}
        type={dntitype}
      />
    </div>
  );
}
