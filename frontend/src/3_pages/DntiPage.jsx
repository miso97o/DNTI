import { Outlet } from "react-router-dom";

export default function DntiPage() {
  return (
    <div className="container mx-auto h-full w-screen flex flex-col justify-content-center place-items-center">
      <Outlet />
    </div>
  );
}
