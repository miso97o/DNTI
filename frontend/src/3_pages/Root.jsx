import Navbar from "../2_templates/Navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }