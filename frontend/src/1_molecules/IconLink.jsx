import StyledIcon from "../0_atoms/StyledIcon";
import { Link } from "react-router-dom";

export default function IconLink({makeBlack, setmakeBlack}) {
  function toBlack() {
    setmakeBlack(true)
  }
  return (
    <Link to={``} onClick={toBlack}>
      <StyledIcon />
    </Link>
  );
}
