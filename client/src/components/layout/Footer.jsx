import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="siteFooter">

      <div className="container">

        <div className="footerTop">

          <div>

            <h2>AffiliateHub</h2>

            <p>
              Discover the best affiliate products
              from trusted online stores.
            </p>

          </div>

          <div>

            <h3>Quick Links</h3>

            <ul>

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/search">
                  Search
                </Link>
              </li>

              <li>
                <Link to="/admin">
                  Admin
                </Link>
              </li>

            </ul>

          </div>

          <div>

            <h3>Categories</h3>

            <ul>

              <li>Fashion</li>

              <li>Electronics</li>

              <li>Beauty</li>

              <li>Home & Kitchen</li>

              <li>Health</li>

            </ul>

          </div>

        </div>

        <hr />

        <div className="footerBottom">

          © {new Date().getFullYear()} AffiliateHub.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}
