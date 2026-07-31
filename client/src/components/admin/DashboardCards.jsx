import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardCards() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    featuredProducts: 0,
    activeProducts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      setLoading(true);

      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/categories"),
      ]);

      const products = Array.isArray(productsRes.data)
        ? productsRes.data
        : productsRes.data?.products || [];

      const categories = Array.isArray(categoriesRes.data)
        ? categoriesRes.data
        : categoriesRes.data?.categories || [];

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

      console.error("Dashboard Error:", error);

      setStats({
        totalProducts: 0,
        totalCategories: 0,
        featuredProducts: 0,
        activeProducts: 0,
      });

    } finally {

      setLoading(false);

    }

  }

  const cards = [
    {
      id: 1,
      title: "Total Products",
      value: stats.totalProducts,
      icon: "📦",
      color: "blue",
      text: "Available Products",
    },
    {
      id: 2,
      title: "Categories",
      value: stats.totalCategories,
      icon: "🗂️",
      color: "green",
      text: "Product Categories",
    },
    {
      id: 3,
      title: "Featured",
      value: stats.featuredProducts,
      icon: "⭐",
      color: "orange",
      text: "Featured Products",
    },
    {
      id: 4,
      title: "Active",
      value: stats.activeProducts,
      icon: "🟢",
      color: "purple",
      text: "Currently Active",
    },
  ];

  if (loading) {

    return (
      <div className="loading">
        Loading Dashboard...
      </div>
    );

  }

  return (

    <div className="dashboardGrid">

      {cards.map((card) => (

        <div
          key={card.id}
          className={`dashboardCard ${card.color}`}
        >

          <div className="cardTop">

            <div className="cardIcon">
              {card.icon}
            </div>

            <div className="cardInfo">

              <h4>{card.title}</h4>

              <p>{card.text}</p>

            </div>

          </div>

          <h2>{card.value.toLocaleString()}</h2>

          <span className="cardTrend">

            Live Data

          </span>

        </div>

      ))}

    </div>

  );

}
