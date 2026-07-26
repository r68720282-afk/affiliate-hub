import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container">

        <div className="footerTop">

          <div className="footerColumn">
            <h2>AffiliateHub</h2>
            <p>
              Discover the best affiliate products, compare prices,
              and find the latest deals from trusted online stores.
            </p>
          </div>

          <div className="footerColumn">
            <h3>Quick Links</h3>

            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>

          </div>

          <div className="footerColumn">
            <h3>Categories</h3>

            <ul>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Beauty">Beauty</Link></li>
              <li><Link to="/products?category=Home%20%26%20Kitchen">Home &amp; Kitchen</Link></li>
              <li><Link to="/products?category=Health">Health</Link></li>
            </ul>

          </div>

          <div className="footerColumn">
            <h3>Follow Us</h3>

            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">X (Twitter)</a></li>
            </ul>

          </div>

        </div>

        <hr />

        <div className="footerBottom">

          <p>
            © {new Date().getFullYear()} AffiliateHub. All Rights Reserved.
          </p>

          <p>
            Affiliate Disclosure: Some links on this website are affiliate
            links. We may earn a commission at no extra cost to you if you
            purchase through these links.
          </p>

        </div>

      </div>
    </footer>
  );
}
