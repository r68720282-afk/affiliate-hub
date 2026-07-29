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

      const res = await axios.get(API);

      setCategories(res.data || []);

    } catch (err) {

      console.error(err);

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

        <h2>Category Management</h2>

        <p>
          Add, edit and delete product categories.
        </p>

      </div>

      <CategoryForm
        editCategory={editCategory}
        onSuccess={handleSuccess}
      />

      <CategoryTable
        categories={categories}
        onEdit={setEditCategory}
        onRefresh={loadCategories}
      />

    </div>

  );

}
