import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaCheckCircle,
  FaStar,
  FaTruck,
  FaPhoneAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const slides = [
  {
    url: "/assets/one.avif",
    title: "তাজা ও রসালো আম",
    subtitle: "সরাসরি বাগান থেকে",
  },
  {
    url: "/assets/two.avif",
    title: "প্রিমিয়াম কোয়ালিটি",
    subtitle: "কেমিক্যাল মুক্ত",
  },
  {
    url: "/assets/three.avif",
    title: "সারা দেশ ডেলিভারি",
    subtitle: "দ্রুত ও নিরাপদ",
  },
  {
    url: "/assets/four.avif",
    title: "১১+ জাতের আম",
    subtitle: "বাছাই করুন আপনার পছন্দ",
  },
];

const mangoOptions = [
  "গুটি/স্থানীয় (৳ ১২০/কেজি)",
  "গোপালভোগ (৳ ১৮০/কেজি)",
  "ক্ষীরসাপাতি / হিমসাগর (৳ ২২০/কেজি)",
  "ল্যাংড়া (৳ ১৬০/কেজি)",
  "আম্রপালি (৳ ১৯০/কেজি)",
  "ফজলি (৳ ২৫০/কেজি)",
  "হাঁড়িভাঙ্গা (৳ ১৪০/কেজি)",
  "বানানা ম্যাঙ্গো (৳ ১৩০/কেজি)",
  "আশিনা/বারি-৪ (৳ ১৭০/কেজি)",
  "গৌরমতি (৳ ১৫০/কেজি)",
  "কাটিমন (৳ ১৮৫/কেজি)",
];

export default function Hero({ onBookingSubmit }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    mangoType: "",
    quantity: "",
    receiveDate: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.mangoType || !formData.quantity) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: "দয়া করে নাম, ফোন, আমের ধরণ এবং পরিমাণ পূরণ করুন",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("mangoPreOrders") || "[]");
    const newOrder = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    existingOrders.push(newOrder);
    localStorage.setItem("mangoPreOrders", JSON.stringify(existingOrders));

    Swal.fire({
      icon: "success",
      title: "সফল!",
      text: `ধন্যবাদ ${formData.name}! আপনার প্রি-অর্ডার গৃহীত হয়েছে।`,
      confirmButtonColor: "#84cc16",
    });

    setFormData({
      name: "",
      phone: "",
      address: "",
      mangoType: "",
      quantity: "",
      receiveDate: "",
    });

    if (onBookingSubmit) onBookingSubmit();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Black underlay for seamless dark crossfade */}
      <div className="absolute inset-0 bg-black z-0 pointer-events-none" />

      {/* Background Image Slider with Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-black"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/45" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx ? "w-8 h-2 bg-yellow-500" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-5 py-24 md:py-28">
        {/* Left Column: Heading, Subtitle & Badges */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left text-white"
        >
          <motion.div
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="inline-flex items-center bg-yellow-500/80 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-semibold text-green-950 mb-3 shadow-md">
              <FaLeaf className="inline text-green-800 mr-1.5" /> {slides[currentSlide].subtitle}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="text-yellow-400">আমওয়ালা</span>
              <span className="text-white"> ভাইয়া</span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-yellow-300 mt-4 drop-shadow">
              {slides[currentSlide].title}
            </p>
          </motion.div>

          <div className="divider w-24 bg-yellow-500 h-1 mx-auto lg:mx-0 my-5 rounded-full" />

          <p className="text-gray-200 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-green-600/95 backdrop-blur-sm border-2 border-green-400 text-white font-bold text-base shadow-md">
              <FaCheckCircle className="text-yellow-400 text-lg flex-shrink-0" />
              <span>১০০% রেকমেন্ডেড</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-yellow-500/95 backdrop-blur-sm border-2 border-yellow-400 text-green-950 font-bold text-base shadow-md">
              <FaStar className="text-green-800 text-lg flex-shrink-0" />
              <span>৬+ গ্রাহক রিভিউ</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-200 justify-center lg:justify-start">
            <span className="flex items-center">
              <FaTruck className="inline text-yellow-400 mr-1.5" /> সারা দেশ ডেলিভারি
            </span>
            <span className="flex items-center">
              <FaLeaf className="inline text-green-400 mr-1.5" /> কেমিক্যাল ফ্রি
            </span>
            <span className="flex items-center">
              <FaPhoneAlt className="inline text-amber-300 mr-1.5" /> ০১৭৪৯-৭৭৫০৩০
            </span>
          </div>
        </motion.div>

        {/* Right Column: Pre-booking Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-amber-200"
            style={{ boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.4)" }}
          >
            <h3 className="text-2xl font-bold text-green-800 text-center border-b-4 border-yellow-400 inline-block w-full pb-2 mb-5">
              🍋 অর্ডার ফর্ম (প্রি-বুকিং)
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="আপনার নাম *"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="মোবাইল নম্বর *"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা)"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500"
                />
              </div>
              <div>
                <select
                  name="mangoType"
                  value={formData.mangoType}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
                >
                  <option value="" disabled>আমের জাত নির্বাচন করুন *</option>
                  {mangoOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="পরিমাণ (কেজি) *"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500"
                />
                <input
                  type="date"
                  name="receiveDate"
                  value={formData.receiveDate}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-green-600 text-white font-bold text-lg hover:from-yellow-600 hover:to-green-700 border-none shadow-lg mt-4 cursor-pointer"
              >
                প্রি-অর্ডার নিশ্চিত করুন
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
