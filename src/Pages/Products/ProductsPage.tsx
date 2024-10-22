import { useEffect, useState } from "react";
import { Product } from '../../Types/types';
import ProductItem from "./ProductItem";
import { FiMic } from "react-icons/fi";
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";

const ProductsPage: React.FC = () => {
    const { setCartItems } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [sortOption, setSortOption] = useState<string>("price-asc");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(6);

    const categories = ["All", "Dairy & Meats", "Vegetables", "Poultry", "Fruits", "Honey & Jam"];
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
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart.length);
    }, []);

    // Handle Add to Cart
    const handleAddToCart = (product: Product, quantity: number = 1) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const itemIndex = cart.findIndex((item: Product) => item._id === product._id);

        if (itemIndex >= 0) {
            cart[itemIndex].quantity = (cart[itemIndex].quantity || 0) + quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItems(cart.length);
    };

    // Filter and Sort Products
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

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Total number of pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Voice Command Integration
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
            const voiceCommand = event.results[0][0].transcript.toLowerCase();

            // Automatically set recognized speech into the search input field
            setSearch(voiceCommand);

            if (voiceCommand.includes("category")) {
                const categoryTerm = voiceCommand.replace("category", "").trim();
                if (categories.includes(categoryTerm)) {
                    setCategory(categoryTerm);
                }
            } else if (voiceCommand.includes("sort by price low to high")) {
                setSortOption("price-asc");
            } else if (voiceCommand.includes("sort by price high to low")) {
                setSortOption("price-desc");
            } else if (voiceCommand.includes("sort by rating low to high")) {
                setSortOption("rating-asc");
            } else if (voiceCommand.includes("sort by rating high to low")) {
                setSortOption("rating-desc");
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error detected: ', event.error);
        };

        const startVoiceRecognition = () => {
            recognition.start();
        };

        // Add event listener to start voice recognition on click
        document.getElementById('voice-command-btn')?.addEventListener('click', startVoiceRecognition);

        return () => {
            document.getElementById('voice-command-btn')?.removeEventListener('click', startVoiceRecognition);
        };
    }, [categories]);


    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white min-h-screen">
            {/* Filters and Search */}
            <div className="flex flex-col gap-4 md:flex-row md:space-x-6 items-center justify-between mb-6 lg:mb-8">
                <div className="relative flex items-center w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow transition-all mb-4 md:mb-0"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        title="button"
                        onClick={() => setSearch("")}
                        id="voice-command-btn"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none transition-all"
                    >
                        <FiMic className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex space-x-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setCategory(cat);
                                setCurrentPage(1);
                            }}
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
                                        setCurrentPage(1);
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

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {currentProducts.map((product) => (
                    <ProductItem key={product._id} product={product} handleAddToCart={handleAddToCart} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
