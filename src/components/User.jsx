import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import img from "./User-img.png";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row min-h-[600px] lg:h-[600px] mx-auto">
        {/* Left Side - Image with Sign Up Button - Hide on mobile when signup */}
        {(!isMobile || !isSignUp) && (
          <motion.div
            animate={{
              x: isSignUp && !isMobile ? "-100%" : "0%"
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full lg:w-1/2 relative overflow-hidden flex-shrink-0 h-64 lg:h-full"
          >
          <img
            src={img}
            alt="Fashion Store"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 lg:p-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8 lg:mb-12"
            >
              <h1 className="text-3xl lg:text-5xl font-light mb-3 lg:mb-4 tracking-wide">
                Welcome
              </h1>
              <p className="text-base lg:text-xl text-white/90 font-light leading-relaxed max-w-sm px-4 lg:px-0">
                Discover your perfect style with our curated fashion collection
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSignUp(true)}
              className="px-8 lg:px-12 py-3 lg:py-4 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg text-base lg:text-lg"
            >
              Sign Up
            </motion.button>
          </div>
          </motion.div>
        )}

        {/* Right Side - Forms */}
        <motion.div
          animate={{
            x: isSignUp ? (isMobile ? "0%" : "-50%") : "0%"
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white relative flex-shrink-0 flex-1 min-h-[400px] lg:min-h-0"
        >
          <div className="w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isSignUp ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-sm"
                >
                <div className="text-center mb-8 lg:mb-10">
                  <h2 className="text-2xl lg:text-3xl font-light text-gray-800 mb-2">Sign In</h2>
                  <p className="text-gray-500 text-sm lg:text-base">Welcome back to your account</p>
                </div>

                <form className="space-y-4 lg:space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <FaLock className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm">
                    <label className="flex items-center text-gray-600 justify-center sm:justify-start">
                      <input type="checkbox" className="mr-2 rounded" />
                      Remember me
                    </label>
                    <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors text-center sm:text-left">
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gray-800 text-white py-3 lg:py-4 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-base lg:text-lg"
                  >
                    Sign In
                  </motion.button>
                </form>
              </motion.div>
            ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-sm"
                >
                <div className="text-center mb-8 lg:mb-10">
                  <h2 className="text-2xl lg:text-3xl font-light text-gray-800 mb-2">Create Account</h2>
                  <p className="text-gray-500 text-sm lg:text-base">Join our fashion community</p>
                </div>

                <form className="space-y-4 lg:space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div className="relative">
                      <FaUser className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                      />
                    </div>
                    <div className="relative">
                      <FaUser className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <FaLock className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <FaLock className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-3 lg:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-gray-700 text-sm lg:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-3 text-xs lg:text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 rounded flex-shrink-0"
                    />
                    <label className="text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Sign Up Button */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gray-800 text-white py-3 lg:py-4 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium text-base lg:text-lg"
                  >
                    Create Account
                  </motion.button>

                  {/* Back to Sign In */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-gray-600 hover:text-gray-800 transition-colors text-xs lg:text-sm"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
