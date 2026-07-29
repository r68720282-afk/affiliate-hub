import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const PRODUCT_API = "/api/products";
const CATEGORY_API = "/api/categories";

const PAGE_SIZE = 10;

export default function ProductTable({ onEdit }) {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);

  async function loadProducts() {

    try {

      setLoading(true);

      const { data } = await axios.get(PRODUCT_API);

      const list = Array.isArray(data)
        ? data
        : data.products || [];

      setProducts(list);

    } catch (error) {

      console.error(error);

      alert("Unable to load products.");

    } finally {

      setLoading(false);

    }

  }

  async function loadCategories() {

    try {

      const { data } = await axios.get(CATEGORY_API);

      setCategories(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    loadProducts();

    loadCategories();

  }, []);

  async function handleDelete(id) {

    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {

      await axios.delete(
        `${PRODUCT_API}/${id}`
      );

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("Delete failed.");

    }

  }

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const keyword = search.toLowerCase();

      const matchSearch =

        product.title
          ?.toLowerCase()
          .includes(keyword)

        ||

        product.brand
          ?.toLowerCase()
          .includes(keyword);

      const matchCategory =

        category === "All"

          ? true

          : product.category === category;

      return matchSearch && matchCategory;

    });

  }, [

    products,

    search,

    category

  ]);

  const totalPages = Math.max(

    1,

    Math.ceil(
      filteredProducts.length /
      PAGE_SIZE
    )

  );

  const paginatedProducts =

    filteredProducts.slice(

      (page - 1) * PAGE_SIZE,

      page * PAGE_SIZE

    );

  useEffect(() => {

    if (page > totalPages) {

      setPage(1);

    }

  }, [

    page,

    totalPages

  ]);
    return (

    <div className="productTable">

      <div className="tableToolbar">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >

          <option value="All">
            All Categories
          </option>

          {categories.map((item) => (

            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>

          ))}

        </select>

      </div>

      {loading ? (

        <div className="loading">

          Loading Products...

        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="emptyState">

          <h3>
            📦 No Products Found
          </h3>

          <p>
            Try another search or category.
          </p>

        </div>

      ) : (

        <>

          <table>

            <thead>

              <tr>

                <th>Image</th>

                <th>Product</th>

                <th>Brand</th>

                <th>Category</th>

                <th>Featured</th>

                <th>Trending</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {paginatedProducts.map((product) => (

                <tr
                  key={
                    product.id ||
                    product._id
                  }
                >

                  <td>

                    <img
                      src={
                        product.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={product.title}
                      className="thumb"
                    />

                  </td>

                  <td>

                    <div className="productInfo">

                      <strong>

                        {product.title}

                      </strong>

                      <small>

                        {product.slug ||
                          product.brand}

                      </small>

                    </div>

                  </td>

                  <td>

                    <span className="categoryBadge">

                      {product.brand}

                    </span>

                  </td>

                  <td>

                    <span className="categoryBadge">

                      {product.category}

                    </span>

                  </td>

                  <td>

                    {product.featured ? (

                      <span className="featuredBadge">

                        ⭐ Featured

                      </span>

                    ) : (

                      "-"

                    )}

                  </td>

                  <td>

                    {product.trending ? (

                      <span className="trendingBadge">

                        🔥 Trending

                      </span>

                    ) : (

                      "-"

                    )}

                  </td>

                  <td>

                    <span
                      className={
                        product.active
                          ? "activeBadge"
                          : "inactiveBadge"
                      }
                    >

                      {product.active
                        ? "Active"
                        : "Inactive"}

                    </span>

                  </td>

                  <td>

                    <div className="actionButtons">

                      <button
                        className="editBtn"
                        type="button"
                        onClick={() =>
                          onEdit(product)
                        }
                      >

                        ✏ Edit

                      </button>

                      <button
                        className="deleteBtn"
                        type="button"
                        onClick={() =>
                          handleDelete(
                            product.id ||
                              product._id
                          )
                        }
                      >

                        🗑 Delete

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
                    <div className="pagination">

            <button
              type="button"
              className="pageBtn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ◀ Previous
            </button>

            <span className="pageInfo">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              className="pageBtn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next ▶
            </button>

          </div>

        </>

      )}

    </div>

  );

}
