import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Shop from './pages/shop/Shop'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Product from './pages/product/Product'
import Footer from './components/Footer'
import Cart from "./components/Cart";
import User from "./components/User";

export default function App() {
  return (
    <>
      <Navbar />
      
      <div className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}
