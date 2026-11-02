import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";

export const mangoVarietiesData = [
  {
    id: 1,
    name_bn: "গুটি/স্থানীয়",
    price: "৳ ১২০/কেজি",
    price_per_unit: 120,
    unit: "কেজি",
    image: "/assets/mangoes/m1.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে, নওগাঁ: ২২ মে, রাজশাহী: ১৫ মে",
  },
  {
    id: 2,
    name_bn: "গোপালভোগ",
    price: "৳ ১৮০/কেজি",
    price_per_unit: 180,
    unit: "কেজি",
    image: "/assets/mangoes/m2.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে, নওগাঁ: ৩০ মে, রাজশাহী: ২২ মে",
  },
  {
    id: 3,
    name_bn: "ক্ষীরসাপাতি / হিমসাগর",
    price: "৳ ২২০/কেজি",
    price_per_unit: 220,
    unit: "কেজি",
    image: "/assets/mangoes/m3.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে(ক্ষীর) ২২ মে(হিম), নওগাঁ: ২ জুন, রাজশাহী: ৩০ মে",
  },
  {
    id: 4,
    name_bn: "ল্যাংড়া",
    price: "৳ ১৬০/কেজি",
    price_per_unit: 160,
    unit: "কেজি",
    image: "/assets/mangoes/m4.jpg",
    regionDates: "চুয়াডাঙ্গা: ২৮ মে, নওগাঁ: ১০ জুন, রাজশাহী: ১০ জুন",
  },
  {
    id: 5,
    name_bn: "আম্রপালি",
    price: "৳ ১৯০/কেজি",
    price_per_unit: 190,
    unit: "কেজি",
    image: "/assets/mangoes/m5.jpg",
    regionDates: "চুয়াডাঙ্গা: ৫ জুন, নওগাঁ: ১৫ জুন, রাজশাহী: ১৫ জুন",
  },
  {
    id: 6,
    name_bn: "ফজলি",
    price: "৳ ২৫০/কেজি",
    price_per_unit: 250,
    unit: "কেজি",
    image: "/assets/mangoes/m6.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৫ জুন, নওগাঁ: ২৫ জুন, রাজশাহী: ১৫ জুন",
  },
  {
    id: 7,
    name_bn: "হাঁড়িভাঙ্গা",
    price: "৳ ১৪০/কেজি",
    price_per_unit: 140,
    unit: "কেজি",
    image: "/assets/mangoes/m7.jpg",
    regionDates: "চুয়াডাঙ্গা: ২০ জুন, নওগাঁ: ১০ জুন, রাজশাহী: —",
  },
  {
    id: 8,
    name_bn: "বানানা ম্যাঙ্গো",
    price: "৳ ১৩০/কেজি",
    price_per_unit: 130,
    unit: "কেজি",
    image: "/assets/mangoes/m8.jpg",
    regionDates: "চুয়াডাঙ্গা: ২২ জুন, নওগাঁ: ২৫ জুন, রাজশাহী: ১০ জুন",
  },
  {
    id: 9,
    name_bn: "আশিনা/বারি-৪",
    price: "৳ ১৭০/কেজি",
    price_per_unit: 170,
    unit: "কেজি",
    image: "/assets/mangoes/m9.jpg",
    regionDates: "চুয়াডাঙ্গা: ৩০ জুন, নওগাঁ: ৫ জুলাই, রাজশাহী: ১০ জুলাই (আশিনা)",
  },
  {
    id: 10,
    name_bn: "গৌরমতি",
    price: "৳ ১৫০/কেজি",
    price_per_unit: 150,
    unit: "কেজি",
    image: "/assets/mangoes/m10.jpg",
    regionDates: "চুয়াডাঙ্গা: ৩১ জুলাই, নওগাঁ: ৫ জুলাই, রাজশাহী: ১৫ জুলাই",
  },
  {
    id: 11,
    name_bn: "কাটিমন",
    price: "৳ ১৮৫/কেজি",
    price_per_unit: 185,
    unit: "কেজি",
    image: "/assets/mangoes/m11.jpg",
    regionDates: "চুয়াডাঙ্গা: ৫ জুলাই, নওগাঁ: ৫ জুলাই, রাজশাহী: সারা বছর",
  },
];

