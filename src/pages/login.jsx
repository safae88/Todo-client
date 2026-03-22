import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Read from the form at submit time so browser autofill values are included
    // (autofill often does not fire React onChange before submit).
    const form = e.currentTarget;
    const fd = new FormData(form);
    const emailValue = String(fd.get("email") ?? "").trim();
    const passwordValue = String(fd.get("password") ?? "");

    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        }
      );

      let data;
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        alert("Login failed: unexpected response from server.");
        return;
      }

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        return;
      }

      const message =
        typeof data.message === "string"
          ? data.message
          : "Invalid email or password.";
      alert(`Login failed: ${message}`);
    } catch {
      alert(
        "Login failed: could not reach the server. Check your connection and try again."
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Login
          </h2>
          <div className="space-y-3">
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-2 font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;