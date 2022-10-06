import CreateIcon from "@mui/icons-material/Create";
import { Icon } from "@mui/material";

// icon : https://fonts.google.com/icons에 나오는 아이콘 이름을 전달할 수 있다.
// type : blue, black, yellow, white, square

export default function DntiBtn({ icon, text, type }) {
  if (type === "square") {
    return (
      <div className="squarebtn" style={{cursor: "pointer"}}>
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "blue") {
    return (
      <div className="bluebtn" style={{cursor: "pointer"}} >
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "black") {
    return (
      <div className="blackbtn" style={{cursor: "pointer"}} >
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "yellow") {
    return (
      <div className="yellowbtn" style={{cursor: "pointer"}}>
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "gray") {
    return (
      <div className="graybtn" style={{cursor: "pointer"}}>
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "white") {
    return (
      <div className="whitebtn" style={{cursor: "pointer"}}>
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  }
}
