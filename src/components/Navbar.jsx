import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef();
  const linksRef = useRef([]);
  const mobileMenuRef = useRef();
  const mobileLinksRef = useRef([]);
  const iconGroupRef = useRef();

  // Desktop nav animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(navRef.current, {
      duration: 1.2,
      opacity: 1,
      width: 500,
      ease: "power2.inOut",
    }).to(
      linksRef.current,
      {
        duration: 0.5,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
     "-=8");

  }, []);

  // Mobile menu slide + inner fade
  useEffect(() => {
    if (open) {
      gsap.to(mobileMenuRef.current, {
        right: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(mobileLinksRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        delay: 0.5,
        ease: "power3.out",
        duration: 0.4,
      });

      gsap.from(iconGroupRef.current, {
        opacity: 0,
        y: 20,
        delay: 1,
        ease: "power2.out",
        duration: 0.4,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        right: "-100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [open]);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => {
    setOpen(false);
    // Add a small delay to ensure the menu is closed before scrolling
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      {/* Desktop Navbar */}
     <nav
  ref={navRef}
  className="hidden md:flex fixed top-5 left-1/2 transform -translate-x-1/2 z-70 bg-white backdrop-blur-md border border-white/20 rounded-full px-10 py-3 items-center gap-6 overflow-hidden transition-all duration-300 w-0 opacity-0"
>

        <Link
          to="/"
          ref={(el) => (linksRef.current[0] = el)}
          className="text-black font-bold opacity-0"
        >
          Clothify
        </Link>
        <Link to="/" ref={(el) => (linksRef.current[1] = el)} className="text-black font-medium opacity-0">Home</Link>
        <Link to="/shop" ref={(el) => (linksRef.current[2] = el)} className="text-black font-medium opacity-0">Shop</Link>
        <Link to="/about" ref={(el) => (linksRef.current[3] = el)} className="text-black font-medium opacity-0">About</Link>
        <Link to="/contact" ref={(el) => (linksRef.current[4] = el)} className="text-black font-medium opacity-0">Contact</Link>
         <Link to="/Cart" ref={(el) => (linksRef.current[5] = el)} className="text-black font-medium opacity-0"><FaShoppingCart /></Link>
          <Link to="/User" ref={(el) => (linksRef.current[6] = el)} className="text-black font-medium opacity-0"> <FaUser /> </Link>
       
          
      </nav>

<div className="md:hidden fixed top-0 left-0 w-full h-15 bg-black z-40"></div>


      {/* Mobile Brand Name */}
      <Link
        to="/"
        className="md:hidden fixed top-3 left-5 z-55 text-white text-xl font-bold"
        onClick={closeMenu}
      >
        Clothify
      </Link>

      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-3 right-5 z-66 text-white text-3xl p-2 w-12 h-12 flex items-center justify-center"
        onClick={toggleMenu}
      >
        {open ? (
          <FaTimes className="text-black transition-opacity duration-300" />
        ) : (
          <FaBars className="text-white transition-opacity duration-300" />
        )}
      </button>

      {/* Mobile Menu */}
     <div
  ref={mobileMenuRef}
  className="md:hidden fixed top-0 right-[-100%] w-5/5 h-screen bg-white backdrop-blur-md border-l border-white/20 flex flex-col items-center justify-center text-center z-65"
>

        {["Home", "Shop", "About", "Contact"].map((item, index) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            onClick={closeMenu}
            ref={(el) => (mobileLinksRef.current[index] = el)}
            className="text-black text-2xl my-4"
          >
            {item}
          </Link>
        ))}

        <div className="flex gap-6 mt-6" ref={iconGroupRef}>
          <Link to="/cart" onClick={closeMenu}>
            <FaShoppingCart className="text-black text-2xl hover:text-purple-600 transition-colors" />
          </Link>
          <Link to="/user" onClick={closeMenu}>
            <FaUser className="text-black text-2xl hover:text-purple-600 transition-colors" />
          </Link>
        </div>
      </div>
    </>
  );
}
