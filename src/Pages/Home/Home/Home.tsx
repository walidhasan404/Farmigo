import Hero from "../Sections/Hero/Hero";
import Categories from "../Sections/Categories/Categories";
import ProductsSections from "../Sections/ProductsSection/ProductsSections";
import Blogs from "../Sections/Blogs/Blogs";


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