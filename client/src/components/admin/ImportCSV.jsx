import { useState } from "react";
import CSVUploader from "./CSVUploader";

export default function ImportCSV() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleImportComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="adminPage">

      <div className="adminHeader">
        <h1>CSV Product Import</h1>

        <p>
          Upload a CSV file to quickly import products into your Affiliate Hub.
          Duplicate products will be skipped automatically.
        </p>
      </div>

      <div className="adminCard">
        <CSVUploader
          key={refreshKey}
          onImportComplete={handleImportComplete}
        />
      </div>

    </div>
  );
}
