import Navbar from "../2_templates/Navbar";
import Footer from "../2_templates/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
