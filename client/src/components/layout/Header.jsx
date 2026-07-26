import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="siteHeader">

      <div className="container">

        <Link
          to="/"
          className="logo"
        >
          AffiliateHub
        </Link>

        <nav className="mainNav">

          <NavLink
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
          >
            Products
          </NavLink>

          <NavLink
            to="/search"
          >
            Search
          </NavLink>

          <NavLink
            to="/admin"
          >
            Admin
          </NavLink>

        </nav>

      </div>

    </header>
  );
}
