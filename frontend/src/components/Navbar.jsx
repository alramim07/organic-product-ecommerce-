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

const DEFAULT_NAV_LINKS = [
  { name: "হোম", href: "#home", icon: "🏠", showIcon: true },
  { name: "আমের জাত", href: "#varieties", icon: "🥭", showIcon: true },
  { name: "পরিচয়", href: "#about", icon: "📖", showIcon: true },
  { name: "মতামত", href: "#reviews", icon: "⭐", showIcon: true },
  { name: "অর্ডার করুন", href: "#order", icon: "📦", showIcon: true },
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

  const navLinks =
    settings?.headerNavLinks && settings.headerNavLinks.length > 0
      ? settings.headerNavLinks
      : DEFAULT_NAV_LINKS;

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

  const activeCallPhone =
    settings?.headerCallBtnPhone || settings?.rawHotlinePhone || "01749775030";
  const activeWhatsapp = (
    settings?.headerWhatsappNumber ||
    settings?.whatsappNumber ||
    "8801749775030"
  ).replace(/[^0-9]/g, "");

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
            {/* Logo & Brand Display */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center space-x-2.5 cursor-pointer shrink-0"
              onClick={handleLogoClick}
            >
              <div className="relative flex items-center">
                {settings?.websiteLogo ? (
                  <img
                    src={settings.websiteLogo}
                    alt={settings?.siteName || "Logo"}
                    className={
                      settings?.headerBrandDisplay === "logo_and_text"
                        ? "w-10 h-10 object-contain rounded-xl shadow-md border border-white/50 bg-white"
                        : "h-10 sm:h-12 max-h-12 w-auto max-w-[180px] sm:max-w-[240px] object-contain rounded-xl drop-shadow-sm"
                    }
                  />
                ) : settings?.websiteFavicon ? (
                  <img
                    src={settings.websiteFavicon}
                    alt={settings?.siteName || "Logo"}
                    className="w-10 h-10 object-contain rounded-xl shadow-md border border-white/50 bg-white"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaLeaf className="text-white text-xl" />
                  </div>
                )}
                {settings?.headerBrandDisplay === "logo_and_text" && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
                )}
              </div>

              {/* Optional Brand Text (Title & Tagline) */}
              {settings?.headerBrandDisplay === "logo_and_text" && (
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent leading-tight">
                    {settings?.siteName || "আমওয়ালা ভাইয়া"}
                  </h1>
                  {settings?.tagline && (
                    <p className="text-xs text-amber-600 font-semibold truncate max-w-[220px]">
                      {settings.tagline}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Desktop Navigation Links with Customizable Emojis/Icons */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.name + index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 font-bold transition-all duration-200 hover:bg-yellow-100/50 group relative cursor-pointer flex items-center gap-1.5 text-sm"
                >
                  {item.showIcon !== false && item.icon && (
                    item.icon.startsWith("data:") ||
                    item.icon.startsWith("http") ||
                    item.icon.startsWith("/") ? (
                      <img
                        src={item.icon}
                        alt=""
                        className="w-4 h-4 object-contain inline"
                      />
                    ) : (
                      <span className="text-base leading-none">{item.icon}</span>
                    )
                  )}
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-yellow-400 to-green-500 transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Right Action Buttons with Clean Unified Alignment */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Call CTA Button */}
              {settings?.headerCallBtnShow !== false && (
                <motion.a
                  href={`tel:${activeCallPhone}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="hidden md:inline-flex items-center gap-2 h-10 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all"
                  title={`Call ${activeCallPhone}`}
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>{settings?.headerCallBtnText || "কল করুন"}</span>
                </motion.a>
              )}

              {/* WhatsApp Button */}
              {settings?.headerWhatsappShow !== false && (
                <motion.a
                  href={`https://wa.me/${activeWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="hidden sm:inline-flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md hover:shadow-lg transition-all text-xl"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <FaWhatsapp />
                </motion.a>
              )}

              {/* Mobile Menu Toggle Button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer text-base"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

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
                key={item.name + index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-3 rounded-xl text-gray-700 hover:text-green-600 font-bold text-base hover:bg-yellow-50 transition-all flex items-center gap-3 cursor-pointer"
              >
                {item.showIcon !== false && item.icon && (
                  item.icon.startsWith("data:") ||
                  item.icon.startsWith("http") ||
                  item.icon.startsWith("/") ? (
                    <img
                      src={item.icon}
                      alt=""
                      className="w-5 h-5 object-contain inline"
                    />
                  ) : (
                    <span className="text-xl leading-none">{item.icon}</span>
                  )
                )}
                <span>{item.name}</span>
              </motion.a>
            ))}

            <div className="border-t border-gray-200 pt-4 space-y-3">
              {settings?.headerCallBtnShow !== false && (
                <a
                  href={`tel:${activeCallPhone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow"
                >
                  <FaPhoneAlt /> <span>{settings?.headerCallBtnText || "কল করুন"}</span>
                </a>
              )}
              {settings?.headerWhatsappShow !== false && (
                <a
                  href={`https://wa.me/${activeWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-bold shadow"
                >
                  <FaWhatsapp className="text-lg" /> <span>WhatsApp-এ মেসেজ দিন</span>
                </a>
              )}
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
