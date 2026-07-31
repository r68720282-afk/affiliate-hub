import { useEffect, useState } from "react";
import axios from "axios";

import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const API = "/api/categories";

export default function CategoryManager() {

  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {

    try {

      setLoading(true);

      const { data } = await axios.get(API);

      const list = Array.isArray(data)
        ? data
        : data.categories || [];

      setCategories(list);

    } catch (error) {

      console.error(error);

      setCategories([]);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadCategories();

  }, []);

  function handleSuccess() {

    setEditCategory(null);

    loadCategories();

  }

  function handleEdit(category) {

    setEditCategory(category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  return (

    <div className="categoryManager">

      <div className="sectionHeader">

        <div>

          <h2>🗂 Category Management</h2>

          <p>

            Create, edit and organize your product categories.

          </p>

        </div>

      </div>

      <div className="categoryContent">

        <div className="categoryFormCard">

          <h3>

            {editCategory
              ? "✏ Edit Category"
              : "➕ Add Category"}

          </h3>

          <CategoryForm
            editCategory={editCategory}
            onSuccess={handleSuccess}
          />

        </div>

        <div className="categoryTableCard">

          <h3>

            📋 Category List ({categories.length})

          </h3>

          {loading ? (

            <div className="loading">

              Loading Categories...

            </div>

          ) : (

            <CategoryTable
              categories={categories}
              onEdit={handleEdit}
              onRefresh={loadCategories}
            />

          )}

        </div>

      </div>

    </div>

  );

}
