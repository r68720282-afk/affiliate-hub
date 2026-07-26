import { useMemo, useState } from "react";
import axios from "axios";

const CATEGORIES = [
  "Fashion",
  "Electronics",
  "Beauty",
  "Home & Kitchen",
  "Health",
  "Baby",
  "Sports",
  "Books",
  "Grocery"
];

const STORE_OPTIONS = [
  "Amazon",
  "Flipkart",
  "Meesho",
  "Myntra",
  "Ajio",
  "Nykaa"
];

const createProduct = () => ({
  title: "",
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
});

export default function ProductForm({

  editMode = false,

  initialData = null,

  onSuccess = () => {}

}) {

  const [product, setProduct] = useState(
    initialData || createProduct()
  );

  const [loading, setLoading] = useState(false);

  const slug = useMemo(() => {

    return product.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  }, [product.title]);

  function updateField(name, value) {

    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

  }

  function updateSeo(name, value) {

    setProduct(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value
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
      images
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
      features
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
      specifications
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
      stores
    }));

  }

  async function handleSubmit(e) {

    e.preventDefault();

    // PART 3
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

        <div>

          <label>

            Product Name

          </label>

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

        </div>

        <div>

          <label>

            Brand

          </label>

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

        </div>

        <div>

          <label>

            Category

          </label>

          <select
            value={product.category}
            onChange={(e)=>
              updateField(
                "category",
                e.target.value
              )
            }
          >

            {CATEGORIES.map(category => (

              <option
                key={category}
                value={category}
              >

                {category}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label>

            Slug

          </label>

          <input
            value={slug}
            readOnly
          />

        </div>

      </div>

      {/* ---------- PART 2 START ---------- */}

    </form>

  );

}
