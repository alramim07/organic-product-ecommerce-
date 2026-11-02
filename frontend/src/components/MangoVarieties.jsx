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
                {/* PRESET 1: CLASSIC MANGO (Warm Amber Inset Card) */}
                {cardPreset === "classic" && (
                  <div className="flex flex-col h-full rounded-3xl bg-amber-50/50 border-2 border-amber-300 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                    {/* Inset Image Box */}
                    <div className="p-3 pb-0">
                      <Link
                        to={`/product/${productId}`}
                        className="relative w-full h-52 shrink-0 bg-amber-100/50 rounded-2xl overflow-hidden group block shadow-inner"
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
                        <span className="absolute top-2.5 left-2.5 bg-yellow-400 text-green-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                          🥭 বাগান ফ্রেশ
                        </span>
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white/95 text-green-950 font-bold text-xs py-1.5 px-3.5 rounded-full shadow flex items-center gap-1.5">
                            <FaEye /> বিস্তারিত দেখুন
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between min-h-[190px]">
                      <div>
                        <Link to={`/product/${productId}`} className="block group/title" title={mango.name_bn || mango.name}>
                          <h3 className="text-lg sm:text-xl font-black text-green-950 group-hover/title:text-green-700 truncate line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap leading-tight">
                            {mango.name_bn || mango.name}
                          </h3>
                        </Link>
                        <div className="mt-2">
                          <span className="inline-flex px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 font-black text-base border border-amber-200 shadow-sm">
                            {priceText}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2.5 flex items-start gap-1.5 min-h-[36px] max-h-[36px] overflow-hidden leading-snug line-clamp-2 text-ellipsis">
                          <FaCalendarAlt className="mt-0.5 text-amber-700 shrink-0 text-xs" />
                          <span className="line-clamp-2">{scheduleText}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-amber-200/60">
                        <Link to={`/product/${productId}`} className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1">
                          <FaEye className="text-[11px]" /> <span>বিস্তারিত</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handlePreOrder(mango)}
                          className="text-xs px-4 py-2 bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700 text-white font-black rounded-full shadow-md transition cursor-pointer"
                        >
                          প্রি-অর্ডার করুন
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRESET 2: MODERN MINIMAL (Clean White Retail Flush Image) */}
                {cardPreset === "modern" && (
                  <div className="flex flex-col h-full rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                    {/* Full-bleed Top Image */}
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
                      <span className="absolute top-2.5 right-2.5 bg-slate-900/85 backdrop-blur text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                        {mango.stock_status || "ইন স্টক"}
                      </span>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 text-slate-900 font-bold text-xs py-1 px-3 rounded shadow flex items-center gap-1">
                          <FaEye /> বিস্তারিত
                        </span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between min-h-[190px] bg-white">
                      <div>
                        <Link to={`/product/${productId}`} className="block group/title" title={mango.name_bn || mango.name}>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover/title:text-emerald-700 truncate line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap leading-tight">
                            {mango.name_bn || mango.name}
                          </h3>
                        </Link>
                        <p className="text-xl font-extrabold text-slate-950 mt-1 tracking-tight">
                          {priceText}
                        </p>
                        <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5 min-h-[36px] max-h-[36px] overflow-hidden leading-snug line-clamp-2 text-ellipsis">
                          <FaCalendarAlt className="mt-0.5 text-slate-400 shrink-0 text-xs" />
                          <span className="line-clamp-2">{scheduleText}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                        <Link to={`/product/${productId}`} className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1">
                          <FaEye className="text-[11px]" /> <span>দেখুন</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handlePreOrder(mango)}
                          className="text-xs px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition cursor-pointer shadow-none"
                        >
                          প্রি-অর্ডার
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRESET 3: ROYAL DARK LUXURY (Black & Radiant Gold) */}
                {cardPreset === "elevated" && (
                  <div className="flex flex-col h-full rounded-2xl bg-gradient-to-b from-gray-900 via-gray-900 to-slate-950 border border-amber-500/50 hover:border-amber-400 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden text-white">
                    {/* Top Gold Accent Rim & Image */}
                    <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
                    <Link
                      to={`/product/${productId}`}
                      className="relative w-full h-52 shrink-0 bg-gray-950 overflow-hidden group block"
                    >
                      <img
                        src={mango.image || "/assets/mangoes/m1.jpg"}
                        alt={mango.name_bn || mango.name || "Product"}
                        className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/mangoes/m1.jpg";
                        }}
                      />
                      <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                        👑 প্রিমিয়াম
                      </span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-gray-950 text-amber-300 border border-amber-400 font-bold text-xs py-1.5 px-3.5 rounded-full shadow flex items-center gap-1.5">
                          <FaEye /> বিস্তারিত দেখুন
                        </span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between min-h-[190px]">
                      <div>
                        <Link to={`/product/${productId}`} className="block group/title" title={mango.name_bn || mango.name}>
                          <h3 className="text-lg sm:text-xl font-black text-white group-hover/title:text-amber-300 truncate line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap leading-tight transition">
                            {mango.name_bn || mango.name}
                          </h3>
                        </Link>
                        <p className="text-xl font-black text-yellow-400 mt-1.5 drop-shadow">
                          {priceText}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 flex items-start gap-1.5 min-h-[36px] max-h-[36px] overflow-hidden leading-snug line-clamp-2 text-ellipsis">
                          <FaCalendarAlt className="mt-0.5 text-amber-400 shrink-0 text-xs" />
                          <span className="line-clamp-2">{scheduleText}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-800">
                        <Link to={`/product/${productId}`} className="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition">
                          <FaEye className="text-[11px]" /> <span>বিস্তারিত</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handlePreOrder(mango)}
                          className="text-xs px-4 py-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-gray-950 font-black rounded-xl shadow-lg transition cursor-pointer"
                        >
                          প্রি-অর্ডার করুন
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRESET 4: ECO ORGANIC (Natural Sage Pastel with Dashed Forest Border) */}
                {cardPreset === "bordered" && (
                  <div className="flex flex-col h-full rounded-[28px] bg-emerald-50/70 border-2 border-dashed border-emerald-400 hover:border-emerald-600 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                    {/* Eco Frame with Image */}
                    <div className="p-3 pb-0">
                      <Link
                        to={`/product/${productId}`}
                        className="relative w-full h-52 shrink-0 bg-emerald-100/60 rounded-[22px] overflow-hidden group block"
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
                        <span className="absolute top-2.5 left-2.5 bg-emerald-700 text-white font-black text-[10px] px-3 py-0.5 rounded-full shadow flex items-center gap-1">
                          🌿 ১০০% অর্গানিক
                        </span>
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white/95 text-emerald-900 font-bold text-xs py-1.5 px-3.5 rounded-full shadow flex items-center gap-1.5">
                            <FaEye /> বিস্তারিত
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between min-h-[190px]">
                      <div>
                        <Link to={`/product/${productId}`} className="block group/title" title={mango.name_bn || mango.name}>
                          <h3 className="text-lg sm:text-xl font-black text-emerald-950 group-hover/title:text-emerald-700 truncate line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap leading-tight">
                            {mango.name_bn || mango.name}
                          </h3>
                        </Link>
                        <div className="mt-2">
                          <span className="inline-flex px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-black text-base border border-emerald-300 shadow-sm">
                            {priceText}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800 mt-2.5 flex items-start gap-1.5 min-h-[36px] max-h-[36px] overflow-hidden leading-snug line-clamp-2 text-ellipsis">
                          <FaCalendarAlt className="mt-0.5 text-emerald-600 shrink-0 text-xs" />
                          <span className="line-clamp-2">{scheduleText}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-emerald-200/80">
                        <Link to={`/product/${productId}`} className="text-xs font-bold text-emerald-700 hover:text-emerald-950 flex items-center gap-1">
                          <FaEye className="text-[11px]" /> <span>বিস্তারিত</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handlePreOrder(mango)}
                          className="text-xs px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-2xl shadow-md border-b-4 border-emerald-950 active:border-b-0 transition cursor-pointer"
                        >
                          প্রি-অর্ডার করুন
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
