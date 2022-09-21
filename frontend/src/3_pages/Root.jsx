import Navbar from "../2_templates/Navbar";
import Footer from "../2_templates/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div class="h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
