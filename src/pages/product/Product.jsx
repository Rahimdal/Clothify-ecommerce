import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, 
  FaHeart, 
  FaShare, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaPlus,
  FaMinus,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Girls' products data (same as in GirlsShirtsSlider)
  const girlsProducts = [
    {
      id: 101,
      title: "Girls' Floral Print T-Shirt",
      description: "Soft cotton t-shirt with beautiful floral print design, perfect for casual wear",
      price: 25,
      discountPercentage: 15,
      rating: 4.5,
      stock: 25,
      brand: "KidsStyle",
      category: "girls-tshirts",
      thumbnail: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop"],
    },
    {
      id: 102,
      title: "Girls' Striped Button-Up Shirt",
      description: "Classic striped shirt with button-up design, ideal for school or casual outings",
      price: 32,
      discountPercentage: 10,
      rating: 4.3,
      stock: 18,
      brand: "YoungFashion",
      category: "girls-shirts",
      thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop"],
    },
    {
      id: 103,
      title: "Girls' Rainbow Graphic T-Shirt",
      description: "Fun rainbow graphic tee made from premium cotton, perfect for playful days",
      price: 22,
      discountPercentage: 20,
      rating: 4.7,
      stock: 30,
      brand: "ColorKids",
      category: "girls-tshirts",
      thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"],
    },
    {
      id: 104,
      title: "Girls' Denim Shirt Jacket",
      description: "Stylish denim shirt that can be worn as a jacket, versatile and trendy",
      price: 45,
      discountPercentage: 25,
      rating: 4.4,
      stock: 15,
      brand: "DenimKids",
      category: "girls-shirts",
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop"],
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
    }
  ];

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = parseInt(id);

        // Check if it's a girls' product (ID 101-110)
        if (productId >= 101 && productId <= 110) {
          const girlsProduct = girlsProducts.find(p => p.id === productId);
          if (girlsProduct) {
            setProduct(girlsProduct);
            setLoading(false);
            return;
          }
        }

        // Check if it's one of our custom women's products (ID 1001-1003)
        if (productId >= 1001 && productId <= 1003) {
          const customProducts = [
            {
              id: 1001,
              title: "Women's Classic White Shirt",
              description: "A timeless white shirt perfect for any occasion. Made with premium cotton for comfort and style. This versatile piece can be dressed up for professional settings or dressed down for casual outings. Features a classic collar, button-front closure, and a tailored fit that flatters all body types.",
              price: 45 * 85,
              discountPercentage: 10,
              rating: 4.5,
              stock: 25,
              brand: "StyleCo",
              category: "Shirts",
              thumbnail: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
              images: [
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"
              ]
            },
            {
              id: 1002,
              title: "Women's Casual T-Shirt",
              description: "Comfortable cotton t-shirt in various colors. Perfect for everyday wear and casual outings. Made from 100% organic cotton for ultimate comfort and breathability. Features a relaxed fit and classic crew neckline. Available in multiple colors to match your personal style.",
              price: 25 * 85,
              discountPercentage: 15,
              rating: 4.3,
              stock: 50,
              brand: "ComfortWear",
              category: "T-Shirts",
              thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
              images: [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
              ]
            },
            {
              id: 1003,
              title: "Women's Cozy Hoodie",
              description: "Soft and warm hoodie perfect for chilly days. Features a comfortable fit and stylish design. Made with a cotton-polyester blend for warmth and durability. Includes a spacious front pocket and adjustable drawstring hood. Perfect for layering or wearing on its own.",
              price: 55 * 85,
              discountPercentage: 20,
              rating: 4.7,
              stock: 30,
              brand: "CozyStyle",
              category: "Hoodies",
              thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
              images: [
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop"
              ]
            }
          ];

          const customProduct = customProducts.find(p => p.id === productId);
          if (customProduct) {
            setProduct(customProduct);
            setLoading(false);
            return;
          }
        }

        // Otherwise, fetch from API
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    if (!selectedSize && (product.category === "tops" || product.category === "girls-shirts" || product.category === "girls-tshirts")) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      qty: quantity,
      size: selectedSize,
      color: selectedColor,
    };

    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, cartItem]);
    }

    alert("Product added to cart!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Gray", "Navy", "Beige"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <FaArrowLeft />
          <span>Back to Shop</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-96 sm:h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500/f3f4f6/9ca3af?text=Fashion';
                }}
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-purple-600' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=Fashion';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.rating}) • {Math.floor(Math.random() * 500) + 50} reviews
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                {product.category} • {product.brand}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{Math.round(product.price * 85)}
              </span>
              {product.discountPercentage && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{Math.round((product.price * 85) / (1 - product.discountPercentage / 100))}
                </span>
              )}
            </div>

            {/* Size Selection */}
            {(product.category === "tops" || product.category === "girls-shirts" || product.category === "girls-tshirts") && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="px-4 py-3 font-medium text-gray-900 dark:text-white min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <FaHeart />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-all"
                >
                  <FaShare />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaTruck className="text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-sm">On orders over ₹2000</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaShieldAlt className="text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-sm">100% secure payment</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaUndo className="text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Easy Returns</p>
                  <p className="text-sm">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="prose prose-gray dark:prose-invert max-w-none"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Product Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This premium quality {product.category} is crafted with attention to detail and designed for comfort and style.
                    Perfect for both casual and semi-formal occasions, it offers versatility and durability that you can rely on.
                  </p>

                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    <li>Premium quality materials</li>
                    <li>Comfortable fit and feel</li>
                    <li>Durable construction</li>
                    <li>Easy care and maintenance</li>
                    <li>Versatile styling options</li>
                  </ul>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">Brand</span>
                        <span className="text-gray-600 dark:text-gray-400">{product.brand}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">Category</span>
                        <span className="text-gray-600 dark:text-gray-400 capitalize">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">Stock</span>
                        <span className="text-gray-600 dark:text-gray-400">{product.stock} units</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">Weight</span>
                        <span className="text-gray-600 dark:text-gray-400">0.5 kg</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">Material</span>
                        <span className="text-gray-600 dark:text-gray-400">Cotton Blend</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">Care Instructions</span>
                        <span className="text-gray-600 dark:text-gray-400">Machine Wash</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>

                  {/* Review Summary */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">{product.rating}</div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {renderStars(product.rating)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Based on {Math.floor(Math.random() * 500) + 50} reviews
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{star}★</span>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${Math.random() * 80 + 10}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    {[
                      { name: "Sarah Johnson", rating: 5, comment: "Excellent quality and perfect fit! Highly recommended.", date: "2 days ago" },
                      { name: "Mike Chen", rating: 4, comment: "Good product, fast delivery. Very satisfied with the purchase.", date: "1 week ago" },
                      { name: "Emma Wilson", rating: 5, comment: "Love the design and comfort. Will definitely buy again!", date: "2 weeks ago" }
                    ].map((review, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                            <div className="flex items-center gap-1 mt-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
