import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <h2>Affiliate Hub</h2>

      <ul>

        <li>
          <NavLink to="/admin">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/products">
            Products
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/categories">
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/csv-import">
            CSV Import
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/import">
            Affiliate Import
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/analytics">
            Analytics
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/settings">
            Settings
          </NavLink>
        </li>

      </ul>

    </aside>
  );
}
