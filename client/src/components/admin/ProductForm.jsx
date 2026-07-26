import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = "/api/products";

const CATEGORY_OPTIONS = [
  "Fashion",
  "Electronics",
  "Beauty",
  "Home & Kitchen",
  "Health",
  "Sports",
  "Books",
  "Grocery",
  "Baby"
];

const STORE_OPTIONS = [
  "Amazon",
  "Flipkart",
  "Meesho",
  "Myntra",
  "Ajio",
  "Nykaa"
];

function emptyProduct() {
  return {
    id: "",
    title: "",
    slug: "",
    brand: "",
    category: "Fashion",

    shortDescription: "",
    description: "",

    images: [""],

    features: [""],

    specifications: [
      {
        key: "",
        value: ""
      }
    ],

    stores: [
      {
        name: "Amazon",
        price: "",
        affiliateLink: ""
      }
    ],

    seo: {
      title: "",
      description: "",
      keywords: ""
    },

    featured: false,
    trending: false,
    active: true
  };
}

export default function ProductForm({
  editMode = false,
  initialData = null,
  onSuccess = () => {}
}) {

  const [product, setProduct] = useState(emptyProduct());

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {

    if (editMode && initialData) {

      setProduct({
        ...emptyProduct(),
        ...initialData
      });

    }

  }, [editMode, initialData]);

  const slug = useMemo(() => {

    return product.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  }, [product.title]);

  useEffect(() => {

    setProduct(prev => ({
      ...prev,
      slug
    }));

  }, [slug]);

  function updateField(name, value) {

    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

  }

  function updateSeo(field, value) {

    setProduct(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }));

  }

  function updateImage(index, value) {

    const images = [...product.images];

    images[index] = value;

    setProduct(prev => ({
      ...prev,
      images
    }));

  }

  function addImage() {

    setProduct(prev => ({
      ...prev,
      images: [...prev.images, ""]
    }));

  }

  function removeImage(index) {

    const images = [...product.images];

    images.splice(index, 1);

    setProduct(prev => ({
      ...prev,
      images: images.length ? images : [""]
    }));

  }

  function updateFeature(index, value) {

    const features = [...product.features];

    features[index] = value;

    setProduct(prev => ({
      ...prev,
      features
    }));

  }

  function addFeature() {

    setProduct(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));

  }

  function removeFeature(index) {

    const features = [...product.features];

    features.splice(index, 1);

    setProduct(prev => ({
      ...prev,
      features: features.length ? features : [""]
    }));

  }

  function updateSpecification(index, field, value) {

    const specifications = [...product.specifications];

    specifications[index][field] = value;

    setProduct(prev => ({
      ...prev,
      specifications
    }));

  }

  function addSpecification() {

    setProduct(prev => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        {
          key: "",
          value: ""
        }
      ]
    }));

  }

  function removeSpecification(index) {

    const specifications = [...product.specifications];

    specifications.splice(index, 1);

    setProduct(prev => ({
      ...prev,
      specifications:
        specifications.length
          ? specifications
          : [
              {
                key: "",
                value: ""
              }
            ]
    }));

  }

  function updateStore(index, field, value) {

    const stores = [...product.stores];

    stores[index][field] = value;

    setProduct(prev => ({
      ...prev,
      stores
    }));

  }

  function addStore() {

    setProduct(prev => ({
      ...prev,
      stores: [
        ...prev.stores,
        {
          name: "",
          price: "",
          affiliateLink: ""
        }
      ]
    }));

  }

  function removeStore(index) {

    const stores = [...product.stores];

    stores.splice(index, 1);

    setProduct(prev => ({
      ...prev,
      stores: stores.length
        ? stores
        : [
            {
              name: "Amazon",
              price: "",
              affiliateLink: ""
            }
          ]
    }));

  }

  function validate() {

    const nextErrors = {};

    if (!product.title.trim()) {
      nextErrors.title = "Product title is required.";
    }

    if (!product.brand.trim()) {
      nextErrors.brand = "Brand is required.";
    }

    if (!product.shortDescription.trim()) {
      nextErrors.shortDescription = "Short description is required.";
    }

    if (!product.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!product.images[0]) {
      nextErrors.images = "Main image is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }  
  async function handleSubmit(e) {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const payload = {
        ...product,
        slug
      };

      if (editMode) {

        await axios.put(
          `${API}/${product.id}`,
          payload
        );

      } else {

        await axios.post(
          API,
          payload
        );

      }

      onSuccess();

      if (!editMode) {

        setProduct(emptyProduct());

      }

      setErrors({});

    } catch (err) {

      console.error(err);

      alert("Unable to save product.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      className="productForm"
      onSubmit={handleSubmit}
    >

      <h2>

        {editMode
          ? "Edit Product"
          : "Add Product"}

      </h2>

      <div className="formGrid">

        <div className="formGroup">

          <label>Product Name</label>

          <input
            type="text"
            value={product.title}
            onChange={(e)=>
              updateField(
                "title",
                e.target.value
              )
            }
          />

          {errors.title && (
            <small className="error">
              {errors.title}
            </small>
          )}

        </div>

        <div className="formGroup">

          <label>Brand</label>

          <input
            type="text"
            value={product.brand}
            onChange={(e)=>
              updateField(
                "brand",
                e.target.value
              )
            }
          />

          {errors.brand && (
            <small className="error">
              {errors.brand}
            </small>
          )}

        </div>

        <div className="formGroup">

          <label>Category</label>

          <select
            value={product.category}
            onChange={(e)=>
              updateField(
                "category",
                e.target.value
              )
            }
          >

            {CATEGORY_OPTIONS.map(item => (

              <option
                key={item}
                value={item}
              >

                {item}

              </option>

            ))}

          </select>

        </div>

        <div className="formGroup">

          <label>Slug</label>

          <input
            value={slug}
            readOnly
          />

        </div>

      </div>

      <div className="formGroup">

        <label>Short Description</label>

        <textarea
          rows={3}
          value={product.shortDescription}
          onChange={(e)=>
            updateField(
              "shortDescription",
              e.target.value
            )
          }
        />

        {errors.shortDescription && (
          <small className="error">
            {errors.shortDescription}
          </small>
        )}

      </div>

      <div className="formGroup">

        <label>Full Description</label>

        <textarea
          rows={6}
          value={product.description}
          onChange={(e)=>
            updateField(
              "description",
              e.target.value
            )
          }
        />

        {errors.description && (
          <small className="error">
            {errors.description}
          </small>
        )}

      </div>

      <hr />

      <h3>Images</h3>

      {product.images.map((img,index)=>(

        <div
          key={index}
          className="dynamicRow"
        >

          <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e)=>
              updateImage(
                index,
                e.target.value
              )
            }
          />

          {product.images.length>1 && (

            <button
              type="button"
              onClick={()=>
                removeImage(index)
              }
            >

              Remove

            </button>

          )}

        </div>

      ))}

      {errors.images && (

        <small className="error">

          {errors.images}

        </small>

      )}

      <button
        type="button"
        onClick={addImage}
      >

        + Add Image

      </button>

      <hr />

      <h3>Features</h3>

      {product.features.map((feature,index)=>(

        <div
          key={index}
          className="dynamicRow"
        >

          <input
            value={feature}
            placeholder="Feature"
            onChange={(e)=>
              updateFeature(
                index,
                e.target.value
              )
            }
          />

          {product.features.length>1 && (

            <button
              type="button"
              onClick={()=>
                removeFeature(index)
              }
            >

              Remove

            </button>

          )}

        </div>

      ))}

      <button
        type="button"
        onClick={addFeature}
      >

        + Add Feature

      </button>

      <hr />

      <h3>Specifications</h3>

      {product.specifications.map((spec,index)=>(

        <div
          key={index}
          className="dynamicRow"
        >

          <input
            placeholder="Key"
            value={spec.key}
            onChange={(e)=>
              updateSpecification(
                index,
                "key",
                e.target.value
              )
            }
          />

          <input
            placeholder="Value"
            value={spec.value}
            onChange={(e)=>
              updateSpecification(
                index,
                "value",
                e.target.value
              )
            }
          />

          {product.specifications.length>1 && (

            <button
              type="button"
              onClick={()=>
                removeSpecification(index)
              }
            >

              Remove

            </button>

          )}

        </div>

      ))}

      <button
        type="button"
        onClick={addSpecification}
      >

        + Add Specification

      </button>
            <hr />

      <h3>Store Prices & Affiliate Links</h3>

      {product.stores.map((store, index) => (

        <div
          key={index}
          className="storeCard"
        >

          <select
            value={store.name}
            onChange={(e) =>
              updateStore(
                index,
                "name",
                e.target.value
              )
            }
          >

            <option value="">
              Select Store
            </option>

            {STORE_OPTIONS.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

          <input
            type="text"
            placeholder="Price"
            value={store.price}
            onChange={(e) =>
              updateStore(
                index,
                "price",
                e.target.value
              )
            }
          />

          <input
            type="url"
            placeholder="Affiliate Link"
            value={store.affiliateLink}
            onChange={(e) =>
              updateStore(
                index,
                "affiliateLink",
                e.target.value
              )
            }
          />

          {product.stores.length > 1 && (

            <button
              type="button"
              onClick={() =>
                removeStore(index)
              }
            >
              Remove
            </button>

          )}

        </div>

      ))}

      <button
        type="button"
        onClick={addStore}
      >
        + Add Store
      </button>

      <hr />

      <h3>SEO</h3>

      <div className="formGroup">

        <label>Meta Title</label>

        <input
          type="text"
          value={product.seo.title}
          onChange={(e) =>
            updateSeo(
              "title",
              e.target.value
            )
          }
        />

      </div>

      <div className="formGroup">

        <label>Meta Description</label>

        <textarea
          rows={4}
          value={product.seo.description}
          onChange={(e) =>
            updateSeo(
              "description",
              e.target.value
            )
          }
        />

      </div>

      <div className="formGroup">

        <label>Keywords</label>

        <input
          type="text"
          placeholder="keyword1, keyword2, keyword3"
          value={product.seo.keywords}
          onChange={(e) =>
            updateSeo(
              "keywords",
              e.target.value
            )
          }
        />

      </div>

      <hr />

      <h3>Status</h3>

      <div className="checkboxGroup">

        <label>

          <input
            type="checkbox"
            checked={product.featured}
            onChange={(e) =>
              updateField(
                "featured",
                e.target.checked
              )
            }
          />

          Featured

        </label>

        <label>

          <input
            type="checkbox"
            checked={product.trending}
            onChange={(e) =>
              updateField(
                "trending",
                e.target.checked
              )
            }
          />

          Trending

        </label>

        <label>

          <input
            type="checkbox"
            checked={product.active}
            onChange={(e) =>
              updateField(
                "active",
                e.target.checked
              )
            }
          />

          Active

        </label>

      </div>

      <hr />

      <div className="formActions">

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : editMode
              ? "Update Product"
              : "Save Product"}

        </button>

        {!editMode && (

          <button
            type="button"
            onClick={() => {

              setProduct(
                emptyProduct()
              );

              setErrors({});

            }}
          >

            Reset

          </button>

        )}

      </div>

    </form>

  );

}
