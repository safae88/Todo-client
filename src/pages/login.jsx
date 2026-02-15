import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          
          <p className="text-center mt-4 text-sm">
  Don’t have an account?{" "}
  <Link
    to="/register"
    className="text-blue-600 hover:underline"
  >
    Register
  </Link>
</p>

        </form>
      </div>
    </div>
  );
}

export default Login;
