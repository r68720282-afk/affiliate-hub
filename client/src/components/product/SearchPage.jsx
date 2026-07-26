import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_API_URL;

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredProducts(
      products.filter((product) =>
        product.title?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      )
    );
  }, [search, products]);

  async function fetchProducts() {
    try {
      const res = await axios.get(`${API}/api/products`);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="searchPage">
      <div className="container">
        <h1>Search Products</h1>

        <input
          type="text"
          className="searchInput"
          placeholder="Search by product, brand or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="emptyState">
            No products found.
          </div>
        ) : (
          <div className="productsGrid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
