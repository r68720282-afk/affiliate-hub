import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="productCard">

      <img
        src={product.images[0]}
        alt={product.title}
      />

      <h3>{product.title}</h3>

      <p>{product.brand}</p>

      <div className="rating">
        ⭐ {product.rating}
      </div>

      <div className="priceBox">
        <strong>{product.stores[0].price}</strong>
      </div>

      <Link
        to={`/product/${product.id}`}
        className="viewBtn"
      >
        View Deals
      </Link>

    </div>
  );
}
