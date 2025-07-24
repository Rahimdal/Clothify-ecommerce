import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import imgpc from "./img/pc -Landing -page.jpg";
import imgmobile from "./img/mobil-landin-page.jpg";
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ShoppingCart } from 'lucide-react'
import CircularText from "../../components/CircularText";
import GirlsShirtsSlider from "../../components/GirlsShirtsSlider";


gsap.registerPlugin(ScrollTrigger)


const AddToCartButton = () => (
  <button className="mt-4 bg-black text-white px-2 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2">
    <ShoppingCart size={16} /> Add to Cart
  </button>
)

export default function Home() {
  const title = useRef(null)
  const desc = useRef(null)
  const cta = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const grid = document.querySelectorAll('#promo-grid > div');
    grid.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 10);

    gsap.fromTo(
      title.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    gsap.fromTo(
      desc.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, delay: 0.3, duration: 1, ease: 'power3.out' }
    )
    gsap.fromTo(
      cta.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.6, duration: 0.8, ease: 'back.out(1.7)' }
    )

    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Animate Girls' Shirts section
    gsap.fromTo(
      '.girls-shirts-section',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.girls-shirts-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <div className="w-full bg-black text-white font-sans">



      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden z-52">
        {/* Desktop Image */}
        <img
          src={imgpc}
          alt="Desktop Fashion"
          className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Mobile Image */}
        <img
          src={imgmobile}
          alt="Mobile Fashion"
          className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
        />





        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center px-6 md:px-20">



          <div className="max-w-2xl">
            <h1
              ref={title}
              className="text-4xl md:text-6xl font-extrabold leading-tight  tracking-wide"
            >
              The Future of Fashion Starts Here
            </h1>

            <p
              ref={desc}
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-md"
            >
              Explore the finest collections of designer clothing, crafted for bold and elegant personalities.
            </p>
            <button
              ref={cta}
              className="mt-8 pl-3 pr-6 py-3 bg-white text-black font-semibold rounded-full border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-white overflow-hidden"
            >
              <span className="transform -translate-x-10 group-hover:translate-x-0 transition-transform duration-500 ease-out">
                <ShoppingCart size={20} />
              </span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
                Browse Collection
              </span>
            </button>

          </div>
        </div>

        {/* CircularText positioned bottom-right - Hidden on mobile */}
        <div className="absolute bottom-4 right-4 z-30 hidden lg:block">
          <CircularText text="SHOP NOW • PREMIUM QUALITY • " />
        </div>
      </div>


      {/* New Drops Section */}
      <section className="bg-white text-black py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">NEW DROPS</h2>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Stand out with our latest collection—bold designs, premium fabrics, and street-ready fits. Once they're gone, they're gone. Don't miss out!
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'SHADOW DRIP',
              desc: 'A sleek, minimalist hoodie with dark tones and subtle reflective accents for an effortless street vibe.',
              price: '$899',
              image: '/public/img/home-page/new-drops/hoodie-img-card.png'
            },
            {
              title: 'URBAN PHANTOM',
              desc: 'Urban Phantom – a bold, oversized hoodie with edgy graphics and a stealthy aesthetic inspired by city nights.',
              price: '$899',
              image: '/public/img/home-page/new-drops/T-shirt-img-card.png'
            },
            {
              title: 'NEON REBELLION',
              desc: 'A statement piece with vibrant neon details and rebellious street art influences for a standout look.',
              price: '$899',
              image: '/public/img/home-page/new-drops/shit-img-card.png'
            }
          ].map((item, index) => (
            <div
              key={index}
              ref={el => (cardsRef.current[index] = el)}
              className="bg-gray-100 rounded-2xl overflow-hidden shadow-md"
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-[360px] object-cover object-center" />
                <span className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded-full uppercase font-bold">
                  New
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <p className="text-base font-semibold">{item.price} <span className="line-through text-sm text-gray-400 ml-2">$1000</span></p>
                <AddToCartButton />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Grid Section */}
      <section className="bg-white py-20 px-6 md:px-20">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
        SHIP YOUR WEBSITE QUICKLY WITH FRAMEBLOX
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Use prebuilt templates and components for a professional, stunning look. Save time and
        focus on content with our user-friendly, customizable design solutions.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6" id="promo-grid">
      {/* Row 1 */}
      <div className="rounded-2xl overflow-hidden">
        <img src="/public/img/home-page/Promo-Grid/Premium-Fabrics.png" alt="Promo 1" className="w-full h-full object-cover" />
      </div>
      <div className="bg-black text-white rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 uppercase">ELEVATE YOUR STREET GAME


</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mb-4">
            <li>Modern & Minimalist Aesthetic</li>
            <li>Premium Fabrics</li>
            <li>Sustainable Fashion</li>
            <li>Made for Movement</li>
            <li>Gender-Inclusive Styles</li>
          </ul>
          <p className="text-sm text-gray-300">
            From the streets to your style—our journey is all about self-expression and rebellion. Join the movement.
          </p>
        </div>
        <button className="mt-4 px-4 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center gap-2 w-fit">
          Read our story <span>&rarr;</span>
        </button>
      </div>

      {/* Row 2 */}
      <div className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl text-black font-bold mb-2">ELEVATE YOUR STREET GAME</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
            <li>Statement Pieces & Basics</li>
            <li>Detail-Driven Design</li>
            <li>Global Streetwear Influence</li>
            <li>Designed in [Your City/Country]</li>
            <li>Wear Your Identity</li>
          </ul>
          <p className="text-sm text-gray-700">
            From bold graphics to everyday essentials, explore our latest drops and signature pieces designed for the culture.
          </p>
        </div>
        <button className="mt-4 px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition flex items-center gap-2 w-fit">
          Shop collections <span>&rarr;</span>
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden">
        <img src="/public/img/home-page/Promo-Grid/Gemini_Generated_Image_rup6sirup6sirup6.png" alt="Promo 2" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</section>





{/* Girls' Shirts Collection Section */}
<section className="girls-shirts-section bg-white py-20 px-6 md:px-20">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Women's Fashion Collection
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Discover our curated collection of women's shirts, t-shirts, and hoodies. From professional essentials to casual comfort wear, find the perfect style for every occasion.
      </p>
    </div>

    <GirlsShirtsSlider />
  </div>
</section>
    </div>

  )
}
