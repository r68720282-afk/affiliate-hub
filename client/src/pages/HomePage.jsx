import FeaturedProducts from "../components/product/FeaturedProducts";
import { Link } from "react-router-dom";

export default function HomePage() {

  return (

    <main className="homePage">

      <section className="hero">

        <div className="container">

          <div className="heroContent">

            <h1>

              Find The Best Affiliate Products

            </h1>

            <p>

              Compare prices from Amazon,
              Flipkart, Meesho, Myntra,
              Ajio and many more stores.

            </p>

            <div className="heroButtons">

              <Link
                to="/products"
                className="primaryBtn"
              >

                Browse Products

              </Link>

              <Link
                to="/search"
                className="secondaryBtn"
              >

                Search Products

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      <section className="homeCategories">

        <div className="container">

          <h2>

            Popular Categories

          </h2>

          <div className="categoryGrid">

            <Link
              to="/products?category=Fashion"
              className="categoryCard"
            >
              👕 Fashion
            </Link>

            <Link
              to="/products?category=Electronics"
              className="categoryCard"
            >
              💻 Electronics
            </Link>

            <Link
              to="/products?category=Beauty"
              className="categoryCard"
            >
              💄 Beauty
            </Link>

            <Link
              to="/products?category=Home & Kitchen"
              className="categoryCard"
            >
              🏠 Home & Kitchen
            </Link>

            <Link
              to="/products?category=Health"
              className="categoryCard"
            >
              ❤️ Health
            </Link>

            <Link
              to="/products?category=Sports"
              className="categoryCard"
            >
              ⚽ Sports
            </Link>

          </div>

        </div>

      </section>

      <section className="whyChoose">

        <div className="container">

          <h2>

            Why Choose AffiliateHub?

          </h2>

          <div className="featureGrid">

            <div className="featureCard">

              <h3>

                Trusted Products

              </h3>

              <p>

                Carefully selected products
                from trusted marketplaces.

              </p>

            </div>

            <div className="featureCard">

              <h3>

                Price Comparison

              </h3>

              <p>

                Compare prices across
                multiple online stores.

              </p>

            </div>

            <div className="featureCard">

              <h3>

                Affiliate Deals

              </h3>

              <p>

                Find the latest offers,
                discounts and deals.

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}
