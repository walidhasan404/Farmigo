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

    if (loading) return <div>
        loading.....
    </div>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="p-6">
            {product ? (
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <img
                        className="w-full h-64 object-cover"
                        src={product.image}
                        alt={product.name}
                    />
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
                        <p className="mt-2 text-gray-600">Price: ${product.price.toFixed(2)}</p>
                        <p className="mt-2 text-gray-600">Category: {product.category}</p>
                        <p className="mt-2 text-gray-600">Stock: {product.stock}</p>
                        <p className="mt-4 text-gray-700">{product.description}</p>
                        <p className="mt-4 text-yellow-500">Rating: {product.rating} / 5</p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Product details not available</p>
            )}
        </div>
    );
};

export default ProductDetails;