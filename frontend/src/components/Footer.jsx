import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaChevronUp,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaLeaf,
  FaHeadset,
  FaMedal,
  FaCreditCard,
  FaShieldAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaUserShield,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

const quickLinks = [
  { name: "হোম", href: "#home", icon: "🏠" },
  { name: "আমের জাত", href: "#varieties", icon: "🥭" },
  { name: "আমাদের সম্পর্কে", href: "#about", icon: "📖" },
  { name: "গ্রাহক মতামত", href: "#reviews", icon: "⭐" },
  { name: "অর্ডার করুন", href: "#order", icon: "📦" },
];

const mangoList = [
  "গুটি/স্থানীয়",
  "গোপালভোগ",
  "হিমসাগর",
  "ল্যাংড়া",
  "আম্রপালি",
  "ফজলি",
  "কাটিমন",
  "গৌরমতি",
];

const contactList = [
  { icon: <FaPhoneAlt className="text-yellow-500" />, text: "০১৭৪৯-৭৭৫০৩০", link: "tel:01749775030" },
  { icon: <FaWhatsapp className="text-green-500" />, text: "WhatsApp", link: "https://wa.me/8801749775030" },
  { icon: <FaEnvelope className="text-yellow-500" />, text: "ammwalaaviya@gmail.com", link: "mailto:ammwalaaviya@gmail.com" },
  { icon: <FaMapMarkerAlt className="text-red-500" />, text: "রাজশাহী, বাংলাদেশ - ৬২০৩", link: "https://maps.google.com" },
];

const featuresList = [
  { icon: <FaTruck />, title: "সারাদেশ ডেলিভারি", desc: "দ্রুত ও নিরাপদ" },
  { icon: <FaLeaf />, title: "গুনগত মান", desc: "১০০% সতেজ ও বিশুদ্ধ" },
  { icon: <FaHeadset />, title: "২৪/৭ সাপোর্ট", desc: "যেকোনো সময় যোগাযোগ" },
  { icon: <FaMedal />, title: "প্রিমিয়াম কোয়ালিটি", desc: "বাগান থেকে সরাসরি" },
];

const socialLinks = [
  { icon: <FaFacebookF />, link: "https://facebook.com", color: "hover:bg-blue-600" },
  { icon: <FaInstagram />, link: "https://instagram.com", color: "hover:bg-pink-600" },
  { icon: <FaYoutube />, link: "https://youtube.com", color: "hover:bg-red-600" },
  { icon: <FaWhatsapp />, link: "https://wa.me/8801749775030", color: "hover:bg-green-600" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings, isAuthenticated } = useApp();

  const dynamicContactList = [
    {
      icon: <FaPhoneAlt className="text-yellow-500" />,
      text: settings?.hotlinePhone || "০১৭৪৯-৭৭৫০৩০",
      link: `tel:${settings?.rawHotlinePhone || "01749775030"}`,
    },
    {
      icon: <FaWhatsapp className="text-green-500" />,
      text: "WhatsApp",
      link: `https://wa.me/${settings?.whatsappNumber || "8801749775030"}`,
    },
    {
      icon: <FaEnvelope className="text-yellow-500" />,
      text: settings?.email || "ammwalaaviya@gmail.com",
      link: `mailto:${settings?.email || "ammwalaaviya@gmail.com"}`,
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      text: settings?.officeAddress || "রাজশাহী, বাংলাদেশ - ৬২০৩",
      link: "https://maps.google.com",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-amber-900 text-white pt-16 pb-6">
      {/* Top Colorful Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400" />

      {/* Decorative Faint Mango Icon */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <FaLeaf className="text-8xl text-yellow-400 transform rotate-45" />
      </div>

      {/* Scroll-to-Top Button - Cleanly positioned above the footer line without clipping */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
        <motion.button
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="bg-gradient-to-r from-yellow-500 to-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 border-2 border-white/80 cursor-pointer transition-all"
          aria-label="উপরে যান"
        >
          <FaChevronUp className="text-lg" />
        </motion.button>
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pt-6">
          {/* Col 1: Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                  আমওয়ালা ভাইয়া
                </h3>
                <p className="text-sm text-yellow-300">প্রিমিয়াম মানের দেশি আম</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              রাজশাহী, চুয়াডাঙ্গা ও নওগাঁর সেরা জাতের আম সরাসরি বাগান থেকে আপনার ঘরে পৌঁছে দিচ্ছি। কেমিক্যাল-মুক্ত, পুষ্টিকর ও সুস্বাদু আমের অভিজ্ঞতা নিন।
            </p>

            <div className="flex space-x-3 pt-2">
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className={`w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white transition-all ${item.color} hover:text-white shadow`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold border-l-4 border-yellow-500 pl-3">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Mango Varieties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold border-l-4 border-yellow-500 pl-3">
              আমের জাত
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {mangoList.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-300 text-sm flex items-center gap-1.5"
                >
                  <span className="text-yellow-500">🥭</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Col 4: Contact & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold border-l-4 border-yellow-500 pl-3">
              যোগাযোগ
            </h4>
            <ul className="space-y-3">
              {dynamicContactList.map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/10">
              <h5 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2 text-sm">
                <FaClock /> খোলার সময়
              </h5>
              <p className="text-gray-300 text-xs">সোম-শনি: সকাল ৮টা - রাত ৮টা</p>
              <p className="text-gray-300 text-xs">রবিবার: সকাল ১০টা - সন্ধ্যা ৬টা</p>
              <p className="text-green-400 text-xs mt-1 font-medium">✨ অনলাইন অর্ডার ২৪/৭</p>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-white/10 my-8"
        >
          {featuresList.map((item, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-3xl text-yellow-500 flex justify-center">
                {item.icon}
              </div>
              <h5 className="font-semibold text-sm">{item.title}</h5>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Payment Methods & Policy */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <FaCreditCard className="text-yellow-500 text-xl" />
            <span className="text-sm text-gray-300">পেমেন্ট মেথড:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-pink-600 rounded text-xs font-semibold text-white">বিকাশ</span>
              <span className="px-3 py-1 bg-orange-500 rounded text-xs font-semibold text-white">নগদ</span>
              <span className="px-3 py-1 bg-purple-600 rounded text-xs font-semibold text-white">রকেট</span>
              <span className="px-3 py-1 bg-green-600 rounded text-xs font-semibold text-white">ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-green-400" />
            <span className="text-xs text-gray-300">৭ দিনের রিটার্ন পলিসি</span>
          </div>
        </div>

        {/* Bottom Copyright & Credits */}
        <div className="text-center pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            © {currentYear} {settings?.siteName || "আমওয়ালা ভাইয়া"} - সর্বস্বত্ব সংরক্ষিত |
            <a href="#" className="hover:text-yellow-400 transition-colors ml-1">গোপনীয়তা নীতি</a> |
            <a href="#" className="hover:text-yellow-400 transition-colors ml-1">সেবার শর্তাবলী</a> |
            <Link to={isAuthenticated ? "/admin" : "/admin/login"} className="text-yellow-400 hover:text-yellow-300 font-bold ml-1 transition">
              {isAuthenticated ? "এডমিন ড্যাশবোর্ড" : "এডমিন লগইন"}
            </Link>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            ডিজাইন ও ডেভেলপড with{" "}
            <a
              href="https://devhome.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline transition-colors"
            >
              DevHome
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
