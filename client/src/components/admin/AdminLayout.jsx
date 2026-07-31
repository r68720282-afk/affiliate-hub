import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout({ children }) {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  function logout() {

    localStorage.removeItem("adminToken");

    navigate("/admin-login");

  }

  return (

    <div className="adminLayout">

      {/* Sidebar */}

      <aside
        className={
          sidebarOpen
            ? "adminSidebar open"
            : "adminSidebar"
        }
      >

        <div className="sidebarLogo">

          <h2>Affiliate Hub</h2>

        </div>

        <nav className="sidebarMenu">

          <NavLink to="/admin">

            📊 Dashboard

          </NavLink>

          <NavLink to="/admin">

            📦 Products

          </NavLink>

          <NavLink to="/admin">

            🗂 Categories

          </NavLink>

          <NavLink to="/admin/csv-import">

            📂 CSV Import

          </NavLink>

          <button
            className="logoutBtn"
            onClick={logout}
          >

            🚪 Logout

          </button>

        </nav>

      </aside>

      {/* Main */}

      <div className="adminMain">

        <header className="adminTopbar">

          <button
            className="menuBtn"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >

            ☰

          </button>

          <h2>

            Affiliate Admin Panel

          </h2>

          <div className="adminUser">

            👤 Admin

          </div>

        </header>

        <main className="adminContent">

          {children}

        </main>

      </div>

    </div>

  );

}
