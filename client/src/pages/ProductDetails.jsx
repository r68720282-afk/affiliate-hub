import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import ProductCard from "../components/product/ProductCard";

const API =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/products`
    : "https://affiliate-hub-7xjp.onrender.com/api/products";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  async function loadProduct() {
    try {
      setLoading(true);

      const [{ data }, { data: allProducts }] =
        await Promise.all([
          axios.get(`${API}/${slug}`),
          axios.get(API),
        ]);

      setProduct(data.product || data);

      setProducts(
        Array.isArray(allProducts)
          ? allProducts
          : allProducts.products || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const lowestStore = useMemo(() => {
    if (!product?.stores?.length) return null;

    return [...product.stores].sort((a, b) => {
      const priceA = parseFloat(
        String(a.price).replace(/[^\d.]/g, "")
      );

      const priceB = parseFloat(
        String(b.price).replace(/[^\d.]/g, "")
      );

      return priceA - priceB;
    })[0];
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          item.slug !== product.slug &&
          item.category === product.category
      )
      .slice(0, 4);
  }, [products, product]);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <main className="productDetails">
      <div className="container">

        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {" / "}
          <Link to="/products">Products</Link>
          {" / "}
          {product.title}
        </div>

        <div className="detailsGrid">

          <div className="imageSection">

            <img
              src={product.images?.[0]}
              alt={product.title}
            />

          </div>

          <div className="infoSection">

            <div className="badgeRow">

              <span className="categoryBadge">
                {product.category}
              </span>

              <span className="brandBadge">
                {product.brand}
              </span>

            </div>

            <h1>{product.title}</h1>

            <div className="ratingBox">
              ⭐ {product.rating || "N/A"}
              {product.reviews &&
                ` (${product.reviews} Reviews)`}
            </div>

            <p>{product.description}</p>

            {lowestStore && (
              <div className="lowestPriceCard">
                <h3>Best Price</h3>

                <strong>
                  {lowestStore.price}
                </strong>

                <p>
                  Available at {lowestStore.name}
                </p>
              </div>
            )}

            <h3>Features</h3>

            <ul className="featureList">
              {product.features?.map((item, index) => (
                <li key={index}>
                  ✅ {item}
                </li>
              ))}
            </ul>

            <h3>Specifications</h3>

            <table className="specTable">
              <tbody>
                {product.specifications?.map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.key}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Compare Prices</h3>

            <div className="storeButtons">
                            {product.stores?.map((store, index) => (
                <a
                  key={index}
                  href={store.affiliateLink}
                  target="_blank"
                  rel="noreferrer"
                  className="buyBtn"
                >
                  <div className="storeRow">
                    <span>{store.name}</span>
                    <strong>{store.price}</strong>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>

        {relatedProducts.length > 0 && (
          <section className="relatedProducts">

            <div className="sectionHeader">
              <h2>Related Products</h2>
              <p>
                More products from the same category
              </p>
            </div>

            <div className="productsGrid">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item._id || item.slug}
                  product={item}
                />
              ))}
            </div>

          </section>
        )}

      </div>
    </main>
  );
}
