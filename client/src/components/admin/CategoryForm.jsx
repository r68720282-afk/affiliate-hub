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

    if (!name.trim()) {
      alert("Category name is required.");
      return;
    }

    setLoading(true);

    try {

      if (editCategory) {

        await axios.put(
          `${API}/${editCategory.id}`,
          {
            name: name.trim()
          }
        );

      } else {

        await axios.post(API, {
          name: name.trim()
        });

      }

      setName("");

      onSuccess();

    } catch (err) {

      console.error(err);

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

      <div className="categoryFormRow">

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : editCategory
              ? "Update"
              : "Add Category"}

        </button>

      </div>

    </form>

  );

}
