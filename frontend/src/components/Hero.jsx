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
  FaShoppingBag,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";
import ProductMultiSelector from "./ProductMultiSelector";
import OrderInvoiceModal from "./OrderInvoiceModal";

const DEFAULT_SLIDES = [
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

export default function Hero({ onBookingSubmit }) {
  const { settings, products, addBooking } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    receiveDate: "",
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Background Settings
  const bgMode = settings?.heroBgMode || "carousel"; // "carousel" | "single"
  const singleImage = settings?.heroSingleImage || "/assets/one.avif";
  const activeSlides =
    settings?.heroSlides && settings.heroSlides.length > 0
      ? settings.heroSlides
      : DEFAULT_SLIDES;

  useEffect(() => {
    if (bgMode === "single") return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bgMode, activeSlides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate live total price
  const totalAmount = selectedItems.reduce((acc, it) => acc + (it.total || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: "দয়া করে আপনার নাম ও মোবাইল নম্বর প্রদান করুন",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "পণ্য নির্বাচন করুন!",
        text: "অনুগ্রহ করে অন্তত একটি পণ্য নির্বাচন করুন",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    // Prepare Order Object
    const firstItem = selectedItems[0];
    const orderPayload = {
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerAddress: formData.address.trim() || "ঠিকানা উল্লেখ নেই",
      items: selectedItems.map((it) => ({
        productId: it.productId,
        productName: it.productName || it.name,
        unit: it.unit || "কেজি",
        quantity: it.quantity,
        price: it.price,
        total: it.total,
      })),
      mangoName: selectedItems.map((it) => it.name).join(", "),
      quantity: selectedItems.reduce((sum, it) => sum + it.quantity, 0),
      packageLabel: selectedItems.map((it) => `${it.name} (${it.quantity} ${it.unit})`).join(", "),
      subtotal: totalAmount,
      totalAmount,
      deliveryDate: formData.receiveDate || new Date().toISOString().split("T")[0],
      paymentMethod: "cod",
      customerNote: "হিরো সেকশন অর্ডার ফর্ম থেকে গৃহীত",
    };

    try {
      const savedBooking = await addBooking(orderPayload);
      setCreatedOrder(savedBooking || { ...orderPayload, id: `AMW-${Date.now().toString().slice(-6)}` });
      setShowInvoiceModal(true);

      // Reset Form
      setFormData({
        name: "",
        phone: "",
        address: "",
        receiveDate: "",
      });
      setSelectedItems([]);

      if (onBookingSubmit) onBookingSubmit();
    } catch (err) {
      console.error("Order submission error:", err);
      Swal.fire({
        icon: "error",
        title: "অর্ডার গ্রহণ ব্যর্থ হয়েছে",
        text: "দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
      });
    }
  };

  // Highlights / Features from settings
  const highlights =
    settings?.heroHighlights && settings.heroHighlights.length > 0
      ? settings.heroHighlights
      : [
          { text: "সারা দেশ ডেলিভারি", icon: "truck" },
          { text: "কেমিক্যাল ফ্রি", icon: "leaf" },
          { text: "০১৭৪৯-৭৭৫০৩০", icon: "phone" },
        ];

  const renderHighlightIcon = (icon) => {
    if (icon === "leaf" || icon === "🍃") return <FaLeaf className="inline text-green-400 mr-1.5" />;
    if (icon === "phone" || icon === "📞") return <FaPhoneAlt className="inline text-amber-300 mr-1.5" />;
    return <FaTruck className="inline text-yellow-400 mr-1.5" />;
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Black underlay for seamless dark crossfade */}
        <div className="absolute inset-0 bg-black z-0 pointer-events-none" />

        {/* Background: Single Image vs Slider Carousel */}
        {bgMode === "single" ? (
          <div className="absolute inset-0 z-0 bg-black">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${singleImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
            </div>
          </div>
        ) : (
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
                style={{ backgroundImage: `url(${activeSlides[currentSlide]?.url || "/assets/one.avif"})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Slide Navigation Buttons (Only if Carousel mode) */}
        {bgMode === "carousel" && activeSlides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-xl" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx ? "w-8 h-2 bg-yellow-500" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-6 py-24 md:py-28">
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
              {/* Top Badge: "কেমিক্যাল মুক্ত" */}
              <div className="inline-flex items-center bg-yellow-500/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs sm:text-sm font-black text-green-950 mb-3.5 shadow-md">
                <span className="mr-1.5 text-green-900">{settings?.heroTopBadgeIcon || "🍃"}</span>
                <span>
                  {settings?.heroTopBadgeText ||
                    (bgMode === "carousel" ? activeSlides[currentSlide]?.subtitle : "কেমিক্যাল মুক্ত") ||
                    "কেমিক্যাল মুক্ত"}
                </span>
              </div>

              {/* Hero Main Title: "আমওয়ালা ভাইয়া" */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none">
                <span className="text-yellow-400">
                  {settings?.heroMainTitlePart1 || "আমওয়ালা"}
                </span>{" "}
                <span className="text-white">
                  {settings?.heroMainTitlePart2 || "ভাইয়া"}
                </span>
              </h1>

              {/* Hero Subtitle / Quality Highlight: "প্রিমিয়াম কোয়ালিটি" */}
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-300 mt-3 drop-shadow">
                {settings?.heroSubtitleText ||
                  (bgMode === "carousel" ? activeSlides[currentSlide]?.title : "প্রিমিয়াম কোয়ালিটি") ||
                  "প্রিমিয়াম কোয়ালিটি"}
              </p>
            </motion.div>

            <div className="divider w-24 bg-yellow-500 h-1 mx-auto lg:mx-0 my-4 rounded-full" />

            {/* Hero Description Paragraph */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {settings?.heroDescriptionText ||
                "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।"}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-green-600/95 backdrop-blur-sm border border-green-400 text-white font-bold text-xs sm:text-sm shadow-md">
                <FaCheckCircle className="text-yellow-400 text-base shrink-0" />
                <span>{settings?.heroTrustBadge1Text || "১০০% রেকমেন্ডেড"}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-yellow-500/95 backdrop-blur-sm border border-yellow-400 text-green-950 font-black text-xs sm:text-sm shadow-md">
                <FaStar className="text-green-800 text-base shrink-0" />
                <span>{settings?.heroTrustBadge2Text || "৬+ গ্রাহক রিভিউ"}</span>
              </div>
            </div>

            {/* Bottom Highlights List */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-gray-200 justify-center lg:justify-start">
              {highlights.map((hl, idx) => (
                <span key={idx} className="flex items-center font-bold">
                  {renderHighlightIcon(hl.icon)} {hl.text}
                </span>
              ))}
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
              className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-5 sm:p-7 border border-amber-200"
              style={{ boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.4)" }}
            >
              {/* Form Title changed to "🍋 অর্ডার ফর্ম" per user instruction */}
              <h3 className="text-xl sm:text-2xl font-black text-green-800 text-center border-b-4 border-yellow-400 inline-block w-full pb-2 mb-4">
                🍋 অর্ডার ফর্ম
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম *"
                    className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500 text-xs sm:text-sm h-11"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="মোবাইল নম্বর *"
                    className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500 text-xs sm:text-sm h-11"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা)"
                    className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 placeholder-gray-500 text-xs sm:text-sm h-11"
                  />
                </div>

                {/* Multi-product searchable selector */}
                <ProductMultiSelector
                  selectedItems={selectedItems}
                  onChange={setSelectedItems}
                />

                {/* Delivery Date Picker */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    প্রত্যাশিত ডেলিভারি তারিখ (ঐচ্ছিক)
                  </label>
                  <input
                    type="date"
                    name="receiveDate"
                    value={formData.receiveDate}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 text-xs h-10"
                  />
                </div>

                {/* Live Total Price Display Box (Marked in Red in Image 3!) */}
                <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 border-2 border-amber-400/80 rounded-2xl p-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-black text-gray-800">
                      সর্বমোট মূল্য (Total):
                    </span>
                  </div>
                  <span className="text-xl font-black text-green-900">
                    ৳ {totalAmount}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-green-600 hover:from-yellow-600 hover:to-green-700 text-white font-black text-base border-none shadow-lg mt-2 cursor-pointer transition transform hover:scale-[1.01]"
                >
                  প্রি-অর্ডার নিশ্চিত করুন
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Downloadable Order Invoice Modal */}
      <OrderInvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        order={createdOrder}
      />
    </>
  );
}
