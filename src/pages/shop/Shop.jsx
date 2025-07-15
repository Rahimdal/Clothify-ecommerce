import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaSearch } from "react-icons/fa";

export default function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from multiple categories to get more variety
        const [topsResponse, shirtsResponse, womensResponse] = await Promise.all([
          fetch("https://dummyjson.com/products/category/tops?limit=15"),
          fetch("https://dummyjson.com/products/category/womens-shirts?limit=10"),
          fetch("https://dummyjson.com/products/category/womens-dresses?limit=10")
        ]);

        const [topsData, shirtsData, womensData] = await Promise.all([
          topsResponse.json(),
          shirtsResponse.json(),
          womensResponse.json()
        ]);

        // Combine all products and filter for clothing items
        const allProducts = [
          ...topsData.products,
          ...shirtsData.products,
          ...womensData.products
        ];

        // Filter and enhance products for girls' clothing
        const filteredProducts = allProducts
          .filter(product =>
            product.title.toLowerCase().includes('shirt') ||
            product.title.toLowerCase().includes('top') ||
            product.title.toLowerCase().includes('blouse') ||
            product.title.toLowerCase().includes('tee') ||
            product.title.toLowerCase().includes('dress') ||
            product.category.toLowerCase().includes('women')
          )
          .map(product => ({
            ...product,
            // Enhance descriptions for better display
            description: product.description.length > 80
              ? product.description.substring(0, 80) + "..."
              : product.description,
            // Convert price to INR (approximate)
            originalPrice: product.price,
            price: product.price * 85, // Convert to INR
            // Add some variety to categories
            category: getProductCategory(product.title, product.category)
          }))
          .slice(0, 30); // Limit to 30 products for better performance

        setProducts(filteredProducts);
        setFilteredProducts(filteredProducts);
      } catch (err) {
        console.error("API error:", err);
        // Fallback to original API if there's an error
        fetch("https://dummyjson.com/products/category/tops?limit=20")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data.products);
            setFilteredProducts(data.products);
          })
          .catch((fallbackErr) => console.error("Fallback API error:", fallbackErr));
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category and search term
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, products, searchTerm]);

  // Get unique categories
  const getCategories = () => {
    const categories = ['All', ...new Set(products.map(product => product.category))];
    return categories;
  };

  // Helper function to categorize products
  const getProductCategory = (title, originalCategory) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('shirt') || titleLower.includes('blouse')) return 'Shirts';
    if (titleLower.includes('top') || titleLower.includes('tee')) return 'Tops';
    if (titleLower.includes('dress')) return 'Dresses';
    if (titleLower.includes('tank')) return 'Tank Tops';
    return 'Fashion';
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    setShowCart(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemove(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    navigate("/cart");
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * 85 * item.qty, 0);
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6 sm:px-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Girls' Fashion Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover {filteredProducts.length} trendy shirts, tops & more
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-200 text-gray-700 dark:text-gray-200 shadow-md"
          >
            <FaShoppingCart className="text-lg" />
            <span className="font-medium">Cart</span>
            {getTotalItems() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold"
              >
                {getTotalItems()}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto sm:mx-0">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for shirts, tops, dresses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {getCategories().map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Fashion+Item';
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                </div>

                {/* Rating Badge */}
                {product.rating && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      ⭐ {product.rating.toFixed(1)}
                    </span>
                  </div>
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <FaShoppingCart className="text-sm" />
                    Quick Add
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{Math.round(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.discountPercentage && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-sm" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading amazing fashion items...</p>
          </div>
        )}

        {/* No Products Found */}
        {products.length > 0 && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">👗</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">No items found in this category</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Modern Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Shopping Cart
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCart(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FaShoppingCart className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Your cart is empty</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">Add some items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 dark:text-white text-sm line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            ₹{Math.round(item.price * 85)} each
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
                              >
                                <FaMinus className="text-xs text-gray-600 dark:text-gray-300" />
                              </motion.button>
                              <span className="px-3 py-1 text-sm font-medium text-gray-800 dark:text-white min-w-[2rem] text-center">
                                {item.qty}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                              >
                                <FaPlus className="text-xs text-gray-600 dark:text-gray-300" />
                              </motion.button>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemove(item.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <FaTrash className="text-xs" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-800 dark:text-white">
                            ₹{Math.round(item.price * 85 * item.qty)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Total:</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{Math.round(getTotalPrice())}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceedToCheckout}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Proceed to Checkout
                  </motion.button>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Review your items in the cart page
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </section>
  );
}
