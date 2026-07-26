import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">

      <div className="container">

        <Link to="/" className="logo">
          AffiliateHub
        </Link>

        <nav>

          <a href="#categories">Categories</a>

          <a href="#featured">Deals</a>

          <a href="#footer">Contact</a>

        </nav>

      </div>

    </header>
  );
}
