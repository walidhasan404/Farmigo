import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Import Link

interface Product {
    _id: string; 
    product_name: string; 
    price: number;
    category: string;
    images: string[]; 
}

const ProductsSection = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://farmigo-server.onrender.com/api/v1/products");

                if (response.data.success) {
                    setProducts(response.data.data);
                } else {
                    setError("Data format is incorrect.");
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to load data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 6, products.length));
    };

    if (loading) {
        return <div>Loading Data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const latestProducts = products.slice(2, visibleCount); 

    return (
        <div className="pt-10 bg-gray-50 sm:pt-16 lg:pt-24 max-w-7xl mx-auto">
            <div className="flex items-end justify-between my-10">
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Latest from Products</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-2xl mx-auto gap-4">
                {latestProducts.map((item) => (
                    <div key={item._id} className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" to={`/products/${item._id}`}>
                            <img className="object-cover" src={item.images[0]} alt={`${item.product_name}`} />
                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{item.category}</span>
                        </Link>
                        <div className="mt-4 px-5 pb-5">
                            <Link to={`/products/${item._id}`}>
                                <h5 className="text-xl tracking-tight text-slate-900">{item.product_name}</h5>
                            </Link>
                            <div className="mt-2 mb-5 flex items-center justify-between">
                                <p>
                                    <span className="text-3xl font-bold text-slate-900">${item.price}</span>
                                </p>
                            </div>
                            {/* <div className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to cart
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < products.length && (
                <p onClick={handleShowMore} className="pt-6 text-black font-bold rounded cursor-pointer text-end">
                    Show More...
                </p>
            )}
        </div>
    );
};

export default ProductsSection;
