import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import ProductCard from "../components/product/ProductCard";

const API =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/products`
    : "https://affiliate-hub-7xjp.onrender.com/api/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const category =
    searchParams.get("category") || "";

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const { data } = await axios.get(API);

      setProducts(
        Array.isArray(data)
          ? data
          : data.products || []
      );
    } catch (err) {
      console.error("Products API Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts =
    useMemo(() => {
      if (!category)
        return products;

      return products.filter(
        (item) =>
          item.category === category
      );
    }, [
      products,
      category
    ]);

  return (
    <main className="productsPage">
      <div className="container">

        <h1>
          {category
            ? `${category} Products`
            : "All Products"}
        </h1>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length ? (
          <div className="productsGrid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <h2>No Products Found</h2>
          </div>
        )}

      </div>
    </main>
  );
}
