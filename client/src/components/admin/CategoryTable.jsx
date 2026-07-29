import axios from "axios";

const API = "/api/categories";

export default function CategoryTable({
  categories,
  onEdit,
  onRefresh
}) {

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/${id}`);

      onRefresh();

    } catch (err) {

      console.error(err);

      alert("Unable to delete category.");

    }

  }

  return (

    <div className="categoryTable">

      <table>

        <thead>

          <tr>

            <th>#</th>

            <th>Category</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>

              <td
                colSpan="3"
                style={{
                  textAlign: "center"
                }}
              >

                No Categories Found

              </td>

            </tr>

          ) : (

            categories.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.name}</td>

                <td>

                  <button
                    type="button"
                    className="editBtn"
                    onClick={() =>
                      onEdit(item)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="deleteBtn"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}
