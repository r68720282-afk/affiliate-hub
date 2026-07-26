import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategorySlider from "../components/CategorySlider";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <Hero />

      <SearchBar />

      <CategorySlider />

      <FeaturedProducts />

      <Footer />
    </>
  );
}
