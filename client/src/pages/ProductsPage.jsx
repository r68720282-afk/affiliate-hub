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

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [searchParams] = useSearchParams();

  const category =
    searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] =
    useState(category);

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

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory) {
      list = list.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (search.trim()) {
      list = list.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sortBy) {
      case "rating":
        list.sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        );
        break;

      case "low":
        list.sort((a, b) => {
          const priceA = parseFloat(
            a.stores?.[0]?.price?.replace(/[^\d.]/g, "") || 0
          );
          const priceB = parseFloat(
            b.stores?.[0]?.price?.replace(/[^\d.]/g, "") || 0
          );

          return priceA - priceB;
        });
        break;

      case "high":
        list.sort((a, b) => {
          const priceA = parseFloat(
            a.stores?.[0]?.price?.replace(/[^\d.]/g, "") || 0
          );
          const priceB = parseFloat(
            b.stores?.[0]?.price?.replace(/[^\d.]/g, "") || 0
          );

          return priceB - priceA;
        });
        break;

      default:
        break;
    }

    return list;
  }, [
    products,
    selectedCategory,
    search,
    sortBy,
  ]);

  return (
    <main className="productsPage">
      <div className="container">

        <div className="pageHeader">
          <h1>
            {selectedCategory
              ? `${selectedCategory} Products`
              : "All Products"}
          </h1>

          <p>
            Discover the best affiliate products from trusted online stores.
          </p>
        </div>

        <div className="productsToolbar">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="searchInput"
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="latest">
              Latest
            </option>

            <option value="rating">
              Top Rated
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>
          </select>

        </div>

        <p className="productsCount">
          Showing <strong>{filteredProducts.length}</strong> Products
        </p>

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

            <p>
              Try searching with another keyword or choose a different category.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
