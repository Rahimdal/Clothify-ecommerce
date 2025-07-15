import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaUsers, FaAward, FaShoppingBag, FaGlobe, FaRecycle, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Fashion Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                Clothify
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Where fashion meets passion, and style becomes a statement
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaHeart className="text-pink-400" />
                <span>Made with Love</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaLeaf className="text-green-400" />
                <span>Sustainable</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaGlobe className="text-blue-400" />
                <span>Global Reach</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Born from a passion for authentic style and sustainable fashion, Clothify represents 
              the perfect blend of contemporary design and conscious manufacturing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop"
                alt="Fashion Design Process"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Crafted with Purpose
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every piece in our collection tells a story of meticulous craftsmanship, 
                sustainable practices, and timeless design. We believe fashion should be 
                both beautiful and responsible.
              </p>
              <div className="space-y-4">
                {[
                  { icon: FaHeart, text: "Designed with love and attention to detail" },
                  { icon: FaLeaf, text: "Sustainable materials and ethical production" },
                  { icon: FaUsers, text: "Community-driven design process" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <item.icon className="text-white text-lg" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "50K+", label: "Happy Customers", icon: FaUsers },
              { number: "1000+", label: "Products Sold", icon: FaShoppingBag },
              { number: "25+", label: "Countries Reached", icon: FaGlobe },
              { number: "4.9", label: "Average Rating", icon: FaStar }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FaHeart,
                title: "Authenticity",
                description: "We believe in genuine self-expression through fashion that reflects your true personality."
              },
              {
                icon: FaLeaf,
                title: "Sustainability",
                description: "Every decision we make considers the environmental impact and promotes eco-friendly practices."
              },
              {
                icon: FaUsers,
                title: "Inclusivity",
                description: "Fashion is for everyone. We create designs that celebrate diversity and embrace all body types."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              From humble beginnings to global fashion brand
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-600"></div>

            <div className="space-y-12">
              {[
                {
                  year: "2020",
                  title: "The Beginning",
                  description: "Clothify was founded with a vision to make sustainable fashion accessible to everyone."
                },
                {
                  year: "2021",
                  title: "First Collection",
                  description: "Launched our debut collection featuring eco-friendly materials and timeless designs."
                },
                {
                  year: "2022",
                  title: "Global Expansion",
                  description: "Expanded to international markets, bringing our sustainable fashion worldwide."
                },
                {
                  year: "2023",
                  title: "Innovation Award",
                  description: "Received recognition for our innovative approach to sustainable fashion manufacturing."
                },
                {
                  year: "2024",
                  title: "Carbon Neutral",
                  description: "Achieved carbon neutrality across our entire supply chain and operations."
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start gap-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Sustainability First
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                We're committed to creating beautiful fashion while protecting our planet for future generations.
              </p>

              <div className="space-y-6">
                {[
                  { icon: FaRecycle, title: "100% Recycled Materials", desc: "All our fabrics come from recycled sources" },
                  { icon: FaLeaf, title: "Carbon Neutral Shipping", desc: "Every order is shipped with zero carbon footprint" },
                  { icon: FaAward, title: "Ethical Manufacturing", desc: "Fair wages and safe working conditions guaranteed" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-green-600 dark:text-green-400 text-lg" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
                alt="Sustainable Fashion"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Fashion Revolution
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Be part of a community that values style, sustainability, and authenticity.
              Discover fashion that makes a difference.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/shop')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore Our Collection
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
