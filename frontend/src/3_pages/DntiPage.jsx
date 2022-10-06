import { Outlet } from "react-router-dom";

export default function DntiPage() {
  return (
    <div className="container mx-auto h-4/5 w-screen flex flex-col justify-content-center place-items-center">
      <Outlet />
    </div>
  );
}
