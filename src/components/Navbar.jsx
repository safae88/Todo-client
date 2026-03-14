import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token"); // نتحقق إذا المستخدم مسجّل الدخول

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">To-Do App</h1>

      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login"; // إعادة التوجيه بعد تسجيل الخروج
              }}
              className="hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;