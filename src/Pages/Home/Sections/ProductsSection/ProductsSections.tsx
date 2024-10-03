import axios from "axios";
import { useEffect, useState } from "react";

const ProductsSection = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data.json");
                setProducts(response.data);
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
                {latestProducts.map((item, index) => (
                    <div key={index} className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                            <img className="object-cover" src={item.imageUrl} alt="product image" />
                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{item.category}</span>
                        </a>
                        <div className="mt-4 px-5 pb-5">
                            <a href="#">
                                <h5 className="text-xl tracking-tight text-slate-900">{item.name}</h5>
                            </a>
                            <div className="mt-2 mb-5 flex items-center justify-between">
                                <p>
                                    <span className="text-3xl font-bold text-slate-900">${item.price}</span>
                                    <span className="text-sm text-slate-900 line-through">${item.originalPrice}</span>
                                </p>
                            </div>
                            <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to cart
                            </a>
                        </div>
                    </div>
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
