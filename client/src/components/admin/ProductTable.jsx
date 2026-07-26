      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="emptyState">
          <h3>No Products Found</h3>
          <p>Try changing the search or category.</p>
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.title}
                      className="thumb"
                    />
                  </td>

                  <td>
                    <strong>{product.title}</strong>
                  </td>

                  <td>{product.brand}</td>

                  <td>{product.category}</td>

                  <td>{product.featured ? "⭐ Yes" : "-"}</td>

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
                    <button onClick={() => onEdit(product)}>
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
