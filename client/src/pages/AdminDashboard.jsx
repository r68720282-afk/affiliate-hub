import { useState } from "react";

import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";

export default function AdminDashboard() {

  const [editProduct, setEditProduct] =
    useState(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  function handleSuccess() {

    setEditProduct(null);

    setRefreshKey(prev => prev + 1);

  }

  return (

    <div className="adminDashboard">

      <div className="dashboardHeader">

        <h1>

          Affiliate Admin Panel

        </h1>

      </div>

      <div className="dashboardContent">

        <div className="leftPanel">

          <ProductForm
            key={
              editProduct?.id || "new"
            }
            editMode={!!editProduct}
            initialData={editProduct}
            onSuccess={handleSuccess}
          />

          {editProduct && (

            <button
              type="button"
              onClick={() =>
                setEditProduct(null)
              }
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

    </div>

  );

}
