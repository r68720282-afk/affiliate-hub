import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  function logout() {

    localStorage.removeItem("adminToken");

    navigate("/admin-login", {
      replace: true,
    });

  }

  const menuItems = [

    {
      title: "Dashboard",
      icon: "📊",
      path: "/admin",
    },

    {
      title: "Products",
      icon: "📦",
      path: "/admin/products",
    },

    {
      title: "Categories",
      icon: "🗂️",
      path: "/admin/categories",
    },

    {
      title: "CSV Import",
      icon: "📂",
      path: "/admin/csv-import",
    },

    {
      title: "Analytics",
      icon: "📈",
      path: "/admin/analytics",
    },

    {
      title: "Settings",
      icon: "⚙️",
      path: "/admin/settings",
    },

  ];

  return (

    <div className="adminLayout">

      {/* Sidebar */}

      <aside
        className={`adminSidebar ${sidebarOpen ? "" : "collapsed"}`}
      >

        <div className="sidebarLogo">

          <div className="logoCircle">
            AH
          </div>

          {sidebarOpen && (

            <div className="logoText">

              <h2>Affiliate Hub</h2>

              <span>Admin Panel</span>

            </div>

          )}

        </div>

        <nav className="sidebarMenu">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
            >

              <span className="menuIcon">
                {item.icon}
              </span>

              {sidebarOpen && (

                <span className="menuTitle">

                  {item.title}

                </span>

              )}

            </NavLink>

          ))}

        </nav>

        <div className="sidebarBottom">

          <button
            className="logoutBtn"
            onClick={logout}
          >

            <span className="menuIcon">
              🚪
            </span>

            {sidebarOpen && (

              <span>

                Logout

              </span>

            )}

          </button>

        </div>

      </aside>

      {/* Main */}

      <div className="adminMain">

        <header className="adminTopbar">

          <div className="topbarLeft">

            <button
              className="menuBtn"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >

              ☰

            </button>

            <div className="searchBox">

              <span>
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
              />

            </div>

          </div>

          <div className="topbarRight">

            <button className="iconBtn">

              🔔

              <span className="notificationBadge">

                3

              </span>

            </button>

            <button className="iconBtn">

              ⚙️

            </button>

            <div className="adminProfile">

              <div className="avatar">

                A

              </div>

              <div>

                <strong>

                  Admin

                </strong>

                <small>

                  Super Admin

                </small>

              </div>

            </div>

          </div>

        </header>

        <main className="adminContent">

          {children}

        </main>

      </div>

    </div>

  );

}
