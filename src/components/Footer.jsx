import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Clothify
              </span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover sustainable, stylish clothing that expresses your unique personality. Fashion that makes a difference.
            </p>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, href: '#', color: 'hover:text-blue-400' },
                { icon: FaInstagram, href: '#', color: 'hover:text-pink-400' },
                { icon: FaTwitter, href: '#', color: 'hover:text-blue-300' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-colors duration-200`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Shop', path: '/shop' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Cart', path: '/cart' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>hello@clothify.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Fashion Street<br />Style City, SC 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Clothify. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <FaHeart className="text-red-500" />
              <span>for fashion lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
