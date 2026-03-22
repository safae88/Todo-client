import { useNavigate } from "react-router-dom";

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
      const res = await fetch(
        "https://selfless-nourishment-production-9209.up.railway.app/api/auth/login",
        {
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
    <form onSubmit={handleLogin} className="p-10 max-w-md mx-auto" noValidate>
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        name="email"
        type="email"
        autoComplete="email"
        className="border p-2 w-full mb-3"
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">
        Login
      </button>
    </form>
  );
}

export default Login;