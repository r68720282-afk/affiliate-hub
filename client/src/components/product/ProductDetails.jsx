import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "/api/products";

export default function ProductDetails() {

  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProduct();

  }, [slug]);

  async function loadProduct() {

    try {

      setLoading(true);

      const { data } =
        await axios.get(`${API}/${slug}`);

      setProduct(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

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

        <div className="detailsGrid">

          <div className="imageSection">

            <img
              src={product.images?.[0]}
              alt={product.title}
            />

          </div>

          <div className="infoSection">

            <h1>

              {product.title}

            </h1>

            <p>

              <strong>Brand:</strong>{" "}
              {product.brand}

            </p>

            <p>

              <strong>Category:</strong>{" "}
              {product.category}

            </p>

            <p>

              {product.description}

            </p>

            <h3>

              Features

            </h3>

            <ul>

              {product.features?.map(
                (item, index) => (

                  <li key={index}>

                    {item}

                  </li>

                )
              )}

            </ul>

            <h3>

              Specifications

            </h3>

            <table>

              <tbody>

                {product.specifications?.map(
                  (spec, index) => (

                    <tr key={index}>

                      <td>

                        {spec.key}

                      </td>

                      <td>

                        {spec.value}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            <h3>

              Buy From

            </h3>

            <div className="storeButtons">

              {product.stores?.map(
                (store, index) => (

                  <a
                    key={index}
                    href={store.affiliateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="buyBtn"
                  >

                    {store.name}
                    {" - "}
                    ₹{store.price}

                  </a>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}
