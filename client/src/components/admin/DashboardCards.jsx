import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardCards() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    axios
      .get("/api/products")
      .then(res => {
        setCount(res.data.total);
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

        <h3>Admin</h3>

        <h1>1</h1>

      </div>

    </div>

  );

}
