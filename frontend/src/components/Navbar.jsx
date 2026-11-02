import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaPhoneAlt,
  FaWhatsapp,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaUserShield,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

const navLinks = [
  { name: "হোম", href: "#home", icon: "🏠" },
  { name: "আমের জাত", href: "#varieties", icon: "🥭" },
  { name: "পরিচয়", href: "#about", icon: "📖" },
  { name: "মতামত", href: "#reviews", icon: "⭐" },
  { name: "অর্ডার করুন", href: "#order", icon: "📦" },
];

const floatingSocials = [
  { icon: <FaFacebookF />, color: "bg-blue-600", link: "https://facebook.com" },
  { icon: <FaInstagram />, color: "bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600", link: "https://instagram.com" },
  { icon: <FaYoutube />, color: "bg-red-600", link: "https://youtube.com" },
  { icon: <FaWhatsapp />, color: "bg-green-500", link: "https://wa.me/8801749775030" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, isAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/" + href);
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main Header with Exact Frosted Amber/Yellow/Green Gradient */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-amber-50/80 via-yellow-50/80 to-green-50/80 backdrop-blur-md"
        } border-b border-amber-200/50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent">
                  আমওয়ালা ভাইয়া
                </h1>
                <p className="text-xs text-amber-600 font-medium">
                  প্রিমিয়াম মানের দেশি আম
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation Links with Emojis */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 font-medium transition-all duration-200 hover:bg-yellow-100/50 group relative cursor-pointer"
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-yellow-400 to-green-500 transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Call CTA */}
              <motion.a
                href={`tel:${settings?.rawHotlinePhone || "01749775030"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <FaPhoneAlt className="text-xs" />
                <span>কল করুন</span>
              </motion.a>

              {/* WhatsApp Button */}
              <motion.a
                href={`https://wa.me/${settings?.whatsappNumber || "8801749775030"}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center justify-center w-9 h-9 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </motion.a>

              {/* Cart Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleNavClick(e, "#order")}
                className="relative cursor-pointer"
                aria-label="Cart"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                  <FaShoppingCart className="text-white text-sm" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </motion.div>

              {/* Mobile Menu Toggle Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center shadow-md cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-white" />
                ) : (
                  <FaBars className="text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Floating Social Icons Bar (Desktop Left Edge) */}
      <div className="hidden lg:flex fixed left-4 top-1/2 transform -translate-y-1/2 flex-col gap-3 z-40">
        {floatingSocials.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2, x: 5 }}
            className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Drawer */}
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed top-16 left-0 right-0 bottom-0 z-40 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-lg h-full shadow-2xl overflow-y-auto">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-green-600 font-medium text-lg hover:bg-yellow-50 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span className="text-2xl">{item.icon}</span>
                {item.name}
              </motion.a>
            ))}

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <a
                href={`tel:${settings?.rawHotlinePhone || "01749775030"}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow"
              >
                <FaPhoneAlt /> <span>কল করুন</span>
              </a>
              <div className="flex justify-center gap-4 pt-2">
                {floatingSocials.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center text-white shadow`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
