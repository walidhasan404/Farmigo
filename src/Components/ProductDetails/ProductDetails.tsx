import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyProducts, Product } from "../../data/products";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDetails = () => {
        setLoading(true);
        const productId = Number(id);

        const findProduct = dummyProducts.find((product) => product.id === productId);

        if (findProduct) {
            setProduct(findProduct);
        } else {
            setError("Product not found");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    if (loading) return <div className="text-center p-4 text-xl text-blue-600">Loading...</div>;
    if (error) return <p className="text-center text-red-600 text-xl">Error: {error}</p>;

    return (
        <section className="text-gray-600 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white rounded-lg overflow-hidden">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 p-6">
                        <h2 className="text-sm title-font text-indigo-600 tracking-widest">BRAND NAME</h2>
                        <h1 className="text-gray-900 text-4xl font-bold mb-4">{product?.name}</h1>
                        <div className="flex mb-4 border-b-2 border-teal-500">
                            <a className="flex-grow text-teal-500 py-2 text-lg px-1">Description</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
                        </div>
                        <p className="leading-relaxed mb-4 text-gray-700">{product?.description}</p>
                        <div className="flex border-t border-gray-300 py-2">
                            <span className="text-gray-600 font-medium">Category:</span>
                            <span className="ml-auto text-gray-900">{product?.category}</span>
                        </div>
                        <div className="flex border-t border-gray-300 py-2">
                            <span className="text-gray-600 font-medium">Stock:</span>
                            <span className="ml-auto text-gray-900">{product?.stock}</span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-300 py-2">
                            <span className="text-gray-600 font-medium">Rating:</span>
                            <span className="ml-auto text-gray-900">{product?.rating} / 5</span>
                        </div>
                        <div className="flex items-center">
                            <span className="title-font font-bold text-3xl text-gray-900">${product?.price.toFixed(2)}</span>
                            <button className="ml-auto text-white bg-teal-500 border-0 py-3 px-6 focus:outline-none hover:bg-teal-600 rounded-lg shadow-lg transition-all duration-300">Add to Cart</button>
                            <button className="ml-4 rounded-full w-12 h-12 bg-gray-300 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:bg-gray-400 transition-all duration-300">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <img
                        alt="product"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg"
                        src={product?.image}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
