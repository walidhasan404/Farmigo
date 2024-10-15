import Hero from "../Sections/Hero/Hero";
import Categories from "../Sections/Categories/Categories";
import Blogs from "../Sections/Blogs/Blogs";
import ProductsSections from "../Sections/ProductsSection/ProductsSections";
import useMeta from "../../../common/Hooks/useMeta";
import Ads from "../Sections/Ads Section/Ads";


const Home = () => {
    useMeta({
        title: 'Home - Farmigo',
        description: 'Welcome to the home page',
      });
    return (
        <div >
            <Hero />
            <Categories />
            <ProductsSections />
            <Ads/>
            <Blogs />
        </div>
    );
};

export default Home;