import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import ProductCard from "../components/product/ProductCard";

const API = "/api/products";

const CATEGORY_OPTIONS = [
  "All",
  "Fashion",
  "Electronics",
  "Beauty",
  "Home & Kitchen",
  "Health",
  "Sports",
  "Books",
  "Grocery",
  "Baby"
];

export default function SearchPage() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] =
    useState("");

  const [category, setCategory] =
    useState("All");

  useEffect(() => {

    loadProducts();

  }, []);

  async function loadProducts() {

    try {

      setLoading(true);

      const { data } =
        await axios.get(API);

      setProducts(
        Array.isArray(data)
          ? data
          : data.products || []
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) => {

          const searchMatch =

            product.title
              ?.toLowerCase()
              .includes(
                keyword.toLowerCase()
              ) ||

            product.brand
              ?.toLowerCase()
              .includes(
                keyword.toLowerCase()
              );

          const categoryMatch =

            category === "All"
              ? true
              : product.category ===
                category;

          return (
            searchMatch &&
            categoryMatch
          );

        }
      );

    }, [
      products,
      keyword,
      category
    ]);

  return (

    <main className="searchPage">

      <div className="container">

        <h1>

          Search Products

        </h1>

        <div className="searchFilters">

          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            {CATEGORY_OPTIONS.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >

                  {item}

                </option>

              )
            )}

          </select>

        </div>

        {loading ? (

          <p>

            Loading...

          </p>

        ) : filteredProducts.length ? (

          <div className="productsGrid">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        ) : (

          <div className="emptyState">

            <h2>

              No Products Found

            </h2>

          </div>

        )}

      </div>

    </main>

  );

}
