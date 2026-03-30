import Hero from "../Components/Hero";
import Banner from "../Components/Banner";
import Category from "../Components/Category";
import NewJewelrys from "../Components/NewJewelrys";
import Deal from "../Components/Deals";
import TrendingProducts from "../Components/TrendingProducts";
import Testimonial from "../Components/Testimonials";
import News from "../Components/News";
import Reels from "../Components/Reels";

function Home() {
  return (
    <>
      <Hero />
      <Banner />
      <Category />
      <NewJewelrys />
      <Deal />
      <TrendingProducts />
      <Testimonial />
      <News />
      <Reels />
    </>
  );
}

export default Home;