import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, []);

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemove(id);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + item.qty * item.price * 85, 0);
  const getShipping = () => getSubtotal() > 2000 ? 0 : 150;
  const getTax = () => getSubtotal() * 0.18; // 18% GST
  const getTotal = () => getSubtotal() + getShipping() + getTax();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span className="text-sm sm:text-base">Continue Shopping</span>
          </motion.button>

          <div className="text-center flex-1 sm:flex-none">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2 sm:gap-3">
              <FaShoppingCart className="text-xl sm:text-2xl" />
              <span className="hidden sm:inline">Shopping Cart</span>
              <span className="sm:hidden">Cart</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="hidden sm:block w-32"></div> {/* Spacer for centering on desktop */}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 max-w-md mx-auto shadow-lg">
              <FaShoppingCart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop')}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Start Shopping
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Cart with Items */
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    Cart Items ({cart.length})
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Product Image */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 mx-auto sm:mx-0">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/96x96/f3f4f6/9ca3af?text=Fashion';
                              }}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 text-center sm:text-left">
                                {item.title}
                              </h3>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemove(item.id)}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors self-center sm:self-start sm:ml-4 mt-2 sm:mt-0"
                              >
                                <FaTrash className="text-sm" />
                              </motion.button>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 text-center sm:text-left">
                              {item.description || "Premium quality fashion item"}
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-center sm:justify-start gap-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
                                <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}
                                    className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg transition-colors"
                                  >
                                    <FaMinus className="text-xs text-gray-600 dark:text-gray-300" />
                                  </motion.button>
                                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-gray-900 dark:text-white min-w-[2.5rem] sm:min-w-[3rem] text-center">
                                    {item.qty}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}
                                    className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg transition-colors"
                                  >
                                    <FaPlus className="text-xs text-gray-600 dark:text-gray-300" />
                                  </motion.button>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-center sm:text-right">
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  ₹{Math.round(item.qty * item.price * 85)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  ₹{Math.round(item.price * 85)} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items)</span>
                    <span>₹{Math.round(getSubtotal())}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    <span>Shipping</span>
                    <span className={getShipping() === 0 ? "text-green-600 dark:text-green-400" : ""}>
                      {getShipping() === 0 ? "FREE" : `₹${getShipping()}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    <span>Tax (GST 18%)</span>
                    <span>₹{Math.round(getTax())}</span>
                  </div>

                  {getShipping() > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 text-center">
                        Add ₹{Math.round(2000 - getSubtotal())} more for FREE shipping!
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{Math.round(getTotal())}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert("🎉 Proceeding to secure checkout...")}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <FaCreditCard />
                    Proceed to Checkout
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/shop')}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
                  >
                    Continue Shopping
                  </motion.button>
                </div>

                {/* Security Badge */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span>🔒</span>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
