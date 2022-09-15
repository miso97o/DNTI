import Navbar from "../2_templates/Navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <div>
        <h1>This is Root</h1>
        <Navbar />
        <Outlet />
      </div>
    );
  }