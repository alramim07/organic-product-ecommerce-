import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaCalendarAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMinus,
  FaPlus,
  FaChevronRight,
  FaBoxOpen,
  FaHeart,
  FaShareAlt,
  FaAward,
  FaEye,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { productsData } from "../data/products";
import { useApp } from "../context/AppContext";
import OrderInvoiceModal from "../components/OrderInvoiceModal";

export default function SingleProductPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, addBooking, settings } = useApp();

  // Detect Live Preview Mode (WordPress-style instant live preview)
  const isPreviewMode = searchParams.get("preview") === "true" || id === "preview";
  let previewData = null;
  if (isPreviewMode) {
    try {
      const stored = sessionStorage.getItem("live_product_preview");
      if (stored) previewData = JSON.parse(stored);
    } catch (e) {
      console.warn("Could not parse preview data", e);
    }
  }

  // Find product by preview data, slug, or ID from dynamic products
  const product =
    previewData ||
    products.find((p) => p.slug && p.slug.trim().toLowerCase() === (id || "").trim().toLowerCase()) ||
    products.find((p) => String(p._id) === String(id) || String(p.id) === String(id)) ||
    products.find((p) => p.id === parseInt(id || "3")) ||
    products[0] ||
    productsData[2];

  // Stock status helpers
  const isPreOrder = Boolean(
    product?.stock_status?.includes("প্রি-অর্ডার") ||
    product?.stock_status?.toLowerCase().includes("pre-order")
  );
  const isOutOfStock = Boolean(
    product?.stock_status === "স্টক শেষ" ||
    product?.stock_status?.toLowerCase().includes("out of stock")
  );

  // Component states
  const [selectedImage, setSelectedImage] = useState(product?.image || "/assets/mangoes/m3.jpg");
  const [selectedPackage, setSelectedPackage] = useState(
    product?.packages ? product.packages[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState("dhaka"); // 'dhaka' or 'outside'
  const [activeTab, setActiveTab] = useState("specs");

  // Booking form states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Downloadable & Printable Invoice Modal state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Scroll to top, set title/meta, and reset state when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (product) {
      setSelectedImage(product.image);
      setSelectedPackage(product.packages ? product.packages[0] : null);
      setQuantity(1);

      // Dynamic SEO Title & Description
      const pageTitle = product.meta_title
        ? `${product.meta_title} | ${settings?.siteName || "আমওয়ালা"}`
        : `${product.name_bn || "প্রিমিয়াম কোয়ালিটি আম"} | ${settings?.siteName || "আমওয়ালা"}`;
      document.title = pageTitle;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content =
        product.meta_description ||
        product.subtitle_bn ||
        "আমওয়ালা থেকে সরাসরি রাজশাহীর সেরা বাগানের কেমিক্যালমুক্ত মিষ্টি তাজা আম অর্ডার করুন।";
    }
  }, [id, product, settings?.siteName]);

  // Calculations from dynamic settings
  const deliveryCharge =
    deliveryArea === "dhaka"
      ? settings?.deliveryFeeDhaka || 120
      : settings?.deliveryFeeOutside || 150;
  const packagePrice = selectedPackage
    ? selectedPackage.price
    : (product?.price_per_kg || 220) * 5;
  const subtotal = packagePrice * quantity;
  const totalAmount = subtotal + deliveryCharge;

  // Handle WhatsApp Order
  const handleWhatsAppOrder = () => {
    const message = `হ্যালো আমওয়ালা ভাইয়া! আমি "${product.name_bn}" এর (${selectedPackage?.label || "৫ কেজি"} x ${quantity} টি) অর্ডার করতে চাই। মোট আনুমানিক মূল্য: ৳${totalAmount}। বিস্তারিত জানাবেন প্লিজ।`;
    const waNum = settings?.whatsappNumber || "8801749775030";
    const url = `https://wa.me/${waNum}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Handle Instant Booking submission with OrderInvoiceModal
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (isOutOfStock) {
      Swal.fire({
        icon: "error",
        title: "স্টক শেষ",
        text: "দুঃখিত, এই পণ্যটির স্টক বর্তমানে শেষ হয়ে গেছে।",
      });
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      Swal.fire({
        icon: "warning",
        title: "তথ্য অসম্পূর্ণ",
        text: "দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা প্রদান করুন।",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        items: [
          {
            productId: product._id || product.id,
            productName: product.name_bn,
            unit: product.unit || "কেজি",
            packageLabel: selectedPackage?.label || "৫ কেজি",
            quantity: quantity,
            price: packagePrice,
            total: subtotal,
          },
        ],
        mangoId: product._id || product.id,
        mangoName: product.name_bn,
        packageLabel: `${selectedPackage?.label || "৫ কেজি"} (${quantity} টি)`,
        packageKg: (selectedPackage?.kg || 5) * quantity,
        quantity,
        deliveryArea,
        deliveryCharge,
        subtotal,
        totalAmount,
        deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
        paymentMethod,
        customerNote: customerNote.trim() || (isPreOrder ? "প্রি-অর্ডার পণ্য" : "রেগুলার অর্ডার"),
      };

      const savedBooking = await addBooking(orderPayload);
      setCreatedOrder(savedBooking || { ...orderPayload, id: `BK-${Date.now().toString().slice(-4)}` });
      setShowInvoiceModal(true);

      // Reset form
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setCustomerNote("");
    } catch (err) {
      console.error("Order submit error:", err);
      Swal.fire({
        icon: "error",
        title: "অর্ডার ব্যর্থ হয়েছে",
        text: "দুঃখিত, অর্ডারটি সম্পন্ন করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToCheckout = () => {
    const el = document.getElementById("quick-checkout");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Recommended Products Logic:
  // ONLY real published products from the store/database (no fake/demo items)
  // 1. Same category products first
  // 2. If same category is finished/less, show products from other categories in the store
  const currentId = String(product._id || product.id || "");
  const currentSlug = String(product.slug || "");

  const dbPublishedOthers = (products || []).filter((p) => {
    const pId = String(p._id || p.id || "");
    const pSlug = String(p.slug || "");
    if (pId === currentId || (currentSlug && pSlug === currentSlug)) return false;
    if (p.publication_status === "draft") return false;
    if (
      p.publication_status === "scheduled" &&
      p.scheduled_at &&
      new Date(p.scheduled_at) > new Date()
    ) {
      return false;
    }
    return true;
  });

  const sameCategoryFromDb = dbPublishedOthers.filter(
    (p) => p.category && product.category && p.category.trim() === product.category.trim()
  );
  const otherCategoryFromDb = dbPublishedOthers.filter(
    (p) => !p.category || !product.category || p.category.trim() !== product.category.trim()
  );

  const recommendedProducts = [...sameCategoryFromDb, ...otherCategoryFromDb].slice(0, 4);

  return (
    <div className="bg-gradient-to-b from-amber-50/50 via-white to-green-50/30 pt-24 pb-20">
      {/* WordPress-style Live Preview Banner */}
      {isPreviewMode && (
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-2.5 px-4 shadow-xl border-b border-blue-400/30 sticky top-16 z-40 mb-6 rounded-2xl max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3 text-xs flex-wrap">
            <span className="flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping inline-block" />
              <span>🔍 <strong>লাইভ প্রিভিউ মোড (Live Preview Mode):</strong> অ্যাডমিন প্যানেলে করা রিয়েল-টাইম পরিবর্তনগুলো এখানে দেখতে পাচ্ছেন।</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                Status: {product.publication_status ? product.publication_status.toUpperCase() : "DRAFT"}
              </span>
              <button
                type="button"
                onClick={() => window.close()}
                className="text-[11px] bg-white text-blue-900 hover:bg-yellow-300 px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-green-700 transition flex items-center gap-1">
            <span>🏠 হোম</span>
          </Link>
          <FaChevronRight className="text-xs text-gray-400" />
          <Link to="/#varieties" className="hover:text-green-700 transition">
            আমের জাত ও তালিকা
          </Link>
          <FaChevronRight className="text-xs text-gray-400" />
          <span className="text-green-800 font-semibold">{product.name_bn}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-yellow-100">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Featured Image with Zoom & Badge */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-green-50 border border-yellow-200 shadow-md group">
              <img
                src={selectedImage}
                alt={product.name_bn}
                className="w-full h-80 sm:h-96 md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/mangoes/m1.jpg";
                }}
              />
              {/* Badges on Main Image (4 Dynamic Positions: Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => {
                const isLeft = pos.includes("left");
                const isTop = pos.includes("top");
                const badges = (
                  product.image_badges && product.image_badges.length > 0
                    ? product.image_badges.filter((b) => {
                        const bPos =
                          b.position ||
                          (b.side === "right" ? "top-right" : "top-left");
                        return bPos === pos;
                      })
                    : pos === "top-left"
                    ? [
                        { text: "১০০% কেমিক্যালমুক্ত", type: "normal", color: "green" },
                        ...(product.discount_percent
                          ? [
                              {
                                text: `${product.discount_percent}% ছাড়`,
                                type: "discount",
                                color: "red",
                              },
                            ]
                          : []),
                      ]
                    : pos === "top-right"
                    ? [{ text: "প্রিমিয়াম গ্রেড", type: "normal", color: "amber" }]
                    : []
                );

                if (badges.length === 0) return null;

                return (
                  <div
                    key={pos}
                    className={`absolute ${isTop ? "top-4" : "bottom-4"} ${
                      isLeft ? "left-4 items-start" : "right-4 items-end"
                    } flex flex-col gap-2 z-10 pointer-events-none`}
                  >
                    {badges.map((b, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: b.fontSize ? `${b.fontSize}px` : undefined,
                          padding: b.fontSize
                            ? `${Math.max(2, Math.round(b.fontSize * 0.3))}px ${Math.round(
                                b.fontSize * 0.75
                              )}px`
                            : undefined,
                        }}
                        className={`px-3 py-1 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 pointer-events-auto ${
                          b.type === "discount" || b.color === "red"
                            ? "bg-red-500/95"
                            : b.color === "amber"
                            ? "bg-amber-500/95"
                            : b.color === "blue"
                            ? "bg-blue-600/95"
                            : "bg-green-600/95"
                        }`}
                      >
                        {b.type === "discount" ? null : (
                          <FaLeaf className="text-yellow-300" />
                        )}
                        {b.text}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Thumbnail Strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? "border-green-600 ring-2 ring-green-300 scale-105 shadow-md"
                        : "border-gray-200 hover:border-yellow-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/mangoes/m1.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges under gallery */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
              <div className="p-2.5 bg-green-50/70 rounded-xl border border-green-100">
                <FaShieldAlt className="text-green-600 text-xl mx-auto mb-1" />
                <p className="text-[11px] font-bold text-green-900">বিষমুক্ত গ্যারান্টি</p>
                <p className="text-[9px] text-gray-500">কার্বাইড বা ফরমালিন নেই</p>
              </div>
              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-100">
                <FaTruck className="text-amber-600 text-xl mx-auto mb-1" />
                <p className="text-[11px] font-bold text-amber-900">দ্রুত ডেলিভারি</p>
                <p className="text-[9px] text-gray-500">বাগান থেকে ২৪-৪৮ ঘণ্টায়</p>
              </div>
              <div className="p-2.5 bg-yellow-50/70 rounded-xl border border-yellow-100">
                <FaBoxOpen className="text-yellow-600 text-xl mx-auto mb-1" />
                <p className="text-[11px] font-bold text-yellow-900">নিরাপদ প্যাকিং</p>
                <p className="text-[9px] text-gray-500">ড্যামেজ রিপ্লেসমেন্ট</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Origin & Stock Tag */}
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-green-600" /> {product.origin || "রাজশাহী"}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <FaCheckCircle className="text-amber-600" /> {product.stock_status || "ইন স্টক"}
                  {product.stock_status === "সীমিত স্টক" && product.stock_quantity && (
                    <span className="font-bold text-red-700 ml-1">
                      (বাকি: {product.stock_quantity} {product.unit || "কেজি"})
                    </span>
                  )}
                </span>
                {product.harvest_schedule && (
                  <span className="text-xs text-gray-500 ml-auto flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                    <FaCalendarAlt className="text-green-700" /> {product.harvest_schedule}
                  </span>
                )}
              </div>

              {/* Title & English Subtitle */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 leading-tight">
                {product.name_bn}
              </h1>
              <p className="text-sm font-medium text-amber-700 mt-1">
                {product.name_en} • <span className="text-gray-600">{product.subtitle_bn}</span>
              </p>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-gray-100">
                <div className="flex items-center text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-500">
                  ({product.total_reviews} টি ভেরিফাইড গ্রাহক রিভিউ)
                </span>
              </div>

              {/* Price Block */}
              <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-yellow-200 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-xs text-gray-500 font-medium block">প্রতি কেজি মূল্য</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-green-800">
                      ৳ {product.price_per_kg}
                    </span>
                    {product.regular_price_per_kg && (
                      <span className="text-lg text-gray-400 line-through font-semibold">
                        ৳ {product.regular_price_per_kg}
                      </span>
                    )}
                    <span className="text-xs text-green-700 font-bold bg-green-100 px-2.5 py-0.5 rounded-full">
                      প্রতি কেজিতে ৳{product.regular_price_per_kg - product.price_per_kg} সাশ্রয়
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">সর্বনিম্ন অর্ডার</span>
                  <span className="text-sm font-bold text-amber-900 block">
                    {product.min_order_kg || 5} কেজি বক্স
                  </span>
                </div>
              </div>

              {/* Regional Schedule Info Banner (Optional & Fully Configurable) */}
              {product.show_region_schedule !== false && product.regionDates && (
                <div className="mt-4 p-3.5 bg-green-50/80 rounded-2xl border border-green-200 text-xs text-green-900 flex items-start gap-2.5 shadow-sm">
                  <FaCalendarAlt className="mt-0.5 text-green-700 shrink-0 text-sm" />
                  <div>
                    <strong className="font-bold">
                      {product.region_schedule_title || "আঞ্চলিক পাকা ও ডেলিভারি শিডিউল: "}
                    </strong>
                    <span className="text-gray-800 ml-1">{product.regionDates}</span>
                  </div>
                </div>
              )}

              {/* Package Selection */}
              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-800 mb-2.5">
                  📦 প্যাকেজের সাইজ নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.packages?.map((pkg) => {
                    const isSelected = selectedPackage?.kg === pkg.kg;
                    return (
                      <button
                        key={pkg.kg}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3.5 rounded-2xl text-left border-2 transition-all relative cursor-pointer ${
                          isSelected
                            ? "border-green-600 bg-green-50/60 shadow-md ring-2 ring-green-200"
                            : "border-gray-200 hover:border-yellow-400 bg-white"
                        }`}
                      >
                        {pkg.badge && (
                          <span
                            className={`absolute -top-2.5 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                              isSelected ? "bg-green-600" : "bg-amber-500"
                            }`}
                          >
                            {pkg.badge}
                          </span>
                        )}
                        <p className="font-bold text-gray-900 text-sm">{pkg.label}</p>
                        <p className="text-green-800 font-black text-lg mt-0.5">
                          ৳ {pkg.price}
                        </p>
                        <p className="text-[11px] text-gray-400 line-through">
                          ৳ {pkg.originalPrice}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Counter & Delivery Area Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    বক্স সংখ্যা (Quantity):
                  </label>
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-gray-50 w-fit">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2.5 text-gray-600 hover:text-green-700 hover:bg-white rounded-l-lg transition font-bold"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="px-5 py-2 font-black text-gray-900 text-base">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2.5 text-gray-600 hover:text-green-700 hover:bg-white rounded-r-lg transition font-bold"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                {/* Delivery Area */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    ডেলিভারি লোকেশন:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea("dhaka")}
                      className={`px-3 py-2 text-xs rounded-xl border font-bold transition ${
                        deliveryArea === "dhaka"
                          ? "bg-green-600 text-white border-green-600 shadow"
                          : "bg-white text-gray-700 border-gray-200 hover:border-yellow-400"
                      }`}
                    >
                      ঢাকা শহর (৳১২০)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryArea("outside")}
                      className={`px-3 py-2 text-xs rounded-xl border font-bold transition ${
                        deliveryArea === "outside"
                          ? "bg-green-600 text-white border-green-600 shadow"
                          : "bg-white text-gray-700 border-gray-200 hover:border-yellow-400"
                      }`}
                    >
                      ঢাকার বাইরে (৳১৫০)
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Summary Strip */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500">
                    {selectedPackage?.label || "৫ কেজি"} x {quantity} টি + ডেলিভারি চার্জ (৳{deliveryCharge})
                  </span>
                  <p className="text-xs font-semibold text-green-700">
                    ক্যাশ অন ডেলিভারিতে সম্পূর্ণ বিল পরিশোধযোগ্য
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 font-bold block">সর্বমোট বিল</span>
                  <span className="text-2xl font-black text-green-800">৳ {totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={scrollToCheckout}
                  disabled={isOutOfStock}
                  className={`w-full py-3.5 px-6 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-green-600 hover:from-yellow-600 hover:to-green-700 text-white hover:shadow-xl transform active:scale-95 cursor-pointer"
                  }`}
                >
                  {isOutOfStock
                    ? "স্টক শেষ (Out of Stock)"
                    : isPreOrder
                    ? "⚡ প্রি-অর্ডার সম্পূর্ণ করুন"
                    : "⚡ এখনই অর্ডার করুন"}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-2xl font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" /> হোয়াটসঅ্যাপে অর্ডার
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 px-1">
                <a
                  href="tel:01749775030"
                  className="hover:text-green-800 font-bold flex items-center gap-1.5"
                >
                  <FaPhoneAlt className="text-green-600" /> হটলাইন: ০১৭৪৯-৭৭৫০৩০
                </a>
                <span className="text-green-700 font-semibold">
                  ✓ বাগান থেকে সরাসরি বাছাইকৃত ফ্রেশ আম
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details, Specs, Packaging, Reviews */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-yellow-100">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-2 sm:gap-6 pb-2">
            {[
              {
                id: "specs",
                icon: product.tab1_icon,
                title: product.tab1_title || "বৈশিষ্ট্য ও স্বাদ",
              },
              {
                id: "packaging",
                icon: product.tab2_icon,
                title: product.tab2_title || "প্যাকেজিং ও ডেলিভারি",
              },
              {
                id: "storage",
                icon: product.tab3_icon,
                title: product.tab3_title || "পাকা ও সংরক্ষণ নিয়ম",
              },
              {
                id: "reviews",
                icon: "⭐",
                title: `গ্রাহক রিভিউ (${product.total_reviews || 25})`,
              },
            ].map((tab) => {
              const isImg =
                tab.icon &&
                (tab.icon.startsWith("data:") ||
                  tab.icon.startsWith("/") ||
                  tab.icon.startsWith("http"));

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 font-bold text-sm sm:text-base border-b-4 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "border-green-600 text-green-900 bg-green-50/50 rounded-t-xl"
                      : "border-transparent text-gray-500 hover:text-green-800"
                  }`}
                >
                  {tab.icon &&
                    (isImg ? (
                      <img
                        src={tab.icon}
                        alt=""
                        className="w-5 h-5 object-contain inline-block rounded"
                      />
                    ) : (
                      <span>{tab.icon}</span>
                    ))}
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="pt-8">
            {/* Tab 1: Specs & Overview */}
            {activeTab === "specs" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-amber-50/50 via-white to-green-50/30 p-5 sm:p-7 rounded-3xl border border-yellow-200/70 shadow-sm space-y-3 overflow-hidden break-words [overflow-wrap:anywhere]">
                  <h3 className="text-xl font-black text-green-900 break-words">
                    {product.description_title || `${product.name_bn || "পণ্য"} সম্পর্কে বিস্তারিত`}
                  </h3>
                  {product.description && /<[a-z][\s\S]*>/i.test(product.description) ? (
                    <div
                      className="prose prose-green max-w-none text-gray-700 leading-relaxed text-base sm:text-lg break-words overflow-hidden [overflow-wrap:anywhere]"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line break-words overflow-hidden [overflow-wrap:anywhere]">
                      {product.description || "স্বাদ ও পুষ্টিগুণে ভরপুর আসল ও শতভাগ বিষমুক্ত ফল।"}
                    </p>
                  )}
                </div>

                {/* Taste Meter & Specs Grid (Flexible & Centered in Middle) */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4 text-center sm:text-left">
                    স্বাদ ও কোয়ালিটি প্যারামিটার
                  </h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {product.taste_specs?.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex-1 min-w-[200px] max-w-[260px] p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-yellow-200 text-center shadow-sm"
                      >
                        <p className="text-xs text-gray-500 font-semibold">{spec.label}</p>
                        <p className="text-base font-extrabold text-green-900 mt-1">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {product.highlights && product.highlights.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">
                      কেন এই পণ্যটি সেরা?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <FaCheckCircle className="text-green-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Packaging & Shipping */}
            {activeTab === "packaging" && (
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="bg-gradient-to-br from-amber-50/50 via-white to-green-50/30 p-5 sm:p-7 rounded-3xl border border-yellow-200/70 shadow-sm space-y-3 overflow-hidden break-words [overflow-wrap:anywhere]">
                  <h3 className="text-xl font-black text-green-900 break-words">
                    {product.tab2_title || "আমাদের বিশেষ ফ্রেশ ফ্রুট প্যাকেজিং প্রক্রিয়া"}
                  </h3>
                  <p className="whitespace-pre-line break-words overflow-hidden [overflow-wrap:anywhere]">
                    {product.packaging_description ||
                      "আম অত্যন্ত সংবেদনশীল ফল। পরিবহনের ঝাঁকুনিতে যেন ফলের কোনো ক্ষতি না হয়, সেজন্য আমরা আন্তর্জাতিক মানের ৫-স্তরবিশিষ্ট (5-ply) ভেন্টিলেটেড হার্ডবোর্ড কার্টন ও ক্রেট ব্যবহার করি।"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {(product.packaging_steps && product.packaging_steps.length > 0
                    ? product.packaging_steps
                    : [
                        {
                          step: "০১",
                          title: "বাগান থেকে গ্রেডিং",
                          description:
                            "গাছ থেকে পাড়ার পর প্রতিটি আম আলাদাভাবে পরিদর্শন করে দাগহীন ও পুষ্ট আমগুলো বাছাই করা হয়।",
                        },
                        {
                          step: "০২",
                          title: "ফোম ও পেপার কুশনিং",
                          description:
                            "প্রতিটি আমের মাঝে ফুড-গ্রেড নরম কাগজ ও কুশনিং ব্যবহার করা হয় যেন একে অপরের সাথে ঘষা না লাগে।",
                        },
                        {
                          step: "০৩",
                          title: "এক্সপ্রেস হোম ডেলিভারি",
                          description:
                            "প্যাকিং শেষে শীতাতপ নিয়ন্ত্রিত এক্সপ্রেস কুরিয়ারে সরাসরি গ্রাহকের দরজায় পৌঁছে দেওয়া হয়।",
                        },
                      ]
                  ).map((st, i) => (
                    <div
                      key={i}
                      className={`p-5 rounded-2xl border ${
                        i === 0
                          ? "bg-amber-50 border-amber-200"
                          : i === 1
                          ? "bg-green-50 border-green-200"
                          : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      <span className="text-2xl font-black text-amber-700 mb-2 block">
                        {st.step || `০${i + 1}`}
                      </span>
                      <h5 className="font-bold text-gray-900 mb-1">{st.title}</h5>
                      <p className="text-xs text-gray-600">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Storage Tips */}
            {activeTab === "storage" && (
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-green-900">
                  {product.tab3_title || "আম পাকা ও প্রাকৃতিক সংরক্ষণ পদ্ধতি"}
                </h3>
                <div className="space-y-4">
                  {(product.storage_steps && product.storage_steps.length > 0
                    ? product.storage_steps
                    : [
                        {
                          step: "১",
                          title: "১. বক্স খোলার নিয়ম:",
                          description:
                            "বক্স পাওয়ার পর পরই ওপরের টেপ কেটে মুখ খুলে দিন। আমগুলো বের করে মেঝেতে কাগজ বিছিয়ে স্বাভাবিক আলো-বাতাসে ছড়িয়ে রাখুন।",
                        },
                        {
                          step: "২",
                          title: "২. ফ্রিজে রাখার নিয়ম:",
                          description:
                            "আম পুরোপুরি পাকার আগে কখনই ফ্রিজে রাখবেন না। মিষ্টি সুবাস বের হলে এবং খোসা নরম হলে খাওয়ার ২-৩ ঘণ্টা আগে ফ্রিজে রেখে ঠান্ডা করে খেলে সর্বোচ্চ স্বাদ পাওয়া যায়।",
                        },
                        {
                          step: "৩",
                          title: "৩. রাসায়নিক মুক্ততার লক্ষণ:",
                          description:
                            "প্রাকৃতিক আম বোঁটার দিক থেকে পাকা শুরু করে এবং মুখে দিলে আসল গ্রামীণ মিষ্টি ফ্লেভার পাওয়া যায়। কোনো বিষাক্ত ঝাঁঝালো গন্ধ থাকে না।",
                        },
                      ]
                  ).map((st, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border-l-4 ${
                        i === 0
                          ? "bg-yellow-50 border-yellow-500"
                          : i === 1
                          ? "bg-green-50 border-green-500"
                          : "bg-amber-50 border-amber-500"
                      }`}
                    >
                      <h5 className="font-bold text-gray-900">{st.title}</h5>
                      <p className="text-sm text-gray-700 mt-1">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-green-900">
                      গ্রাহকদের মতামত ও রেটিং
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.total_reviews} টি ভেরিফাইড অর্ডার থেকে প্রাপ্ত গড় রেটিং
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-2xl border border-yellow-300">
                    <span className="text-3xl font-black text-amber-800">{product.rating}</span>
                    <div className="text-yellow-400 text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-600 block">৫ এর মধ্যে রেটিং</span>
                    </div>
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      name: "আহমেদ তানভীর",
                      location: "উত্তরা, ঢাকা",
                      rating: 5,
                      date: "৩ দিন আগে",
                      comment:
                        "গত বছরও আমওয়ালা ভাইয়া থেকে হিমসাগর নিয়েছিলাম। এবার গুটি ও গোপালভোগের প্রি-অর্ডার করলাম। তাদের প্যাকিং এক কথায় অসাধারণ, কোনো আম নষ্ট হয়নি!",
                    },
                    {
                      name: "ফারহানা সুলতানা",
                      location: "ধানমন্ডি, ঢাকা",
                      rating: 5,
                      date: "১ সপ্তাহ আগে",
                      comment:
                        "সত্যিই একদম ফরমালিনমুক্ত মিষ্টি আম। বাচ্চারা খুব পছন্দ করেছে। আমের সুবাসে পুরো ঘর ভরে গিয়েছিল। ধন্যবাদ সবাইকে!",
                    },
                    {
                      name: "ইঞ্জি. মোস্তফা কামাল",
                      location: "জিইসি, চট্টগ্রাম",
                      rating: 5,
                      date: "২ সপ্তাহ আগে",
                      comment:
                        "চট্টগ্রামে ডেলিভারি খুব দ্রুত পেয়েছি। আমগুলো সাইজে বড় ও একদমি তাজা ছিল। এই সিজনে অন্তত আরও ২০ কেজি নিবো।",
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-bold text-gray-900 text-sm">{rev.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({rev.location})</span>
                        </div>
                        <div className="flex items-center text-yellow-400 text-xs">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <FaStar key={idx} />
                          ))}
                          <span className="text-[10px] text-gray-400 ml-2">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Embedded Quick Checkout Section or Out of Stock Notification */}
        {isOutOfStock ? (
          <section
            id="quick-checkout"
            className="mt-16 bg-gradient-to-br from-gray-900 via-stone-900 to-zinc-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-red-500/30 text-center"
          >
            <div className="max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-3xl font-black">
                ✕
              </div>
              <span className="px-4 py-1.5 bg-red-500/20 text-red-300 font-bold text-xs rounded-full uppercase tracking-wider inline-block">
                স্টক শেষ (Out of Stock)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {product.name_bn} এর স্টক বর্তমানে শেষ
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                দুঃখিত, এই মৌসুমের জন্য এই পণ্যটির স্টক শেষ হয়ে গেছে। পরবর্তী লটের স্টক সম্পর্কে জানতে অথবা বিশেষ প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <a
                  href={`tel:${settings?.contactPhone || "01749775030"}`}
                  className="px-6 py-3 bg-white text-gray-900 hover:bg-yellow-400 font-bold text-sm rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <FaPhoneAlt /> সরাসরি কল করুন
                </a>
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <FaWhatsapp className="text-lg" /> হোয়াটসঅ্যাপে বার্তা দিন
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section
            id="quick-checkout"
            className="mt-16 bg-gradient-to-br from-green-900 via-green-800 to-amber-900 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Leaf Icon */}
            <FaLeaf className="absolute -right-10 -bottom-10 text-white/5 text-[220px] pointer-events-none transform rotate-12" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="px-4 py-1 bg-yellow-400 text-green-950 font-extrabold text-xs rounded-full uppercase tracking-wider inline-block mb-3">
                  {isPreOrder ? "প্রি-অর্ডার ফর্ম" : "সরাসরি অর্ডার ফর্ম"}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                  {product.name_bn} {isPreOrder ? "প্রি-অর্ডার সম্পূর্ণ করুন" : "অর্ডার সম্পূর্ণ করুন"}
                </h2>
                <p className="text-gray-300 text-sm mt-2">
                  {isPreOrder
                    ? "নিচের ফর্মটি পূরণ করে আপনার প্রি-অর্ডারটি সম্পন্ন করুন। ফ্রেশ বাগান থেকে সংগ্রহের পর ডেলিভারি দেওয়া হবে।"
                    : "নিচের ফর্মটি পূরণ করে অর্ডার সাবমিট করুন। কোনো প্রকার অগ্রিম হিডেন চার্জ ছাড়াই ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন।"}
                </p>
              </div>

              {/* Selected Package Summary Pill */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name_bn}
                    className="w-14 h-14 rounded-xl object-cover border border-yellow-300"
                  />
                  <div>
                    <h4 className="font-bold text-yellow-300 text-base">{product.name_bn}</h4>
                    <p className="text-xs text-gray-300">
                      প্যাকেজ: {selectedPackage?.label || "৫ কেজি"} ({quantity} টি)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-300 block">মোট প্রদেয় বিল</span>
                  <span className="text-2xl font-black text-yellow-400">৳ {totalAmount}</span>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="০১৭১১-XXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-1">
                    সম্পূর্ণ ডেলিভারি ঠিকানা *
                  </label>
                  <textarea
                    required
                    rows="2"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="বাড়ি/ফ্ল্যাট নম্বর, রোড, এলাকা, থানা ও জেলা উল্লেখ করুন"
                    className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Desired Date */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1">
                      {isPreOrder ? "প্রত্যাশিত ডেলিভারির তারিখ (ঐচ্ছিক)" : "আম গ্রহণের সম্ভাব্য তারিখ"}
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-200 mb-1">
                      পেমেন্ট মেথড
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/95 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent"
                    >
                      <option value="cod">ক্যাশ অন ডেলিভারি (আম হাতে পেয়ে মূল্য দিন)</option>
                      <option value="bkash">বিকাশ / নগদ (অর্ডার নিশ্চিতের পর)</option>
                    </select>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-1">
                    বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="যেমন: আধাপাকা আম পাঠাবেন / গিফট বক্স প্যাকিং ইত্যাদি"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-green-950 font-black py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition duration-300 transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    ) : (
                      <span>
                        {isPreOrder ? "প্রি-অর্ডার সম্পূর্ণ করুন" : "অর্ডার সম্পূর্ণ করুন"} (৳ {totalAmount})
                      </span>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-300 mt-2">
                    🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ। কোনো প্রকার অগ্রিম হিডেন চার্জ নেই।
                  </p>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Recommended Products Section (Dynamic recommendations based on category and pool) */}
        {recommendedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block mb-1">
                  {product.category ? `${product.category} ও সংশ্লিষ্ট পণ্য` : "সংশ্লিষ্ট আইটেম"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-green-900">
                  ✨ আপনার জন্য রেকমেন্ডেড পণ্য
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  আপনার পছন্দের ক্যাটাগরির সাথে মিল রেখে সাজানো সেরা কিছু বাছাইকৃত পণ্য
                </p>
              </div>
              <Link
                to="/#varieties"
                onClick={() => {
                  setTimeout(() => {
                    const el = document.getElementById("varieties");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 150);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                আরো প্রোডাক্ট দেখুন <FaChevronRight className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((rel) => {
                const relPrice = rel.price_per_unit || rel.price_per_kg || rel.price || 0;
                const relUnit = rel.unit || "কেজি";
                const relLink = `/product/${rel.slug || rel._id || rel.id}`;
                return (
                  <motion.div
                    key={rel._id || rel.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-yellow-200 transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={rel.image || "/assets/mangoes/m1.jpg"}
                        alt={rel.name_bn || rel.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/mangoes/m1.jpg";
                        }}
                      />
                      {rel.category && (
                        <span className="absolute top-2 left-2 bg-green-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          {rel.category}
                        </span>
                      )}
                      {rel.stock_status && (
                        <span className="absolute top-2 right-2 bg-yellow-400 text-green-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                          {rel.stock_status}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-green-900 text-lg">{rel.name_bn || rel.name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {rel.subtitle_bn || rel.origin || "খাঁটি ও তাজা"}
                        </p>
                        <p className="text-green-700 font-black text-base mt-2">
                          ৳ {relPrice} / {relUnit}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-gray-100 mt-3 flex items-center gap-2">
                        <Link
                          to={relLink}
                          className="w-full text-center py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-green-950 font-bold text-xs rounded-xl shadow transition"
                        >
                          বিস্তারিত ও অর্ডার
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Order Invoice Download & Print Modal */}
      <OrderInvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        order={createdOrder}
      />
    </div>
  );
}
