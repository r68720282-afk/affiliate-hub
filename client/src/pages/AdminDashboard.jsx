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
  }

  return (
    <AdminLayout>
      <div className="adminPage">

        {/* Header */}

        <div className="adminHeader">

          <div>

            <h1>Affiliate Hub Admin</h1>

            <p>
              Manage Products, Categories and CSV Imports
              from one dashboard.
            </p>

          </div>

        </div>

        {/* Dashboard Cards */}

        <DashboardCards />

        {/* Product Section */}

        <div className="dashboardContent">

          {/* Left Panel */}

          <div className="leftPanel">

            <div className="adminCard">

              <h2>
                {editProduct
                  ? "✏ Edit Product"
                  : "➕ Add Product"}
              </h2>

              <ProductForm
                key={editProduct?.id || "new"}
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

          {/* Right Panel */}

          <div className="rightPanel">

            <div className="adminCard">

              <h2>📦 Product List</h2>

              <ProductTable
                key={refreshKey}
                onEdit={setEditProduct}
              />

            </div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="bottomSection">

          <div className="adminCard">

            <h2>🗂 Category Management</h2>

            <CategoryManager />

          </div>

          <div className="adminCard">

            <h2>📂 CSV Import</h2>

            <ImportCSV />

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
