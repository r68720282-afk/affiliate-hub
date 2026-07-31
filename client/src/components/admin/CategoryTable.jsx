import axios from "axios";

const API = "/api/categories";

export default function CategoryTable({
  categories,
  onEdit,
  onRefresh,
}) {

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/${id}`);

      onRefresh?.();

    } catch (error) {

      console.error(error);

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

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {categories.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="emptyTable"
              >

                📂 No Categories Found

              </td>

            </tr>

          ) : (

            categories.map((item, index) => (

              <tr
                key={item._id || item.id}
              >

                <td>

                  {index + 1}

                </td>

                <td>

                  <span className="categoryBadge">

                    {item.name || "-"}

                  </span>

                </td>

                <td>

                  <span className="activeBadge">

                    Active

                  </span>

                </td>

                <td>

                  <div className="actionButtons">

                    <button
                      type="button"
                      className="editBtn"
                      onClick={() => onEdit?.(item)}
                    >

                      ✏ Edit

                    </button>

                    <button
                      type="button"
                      className="deleteBtn"
                      onClick={() =>
                        handleDelete(
                          item._id || item.id
                        )
                      }
                    >

                      🗑 Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}
