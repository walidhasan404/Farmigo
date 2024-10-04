import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "../../../Products/ProductItem";

const ProductsSection = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API + "/products");
                // i working here
                setProducts(response.data.data);
              
                setLoading(false);
            } catch {
                setError("Failed to load data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    if (loading) {
        return <div>Loading Data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Get the latest products based on the length of the products array
    const latestProducts = products.slice(-visibleCount);

    return (
        <div className="pt-10 bg-gray-50 sm:pt-16 lg:pt-24 max-w-7xl mx-auto">

            <div className="flex items-end justify-between my-10">
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Latest from Products</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-2xl mx-auto gap-4">
                {latestProducts.map((product) => (
                    // BUGS // i working here
                    <ProductItem key={product._id} product={product} handleAddToCart={handleShowMore}/>
                   
                ))}
            </div>
            {visibleCount < products.length && (
                <p onClick={handleShowMore} className="pt-6 text-black font-bold rounded  text-end">
                    Show More...
                </p>
            )}
        </div>
    );
};

export default ProductsSection;
