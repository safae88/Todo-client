import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
          <p className="text-center mt-4 text-sm">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-green-600 hover:underline"
  >
    Login
  </Link>
</p>

        </form>
      </div>
    </div>
  );
}

export default Register;
