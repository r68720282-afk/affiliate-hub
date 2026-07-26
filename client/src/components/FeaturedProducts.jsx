import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";

const API =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/products`
    : "https://affiliate-hub-7xjp.onrender.com/api/products";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const { data } = await axios.get(API);

      const list = Array.isArray(data)
        ? data
        : data.products || [];

      // Home page par sirf pehle 8 products
      setProducts(list.slice(0, 8));
    } catch (err) {
      console.error("Featured Products Error:", err);
    }
  }

  return (
    <section
      id="featured"
      className="featuredProducts"
    >
      <div className="container">

        <div className="sectionHeader">
          <h2>🔥 Featured Products</h2>
          <p>
            Discover today's best affiliate deals.
          </p>
        </div>

        <div className="productGrid">
          {products.length ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p>No featured products available.</p>
          )}
        </div>

      </div>
    </section>
  );
}
