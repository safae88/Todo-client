import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleRegister} className="p-10 max-w-md mx-auto" noValidate>
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        name="name"
        type="text"
        autoComplete="name"
        className="border p-2 w-full mb-3"
        placeholder="Name"
      />
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
        autoComplete="new-password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
      />
      <button type="submit" className="bg-green-600 text-white p-2 w-full">
        Register
      </button>
    </form>
  );
}

export default Register;