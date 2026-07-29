import { useEffect, useState } from "react";
import axios from "axios";

const API = "/api/categories";

export default function CategoryForm({
  editCategory,
  onSuccess
}) {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (editCategory) {
      setName(editCategory.name);
    } else {
      setName("");
    }

  }, [editCategory]);

  async function handleSubmit(e) {

    e.preventDefault();

    const categoryName = name.trim();

    if (!categoryName) {
      alert("Category name is required.");
      return;
    }

    setLoading(true);

    try {

      if (editCategory) {

        await axios.put(
          `${API}/${editCategory.id}`,
          {
            name: categoryName
          }
        );

      } else {

        await axios.post(API, {
          name: categoryName
        });

      }

      setName("");

      onSuccess();

    } catch (error) {

      console.error(error);

      alert("Unable to save category.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      className="categoryForm"
      onSubmit={handleSubmit}
    >

      <label className="formLabel">
        Category Name
      </label>

      <input
        className="formInput"
        type="text"
        placeholder="e.g. Electronics"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <div className="formActions">

        <button
          className="primaryBtn"
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : editCategory
              ? "Update Category"
              : "Add Category"}

        </button>

      </div>

    </form>

  );

}
