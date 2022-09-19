import IconLink from "../1_molecules/IconLink";
import PrimaryNavigation from "../1_molecules/PrimaryNavigation";

function Navbar() {
  return (
    <div>
      <div>
        <IconLink />
        <PrimaryNavigation />
      </div>
      <hr className="navUnderline" />
    </div>
  );
}
export default Navbar;
