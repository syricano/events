import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;