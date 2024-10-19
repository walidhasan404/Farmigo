import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";

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
  translatedName?: string;
  translatedDescription?: string; // To store translated content
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isTranslated, setIsTranslated] = useState(false); // Translation toggle state
  const [translating, setTranslating] = useState(false); // Loading state for translation

  const { setCartItems } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API + "/products");
        const productData = response.data.data.find((item: Product) => item._id === id);

        if (productData) {
          setProduct(productData);
          fetchRelatedProducts(productData.category);
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
      const res = await axios.get(import.meta.env.VITE_API + "/products");
      const filteredProducts = res.data.data.filter((item: Product) => item.category === category && item._id !== id);
      setRelatedProducts(filteredProducts);
    } catch (err) {
      setError("Error fetching related products");
    }
  };

  // Translation function
  const translateContent = async (text: string) => {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|bn`);
    const data = await response.json();
    return data.responseData.translatedText;
  };

  const toggleTranslate = async () => {
    if (!isTranslated && product) {
      setTranslating(true); // Start loading
      try {
        const translatedName = await translateContent(product.product_name);
        const translatedDescription = await translateContent(product.description);

        setProduct((prevProduct) => ({
          ...prevProduct!,
          translatedName,
          translatedDescription,
        }));
      } catch (err) {
        console.error("Translation error", err);
      } finally {
        setTranslating(false); // Stop loading
      }
    }

    setIsTranslated(!isTranslated); // Toggle translation state
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = cart.findIndex((item: Product) => item._id === product._id);

    if (itemIndex >= 0) {
      cart[itemIndex].quantity = (cart[itemIndex].quantity || 0) + quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart.length);

    Swal.fire({
      title: 'Success!',
      text: `${product.product_name} has been added to the cart!`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    setQuantity((prevQuantity) => {
      if (action === 'increment') {
        return prevQuantity + 1;
      } else {
        return Math.max(1, prevQuantity - 1);
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      {product && (
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.toUpperCase()}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {isTranslated ? product.translatedName || product.product_name : product.product_name}
              </h1>
              <p className="leading-relaxed mb-4">
                {isTranslated ? product.translatedDescription || product.description : product.description}
              </p>

              {translating && <div>লোড করা হচ্ছে...</div>} {/* Translation loading */}

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Rating</span>
                <span className="ml-auto text-gray-900">{product.rating}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Quantity Available</span>
                <span className="ml-auto text-gray-900">{product.quantity}</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Price</span>
                <span className="ml-auto text-gray-900">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center mb-4">
                <button onClick={() => handleQuantityChange('decrement')} className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  -
                </button>
                <span className="mx-4">{quantity}</span>
                <button onClick={() => handleQuantityChange('increment')} className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  +
                </button>
              </div>
              <div className="flex">
                <button onClick={() => handleAddToCart(product, quantity)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Add to Cart
                </button>
              </div>
              <button onClick={toggleTranslate} className="inline-flex items-center mt-4 text-blue-500">
                {isTranslated ? 'English' : 'বাংলায় পড়ুন'}
              </button>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.images[0]} />
          </div>

          {relatedProducts.length > 0 && (
            <div className="related-products mt-12">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct._id} className="product-card border p-4 rounded-lg">
                    <Link to={`/products/${relatedProduct._id}`}>
                      <img alt={relatedProduct.product_name} className="w-full h-48 object-cover object-center mb-4" src={relatedProduct.images[0]} />
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
