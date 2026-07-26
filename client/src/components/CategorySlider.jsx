const categories = [
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

export default function CategorySlider() {
  return (
    <section id="categories" className="categories">
      <div className="container">

        <h2>Browse Categories</h2>

        <div className="categoryGrid">
          {categories.map((category) => (
            <button
              key={category}
              className="categoryCard"
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
