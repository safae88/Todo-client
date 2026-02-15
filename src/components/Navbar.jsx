import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">To-Do App</h1>

      <div className="space-x-4">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
