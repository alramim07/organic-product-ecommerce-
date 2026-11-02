import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaHome,
  FaArrowLeft,
  FaBoxOpen,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaExclamationTriangle,
  FaLeaf,
} from "react-icons/fa";
import Swal from "sweetalert2";

const quickLinks = [
  { name: "হোম পেজ", path: "/", icon: "🏠", color: "from-green-500 to-green-600" },
  { name: "আমের জাত", path: "/#varieties", icon: "🥭", color: "from-yellow-500 to-yellow-600" },
  { name: "অর্ডার করুন", path: "/#order", icon: "📦", color: "from-orange-500 to-orange-600" },
  { name: "যোগাযোগ", path: "/#contact", icon: "📞", color: "from-blue-500 to-blue-600" },
];

const funFacts = [
  "আম বাংলাদেশের জাতীয় ফল!",
  "বিশ্বে ১০০০+ প্রজাতির আম আছে!",
  "আমে ভিটামিন সি প্রচুর পরিমাণে থাকে!",
  "বাংলাদেশের রাজশাহী আমের জন্য বিখ্যাত!",
  "কাঁচা আম দিয়ে চাটনি ও আচার তৈরি হয়!",
];

export default function NotFound() {
  const navigate = useNavigate();
  const [randomFact] = useState(() => funFacts[Math.floor(Math.random() * funFacts.length)]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      Swal.fire({
        icon: "info",
        title: "অনুসন্ধান",
        text: "🔍 খোঁজার ফিচার শীঘ্রই আসছে!",
        confirmButtonColor: "#eab308",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50 flex items-center justify-center px-4 py-20 overflow-hidden relative">
      {/* Background Floating Decorators */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <FaLeaf className="text-8xl text-green-600 transform rotate-45" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <FaLeaf className="text-8xl text-yellow-600 transform -rotate-45" />
        </div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          className="text-center mb-8"
        >
          <div className="inline-block relative">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl">🥭</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
            >
              404
            </motion.div>
          </div>
        </motion.div>

        {/* Text Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-green-700 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            পেজ খুঁজে পাওয়া যায়নি!
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaExclamationTriangle className="text-3xl text-yellow-600" />
            <p className="text-xl text-gray-700 font-medium">
              দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-sm border border-yellow-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-green-700">🎯 দিদি জানেন?</span> {randomFact}
            </p>
          </div>
        </motion.div>

        {/* Search Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              placeholder="আমের নাম বা পৃষ্ঠা খুঁজুন..."
              className="w-full px-6 py-4 pl-14 rounded-full border-2 border-yellow-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-green-500 transition-all shadow-lg text-gray-800"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-yellow-500 text-xl" />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
            >
              খুঁজুন
            </button>
          </div>
        </motion.div>

        {/* Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold shadow-lg flex items-center gap-2 hover:shadow-xl transition-all cursor-pointer"
            >
              <FaHome /> হোম পেজে ফিরুন
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold shadow-lg flex items-center gap-2 hover:shadow-xl transition-all cursor-pointer"
          >
            <FaArrowLeft /> পেছনে যান
          </motion.button>

          <Link to="/#order">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg flex items-center gap-2 hover:shadow-xl transition-all cursor-pointer"
            >
              <FaBoxOpen /> এখনই অর্ডার করুন
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center text-green-800 mb-6">
            আপনি হয়তো খুঁজতে চাইতে পারেন:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-r ${item.color} text-white rounded-2xl p-5 shadow-lg cursor-pointer transition-all`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-xs opacity-90 mt-1">এখনই ভিজিট করুন →</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200 shadow-sm"
        >
          <p className="text-gray-700 mb-4 font-medium">
            কোনো সমস্যা হলে সরাসরি আমাদের সাথে যোগাযোগ করুন:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:01749775030">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-semibold shadow hover:bg-green-700 transition-all"
              >
                <FaPhoneAlt /> কল করুন
              </motion.button>
            </a>
            <a href="https://wa.me/8801749775030" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-full text-sm font-semibold shadow hover:bg-green-600 transition-all"
              >
                <FaWhatsapp /> WhatsApp
              </motion.button>
            </a>
            <a href="mailto:ammwalaaviya@gmail.com">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white rounded-full text-sm font-semibold shadow hover:bg-yellow-700 transition-all"
              >
                <FaEnvelope /> ইমেইল
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Animated Mango Emojis */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -top-10 -left-10 opacity-30 pointer-events-none hidden lg:block"
      >
        <span className="text-8xl">🥭</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="absolute -bottom-10 -right-10 opacity-30 pointer-events-none hidden lg:block"
      >
        <span className="text-8xl">🥭</span>
      </motion.div>
    </div>
  );
}
