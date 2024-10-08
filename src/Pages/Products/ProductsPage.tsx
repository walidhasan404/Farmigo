import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    product_name: string;
    category: string;
    price: number;
    rating: string;
    images: string[];
    weight: number; // Added weight property
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [sortOption, setSortOption] = useState<string>("price-asc");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // For dropdown visibility
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Track quantities for each product

    const categories = ["All", "Dairy", "Vegetables", "Grains & Cereal", "Fruits", "Honey & Jam"];
    const sortOptions = [
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "rating-asc", label: "Rating: Low to High" },
        { value: "rating-desc", label: "Rating: High to Low" },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_API+'/products');
                const data = await res.json();
                if (data.success) {
                    setProducts(data.data);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (err) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        // Handle adding to cart logic
        const quantity = quantities[product._id] || 1; // Default to 1 if not set
        console.log(`Adding ${quantity} of ${product.product_name} to cart.`);
        // Add logic to update cart state here
    };

    const handleQuantityChange = (productId: string, value: number) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: value,
        }));
    };

    const filteredProducts = products
        .filter((product) =>
            product.product_name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) => {
            if (category === "All") {
                return true;
            }
            return product.category === category;
        })
        .sort((a, b) => {
            switch (sortOption) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "rating-asc":
                    return parseFloat(a.rating) - parseFloat(b.rating);
                case "rating-desc":
                    return parseFloat(b.rating) - parseFloat(a.rating);
                default:
                    return 0;
            }
        });

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex flex-col gap-4 md:flex-row md:space-x-6 items-center justify-between mb-6 lg:mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow transition-all mb-4 md:mb-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex space-x-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${category === cat
                                ? "bg-blue-500 text-white shadow-lg scale-105"
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-left shadow bg-white"
                    >
                        {sortOptions.find(option => option.value === sortOption)?.label}
                    </button>
                    {dropdownOpen && (
                        <div className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-2 z-10">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSortOption(option.value);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full text-left p-3 hover:bg-gray-100 ${sortOption === option.value ? "bg-gray-100 font-bold" : ""}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg overflow-hidden border transform transition duration-500 ease-in-out">
                        <Link to={`/products/${product._id}`} className="relative block">
                            {product.rating && (
                                <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-bold rounded">
                                    {product.rating} ⭐
                                </span>
                            )}
                            <img
                                src={product.images[0]}
                                alt={product.product_name}
                                className="w-full h-64 object-cover"
                            />
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{product.product_name}</h2>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="text-green-600 font-semibold">${product.price.toFixed(2)}</p>
                            <p className="text-gray-400">Weight: {product.weight} kg</p>
                            <div className="flex items-center mt-2">
                                {/* <input
                                    type="number"
                                    min="1"
                                    value={quantities[product._id] || 1}
                                    onChange={(e) => handleQuantityChange(product._id, Number(e.target.value))}
                                    className="w-16 p-2 border rounded mr-2"
                                /> */}
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