export default function MangoVarieties({ onSelectMango }) {
  const { products, settings } = useApp();
  const [visibleCount, setVisibleCount] = useState(8);

  // Settings values with fallbacks
  const sectionTitle = settings?.productSectionTitle || "আমের জাত ও মূল্য";
  const sectionTitleIcon = settings?.productSectionTitleIcon || "🥭";
  const sectionSubtitle =
    settings?.productSectionSubtitle ||
    "রাজশাহী, চুয়াডাঙ্গা, নওগাঁর মৌসুমি সেরা আম। নিচের কার্ড থেকে বেছে নিন আপনার পছন্দের জাত।";
  const cardPreset = settings?.productCardPreset || "classic"; // "classic" | "modern" | "elevated" | "bordered"
  const displayMode = settings?.productDisplayMode || "auto"; // "auto" | "custom"
  const customIds = Array.isArray(settings?.productCustomIds) ? settings.productCustomIds : [];
  const showMoreBtnText = settings?.productShowMoreBtnText || "Show More Products";
  const collapseBtnText = settings?.productCollapseBtnText || "Collapse Products";

  // Base Products List
  const allAvailable = products && products.length > 0 ? products : mangoVarietiesData;

  // Filter or arrange products based on displayMode
  let displayList = [];
  if (displayMode === "custom" && customIds.length > 0) {
    const selected = customIds
      .map((id) => allAvailable.find((p) => String(p._id || p.id) === String(id)))
      .filter(Boolean);
    displayList = selected.length > 0 ? selected : allAvailable;
  } else {
    displayList = allAvailable;
  }

  const visibleProducts = displayList.slice(0, visibleCount);
  const hasMore = visibleCount < displayList.length;
  const isExpanded = visibleCount >= displayList.length && displayList.length > 8;

  const handleToggleProducts = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + 8, displayList.length));
    } else if (isExpanded) {
      setVisibleCount(8);
      const sectionEl = document.getElementById("varieties");
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePreOrder = (mango) => {
    const bookingSection = document.getElementById("second-booking") || document.getElementById("order");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }

    Swal.fire({
      icon: "info",
      title: "আম বাছাই",
      text: `"${mango.name_bn || mango.name}" বাছাই করা হয়েছে। নিচের ফর্মটি পূরণ করুন।`,
      confirmButtonColor: "#eab308",
    });

    if (onSelectMango) {
      onSelectMango(mango);
    }
  };

  // Card Preset Styling Classes
  const getPresetStyles = (preset) => {
    switch (preset) {
      case "modern":
        return {
          card: "bg-white border border-gray-200 shadow-sm hover:shadow-xl rounded-2xl",
          body: "bg-white",
          title: "text-gray-900 group-hover/title:text-emerald-700",
          price: "text-emerald-700",
          borderDivider: "border-gray-100",
          orderBtn:
            "bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-none font-bold",
          detailBtn: "text-gray-600 hover:text-emerald-700",
        };
      case "elevated":
        return {
          card: "bg-white border-2 border-emerald-500/20 shadow-xl hover:shadow-2xl rounded-3xl",
          body: "bg-gradient-to-b from-white to-emerald-50/50",
          title: "text-green-950 group-hover/title:text-green-700",
          price: "text-amber-600 font-black",
          borderDivider: "border-emerald-100",
          orderBtn:
            "bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700 text-white rounded-full shadow-md font-black",
          detailBtn: "text-emerald-800 hover:text-emerald-950",
        };
      case "bordered":
        return {
          card: "bg-amber-50/30 border-2 border-emerald-300 hover:border-emerald-500 shadow-sm rounded-2xl",
          body: "bg-white/90 backdrop-blur-sm",
          title: "text-emerald-950 group-hover/title:text-emerald-700",
          price: "text-amber-700",
          borderDivider: "border-emerald-200/60",
          orderBtn:
            "bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow font-bold",
          detailBtn: "text-emerald-700 hover:text-emerald-900",
        };
      case "classic":
      default:
        return {
          card: "bg-white/95 border border-yellow-200 shadow-md hover:shadow-2xl rounded-2xl",
          body: "bg-gradient-to-br from-amber-50/90 via-white to-green-50/60",
          title: "text-green-900 group-hover/title:text-green-700",
          price: "text-yellow-700",
          borderDivider: "border-yellow-200/60",
          orderBtn:
            "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow px-4 py-1.5 font-bold",
          detailBtn: "text-green-800 hover:text-green-950",
        };
    }
  };

  const presetStyle = getPresetStyles(cardPreset);

  return (
    <section id="varieties" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-yellow-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-900 inline-flex items-center justify-center gap-2 border-b-4 sm:border-b-8 border-yellow-400 pb-2.5 px-3">
            <span>{sectionTitleIcon}</span>
            <span>{sectionTitle}</span>
          </h2>
          {/* Subtitle with guaranteed clean responsive line-wrapping */}
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-center px-4 font-medium">
            {sectionSubtitle}
          </p>
        </div>

        {/* Products Grid with Identical Uniform Card Sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {visibleProducts.map((mango, index) => {
            const productId = mango._id || mango.id;
            const priceText =
              mango.price ||
              (mango.price_per_unit ? `৳ ${mango.price_per_unit}/${mango.unit || "কেজি"}` : "৳ ১৮০/কেজি");
            const scheduleText =
              mango.regionDates ||
              mango.harvest_schedule ||
              mango.subtitle_bn ||
              "চুয়াডাঙ্গা, নওগাঁ ও রাজশাহীর বাগান থেকে সংগৃহীত।";

            return (
              <motion.div
                key={productId || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
                viewport={{ once: true }}
                className="h-full flex flex-col"
              >
                <div
                  className={`flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${presetStyle.card}`}
                >
                  {/* Card Image Container - Fixed height & object-cover prevents size deformation */}
                  <Link
                    to={`/product/${productId}`}
                    className="relative w-full h-52 shrink-0 bg-gray-100 overflow-hidden group block"
                  >
                    <img
                      src={mango.image || "/assets/mangoes/m1.jpg"}
                      alt={mango.name_bn || mango.name || "Product"}
                      className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/mangoes/m1.jpg";
                      }}
                    />

                    {/* Badge if stock status exists */}
                    {mango.stock_status && (
                      <span className="absolute top-2.5 right-2.5 bg-green-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        {mango.stock_status}
                      </span>
                    )}

                    {/* Hover Overlay with Eye */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-green-950 font-bold text-xs py-1.5 px-3.5 rounded-full shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <FaEye /> বিস্তারিত দেখুন
                      </span>
                    </div>
                  </Link>

                  {/* Card Body - Equal height & Flex layout */}
                  <div className={`p-5 flex flex-col flex-1 justify-between min-h-[200px] ${presetStyle.body}`}>
                    <div>
                      {/* Product Title - Clickable, truncated with ellipsis (...) on overflow */}
                      <Link
                        to={`/product/${productId}`}
                        className="block group/title"
                        title={mango.name_bn || mango.name}
                      >
                        <h3
                          className={`text-lg sm:text-xl font-bold truncate line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap leading-tight transition ${presetStyle.title}`}
                        >
                          {mango.name_bn || mango.name}
                        </h3>
                      </Link>

                      {/* Price Display */}
                      <p className={`text-lg sm:text-xl font-black mt-1.5 ${presetStyle.price}`}>
                        {priceText}
                      </p>

                      {/* Region Dates / Subtitle - Clamped to 2 lines with fixed height */}
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 flex items-start gap-1.5 min-h-[36px] max-h-[36px] overflow-hidden leading-snug line-clamp-2 text-ellipsis">
                        <FaCalendarAlt className="mt-0.5 text-green-700 shrink-0 text-xs" />
                        <span className="line-clamp-2">{scheduleText}</span>
                      </p>
                    </div>

                    {/* Bottom Action Buttons Row */}
                    <div
                      className={`flex items-center justify-between gap-2 mt-4 pt-3 border-t ${presetStyle.borderDivider}`}
                    >
                      <Link
                        to={`/product/${productId}`}
                        className={`text-xs font-bold flex items-center gap-1 transition ${presetStyle.detailBtn}`}
                      >
                        <FaEye className="text-[11px]" /> <span>বিস্তারিত</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handlePreOrder(mango)}
                        className={`text-xs px-3.5 py-1.5 transition cursor-pointer flex items-center justify-center ${presetStyle.orderBtn}`}
                      >
                        প্রি-অর্ডার করুন
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic "Show More Products" / "Collapse Products" Button (Positioned as marked in 2nd image) */}
        {displayList.length > 8 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleToggleProducts}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-green-600 to-emerald-700 hover:from-amber-600 hover:to-emerald-800 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
            >
              <span>{hasMore ? showMoreBtnText : collapseBtnText}</span>
              {hasMore ? (
                <FaChevronDown className="text-xs" />
              ) : (
                <FaChevronUp className="text-xs" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
