import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    product_name: string;
    category: string;
    price: number;
    quantity: string;
    description: string;
    rating: string;
    images: string[];
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [sortOption, setSortOption] = useState<string>("price-asc");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // For dropdown visibility

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
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow transition-all mb-4 md:mb-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Category Buttons */}
                <div className="flex space-x-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${category === cat
                                    ? "bg-blue-500 text-white shadow-lg scale-105" // Active state: Bold blue
                                    : "bg-blue-100 text-blue-600 hover:bg-blue-200" // Inactive state: Soft blue with hover effect
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Custom Sort Dropdown */}
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
                                    className={`w-full text-left p-3 hover:bg-gray-100 ${sortOption === option.value ? "bg-gray-100 font-bold" : ""
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg overflow-hidden border transform transition duration-500 ease-in-out">
                        <div className="relative">
                            <img
                                src={product.images[0]}
                                alt={product.product_name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {product.rating} ⭐
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl text-center font-bold text-gray-800">{product.product_name}</h2>
                            <p className="text-gray-500 text-center mt-2">{product.category}</p>
                            <p className="text-green-600 text-center font-semibold text-lg mt-2">${product.price.toFixed(2)}</p>

                            <Link to={`/products/${product._id}`}>
                                <button className="mt-6 w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 font-bold tracking-wide">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ProductsPage;
