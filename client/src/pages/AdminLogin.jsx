import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("adminToken", res.data.token);

      navigate("/admin");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adminLogin">

      <form
        className="loginBox"
        onSubmit={handleSubmit}
      >

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>

    </div>
  );
}
