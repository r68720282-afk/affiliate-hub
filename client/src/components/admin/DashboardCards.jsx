import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardCards() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    featuredProducts: 0,
    activeProducts: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {

      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/categories"),
      ]);

      const products = Array.isArray(productsRes.data)
        ? productsRes.data
        : productsRes.data.products || [];

      const categories = Array.isArray(categoriesRes.data)
        ? categoriesRes.data
        : [];

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        featuredProducts: products.filter(
          (item) => item.featured
        ).length,
        activeProducts: products.filter(
          (item) => item.active
        ).length,
      });

    } catch (error) {

      console.error(error);

    }
  }

  return (

    <div className="dashboardGrid">

      <div className="dashboardCard">

        <h3>📦 Total Products</h3>

        <h2>{stats.totalProducts}</h2>

      </div>

      <div className="dashboardCard">

        <h3>🗂 Categories</h3>

        <h2>{stats.totalCategories}</h2>

      </div>

      <div className="dashboardCard">

        <h3>⭐ Featured Products</h3>

        <h2>{stats.featuredProducts}</h2>

      </div>

      <div className="dashboardCard">

        <h3>🟢 Active Products</h3>

        <h2>{stats.activeProducts}</h2>

      </div>

    </div>

  );

}
