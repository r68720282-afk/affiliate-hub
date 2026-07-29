import { useState } from "react";

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
    <div className="adminDashboard">

      {/* Header */}
      <div className="dashboardHeader">
        <h1>Affiliate Admin Panel</h1>
        <p>Manage Products, Categories and CSV Imports</p>
      </div>

      {/* Dashboard Summary */}
      <DashboardCards />

      {/* Product Form + Product Table */}
      <div className="dashboardContent">

        <div className="leftPanel">

          <ProductForm
            key={editProduct?.id || "new"}
            editMode={!!editProduct}
            initialData={editProduct}
            onSuccess={handleSuccess}
          />

          {editProduct && (
            <button
              className="cancelBtn"
              type="button"
              onClick={() => setEditProduct(null)}
            >
              Cancel Edit
            </button>
          )}

        </div>

        <div className="rightPanel">

          <ProductTable
            key={refreshKey}
            onEdit={setEditProduct}
          />

        </div>

      </div>

      {/* Category + CSV Section */}
      <div className="bottomSection">

        <div className="bottomCard">
          <CategoryManager />
        </div>

        <div className="bottomCard">
          <ImportCSV />
        </div>

      </div>

    </div>
  );
}
