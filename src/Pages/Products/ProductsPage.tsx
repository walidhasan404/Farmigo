import { useEffect, useState } from "react";
import { Product } from '../../Types/types';
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";
import ProductItem from "./ProductItem";


const ProductsPage: React.FC = () => {
    const { setCartItems } = useAuth()
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [sortOption, setSortOption] = useState<string>("price-asc");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const categories = ["All", "Dairy", "Vegetables", "Grains & Cereal", "Fruits", "Honey & Jam"];
    const sortOptions = [
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "rating-asc", label: "Rating: Low to High" },
        { value: "rating-desc", label: "Rating: High to Low" },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://farmigo-server.onrender.com/api/v1/products");
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

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(cart.length)
      }, [])

    const handleAddToCart = (product: Product, quantity: number = 1) => {
        
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')

        const itemIndex = cart.findIndex((item: Product) => item._id === product._id)


        if (itemIndex >= 0) {  
            cart[itemIndex].quantity = (cart[itemIndex].quantity || 0) + quantity
        } else {
            cart.push({ ...product, quantity })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        setCartItems(cart.length)

        //console.log('Updated cart:', cart)
    }

    // const handleQuantityChange = (productId: string, action: 'increment' | 'decrement') => {
    //     setQuantities((prevQuantities) => {
    //         const currentQty = prevQuantities[productId] || 1;
    //         const newQty = action === 'increment' ? currentQty + 1 : Math.max(1, currentQty - 1);
    //         return { ...prevQuantities, [productId]: newQty };
    //     });
    // };

    const filteredProducts = products
        .filter((product) => product.product_name.toLowerCase().includes(search.toLowerCase()))
        .filter((product) => (category === "All" ? true : product.category === category))
        .sort((a, b) => {
            switch (sortOption) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "rating-asc":
                    return (a.rating) - (b.rating);
                case "rating-desc":
                    return (b.rating) - (a.rating);
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
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${category === cat ? "bg-blue-500 text-white shadow-lg scale-105" : "bg-blue-100 text-white hover:bg-blue-500"}`}
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
                    // <div key={product._id} className="bg-white rounded-lg overflow-hidden border transform transition duration-500 ease-in-out hover:shadow-lg">
                    //     <Link to={`/products/${product._id}`} className="relative block">
                    //         {product.rating && (
                    //             <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-bold rounded">
                    //                 {product.rating} ⭐
                    //             </span>
                    //         )}
                    //         <img
                    //             src={product.images[0]}
                    //             alt={product.product_name}
                    //             className="w-full h-64 object-cover"
                    //         />
                    //     </Link>
                    //     <div className="p-4">
                    //         <h2 className="text-lg font-semibold">{product.product_name}</h2>
                    //         <p className="text-gray-500">{product.category}</p>
                    //         <p className="text-green-600 font-semibold">${product.price.toFixed(2)}</p>
                    //         <p className="text-gray-400">Weight: {product.weight} kg</p>
                    //         <div className="flex items-center mt-4 space-x-4">
                    //             <div className="flex items-center space-x-2">
                    //                 <button
                    //                     onClick={() => handleQuantityChange(product._id, 'decrement')}
                    //                     className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    //                 >
                    //                     -
                    //                 </button>
                    //                 <span className="font-semibold">{quantities[product._id] || 1}</span>
                    //                 <button
                    //                     onClick={() => handleQuantityChange(product._id, 'increment')}
                    //                     className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    //                 >
                    //                     +
                    //                 </button>
                    //             </div>
                    //             <button
                    //                 onClick={() => handleAddToCart(product)}
                    //                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    //             >
                    //                 Add to Cart
                    //             </button>
                    //         </div>
                    //     </div>
                    // </div>
                    <ProductItem key={product._id} product={product} handleAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
