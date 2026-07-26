import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "/api/products";

const PAGE_SIZE = 10;

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

export default function ProductTable({
  onEdit
}) {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [page, setPage] = useState(1);

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

      alert(
        "Unable to load products."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadProducts();

  }, []);

  async function handleDelete(id) {

    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {

      await axios.delete(
        `${API}/${id}`
      );

      loadProducts();

    } catch (err) {

      console.error(err);

      alert(
        "Delete failed."
      );

    }

  }
    const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch =
        product.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        product.brand
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All"
          ? true
          : product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );

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

  }, [totalPages]);

  return (

    <div className="productTable">

      <div className="tableToolbar">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(
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

          Loading products...

        </p>

      ) : (
              filteredProducts.length === 0 ? (

          <div className="emptyState">

            <h3>No Products Found</h3>

            <p>
              Try changing the search or category.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>Image</th>

                <th>Product</th>

                <th>Brand</th>

                <th>Category</th>

                <th>Featured</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {paginatedProducts.map(
                (product) => (

                  <tr key={product.id}>

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

                      <strong>

                        {product.title}

                      </strong>

                    </td>

                    <td>

                      {product.brand}

                    </td>

                    <td>

                      {product.category}

                    </td>

                    <td>

                      {product.featured
                        ? "⭐ Yes"
                        : "-"}

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

                      <button
                        onClick={() =>
                          onEdit(product)
                        }
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}
            <div className="pagination">

        <button
          type="button"
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </button>

        <span>

          Page {page} of {totalPages}

        </span>

        <button
          type="button"
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>

      </div>

      )}

    </div>

  );

}

