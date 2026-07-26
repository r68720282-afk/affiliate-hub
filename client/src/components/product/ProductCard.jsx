import { Link } from "react-router-dom";

export default function ProductCard({
  product
}) {

  if (!product) return null;

  const lowestStore =
    product.stores?.length
      ? [...product.stores].sort(
          (a, b) =>
            Number(a.price || 0) -
            Number(b.price || 0)
        )[0]
      : null;

  return (

    <div className="productCard">

      <Link
        to={`/product/${product.slug}`}
      >

        <img
          src={
            product.images?.[0] ||
            "/placeholder.png"
          }
          alt={product.title}
          className="productImage"
        />

      </Link>

      <div className="productContent">

        <span className="productCategory">

          {product.category}

        </span>

        <Link
          to={`/product/${product.slug}`}
          className="productTitle"
        >

          {product.title}

        </Link>

        <p className="productBrand">

          Brand :
          <strong>
            {" "}
            {product.brand}
          </strong>

        </p>

        <p className="productDescription">

          {product.shortDescription}

        </p>

        <div className="priceSection">

          {lowestStore ? (

            <>
              <span className="price">

                ₹{lowestStore.price}

              </span>

              <small>

                {lowestStore.name}

              </small>
            </>

          ) : (

            <small>

              Price unavailable

            </small>

          )}

        </div>

        <div className="cardButtons">

          <Link
            to={`/product/${product.slug}`}
            className="detailsBtn"
          >

            View Details

          </Link>

          {lowestStore && (

            <a
              href={
                lowestStore.affiliateLink
              }
              target="_blank"
              rel="noreferrer"
              className="buyBtn"
            >

              Buy Now

            </a>

          )}

        </div>

      </div>

    </div>

  );

}
