import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";

export default function FeaturedProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch(console.error);

  }, []);

  return (

    <section
      id="featured"
      className="featuredProducts"
    >

      <div className="container">

        <h2>Featured Deals</h2>

        <div className="productGrid">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>

  );
}
