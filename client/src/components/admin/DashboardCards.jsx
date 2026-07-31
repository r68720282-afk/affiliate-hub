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

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "📦",
      color: "blue",
      change: "+12%",
      text: "Available Products",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: "🗂",
      color: "green",
      change: "+4%",
      text: "Product Categories",
    },
    {
      title: "Featured",
      value: stats.featuredProducts,
      icon: "⭐",
      color: "orange",
      change: "+8%",
      text: "Featured Products",
    },
    {
      title: "Active",
      value: stats.activeProducts,
      icon: "🟢",
      color: "purple",
      change: "+15%",
      text: "Currently Active",
    },
  ];

  return (
    <div className="dashboardGrid">
      {cards.map((card, index) => (
        <div
          className={`dashboardCard ${card.color}`}
          key={index}
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

          <h2>{card.value}</h2>

          <span className="cardTrend">
            ▲ {card.change} this month
          </span>
        </div>
      ))}
    </div>
  );
}
