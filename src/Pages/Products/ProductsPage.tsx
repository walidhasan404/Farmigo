import { useEffect, useState } from "react";
import { dummyProducts, Product } from "../../data/products";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [sort, setSort] = useState<string>("");

    const categories = ["All", "Seeds", "Tools", "Fertilizers", "Irrigation", "Machinery"];

    useEffect(() => {
        const fetchProducts = () => {
            setTimeout(() => {
                setProducts(dummyProducts);
            }, 1000);
        };
        fetchProducts();
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

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10">
                Explore Our Products
            </h1>
            
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
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded w-full sm:w-1/4 hover:bg-blue-700 transition duration-300"
                >
                    Search
                </button>
            </div>
            
            {/* Category */}
            <div className="flex justify-center mb-8 space-x-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            category === cat
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-gray-200 text-gray-800 hover:bg-blue-200"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center justify-center mb-8">
                <label className="mr-4 font-medium text-gray-700">Sort by price:</label>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="" key="none">None</option>
                    <option value="asc" key="asc">Low to High</option>
                    <option value="desc" key="desc">High to Low</option>
                </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product: Product) => (
                        <li
                            key={product.id}
                            className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
                        >
                            <img
                                className="w-full h-48 object-cover"
                                src={product.image}
                                alt={product.name}
                                width="100"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-gray-700 mt-2">Price: ${product.price.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 text-lg">Loading products...</p>
            )}
        </div>
    );
};

export default ProductsPage;
