import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Product {
    _id: string;
    product_name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    rating: number;
    images: string[];
    created_at: string;
}

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API+"/products");
                const productData = response.data.data.find((item: Product) => item._id === id);

                if (productData) {
                    setProduct(productData);
                    fetchRelatedProducts(productData.category)
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                setError("Error fetching product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const fetchRelatedProducts = async (category: string) => {
        try {
            const res = await axios.get("https://farmio-app.vercel.app/api/v1/products");
            const filteredProducts = res.data.data.filter((item: Product) => item.category === category && item._id !== id);
            setRelatedProducts(filteredProducts);
        } catch (err) {
            setError("Error fetching related products");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            {product && (
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {/* Product Info Section */}
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.toUpperCase()}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.product_name}</h1>
                            <div className="flex mb-4">
                                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
                                {/* <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a> */}
                            </div>
                            <p className="leading-relaxed mb-4">{product.description}</p>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">Rating</span>
                                <span className="ml-auto text-gray-900">{product.rating}</span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">Quantity</span>
                                <span className="ml-auto text-gray-900">{product.quantity}</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-500">Price</span>
                                <span className="ml-auto text-gray-900">${product.price.toFixed(2)}</span>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <span className="text-gray-200">.</span><svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg><span className="text-gray-200">.</span>
                                </button> */}
                            </div>
                        </div>

                        {/* Product Image Section */}
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={product.images[0]}
                        />
                    </div>
                    {relatedProducts.length > 0 && (
                        <div className="related-products mt-12">
                            <h2 className="text-2xl font-medium text-gray-900 mb-4">Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <div key={relatedProduct._id} className="product-card border p-4 rounded-lg">
                                        <Link to={`/products/${relatedProduct._id}`}>
                                            <img
                                                alt={relatedProduct.product_name}
                                                className="w-full h-48 object-cover object-center mb-4"
                                                src={relatedProduct.images[0]}
                                            />
                                            <h3 className="text-gray-900 text-lg font-medium">{relatedProduct.product_name}</h3>
                                            <p className="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
