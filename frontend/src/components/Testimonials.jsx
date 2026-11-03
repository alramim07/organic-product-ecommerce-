import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { useApp } from "../context/AppContext";

export default function Testimonials() {
  const { settings } = useApp();

  const title = settings?.testimonialSectionTitle || "গ্রাহকদের মতামত";
  const icon = settings?.testimonialSectionIcon || "🍃";
  const displayMode = settings?.testimonialDisplayMode || "custom"; // "custom" | "real"
  const autoPlay = settings?.testimonialAutoPlay ?? true;
  const intervalSec = Number(settings?.testimonialAutoPlayInterval) || 4;

  const defaultReviews = [
    {
      name: "মিজানুর রহমান",
      location: "ঢাকা",
      comment:
        "পণ্যের গুণগত মান অসাধারণ। মিষ্টি স্বাদ ও সতেজতা সত্যিই অতুলনীয়। ডেলিভারি সময়মত পেয়েছি।",
      rating: 5,
      avatar: "😊",
    },
    {
      name: "নুসরাত জাহান",
      location: "চট্টগ্রাম",
      comment:
        "প্রি-অর্ডার করেছিলাম। একদম ফ্রেশ এবং কেমিক্যাল ফ্রি। সবার কাছে সুপারিশ করব।",
      rating: 5,
      avatar: "😊",
    },
    {
      name: "রফিকুল ইসলাম",
      location: "রাজশাহী",
      comment:
        "অর্ডার করা পণ্য খুব চমৎকার ছিল। প্যাকেজিং ও সার্ভিস দারুণ। ধন্যবাদ সবাইকে।",
      rating: 4,
      avatar: "😊",
    },
  ];

  const items =
    Array.isArray(settings?.testimonialItems) && settings.testimonialItems.length > 0
      ? settings.testimonialItems
      : defaultReviews;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerPage);

  // Auto carousel effect
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= itemsPerPage) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, intervalSec * 1000);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, intervalSec, items.length, itemsPerPage, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white/60 via-amber-50/20 to-white/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center justify-center gap-2.5">
            {icon?.startsWith("data:") ||
            icon?.startsWith("http") ||
            icon?.startsWith("/") ? (
              <img
                src={icon}
                alt=""
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain inline-block shrink-0"
              />
            ) : (
              <span className="text-3xl sm:text-4xl">{icon}</span>
            )}
            <h2 className="text-3xl sm:text-4xl font-black text-green-900 tracking-tight">
              {title}
            </h2>
          </div>

          {displayMode === "real" && (
            <div className="pt-1 flex items-center justify-center gap-1.5 text-xs text-green-700 font-bold">
              <FaCheckCircle className="text-green-600" />
              <span>১০০% ভেরিফাইড ক্রেতাদের অভিজ্ঞতা ও সরাসরি রিভিউ</span>
            </div>
          )}
        </div>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slider Viewport */}
          <div className="overflow-hidden py-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {items.map((rev, index) => {
                const isImageAvatar =
                  rev.avatar &&
                  (rev.avatar.startsWith("data:") ||
                    rev.avatar.startsWith("http") ||
                    rev.avatar.startsWith("/"));

                return (
                  <div
                    key={index}
                    className="shrink-0 px-3"
                    style={{ width: `${100 / itemsPerPage}%` }}
                  >
                    <div className="h-full rounded-2xl bg-yellow-50/90 border-l-[6px] border-emerald-500 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-yellow-200/60">
                      {/* Author Info */}
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-emerald-200/80 flex items-center justify-center text-xl shadow-inner shrink-0 overflow-hidden">
                            {isImageAvatar ? (
                              <img
                                src={rev.avatar}
                                alt={rev.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{rev.avatar || "😊"}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-extrabold text-gray-900 text-base truncate">
                              {rev.name}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium truncate">
                              {rev.location || "বাংলাদেশ"}
                            </p>
                          </div>
                        </div>

                        {/* Comment Quote */}
                        <p className="py-4 text-gray-700 text-sm leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      {/* Stars Rating */}
                      <div className="flex items-center gap-1 text-amber-400 pt-2 border-t border-yellow-200/60">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < (Number(rev.rating) || 5)
                                ? "text-amber-400"
                                : "text-gray-300"
                            }
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows (Visible if items exceed itemsPerPage) */}
          {items.length > itemsPerPage && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Review"
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-green-950 shadow-lg border border-gray-200 flex items-center justify-center hover:bg-green-700 hover:text-white transition cursor-pointer z-10"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Review"
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-green-950 shadow-lg border border-gray-200 flex items-center justify-center hover:bg-green-700 hover:text-white transition cursor-pointer z-10"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {items.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {[...Array(maxIndex + 1)].map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx
                      ? "w-8 bg-green-700 shadow"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
