import { Outlet, Navigate } from "react-router";

function ProtectedLayout({children}) {
  const isLoggedIn = localStorage.getItem("token"); // later you'll store the API token here

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;