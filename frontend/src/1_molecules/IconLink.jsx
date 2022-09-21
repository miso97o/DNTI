import StyledIcon from "../0_atoms/StyledIcon";
import { Link } from "react-router-dom";

export default function IconLink() {
  return (
    <Link to={``}>
      <StyledIcon />
    </Link>
  );
}
