import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);
    const nameValue = String(fd.get("name") ?? "").trim();
    const emailValue = String(fd.get("email") ?? "").trim();
    const passwordValue = String(fd.get("password") ?? "");

    try {
      const res = await fetch(
        "https://selfless-nourishment-production-9209.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
          }),
        }
      );

      const text = await res.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          alert("Registration failed: unexpected response from server.");
          return;
        }
      }

      if (res.ok) {
        navigate("/login");
        return;
      }

      const message =
        typeof data.message === "string"
          ? data.message
          : `Registration failed (${res.status}).`;
      alert(message);
    } catch {
      alert(
        "Registration failed: could not reach the server. Check your connection and try again."
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <form onSubmit={handleRegister} className="space-y-6" noValidate>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Create Account
          </h2>
          <div className="space-y-3">
            <input
              name="name"
              type="text"
              autoComplete="name"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              className="w-full rounded border border-gray-300 p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-green-600 p-2 font-medium text-white hover:bg-green-700"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;