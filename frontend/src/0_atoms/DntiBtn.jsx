import CreateIcon from "@mui/icons-material/Create";
import { Icon } from "@mui/material";

// icon : https://fonts.google.com/icons에 나오는 아이콘 이름을 전달할 수 있다.
// type : blue, black, yellow, white, square

export default function DntiBtn({ icon, text, type }) {
  if (type === "square") {
    return (
      <div className="squarebtn">
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "blue") {
    return (
      <div className="bluebtn">
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "black") {
    return (
      <div className="blackbtn">
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "yellow") {
    return (
      <div className="yellowbtn">
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "gray") {
    return (
      <div className="graybtn">
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  } else if (type === "white") {
    return (
      <div className="whitebtn">
        {icon ? <Icon>{icon}</Icon> : null}
        <p>{text}</p>
      </div>
    );
  }
}
