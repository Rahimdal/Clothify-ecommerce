import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaShoppingCart, 
  FaHeart,
  FaStar,
  FaEye
} from "react-icons/fa";

export default function GirlsShirtsSlider() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Women's products data
  useEffect(() => {
    const womensProducts = [
      {
        id: 1001,
        title: "Women's Classic White Shirt",
        description: "Timeless white shirt perfect for professional and casual wear",
        price: 45,
        discountPercentage: 10,
        rating: 4.5,
        stock: 25,
        brand: "StyleCo",
        category: "womens-shirts",
        thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: true
      },
      {
        id: 1002,
        title: "Women's Casual Cotton T-Shirt",
        description: "Comfortable cotton t-shirt available in multiple colors",
        price: 25,
        discountPercentage: 15,
        rating: 4.3,
        stock: 50,
        brand: "ComfortWear",
        category: "womens-tshirts",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: false
      },
      {
        id: 1003,
        title: "Women's Cozy Hoodie",
        description: "Soft and warm hoodie perfect for chilly days",
        price: 55,
        discountPercentage: 20,
        rating: 4.7,
        stock: 30,
        brand: "CozyStyle",
        category: "womens-hoodies",
        thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"],
        isNew: true,
        isTrending: false
      },
      {
        id: 1004,
        title: "Women's Striped Long Sleeve Shirt",
        description: "Elegant striped shirt perfect for office and casual wear",
        price: 38,
        discountPercentage: 12,
        rating: 4.4,
        stock: 35,
        brand: "OfficeChic",
        category: "womens-shirts",
        thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: true
      },
      {
        id: 105,
        title: "Girls' Unicorn Print T-Shirt",
        description: "Magical unicorn print t-shirt with glitter accents, every girl's favorite",
        price: 28,
        discountPercentage: 12,
        rating: 4.8,
        stock: 22,
        brand: "MagicWear",
        category: "girls-tshirts",
        thumbnail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: false
      },
      {
        id: 106,
        title: "Girls' Plaid Flannel Shirt",
        description: "Cozy plaid flannel shirt perfect for cooler weather, soft and comfortable",
        price: 38,
        discountPercentage: 18,
        rating: 4.2,
        stock: 20,
        brand: "CozyKids",
        category: "girls-shirts",
        thumbnail: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: true
      },
      {
        id: 107,
        title: "Girls' Cat Print T-Shirt",
        description: "Adorable cat print t-shirt with cute whiskers design, perfect for cat lovers",
        price: 24,
        discountPercentage: 8,
        rating: 4.6,
        stock: 28,
        brand: "PetLove",
        category: "girls-tshirts",
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: false
      },
      {
        id: 108,
        title: "Girls' White Cotton Shirt",
        description: "Classic white cotton shirt with collar, perfect for formal occasions and school",
        price: 35,
        discountPercentage: 15,
        rating: 4.3,
        stock: 16,
        brand: "ClassicKids",
        category: "girls-shirts",
        thumbnail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: false
      },
      {
        id: 109,
        title: "Girls' Tie-Dye T-Shirt",
        description: "Trendy tie-dye t-shirt with vibrant colors, perfect for summer adventures",
        price: 26,
        discountPercentage: 22,
        rating: 4.5,
        stock: 24,
        brand: "SummerVibes",
        category: "girls-tshirts",
        thumbnail: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: true
      },
      {
        id: 110,
        title: "Girls' Polka Dot Blouse",
        description: "Elegant polka dot blouse with ruffled sleeves, perfect for special occasions",
        price: 42,
        discountPercentage: 30,
        rating: 4.7,
        stock: 12,
        brand: "ElegantKids",
        category: "girls-shirts",
        thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop",
        images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop"],
        isNew: false,
        isTrending: false
      }
    ];

    setProducts(womensProducts.slice(0, 4)); // Only show first 4 products
    setLoading(false);
  }, []);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent card click
    
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      qty: 1,
    };

    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].qty += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          animate={{ x: `-${currentSlide * 100}%` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                  .map((product) => (
                    <motion.div
                      key={product.id}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredCard(product.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardClick(product.id)}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                        {/* Product Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Girls+Shirt';
                            }}
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                NEW
                              </span>
                            )}
                            {product.isTrending && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                TRENDING
                              </span>
                            )}
                            {product.discountPercentage && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                -{Math.round(product.discountPercentage)}%
                              </span>
                            )}
                          </div>

                          {/* Hover Actions */}
                          <AnimatePresence>
                            {hoveredCard === product.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
                              >
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => handleAddToCart(e, product)}
                                  className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                  <FaShoppingCart />
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-white text-red-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                  <FaHeart />
                                </motion.button>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                  <FaEye />
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          <div className="mb-3">
                            <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {product.description}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              ({product.rating})
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-gray-900">
                                ₹{Math.round(product.price * 85)}
                              </span>
                              {product.discountPercentage && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{Math.round((product.price * 85) / (1 - product.discountPercentage / 100))}
                                </span>
                              )}
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => handleAddToCart(e, product)}
                              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                            >
                              <FaShoppingCart className="text-sm" />
                              Add
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? 'bg-purple-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/shop')}
          className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          View All Girls' Collection
        </motion.button>
      </div>
    </div>
  );
}
