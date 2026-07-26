import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductTable() {

  const [products, setProducts] = useState([]);

  async function loadProducts() {

    try {

      const res = await axios.get("/api/products");

      setProducts(res.data.products);

    } catch (err) {
      console.error(err);
    }

  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id, category) {

    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {

      const token = localStorage.getItem("adminToken");

      await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          category
        }
      });

      loadProducts();

    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }

  }

  return (

    <div className="productTable">

      <div className="tableHeader">

        <h2>Products</h2>

        <button className="addBtn">
          + Add Product
        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Image</th>

            <th>Title</th>

            <th>Brand</th>

            <th>Category</th>

            <th>Rating</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map(product => (

            <tr key={product.id}>

              <td>{product.id}</td>

              <td>

                <img
                  src={product.images?.[0]}
                  width="60"
                  alt={product.title}
                />

              </td>

              <td>{product.title}</td>

              <td>{product.brand}</td>

              <td>{product.category}</td>

              <td>{product.rating}</td>

              <td>

                <button className="editBtn">
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() =>
                    deleteProduct(
                      product.id,
                      product.category
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
