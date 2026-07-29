import CSVUploader from "./CSVUploader";

export default function ImportCSV() {
  return (
    <div className="adminPage">

      <div className="adminHeader">
        <h1>CSV Product Import</h1>

        <p>
          Upload a CSV file to import products into your Affiliate Hub.
        </p>
      </div>

      <div className="adminCard">
        <CSVUploader />
      </div>

    </div>
  );
}
