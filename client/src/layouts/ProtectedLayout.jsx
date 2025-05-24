import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar";

function ProtectedLayout() {
  const isLoggedIn = localStorage.getItem("token"); 

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;

  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;