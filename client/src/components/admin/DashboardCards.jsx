import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardCards() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    axios
      .get("/api/products")
      .then((res) => {
        setCount(res.data.total || 0);
      })
      .catch(() => {
        setCount(0);
      });

  }, []);

  return (

    <div className="dashboardCards">

      <div className="card">
        <h3>Total Products</h3>
        <h1>{count}</h1>
      </div>

      <div className="card">
        <h3>Categories</h3>
        <h1>9</h1>
      </div>

      <div className="card">
        <h3>CSV Imports</h3>
        <h1>0</h1>
      </div>

      <div className="card">
        <h3>Total Clicks</h3>
        <h1>0</h1>
      </div>

    </div>

  );

}
