import Hero from "../Sections/Hero/Hero";
import Categories from "../Sections/Categories/Categories";
import Blogs from "../Sections/Blogs/Blogs";
import ProductsSections from "../Sections/ProductsSection/ProductsSections";


const Home = () => {
    return (
        <div >
            <Hero />
            <Categories />
            <ProductsSections />
            <Blogs />
        </div>
    );
};

export default Home;