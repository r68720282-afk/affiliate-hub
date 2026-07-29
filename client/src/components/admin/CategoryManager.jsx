import { useEffect, useState } from "react";
import axios from "axios";

import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const API = "/api/categories";

export default function CategoryManager() {

  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  async function loadCategories() {

    try {

      const { data } = await axios.get(API);

      setCategories(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error(error);

      setCategories([]);

    }

  }

  useEffect(() => {

    loadCategories();

  }, []);

  function handleSuccess() {

    setEditCategory(null);

    loadCategories();

  }

  return (

    <div className="categoryManager">

      <div className="sectionHeader">

        <div>

          <h2>🗂 Category Management</h2>

          <p>
            Create, edit and organize your product
            categories.
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

          <h3>📋 Category List</h3>

          <CategoryTable
            categories={categories}
            onEdit={setEditCategory}
            onRefresh={loadCategories}
          />

        </div>

      </div>

    </div>

  );

}
