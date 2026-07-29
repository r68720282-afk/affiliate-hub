import { useState } from "react";
import axios from "axios";

export default function CSVUploader({ onImportComplete }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);

    const input = document.getElementById("csvFileInput");
    if (input) input.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/csv/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(data);

      if (data.success) {
        onImportComplete?.();
      }
    } catch (error) {
      setResult({
        success: false,
        message:
          error.response?.data?.message ||
          "CSV upload failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="csvUploader">

      <h2>Import Products CSV</h2>

      <p className="csvInfo">
        Supported format: <strong>.csv</strong>
      </p>

      <input
        id="csvFileInput"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      {file && (
        <div className="selectedFile">
          <strong>Selected File:</strong> {file.name}
        </div>
      )}

      <div className="csvButtons">

        <button
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          disabled={loading}
        >
          Reset
        </button>

      </div>

      {result && (
        <div
          className={
            result.success
              ? "csvResult success"
              : "csvResult error"
          }
        >
          <h3>{result.message}</h3>

          {result.success && (
            <div className="csvStats">

              <div className="csvStatCard">
                <h4>Imported</h4>
                <p>{result.imported}</p>
              </div>

              <div className="csvStatCard">
                <h4>Skipped</h4>
                <p>{result.skipped}</p>
              </div>

              <div className="csvStatCard">
                <h4>Total Products</h4>
                <p>{result.total}</p>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
