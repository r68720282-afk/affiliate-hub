import { useState } from "react";
import axios from "axios";

export default function CSVUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
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

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "8px",
            background: result.success
              ? "#e8fff0"
              : "#ffe8e8",
          }}
        >
          <h3>{result.message}</h3>

          {result.success && (
            <>
              <p>
                Imported : {result.imported}
              </p>

              <p>
                Skipped : {result.skipped}
              </p>

              <p>
                Total Products : {result.total}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
