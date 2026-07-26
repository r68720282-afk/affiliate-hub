import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "/api/auth/login";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  function updateField(name, value) {

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } =
        await axios.post(API, form);

      localStorage.setItem(
        "adminToken",
        data.token
      );

      navigate("/admin");

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Login failed."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="adminLogin">

      <form
        className="loginCard"
        onSubmit={handleSubmit}
      >

        <h1>

          Admin Login

        </h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            updateField(
              "email",
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>
            updateField(
              "password",
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </form>

    </div>

  );

}
