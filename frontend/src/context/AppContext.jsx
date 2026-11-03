import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { api } from "../services/api";
import { productsData as initialProducts } from "../data/products";
import { initialOrders } from "../data/orders";

const AppContext = createContext();

const initialCategories = [
  { _id: "c1", name_bn: "সবগুলো", slug: "all", icon: "✨" },
  { _id: "c2", name_bn: "আম", slug: "mango", icon: "🥭" },
  { _id: "c3", name_bn: "খাঁটি মধু", slug: "honey", icon: "🍯" },
  { _id: "c4", name_bn: "দিনাজপুরের লিচু", slug: "lychee", icon: "🍒" },
  { _id: "c5", name_bn: "সরিষার তেল ও ঘি", slug: "oil-ghee", icon: "🫒" },
];

// Helper to safely write to localStorage without crashing on quota exceeded
const safeSetLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch (err) {
    console.warn(`[Storage] Quota exceeded or storage disabled for ${key}:`, err.message);
  }
};

export function AppProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_categories");
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_products");
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_bookings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [reviews, setReviews] = useState([]);
  const [reviewsStats, setReviewsStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_settings");
      return saved
        ? JSON.parse(saved)
        : {
            favicon: "",
            logo: "",
            profilePic: "",
            businessName: "Ammwala Agro & Organic Food",
            ownerName: "Md. Admin",
            themeSidebarType: "gradient",
            themeSidebarBg: "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)",
            themePrimaryBtn: "linear-gradient(135deg, #16a34a 0%, #ca8a04 100%)",
            themeSecondaryBtn: "linear-gradient(135deg, #d97706 0%, #eab308 100%)",
            // Frontend Website Header Settings
            websiteFavicon: "",
            websiteLogo: "",
            headerBrandDisplay: "logo_only",
            headerTitleColorType: "gradient", // "gradient" | "solid"
            headerTitleColorVal: "linear-gradient(to right, #15803d, #ca8a04)",
            headerNavLinks: [
              { name: "হোম", href: "#home", icon: "🏠", showIcon: true },
              { name: "আমের জাত", href: "#varieties", icon: "🥭", showIcon: true },
              { name: "পরিচয়", href: "#about", icon: "📖", showIcon: true },
              { name: "মতামত", href: "#reviews", icon: "⭐", showIcon: true },
              { name: "অর্ডার করুন", href: "#order", icon: "📦", showIcon: true },
            ],
            headerCallBtnText: "কল করুন",
            headerCallBtnPhone: "01749775030",
            headerCallBtnShow: true,
            headerWhatsappNumber: "8801749775030",
            headerWhatsappShow: true,
            headerCartShow: true,
            siteName: "আমওয়ালা ভাইয়া",
            tagline: "প্রিমিয়াম মানের দেশি আম ও খাঁটি প্রাকৃতিক খাদ্যপণ্য",
            hotlinePhone: "০১৭৪৯-৭৭৫০৩০",
            rawHotlinePhone: "01749775030",
            whatsappNumber: "8801749775030",
            email: "ammwalaaviya@gmail.com",
            officeAddress: "রাজশাহী, বাংলাদেশ - ৬২০৩",
            deliveryFeeDhaka: 120,
            deliveryFeeOutside: 150,
            noticeText:
              "📢 রাজশাহীর বিখ্যাত হিমসাগর, গোপালভোগ আম এবং সুন্দরবনের খাঁটি মধুর প্রি-অর্ডার শুরু হয়েছে!",
            heroBgMode: "carousel",
            heroTextMode: "single",
            heroHotlinePhone: "০১৭৪৯-৭৭৫০৩০",
            heroTextSlides: [
              {
                topBadgeText: "সরাসরি বাগান থেকে",
                topBadgeIcon: "🍃",
                mainTitlePart1: "আমওয়ালা",
                mainTitlePart2: "ভাইয়া",
                subtitleText: "তাজা ও রসালো আম",
                descriptionText:
                  "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।",
              },
              {
                topBadgeText: "কেমিক্যাল মুক্ত",
                topBadgeIcon: "🌿",
                mainTitlePart1: "আমওয়ালা",
                mainTitlePart2: "ভাইয়া",
                subtitleText: "প্রিমিয়াম কোয়ালিটি",
                descriptionText:
                  "কোনো প্রকার কেমিক্যাল বা ক্ষতিকর প্রিজারভেটিভ ছাড়া শতভাগ খাঁটি ও ফ্রেশ আম সরাসরি আপনার ঘরে।",
              },
              {
                topBadgeText: "দ্রুত ও নিরাপদ",
                topBadgeIcon: "🚚",
                mainTitlePart1: "আমওয়ালা",
                mainTitlePart2: "ভাইয়া",
                subtitleText: "সারা দেশ ডেলিভারি",
                descriptionText:
                  "সারাদেশে দ্রুততম সময়ে বিশেষ প্যাকেজিংয়ে একদম ফ্রেশ আম পৌঁছে দিচ্ছি বিশ্বস্ততার সাথে।",
              },
              {
                topBadgeText: "বাছাই করুন আপনার পছন্দ",
                topBadgeIcon: "🥭",
                mainTitlePart1: "আমওয়ালা",
                mainTitlePart2: "ভাইয়া",
                subtitleText: "১১+ জাতের আম",
                descriptionText:
                  "হিমসাগর, গোপালভোগ, ল্যাংড়া, আম্রপালি সহ সেরা সব জাত এখন এক জায়গায় অর্ডার করুন।",
              },
            ],
            heroSingleImage: "/assets/one.avif",
            heroSlides: [
              { url: "/assets/one.avif", title: "তাজা ও রসালো আম", subtitle: "সরাসরি বাগান থেকে" },
              { url: "/assets/two.avif", title: "প্রিমিয়াম কোয়ালিটি", subtitle: "কেমিক্যাল মুক্ত" },
              { url: "/assets/three.avif", title: "সারা দেশ ডেলিভারি", subtitle: "দ্রুত ও নিরাপদ" },
              { url: "/assets/four.avif", title: "১১+ জাতের আম", subtitle: "বাছাই করুন আপনার পছন্দ" },
            ],
            heroTopBadgeText: "কেমিক্যাল মুক্ত",
            heroTopBadgeIcon: "🍃",
            heroMainTitlePart1: "আমওয়ালা",
            heroMainTitlePart2: "ভাইয়া",
            heroSubtitleText: "প্রিমিয়াম কোয়ালিটি",
            heroDescriptionText:
              "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।",
            heroTrustBadge1Text: "১০০% রেকমেন্ডেড",
            heroTrustBadge1Icon: "✓",
            heroTrustBadge2Text: "৬+ গ্রাহক রিভিউ",
            heroTrustBadge2Icon: "★",
            heroHighlights: [
              { text: "সারা দেশ ডেলিভারি", icon: "truck" },
              { text: "কেমিক্যাল ফ্রি", icon: "leaf" },
              { text: "০১৭৪৯-৭৭৫০৩০", icon: "phone" },
            ],
            // Product Section Settings
            productSectionTitle: "আমের জাত ও মূল্য",
            productSectionTitleIcon: "🥭",
            productSectionSubtitle:
              "রাজশাহী, চুয়াডাঙ্গা, নওগাঁর মৌসুমি সেরা আম। নিচের কার্ড থেকে বেছে নিন আপনার পছন্দের জাত।",
            productCardPreset: "classic",
            productDisplayMode: "auto",
            productCustomIds: [],
            productShowMoreBtnText: "Show More Products",
            productCollapseBtnText: "Collapse Products",
            // About Section Settings
            aboutFounderImg:
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
            aboutTitle: "আমওয়ালা ভাইয়ার গল্প",
            aboutDescription:
              "প্রতিষ্ঠাতা মোহাম্মদ সাব্বির এর হাত ধরে যাত্রা শুরু “আমওয়ালা ভাইয়া” — রাজশাহী অঞ্চলের প্রিমিয়াম মানের আম উৎপাদন ও বিতরণে বিশ্বস্ত নাম। আমরা কৃষকদের সাথে সরাসরি কাজ করি, নিশ্চিত করি কেমিক্যাল-মুক্ত এবং পাকুতে দেওয়া প্রাকৃতিক আম। আমাদের লক্ষ্য বিদেশি আমের সাথে দেশি আমের জয়গান করা। প্রতিটি অর্ডারে থাকে তাজা গন্ধ ও সতেজতা।",
            aboutStat1Title: "মোট অর্ডার",
            aboutStat1ValueMode: "custom",
            aboutStat1CustomValue: "৫০০+",
            aboutStat1Subtitle: "গত সিজন",
            aboutStat2Title: "আমের জাত",
            aboutStat2ValueMode: "custom",
            aboutStat2CustomValue: "১১+",
            aboutStat2Subtitle: "সরাসরি বাগান থেকে",
            aboutStat3Title: "গ্রাহক সন্তুষ্টি",
            aboutStat3ValueMode: "custom",
            aboutStat3CustomValue: "৯৮%",
            aboutStat3Subtitle: "⭐ রিভিউ এর ভিত্তিতে",
            // Testimonials / Reviews Section Settings
            testimonialSectionTitle: "গ্রাহকদের মতামত",
            testimonialSectionIcon: "🍃",
            testimonialDisplayMode: "custom", // "custom" | "real"
            testimonialAutoPlay: true,
            testimonialAutoPlayInterval: 4,
            testimonialItems: [
              {
                name: "মিজানুর রহমান",
                location: "ঢাকা",
                comment:
                  "আমওয়ালা ভাইয়ার আমের গুণগত মান অসাধারণ। হিমসাগর আমের স্বাদ সত্যিই অতুলনীয়। ডেলিভারি সময়মত পেয়েছি।",
                rating: 5,
                avatar: "😊",
              },
              {
                name: "নুসরাত জাহান",
                location: "চট্টগ্রাম",
                comment:
                  "প্রি-অর্ডার করেছিলাম ল্যাংড়া আম। ফ্রেশ এবং কেমিক্যাল ফ্রি। সবার কাছে সুপারিশ করব।",
                rating: 5,
                avatar: "😊",
              },
              {
                name: "রফিকুল ইসলাম",
                location: "রাজশাহী",
                comment:
                  "আম্রপালি ও ফজলি দুটোই চমৎকার। প্যাকেজিং খুব ভালো ছিল। ধন্যবাদ আমওয়ালা ভাইয়াকে।",
                rating: 4,
                avatar: "😊",
              },
            ],
            // Footer Section Settings
            footerBrandMode: "use_header", // "use_header" | "custom"
            footerBrandDisplay: "logo_and_text", // "logo_only" | "logo_and_text"
            footerLogo: "",
            footerBrandTitle: "আমওয়ালা ভাইয়া",
            footerBrandTagline: "প্রিমিয়াম মানের দেশি আম",
            footerTitleColorType: "gradient", // "gradient" | "solid"
            footerTitleColorVal: "linear-gradient(to right, #facc15, #4ade80)",
            footerAboutText:
              "রাজশাহী, চুয়াডাঙ্গা ও নওগাঁর সেরা জাতের আম সরাসরি বাগান থেকে আপনার ঘরে পৌঁছে দিচ্ছি। কেমিক্যাল-মুক্ত, পুষ্টিকর ও সুস্বাদু আমের অভিজ্ঞতা নিন।",
            footerSocialLinks: [
              { name: "Facebook", icon: "facebook", link: "https://facebook.com", color: "hover:bg-blue-600", show: true },
              { name: "Instagram", icon: "instagram", link: "https://instagram.com", color: "hover:bg-pink-600", show: true },
              { name: "YouTube", icon: "youtube", link: "https://youtube.com", color: "hover:bg-red-600", show: true },
              { name: "WhatsApp", icon: "whatsapp", link: "https://wa.me/8801749775030", color: "hover:bg-green-600", show: true },
            ],
            footerCol2Title: "দ্রুত লিংক",
            footerQuickLinks: [
              { name: "হোম", href: "#home", icon: "🏠", show: true },
              { name: "আমের জাত", href: "#varieties", icon: "🥭", show: true },
              { name: "আমাদের সম্পর্কে", href: "#about", icon: "📖", show: true },
              { name: "গ্রাহক মতামত", href: "#reviews", icon: "⭐", show: true },
              { name: "অর্ডার করুন", href: "#order", icon: "📦", show: true },
            ],
            footerCol3Title: "আমের জাত",
            footerMangoList: [
              { name: "গুটি/স্থানীয়", href: "#varieties", icon: "🥭", show: true },
              { name: "গোপালভোগ", href: "#varieties", icon: "🥭", show: true },
              { name: "হিমসাগর", href: "#varieties", icon: "🥭", show: true },
              { name: "ল্যাংড়া", href: "#varieties", icon: "🥭", show: true },
              { name: "আম্রপালি", href: "#varieties", icon: "🥭", show: true },
              { name: "ফজলি", href: "#varieties", icon: "🥭", show: true },
              { name: "কাটিমন", href: "#varieties", icon: "🥭", show: true },
              { name: "গৌরমতি", href: "#varieties", icon: "🥭", show: true },
            ],
            footerCol4Title: "যোগাযোগ",
            footerContactItems: [
              { text: "০১৭৪৯-৭৭৫০৩০", link: "tel:01749775030", icon: "phone", show: true },
              { text: "WhatsApp", link: "https://wa.me/8801749775030", icon: "whatsapp", show: true },
              { text: "ammwalaaviya@gmail.com", link: "mailto:ammwalaaviya@gmail.com", icon: "envelope", show: true },
              { text: "রাজশাহী, বাংলাদেশ - ৬২০৩", link: "https://maps.google.com", icon: "map-marker", show: true },
            ],
            footerHoursTitle: "খোলার সময়",
            footerHoursIcon: "🕒",
            footerHoursItems: [
              { text: "সোম-শনি: সকাল ৮টা - রাত ৮টা", show: true },
              { text: "রবিবার: সকাল ১০টা - সন্ধ্যা ৬টা", show: true },
              { text: "✨ অনলাইন অর্ডার ২৪/৭", show: true },
            ],
            footerFeatures: [
              { icon: "truck", title: "সারাদেশ ডেলিভারি", desc: "দ্রুত ও নিরাপদ", show: true },
              { icon: "leaf", title: "গুনগত মান", desc: "১০০% সতেজ ও বিশুদ্ধ", show: true },
              { icon: "headset", title: "২৪/৭ সাপোর্ট", desc: "যেকোনো সময় যোগাযোগ", show: true },
              { icon: "medal", title: "প্রিমিয়াম কোয়ালিটি", desc: "বাগান থেকে সরাসরি", show: true },
            ],
            footerPaymentTitle: "পেমেন্ট মেথড:",
            footerPaymentIcon: "💳",
            footerPaymentMethods: [
              { name: "বিকাশ", bgColor: "bg-pink-600", icon: "", show: true },
              { name: "নগদ", bgColor: "bg-orange-500", icon: "", show: true },
              { name: "রকেট", bgColor: "bg-purple-600", icon: "", show: true },
              { name: "ক্যাশ অন ডেলিভারি", bgColor: "bg-green-600", icon: "", show: true },
            ],
            footerReturnPolicyShow: true,
            footerReturnPolicyIcon: "🛡️",
            footerReturnPolicyText: "৭ দিনের রিটার্ন পলিসি",
            footerReturnPolicyLink: "#",
            footerCopyrightText: "আমওয়ালা ভাইয়া - সর্বস্বত্ব সংরক্ষিত",
            footerPrivacyPolicyText: "গোপনীয়তা নীতি",
            footerPrivacyPolicyLink: "#",
            footerTermsText: "সেবার শর্তাবলী",
            footerTermsLink: "#",
            footerDeveloperCreditText: "Designed & Developed with",
            footerDeveloperName: "DevHome",
            footerDeveloperLink: "https://devhome.onrender.com/",
          };
    } catch {
      return {};
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem("ammwala_admin_token") || null;
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_admin_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [visitorStats, setVisitorStats] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_visitor_stats");
      return saved ? JSON.parse(saved) : { todaysVisitors: 1, totalVisitors: 1 };
    } catch {
      return { todaysVisitors: 1, totalVisitors: 1 };
    }
  });

  // Sync state to backend API on mount
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Categories
      const catRes = await api.categories.getAll();
      if (catRes.success && catRes.data?.length > 0) {
        setCategories([
          { _id: "all", name_bn: "সবগুলো", slug: "all", icon: "✨" },
          ...catRes.data,
        ]);
        safeSetLocalStorage("ammwala_categories", catRes.data);
      }

      // 2. Fetch Products
      const prodRes = await api.products.getAll();
      if (prodRes.success && Array.isArray(prodRes.data)) {
        // Map backend product structure to match frontend expectations
        const formatted = prodRes.data.map((p, idx) => ({
          ...p,
          id: p._id || p.id || idx + 1,
          price: p.price_per_unit ? `৳ ${p.price_per_unit}/${p.unit || "কেজি"}` : p.price,
          price_per_kg: p.price_per_unit || p.price_per_kg || 180,
          regular_price_per_kg: p.regular_price_per_unit || p.regular_price_per_kg || 210,
        }));
        setProducts(formatted);
        safeSetLocalStorage("ammwala_products", formatted);
      }

      // 3. Fetch Settings
      const setRes = await api.settings.get();
      if (setRes.success && setRes.data) {
        setSettings(setRes.data);
        safeSetLocalStorage("ammwala_settings", setRes.data);
      }

      // 4. If logged in, fetch orders
      if (adminToken) {
        const orderRes = await api.orders.getAll({}, adminToken);
        if (orderRes.success && orderRes.data) {
          const mappedOrders = orderRes.data.map((o) => ({
            ...o,
            id: o.orderId || o._id,
          }));
          setBookings(mappedOrders);
          safeSetLocalStorage("ammwala_bookings", mappedOrders);
        }

        try {
          const revRes = await api.reviews.getAll("", adminToken);
          if (revRes.success && revRes.data) {
            setReviews(revRes.data);
            if (revRes.stats) setReviewsStats(revRes.stats);
          }
        } catch (e) {
          console.warn("Reviews fetch error:", e);
        }
      }

      // 5. Visitor Tracking
      try {
        const visRes = await api.visitors.record();
        if (visRes.success && visRes.data) {
          const stats = {
            todaysVisitors: visRes.data.todaysVisitors || 1,
            totalVisitors: visRes.data.totalVisitors || 1,
          };
          setVisitorStats(stats);
          safeSetLocalStorage("ammwala_visitor_stats", stats);
        }
      } catch (err) {
        // keep existing visitor stats
      }
    } catch (err) {
      console.warn("API offline or loading error, using local state:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sync to LocalStorage on updates safely
  useEffect(() => {
    safeSetLocalStorage("ammwala_products", products);
  }, [products]);

  useEffect(() => {
    safeSetLocalStorage("ammwala_bookings", bookings);
  }, [bookings]);

  useEffect(() => {
    safeSetLocalStorage("ammwala_settings", settings);
  }, [settings]);

  // Product Operations
  const addProduct = async (newProduct) => {
    try {
      const payload = {
        ...newProduct,
        price_per_unit: Number(newProduct.price_per_kg || newProduct.price_per_unit || 180),
        regular_price_per_unit: Number(newProduct.regular_price_per_kg || 210),
      };
      const res = await api.products.create(payload, adminToken);
      if (res.success && res.data) {
        const created = {
          ...res.data,
          id: res.data._id,
          price: `৳ ${res.data.price_per_unit}/${res.data.unit || "কেজি"}`,
          price_per_kg: res.data.price_per_unit,
        };
        setProducts((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      // Local fallback
    }

    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id || 0)) + 1 : 1;
    const fallbackProduct = { ...newProduct, id: nextId };
    setProducts((prev) => [fallbackProduct, ...prev]);
    return fallbackProduct;
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const mongoId = id.toString().match(/^[0-9a-fA-F]{24}$/)
        ? id
        : products.find((p) => p.id === id)?._id;
      if (mongoId) {
        await api.products.update(mongoId, updatedData, adminToken);
      }
    } catch {
      // Local fallback
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id || p._id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = async (id) => {
    try {
      const mongoId = id.toString().match(/^[0-9a-fA-F]{24}$/)
        ? id
        : products.find((p) => p.id === id)?._id;
      if (mongoId) {
        await api.products.delete(mongoId, adminToken);
      }
    } catch {
      // Local fallback
    }

    setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
  };

  // Booking / Order Operations
  const addBooking = async (bookingData) => {
    try {
      const res = await api.orders.create(bookingData);
      if (res.success && res.data) {
        const order = { ...res.data, id: res.data.orderId || res.data._id };
        setBookings((prev) => [order, ...prev]);
        return order;
      }
    } catch {
      // Local fallback
    }

    const nextId = `BK-${Date.now().toString().slice(-4)}`;
    const newBooking = {
      ...bookingData,
      id: nextId,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = async (id, newStatus, paymentStatus = null) => {
    try {
      const target = bookings.find((b) => b.id === id || b._id === id || b.orderId === id);
      const mongoId = target?._id || (id.toString().match(/^[0-9a-fA-F]{24}$/) ? id : null);
      if (mongoId) {
        await api.orders.updateStatus(mongoId, newStatus, paymentStatus, adminToken);
      }
    } catch {
      // Local fallback
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id || b._id === id || b.orderId === id
          ? { ...b, status: newStatus, ...(paymentStatus ? { paymentStatus } : {}) }
          : b
      )
    );
  };

  const updateBookingPaymentStatus = async (id, paymentStatus) => {
    try {
      const target = bookings.find((b) => b.id === id || b._id === id || b.orderId === id);
      const mongoId = target?._id || (id.toString().match(/^[0-9a-fA-F]{24}$/) ? id : null);
      if (mongoId) {
        await api.orders.updateStatus(mongoId, target?.status || "Pending", paymentStatus, adminToken);
      }
    } catch {
      // Local fallback
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id || b._id === id || b.orderId === id
          ? { ...b, paymentStatus }
          : b
      )
    );
  };

  const deleteBooking = async (id) => {
    try {
      const target = bookings.find((b) => b.id === id);
      const mongoId = target?._id || (id.match(/^[0-9a-fA-F]{24}$/) ? id : null);
      if (mongoId) {
        await api.orders.delete(mongoId, adminToken);
      }
    } catch {
      // Local fallback
    }

    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Category Operations
  const addCategory = async (categoryData) => {
    try {
      const res = await api.categories.create(categoryData, adminToken);
      if (res.success && res.data) {
        setCategories((prev) => [...prev, res.data]);
        return res.data;
      }
    } catch (err) {
      console.warn("Backend category create failed, using local:", err.message);
    }
    const newCat = {
      _id: `cat_${Date.now()}`,
      ...categoryData,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = async (id, categoryData) => {
    try {
      await api.categories.update(id, categoryData, adminToken);
    } catch (err) {
      console.warn("Backend category update failed, using local:", err.message);
    }
    setCategories((prev) =>
      prev.map((c) => (c._id === id || c.slug === id ? { ...c, ...categoryData } : c))
    );
  };

  const deleteCategory = async (id) => {
    try {
      await api.categories.delete(id, adminToken);
    } catch (err) {
      console.warn("Backend category delete failed, using local:", err.message);
    }
    setCategories((prev) => prev.filter((c) => c._id !== id && c.slug !== id));
  };

  // Settings Operation with Instant React State & Debounced Backend Sync
  const pendingSettingsUpdate = useRef({});
  const updateSettingsTimer = useRef(null);

  const updateSettings = async (newSettings) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem("ammwala_settings", JSON.stringify(merged));
      } catch (err) {
        console.warn("Storage quota warning:", err);
      }
      return merged;
    });

    pendingSettingsUpdate.current = {
      ...pendingSettingsUpdate.current,
      ...newSettings,
    };

    if (updateSettingsTimer.current) {
      clearTimeout(updateSettingsTimer.current);
    }

    updateSettingsTimer.current = setTimeout(async () => {
      const payload = { ...pendingSettingsUpdate.current };
      pendingSettingsUpdate.current = {};
      try {
        await api.settings.update(payload, adminToken);
      } catch (e) {
        console.warn("Backend settings update error:", e);
      }
    }, 300);
  };

  // Auth Operations
  const loginAdmin = async (email, password) => {
    try {
      const res = await api.auth.login(email, password);
      if (res.success && res.token) {
        setAdminToken(res.token);
        setAdminUser(res.user);
        localStorage.setItem("ammwala_admin_token", res.token);
        localStorage.setItem("ammwala_admin_session", JSON.stringify(res.user));
        refreshData();
        return { success: true };
      }
      return {
        success: false,
        message: res.message || "Invalid email or password! Please check your credentials.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to connect to authentication server. Please check your connection.",
      };
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem("ammwala_admin_token");
    localStorage.removeItem("ammwala_admin_session");
  };

  // Reviews Actions
  const fetchAdminReviews = async (status = "") => {
    if (!adminToken) return;
    try {
      const res = await api.reviews.getAll(status, adminToken);
      if (res.success && res.data) {
        setReviews(res.data);
        if (res.stats) setReviewsStats(res.stats);
      }
    } catch (e) {
      console.warn("Could not fetch admin reviews:", e);
    }
  };

  const submitReview = async (reviewData) => {
    try {
      const res = await api.reviews.create(reviewData);
      if (res && res.success && adminToken) {
        fetchAdminReviews();
      }
      return res;
    } catch (e) {
      console.error("Submit review error:", e);
      return { success: false, message: "সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি" };
    }
  };

  const updateReviewStatus = async (id, status) => {
    try {
      const res = await api.reviews.updateStatus(id, status, adminToken);
      if (res.success) {
        setReviews((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
        fetchAdminReviews();
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message };
    } catch (e) {
      console.error("Update review status error:", e);
      return { success: false, message: "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে" };
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await api.reviews.delete(id, adminToken);
      if (res.success) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
        fetchAdminReviews();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (e) {
      console.error("Delete review error:", e);
      return { success: false, message: "মুছে ফেলা সম্ভব হয়নি" };
    }
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        selectedCategory,
        setSelectedCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        bookings,
        addBooking,
        updateBookingStatus,
        updateBookingPaymentStatus,
        deleteBooking,
        reviews,
        reviewsStats,
        fetchAdminReviews,
        submitReview,
        updateReviewStatus,
        deleteReview,
        settings,
        updateSettings,
        adminUser,
        adminToken,
        loginAdmin,
        logoutAdmin,
        isAuthenticated: !!adminUser,
        visitorStats,
        isLoading,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
