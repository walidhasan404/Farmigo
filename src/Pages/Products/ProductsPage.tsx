import { useEffect, useState, useRef } from "react";
import { dummyProducts, Product } from "../../data/products";
import { Link } from "react-router-dom";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [sort, setSort] = useState<string>("");
    const [isDropdown, setIsDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const productsPerPage = 8;
    const observer = useRef<IntersectionObserver | null>(null);

    const categories = ["All", "Seeds", "Tools", "Fertilizers", "Irrigation", "Machinery"];

    useEffect(() => {
        const fetchProducts = () => {
            setTimeout(() => {
                setProducts(dummyProducts);
            }, 1000);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".dropdown-container")) {
                setIsDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const filteredProducts = products
        .filter((product) => {
            return product.name.toLowerCase().includes(search.toLowerCase());
        })
        .filter((product) => {
            if (category === "All") {
                return true;
            }
            return product.category === category;
        })
        .sort((a, b) => {
            if (sort === "asc") return a.price - b.price;
            if (sort === "desc") return b.price - a.price;
            return 0;
        });

    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = filteredProducts.slice(0, indexOfLastProduct);

    const loadMoreProducts = () => {
        if (!isLoading && currentPage * productsPerPage < filteredProducts.length) {
            setIsLoading(true);
            setTimeout(() => {
                setCurrentPage((prevPage) => prevPage + 1);
                setIsLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreProducts();
            }
        });

        if (document.getElementById("scroll-anchor")) {
            intersectionObserver.observe(document.getElementById("scroll-anchor")!);
        }

        observer.current = intersectionObserver;

        return () => observer.current?.disconnect();
    }, [currentPage, filteredProducts]);

    return (
        <div className="min-h-screen p-6">

            {/* Search */}
            <div className="flex flex-col sm:flex-row items-center mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="p-3 border border-gray-300 rounded w-full sm:w-3/4 mb-4 sm:mb-0 sm:mr-4"
                />
                <button
                    onClick={() => setSearch(search)}
                    className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded w-full sm:w-1/4 hover:opacity-90 transition duration-300"
                >
                    Search
                </button>
            </div>

            <div className="lg:flex lg:justify-evenly p-4">
                {/* Category */}
                <div className="flex justify-center mb-8 space-x-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${category === cat
                                ? "bg-green-500 text-white shadow-lg"
                                : "bg-gray-200 text-gray-800 hover:bg-green-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sorting */}
                <div className="flex items-center justify-center mb-8">
                    <label className="mr-4 font-medium text-gray-700">Sort by price:</label>
                    <div className="dropdown-container relative">
                        <button
                            onClick={() => setIsDropdown(!isDropdown)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none focus:bg-gray-300"
                        >
                            {sort === "asc" ? "Low to High" : sort === "desc" ? "High to Low" : "None"}
                        </button>
                        {isDropdown && (
                            <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul className="py-2">
                                    <li
                                        onClick={() => {
                                            setSort("");
                                            setIsDropdown(false);
                                        }}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                    >
                                        None
                                    </li>
                                    <li
                                        onClick={() => {
                                            setSort("asc");
                                            setIsDropdown(false);
                                        }}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                    >
                                        Low to High
                                    </li>
                                    <li
                                        onClick={() => {
                                            setSort("desc");
                                            setIsDropdown(false);
                                        }}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                                    >
                                        High to Low
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products */}
            {currentProducts.length > 0 ? (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentProducts.map((product: Product) => (
                            <li
                                key={product.id}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-transform transform duration-300"
                            >
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        className="w-full h-48 object-cover"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                    <div className="flex justify-center items-center mb-2">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <span
                                                key={i}
                                                className={`text-lg ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mt-2">Price: ${product.price.toFixed(2)}</p>
                                </div>
                                <div className="px-4 pb-4">
                                    <Link to={`/products/${product.id}`}>
                                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full w-full hover:opacity-90 transition duration-300 ease-in-out">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div id="scroll-anchor" className="h-10"></div>
                    {isLoading && <p className="text-center text-gray-600 text-lg">Loading more products...</p>}
                </>
            ) : (
                <p className="text-center text-gray-600 text-lg">Loading products...</p>
            )}
        </div>
    );
};

export default ProductsPage;
