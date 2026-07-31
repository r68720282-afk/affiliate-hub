import { useState } from "react";

import AdminLayout from "../components/admin/AdminLayout";
import DashboardCards from "../components/admin/DashboardCards";
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import CategoryManager from "../components/admin/CategoryManager";
import ImportCSV from "../components/admin/ImportCSV";

export default function AdminDashboard() {

  const [editProduct, setEditProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSuccess() {

    setEditProduct(null);

    setRefreshKey((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  function handleEdit(product) {

    setEditProduct(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  return (

    <AdminLayout>

      <div className="adminPage">

        <div className="adminHeader">

          <div>

            <h1>Affiliate Hub Admin</h1>

            <p>

              Manage products, categories and CSV imports
              from one dashboard.

            </p>

          </div>

        </div>

        <DashboardCards />

        <div className="dashboardContent">

          <div className="leftPanel">

            <div className="adminCard">

              <h2>

                {editProduct
                  ? "✏ Edit Product"
                  : "➕ Add Product"}

              </h2>

              <ProductForm
                key={
                  editProduct?._id ||
                  editProduct?.id ||
                  "new"
                }
                editMode={!!editProduct}
                initialData={editProduct}
                onSuccess={handleSuccess}
              />

              {editProduct && (

                <button
                  className="dangerBtn mt20"
                  type="button"
                  onClick={() => setEditProduct(null)}
                >

                  Cancel Edit

                </button>

              )}

            </div>

          </div>

          <div className="rightPanel">

            <div className="adminCard">

              <h2>

                📦 Product List

              </h2>

              <ProductTable
                key={refreshKey}
                onEdit={handleEdit}
              />

            </div>

          </div>

        </div>

        <div className="bottomSection">

          <div className="adminCard">

            <CategoryManager />

          </div>

          <div className="adminCard">

            <ImportCSV />

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}
