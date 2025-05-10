// client/src/components/Navbar.jsx
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar bg-base-200 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
      </div>
      <div className="flex-none gap-2">
        {/* Add your condition for logged-in state here */}
        <Link to="/create-event" className="btn btn-outline btn-sm">Create Event</Link>
        <button className="btn btn-error btn-sm">Logout</button>
        {/* Add your sign-in/sign-up links here */}
        <Link to="/signin" className="btn btn-outline btn-sm">Sign In</Link>
        <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
