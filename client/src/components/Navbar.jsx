import { Link } from "react-router";
import { useAuth } from "../context/AuthContext"; 

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar bg-base-200 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/create-event" className="btn btn-outline btn-sm">Create Event</Link>

        {isLoggedIn ? (
          <button onClick={logout} className="btn btn-error btn-sm">Logout</button>
        ) : (
          <>
            <Link to="/signin" className="btn btn-outline btn-sm">Sign In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
