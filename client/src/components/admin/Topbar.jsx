import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topbar() {

  const navigate = useNavigate();

  async function logout() {

    try {

      const token = localStorage.getItem("adminToken");

      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } catch (e) {}

    localStorage.removeItem("adminToken");

    navigate("/admin/login");

  }

  return (

    <div className="topbar">

      <h2>Admin Dashboard</h2>

      <button
        className="logoutBtn"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  );

}
