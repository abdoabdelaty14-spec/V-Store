import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Category/Categories";
import Footer from "../../components/Footer/Footer";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";

function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Categories />
    <FeaturedProducts />
    <Footer />
</>
  );
}

export default Home;