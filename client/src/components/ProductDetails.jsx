import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch(console.error);

  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (

    <section className="productDetails">

      <div className="container">

        <img
          src={product.images[0]}
          alt={product.title}
        />

        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <h3>Compare Prices</h3>

        {product.stores.map((store) => (

          <a
            key={store.name}
            href={store.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="storeButton"
          >
            {store.name} — {store.price}
          </a>

        ))}

      </div>

    </section>

  );
}
