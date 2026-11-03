import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaCog,
  FaSave,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTruck,
  FaBullhorn,
  FaTachometerAlt,
  FaGlobe,
  FaImage,
  FaBuilding,
  FaUserTie,
  FaBookOpen,
  FaKey,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaUpload,
  FaTrash,
  FaShieldAlt,
  FaTimes,
  FaCheck,
  FaPalette,
  FaPaintBrush,
  FaUndoAlt,
  FaSlidersH,
  FaMousePointer,
  FaDesktop,
  FaMobileAlt,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaBars,
  FaShoppingCart,
  FaLink,
  FaChevronLeft,
  FaChevronRight,
  FaThLarge,
  FaBoxes,
  FaChevronDown,
  FaChevronUp,
  FaLeaf,
  FaHeadset,
  FaMedal,
  FaCreditCard,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toBengaliNumber } from "../../components/About";
import { useApp } from "../../context/AppContext";
import { api } from "../../services/api";


// Header Title Color Presets
const HEADER_TITLE_GRADIENT_PRESETS = [
  { id: "green_gold", name: "Green & Gold (Original)", value: "linear-gradient(to right, #15803d, #ca8a04)" },
  { id: "emerald_lime", name: "Emerald & Fresh Lime", value: "linear-gradient(to right, #059669, #84cc16)" },
  { id: "sunset_orange", name: "Sunset Orange & Amber", value: "linear-gradient(to right, #ea580c, #f59e0b)" },
  { id: "mango_royal", name: "Royal Mango Gold", value: "linear-gradient(to right, #d97706, #eab308, #16a34a)" },
  { id: "deep_forest", name: "Deep Forest Mint", value: "linear-gradient(to right, #14532d, #10b981)" },
];

const HEADER_TITLE_SOLID_PRESETS = [
  { id: "green", name: "Forest Green", value: "#15803d" },
  { id: "emerald", name: "Emerald Green", value: "#059669" },
  { id: "amber", name: "Amber Yellow", value: "#d97706" },
  { id: "orange", name: "Orange", value: "#ea580c" },
  { id: "dark", name: "Dark Slate", value: "#1e293b" },
];

// Footer Title Color Presets
const FOOTER_TITLE_GRADIENT_PRESETS = [
  { id: "gold_green", name: "Mango Gold & Green (Original)", value: "linear-gradient(to right, #facc15, #4ade80)" },
  { id: "sunset_amber", name: "Sunset Amber & Orange", value: "linear-gradient(to right, #fbbf24, #f97316)" },
  { id: "pure_gold", name: "Royal Gold Sparkle", value: "linear-gradient(to right, #fde047, #eab308, #ca8a04)" },
  { id: "emerald_mint", name: "Pure Emerald & Mint", value: "linear-gradient(to right, #34d399, #10b981, #059669)" },
  { id: "white_silver", name: "Crisp White & Silver", value: "linear-gradient(to right, #ffffff, #e2e8f0)" },
];

const FOOTER_TITLE_SOLID_PRESETS = [
  { id: "gold", name: "Golden Yellow", value: "#facc15" },
  { id: "emerald", name: "Emerald Green", value: "#4ade80" },
  { id: "white", name: "Pure White", value: "#ffffff" },
  { id: "orange", name: "Warm Orange", value: "#fb923c" },
  { id: "lime", name: "Fresh Lime", value: "#a3e635" },
];


const POPULAR_FOOTER_ICONS = [
  "🏠", "🥭", "📖", "⭐", "📦", "📞", "💬", "✉️", "📍", "🕒",
  "💳", "🛡️", "🍃", "🚀", "🎁", "🛒", "🏷️", "🚚", "🏆", "⏰",
  "👑", "🔥", "✨", "💯", "✅", "🌿", "🍑", "🍈", "❤️", "🎯"
];

const POPULAR_MENU_ICONS = [
  "🏠", "🥭", "📖", "⭐", "📦", "🏷️", "🛒", "📞", "ℹ️", "🎁", "💬", "📍", "🚚", "🔥", "🌿", "🍯", "🍇", "🍎", "🌱", "✨"
];

// Admin Dashboard Theme Presets
const SIDEBAR_GRADIENT_PRESETS = [
  {
    id: "forest_gold",
    name: "Forest & Mango Gold (Original)",
    value: "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)",
  },
  {
    id: "emerald_luxury",
    name: "Emerald Luxury",
    value: "linear-gradient(180deg, #064e3b 0%, #047857 50%, #0f172a 100%)",
  },
  {
    id: "midnight_sapphire",
    name: "Midnight Sapphire",
    value: "linear-gradient(180deg, #0f172a 0%, #1e3a8a 50%, #172554 100%)",
  },
  {
    id: "royal_amethyst",
    name: "Royal Amethyst",
    value: "linear-gradient(180deg, #3b0764 0%, #581c87 50%, #18181b 100%)",
  },
  {
    id: "velvet_crimson",
    name: "Velvet Crimson",
    value: "linear-gradient(180deg, #450a0a 0%, #881337 50%, #1c1917 100%)",
  },
  {
    id: "dark_obsidian",
    name: "Dark Obsidian",
    value: "linear-gradient(180deg, #18181b 0%, #27272a 50%, #09090b 100%)",
  },
  {
    id: "ocean_breeze",
    name: "Ocean Breeze",
    value: "linear-gradient(180deg, #083344 0%, #0e7490 50%, #164e63 100%)",
  },
  {
    id: "warm_amber",
    name: "Warm Amber Sunset",
    value: "linear-gradient(180deg, #451a03 0%, #78350f 50%, #9a3412 100%)",
  },
];

const SIDEBAR_SOLID_PRESETS = [
  { id: "deep_forest", name: "Deep Forest Green", value: "#052e16" },
  { id: "midnight_navy", name: "Midnight Navy", value: "#0f172a" },
  { id: "charcoal_black", name: "Charcoal Black", value: "#18181b" },
  { id: "slate_navy", name: "Slate Navy", value: "#1e293b" },
  { id: "royal_maroon", name: "Royal Maroon", value: "#450a0a" },
  { id: "dark_espresso", name: "Dark Espresso", value: "#291507" },
  { id: "teal_cypress", name: "Teal Cypress", value: "#134e4a" },
  { id: "deep_indigo", name: "Deep Indigo", value: "#1e1b4b" },
];

const PRIMARY_BTN_GRADIENT_PRESETS = [
  { id: "p_emerald_gold", name: "Emerald Gold (Default)", value: "linear-gradient(135deg, #16a34a 0%, #ca8a04 100%)" },
  { id: "p_lush_green", name: "Pure Lush Green", value: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)" },
  { id: "p_royal_blue", name: "Royal Blue", value: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" },
  { id: "p_sunset_orange", name: "Sunset Orange", value: "linear-gradient(135deg, #ea580c 0%, #d97706 100%)" },
  { id: "p_purple_violet", name: "Purple Violet", value: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)" },
  { id: "p_ruby_crimson", name: "Ruby Crimson", value: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)" },
  { id: "p_dark_carbon", name: "Dark Carbon", value: "linear-gradient(135deg, #27272a 0%, #09090b 100%)" },
];

const PRIMARY_BTN_SOLID_PRESETS = [
  { id: "p_s_forest", name: "Forest Green", value: "#15803d" },
  { id: "p_s_emerald", name: "Emerald", value: "#16a34a" },
  { id: "p_s_navy", name: "Navy Blue", value: "#1e40af" },
  { id: "p_s_amber", name: "Amber Honey", value: "#d97706" },
  { id: "p_s_crimson", name: "Crimson Red", value: "#dc2626" },
  { id: "p_s_black", name: "Pure Black", value: "#111827" },
];

const SECONDARY_BTN_GRADIENT_PRESETS = [
  { id: "s_amber_gold", name: "Amber Gold (Default)", value: "linear-gradient(135deg, #d97706 0%, #eab308 100%)" },
  { id: "s_teal_breeze", name: "Teal Breeze", value: "linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)" },
  { id: "s_indigo_dream", name: "Indigo Dream", value: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)" },
  { id: "s_coral_peach", name: "Coral Peach", value: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)" },
  { id: "s_fuchsia_pink", name: "Fuchsia Pink", value: "linear-gradient(135deg, #c026d3 0%, #db2777 100%)" },
  { id: "s_slate_graphite", name: "Slate Graphite", value: "linear-gradient(135deg, #475569 0%, #64748b 100%)" },
];

const SECONDARY_BTN_SOLID_PRESETS = [
  { id: "s_s_amber", name: "Amber", value: "#d97706" },
  { id: "s_s_gold", name: "Yellow Gold", value: "#eab308" },
  { id: "s_s_slate", name: "Slate Gray", value: "#475569" },
  { id: "s_s_sky", name: "Sky Blue", value: "#0284c7" },
  { id: "s_s_purple", name: "Purple", value: "#9333ea" },
  { id: "s_s_teal", name: "Teal", value: "#0d9488" },
];

export default function AdminSettings() {
  const { settings, updateSettings, adminToken, products } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const tabQuery = searchParams.get("tab");

  // Active Tab state: "dashboard" or "website" (persisted via query param & localStorage)
  const [activeTab, setActiveTab] = useState(() => {
    if (tabQuery === "website" || tabQuery === "dashboard") {
      return tabQuery;
    }
    const saved = localStorage.getItem("ammwala_admin_settings_tab");
    if (saved === "website" || saved === "dashboard") {
      return saved;
    }
    return "dashboard";
  });

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("tab", newTab);
        return next;
      },
      { replace: true }
    );
    try {
      localStorage.setItem("ammwala_admin_settings_tab", newTab);
    } catch {
      // ignore localStorage quota errors
    }
  };

  // Sync activeTab if query param changes externally (e.g. back/forward button)
  useEffect(() => {
    if (tabQuery && (tabQuery === "website" || tabQuery === "dashboard") && tabQuery !== activeTab) {
      setActiveTab(tabQuery);
    } else if (!tabQuery) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("tab", activeTab);
          return next;
        },
        { replace: true }
      );
    }
  }, [tabQuery]);

  // Dashboard Settings state
  const [favicon, setFavicon] = useState(settings.favicon || "");
  const [logo, setLogo] = useState(settings.logo || "");
  const [profilePic, setProfilePic] = useState(settings.profilePic || "");
  const [businessName, setBusinessName] = useState(
    settings.businessName || "Ammwala Agro & Organic Food"
  );
  const [ownerName, setOwnerName] = useState(
    settings.ownerName || "Md. Admin"
  );

  // Admin Theme Customization state
  const [themeSidebarType, setThemeSidebarType] = useState(settings.themeSidebarType || "gradient");
  const [themeSidebarBg, setThemeSidebarBg] = useState(
    settings.themeSidebarBg || "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)"
  );
  const [themePrimaryBtn, setThemePrimaryBtn] = useState(
    settings.themePrimaryBtn || "linear-gradient(135deg, #16a34a 0%, #ca8a04 100%)"
  );
  const [themeSecondaryBtn, setThemeSecondaryBtn] = useState(
    settings.themeSecondaryBtn || "linear-gradient(135deg, #d97706 0%, #eab308 100%)"
  );

  // Sidebar Controls state
  const [sidebarPresetTab, setSidebarPresetTab] = useState("gradient");
  const [sidebarCustomTab, setSidebarCustomTab] = useState("gradient");
  const [customSidebarSolid, setCustomSidebarSolid] = useState("#052e16");
  const [customSidebarStart, setCustomSidebarStart] = useState("#052e16");
  const [customSidebarMid, setCustomSidebarMid] = useState("#14532d");
  const [customSidebarEnd, setCustomSidebarEnd] = useState("#451a03");
  const [customSidebarAngle, setCustomSidebarAngle] = useState("180deg");

  // Primary Button Custom Controls
  const [primaryBtnPresetTab, setPrimaryBtnPresetTab] = useState("gradient");
  const [primaryBtnCustomTab, setPrimaryBtnCustomTab] = useState("gradient");
  const [customPrimarySolid, setCustomPrimarySolid] = useState("#16a34a");
  const [customPrimaryStart, setCustomPrimaryStart] = useState("#16a34a");
  const [customPrimaryEnd, setCustomPrimaryEnd] = useState("#ca8a04");
  const [customPrimaryAngle, setCustomPrimaryAngle] = useState("135deg");

  // Secondary Button Custom Controls
  const [secondaryBtnPresetTab, setSecondaryBtnPresetTab] = useState("gradient");
  const [secondaryBtnCustomTab, setSecondaryBtnCustomTab] = useState("gradient");
  const [customSecondarySolid, setCustomSecondarySolid] = useState("#d97706");
  const [customSecondaryStart, setCustomSecondaryStart] = useState("#d97706");
  const [customSecondaryEnd, setCustomSecondaryEnd] = useState("#eab308");
  const [customSecondaryAngle, setCustomSecondaryAngle] = useState("135deg");

  // Frontend Website Header Settings state
  const [websiteFavicon, setWebsiteFavicon] = useState(settings.websiteFavicon || "");
  const [websiteLogo, setWebsiteLogo] = useState(settings.websiteLogo || "");
  const [headerTitleColorType, setHeaderTitleColorType] = useState(
    settings.headerTitleColorType || "gradient"
  );
  const [headerTitleColorVal, setHeaderTitleColorVal] = useState(
    settings.headerTitleColorVal || "linear-gradient(to right, #15803d, #ca8a04)"
  );
  const [headerBrandDisplay, setHeaderBrandDisplay] = useState(
    settings.headerBrandDisplay || "logo_only"
  );
  const [headerNavLinks, setHeaderNavLinks] = useState(
    settings.headerNavLinks && settings.headerNavLinks.length > 0
      ? settings.headerNavLinks
      : [
          { name: "হোম", href: "#home", icon: "🏠", showIcon: true },
          { name: "আমের জাত", href: "#varieties", icon: "🥭", showIcon: true },
          { name: "পরিচয়", href: "#about", icon: "📖", showIcon: true },
          { name: "মতামত", href: "#reviews", icon: "⭐", showIcon: true },
          { name: "অর্ডার করুন", href: "#order", icon: "📦", showIcon: true },
        ]
  );
  const [headerCallBtnText, setHeaderCallBtnText] = useState(settings.headerCallBtnText || "কল করুন");
  const [headerCallBtnPhone, setHeaderCallBtnPhone] = useState(settings.headerCallBtnPhone || settings.rawHotlinePhone || "01749775030");
  const [headerCallBtnShow, setHeaderCallBtnShow] = useState(settings.headerCallBtnShow !== false);
  const [headerWhatsappNumber, setHeaderWhatsappNumber] = useState(settings.headerWhatsappNumber || settings.whatsappNumber || "8801749775030");
  const [headerWhatsappShow, setHeaderWhatsappShow] = useState(settings.headerWhatsappShow !== false);
  const [headerCartShow, setHeaderCartShow] = useState(settings.headerCartShow !== false);

  // Live Header Preview state
  const [previewDevice, setPreviewDevice] = useState("desktop"); // "desktop" | "mobile"
  const [previewMobileDrawer, setPreviewMobileDrawer] = useState(false);
  const [activeIconPickerIndex, setActiveIconPickerIndex] = useState(null);

  // Website Settings state
  const [siteName, setSiteName] = useState(settings.siteName || "আমওয়ালা ভাইয়া");
  const [tagline, setTagline] = useState(settings.tagline || "প্রিমিয়াম মানের দেশি আম ও খাঁটি প্রাকৃতিক খাদ্যপণ্য");
  const [noticeText, setNoticeText] = useState(settings.noticeText || "");
  const [hotlinePhone, setHotlinePhone] = useState(settings.hotlinePhone || "০১৭৪৯-৭৭৫০৩০");
  const [rawHotlinePhone, setRawHotlinePhone] = useState(settings.rawHotlinePhone || "01749775030");
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || "8801749775030");
  const [email, setEmail] = useState(settings.email || "ammwalaaviya@gmail.com");
  const [officeAddress, setOfficeAddress] = useState(settings.officeAddress || "রাজশাহী, বাংলাদেশ - ৬২০৩");
  const [deliveryFeeDhaka, setDeliveryFeeDhaka] = useState(settings.deliveryFeeDhaka || 120);
  const [deliveryFeeOutside, setDeliveryFeeOutside] = useState(settings.deliveryFeeOutside || 150);
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl || "https://facebook.com");
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || "https://instagram.com");
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtubeUrl || "https://youtube.com");
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle || "");
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle || "");

  // Hero Section Settings state
  const [heroBgMode, setHeroBgMode] = useState(settings.heroBgMode || "carousel"); // "carousel" | "single"
  const [heroSingleImage, setHeroSingleImage] = useState(settings.heroSingleImage || "/assets/one.avif");
  const [heroSlides, setHeroSlides] = useState(
    settings.heroSlides && settings.heroSlides.length > 0
      ? settings.heroSlides
      : [
          { url: "/assets/one.avif", title: "তাজা ও রসালো আম", subtitle: "সরাসরি বাগান থেকে" },
          { url: "/assets/two.avif", title: "প্রিমিয়াম কোয়ালিটি", subtitle: "কেমিক্যাল মুক্ত" },
          { url: "/assets/three.avif", title: "সারা দেশ ডেলিভারি", subtitle: "দ্রুত ও নিরাপদ" },
          { url: "/assets/four.avif", title: "১১+ জাতের আম", subtitle: "বাছাই করুন আপনার পছন্দ" },
        ]
  );
  const [heroTopBadgeText, setHeroTopBadgeText] = useState(settings.heroTopBadgeText || "কেমিক্যাল মুক্ত");
  const [heroTopBadgeIcon, setHeroTopBadgeIcon] = useState(settings.heroTopBadgeIcon || "🍃");
  const [heroMainTitlePart1, setHeroMainTitlePart1] = useState(settings.heroMainTitlePart1 || "আমওয়ালা");
  const [heroMainTitlePart2, setHeroMainTitlePart2] = useState(settings.heroMainTitlePart2 || "ভাইয়া");
  const [heroSubtitleText, setHeroSubtitleText] = useState(settings.heroSubtitleText || "প্রিমিয়াম কোয়ালিটি");
  const [heroDescriptionText, setHeroDescriptionText] = useState(
    settings.heroDescriptionText ||
      "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।"
  );
  const [heroTrustBadge1Text, setHeroTrustBadge1Text] = useState(settings.heroTrustBadge1Text || "১০০% রেকমেন্ডেড");
  const [heroTrustBadge1Icon, setHeroTrustBadge1Icon] = useState(settings.heroTrustBadge1Icon || "✓");
  const [heroTrustBadge2Text, setHeroTrustBadge2Text] = useState(settings.heroTrustBadge2Text || "৬+ গ্রাহক রিভিউ");
  const [heroTrustBadge2Icon, setHeroTrustBadge2Icon] = useState(settings.heroTrustBadge2Icon || "★");
  const [heroHighlights, setHeroHighlights] = useState(
    settings.heroHighlights && settings.heroHighlights.length > 0
      ? settings.heroHighlights
      : [
          { text: "সারা দেশ ডেলিভারি", icon: "truck" },
          { text: "কেমিক্যাল ফ্রি", icon: "leaf" },
          { text: "০১৭৪৯-৭৭৫০৩০", icon: "phone" },
        ]
  );
  const [heroTextMode, setHeroTextMode] = useState(settings.heroTextMode || "single"); // "single" | "multi"
  const [heroHotlinePhone, setHeroHotlinePhone] = useState(
    settings.heroHotlinePhone || settings.rawHotlinePhone || "০১৭৪৯-৭৭৫০৩০"
  );
  const [heroTextSlides, setHeroTextSlides] = useState(
    settings.heroTextSlides && settings.heroTextSlides.length > 0
      ? settings.heroTextSlides
      : [
          {
            topBadgeText: settings.heroTopBadgeText || "সরাসরি বাগান থেকে",
            topBadgeIcon: settings.heroTopBadgeIcon || "🍃",
            mainTitlePart1: settings.heroMainTitlePart1 || "আমওয়ালা",
            mainTitlePart2: settings.heroMainTitlePart2 || "ভাইয়া",
            subtitleText: settings.heroSubtitleText || "তাজা ও রসালো আম",
            descriptionText:
              settings.heroDescriptionText ||
              "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।",
          },
          {
            topBadgeText: "কেমিক্যাল মুক্ত",
            topBadgeIcon: "🥭",
            mainTitlePart1: "আমওয়ালা",
            mainTitlePart2: "ভাইয়া",
            subtitleText: "প্রিমিয়াম কোয়ালিটি",
            descriptionText:
              "১০০% খাঁটি ও মিষ্টি আম সরাসরি বাগান থেকে সংগ্রহ করে দ্রুততম সময়ে পৌঁছে দেওয়া হয়।",
          },
          {
            topBadgeText: "দ্রুত ও নিরাপদ",
            topBadgeIcon: "🚚",
            mainTitlePart1: "আমওয়ালা",
            mainTitlePart2: "ভাইয়া",
            subtitleText: "সারা দেশ ডেলিভারি",
            descriptionText:
              "নিরাপদ প্যাকেজিং ও বিশ্বস্ত ডেলিভারি সার্ভিসের মাধ্যমে আপনার ঠিকানায় পৌঁছে দিচ্ছি।",
          },
          {
            topBadgeText: "বাছাই করুন আপনার পছন্দ",
            topBadgeIcon: "⭐",
            mainTitlePart1: "আমওয়ালা",
            mainTitlePart2: "ভাইয়া",
            subtitleText: "১১+ জাতের আম",
            descriptionText:
              "হিমসাগর, ল্যাংড়া, আম্রপালি, ফজলি সহ সেরা সব জাতের আম একই সাথে উপভোগ করুন।",
          },
        ]
  );
  const [currentTextSlideIndex, setCurrentTextSlideIndex] = useState(0);
  const [heroBadgeIconPickerOpen, setHeroBadgeIconPickerOpen] = useState(false);
  const [heroPreviewDevice, setHeroPreviewDevice] = useState("desktop"); // "desktop" | "mobile"

  // Product Section Settings state
  const [productSectionTitle, setProductSectionTitle] = useState(
    settings.productSectionTitle || "আমের জাত ও মূল্য"
  );
  const [productSectionTitleIcon, setProductSectionTitleIcon] = useState(
    settings.productSectionTitleIcon || "🥭"
  );
  const [productSectionSubtitle, setProductSectionSubtitle] = useState(
    settings.productSectionSubtitle ||
      "রাজশাহী, চুয়াডাঙ্গা, নওগাঁর মৌসুমি সেরা আম। নিচের কার্ড থেকে বেছে নিন আপনার পছন্দের জাত।"
  );
  const [productCardPreset, setProductCardPreset] = useState(
    settings.productCardPreset || "classic"
  );
  const [productDisplayMode, setProductDisplayMode] = useState(
    settings.productDisplayMode || "auto"
  );
  const [productCustomIds, setProductCustomIds] = useState(
    Array.isArray(settings.productCustomIds) ? settings.productCustomIds : []
  );
  const [productShowMoreBtnText, setProductShowMoreBtnText] = useState(
    settings.productShowMoreBtnText || "Show More Products"
  );
  const [productCollapseBtnText, setProductCollapseBtnText] = useState(
    settings.productCollapseBtnText || "Collapse Products"
  );
  const [productIconPickerOpen, setProductIconPickerOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [productPreviewDevice, setProductPreviewDevice] = useState("desktop"); // "desktop" | "mobile"

  // About Section Settings state
  const [aboutFounderImg, setAboutFounderImg] = useState(
    settings.aboutFounderImg ||
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  );
  const [aboutTitle, setAboutTitle] = useState(
    settings.aboutTitle || "আমওয়ালা ভাইয়ার গল্প"
  );
  const [aboutDescription, setAboutDescription] = useState(
    settings.aboutDescription ||
      "প্রতিষ্ঠাতা মোহাম্মদ সাব্বির এর হাত ধরে যাত্রা শুরু “আমওয়ালা ভাইয়া” — রাজশাহী অঞ্চলের প্রিমিয়াম মানের আম উৎপাদন ও বিতরণে বিশ্বস্ত নাম। আমরা কৃষকদের সাথে সরাসরি কাজ করি, নিশ্চিত করি কেমিক্যাল-মুক্ত এবং পাকুতে দেওয়া প্রাকৃতিক আম। আমাদের লক্ষ্য বিদেশি আমের সাথে দেশি আমের জয়গান করা। প্রতিটি অর্ডারে থাকে তাজা গন্ধ ও সতেজতা।"
  );

  // Stat 1 (Total Orders)
  const [aboutStat1Title, setAboutStat1Title] = useState(
    settings.aboutStat1Title || "মোট অর্ডার"
  );
  const [aboutStat1ValueMode, setAboutStat1ValueMode] = useState(
    settings.aboutStat1ValueMode || "custom"
  ); // "real" | "custom"
  const [aboutStat1CustomValue, setAboutStat1CustomValue] = useState(
    settings.aboutStat1CustomValue || "৫০০+"
  );
  const [aboutStat1Subtitle, setAboutStat1Subtitle] = useState(
    settings.aboutStat1Subtitle || "গত সিজন"
  );

  // Stat 2 (Mango Varieties)
  const [aboutStat2Title, setAboutStat2Title] = useState(
    settings.aboutStat2Title || "আমের জাত"
  );
  const [aboutStat2ValueMode, setAboutStat2ValueMode] = useState(
    settings.aboutStat2ValueMode || "custom"
  ); // "real" | "custom"
  const [aboutStat2CustomValue, setAboutStat2CustomValue] = useState(
    settings.aboutStat2CustomValue || "১১+"
  );
  const [aboutStat2Subtitle, setAboutStat2Subtitle] = useState(
    settings.aboutStat2Subtitle || "সরাসরি বাগান থেকে"
  );

  // Stat 3 (Customer Satisfaction)
  const [aboutStat3Title, setAboutStat3Title] = useState(
    settings.aboutStat3Title || "গ্রাহক সন্তুষ্টি"
  );
  const [aboutStat3ValueMode, setAboutStat3ValueMode] = useState(
    settings.aboutStat3ValueMode || "custom"
  ); // "real" | "custom"
  const [aboutStat3CustomValue, setAboutStat3CustomValue] = useState(
    settings.aboutStat3CustomValue || "৯৮%"
  );
  const [aboutStat3Subtitle, setAboutStat3Subtitle] = useState(
    settings.aboutStat3Subtitle || "⭐ রিভিউ এর ভিত্তিতে"
  );

  const [aboutPreviewDevice, setAboutPreviewDevice] = useState("desktop"); // "desktop" | "mobile"

  // Testimonials / Reviews Section Settings state
  const [testimonialSectionTitle, setTestimonialSectionTitle] = useState(
    settings.testimonialSectionTitle || "গ্রাহকদের মতামত"
  );
  const [testimonialSectionIcon, setTestimonialSectionIcon] = useState(
    settings.testimonialSectionIcon || "🍃"
  );
  const [testimonialDisplayMode, setTestimonialDisplayMode] = useState(
    settings.testimonialDisplayMode || "custom"
  ); // "custom" | "real"
  const [testimonialAutoPlay, setTestimonialAutoPlay] = useState(
    settings.testimonialAutoPlay !== undefined ? settings.testimonialAutoPlay : true
  );
  const [testimonialAutoPlayInterval, setTestimonialAutoPlayInterval] = useState(
    settings.testimonialAutoPlayInterval || 4
  );
  const [testimonialItems, setTestimonialItems] = useState(
    Array.isArray(settings.testimonialItems) && settings.testimonialItems.length > 0
      ? settings.testimonialItems
      : [
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
        ]
  );
  const [testimonialPreviewDevice, setTestimonialPreviewDevice] = useState("desktop"); // "desktop" | "mobile"
  const [testimonialPreviewIndex, setTestimonialPreviewIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [testimonialIconPickerOpen, setTestimonialIconPickerOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  // Add Review Modal Form state
  const [newRevName, setNewRevName] = useState("");
  const [newRevLocation, setNewRevLocation] = useState("");
  const [newRevRating, setNewRevRating] = useState(5);
  const [newRevAvatar, setNewRevAvatar] = useState("");
  const [newRevComment, setNewRevComment] = useState("");
  const [newRevProductId, setNewRevProductId] = useState("");

  // Footer Section Settings state
  const [footerBrandMode, setFooterBrandMode] = useState(
    settings.footerBrandMode || "use_header"
  );
  const [footerBrandDisplay, setFooterBrandDisplay] = useState(
    settings.footerBrandDisplay || "logo_and_text"
  );
  const [footerLogo, setFooterLogo] = useState(settings.footerLogo || "");
  const [footerBrandTitle, setFooterBrandTitle] = useState(
    settings.footerBrandTitle || "আমওয়ালা ভাইয়া"
  );
  const [footerBrandTagline, setFooterBrandTagline] = useState(
    settings.footerBrandTagline || "প্রিমিয়াম মানের দেশি আম"
  );
  const [footerTitleColorType, setFooterTitleColorType] = useState(
    settings.footerTitleColorType || "gradient"
  );
  const [footerTitleColorVal, setFooterTitleColorVal] = useState(
    settings.footerTitleColorVal || "linear-gradient(to right, #facc15, #4ade80)"
  );
  const [footerAboutText, setFooterAboutText] = useState(
    settings.footerAboutText ||
      "রাজশাহী, চুয়াডাঙ্গা ও নওগাঁর সেরা জাতের আম সরাসরি বাগান থেকে আপনার ঘরে পৌঁছে দিচ্ছি। কেমিক্যাল-মুক্ত, পুষ্টিকর ও সুস্বাদু আমের অভিজ্ঞতা নিন।"
  );
  const [footerSocialLinks, setFooterSocialLinks] = useState(
    Array.isArray(settings.footerSocialLinks) && settings.footerSocialLinks.length > 0
      ? settings.footerSocialLinks
      : [
          { name: "Facebook", icon: "facebook", link: "https://facebook.com", color: "hover:bg-blue-600", show: true },
          { name: "Instagram", icon: "instagram", link: "https://instagram.com", color: "hover:bg-pink-600", show: true },
          { name: "YouTube", icon: "youtube", link: "https://youtube.com", color: "hover:bg-red-600", show: true },
          { name: "WhatsApp", icon: "whatsapp", link: "https://wa.me/8801749775030", color: "hover:bg-green-600", show: true },
        ]
  );
  const [footerCol2Title, setFooterCol2Title] = useState(
    settings.footerCol2Title || "দ্রুত লিংক"
  );
  const [footerQuickLinks, setFooterQuickLinks] = useState(
    Array.isArray(settings.footerQuickLinks) && settings.footerQuickLinks.length > 0
      ? settings.footerQuickLinks
      : [
          { name: "হোম", href: "#home", icon: "🏠", show: true },
          { name: "আমের জাত", href: "#varieties", icon: "🥭", show: true },
          { name: "আমাদের সম্পর্কে", href: "#about", icon: "📖", show: true },
          { name: "গ্রাহক মতামত", href: "#reviews", icon: "⭐", show: true },
          { name: "অর্ডার করুন", href: "#order", icon: "📦", show: true },
        ]
  );
  const [footerCol3Title, setFooterCol3Title] = useState(
    settings.footerCol3Title || "আমের জাত"
  );
  const [footerMangoList, setFooterMangoList] = useState(
    Array.isArray(settings.footerMangoList) && settings.footerMangoList.length > 0
      ? settings.footerMangoList
      : [
          { name: "গুটি/স্থানীয়", href: "#varieties", icon: "🥭", show: true },
          { name: "গোপালভোগ", href: "#varieties", icon: "🥭", show: true },
          { name: "হিমসাগর", href: "#varieties", icon: "🥭", show: true },
          { name: "ল্যাংড়া", href: "#varieties", icon: "🥭", show: true },
          { name: "আম্রপালি", href: "#varieties", icon: "🥭", show: true },
          { name: "ফজলি", href: "#varieties", icon: "🥭", show: true },
          { name: "কাটিমন", href: "#varieties", icon: "🥭", show: true },
          { name: "গৌরমতি", href: "#varieties", icon: "🥭", show: true },
        ]
  );
  const [footerCol4Title, setFooterCol4Title] = useState(
    settings.footerCol4Title || "যোগাযোগ"
  );
  const [footerContactItems, setFooterContactItems] = useState(
    Array.isArray(settings.footerContactItems) && settings.footerContactItems.length > 0
      ? settings.footerContactItems
      : [
          { text: "০১৭৪৯-৭৭৫০৩০", link: "tel:01749775030", icon: "phone", show: true },
          { text: "WhatsApp", link: "https://wa.me/8801749775030", icon: "whatsapp", show: true },
          { text: "ammwalaaviya@gmail.com", link: "mailto:ammwalaaviya@gmail.com", icon: "envelope", show: true },
          { text: "রাজশাহী, বাংলাদেশ - ৬২০৩", link: "https://maps.google.com", icon: "map-marker", show: true },
        ]
  );
  const [footerHoursTitle, setFooterHoursTitle] = useState(
    settings.footerHoursTitle || "খোলার সময়"
  );
  const [footerHoursIcon, setFooterHoursIcon] = useState(
    settings.footerHoursIcon || "🕒"
  );
  const [footerFeatures, setFooterFeatures] = useState(
    settings.footerFeatures && settings.footerFeatures.length > 0
      ? settings.footerFeatures
      : [
          { icon: "truck", title: "সারাদেশ ডেলিভারি", desc: "দ্রুত ও নিরাপদ", show: true },
          { icon: "leaf", title: "গুনগত মান", desc: "১০০% সতেজ ও বিশুদ্ধ", show: true },
          { icon: "headset", title: "২৪/৭ সাপোর্ট", desc: "যেকোনো সময় যোগাযোগ", show: true },
          { icon: "medal", title: "প্রিমিয়াম কোয়ালিটি", desc: "বাগান থেকে সরাসরি", show: true },
        ]
  );
  const [footerHoursItems, setFooterHoursItems] = useState(
    Array.isArray(settings.footerHoursItems) && settings.footerHoursItems.length > 0
      ? settings.footerHoursItems
      : [
          { text: "সোম-শনি: সকাল ৮টা - রাত ৮টা", show: true },
          { text: "রবিবার: সকাল ১০টা - সন্ধ্যা ৬টা", show: true },
          { text: "✨ অনলাইন অর্ডার ২৪/৭", show: true },
        ]
  );
  const [footerPaymentTitle, setFooterPaymentTitle] = useState(
    settings.footerPaymentTitle || "পেমেন্ট মেথড:"
  );
  const [footerPaymentIcon, setFooterPaymentIcon] = useState(
    settings.footerPaymentIcon || "💳"
  );
  const [footerPaymentMethods, setFooterPaymentMethods] = useState(
    Array.isArray(settings.footerPaymentMethods) && settings.footerPaymentMethods.length > 0
      ? settings.footerPaymentMethods
      : [
          { name: "বিকাশ", bgColor: "bg-pink-600", icon: "", show: true },
          { name: "নগদ", bgColor: "bg-orange-500", icon: "", show: true },
          { name: "রকেট", bgColor: "bg-purple-600", icon: "", show: true },
          { name: "ক্যাশ অন ডেলিভারি", bgColor: "bg-green-600", icon: "", show: true },
        ]
  );
  const [footerReturnPolicyShow, setFooterReturnPolicyShow] = useState(
    settings.footerReturnPolicyShow !== undefined ? settings.footerReturnPolicyShow : true
  );
  const [footerReturnPolicyIcon, setFooterReturnPolicyIcon] = useState(
    settings.footerReturnPolicyIcon || "🛡️"
  );
  const [footerReturnPolicyText, setFooterReturnPolicyText] = useState(
    settings.footerReturnPolicyText || "৭ দিনের রিটার্ন পলিসি"
  );
  const [footerReturnPolicyLink, setFooterReturnPolicyLink] = useState(
    settings.footerReturnPolicyLink || "#"
  );
  const [footerCopyrightText, setFooterCopyrightText] = useState(
    settings.footerCopyrightText || "আমওয়ালা ভাইয়া - সর্বস্বত্ব সংরক্ষিত"
  );
  const [footerPrivacyPolicyShow, setFooterPrivacyPolicyShow] = useState(
    settings.footerPrivacyPolicyShow !== undefined ? Boolean(settings.footerPrivacyPolicyShow) : true
  );
  const [footerPrivacyPolicyText, setFooterPrivacyPolicyText] = useState(
    settings.footerPrivacyPolicyText || "গোপনীয়তা নীতি"
  );
  const [footerPrivacyPolicyLink, setFooterPrivacyPolicyLink] = useState(
    settings.footerPrivacyPolicyLink || "#"
  );
  const [footerTermsShow, setFooterTermsShow] = useState(
    settings.footerTermsShow !== undefined ? Boolean(settings.footerTermsShow) : true
  );
  const [footerTermsText, setFooterTermsText] = useState(
    settings.footerTermsText || "সেবার শর্তাবলী"
  );
  const [footerTermsLink, setFooterTermsLink] = useState(
    settings.footerTermsLink || "#"
  );
  const [footerDeveloperCreditText, setFooterDeveloperCreditText] = useState(
    settings.footerDeveloperCreditText || "Designed & Developed with"
  );
  const [footerDeveloperName, setFooterDeveloperName] = useState(
    settings.footerDeveloperName || "DevHome"
  );
  const [footerDeveloperLink, setFooterDeveloperLink] = useState(
    settings.footerDeveloperLink || "https://devhome.onrender.com/"
  );
  const [footerPreviewDevice, setFooterPreviewDevice] = useState("desktop"); // "desktop" | "mobile"
  const [activeFooterIconPicker, setActiveFooterIconPicker] = useState(null);

  // Sync state if settings update from backend or initial load
  useEffect(() => {
    if (settings) {
      if (settings.favicon !== undefined) setFavicon(settings.favicon);
      if (settings.logo !== undefined) setLogo(settings.logo);
      if (settings.profilePic !== undefined) setProfilePic(settings.profilePic);
      if (settings.businessName !== undefined) setBusinessName(settings.businessName);
      if (settings.ownerName !== undefined) setOwnerName(settings.ownerName);
      if (settings.themeSidebarType !== undefined) setThemeSidebarType(settings.themeSidebarType);
      if (settings.themeSidebarBg !== undefined) setThemeSidebarBg(settings.themeSidebarBg);
      if (settings.themePrimaryBtn !== undefined) setThemePrimaryBtn(settings.themePrimaryBtn);
      if (settings.themeSecondaryBtn !== undefined) setThemeSecondaryBtn(settings.themeSecondaryBtn);
      if (settings.websiteFavicon !== undefined) setWebsiteFavicon(settings.websiteFavicon);
      if (settings.websiteLogo !== undefined) setWebsiteLogo(settings.websiteLogo);
      if (settings.headerBrandDisplay !== undefined) setHeaderBrandDisplay(settings.headerBrandDisplay);
      if (settings.headerTitleColorType !== undefined) setHeaderTitleColorType(settings.headerTitleColorType);
      if (settings.headerTitleColorVal !== undefined) setHeaderTitleColorVal(settings.headerTitleColorVal);
      if (settings.headerNavLinks !== undefined && Array.isArray(settings.headerNavLinks)) {
        setHeaderNavLinks(settings.headerNavLinks);
      }
      if (settings.headerCallBtnText !== undefined) setHeaderCallBtnText(settings.headerCallBtnText);
      if (settings.headerCallBtnPhone !== undefined) setHeaderCallBtnPhone(settings.headerCallBtnPhone);
      if (settings.headerCallBtnShow !== undefined) setHeaderCallBtnShow(settings.headerCallBtnShow);
      if (settings.headerWhatsappNumber !== undefined) setHeaderWhatsappNumber(settings.headerWhatsappNumber);
      if (settings.headerWhatsappShow !== undefined) setHeaderWhatsappShow(settings.headerWhatsappShow);
      if (settings.headerCartShow !== undefined) setHeaderCartShow(settings.headerCartShow);
      if (settings.siteName !== undefined) setSiteName(settings.siteName);
      if (settings.tagline !== undefined) setTagline(settings.tagline);
      if (settings.noticeText !== undefined) setNoticeText(settings.noticeText);
      if (settings.hotlinePhone !== undefined) setHotlinePhone(settings.hotlinePhone);
      if (settings.rawHotlinePhone !== undefined) setRawHotlinePhone(settings.rawHotlinePhone);
      if (settings.whatsappNumber !== undefined) setWhatsappNumber(settings.whatsappNumber);
      if (settings.email !== undefined) setEmail(settings.email);
      if (settings.officeAddress !== undefined) setOfficeAddress(settings.officeAddress);
      if (settings.deliveryFeeDhaka !== undefined) setDeliveryFeeDhaka(settings.deliveryFeeDhaka);
      if (settings.deliveryFeeOutside !== undefined) setDeliveryFeeOutside(settings.deliveryFeeOutside);
      if (settings.facebookUrl !== undefined) setFacebookUrl(settings.facebookUrl);
      if (settings.instagramUrl !== undefined) setInstagramUrl(settings.instagramUrl);
      if (settings.youtubeUrl !== undefined) setYoutubeUrl(settings.youtubeUrl);
      if (settings.heroTitle !== undefined) setHeroTitle(settings.heroTitle);
      if (settings.heroSubtitle !== undefined) setHeroSubtitle(settings.heroSubtitle);
      if (settings.heroBgMode !== undefined) setHeroBgMode(settings.heroBgMode);
      if (settings.heroSingleImage !== undefined) setHeroSingleImage(settings.heroSingleImage);
      if (settings.heroSlides !== undefined && Array.isArray(settings.heroSlides)) setHeroSlides(settings.heroSlides);
      if (settings.heroTopBadgeText !== undefined) setHeroTopBadgeText(settings.heroTopBadgeText);
      if (settings.heroTopBadgeIcon !== undefined) setHeroTopBadgeIcon(settings.heroTopBadgeIcon);
      if (settings.heroMainTitlePart1 !== undefined) setHeroMainTitlePart1(settings.heroMainTitlePart1);
      if (settings.heroMainTitlePart2 !== undefined) setHeroMainTitlePart2(settings.heroMainTitlePart2);
      if (settings.heroSubtitleText !== undefined) setHeroSubtitleText(settings.heroSubtitleText);
      if (settings.heroDescriptionText !== undefined) setHeroDescriptionText(settings.heroDescriptionText);
      if (settings.heroTrustBadge1Text !== undefined) setHeroTrustBadge1Text(settings.heroTrustBadge1Text);
      if (settings.heroTrustBadge1Icon !== undefined) setHeroTrustBadge1Icon(settings.heroTrustBadge1Icon);
      if (settings.heroTrustBadge2Text !== undefined) setHeroTrustBadge2Text(settings.heroTrustBadge2Text);
      if (settings.heroTrustBadge2Icon !== undefined) setHeroTrustBadge2Icon(settings.heroTrustBadge2Icon);
      if (settings.heroHighlights !== undefined && Array.isArray(settings.heroHighlights)) setHeroHighlights(settings.heroHighlights);
      if (settings.heroTextMode !== undefined) setHeroTextMode(settings.heroTextMode);
      if (settings.heroHotlinePhone !== undefined) setHeroHotlinePhone(settings.heroHotlinePhone);
      if (settings.heroTextSlides !== undefined && Array.isArray(settings.heroTextSlides) && settings.heroTextSlides.length > 0) {
        setHeroTextSlides(settings.heroTextSlides);
      }
      if (settings.productSectionTitle !== undefined) setProductSectionTitle(settings.productSectionTitle);
      if (settings.productSectionTitleIcon !== undefined) setProductSectionTitleIcon(settings.productSectionTitleIcon);
      if (settings.productSectionSubtitle !== undefined) setProductSectionSubtitle(settings.productSectionSubtitle);
      if (settings.productCardPreset !== undefined) setProductCardPreset(settings.productCardPreset);
      if (settings.productDisplayMode !== undefined) setProductDisplayMode(settings.productDisplayMode);
      if (settings.productCustomIds !== undefined && Array.isArray(settings.productCustomIds)) {
        setProductCustomIds(settings.productCustomIds);
      }
      if (settings.productShowMoreBtnText !== undefined) setProductShowMoreBtnText(settings.productShowMoreBtnText);
      if (settings.productCollapseBtnText !== undefined) setProductCollapseBtnText(settings.productCollapseBtnText);
      if (settings.aboutFounderImg !== undefined) setAboutFounderImg(settings.aboutFounderImg);
      if (settings.aboutTitle !== undefined) setAboutTitle(settings.aboutTitle);
      if (settings.aboutDescription !== undefined) setAboutDescription(settings.aboutDescription);
      if (settings.aboutStat1Title !== undefined) setAboutStat1Title(settings.aboutStat1Title);
      if (settings.aboutStat1ValueMode !== undefined) setAboutStat1ValueMode(settings.aboutStat1ValueMode);
      if (settings.aboutStat1CustomValue !== undefined) setAboutStat1CustomValue(settings.aboutStat1CustomValue);
      if (settings.aboutStat1Subtitle !== undefined) setAboutStat1Subtitle(settings.aboutStat1Subtitle);
      if (settings.aboutStat2Title !== undefined) setAboutStat2Title(settings.aboutStat2Title);
      if (settings.aboutStat2ValueMode !== undefined) setAboutStat2ValueMode(settings.aboutStat2ValueMode);
      if (settings.aboutStat2CustomValue !== undefined) setAboutStat2CustomValue(settings.aboutStat2CustomValue);
      if (settings.aboutStat2Subtitle !== undefined) setAboutStat2Subtitle(settings.aboutStat2Subtitle);
      if (settings.aboutStat3Title !== undefined) setAboutStat3Title(settings.aboutStat3Title);
      if (settings.aboutStat3ValueMode !== undefined) setAboutStat3ValueMode(settings.aboutStat3ValueMode);
      if (settings.aboutStat3CustomValue !== undefined) setAboutStat3CustomValue(settings.aboutStat3CustomValue);
      if (settings.aboutStat3Subtitle !== undefined) setAboutStat3Subtitle(settings.aboutStat3Subtitle);
      if (settings.testimonialSectionTitle !== undefined) setTestimonialSectionTitle(settings.testimonialSectionTitle);
      if (settings.testimonialSectionIcon !== undefined) setTestimonialSectionIcon(settings.testimonialSectionIcon);
      if (settings.testimonialDisplayMode !== undefined) setTestimonialDisplayMode(settings.testimonialDisplayMode);
      if (settings.testimonialAutoPlay !== undefined) setTestimonialAutoPlay(settings.testimonialAutoPlay);
      if (settings.testimonialAutoPlayInterval !== undefined) setTestimonialAutoPlayInterval(settings.testimonialAutoPlayInterval);
      if (settings.testimonialItems !== undefined && Array.isArray(settings.testimonialItems) && settings.testimonialItems.length > 0) {
        setTestimonialItems(settings.testimonialItems);
      }
      if (settings.footerBrandMode !== undefined) setFooterBrandMode(settings.footerBrandMode);
      if (settings.footerBrandDisplay !== undefined) setFooterBrandDisplay(settings.footerBrandDisplay);
      if (settings.footerLogo !== undefined) setFooterLogo(settings.footerLogo);
      if (settings.footerBrandTitle !== undefined) setFooterBrandTitle(settings.footerBrandTitle);
      if (settings.footerBrandTagline !== undefined) setFooterBrandTagline(settings.footerBrandTagline);
      if (settings.footerTitleColorType !== undefined) setFooterTitleColorType(settings.footerTitleColorType);
      if (settings.footerTitleColorVal !== undefined) setFooterTitleColorVal(settings.footerTitleColorVal);
      if (settings.footerAboutText !== undefined) setFooterAboutText(settings.footerAboutText);
      if (settings.footerSocialLinks !== undefined && Array.isArray(settings.footerSocialLinks)) setFooterSocialLinks(settings.footerSocialLinks);
      if (settings.footerCol2Title !== undefined) setFooterCol2Title(settings.footerCol2Title);
      if (settings.footerQuickLinks !== undefined && Array.isArray(settings.footerQuickLinks)) setFooterQuickLinks(settings.footerQuickLinks);
      if (settings.footerCol3Title !== undefined) setFooterCol3Title(settings.footerCol3Title);
      if (settings.footerMangoList !== undefined && Array.isArray(settings.footerMangoList)) setFooterMangoList(settings.footerMangoList);
      if (settings.footerCol4Title !== undefined) setFooterCol4Title(settings.footerCol4Title);
      if (settings.footerContactItems !== undefined && Array.isArray(settings.footerContactItems)) setFooterContactItems(settings.footerContactItems);
      if (settings.footerHoursTitle !== undefined) setFooterHoursTitle(settings.footerHoursTitle);
      if (settings.footerHoursIcon !== undefined) setFooterHoursIcon(settings.footerHoursIcon);
      if (settings.footerHoursItems !== undefined && Array.isArray(settings.footerHoursItems)) setFooterHoursItems(settings.footerHoursItems);
      if (settings.footerPaymentTitle !== undefined) setFooterPaymentTitle(settings.footerPaymentTitle);
      if (settings.footerPaymentIcon !== undefined) setFooterPaymentIcon(settings.footerPaymentIcon);
      if (settings.footerPaymentMethods !== undefined && Array.isArray(settings.footerPaymentMethods)) setFooterPaymentMethods(settings.footerPaymentMethods);
      if (settings.footerReturnPolicyShow !== undefined) setFooterReturnPolicyShow(settings.footerReturnPolicyShow);
      if (settings.footerReturnPolicyIcon !== undefined) setFooterReturnPolicyIcon(settings.footerReturnPolicyIcon);
      if (settings.footerReturnPolicyText !== undefined) setFooterReturnPolicyText(settings.footerReturnPolicyText);
      if (settings.footerReturnPolicyLink !== undefined) setFooterReturnPolicyLink(settings.footerReturnPolicyLink);
      if (settings.footerCopyrightText !== undefined) setFooterCopyrightText(settings.footerCopyrightText);
      if (settings.footerPrivacyPolicyShow !== undefined) setFooterPrivacyPolicyShow(Boolean(settings.footerPrivacyPolicyShow));
      if (settings.footerPrivacyPolicyText !== undefined) setFooterPrivacyPolicyText(settings.footerPrivacyPolicyText);
      if (settings.footerPrivacyPolicyLink !== undefined) setFooterPrivacyPolicyLink(settings.footerPrivacyPolicyLink);
      if (settings.footerTermsShow !== undefined) setFooterTermsShow(Boolean(settings.footerTermsShow));
      if (settings.footerTermsText !== undefined) setFooterTermsText(settings.footerTermsText);
      if (settings.footerTermsLink !== undefined) setFooterTermsLink(settings.footerTermsLink);
      if (settings.footerDeveloperCreditText !== undefined) setFooterDeveloperCreditText(settings.footerDeveloperCreditText);
      if (settings.footerDeveloperName !== undefined) setFooterDeveloperName(settings.footerDeveloperName);
      if (settings.footerDeveloperLink !== undefined) setFooterDeveloperLink(settings.footerDeveloperLink);
    }
  }, [settings]);

  // Change Password Modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Helper to downscale & compress image to lightweight WebP/JPEG (prevents quota issues & speeds up sync)
  const compressImage = (file, maxWidth, maxHeight, quality = 0.85) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(event.target.result);
      };
      reader.onerror = () => resolve("");
    });
  };

  // File upload handlers (compress & sync directly to context)
  const handleFaviconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 96, 96, 0.9);
      setFavicon(compressed);
      updateSettings({ favicon: compressed });
    } catch {
      // fallback
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 480, 140, 0.9);
      setLogo(compressed);
      updateSettings({ logo: compressed });
    } catch {
      // fallback
    }
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 256, 256, 0.88);
      setProfilePic(compressed);
      updateSettings({ profilePic: compressed });
    } catch {
      // fallback
    }
  };

  // Frontend Header Upload Handlers
  const handleWebsiteFaviconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 96, 96, 0.9);
      setWebsiteFavicon(compressed);
      updateSettings({ websiteFavicon: compressed });
    } catch {
      // fallback
    }
  };

  const handleWebsiteLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 480, 140, 0.9);
      setWebsiteLogo(compressed);
      updateSettings({ websiteLogo: compressed });
    } catch {
      // fallback
    }
  };

  // Menu Items Management Handlers
  const handleAddMenuItem = () => {
    const newItems = [
      ...headerNavLinks,
      {
        name: `মেনু ${headerNavLinks.length + 1}`,
        href: "#section",
        icon: "✨",
        showIcon: true,
      },
    ];
    setHeaderNavLinks(newItems);
    updateSettings({ headerNavLinks: newItems });
  };

  const handleUpdateMenuItem = (index, field, value) => {
    const updated = [...headerNavLinks];
    updated[index] = { ...updated[index], [field]: value };
    setHeaderNavLinks(updated);
    updateSettings({ headerNavLinks: updated });
  };

  const handleDeleteMenuItem = (index) => {
    if (headerNavLinks.length <= 1) {
      Swal.fire({
        icon: "warning",
        title: "Cannot Delete",
        text: "You must keep at least one navigation menu item.",
      });
      return;
    }
    const updated = headerNavLinks.filter((_, i) => i !== index);
    setHeaderNavLinks(updated);
    updateSettings({ headerNavLinks: updated });
  };

  const handleMoveMenuItem = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= headerNavLinks.length) return;
    const updated = [...headerNavLinks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setHeaderNavLinks(updated);
    updateSettings({ headerNavLinks: updated });
  };

  const handleMenuIconUpload = async (index, file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 64, 64, 0.9);
      handleUpdateMenuItem(index, "icon", compressed);
      setActiveIconPickerIndex(null);
    } catch {
      // fallback
    }
  };

  // Hero Section Handlers
  const handleHeroSingleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 1600, 900, 0.82);
      setHeroSingleImage(compressed);
      updateSettings({ heroSingleImage: compressed });
    } catch {
      // fallback
    }
  };

  // Testimonials Action Handlers
  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev <= 0 ? testimonialItems.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % testimonialItems.length);
  };

  const handleDeleteCurrentReview = () => {
    if (testimonialItems.length <= 1) {
      Swal.fire({
        icon: "warning",
        title: "কমপক্ষে ১টি রিভিউ থাকতে হবে",
        text: "তালিকা থেকে সব রিভিউ একসাথে ডিলিট করা সম্ভব নয়।",
      });
      return;
    }
    const updated = testimonialItems.filter((_, i) => i !== currentReviewIndex);
    setTestimonialItems(updated);
    setCurrentReviewIndex((prev) => Math.max(0, Math.min(prev, updated.length - 1)));
    Swal.fire({
      icon: "success",
      title: "Review Deleted",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleCreateReviewSubmit = (e) => {
    e?.preventDefault();
    if (!newRevName.trim() || !newRevComment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Please provide both customer name and review statement.",
      });
      return;
    }
    const selectedProd = (products || []).find(
      (p) => String(p._id || p.id || p.slug) === String(newRevProductId)
    );
    const newReview = {
      name: newRevName.trim(),
      location: newRevLocation.trim() || "Bangladesh",
      comment: newRevComment.trim(),
      rating: Number(newRevRating) || 5,
      avatar: selectedProd?.image || newRevAvatar || "",
      productId: newRevProductId || "",
      productName: selectedProd ? (selectedProd.name_bn || selectedProd.name) : "",
      productImage: selectedProd?.image || "",
    };
    const updated = [...testimonialItems, newReview];
    setTestimonialItems(updated);
    setCurrentReviewIndex(updated.length - 1);
    setIsAddReviewModalOpen(false);
    setNewRevName("");
    setNewRevLocation("");
    setNewRevRating(5);
    setNewRevAvatar("");
    setNewRevComment("");
    setNewRevProductId("");
    Swal.fire({
      icon: "success",
      title: "Review Added Successfully!",
      text: `Review #${updated.length} added to the list.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  const handleTestimonialSectionIconUpload = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 64, 64, 0.9);
      setTestimonialSectionIcon(compressed);
      setTestimonialIconPickerOpen(false);
    } catch {
      // fallback
    }
  };

  const handleReturnPolicyIconUpload = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 64, 64, 0.9);
      setFooterReturnPolicyIcon(compressed);
      setActiveFooterIconPicker(null);
    } catch {
      // fallback
    }
  };

  const handleFooterLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 480, 140, 0.9);
      setFooterLogo(compressed);
      updateSettings({ footerLogo: compressed });
    } catch {
      // fallback
    }
  };

  const handleFooterItemIconUpload = async (setter, list, index, file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 64, 64, 0.9);
      const updated = [...list];
      updated[index] = { ...updated[index], icon: compressed };
      setter(updated);
      setActiveFooterIconPicker(null);
    } catch {
      // fallback
    }
  };

  const handleModalAvatarUpload = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 200, 200, 0.88);
      setNewRevAvatar(compressed);
    } catch {
      // fallback
    }
  };
  const handleAddTestimonial = () => {
    setTestimonialItems((prev) => [
      ...prev,
      {
        name: "নতুন ক্রেতা",
        location: "ঢাকা",
        comment: "আমের মিষ্টি স্বাদ ও কোয়ালিটি অত্যন্ত চমৎকার। ধন্যবাদ আমওয়ালা ভাইয়া।",
        rating: 5,
        avatar: "😊",
      },
    ]);
  };

  const handleRemoveTestimonial = (index) => {
    setTestimonialItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateTestimonial = (index, field, value) => {
    setTestimonialItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleMoveTestimonial = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= testimonialItems.length) return;
    setTestimonialItems((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const handleTestimonialAvatarUpload = async (index, file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 200, 200, 0.88);
      handleUpdateTestimonial(index, "avatar", compressed);
    } catch {
      // fallback
    }
  };

  const handleAboutFounderImgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 400, 400, 0.88);
      setAboutFounderImg(compressed);
      updateSettings({ aboutFounderImg: compressed });
    } catch {
      // fallback
    }
  };

  const handleSlideImageUpload = async (index, file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 1600, 900, 0.82);
      const updated = [...heroSlides];
      updated[index] = { ...updated[index], url: compressed };
      setHeroSlides(updated);
      updateSettings({ heroSlides: updated });
    } catch {
      // fallback
    }
  };

  const handleUpdateSlide = (index, field, value) => {
    const updated = [...heroSlides];
    updated[index] = { ...updated[index], [field]: value };
    setHeroSlides(updated);
    updateSettings({ heroSlides: updated });
  };

  const handleAddSlide = () => {
    const updated = [
      ...heroSlides,
      { url: "/assets/one.avif", title: "নতুন স্লাইড টাইটেল", subtitle: "নতুন সাবটাইটেল" },
    ];
    setHeroSlides(updated);
    updateSettings({ heroSlides: updated });
  };

  const handleRemoveSlide = (idx) => {
    if (heroSlides.length <= 1) {
      Swal.fire({
        icon: "warning",
        title: "কমপক্ষে ১টি স্লাইড থাকতে হবে",
        text: "You must keep at least one slide in carousel mode.",
      });
      return;
    }
    const updated = heroSlides.filter((_, i) => i !== idx);
    setHeroSlides(updated);
    updateSettings({ heroSlides: updated });
  };

  const handleAddHighlight = () => {
    const updated = [...heroHighlights, { text: "নতুন সুবিধা", icon: "truck" }];
    setHeroHighlights(updated);
    updateSettings({ heroHighlights: updated });
  };

  const handleUpdateHighlight = (index, field, value) => {
    const updated = [...heroHighlights];
    updated[index] = { ...updated[index], [field]: value };
    setHeroHighlights(updated);
    updateSettings({ heroHighlights: updated });
  };

  const handleRemoveHighlight = (index) => {
    const updated = heroHighlights.filter((_, i) => i !== index);
    setHeroHighlights(updated);
    updateSettings({ heroHighlights: updated });
  };

  const handleHeroBadgeIconUpload = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 64, 64, 0.9);
      setHeroTopBadgeIcon(compressed);
      handleUpdateCurrentTextSlide("topBadgeIcon", compressed);
      setHeroBadgeIconPickerOpen(false);
    } catch {
      // fallback
    }
  };

  // Hero Text Slide Navigation & Management Handlers
  const handleNextTextSlide = () => {
    setCurrentTextSlideIndex((prev) => (prev + 1) % heroTextSlides.length);
  };

  const handlePrevTextSlide = () => {
    setCurrentTextSlideIndex((prev) => (prev - 1 + heroTextSlides.length) % heroTextSlides.length);
  };

  const handleAddTextSlide = () => {
    const newSlide = {
      topBadgeText: "নতুন অফার",
      topBadgeIcon: "✨",
      mainTitlePart1: "আমওয়ালা",
      mainTitlePart2: "ভাইয়া",
      subtitleText: "প্রিমিয়াম কোয়ালিটি",
      descriptionText:
        "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।",
    };
    const updated = [...heroTextSlides, newSlide];
    setHeroTextSlides(updated);
    setCurrentTextSlideIndex(updated.length - 1);
    updateSettings({ heroTextSlides: updated });
    Swal.fire({
      icon: "success",
      title: "নতুন স্লাইড যোগ হয়েছে!",
      text: `স্লাইড #${updated.length} যুক্ত হয়েছে। এখন নিচের ফিল্ডগুলো দিয়ে এটি কাস্টমাইজ করুন।`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteTextSlide = (indexToDelete) => {
    if (heroTextSlides.length <= 1) {
      Swal.fire({
        icon: "warning",
        title: "কমপক্ষে ১টি স্লাইড থাকতে হবে",
        text: "আপনি সর্বশেষ টেক্সট স্লাইডটি ডিলিট করতে পারবেন না।",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    const updated = heroTextSlides.filter((_, idx) => idx !== indexToDelete);
    setHeroTextSlides(updated);
    if (currentTextSlideIndex >= updated.length) {
      setCurrentTextSlideIndex(updated.length - 1);
    }
    updateSettings({ heroTextSlides: updated });
  };

  const handleUpdateCurrentTextSlide = (field, value) => {
    if (heroTextMode === "single") {
      if (field === "topBadgeText") setHeroTopBadgeText(value);
      if (field === "topBadgeIcon") setHeroTopBadgeIcon(value);
      if (field === "mainTitlePart1") setHeroMainTitlePart1(value);
      if (field === "mainTitlePart2") setHeroMainTitlePart2(value);
      if (field === "subtitleText") setHeroSubtitleText(value);
      if (field === "descriptionText") setHeroDescriptionText(value);

      const updated = [...heroTextSlides];
      if (updated.length === 0) {
        updated.push({
          topBadgeText: value,
          topBadgeIcon: heroTopBadgeIcon,
          mainTitlePart1: heroMainTitlePart1,
          mainTitlePart2: heroMainTitlePart2,
          subtitleText: heroSubtitleText,
          descriptionText: heroDescriptionText,
        });
      } else {
        updated[0] = { ...updated[0], [field]: value };
      }
      setHeroTextSlides(updated);
      updateSettings({ [field]: value, heroTextSlides: updated });
    } else {
      const updated = [...heroTextSlides];
      const validIndex = Math.min(currentTextSlideIndex, updated.length - 1);
      if (!updated[validIndex]) return;
      updated[validIndex] = { ...updated[validIndex], [field]: value };
      setHeroTextSlides(updated);
      if (validIndex === 0) {
        if (field === "topBadgeText") setHeroTopBadgeText(value);
        if (field === "topBadgeIcon") setHeroTopBadgeIcon(value);
        if (field === "mainTitlePart1") setHeroMainTitlePart1(value);
        if (field === "mainTitlePart2") setHeroMainTitlePart2(value);
        if (field === "subtitleText") setHeroSubtitleText(value);
        if (field === "descriptionText") setHeroDescriptionText(value);
      }
      updateSettings({ heroTextSlides: updated });
    }
  };

  // Product Section Custom Product Selection Handler
  const handleToggleCustomProduct = (productId) => {
    const idStr = String(productId);
    let updated;
    if (productCustomIds.includes(idStr)) {
      updated = productCustomIds.filter((id) => id !== idStr);
    } else {
      updated = [...productCustomIds, idStr];
    }
    setProductCustomIds(updated);
    updateSettings({ productCustomIds: updated });
  };

  const handleHeroBadgeIconUploadForSlide = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImage(file, 64, 64, 0.9);
      handleUpdateCurrentTextSlide("topBadgeIcon", compressed);
      setHeroBadgeIconPickerOpen(false);
    } catch {
      // fallback
    }
  };

  // Password rules validation logic
  const passwordRules = [
    {
      id: "length",
      label: "Total at least 8 characters",
      isValid: (pwd) => pwd.length >= 8,
    },
    {
      id: "upper",
      label: "At least one uppercase letter (A-Z)",
      isValid: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      id: "lower",
      label: "At least one lowercase letter (a-z)",
      isValid: (pwd) => /[a-z]/.test(pwd),
    },
    {
      id: "number",
      label: "At least one number (0-9)",
      isValid: (pwd) => /[0-9]/.test(pwd),
    },
    {
      id: "symbol",
      label: "At least one special symbol (!@#$%^&*...)",
      isValid: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  const passedRulesCount = passwordRules.filter((r) => r.isValid(newPassword)).length;
  const progressPercent = (passedRulesCount / passwordRules.length) * 100;

  let strengthLabel = "Weak";
  let strengthBadge = "bg-red-100 text-red-700 border-red-200";
  let progressBarColor = "bg-red-500";

  if (newPassword.length === 0) {
    strengthLabel = "None";
    strengthBadge = "bg-gray-100 text-gray-500 border-gray-200";
    progressBarColor = "bg-gray-300";
  } else if (passedRulesCount <= 2) {
    strengthLabel = "Weak";
    strengthBadge = "bg-red-100 text-red-700 border-red-200";
    progressBarColor = "bg-red-500";
  } else if (passedRulesCount <= 4) {
    strengthLabel = "Normal";
    strengthBadge = "bg-yellow-100 text-yellow-800 border-yellow-300";
    progressBarColor = "bg-yellow-500";
  } else {
    strengthLabel = "Strong";
    strengthBadge = "bg-green-100 text-green-800 border-green-300";
    progressBarColor = "bg-green-600";
  }

  const isPasswordValid = passedRulesCount === passwordRules.length;
  const isConfirmMatching = newPassword && newPassword === confirmNewPassword;

  // Handle password change submit
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      Swal.fire({
        icon: "warning",
        title: "Current Password Required",
        text: "Please enter your current password to confirm authorization.",
      });
      return;
    }

    if (!isPasswordValid) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "New password does not meet all the required security criteria.",
      });
      return;
    }

    if (!isConfirmMatching) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and Confirm new password do not match.",
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      let activeToken = adminToken || localStorage.getItem("ammwala_admin_token");
      let res = await api.auth.changePassword(currentPassword, newPassword, activeToken);

      // If token expired or user session mismatch, auto-refresh token using current password
      if (!res.success && (res.message?.includes("ইউজার") || res.message?.includes("অননুমোদিত") || !activeToken)) {
        try {
          const authEmail = settings.email || "admin@test.com";
          const loginRes = await api.auth.login(authEmail, currentPassword);
          if (loginRes.success && loginRes.token) {
            activeToken = loginRes.token;
            localStorage.setItem("ammwala_admin_token", activeToken);
            res = await api.auth.changePassword(currentPassword, newPassword, activeToken);
          }
        } catch {
          // ignore fallback
        }
      }

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Password Changed!",
          text: "Your admin password has been updated securely.",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsPasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res.message || "Failed to update password. Please check your current password.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "An unexpected error occurred.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Theme apply handlers (Live Preview & Instant update)
  const applySidebarBg = (bgVal, type = "gradient") => {
    setThemeSidebarBg(bgVal);
    setThemeSidebarType(type);
    updateSettings({ themeSidebarBg: bgVal, themeSidebarType: type });
  };

  const applyPrimaryBtn = (btnVal) => {
    setThemePrimaryBtn(btnVal);
    updateSettings({ themePrimaryBtn: btnVal });
  };

  const applySecondaryBtn = (btnVal) => {
    setThemeSecondaryBtn(btnVal);
    updateSettings({ themeSecondaryBtn: btnVal });
  };

  const handleApplyCustomSidebar = () => {
    if (sidebarCustomTab === "solid") {
      applySidebarBg(customSidebarSolid, "solid");
    } else {
      const grad = `linear-gradient(${customSidebarAngle}, ${customSidebarStart} 0%, ${customSidebarMid} 50%, ${customSidebarEnd} 100%)`;
      applySidebarBg(grad, "gradient");
    }
  };

  const handleApplyCustomPrimaryBtn = () => {
    if (primaryBtnCustomTab === "solid") {
      applyPrimaryBtn(customPrimarySolid);
    } else {
      const grad = `linear-gradient(${customPrimaryAngle}, ${customPrimaryStart} 0%, ${customPrimaryEnd} 100%)`;
      applyPrimaryBtn(grad);
    }
  };

  const handleApplyCustomSecondaryBtn = () => {
    if (secondaryBtnCustomTab === "solid") {
      applySecondaryBtn(customSecondarySolid);
    } else {
      const grad = `linear-gradient(${customSecondaryAngle}, ${customSecondaryStart} 0%, ${customSecondaryEnd} 100%)`;
      applySecondaryBtn(grad);
    }
  };

  const handleResetThemeToDefault = () => {
    const defaultSidebar = "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)";
    const defaultPrimary = "linear-gradient(135deg, #16a34a 0%, #ca8a04 100%)";
    const defaultSecondary = "linear-gradient(135deg, #d97706 0%, #eab308 100%)";
    setThemeSidebarType("gradient");
    setThemeSidebarBg(defaultSidebar);
    setThemePrimaryBtn(defaultPrimary);
    setThemeSecondaryBtn(defaultSecondary);
    setCustomSidebarStart("#052e16");
    setCustomSidebarMid("#14532d");
    setCustomSidebarEnd("#451a03");
    setCustomSidebarAngle("180deg");
    setCustomPrimaryStart("#16a34a");
    setCustomPrimaryEnd("#ca8a04");
    setCustomSecondaryStart("#d97706");
    setCustomSecondaryEnd("#eab308");
    updateSettings({
      themeSidebarType: "gradient",
      themeSidebarBg: defaultSidebar,
      themePrimaryBtn: defaultPrimary,
      themeSecondaryBtn: defaultSecondary,
    });
    Swal.fire({
      icon: "info",
      title: "Theme Reset",
      text: "Admin portal theme restored to original Ammwala defaults.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle save settings
  const handleSave = (e) => {
    e?.preventDefault();

    updateSettings({
      favicon,
      logo,
      profilePic,
      businessName,
      ownerName,
      themeSidebarType,
      themeSidebarBg,
      themePrimaryBtn,
      themeSecondaryBtn,
      websiteFavicon,
      websiteLogo,
      headerBrandDisplay,
      headerTitleColorType,
      headerTitleColorVal,
      headerNavLinks,
      headerCallBtnText,
      headerCallBtnPhone,
      headerCallBtnShow,
      headerWhatsappNumber,
      headerWhatsappShow,
      headerCartShow,
      siteName,
      tagline,
      noticeText,
      hotlinePhone,
      rawHotlinePhone,
      whatsappNumber,
      email,
      officeAddress,
      deliveryFeeDhaka: Number(deliveryFeeDhaka),
      deliveryFeeOutside: Number(deliveryFeeOutside),
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      heroTitle,
      heroSubtitle,
      heroBgMode,
      heroSingleImage,
      heroSlides,
      heroTopBadgeText,
      heroTopBadgeIcon,
      heroMainTitlePart1,
      heroMainTitlePart2,
      heroSubtitleText,
      heroDescriptionText,
      heroTrustBadge1Text,
      heroTrustBadge1Icon,
      heroTrustBadge2Text,
      heroTrustBadge2Icon,
      heroHighlights,
      heroTextMode,
      heroHotlinePhone,
      heroTextSlides,
      productSectionTitle,
      productSectionTitleIcon,
      productSectionSubtitle,
      productCardPreset,
      productDisplayMode,
      productCustomIds,
      productShowMoreBtnText,
      productCollapseBtnText,
      aboutFounderImg,
      aboutTitle,
      aboutDescription,
      aboutStat1Title,
      aboutStat1ValueMode,
      aboutStat1CustomValue,
      aboutStat1Subtitle,
      aboutStat2Title,
      aboutStat2ValueMode,
      aboutStat2CustomValue,
      aboutStat2Subtitle,
      aboutStat3Title,
      aboutStat3ValueMode,
      aboutStat3CustomValue,
      aboutStat3Subtitle,
      testimonialSectionTitle,
      testimonialSectionIcon,
      testimonialDisplayMode,
      testimonialAutoPlay,
      testimonialAutoPlayInterval: Number(testimonialAutoPlayInterval) || 4,
      testimonialItems,
      footerBrandMode,
      footerBrandDisplay,
      footerLogo,
      footerBrandTitle,
      footerBrandTagline,
      footerTitleColorType,
      footerTitleColorVal,
      footerAboutText,
      footerSocialLinks,
      footerCol2Title,
      footerQuickLinks,
      footerCol3Title,
      footerMangoList,
      footerCol4Title,
      footerContactItems,
      footerHoursTitle,
      footerHoursIcon,
      footerHoursItems,
      footerPaymentTitle,
      footerPaymentIcon,
      footerPaymentMethods,
      footerReturnPolicyShow,
      footerReturnPolicyIcon,
      footerReturnPolicyText,
      footerReturnPolicyLink,
      footerCopyrightText,
      footerPrivacyPolicyShow,
      footerPrivacyPolicyText,
      footerPrivacyPolicyLink,
      footerTermsShow,
      footerTermsText,
      footerTermsLink,
      footerDeveloperCreditText,
      footerDeveloperName,
      footerDeveloperLink,
    });

    Swal.fire({
      icon: "success",
      title: "Settings Saved!",
      text: "Configuration updated successfully and stored live.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Tab Switcher */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <FaCog className="text-green-700" /> Settings
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage your admin dashboard branding, passwords, and live website configurations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 admin-btn-primary font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <FaSave /> <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleTabChange("dashboard")}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "dashboard"
              ? "admin-btn-primary shadow-md"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <FaTachometerAlt />
          <span>Dashboard Settings</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("website")}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "website"
              ? "admin-btn-primary shadow-md"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <FaGlobe />
          <span>Website Settings</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD SETTINGS */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Card 1: Branding (Favicon & Logo) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <FaImage className="text-green-600" /> 1. Dashboard Branding & Media
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Favicon Upload Option */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-extrabold text-gray-900 block">
                      Dashboard Favicon
                    </label>
                    <span className="text-[11px] text-gray-400">
                      Browser tab icon (32x32px or 64x64px, .png / .ico)
                    </span>
                  </div>
                  {favicon && (
                    <button
                      type="button"
                      onClick={() => {
                        setFavicon("");
                        updateSettings({ favicon: "" });
                      }}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <FaTrash className="text-[10px]" /> Remove
                    </button>
                  )}
                </div>

                {/* Favicon Preview */}
                <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                    {favicon ? (
                      <img src={favicon} alt="Favicon Preview" className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-xl">🥭</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {favicon ? "Custom Favicon Uploaded" : "Default Favicon"}
                    </p>
                    <p className="text-[10px] text-gray-400">Displayed in browser navigation tabs</p>
                  </div>
                </div>

                {/* Upload Button */}
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-800 text-xs font-extrabold rounded-xl shadow-sm transition cursor-pointer">
                  <FaUpload /> <span>Upload New Favicon</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Logo Upload Option */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-extrabold text-gray-900 block">
                      Dashboard Logo
                    </label>
                    <span className="text-[11px] text-gray-400">
                      Sidebar & header logo (Recommended: 240x60px, PNG/SVG)
                    </span>
                  </div>
                  {logo && (
                    <button
                      type="button"
                      onClick={() => {
                        setLogo("");
                        updateSettings({ logo: "" });
                      }}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <FaTrash className="text-[10px]" /> Remove
                    </button>
                  )}
                </div>

                {/* Logo Preview */}
                <div className="p-4 bg-gradient-to-r from-green-950 to-green-900 rounded-xl border border-green-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 px-3 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                      {logo ? (
                        <img src={logo} alt="Dashboard Logo" className="h-8 object-contain" />
                      ) : (
                        <span className="text-sm font-black text-yellow-400 tracking-wider">
                          🥭 Ammwala Portal
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-300 uppercase">Sidebar Preview</span>
                </div>

                {/* Upload Button */}
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-800 text-xs font-extrabold rounded-xl shadow-sm transition cursor-pointer">
                  <FaUpload /> <span>Upload New Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Picture Upload Option */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-extrabold text-gray-900 block">
                      Admin Profile Picture
                    </label>
                    <span className="text-[11px] text-gray-400">
                      Header & sidebar avatar (PNG/JPG, 1:1 square)
                    </span>
                  </div>
                  {profilePic && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePic("");
                        updateSettings({ profilePic: "" });
                      }}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <FaTrash className="text-[10px]" /> Remove
                    </button>
                  )}
                </div>

                {/* Profile Picture Preview */}
                <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-700 to-yellow-500 text-white font-extrabold flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-black tracking-wider">
                        {(ownerName?.[0] || "A").toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {profilePic ? "Custom Photo Set" : `Default: Letter "${(ownerName?.[0] || "A").toUpperCase()}"`}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {profilePic
                        ? "Visible in dashboard topbar & profile"
                        : "First letter of Owner's name shown"}
                    </p>
                  </div>
                </div>

                {/* Upload Button */}
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-800 text-xs font-extrabold rounded-xl shadow-sm transition cursor-pointer">
                  <FaUpload /> <span>Upload Profile Picture</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Business & Owner Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <FaBuilding className="text-green-600" /> 2. Business & Owner Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaBuilding className="text-green-600" /> Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ammwala Agro & Organic Food"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaUserTie className="text-amber-600" /> Owners Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Md. Admin / Founder"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Security & Credentials */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <FaLock className="text-green-700" /> Security & Admin Password
              </h3>
              <p className="text-xs text-gray-500">
                Update your administrative login password with strong multi-rule encryption.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-5 py-2.5 admin-btn-secondary text-white font-black text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <FaKey /> <span>Change Password</span>
            </button>
          </div>

          {/* Card 4: Dashboard Theme & Color Customization */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                  <FaPalette className="text-green-600" /> 4. Admin Theme & Color Customization
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customize the Admin Sidebar background, Primary & Secondary button colors.{" "}
                  <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Admin Portal Only — Website stays untouched
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetThemeToDefault}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                title="Restore default original theme colors"
              >
                <FaUndoAlt className="text-[11px]" /> <span>Reset Defaults</span>
              </button>
            </div>

            {/* Live Scheme Status Bar */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                  Current Theme / Sidebar Color
                </span>
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ background: themeSidebarBg }}
                    className="w-10 h-10 rounded-xl shadow-md border border-black/10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {themeSidebarType === "gradient" ? "Gradient Background" : "Solid Background"}
                    </p>
                    <p className="text-[10px] font-mono text-gray-500 truncate" title={themeSidebarBg}>
                      {themeSidebarBg}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                  Current Primary Button Color
                </span>
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ background: themePrimaryBtn }}
                    className="w-10 h-10 rounded-xl shadow-md border border-black/10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">Primary Actions</p>
                    <p className="text-[10px] font-mono text-gray-500 truncate" title={themePrimaryBtn}>
                      {themePrimaryBtn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                  Current Secondary Button Color
                </span>
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ background: themeSecondaryBtn }}
                    className="w-10 h-10 rounded-xl shadow-md border border-black/10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">Secondary Actions</p>
                    <p className="text-[10px] font-mono text-gray-500 truncate" title={themeSecondaryBtn}>
                      {themeSecondaryBtn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PART 1: Theme Color (Sidebar & Portal Theme) */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  Theme Color (Sidebar Background)
                </h4>

                {/* Sub Tab Switcher: Gradients, Solids, Custom */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSidebarPresetTab("gradient")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      sidebarPresetTab === "gradient"
                        ? "bg-white text-gray-900 shadow-sm font-extrabold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Gradient Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarPresetTab("solid")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      sidebarPresetTab === "solid"
                        ? "bg-white text-gray-900 shadow-sm font-extrabold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Solid Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarPresetTab("custom")}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                      sidebarPresetTab === "custom"
                        ? "bg-white text-green-800 shadow-sm font-extrabold"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Custom Color (Solid + Gradient)
                  </button>
                </div>
              </div>

              {/* Sidebar Presets: Gradients */}
              {sidebarPresetTab === "gradient" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SIDEBAR_GRADIENT_PRESETS.map((preset) => {
                    const isActive = themeSidebarBg === preset.value;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applySidebarBg(preset.value, "gradient")}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-24 relative overflow-hidden group cursor-pointer ${
                          isActive
                            ? "border-green-600 ring-2 ring-green-500 shadow-md"
                            : "border-gray-200 hover:border-gray-400 bg-white"
                        }`}
                      >
                        <div
                          style={{ background: preset.value }}
                          className="w-full h-10 rounded-xl shadow-inner border border-black/10 transition group-hover:scale-[1.02]"
                        />
                        <div className="flex items-center justify-between gap-1 mt-2">
                          <span className="text-xs font-extrabold text-gray-800 truncate">
                            {preset.name}
                          </span>
                          {isActive && (
                            <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] shrink-0">
                              <FaCheck />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sidebar Presets: Solids */}
              {sidebarPresetTab === "solid" && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SIDEBAR_SOLID_PRESETS.map((preset) => {
                    const isActive = themeSidebarBg === preset.value;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applySidebarBg(preset.value, "solid")}
                        className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-24 relative overflow-hidden group cursor-pointer ${
                          isActive
                            ? "border-green-600 ring-2 ring-green-500 shadow-md"
                            : "border-gray-200 hover:border-gray-400 bg-white"
                        }`}
                      >
                        <div
                          style={{ background: preset.value }}
                          className="w-full h-10 rounded-xl shadow-inner border border-black/10 transition group-hover:scale-[1.02]"
                        />
                        <div className="flex items-center justify-between gap-1 mt-2">
                          <span className="text-xs font-extrabold text-gray-800 truncate">
                            {preset.name}
                          </span>
                          {isActive && (
                            <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] shrink-0">
                              <FaCheck />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sidebar: Custom Color Builder (Solid + Gradient) */}
              {sidebarPresetTab === "custom" && (
                <div className="p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-700">
                      Custom Theme Builder
                    </span>
                    <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-gray-200 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setSidebarCustomTab("gradient")}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                          sidebarCustomTab === "gradient"
                            ? "bg-green-700 text-white font-black"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        Custom Gradient
                      </button>
                      <button
                        type="button"
                        onClick={() => setSidebarCustomTab("solid")}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                          sidebarCustomTab === "solid"
                            ? "bg-green-700 text-white font-black"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        Custom Solid
                      </button>
                    </div>
                  </div>

                  {/* Custom Gradient Builder */}
                  {sidebarCustomTab === "gradient" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Start Color (0%)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={customSidebarStart}
                              onChange={(e) => setCustomSidebarStart(e.target.value)}
                              className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                            />
                            <input
                              type="text"
                              value={customSidebarStart}
                              onChange={(e) => setCustomSidebarStart(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Middle Color (50%)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={customSidebarMid}
                              onChange={(e) => setCustomSidebarMid(e.target.value)}
                              className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                            />
                            <input
                              type="text"
                              value={customSidebarMid}
                              onChange={(e) => setCustomSidebarMid(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            End Color (100%)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={customSidebarEnd}
                              onChange={(e) => setCustomSidebarEnd(e.target.value)}
                              className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                            />
                            <input
                              type="text"
                              value={customSidebarEnd}
                              onChange={(e) => setCustomSidebarEnd(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Direction / Angle
                          </label>
                          <select
                            value={customSidebarAngle}
                            onChange={(e) => setCustomSidebarAngle(e.target.value)}
                            className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                          >
                            <option value="180deg">Top to Bottom (180°)</option>
                            <option value="135deg">Diagonal Down-Right (135°)</option>
                            <option value="90deg">Left to Right (90°)</option>
                            <option value="0deg">Bottom to Top (0°)</option>
                          </select>
                        </div>
                      </div>

                      {/* Live Preview Box of the Custom Gradient */}
                      <div className="p-3 bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            style={{
                              background: `linear-gradient(${customSidebarAngle}, ${customSidebarStart} 0%, ${customSidebarMid} 50%, ${customSidebarEnd} 100%)`,
                            }}
                            className="w-24 h-10 rounded-xl shadow-md border border-black/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-800">Custom Gradient Preview</p>
                            <p className="text-[10px] font-mono text-gray-500 truncate">
                              {`linear-gradient(${customSidebarAngle}, ${customSidebarStart} 0%, ${customSidebarMid} 50%, ${customSidebarEnd} 100%)`}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleApplyCustomSidebar}
                          className="px-4 py-2 admin-btn-primary text-white text-xs font-black rounded-xl shadow transition shrink-0 cursor-pointer"
                        >
                          Apply Custom Gradient
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Custom Solid Builder */
                    <div className="space-y-4">
                      <div className="max-w-xs">
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Solid Hex Color
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={customSidebarSolid}
                            onChange={(e) => setCustomSidebarSolid(e.target.value)}
                            className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            value={customSidebarSolid}
                            onChange={(e) => setCustomSidebarSolid(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            style={{ background: customSidebarSolid }}
                            className="w-12 h-10 rounded-xl shadow-md border border-black/10 shrink-0"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800">Custom Solid Preview</p>
                            <p className="text-[10px] font-mono text-gray-500">{customSidebarSolid}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleApplyCustomSidebar}
                          className="px-4 py-2 admin-btn-primary text-white text-xs font-black rounded-xl shadow transition shrink-0 cursor-pointer"
                        >
                          Apply Custom Solid
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PART 2: Button Color Customization */}
            <div className="space-y-6 pt-4 border-t border-gray-100">
              {/* Classification Info Card */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
                  <FaMousePointer className="text-emerald-700 text-xs" />
                  Admin Button Classification & Role
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-900 font-medium">
                  <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-gray-900">1. Primary Action Buttons</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Save Settings, Add Product, Publish Product, Add Category & Units
                      </p>
                    </div>
                    <button
                      type="button"
                      style={{ background: themePrimaryBtn }}
                      className="px-3.5 py-1.5 text-white font-extrabold text-xs rounded-xl shadow shrink-0 pointer-events-none"
                    >
                      Primary Demo
                    </button>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-gray-900">2. Secondary Action Buttons</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Change Password, Quick Settings, Filter / Status Highlights
                      </p>
                    </div>
                    <button
                      type="button"
                      style={{ background: themeSecondaryBtn }}
                      className="px-3.5 py-1.5 text-white font-extrabold text-xs rounded-xl shadow shrink-0 pointer-events-none"
                    >
                      Secondary Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION B1: Primary Button Color */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                  <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Primary Button Color
                  </h4>

                  {/* Primary Tab Switcher */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setPrimaryBtnPresetTab("gradient")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        primaryBtnPresetTab === "gradient"
                          ? "bg-white text-gray-900 shadow-sm font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Gradient Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrimaryBtnPresetTab("solid")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        primaryBtnPresetTab === "solid"
                          ? "bg-white text-gray-900 shadow-sm font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Solid Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrimaryBtnPresetTab("custom")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        primaryBtnPresetTab === "custom"
                          ? "bg-white text-emerald-800 shadow-sm font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Custom Color
                    </button>
                  </div>
                </div>

                {/* Primary Button: Gradient Presets */}
                {primaryBtnPresetTab === "gradient" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRIMARY_BTN_GRADIENT_PRESETS.map((preset) => {
                      const isActive = themePrimaryBtn === preset.value;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applyPrimaryBtn(preset.value)}
                          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-20 relative overflow-hidden group cursor-pointer ${
                            isActive
                              ? "border-emerald-600 ring-2 ring-emerald-500 shadow-md"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }`}
                        >
                          <div
                            style={{ background: preset.value }}
                            className="w-full h-8 rounded-lg shadow-inner border border-black/10 transition group-hover:scale-[1.02]"
                          />
                          <div className="flex items-center justify-between gap-1 mt-1.5">
                            <span className="text-[11px] font-extrabold text-gray-800 truncate">
                              {preset.name}
                            </span>
                            {isActive && (
                              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] shrink-0">
                                <FaCheck />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Primary Button: Solid Presets */}
                {primaryBtnPresetTab === "solid" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {PRIMARY_BTN_SOLID_PRESETS.map((preset) => {
                      const isActive = themePrimaryBtn === preset.value;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applyPrimaryBtn(preset.value)}
                          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-20 relative overflow-hidden group cursor-pointer ${
                            isActive
                              ? "border-emerald-600 ring-2 ring-emerald-500 shadow-md"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }`}
                        >
                          <div
                            style={{ background: preset.value }}
                            className="w-full h-8 rounded-lg shadow-inner border border-black/10 transition group-hover:scale-[1.02]"
                          />
                          <div className="flex items-center justify-between gap-1 mt-1.5">
                            <span className="text-[11px] font-extrabold text-gray-800 truncate">
                              {preset.name}
                            </span>
                            {isActive && (
                              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] shrink-0">
                                <FaCheck />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Primary Button: Custom Builder */}
                {primaryBtnPresetTab === "custom" && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-700">
                        Custom Primary Button Builder
                      </span>
                      <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-gray-200 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setPrimaryBtnCustomTab("gradient")}
                          className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                            primaryBtnCustomTab === "gradient"
                              ? "bg-emerald-700 text-white font-black"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          Gradient
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrimaryBtnCustomTab("solid")}
                          className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                            primaryBtnCustomTab === "solid"
                              ? "bg-emerald-700 text-white font-black"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          Solid
                        </button>
                      </div>
                    </div>

                    {primaryBtnCustomTab === "gradient" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Gradient Start
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customPrimaryStart}
                                onChange={(e) => setCustomPrimaryStart(e.target.value)}
                                className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                              />
                              <input
                                type="text"
                                value={customPrimaryStart}
                                onChange={(e) => setCustomPrimaryStart(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Gradient End
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customPrimaryEnd}
                                onChange={(e) => setCustomPrimaryEnd(e.target.value)}
                                className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                              />
                              <input
                                type="text"
                                value={customPrimaryEnd}
                                onChange={(e) => setCustomPrimaryEnd(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Angle
                            </label>
                            <select
                              value={customPrimaryAngle}
                              onChange={(e) => setCustomPrimaryAngle(e.target.value)}
                              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                            >
                              <option value="135deg">Diagonal (135°)</option>
                              <option value="90deg">Left to Right (90°)</option>
                              <option value="180deg">Top to Bottom (180°)</option>
                            </select>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              style={{
                                background: `linear-gradient(${customPrimaryAngle}, ${customPrimaryStart} 0%, ${customPrimaryEnd} 100%)`,
                              }}
                              className="px-4 py-2 text-white font-extrabold text-xs rounded-xl shadow pointer-events-none"
                            >
                              Live Button Preview
                            </button>
                            <span className="text-[10px] font-mono text-gray-500 hidden sm:inline truncate">
                              {`linear-gradient(${customPrimaryAngle}, ${customPrimaryStart} 0%, ${customPrimaryEnd} 100%)`}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleApplyCustomPrimaryBtn}
                            className="px-4 py-2 admin-btn-primary text-white text-xs font-black rounded-xl shadow transition cursor-pointer"
                          >
                            Apply Primary Color
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="max-w-xs">
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Solid Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={customPrimarySolid}
                              onChange={(e) => setCustomPrimarySolid(e.target.value)}
                              className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                            />
                            <input
                              type="text"
                              value={customPrimarySolid}
                              onChange={(e) => setCustomPrimarySolid(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            style={{ background: customPrimarySolid }}
                            className="px-4 py-2 text-white font-extrabold text-xs rounded-xl shadow pointer-events-none"
                          >
                            Live Button Preview
                          </button>

                          <button
                            type="button"
                            onClick={handleApplyCustomPrimaryBtn}
                            className="px-4 py-2 admin-btn-primary text-white text-xs font-black rounded-xl shadow transition cursor-pointer"
                          >
                            Apply Primary Color
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION B2: Secondary Button Color */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                  <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Secondary Button Color
                  </h4>

                  {/* Secondary Tab Switcher */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setSecondaryBtnPresetTab("gradient")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        secondaryBtnPresetTab === "gradient"
                          ? "bg-white text-gray-900 shadow-sm font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Gradient Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setSecondaryBtnPresetTab("solid")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        secondaryBtnPresetTab === "solid"
                          ? "bg-white text-gray-900 shadow-sm font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Solid Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setSecondaryBtnPresetTab("custom")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        secondaryBtnPresetTab === "custom"
                          ? "bg-white text-amber-800 shadow-sm font-extrabold"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Custom Color
                    </button>
                  </div>
                </div>

                {/* Secondary Button: Gradient Presets */}
                {secondaryBtnPresetTab === "gradient" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {SECONDARY_BTN_GRADIENT_PRESETS.map((preset) => {
                      const isActive = themeSecondaryBtn === preset.value;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applySecondaryBtn(preset.value)}
                          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-20 relative overflow-hidden group cursor-pointer ${
                            isActive
                              ? "border-amber-600 ring-2 ring-amber-500 shadow-md"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }`}
                        >
                          <div
                            style={{ background: preset.value }}
                            className="w-full h-8 rounded-lg shadow-inner border border-black/10 transition group-hover:scale-[1.02]"
                          />
                          <div className="flex items-center justify-between gap-1 mt-1.5">
                            <span className="text-[11px] font-extrabold text-gray-800 truncate">
                              {preset.name}
                            </span>
                            {isActive && (
                              <span className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[8px] shrink-0">
                                <FaCheck />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Secondary Button: Solid Presets */}
                {secondaryBtnPresetTab === "solid" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {SECONDARY_BTN_SOLID_PRESETS.map((preset) => {
                      const isActive = themeSecondaryBtn === preset.value;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applySecondaryBtn(preset.value)}
                          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-20 relative overflow-hidden group cursor-pointer ${
                            isActive
                              ? "border-amber-600 ring-2 ring-amber-500 shadow-md"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }`}
                        >
                          <div
                            style={{ background: preset.value }}
                            className="w-full h-8 rounded-lg shadow-inner border border-black/10 transition group-hover:scale-[1.02]"
                          />
                          <div className="flex items-center justify-between gap-1 mt-1.5">
                            <span className="text-[11px] font-extrabold text-gray-800 truncate">
                              {preset.name}
                            </span>
                            {isActive && (
                              <span className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[8px] shrink-0">
                                <FaCheck />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Secondary Button: Custom Builder */}
                {secondaryBtnPresetTab === "custom" && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-700">
                        Custom Secondary Button Builder
                      </span>
                      <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-gray-200 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setSecondaryBtnCustomTab("gradient")}
                          className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                            secondaryBtnCustomTab === "gradient"
                              ? "bg-amber-600 text-white font-black"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          Gradient
                        </button>
                        <button
                          type="button"
                          onClick={() => setSecondaryBtnCustomTab("solid")}
                          className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                            secondaryBtnCustomTab === "solid"
                              ? "bg-amber-600 text-white font-black"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          Solid
                        </button>
                      </div>
                    </div>

                    {secondaryBtnCustomTab === "gradient" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Gradient Start
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customSecondaryStart}
                                onChange={(e) => setCustomSecondaryStart(e.target.value)}
                                className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                              />
                              <input
                                type="text"
                                value={customSecondaryStart}
                                onChange={(e) => setCustomSecondaryStart(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Gradient End
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={customSecondaryEnd}
                                onChange={(e) => setCustomSecondaryEnd(e.target.value)}
                                className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                              />
                              <input
                                type="text"
                                value={customSecondaryEnd}
                                onChange={(e) => setCustomSecondaryEnd(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              Angle
                            </label>
                            <select
                              value={customSecondaryAngle}
                              onChange={(e) => setCustomSecondaryAngle(e.target.value)}
                              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-bold"
                            >
                              <option value="135deg">Diagonal (135°)</option>
                              <option value="90deg">Left to Right (90°)</option>
                              <option value="180deg">Top to Bottom (180°)</option>
                            </select>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              style={{
                                background: `linear-gradient(${customSecondaryAngle}, ${customSecondaryStart} 0%, ${customSecondaryEnd} 100%)`,
                              }}
                              className="px-4 py-2 text-white font-extrabold text-xs rounded-xl shadow pointer-events-none"
                            >
                              Live Button Preview
                            </button>
                            <span className="text-[10px] font-mono text-gray-500 hidden sm:inline truncate">
                              {`linear-gradient(${customSecondaryAngle}, ${customSecondaryStart} 0%, ${customSecondaryEnd} 100%)`}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleApplyCustomSecondaryBtn}
                            className="px-4 py-2 admin-btn-secondary text-white text-xs font-black rounded-xl shadow transition cursor-pointer"
                          >
                            Apply Secondary Color
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="max-w-xs">
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Solid Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={customSecondarySolid}
                              onChange={(e) => setCustomSecondarySolid(e.target.value)}
                              className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer bg-white"
                            />
                            <input
                              type="text"
                              value={customSecondarySolid}
                              onChange={(e) => setCustomSecondarySolid(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            style={{ background: customSecondarySolid }}
                            className="px-4 py-2 text-white font-extrabold text-xs rounded-xl shadow pointer-events-none"
                          >
                            Live Button Preview
                          </button>

                          <button
                            type="button"
                            onClick={handleApplyCustomSecondaryBtn}
                            className="px-4 py-2 admin-btn-secondary text-white text-xs font-black rounded-xl shadow transition cursor-pointer"
                          >
                            Apply Secondary Color
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEBSITE SETTINGS */}
      {activeTab === "website" && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Header Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            {/* Header Title Bar */}
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                  <FaGlobe className="text-green-600" /> 1. Header Settings
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Manage frontend store Favicon, Logo, Navigation Menus (with icons and toggles), Call & WhatsApp action buttons, and preview live on desktop and mobile.
                </p>
              </div>

              <span className="px-3 py-1 bg-green-50 text-green-800 text-xs font-black rounded-xl border border-green-200 self-start sm:self-auto">
                Customer Storefront
              </span>
            </div>

            {/* Part 1: Frontend Favicon & Logo Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend Favicon */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-extrabold text-gray-900 block">
                      Frontend Favicon
                    </label>
                    <p className="text-[11px] text-gray-400">
                      Browser tab icon for website visitors (Recommended: 96x96 px)
                    </p>
                  </div>
                  {websiteFavicon && (
                    <button
                      type="button"
                      onClick={() => {
                        setWebsiteFavicon("");
                        updateSettings({ websiteFavicon: "" });
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FaTrash className="text-[10px]" /> Clear
                    </button>
                  )}
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                    {websiteFavicon ? (
                      <img src={websiteFavicon} alt="Website Favicon" className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-xl">🍃</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {websiteFavicon ? "Custom Favicon Active" : "Default: /favicon.svg"}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Appears in customer browser tab when viewing store pages
                    </p>
                  </div>
                </div>

                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-800 text-xs font-extrabold rounded-xl shadow-sm transition cursor-pointer">
                  <FaUpload /> <span>Upload Website Favicon</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleWebsiteFaviconUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Frontend Logo */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-extrabold text-gray-900 block">
                      Frontend Header Logo
                    </label>
                    <p className="text-[11px] text-gray-400">
                      Brand logo shown in website navbar (Recommended: 480x140 px)
                    </p>
                  </div>
                  {websiteLogo && (
                    <button
                      type="button"
                      onClick={() => {
                        setWebsiteLogo("");
                        updateSettings({ websiteLogo: "" });
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FaTrash className="text-[10px]" /> Clear
                    </button>
                  )}
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-center gap-4">
                  <div className="w-16 h-12 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner p-1">
                    {websiteLogo ? (
                      <img src={websiteLogo} alt="Website Logo" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-sm font-bold text-gray-400">Ammwala</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {websiteLogo ? "Custom Brand Logo Set" : "Default: Leaf Badge + Store Name"}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Renders beside store title in top navigation bar
                    </p>
                  </div>
                </div>

                <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-800 text-xs font-extrabold rounded-xl shadow-sm transition cursor-pointer">
                  <FaUpload /> <span>Upload Website Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleWebsiteLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Part 1B: Header Brand Display Style & Editable Brand Text */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-3">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaImage className="text-green-600" /> Header Brand Display Style & Text Settings
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select whether to display a single logo only or logo with Store Name and Tagline, and edit brand text.
                </p>
              </div>

              {/* Display Mode Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Single Logo Only */}
                <div
                  onClick={() => {
                    setHeaderBrandDisplay("logo_only");
                    updateSettings({ headerBrandDisplay: "logo_only" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    headerBrandDisplay === "logo_only"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="mt-0.5">
                    <input
                      type="radio"
                      name="headerBrandDisplay"
                      checked={headerBrandDisplay === "logo_only"}
                      onChange={() => {
                        setHeaderBrandDisplay("logo_only");
                        updateSettings({ headerBrandDisplay: "logo_only" });
                      }}
                      className="text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-900">Single Logo Only</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-green-100 text-green-800">
                        Default & Recommended
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Displays only the uploaded logo image in the header without extra text.
                    </p>
                  </div>
                </div>

                {/* Option 2: Logo + Brand Text */}
                <div
                  onClick={() => {
                    setHeaderBrandDisplay("logo_and_text");
                    updateSettings({ headerBrandDisplay: "logo_and_text" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    headerBrandDisplay === "logo_and_text"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="mt-0.5">
                    <input
                      type="radio"
                      name="headerBrandDisplay"
                      checked={headerBrandDisplay === "logo_and_text"}
                      onChange={() => {
                        setHeaderBrandDisplay("logo_and_text");
                        updateSettings({ headerBrandDisplay: "logo_and_text" });
                      }}
                      className="text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-900">Logo + Brand Text</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Displays Store Name and Tagline beside the logo icon (editable below).
                    </p>
                  </div>
                </div>
              </div>

              {/* Editable Brand Text Fields */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                  <div>
                    <h5 className="text-xs font-black text-gray-900 uppercase tracking-wide">
                      Brand Name & Tagline Text (Edit & Update)
                    </h5>
                    <p className="text-[11px] text-gray-400">
                      Store title and tagline used in header text mode and footer copyright.
                    </p>
                  </div>
                  {headerBrandDisplay === "logo_only" && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 self-start sm:self-auto">
                      Currently hidden in header (Single Logo Active)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-gray-700 block mb-1">
                      Store / Website Name (Header Title)
                    </label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => {
                        setSiteName(e.target.value);
                        updateSettings({ siteName: e.target.value });
                      }}
                      placeholder="e.g. আমওয়ালা ভাইয়া"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Appears in header text mode and footer copyright
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-gray-700 block mb-1">
                      Header Tagline / Slogan Subtitle
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => {
                        setTagline(e.target.value);
                        updateSettings({ tagline: e.target.value });
                      }}
                      placeholder="e.g. প্রিমিয়াম মানের দেশি আম ও খাঁটি প্রাকৃতিক খাদ্যপণ্য"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Short subtitle slogan below the store name
                    </p>
                  </div>
                </div>
              
                {/* Header Brand Text Color Customization (Solid & Gradient) */}
                <div className="pt-4 border-t border-gray-200 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-black text-gray-900 uppercase flex items-center gap-1.5">
                        <FaPalette className="text-amber-500" /> Brand Text Color Customization (Title Color)
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        Choose a gradient or solid color for the header brand title.
                      </p>
                    </div>

                    {/* Mode switcher (Gradient vs Solid) */}
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold border border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setHeaderTitleColorType("gradient");
                          updateSettings({ headerTitleColorType: "gradient" });
                        }}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                          headerTitleColorType === "gradient"
                            ? "bg-green-600 text-white shadow font-black"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        🌈 Gradient
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHeaderTitleColorType("solid");
                          updateSettings({ headerTitleColorType: "solid" });
                        }}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                          headerTitleColorType === "solid"
                            ? "bg-green-600 text-white shadow font-black"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        🎨 Solid Color
                      </button>
                    </div>
                  </div>

                  {/* Gradient Presets */}
                  {headerTitleColorType === "gradient" ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {HEADER_TITLE_GRADIENT_PRESETS.map((gp) => (
                          <button
                            key={gp.id}
                            type="button"
                            onClick={() => {
                              setHeaderTitleColorVal(gp.value);
                              updateSettings({ headerTitleColorVal: gp.value });
                            }}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                              headerTitleColorVal === gp.value
                                ? "border-green-600 ring-2 ring-green-500/30 bg-green-50/50"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className="h-4 rounded-md shadow-inner"
                              style={{ backgroundImage: gp.value }}
                            />
                            <span className="text-[10px] font-bold text-gray-700 truncate">
                              {gp.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Custom Gradient Input */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Custom Gradient CSS Code
                        </label>
                        <input
                          type="text"
                          value={headerTitleColorVal}
                          onChange={(e) => {
                            setHeaderTitleColorVal(e.target.value);
                            updateSettings({ headerTitleColorVal: e.target.value });
                          }}
                          placeholder="linear-gradient(to right, #15803d, #ca8a04)"
                          className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Solid Color Presets & Picker */
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {HEADER_TITLE_SOLID_PRESETS.map((sp) => (
                          <button
                            key={sp.id}
                            type="button"
                            onClick={() => {
                              setHeaderTitleColorVal(sp.value);
                              updateSettings({ headerTitleColorVal: sp.value });
                            }}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                              headerTitleColorVal === sp.value
                                ? "border-green-600 ring-2 ring-green-500/30 bg-green-50/50"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-md shadow-inner shrink-0 border border-black/10"
                              style={{ backgroundColor: sp.value }}
                            />
                            <span className="text-[10px] font-bold text-gray-700 truncate">
                              {sp.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Custom Solid Color Picker */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            Custom Solid Color Hex Code
                          </label>
                          <input
                            type="text"
                            value={headerTitleColorVal}
                            onChange={(e) => {
                              setHeaderTitleColorVal(e.target.value);
                              updateSettings({ headerTitleColorVal: e.target.value });
                            }}
                            placeholder="#15803d"
                            className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div className="pt-5">
                          <input
                            type="color"
                            value={headerTitleColorVal.startsWith("#") ? headerTitleColorVal : "#15803d"}
                            onChange={(e) => {
                              setHeaderTitleColorVal(e.target.value);
                              updateSettings({ headerTitleColorVal: e.target.value });
                            }}
                            className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer"
                            title="Open Color Picker"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Live Header Text Preview Box */}
                  <div className="p-3 bg-gray-900 rounded-xl flex items-center justify-between border border-gray-800">
                    <span className="text-[11px] text-gray-400 font-bold">Live Header Title Preview:</span>
                    <span
                      className="text-lg font-black"
                      style={
                        headerTitleColorType === "gradient"
                          ? {
                              backgroundImage: headerTitleColorVal,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }
                          : { color: headerTitleColorVal }
                      }
                    >
                      {siteName || "আমওয়ালা ভাইয়া"}
                    </span>
                  </div>
                </div>

              </div></div>

            {/* Part 2: Navigation Menu Management */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-3">
                <div>
                  <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                    <FaBars className="text-green-600" /> Header Navigation Menus
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Rename menu items, reorder them, select emojis/icons, or turn icons on/off.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddMenuItem}
                  className="px-4 py-2 admin-btn-primary text-white text-xs font-black rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <FaPlus className="text-xs" /> <span>Add New Menu Item</span>
                </button>
              </div>

              {/* Menu items list */}
              <div className="space-y-2.5">
                {headerNavLinks.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center gap-3 transition hover:border-green-400"
                  >
                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1 text-gray-400 self-start md:self-center">
                      <button
                        type="button"
                        onClick={() => handleMoveMenuItem(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Move Up"
                      >
                        <FaArrowUp className="text-xs" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveMenuItem(index, "down")}
                        disabled={index === headerNavLinks.length - 1}
                        className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Move Down"
                      >
                        <FaArrowDown className="text-xs" />
                      </button>
                      <span className="text-xs font-black text-gray-400 w-4 text-center">
                        {index + 1}
                      </span>
                    </div>

                    {/* Icon Selection & Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIconPickerIndex(
                            activeIconPickerIndex === index ? null : index
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-lg shadow-inner cursor-pointer transition overflow-hidden"
                        title="Click to select or upload icon"
                      >
                        {item.icon ? (
                          item.icon.startsWith("data:") || item.icon.startsWith("http") || item.icon.startsWith("/") ? (
                            <img src={item.icon} alt="" className="w-6 h-6 object-contain" />
                          ) : (
                            <span>{item.icon}</span>
                          )
                        ) : (
                          <span className="text-[10px] text-gray-400 font-bold">No Icon</span>
                        )}
                      </button>

                      {/* Floating Emoji Selector Palette */}
                      {activeIconPickerIndex === index && (
                        <div className="absolute top-12 left-0 z-50 p-3 bg-white rounded-2xl shadow-2xl border border-gray-200 w-64 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-gray-600 border-b pb-1.5">
                            <span>Select Icon / Emoji</span>
                            <button
                              type="button"
                              onClick={() => setActiveIconPickerIndex(null)}
                              className="text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <FaTimes />
                            </button>
                          </div>
                          <div className="grid grid-cols-5 gap-1.5">
                            {POPULAR_MENU_ICONS.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                  handleUpdateMenuItem(index, "icon", emoji);
                                  setActiveIconPickerIndex(null);
                                }}
                                className="w-10 h-10 rounded-xl hover:bg-yellow-100 flex items-center justify-center text-xl transition cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5">
                            <input
                              type="text"
                              value={item.icon?.startsWith("data:") ? "" : item.icon}
                              onChange={(e) =>
                                handleUpdateMenuItem(index, "icon", e.target.value)
                              }
                              placeholder="Or type custom emoji..."
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                            />
                            {item.icon && (
                              <button
                                type="button"
                                onClick={() => handleUpdateMenuItem(index, "icon", "")}
                                className="text-[10px] text-red-500 hover:underline shrink-0 cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>

                          {/* Upload Custom Icon Image Button */}
                          <div className="pt-1.5 border-t border-gray-100">
                            <label className="flex items-center justify-center gap-2 w-full py-2 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 hover:border-green-500 rounded-xl text-xs font-black transition cursor-pointer shadow-sm">
                              <FaUpload className="text-xs" />
                              <span>Upload Icon Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleMenuIconUpload(index, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Menu Item Name */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase">
                        Menu Title
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleUpdateMenuItem(index, "name", e.target.value)}
                        placeholder="e.g. হোম / অফার"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {/* Menu Item Link / Target */}
                    <div className="w-full md:w-52">
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase">
                          Link / Section Anchor
                        </label>
                        {["#home", "#varieties", "#about", "#reviews", "#order"].includes(item.href) && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                            Fixed System Anchor
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 border transition ${
                          ["#home", "#varieties", "#about", "#reviews", "#order"].includes(item.href)
                            ? "bg-gray-100/90 border-gray-300 text-gray-500 cursor-not-allowed shadow-inner"
                            : "bg-gray-50 border-gray-200 text-gray-800 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20"
                        }`}
                        title={
                          ["#home", "#varieties", "#about", "#reviews", "#order"].includes(item.href)
                            ? "This is a fixed core section anchor for home page smooth scrolling (View-Only)."
                            : "Enter custom section anchor or page URL"
                        }
                      >
                        <FaLink className="text-[10px] text-gray-400 shrink-0" />
                        <input
                          type="text"
                          value={item.href}
                          readOnly={["#home", "#varieties", "#about", "#reviews", "#order"].includes(item.href)}
                          onChange={(e) => {
                            if (!["#home", "#varieties", "#about", "#reviews", "#order"].includes(item.href)) {
                              handleUpdateMenuItem(index, "href", e.target.value);
                            }
                          }}
                          placeholder="#home or /page"
                          className={`w-full bg-transparent text-xs font-mono font-bold focus:outline-none ${
                            ["#home", "#varieties", "#about", "#reviews", "#order"].includes(item.href)
                              ? "text-gray-500 cursor-not-allowed select-all"
                              : "text-gray-800"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Icon Visibility Toggle (Show Icon On/Off) */}
                    <div className="flex items-center gap-2 self-start md:self-center shrink-0 pt-2 md:pt-0">
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-600 select-none bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 transition">
                        <input
                          type="checkbox"
                          checked={item.showIcon !== false}
                          onChange={(e) =>
                            handleUpdateMenuItem(index, "showIcon", e.target.checked)
                          }
                          className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                        />
                        <span>Icon Show</span>
                      </label>

                      {/* Delete Menu Item */}
                      <button
                        type="button"
                        onClick={() => handleDeleteMenuItem(index)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer ml-1"
                        title="Delete Menu Item"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 3: Action Buttons (Call Button & WhatsApp Number Settings) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Call Button Settings */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-sm shadow-sm">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-900 uppercase tracking-wide">
                        Header Call Button
                      </h4>
                      <p className="text-[11px] text-gray-400">Direct phone call CTA button</p>
                    </div>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-700 select-none bg-white px-2.5 py-1 rounded-xl border border-gray-200">
                    <input
                      type="checkbox"
                      checked={headerCallBtnShow}
                      onChange={(e) => {
                        setHeaderCallBtnShow(e.target.checked);
                        updateSettings({ headerCallBtnShow: e.target.checked });
                      }}
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                    />
                    <span>Active</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Button Label Text
                    </label>
                    <input
                      type="text"
                      value={headerCallBtnText}
                      onChange={(e) => {
                        setHeaderCallBtnText(e.target.value);
                        updateSettings({ headerCallBtnText: e.target.value });
                      }}
                      placeholder="কল করুন"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Phone Number to Dial
                    </label>
                    <input
                      type="text"
                      value={headerCallBtnPhone}
                      onChange={(e) => {
                        setHeaderCallBtnPhone(e.target.value);
                        updateSettings({ headerCallBtnPhone: e.target.value });
                      }}
                      placeholder="01749775030"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-800"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-2 text-xs">
                  <span className="text-gray-500 font-medium">Header CTA Preview:</span>
                  <div className="h-10 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-black shadow flex items-center gap-2 pointer-events-none">
                    <FaPhoneAlt className="text-xs" />
                    <span>{headerCallBtnText || "কল করুন"}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button Settings */}
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-base shadow-sm">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-900 uppercase tracking-wide">
                        Header WhatsApp Button
                      </h4>
                      <p className="text-[11px] text-gray-400">Direct WhatsApp messaging link</p>
                    </div>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-700 select-none bg-white px-2.5 py-1 rounded-xl border border-gray-200">
                    <input
                      type="checkbox"
                      checked={headerWhatsappShow}
                      onChange={(e) => {
                        setHeaderWhatsappShow(e.target.checked);
                        updateSettings({ headerWhatsappShow: e.target.checked });
                      }}
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                    />
                    <span>Active</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    WhatsApp Number (with country code, e.g. 8801749775030)
                  </label>
                  <input
                    type="text"
                    value={headerWhatsappNumber}
                    onChange={(e) => {
                      setHeaderWhatsappNumber(e.target.value);
                      updateSettings({ headerWhatsappNumber: e.target.value });
                    }}
                    placeholder="8801749775030"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-800"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Generates link: <span className="font-mono text-green-700">https://wa.me/{headerWhatsappNumber.replace(/[^0-9]/g, "")}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Part 4: Live Interactive Header Preview (Desktop + Mobile) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gray-900 text-white space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-white">
                      Live Header Preview
                    </h4>
                    <p className="text-xs text-gray-400">
                      Real-time interactive rendering of customer website header
                    </p>
                  </div>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewDevice("desktop");
                      setPreviewMobileDrawer(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                      previewDevice === "desktop"
                        ? "bg-white text-gray-950 font-black shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaDesktop /> <span>Desktop View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                      previewDevice === "mobile"
                        ? "bg-white text-gray-950 font-black shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt /> <span>Mobile View</span>
                  </button>
                </div>
              </div>

              {/* DESKTOP PREVIEW FRAME */}
              {previewDevice === "desktop" && (
                <div className="rounded-2xl border border-gray-700 bg-gray-800 overflow-hidden shadow-2xl">
                  {/* Browser chrome header */}
                  <div className="bg-gray-800 px-4 py-2 flex items-center gap-3 border-b border-gray-700 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    </div>
                    <div className="flex-1 bg-gray-900/60 h-3 rounded-full max-w-xs mx-auto border border-gray-700/40"></div>
                  </div>

                  {/* Rendered Live Desktop Navbar */}
                  <div className="bg-gradient-to-r from-amber-50/95 via-yellow-50/95 to-green-50/95 text-gray-900 px-6 py-3.5 border-b border-amber-200/60 shadow-sm flex items-center justify-between gap-4">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {websiteLogo ? (
                        <img
                          src={websiteLogo}
                          alt="Logo"
                          className={
                            headerBrandDisplay === "logo_and_text"
                              ? "w-10 h-10 object-contain rounded-xl bg-white shadow-sm border border-gray-200"
                              : "h-10 w-auto max-w-[180px] object-contain rounded-xl drop-shadow-sm"
                          }
                        />
                      ) : websiteFavicon ? (
                        <img
                          src={websiteFavicon}
                          alt="Favicon"
                          className="w-10 h-10 object-contain rounded-xl bg-white shadow-sm border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white text-base shadow">
                          🍃
                        </div>
                      )}
                      {headerBrandDisplay === "logo_and_text" && (
                        <div>
                          <h5 className="text-sm font-black text-green-900 leading-tight">
                            {siteName || "আমওয়ালা ভাইয়া"}
                          </h5>
                          {tagline && (
                            <p className="text-[10px] text-amber-700 font-semibold truncate max-w-[160px]">
                              {tagline}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-1 flex-wrap justify-center">
                      {headerNavLinks.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-bold text-gray-700 rounded-lg hover:bg-yellow-100 flex items-center gap-1 transition"
                        >
                          {item.showIcon !== false && item.icon && (
                            <span className="text-sm leading-none">{item.icon}</span>
                          )}
                          <span>{item.name}</span>
                        </span>
                      ))}
                    </div>

                    {/* Right Aligned Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {headerCallBtnShow && (
                        <div className="h-10 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-black shadow flex items-center gap-2">
                          <FaPhoneAlt className="text-xs" />
                          <span>{headerCallBtnText || "কল করুন"}</span>
                        </div>
                      )}
                      {headerWhatsappShow && (
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow text-xl">
                          <FaWhatsapp />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE PREVIEW FRAME */}
              {previewDevice === "mobile" && (
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-xs rounded-3xl border-4 border-gray-700 bg-gray-800 overflow-hidden shadow-2xl relative">
                    {/* Phone speaker/notch */}
                    <div className="h-5 bg-gray-800 flex justify-center items-center">
                      <div className="w-16 h-1 bg-gray-600 rounded-full" />
                    </div>

                    {/* Rendered Live Mobile Header */}
                    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 text-gray-900 px-3 py-2.5 border-b border-amber-200/60 flex items-center justify-between">
                      {/* Logo + Title */}
                      <div className="flex items-center gap-2 min-w-0">
                        {websiteLogo ? (
                          <img
                            src={websiteLogo}
                            alt="Logo"
                            className={
                              headerBrandDisplay === "logo_and_text"
                                ? "w-8 h-8 object-contain rounded-xl bg-white shadow-sm shrink-0"
                                : "h-8 w-auto max-w-[120px] object-contain rounded-lg shrink-0"
                            }
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs shrink-0 shadow">
                            🍃
                          </div>
                        )}
                        {headerBrandDisplay === "logo_and_text" && (
                          <span className="text-xs font-black text-green-950 truncate">
                            {siteName || "আমওয়ালা ভাইয়া"}
                          </span>
                        )}
                      </div>

                      {/* Right icons on mobile */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {headerWhatsappShow && (
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm shadow">
                            <FaWhatsapp />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setPreviewMobileDrawer(!previewMobileDrawer)}
                          className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-xs shadow cursor-pointer"
                          title="Toggle mobile menu preview"
                        >
                          {previewMobileDrawer ? <FaTimes /> : <FaBars />}
                        </button>
                      </div>
                    </div>

                    {/* Mobile Menu Drawer Preview */}
                    {previewMobileDrawer ? (
                      <div className="p-4 bg-white text-gray-800 space-y-2 border-b border-gray-200">
                        <p className="text-[10px] uppercase font-black tracking-wider text-gray-400 mb-2">
                          Mobile Navigation Links
                        </p>
                        {headerNavLinks.map((item, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-gray-50 flex items-center gap-2 text-xs font-bold text-gray-700"
                          >
                            {item.showIcon !== false && item.icon && (
                              <span className="text-sm">{item.icon}</span>
                            )}
                            <span>{item.name}</span>
                          </div>
                        ))}
                        {headerCallBtnShow && (
                          <div className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 mt-3 shadow">
                            <FaPhoneAlt className="text-[10px]" />
                            <span>{headerCallBtnText || "কল করুন"}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 bg-gray-50 text-center text-xs text-gray-400">
                        <p>Customer Website View</p>
                        <p className="text-[10px] mt-1 text-gray-500">
                          Click hamburger icon to preview mobile menu
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Hero Section Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                  <FaImage className="text-green-600" /> 2. Hero Section Settings
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Manage homepage Hero Section background (Single Image vs Carousel), main headline, subtitles, animated badges, and action buttons.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-black rounded-xl border border-amber-200 self-start sm:self-auto">
                Homepage Hero Top
              </span>
            </div>

            {/* Part 1: Background Mode Selector (Single Image vs Carousel) */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-2.5">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaDesktop className="text-amber-600" /> Hero Background Image Mode
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose between a single static image (without slider animations) or a multi-image sliding carousel.
                </p>
              </div>

              {/* Mode Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Single Image Mode */}
                <div
                  onClick={() => {
                    setHeroBgMode("single");
                    updateSettings({ heroBgMode: "single" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    heroBgMode === "single"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="heroBgMode"
                    checked={heroBgMode === "single"}
                    onChange={() => {
                      setHeroBgMode("single");
                      updateSettings({ heroBgMode: "single" });
                    }}
                    className="mt-0.5 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-black text-gray-900 block">Single Static Image</span>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Static hero image without slider controls, arrows, or slide transitions.
                    </p>
                  </div>
                </div>

                {/* Multi-image Carousel Mode */}
                <div
                  onClick={() => {
                    setHeroBgMode("carousel");
                    updateSettings({ heroBgMode: "carousel" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    heroBgMode === "carousel"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="heroBgMode"
                    checked={heroBgMode === "carousel"}
                    onChange={() => {
                      setHeroBgMode("carousel");
                      updateSettings({ heroBgMode: "carousel" });
                    }}
                    className="mt-0.5 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-black text-gray-900 block">Multi-image Carousel (Slider)</span>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Bortoman animation slider active thakbe jekhane multiple image slide hoye transition hobe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Single Image Upload Box */}
              {heroBgMode === "single" && (
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3">
                  <span className="text-xs font-black text-gray-800 uppercase tracking-wide block">
                    Single Background Image
                  </span>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-48 h-28 rounded-xl bg-gray-100 overflow-hidden border border-gray-300 shrink-0 shadow-inner">
                      <img
                        src={heroSingleImage || "/assets/one.avif"}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition">
                        <FaUpload /> <span>Upload Single Hero Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroSingleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-gray-400">
                        Recommended: High resolution 1920x1080 px image.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Carousel Slides List */}
              {heroBgMode === "carousel" && (
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-black text-gray-800 uppercase tracking-wide">
                      Carousel Slides List ({heroSlides.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleAddSlide}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaPlus className="text-[10px]" /> <span>Add Slide</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {heroSlides.map((slide, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={slide.url || "/assets/one.avif"}
                            alt={`Slide ${sIdx + 1}`}
                            className="w-16 h-12 object-cover rounded-lg border border-gray-300 shrink-0"
                          />
                          <label className="px-2.5 py-1 bg-white border border-gray-300 hover:border-green-600 text-[11px] font-bold rounded-lg cursor-pointer shrink-0">
                            Change Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleSlideImageUpload(sIdx, e.target.files?.[0])}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                          <input
                            type="text"
                            value={slide.subtitle || ""}
                            onChange={(e) => handleUpdateSlide(sIdx, "subtitle", e.target.value)}
                            placeholder="Top badge text e.g. সরাসরি বাগান থেকে"
                            className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={slide.title || ""}
                            onChange={(e) => handleUpdateSlide(sIdx, "title", e.target.value)}
                            placeholder="Slide title e.g. তাজা ও রসালো আম"
                            className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSlide(sIdx)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold p-1 self-end md:self-center cursor-pointer"
                          title="Delete slide"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Part 2: Hero Left Section Texts & Slogans */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-2.5">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaPaintBrush className="text-green-600" /> Hero Left Content & Badges
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Hero section-er baam pasher headline, subtitle, description ebong hotline number customize korun.
                </p>
              </div>

              {/* Text Mode Selector (Single vs Multi-slide Animated Texts) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Single Content Mode */}
                <div
                  onClick={() => {
                    setHeroTextMode("single");
                    updateSettings({ heroTextMode: "single" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    heroTextMode === "single"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="heroTextMode"
                    checked={heroTextMode === "single"}
                    onChange={() => {
                      setHeroTextMode("single");
                      updateSettings({ heroTextMode: "single" });
                    }}
                    className="mt-0.5 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-black text-gray-900 block">Single Text (Animation ছাড়া)</span>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Just akta fixed headline, subtitle ebong description show korbe, kono slide animation chara.
                    </p>
                  </div>
                </div>

                {/* Multi-slide Content Mode */}
                <div
                  onClick={() => {
                    setHeroTextMode("multi");
                    updateSettings({ heroTextMode: "multi" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    heroTextMode === "multi"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="heroTextMode"
                    checked={heroTextMode === "multi"}
                    onChange={() => {
                      setHeroTextMode("multi");
                      updateSettings({ heroTextMode: "multi" });
                    }}
                    className="mt-0.5 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-black text-gray-900 block">Multiple Texts (With Animation)</span>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Carousel slide-er sathe sathe headline o subtitle transition animation soho change hobe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Multi-Slide Navigation Toolbar (Active when heroTextMode is multi) */}
              {heroTextMode === "multi" && (
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-emerald-50 via-green-50 to-amber-50 rounded-2xl border border-green-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-green-700 text-white text-xs font-black shadow-sm">
                      Text Slide {currentTextSlideIndex + 1} of {heroTextSlides.length}
                    </span>
                    {/* Slide Dots */}
                    <div className="flex items-center gap-1.5">
                      {heroTextSlides.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setCurrentTextSlideIndex(dotIdx)}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            dotIdx === currentTextSlideIndex
                              ? "w-8 bg-green-600 shadow"
                              : "w-2.5 bg-gray-300 hover:bg-gray-400"
                          }`}
                          title={`Go to Slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddTextSlide}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <FaPlus className="text-[10px]" /> <span>Add Slide</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTextSlide(currentTextSlideIndex)}
                      disabled={heroTextSlides.length <= 1}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border transition cursor-pointer ${
                        heroTextSlides.length <= 1
                          ? "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"
                          : "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                      }`}
                      title="Delete this slide"
                    >
                      <FaTrash className="text-[10px]" /> <span>Delete Slide</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Text Fields Container with Left & Right Arrow Navigation (as circled in red by user) */}
              <div className="relative">
                {heroTextMode === "multi" && heroTextSlides.length > 1 && (
                  <>
                    {/* Left Navigation Arrow */}
                    <button
                      type="button"
                      onClick={handlePrevTextSlide}
                      title="Previous Slide"
                      className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-green-600 text-gray-700 hover:text-white border-2 border-gray-300 hover:border-green-600 shadow-xl flex items-center justify-center transition cursor-pointer group"
                    >
                      <FaChevronLeft className="text-sm group-hover:scale-125 transition" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                      type="button"
                      onClick={handleNextTextSlide}
                      title="Next Slide"
                      className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-green-600 text-gray-700 hover:text-white border-2 border-gray-300 hover:border-green-600 shadow-xl flex items-center justify-center transition cursor-pointer group"
                    >
                      <FaChevronRight className="text-sm group-hover:scale-125 transition" />
                    </button>
                  </>
                )}

                {(() => {
                  const activeSlideData =
                    heroTextMode === "multi"
                      ? heroTextSlides[currentTextSlideIndex] || heroTextSlides[0] || {}
                      : {
                          topBadgeText: heroTopBadgeText,
                          topBadgeIcon: heroTopBadgeIcon,
                          mainTitlePart1: heroMainTitlePart1,
                          mainTitlePart2: heroMainTitlePart2,
                          subtitleText: heroSubtitleText,
                          descriptionText: heroDescriptionText,
                        };

                  return (
                    <div className="space-y-4">
                      {/* Top Badge with Interactive Icon Selection Palette */}
                      <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-black text-gray-800 uppercase tracking-wide block">
                            Top Rounded Badge (যেমন: কেমিক্যাল মুক্ত)
                          </label>
                          {heroTextMode === "multi" && (
                            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                              Editing Slide #{currentTextSlideIndex + 1}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-1">
                            <label className="text-[11px] font-bold text-gray-600 block mb-1">
                              Badge Icon (Emoji / Image)
                            </label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setHeroBadgeIconPickerOpen(!heroBadgeIconPickerOpen)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 hover:border-green-500 rounded-xl text-xs font-black flex items-center justify-between cursor-pointer transition"
                              >
                                <span className="flex items-center gap-2">
                                  {activeSlideData.topBadgeIcon?.startsWith("data:") ||
                                  activeSlideData.topBadgeIcon?.startsWith("http") ||
                                  activeSlideData.topBadgeIcon?.startsWith("/") ? (
                                    <img
                                      src={activeSlideData.topBadgeIcon}
                                      alt="Badge Icon"
                                      className="w-5 h-5 object-contain rounded"
                                    />
                                  ) : (
                                    <span className="text-base">{activeSlideData.topBadgeIcon || "🍃"}</span>
                                  )}
                                  <span className="text-gray-600 font-semibold text-[11px]">Select Icon</span>
                                </span>
                                <FaSlidersH className="text-gray-400 text-xs" />
                              </button>

                              {/* Icon Selection Palette Popover */}
                              {heroBadgeIconPickerOpen && (
                                <div className="absolute top-full left-0 mt-1.5 z-40 bg-white rounded-2xl shadow-2xl border border-gray-300 p-3 w-64 space-y-2.5">
                                  <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                                    <span className="text-[11px] font-black text-gray-700">Choose Badge Icon</span>
                                    <button
                                      type="button"
                                      onClick={() => setHeroBadgeIconPickerOpen(false)}
                                      className="text-gray-400 hover:text-gray-600 text-xs"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                  {/* Emoji Grid */}
                                  <div className="grid grid-cols-5 gap-1.5">
                                    {["🍃", "🌿", "🥭", "⭐", "👑", "🔥", "✨", "💯", "🏷️", "✅", "📦", "🍎", "🌱", "🍋", "🥇"].map(
                                      (emoji, eIdx) => (
                                        <button
                                          key={eIdx}
                                          type="button"
                                          onClick={() => {
                                            handleUpdateCurrentTextSlide("topBadgeIcon", emoji);
                                            setHeroBadgeIconPickerOpen(false);
                                          }}
                                          className="w-9 h-9 rounded-lg hover:bg-yellow-100 text-lg flex items-center justify-center transition cursor-pointer"
                                        >
                                          {emoji}
                                        </button>
                                      )
                                    )}
                                  </div>
                                  {/* Custom Icon Image Upload */}
                                  <div className="pt-2 border-t border-gray-100">
                                    <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-yellow-100 text-gray-700 text-[11px] font-bold rounded-lg cursor-pointer transition">
                                      <FaUpload className="text-[10px]" /> <span>Upload Custom Icon</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleHeroBadgeIconUploadForSlide(e.target.files?.[0])}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-[11px] font-bold text-gray-600 block mb-1">Badge Text</label>
                            <input
                              type="text"
                              value={activeSlideData.topBadgeText || ""}
                              onChange={(e) => handleUpdateCurrentTextSlide("topBadgeText", e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold"
                              placeholder="কেমিক্যাল মুক্ত"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Main Headline & Subtitle */}
                      <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-3">
                        <label className="text-xs font-black text-gray-800 uppercase tracking-wide block">
                          Hero Titles & Paragraph
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-gray-600 block mb-1">
                              Main Title Part 1 (Yellow Highlight)
                            </label>
                            <input
                              type="text"
                              value={activeSlideData.mainTitlePart1 || ""}
                              onChange={(e) => handleUpdateCurrentTextSlide("mainTitlePart1", e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-yellow-700"
                              placeholder="আমওয়ালা"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-gray-600 block mb-1">
                              Main Title Part 2 (White Text)
                            </label>
                            <input
                              type="text"
                              value={activeSlideData.mainTitlePart2 || ""}
                              onChange={(e) => handleUpdateCurrentTextSlide("mainTitlePart2", e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold"
                              placeholder="ভাইয়া"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">
                            Quality Subtitle / Highlight (যেমন: প্রিমিয়াম কোয়ালিটি)
                          </label>
                          <input
                            type="text"
                            value={activeSlideData.subtitleText || ""}
                            onChange={(e) => handleUpdateCurrentTextSlide("subtitleText", e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-green-900"
                            placeholder="প্রিমিয়াম কোয়ালিটি"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-gray-600 block mb-1">
                            Hero Description Paragraph
                          </label>
                          <textarea
                            rows="3"
                            value={activeSlideData.descriptionText || ""}
                            onChange={(e) => handleUpdateCurrentTextSlide("descriptionText", e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                            placeholder="তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন..."
                          />
                        </div>

                        {/* Hotline Phone Number Input */}
                        <div className="pt-2 border-t border-gray-100">
                          <label className="text-xs font-black text-gray-800 flex items-center gap-1.5 mb-1">
                            <FaPhoneAlt className="text-green-600" /> Phone / Hotline Number
                          </label>
                          <input
                            type="text"
                            value={heroHotlinePhone}
                            onChange={(e) => {
                              setHeroHotlinePhone(e.target.value);
                              setRawHotlinePhone(e.target.value);
                              updateSettings({
                                heroHotlinePhone: e.target.value,
                                rawHotlinePhone: e.target.value,
                                hotlinePhone: e.target.value,
                              });
                            }}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-black text-green-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="০১৭৪৯-৭৭৫০৩০"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Part 3: Live Hero Section Preview */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gray-950 text-white space-y-4 shadow-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-white">
                      Live Hero Section Preview
                    </h4>
                    <p className="text-xs text-gray-400">
                      Real-time interactive rendering of homepage hero section
                    </p>
                  </div>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setHeroPreviewDevice("desktop")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      heroPreviewDevice === "desktop"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaDesktop /> <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroPreviewDevice("mobile")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      heroPreviewDevice === "mobile"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt /> <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Rendered Live Hero Preview based on heroPreviewDevice */}
              {(() => {
                const activeSlidePreview =
                  heroTextMode === "multi"
                    ? heroTextSlides[currentTextSlideIndex] || heroTextSlides[0] || {}
                    : {
                        topBadgeText: heroTopBadgeText,
                        topBadgeIcon: heroTopBadgeIcon,
                        mainTitlePart1: heroMainTitlePart1,
                        mainTitlePart2: heroMainTitlePart2,
                        subtitleText: heroSubtitleText,
                        descriptionText: heroDescriptionText,
                      };

                return heroPreviewDevice === "desktop" ? (
                  /* DESKTOP PREVIEW */
                  <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
                    {/* Live Website Header above Hero */}
                    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 text-gray-900 px-5 sm:px-6 py-3 border-b border-amber-200/80 flex items-center justify-between gap-4 shadow-sm">
                      {/* Logo & Brand Name */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        {websiteLogo ? (
                          <img
                            src={websiteLogo}
                            alt="Logo"
                            className={
                              headerBrandDisplay === "logo_and_text"
                                ? "w-9 h-9 object-contain rounded-xl bg-white shadow-sm border border-gray-200"
                                : "h-9 w-auto max-w-[160px] object-contain rounded-xl drop-shadow-sm"
                            }
                          />
                        ) : websiteFavicon ? (
                          <img
                            src={websiteFavicon}
                            alt="Favicon"
                            className="w-9 h-9 object-contain rounded-xl bg-white shadow-sm border border-gray-200"
                          />
                        ) : (
                          <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm shadow">
                            🍃
                          </div>
                        )}
                        {headerBrandDisplay === "logo_and_text" && (
                          <div>
                            <h5 className="text-sm font-black text-green-950 leading-tight">
                              {siteName || "আমওয়ালা ভাইয়া"}
                            </h5>
                            {tagline && (
                              <p className="text-[10px] text-amber-800 font-semibold truncate max-w-[170px]">
                                {tagline}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Nav Links */}
                      <div className="hidden md:flex items-center gap-1.5 flex-wrap justify-center">
                        {headerNavLinks.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-bold text-gray-700 rounded-lg hover:bg-yellow-100 flex items-center gap-1 transition"
                          >
                            {item.showIcon !== false && item.icon && (
                              <span className="text-xs leading-none">{item.icon}</span>
                            )}
                            <span>{item.name}</span>
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons: Hotline Call + WhatsApp */}
                      <div className="flex items-center gap-2 shrink-0">
                        {headerCallBtnShow && (
                          <div className="h-8 sm:h-9 px-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-black shadow flex items-center gap-1.5">
                            <FaPhoneAlt className="text-[11px]" />
                            <span>{headerCallBtnText || "কল করুন"}</span>
                          </div>
                        )}
                        {headerWhatsappShow && (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-500 text-white rounded-full flex items-center justify-center shadow text-base">
                            <FaWhatsapp />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop Hero Section */}
                    <div
                      className="relative min-h-[380px] p-6 lg:p-8 flex items-center bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          heroBgMode === "single"
                            ? heroSingleImage || "/assets/one.avif"
                            : heroSlides[0]?.url || "/assets/one.avif"
                        })`,
                      }}
                    >
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

                      {/* Content Grid */}
                      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* Left Column Preview */}
                        <div className="md:col-span-7 space-y-3 text-left">
                          {/* Badge */}
                          <div className="inline-flex items-center bg-yellow-500/95 rounded-full px-3 py-1 text-xs font-black text-green-950 shadow">
                            {activeSlidePreview.topBadgeIcon?.startsWith("data:") ||
                            activeSlidePreview.topBadgeIcon?.startsWith("http") ||
                            activeSlidePreview.topBadgeIcon?.startsWith("/") ? (
                              <img
                                src={activeSlidePreview.topBadgeIcon}
                                alt=""
                                className="w-3.5 h-3.5 object-contain inline mr-1.5"
                              />
                            ) : (
                              <span className="mr-1.5 text-green-950 font-bold">
                                {activeSlidePreview.topBadgeIcon || "🍃"}
                              </span>
                            )}
                            <span>{activeSlidePreview.topBadgeText || "কেমিক্যাল মুক্ত"}</span>
                          </div>

                          {/* Headline */}
                          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                            <span className="text-yellow-400">{activeSlidePreview.mainTitlePart1 || "আমওয়ালা"}</span>{" "}
                            <span>{activeSlidePreview.mainTitlePart2 || "ভাইয়া"}</span>
                          </h2>

                          {/* Subtitle */}
                          <p className="text-sm sm:text-base font-bold text-yellow-300">
                            {activeSlidePreview.subtitleText || "প্রিমিয়াম কোয়ালিটি"}
                          </p>

                          {/* Description */}
                          <p className="text-xs text-gray-300 leading-relaxed max-w-md line-clamp-3">
                            {activeSlidePreview.descriptionText ||
                              "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।"}
                          </p>

                          {/* Trust Badges */}
                          <div className="flex flex-wrap gap-2 pt-1 text-xs">
                            <span className="px-2.5 py-1 rounded-lg bg-green-600/90 text-white font-bold flex items-center gap-1 shadow-sm">
                              <FaCheckCircle className="text-yellow-400 text-[10px]" /> ১০০% রেকমেন্ডেড
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-yellow-500/95 text-green-950 font-bold flex items-center gap-1 shadow-sm">
                              <FaStar className="text-green-900 text-[10px]" /> ৬+ গ্রাহক রিভিউ
                            </span>
                          </div>

                          {/* Highlights & Hotline */}
                          <div className="pt-2 text-[11px] text-gray-300 flex flex-wrap items-center gap-3">
                            <span>🚚 সারা দেশ ডেলিভারি</span>
                            <span>🍃 কেমিক্যাল ফ্রি</span>
                            <span className="text-amber-300 font-black">
                              📞 {heroHotlinePhone || "০১৭৪৯-৭৭৫০৩০"}
                            </span>
                          </div>
                        </div>

                        {/* Right Column Order Form Card Preview */}
                        <div className="md:col-span-5">
                          <div className="bg-white/95 rounded-2xl p-4 text-gray-800 shadow-2xl border-2 border-amber-300/80 space-y-2 text-xs">
                            <div className="text-center border-b-2 border-yellow-400 pb-1.5">
                              <h5 className="font-black text-green-800 text-sm flex items-center justify-center gap-1">
                                <span>🍋</span> <span>অর্ডার ফর্ম</span>
                              </h5>
                              <p className="text-[10px] text-gray-500">
                                আমের প্রি-অর্ডার করতে নিচের তথ্য দিন
                              </p>
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-7 bg-yellow-50/80 rounded-lg border border-amber-200 px-2.5 flex items-center text-gray-400 text-[11px]">
                                আপনার সম্পূর্ণ নাম *
                              </div>
                              <div className="h-7 bg-yellow-50/80 rounded-lg border border-amber-200 px-2.5 flex items-center text-gray-400 text-[11px]">
                                মোবাইল নম্বর (১১ ডিজিট) *
                              </div>
                              <div className="h-7 bg-yellow-50/90 rounded-lg border-2 border-amber-300 px-2.5 flex items-center justify-between text-gray-800 font-bold text-[11px]">
                                <span className="text-green-900">🥭 পছন্দের পণ্য নির্বাচন করুন *</span>
                                <span className="text-[10px] text-gray-500">▼</span>
                              </div>
                              <div className="h-7 bg-yellow-50/80 rounded-lg border border-amber-200 px-2.5 flex items-center text-gray-400 text-[11px]">
                                সম্পূর্ণ ডেলিভারি ঠিকানা *
                              </div>
                            </div>
                            <div className="p-2 bg-green-50 rounded-lg border border-green-200 flex justify-between items-center font-black text-green-900 text-xs">
                              <span>সর্বমোট মূল্য:</span>
                              <span className="text-green-700 font-black text-sm">৳ ০</span>
                            </div>
                            <div className="h-8 bg-gradient-to-r from-yellow-500 via-amber-500 to-green-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">
                              প্রি-অর্ডার নিশ্চিত করুন
                            </div>
                            <p className="text-[9px] text-center text-gray-500 font-semibold pt-0.5">
                              🔒 শতভাগ ক্যাশ অন ডেলিভারি | অগ্রিম টাকা নেওয়া হয় না
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SMARTPHONE FRAME MOCKUP (MOBILE PREVIEW) */
                  <div className="flex justify-center py-2">
                    <div className="w-full max-w-[340px] rounded-[38px] border-[6px] border-gray-700 bg-gray-950 shadow-2xl overflow-hidden relative">
                      {/* Phone Camera / Speaker Notch */}
                      <div className="h-6 bg-gray-950 flex justify-center items-center">
                        <div className="w-20 h-3.5 bg-gray-900 rounded-full flex items-center justify-end pr-2 border border-gray-800">
                          <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                        </div>
                      </div>

                      {/* Rendered Live Mobile Header */}
                      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 text-gray-900 px-3 py-2 border-b border-amber-200/60 flex items-center justify-between">
                        {/* Logo + Title */}
                        <div className="flex items-center gap-2 min-w-0">
                          {websiteLogo ? (
                            <img
                              src={websiteLogo}
                              alt="Logo"
                              className={
                                headerBrandDisplay === "logo_and_text"
                                  ? "w-7 h-7 object-contain rounded-lg bg-white shadow-sm shrink-0"
                                  : "h-7 w-auto max-w-[100px] object-contain rounded shrink-0"
                              }
                            />
                          ) : (
                            <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white text-[10px] shrink-0 shadow">
                              🍃
                            </div>
                          )}
                          {headerBrandDisplay === "logo_and_text" && (
                            <span className="text-[11px] font-black text-green-950 truncate">
                              {siteName || "আমওয়ালা ভাইয়া"}
                            </span>
                          )}
                        </div>

                        {/* Right icons on mobile */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {headerWhatsappShow && (
                            <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs shadow">
                              <FaWhatsapp />
                            </div>
                          )}
                          <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-green-500 text-white rounded-full flex items-center justify-center text-[10px] shadow">
                            <FaBars />
                          </div>
                        </div>
                      </div>

                      {/* Hero Mobile Screen Preview */}
                      <div
                        className="relative bg-cover bg-center p-4 space-y-4"
                        style={{
                          backgroundImage: `url(${
                            heroBgMode === "single"
                              ? heroSingleImage || "/assets/one.avif"
                              : heroSlides[0]?.url || "/assets/one.avif"
                          })`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />

                        <div className="relative z-10 space-y-3 text-center">
                          {/* Top Badge */}
                          <div className="inline-flex items-center bg-yellow-500/95 rounded-full px-2.5 py-0.5 text-[10px] font-black text-green-950 shadow">
                            {activeSlidePreview.topBadgeIcon?.startsWith("data:") ||
                            activeSlidePreview.topBadgeIcon?.startsWith("http") ||
                            activeSlidePreview.topBadgeIcon?.startsWith("/") ? (
                              <img
                                src={activeSlidePreview.topBadgeIcon}
                                alt=""
                                className="w-3 h-3 object-contain inline mr-1"
                              />
                            ) : (
                              <span className="mr-1 text-green-950 font-bold">
                                {activeSlidePreview.topBadgeIcon || "🍃"}
                              </span>
                            )}
                            <span>{activeSlidePreview.topBadgeText || "কেমিক্যাল মুক্ত"}</span>
                          </div>

                          {/* Headline */}
                          <h2 className="text-xl font-black text-white leading-tight">
                            <span className="text-yellow-400">{activeSlidePreview.mainTitlePart1 || "আমওয়ালা"}</span>{" "}
                            <span>{activeSlidePreview.mainTitlePart2 || "ভাইয়া"}</span>
                          </h2>

                          {/* Subtitle */}
                          <p className="text-xs font-bold text-yellow-300">
                            {activeSlidePreview.subtitleText || "প্রিমিয়াম কোয়ালিটি"}
                          </p>

                          {/* Description */}
                          <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2 px-2">
                            {activeSlidePreview.descriptionText ||
                              "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।"}
                          </p>

                          {/* Highlights & Hotline */}
                          <div className="flex flex-wrap justify-center items-center gap-1.5 text-[10px] text-gray-200">
                            <span className="bg-green-700/80 px-2 py-0.5 rounded-full">১০০% খাঁটি</span>
                            <span className="bg-amber-600/80 px-2 py-0.5 rounded-full">৬+ রিভিউ</span>
                            <span className="text-amber-300 font-bold">📞 {heroHotlinePhone || "০১৭৪৯-৭৭৫০৩০"}</span>
                          </div>

                          {/* Mobile Order Form Card */}
                          <div className="bg-white/95 rounded-2xl p-3 text-gray-800 shadow-xl border border-amber-300 space-y-2 text-left mt-2">
                            <div className="text-center border-b border-yellow-400 pb-1">
                              <h5 className="font-black text-green-800 text-xs">
                                🍋 অর্ডার ফর্ম
                              </h5>
                              <p className="text-[9px] text-gray-500">
                                আমের প্রি-অর্ডার করতে ফর্মটি পূরণ করুন
                              </p>
                            </div>
                            <div className="space-y-1.5 text-[10px]">
                              <div className="h-6 bg-yellow-50 rounded border border-amber-200 px-2 flex items-center text-gray-400">
                                আপনার নাম *
                              </div>
                              <div className="h-6 bg-yellow-50 rounded border border-amber-200 px-2 flex items-center text-gray-400">
                                মোবাইল নম্বর *
                              </div>
                              <div className="h-6 bg-yellow-50/90 rounded border border-amber-300 px-2 flex items-center justify-between text-gray-800 font-bold">
                                <span>পছন্দের পণ্য নির্বাচন করুন *</span>
                                <span>▼</span>
                              </div>
                              <div className="h-6 bg-yellow-50 rounded border border-amber-200 px-2 flex items-center text-gray-400">
                                সম্পূর্ণ ঠিকানা *
                              </div>
                            </div>
                            <div className="p-1.5 bg-green-50 rounded border border-green-200 flex justify-between items-center font-black text-green-900 text-[10px]">
                              <span>সর্বমোট:</span>
                              <span className="text-green-700">৳ ০</span>
                            </div>
                            <div className="h-7 bg-gradient-to-r from-yellow-500 to-green-600 rounded-lg flex items-center justify-center text-white font-black text-[11px] shadow">
                              প্রি-অর্ডার নিশ্চিত করুন
                            </div>
                          </div>
                        </div>

                        {/* Bottom home bar */}
                        <div className="pt-2 flex justify-center">
                          <div className="w-28 h-1 bg-gray-500 rounded-full opacity-60" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        

          {/* Section 3: Product Section Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            {/* Header Title Bar */}
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                  <FaBoxes className="text-green-600" /> 3. Product Section Settings
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customize product catalog section title, card design presets, 8-product display mode, and 'Show More' / 'Collapse' buttons.
                </p>
              </div>
            </div>

            {/* Part 1: Section Header & Subtitle */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-2.5">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaPaintBrush className="text-amber-600" /> Section Title & Subheading
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customize section title, title icon, and subheading description.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Title Icon */}
                <div className="sm:col-span-1">
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    Title Icon (Emoji / Symbol)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setProductIconPickerOpen(!productIconPickerOpen)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 hover:border-green-500 rounded-xl text-xs font-black flex items-center justify-between cursor-pointer transition"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{productSectionTitleIcon || "🥭"}</span>
                        <span className="text-gray-600 font-semibold text-[11px]">Select Icon</span>
                      </span>
                      <FaSlidersH className="text-gray-400 text-xs" />
                    </button>

                    {productIconPickerOpen && (
                      <div className="absolute top-full left-0 mt-1.5 z-40 bg-white rounded-2xl shadow-2xl border border-gray-300 p-3 w-64 space-y-2.5">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                          <span className="text-[11px] font-black text-gray-700">Choose Section Icon</span>
                          <button
                            type="button"
                            onClick={() => setProductIconPickerOpen(false)}
                            className="text-gray-400 hover:text-gray-600 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {["🥭", "🍃", "🌿", "⭐", "📦", "🔥", "✨", "👑", "🏷️", "🍈", "🍯", "🍇", "🍎", "🌱", "🥇"].map(
                            (emoji, eIdx) => (
                              <button
                                key={eIdx}
                                type="button"
                                onClick={() => {
                                  setProductSectionTitleIcon(emoji);
                                  updateSettings({ productSectionTitleIcon: emoji });
                                  setProductIconPickerOpen(false);
                                }}
                                className="w-9 h-9 rounded-lg hover:bg-yellow-100 text-lg flex items-center justify-center transition cursor-pointer"
                              >
                                {emoji}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section Title */}
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    Section Title Text
                  </label>
                  <input
                    type="text"
                    value={productSectionTitle}
                    onChange={(e) => {
                      setProductSectionTitle(e.target.value);
                      updateSettings({ productSectionTitle: e.target.value });
                    }}
                    placeholder="Mango Varieties & Prices"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Section Subtitle */}
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">
                  Section Subheading Text
                </label>
                <textarea
                  rows="2"
                  value={productSectionSubtitle}
                  onChange={(e) => {
                    setProductSectionSubtitle(e.target.value);
                    updateSettings({ productSectionSubtitle: e.target.value });
                  }}
                  placeholder="Best seasonal mangoes from Rajshahi, Chuadanga, and Naogaon. Choose your favorite variety from below."
                  className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  This text will render balanced and responsively on the storefront without awkward word wraps.
                </p>
              </div>
            </div>

            {/* Part 2: Card Design Preset Selector */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-2.5">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaPalette className="text-green-600" /> Product Card Design Presets
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose from 4 distinct card presets. Each features unique colors, borders, badges, and button styling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Preset 1: Classic Warm (Warm Amber & Gold) */}
                <div
                  onClick={() => {
                    setProductCardPreset("classic");
                    updateSettings({ productCardPreset: "classic" });
                  }}
                  className={`p-4 rounded-3xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    productCardPreset === "classic"
                      ? "border-amber-500 bg-amber-50/90 shadow-lg ring-2 ring-amber-400/30"
                      : "border-gray-200 bg-white hover:border-amber-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black text-amber-950">1. Classic Warm</span>
                      <input
                        type="radio"
                        name="productCardPreset"
                        checked={productCardPreset === "classic"}
                        onChange={() => {
                          setProductCardPreset("classic");
                          updateSettings({ productCardPreset: "classic" });
                        }}
                        className="text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                    </div>
                    {/* Mini Visual Preview */}
                    <div className="p-2.5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 space-y-2 shadow-sm text-[10px]">
                      <div className="h-12 bg-amber-200/70 rounded-xl relative flex items-center justify-center text-amber-900 font-bold overflow-hidden">
                        <span className="text-[9px]">Inset Image</span>
                        <span className="absolute top-1 left-1 bg-yellow-400 text-green-950 font-black text-[8px] px-1.5 py-0.2 rounded-full">
                          🥭 Fresh
                        </span>
                      </div>
                      <div className="font-bold text-green-950 truncate">Product Name...</div>
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[9px] border border-amber-200">
                          ৳ 180/kg
                        </span>
                      </div>
                      <div className="h-5 bg-gradient-to-r from-amber-500 to-green-600 rounded-full text-white text-[9px] font-black flex items-center justify-center shadow">
                        Pre-Order
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-900 font-medium mt-2.5">
                    Warm amber card, inset image, and golden pill button
                  </p>
                </div>

                {/* Preset 2: Modern Minimal (Clean Retail) */}
                <div
                  onClick={() => {
                    setProductCardPreset("modern");
                    updateSettings({ productCardPreset: "modern" });
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    productCardPreset === "modern"
                      ? "border-emerald-600 bg-slate-50 shadow-lg ring-2 ring-emerald-500/20"
                      : "border-gray-200 bg-white hover:border-slate-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black text-slate-900">2. Modern Minimal</span>
                      <input
                        type="radio"
                        name="productCardPreset"
                        checked={productCardPreset === "modern"}
                        onChange={() => {
                          setProductCardPreset("modern");
                          updateSettings({ productCardPreset: "modern" });
                        }}
                        className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>
                    {/* Mini Visual Preview */}
                    <div className="rounded-lg bg-white border border-slate-300 space-y-1.5 shadow-sm text-[10px] overflow-hidden p-2">
                      <div className="h-12 bg-slate-100 -mx-2 -mt-2 relative flex items-center justify-center text-slate-500 font-bold">
                        <span className="text-[9px]">Flush Image</span>
                        <span className="absolute top-1 right-1 bg-slate-900/80 text-white font-bold text-[8px] px-1 rounded">
                          In Stock
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 truncate pt-1">Product Name...</div>
                      <div className="text-slate-950 font-black text-[11px]">৳ 180/kg</div>
                      <div className="h-5 bg-emerald-600 rounded-md text-white text-[9px] font-bold flex items-center justify-center">
                        Pre-Order
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium mt-2.5">
                    Studio white retail card, flush image, and sleek button
                  </p>
                </div>

                {/* Preset 3: Royal Dark Luxury (Black & Gold) */}
                <div
                  onClick={() => {
                    setProductCardPreset("elevated");
                    updateSettings({ productCardPreset: "elevated" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                    productCardPreset === "elevated"
                      ? "border-amber-400 bg-gray-900 text-white shadow-xl ring-2 ring-yellow-400/30"
                      : "border-gray-700 bg-gray-900 text-white hover:border-amber-500"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black text-amber-300">3. Royal Dark Luxury</span>
                      <input
                        type="radio"
                        name="productCardPreset"
                        checked={productCardPreset === "elevated"}
                        onChange={() => {
                          setProductCardPreset("elevated");
                          updateSettings({ productCardPreset: "elevated" });
                        }}
                        className="text-amber-400 focus:ring-amber-400 cursor-pointer"
                      />
                    </div>
                    {/* Mini Visual Preview */}
                    <div className="p-2.5 rounded-xl bg-gradient-to-b from-gray-950 to-slate-950 border border-amber-500/60 space-y-2 shadow-md text-[10px] text-white">
                      <div className="h-12 bg-gray-800 rounded-lg relative flex items-center justify-center text-amber-300 font-bold border border-amber-500/30">
                        <span className="text-[9px]">Dark Image</span>
                        <span className="absolute top-1 left-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 font-black text-[8px] px-1.5 py-0.2 rounded-full">
                          👑 Premium
                        </span>
                      </div>
                      <div className="font-bold text-white truncate">Product Name...</div>
                      <div className="text-yellow-400 font-black text-[11px]">৳ 180/kg</div>
                      <div className="h-5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-950 font-black rounded-lg text-[9px] flex items-center justify-center shadow">
                        Pre-Order
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-300/80 font-medium mt-2.5">
                    Royal black with glittering gold exclusive luxury aesthetic
                  </p>
                </div>

                {/* Preset 4: Eco Organic (Sage Pastel & Dashed) */}
                <div
                  onClick={() => {
                    setProductCardPreset("bordered");
                    updateSettings({ productCardPreset: "bordered" });
                  }}
                  className={`p-4 rounded-[26px] border-2 cursor-pointer transition flex flex-col justify-between ${
                    productCardPreset === "bordered"
                      ? "border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-500/20"
                      : "border-gray-200 bg-white hover:border-emerald-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black text-emerald-950">4. Eco Organic</span>
                      <input
                        type="radio"
                        name="productCardPreset"
                        checked={productCardPreset === "bordered"}
                        onChange={() => {
                          setProductCardPreset("bordered");
                          updateSettings({ productCardPreset: "bordered" });
                        }}
                        className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>
                    {/* Mini Visual Preview */}
                    <div className="p-2.5 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-400 space-y-2 text-[10px]">
                      <div className="h-12 bg-emerald-200/60 rounded-xl relative flex items-center justify-center text-emerald-900 font-bold">
                        <span className="text-[9px]">Eco Frame</span>
                        <span className="absolute top-1 left-1 bg-emerald-700 text-white font-bold text-[8px] px-1.5 py-0.2 rounded-full">
                          🌿 Organic
                        </span>
                      </div>
                      <div className="font-bold text-emerald-950 truncate">Product Name...</div>
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[9px] border border-emerald-300">
                          ৳ 180/kg
                        </span>
                      </div>
                      <div className="h-5 bg-emerald-700 rounded-xl text-white text-[9px] font-black border-b-2 border-emerald-950 flex items-center justify-center shadow">
                        Pre-Order
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-900 font-medium mt-2.5">
                    Natural sage green, dashed borders, and 3D leaf button
                  </p>
                </div>
              </div>
            </div>

            {/* Part 3: Product Display Mode (Latest 8 vs Custom Selection) */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-2.5">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaThLarge className="text-emerald-600" /> Products Display Mode
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Display the latest 8 products automatically, or select specific featured products manually.
                </p>
              </div>

              {/* Mode Radios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Auto Mode */}
                <div
                  onClick={() => {
                    setProductDisplayMode("auto");
                    updateSettings({ productDisplayMode: "auto" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    productDisplayMode === "auto"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="productDisplayMode"
                    checked={productDisplayMode === "auto"}
                    onChange={() => {
                      setProductDisplayMode("auto");
                      updateSettings({ productDisplayMode: "auto" });
                    }}
                    className="mt-0.5 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-black text-gray-900 block">
                      Automatic (Latest 8 Products)
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Automatically shows the latest 8 products first; clicking 'Show More' progressively reveals more.
                    </p>
                  </div>
                </div>

                {/* Custom Selection Mode */}
                <div
                  onClick={() => {
                    setProductDisplayMode("custom");
                    updateSettings({ productDisplayMode: "custom" });
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3.5 ${
                    productDisplayMode === "custom"
                      ? "border-green-600 bg-green-50/70 shadow-sm ring-2 ring-green-500/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="productDisplayMode"
                    checked={productDisplayMode === "custom"}
                    onChange={() => {
                      setProductDisplayMode("custom");
                      updateSettings({ productDisplayMode: "custom" });
                    }}
                    className="mt-0.5 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-black text-gray-900 block">
                      Custom Selection (Manually Select Products)
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Select specific products from the checklist below to prioritize them in the catalog.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom Product Selection Checklist */}
              {productDisplayMode === "custom" && (
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                    <div>
                      <span className="text-xs font-black text-gray-800 uppercase tracking-wide block">
                        Select Products to Feature
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Selected: <strong className="text-green-700 font-black">{productCustomIds.length}</strong> products
                      </span>
                    </div>

                    {/* Search box for products */}
                    <input
                      type="text"
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      placeholder="Search product by name..."
                      className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-56"
                    />
                  </div>

                  {/* Product Cards List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {(products || [])
                      .filter((p) => {
                        if (!productSearchQuery) return true;
                        const q = productSearchQuery.toLowerCase();
                        return (
                          p.name_bn?.toLowerCase().includes(q) ||
                          p.name_en?.toLowerCase().includes(q) ||
                          p.category?.toLowerCase().includes(q)
                        );
                      })
                      .map((product) => {
                        const pid = String(product._id || product.id);
                        const isSelected = productCustomIds.includes(pid);

                        return (
                          <div
                            key={pid}
                            onClick={() => handleToggleCustomProduct(pid)}
                            className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                              isSelected
                                ? "bg-green-50/80 border-green-500 shadow-sm"
                                : "bg-gray-50/60 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleCustomProduct(pid)}
                              className="rounded text-green-600 focus:ring-green-500 cursor-pointer shrink-0"
                            />
                            <img
                              src={product.image || "/assets/mangoes/m1.jpg"}
                              alt={product.name_bn}
                              className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-gray-900 truncate">
                                {product.name_bn || product.name_en}
                              </h5>
                              <p className="text-[10px] text-amber-700 font-semibold">
                                ৳ {product.price_per_unit || product.price || 0}/{product.unit || "kg"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Part 4: Dynamic "Show More" & "Collapse" Button Settings */}
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-4">
              <div className="border-b border-gray-200/60 pb-2.5">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <FaSlidersH className="text-amber-600" /> "Show More" & "Collapse" Button Texts
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customize the pagination button text beneath the product catalog grid.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    "Show More" Button Text
                  </label>
                  <input
                    type="text"
                    value={productShowMoreBtnText}
                    onChange={(e) => {
                      setProductShowMoreBtnText(e.target.value);
                      updateSettings({ productShowMoreBtnText: e.target.value });
                    }}
                    placeholder="Show More Products"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Clicking will load the next batch of products.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">
                    "Collapse" Button Text
                  </label>
                  <input
                    type="text"
                    value={productCollapseBtnText}
                    onChange={(e) => {
                      setProductCollapseBtnText(e.target.value);
                      updateSettings({ productCollapseBtnText: e.target.value });
                    }}
                    placeholder="Collapse Products"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Displays after all products are shown; clicking collapses back to 8 items.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 5: Live Product Section Preview */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gray-950 text-white space-y-4 shadow-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-white">
                      Live Product Section Preview
                    </h4>
                    <p className="text-xs text-gray-400">
                      Real-time interactive rendering of homepage products section
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 bg-green-900/60 text-green-300 rounded-lg border border-green-700/50">
                    Preset: {productCardPreset.toUpperCase()}
                  </span>

                  {/* Device Switcher (Desktop & Mobile View) */}
                  <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setProductPreviewDevice("desktop")}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                        productPreviewDevice === "desktop"
                          ? "bg-green-600 text-white shadow font-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FaDesktop /> <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProductPreviewDevice("mobile")}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                        productPreviewDevice === "mobile"
                          ? "bg-green-600 text-white shadow font-black"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <FaMobileAlt /> <span>Mobile</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Rendered Live Product Preview based on productPreviewDevice */}
              {productPreviewDevice === "desktop" ? (
                /* DESKTOP PREVIEW BOX */
                <div className="rounded-2xl border border-gray-800 bg-amber-50/10 p-5 space-y-6">
                  {/* Header Preview */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white inline-flex items-center justify-center gap-2 border-b-4 border-yellow-400 pb-1 px-3">
                      <span>{productSectionTitleIcon || "🥭"}</span>
                      <span>{productSectionTitle || "Mango Varieties & Prices"}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
                      {productSectionSubtitle ||
                        "Best seasonal mangoes from Rajshahi, Chuadanga, and Naogaon. Choose your favorite variety from below."}
                    </p>
                  </div>

                  {/* Sample Card Preview Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { name: "Gopalbhog", price: "৳ 180/kg", dates: "Chuadanga: 13 May, Naogaon: 30 May" },
                      { name: "Himsagar / Khirsapat", price: "৳ 220/kg", dates: "Chuadanga: 13 May, Rajshahi: 30 May" },
                      { name: "Langra", price: "৳ 160/kg", dates: "Chuadanga: 28 May, Naogaon: 10 June" },
                      { name: "Amrapali", price: "৳ 190/kg", dates: "Chuadanga: 5 June, Rajshahi: 15 June" },
                    ].map((item, idx) => (
                      <div key={idx} className="h-full flex flex-col">
                        {/* Preset 1: Classic Warm */}
                        {productCardPreset === "classic" && (
                          <div className="flex flex-col h-full rounded-3xl bg-amber-50/90 border-2 border-amber-300 shadow-md text-gray-800 overflow-hidden">
                            <div className="p-2.5 pb-0">
                              <div className="h-32 bg-amber-100 rounded-2xl relative flex items-center justify-center text-amber-900 font-bold overflow-hidden shadow-inner">
                                <span>🥭 Inset Image</span>
                                <span className="absolute top-2 left-2 bg-yellow-400 text-green-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                                  Garden Fresh
                                </span>
                              </div>
                            </div>
                            <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                              <div>
                                <h5 className="font-black text-sm text-green-950 truncate">{item.name}</h5>
                                <div className="mt-1">
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs border border-amber-200">
                                    {item.price}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{item.dates}</p>
                              </div>
                              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-green-800 font-bold">Details</span>
                                <span className="px-3.5 py-1 text-[11px] text-white font-black rounded-full bg-gradient-to-r from-amber-500 to-green-600 shadow">
                                  Pre-Order
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Preset 2: Modern Minimal */}
                        {productCardPreset === "modern" && (
                          <div className="flex flex-col h-full rounded-xl bg-white border border-slate-200 shadow-sm text-gray-900 overflow-hidden">
                            <div className="h-32 bg-slate-100 relative flex items-center justify-center text-slate-500 font-bold">
                              <span>Flush Image</span>
                              <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                                In Stock
                              </span>
                            </div>
                            <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                              <div>
                                <h5 className="font-bold text-sm text-slate-900 truncate">{item.name}</h5>
                                <p className="text-sm font-black text-slate-950 mt-0.5">{item.price}</p>
                                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{item.dates}</p>
                              </div>
                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-slate-600 font-semibold">View</span>
                                <span className="px-3.5 py-1 text-[11px] text-white font-bold rounded-lg bg-emerald-600">
                                  Pre-Order
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Preset 3: Royal Dark Luxury */}
                        {productCardPreset === "elevated" && (
                          <div className="flex flex-col h-full rounded-2xl bg-gradient-to-b from-gray-950 to-slate-950 border border-amber-500/60 shadow-xl text-white overflow-hidden">
                            <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
                            <div className="h-32 bg-gray-900 relative flex items-center justify-center text-amber-300 font-bold">
                              <span>Dark Image</span>
                              <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                                👑 Premium
                              </span>
                            </div>
                            <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                              <div>
                                <h5 className="font-black text-sm text-white truncate">{item.name}</h5>
                                <p className="text-sm font-black text-yellow-400 mt-0.5 drop-shadow">{item.price}</p>
                                <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{item.dates}</p>
                              </div>
                              <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-yellow-400 font-bold">Details</span>
                                <span className="px-3.5 py-1 text-[11px] text-gray-950 font-black rounded-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 shadow">
                                  Pre-Order
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Preset 4: Eco Organic */}
                        {productCardPreset === "bordered" && (
                          <div className="flex flex-col h-full rounded-[26px] bg-emerald-50 border-2 border-dashed border-emerald-400 shadow-sm text-emerald-950 overflow-hidden">
                            <div className="p-2.5 pb-0">
                              <div className="h-32 bg-emerald-100/70 rounded-xl relative flex items-center justify-center text-emerald-900 font-bold">
                                <span>🌿 Eco Frame</span>
                                <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                                  100% Organic
                                </span>
                              </div>
                            </div>
                            <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
                              <div>
                                <h5 className="font-black text-sm text-emerald-950 truncate">{item.name}</h5>
                                <div className="mt-1">
                                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                                    {item.price}
                                  </span>
                                </div>
                                <p className="text-[10px] text-emerald-800 mt-1 line-clamp-1">{item.dates}</p>
                              </div>
                              <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-emerald-700 font-bold">Details</span>
                                <span className="px-3.5 py-1 text-[11px] text-white font-black rounded-xl bg-emerald-700 border-b-2 border-emerald-950 shadow">
                                  Pre-Order
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Live Preview Button */}
                  <div className="pt-2 flex justify-center">
                    <div className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-green-600 to-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2">
                      <span>{productShowMoreBtnText || "Show More Products"}</span>
                      <FaChevronDown className="text-[10px]" />
                    </div>
                  </div>
                </div>
              ) : (
                /* SMARTPHONE FRAME MOCKUP (MOBILE PREVIEW) */
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-[340px] rounded-[38px] border-[6px] border-gray-700 bg-gray-950 shadow-2xl overflow-hidden relative">
                    {/* Phone Camera / Speaker Notch */}
                    <div className="h-6 bg-gray-950 flex justify-center items-center">
                      <div className="w-20 h-3.5 bg-gray-900 rounded-full flex items-center justify-end pr-2 border border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                      </div>
                    </div>

                    {/* Mobile Content Screen */}
                    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black p-3.5 space-y-4 max-h-[550px] overflow-y-auto">
                      {/* Mobile Header Preview */}
                      <div className="text-center space-y-1.5 pt-1">
                        <h3 className="text-lg font-black text-white inline-flex items-center justify-center gap-1.5 border-b-2 border-yellow-400 pb-0.5 px-2">
                          <span>{productSectionTitleIcon || "🥭"}</span>
                          <span>{productSectionTitle || "Mango Varieties & Prices"}</span>
                        </h3>
                        <p className="text-[11px] text-gray-300 leading-relaxed px-1">
                          {productSectionSubtitle ||
                            "Best seasonal mangoes from Rajshahi, Chuadanga, and Naogaon. Choose your favorite variety from below."}
                        </p>
                      </div>

                      {/* Mobile Cards (Vertical Stack of 2 items in mobile screen) */}
                      <div className="space-y-3.5">
                        {[
                          { name: "Gopalbhog", price: "৳ 180/kg", dates: "Chuadanga: 13 May, Naogaon: 30 May" },
                          { name: "Himsagar / Khirsapat", price: "৳ 220/kg", dates: "Chuadanga: 13 May, Rajshahi: 30 May" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex flex-col">
                            {/* Preset 1: Classic Warm */}
                            {productCardPreset === "classic" && (
                              <div className="flex flex-col rounded-3xl bg-amber-50/90 border-2 border-amber-300 shadow-md text-gray-800 overflow-hidden">
                                <div className="p-2 pb-0">
                                  <div className="h-28 bg-amber-100 rounded-2xl relative flex items-center justify-center text-amber-900 font-bold overflow-hidden shadow-inner">
                                    <span className="text-xs">🥭 Inset Image</span>
                                    <span className="absolute top-2 left-2 bg-yellow-400 text-green-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                                      Garden Fresh
                                    </span>
                                  </div>
                                </div>
                                <div className="p-3 flex flex-col justify-between space-y-2">
                                  <div>
                                    <h5 className="font-black text-sm text-green-950 truncate">{item.name}</h5>
                                    <div className="mt-1">
                                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs border border-amber-200">
                                        {item.price}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1 truncate">{item.dates}</p>
                                  </div>
                                  <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                                    <span className="text-[10px] text-green-800 font-bold">Details</span>
                                    <span className="px-3 py-1 text-[10px] text-white font-black rounded-full bg-gradient-to-r from-amber-500 to-green-600 shadow">
                                      Pre-Order
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Preset 2: Modern Minimal */}
                            {productCardPreset === "modern" && (
                              <div className="flex flex-col rounded-xl bg-white border border-slate-200 shadow-sm text-gray-900 overflow-hidden">
                                <div className="h-28 bg-slate-100 relative flex items-center justify-center text-slate-500 font-bold">
                                  <span className="text-xs">Flush Image</span>
                                  <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                                    In Stock
                                  </span>
                                </div>
                                <div className="p-3 flex flex-col justify-between space-y-2">
                                  <div>
                                    <h5 className="font-bold text-sm text-slate-900 truncate">{item.name}</h5>
                                    <p className="text-sm font-black text-slate-950 mt-0.5">{item.price}</p>
                                    <p className="text-[10px] text-slate-400 mt-1 truncate">{item.dates}</p>
                                  </div>
                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span className="text-[10px] text-slate-600 font-semibold">View</span>
                                    <span className="px-3 py-1 text-[10px] text-white font-bold rounded-lg bg-emerald-600">
                                      Pre-Order
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Preset 3: Royal Dark Luxury */}
                            {productCardPreset === "elevated" && (
                              <div className="flex flex-col rounded-2xl bg-gradient-to-b from-gray-950 to-slate-950 border border-amber-500/60 shadow-xl text-white overflow-hidden">
                                <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
                                <div className="h-28 bg-gray-900 relative flex items-center justify-center text-amber-300 font-bold">
                                  <span className="text-xs">Dark Image</span>
                                  <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                                    👑 Premium
                                  </span>
                                </div>
                                <div className="p-3 flex flex-col justify-between space-y-2">
                                  <div>
                                    <h5 className="font-black text-sm text-white truncate">{item.name}</h5>
                                    <p className="text-sm font-black text-yellow-400 mt-0.5 drop-shadow">{item.price}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 truncate">{item.dates}</p>
                                  </div>
                                  <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
                                    <span className="text-[10px] text-yellow-400 font-bold">Details</span>
                                    <span className="px-3 py-1 text-[10px] text-gray-950 font-black rounded-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 shadow">
                                      Pre-Order
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Preset 4: Eco Organic */}
                            {productCardPreset === "bordered" && (
                              <div className="flex flex-col rounded-[24px] bg-emerald-50 border-2 border-dashed border-emerald-400 shadow-sm text-emerald-950 overflow-hidden">
                                <div className="p-2 pb-0">
                                  <div className="h-28 bg-emerald-100/70 rounded-xl relative flex items-center justify-center text-emerald-900 font-bold">
                                    <span className="text-xs">🌿 Eco Frame</span>
                                    <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                                      100% Organic
                                    </span>
                                  </div>
                                </div>
                                <div className="p-3 flex flex-col justify-between space-y-2">
                                  <div>
                                    <h5 className="font-black text-sm text-emerald-950 truncate">{item.name}</h5>
                                    <div className="mt-1">
                                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                                        {item.price}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-emerald-800 mt-1 truncate">{item.dates}</p>
                                  </div>
                                  <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs">
                                    <span className="text-[10px] text-emerald-700 font-bold">Details</span>
                                    <span className="px-3 py-1 text-[10px] text-white font-black rounded-xl bg-emerald-700 border-b-2 border-emerald-950 shadow">
                                      Pre-Order
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Mobile Show More Button */}
                      <div className="pt-1 flex justify-center pb-1">
                        <div className="w-full py-2 bg-gradient-to-r from-amber-500 via-green-600 to-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5">
                          <span>{productShowMoreBtnText || "Show More Products"}</span>
                          <FaChevronDown className="text-[9px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        
          {/* ========================================================================= */}
          {/* Section 4: About Section Settings (About Founder & Brand Story) */}
          {/* ========================================================================= */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
            {/* Header Title Bar */}
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                  <FaBookOpen className="text-green-600" /> 4. About Section Settings (Story & Statistics)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Manage founder photo, brand story narrative, and dynamic counter stat cards (real database metrics or custom inputs).
                </p>
              </div>

              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-black rounded-xl border border-amber-200 self-start sm:self-auto">
                Homepage Story & Stats
              </span>
            </div>

            {/* Part 1: Founder Avatar Image */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                <h4 className="text-sm font-extrabold text-green-950">
                  Founder Avatar Image
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60">
                {/* Rounded Avatar Preview with ring */}
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 rounded-full ring ring-yellow-500 ring-offset-4 overflow-hidden shadow-xl bg-amber-100 flex items-center justify-center">
                    {aboutFounderImg ? (
                      <img
                        src={aboutFounderImg}
                        alt="Founder Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";
                        }}
                      />
                    ) : (
                      <FaUserTie className="text-4xl text-amber-400" />
                    )}
                  </div>
                </div>

                {/* Upload & Controls */}
                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
                    <label className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shadow">
                      <FaUpload />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAboutFounderImgUpload}
                        className="hidden"
                      />
                    </label>

                    {aboutFounderImg && (
                      <button
                        type="button"
                        onClick={() => {
                          const defImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";
                          setAboutFounderImg(defImg);
                          updateSettings({ aboutFounderImg: defImg });
                        }}
                        className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <FaUndoAlt className="text-xs" />
                        <span>Reset to Default</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      Or enter direct Image URL:
                    </label>
                    <input
                      type="text"
                      value={aboutFounderImg}
                      onChange={(e) => setAboutFounderImg(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Recommended: Square (1:1) photo (e.g. 400x400 px) looks best.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: Section Title & Founder Story Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                <h4 className="text-sm font-extrabold text-green-950">
                  Title & Story Narrative
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-green-950 mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    placeholder="Founder's Story / Brand Story"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-black text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-green-950 mb-1">
                    Founder Story & Bio (Story Narrative)
                  </label>
                  <textarea
                    rows={4}
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    placeholder="Our journey began under the vision of founder..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    This narrative will be displayed as a formatted paragraph on the storefront.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 3: 3 Dynamic Stats Cards (Real DB vs Custom Input) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h4 className="text-sm font-extrabold text-green-950">
                    3 Dynamic Stats & Counter Cards
                  </h4>
                </div>
                <span className="text-xs font-bold text-gray-400 hidden sm:inline">
                  Live Database Metrics or Custom Input Values
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Stat 1: Order Counter */}
                <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/30 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                    <span className="text-xs font-black text-green-950 flex items-center gap-1.5">
                      <span>📦 Card 1: Order Counter</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      {aboutStat1ValueMode === "real" ? "Live Data" : "Custom"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={aboutStat1Title}
                      onChange={(e) => setAboutStat1Title(e.target.value)}
                      placeholder="Total Orders"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Mode Switcher */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Value Display Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setAboutStat1ValueMode("real")}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          aboutStat1ValueMode === "real"
                            ? "bg-green-600 text-white shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ⚡ Live Data
                      </button>
                      <button
                        type="button"
                        onClick={() => setAboutStat1ValueMode("custom")}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          aboutStat1ValueMode === "custom"
                            ? "bg-green-600 text-white shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ✍️ Custom Value
                      </button>
                    </div>
                  </div>

                  {aboutStat1ValueMode === "real" ? (
                    <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-center">
                      <span className="text-[11px] text-green-700 font-bold block">
                        Auto-calculated from total orders in database:
                      </span>
                      <span className="text-xl font-black text-green-900">
                        {toBengaliNumber(settings?.realStats?.totalOrders ?? 0)}+
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Custom Value
                      </label>
                      <input
                        type="text"
                        value={aboutStat1CustomValue}
                        onChange={(e) => setAboutStat1CustomValue(e.target.value)}
                        placeholder="500+"
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-black text-amber-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Card Subtitle
                    </label>
                    <input
                      type="text"
                      value={aboutStat1Subtitle}
                      onChange={(e) => setAboutStat1Subtitle(e.target.value)}
                      placeholder="Last Season"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Stat 2: Varieties Counter */}
                <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                    <span className="text-xs font-black text-green-950 flex items-center gap-1.5">
                      <span>🥭 Card 2: Varieties Counter</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                      {aboutStat2ValueMode === "real" ? "Live Data" : "Custom"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={aboutStat2Title}
                      onChange={(e) => setAboutStat2Title(e.target.value)}
                      placeholder="Mango Varieties"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Mode Switcher */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Value Display Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setAboutStat2ValueMode("real")}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          aboutStat2ValueMode === "real"
                            ? "bg-green-600 text-white shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ⚡ Live Data
                      </button>
                      <button
                        type="button"
                        onClick={() => setAboutStat2ValueMode("custom")}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          aboutStat2ValueMode === "custom"
                            ? "bg-green-600 text-white shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ✍️ Custom Value
                      </button>
                    </div>
                  </div>

                  {aboutStat2ValueMode === "real" ? (
                    <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-center">
                      <span className="text-[11px] text-green-700 font-bold block">
                        Auto-calculated from active products count in store:
                      </span>
                      <span className="text-xl font-black text-green-900">
                        {toBengaliNumber(settings?.realStats?.totalProducts ?? 11)}+
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Custom Value
                      </label>
                      <input
                        type="text"
                        value={aboutStat2CustomValue}
                        onChange={(e) => setAboutStat2CustomValue(e.target.value)}
                        placeholder="11+"
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-black text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Card Subtitle
                    </label>
                    <input
                      type="text"
                      value={aboutStat2Subtitle}
                      onChange={(e) => setAboutStat2Subtitle(e.target.value)}
                      placeholder="Direct from Gardens"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Stat 3: Satisfaction Rating */}
                <div className="p-4 rounded-2xl border-2 border-yellow-200 bg-yellow-50/30 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-yellow-200/80 pb-2">
                    <span className="text-xs font-black text-green-950 flex items-center gap-1.5">
                      <span>⭐ Card 3: Satisfaction Rating</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-900">
                      {aboutStat3ValueMode === "real" ? "Live Data" : "Custom"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={aboutStat3Title}
                      onChange={(e) => setAboutStat3Title(e.target.value)}
                      placeholder="Customer Satisfaction"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Mode Switcher */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Value Display Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setAboutStat3ValueMode("real")}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          aboutStat3ValueMode === "real"
                            ? "bg-green-600 text-white shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ⚡ Live Data
                      </button>
                      <button
                        type="button"
                        onClick={() => setAboutStat3ValueMode("custom")}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          aboutStat3ValueMode === "custom"
                            ? "bg-green-600 text-white shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ✍️ Custom Value
                      </button>
                    </div>
                  </div>

                  {aboutStat3ValueMode === "real" ? (
                    <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-center">
                      <span className="text-[11px] text-green-700 font-bold block">
                        Auto-calculated from average customer review rating:
                      </span>
                      <span className="text-xl font-black text-yellow-600">
                        {toBengaliNumber(settings?.realStats?.satisfactionRate ?? 98)}%
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Custom Value
                      </label>
                      <input
                        type="text"
                        value={aboutStat3CustomValue}
                        onChange={(e) => setAboutStat3CustomValue(e.target.value)}
                        placeholder="98%"
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-black text-yellow-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Card Subtitle
                    </label>
                    <input
                      type="text"
                      value={aboutStat3Subtitle}
                      onChange={(e) => setAboutStat3Subtitle(e.target.value)}
                      placeholder="⭐ Based on verified reviews"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Part 4: Live Interactive About Section Preview */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gray-950 text-white space-y-4 shadow-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-white">
                      Live About Section Preview
                    </h4>
                    <p className="text-xs text-gray-400">
                      Real-time interactive rendering of homepage about story & stats
                    </p>
                  </div>
                </div>

                {/* Device Switcher (Desktop & Mobile) */}
                <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setAboutPreviewDevice("desktop")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      aboutPreviewDevice === "desktop"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaDesktop /> <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAboutPreviewDevice("mobile")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      aboutPreviewDevice === "mobile"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt /> <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Rendered Live Preview */}
              {aboutPreviewDevice === "desktop" ? (
                /* DESKTOP VIEW */
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-amber-100 to-lime-100 p-8 text-center text-gray-800 shadow-inner">
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full ring-4 ring-yellow-500 ring-offset-2 overflow-hidden shadow-lg mx-auto bg-amber-50 mb-4">
                    <img
                      src={aboutFounderImg}
                      alt="Founder"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-green-900">
                    {aboutTitle || "আমওয়ালা ভাইয়ার গল্প"}
                  </h3>

                  <div className="w-20 mx-auto my-3 border-t-4 border-yellow-500 rounded-full" />

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {aboutDescription ||
                      "প্রতিষ্ঠাতা মোহাম্মদ সাব্বির এর হাত ধরে যাত্রা শুরু “আমওয়ালা ভাইয়া” — রাজশাহী অঞ্চলের প্রিমিয়াম মানের আম উৎপাদন ও বিতরণে বিশ্বস্ত নাম।"}
                  </p>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 max-w-xl mx-auto mt-6 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-2xl shadow-md overflow-hidden divide-x divide-yellow-200">
                    <div className="py-4 px-3 text-center">
                      <div className="text-[11px] text-green-800 font-bold">{aboutStat1Title || "মোট অর্ডার"}</div>
                      <div className="text-2xl font-black text-yellow-600 mt-0.5">
                        {aboutStat1ValueMode === "real"
                          ? `${toBengaliNumber(settings?.realStats?.totalOrders ?? 0)}+`
                          : aboutStat1CustomValue || "৫০০+"}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">{aboutStat1Subtitle || "গত সিজন"}</div>
                    </div>

                    <div className="py-4 px-3 text-center">
                      <div className="text-[11px] text-green-800 font-bold">{aboutStat2Title || "আমের জাত"}</div>
                      <div className="text-2xl font-black text-green-700 mt-0.5">
                        {aboutStat2ValueMode === "real"
                          ? `${toBengaliNumber(settings?.realStats?.totalProducts ?? 11)}+`
                          : aboutStat2CustomValue || "১১+"}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">{aboutStat2Subtitle || "সরাসরি বাগান থেকে"}</div>
                    </div>

                    <div className="py-4 px-3 text-center">
                      <div className="text-[11px] text-green-800 font-bold">{aboutStat3Title || "গ্রাহক সন্তুষ্টি"}</div>
                      <div className="text-2xl font-black text-yellow-600 mt-0.5">
                        {aboutStat3ValueMode === "real"
                          ? `${toBengaliNumber(settings?.realStats?.satisfactionRate ?? 98)}%`
                          : aboutStat3CustomValue || "৯৮%"}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium">{aboutStat3Subtitle || "⭐ রিভিউ এর ভিত্তিতে"}</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* SMARTPHONE FRAME MOCKUP (MOBILE PREVIEW) */
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-[340px] rounded-[38px] border-[6px] border-gray-700 bg-gray-950 shadow-2xl overflow-hidden relative">
                    {/* Notch */}
                    <div className="h-6 bg-gray-950 flex justify-center items-center">
                      <div className="w-20 h-3.5 bg-gray-900 rounded-full flex items-center justify-end pr-2 border border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                      </div>
                    </div>

                    {/* Mobile Content Screen */}
                    <div className="bg-gradient-to-r from-amber-100 to-lime-100 p-4 text-center text-gray-800 space-y-3.5 max-h-[550px] overflow-y-auto">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full ring-4 ring-yellow-500 ring-offset-2 overflow-hidden shadow mx-auto bg-amber-50">
                        <img
                          src={aboutFounderImg}
                          alt="Founder"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-green-900">
                        {aboutTitle || "আমওয়ালা ভাইয়ার গল্প"}
                      </h3>

                      <div className="w-16 mx-auto my-1 border-t-2 border-yellow-500 rounded-full" />

                      {/* Description */}
                      <p className="text-[11px] text-gray-700 leading-relaxed px-1">
                        {aboutDescription ||
                          "প্রতিষ্ঠাতা মোহাম্মদ সাব্বির এর হাত ধরে যাত্রা শুরু “আমওয়ালা ভাইয়া” — রাজশাহী অঞ্চলের প্রিমিয়াম মানের আম উৎপাদন ও বিতরণে বিশ্বস্ত নাম।"}
                      </p>

                      {/* Mobile Stats (Stacked cards) */}
                      <div className="bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-2xl shadow-sm divide-y divide-yellow-100 overflow-hidden text-center">
                        <div className="py-2.5 px-3">
                          <div className="text-[10px] text-green-800 font-bold">{aboutStat1Title || "মোট অর্ডার"}</div>
                          <div className="text-xl font-black text-yellow-600">
                            {aboutStat1ValueMode === "real"
                              ? `${toBengaliNumber(settings?.realStats?.totalOrders ?? 0)}+`
                              : aboutStat1CustomValue || "৫০০+"}
                          </div>
                          <div className="text-[9px] text-gray-500 font-medium">{aboutStat1Subtitle || "গত সিজন"}</div>
                        </div>

                        <div className="py-2.5 px-3">
                          <div className="text-[10px] text-green-800 font-bold">{aboutStat2Title || "আমের জাত"}</div>
                          <div className="text-xl font-black text-green-700">
                            {aboutStat2ValueMode === "real"
                              ? `${toBengaliNumber(settings?.realStats?.totalProducts ?? 11)}+`
                              : aboutStat2CustomValue || "১১+"}
                          </div>
                          <div className="text-[9px] text-gray-500 font-medium">{aboutStat2Subtitle || "সরাসরি বাগান থেকে"}</div>
                        </div>

                        <div className="py-2.5 px-3">
                          <div className="text-[10px] text-green-800 font-bold">{aboutStat3Title || "গ্রাহক সন্তুষ্টি"}</div>
                          <div className="text-xl font-black text-yellow-600">
                            {aboutStat3ValueMode === "real"
                              ? `${toBengaliNumber(settings?.realStats?.satisfactionRate ?? 98)}%`
                              : aboutStat3CustomValue || "৯৮%"}
                          </div>
                          <div className="text-[9px] text-gray-500 font-medium">{aboutStat3Subtitle || "⭐ রিভিউ এর ভিত্তিতে"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky/Bottom Save Settings Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-700 via-green-600 to-amber-600 hover:from-green-800 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition flex items-center gap-2 cursor-pointer text-sm"
              >
                <FaSave />
                <span>Save All Settings</span>
              </button>
            </div>
          </div>


        
          {/* ========================================================================= */}
          {/* Section 5: Testimonials & Reviews Settings */}
          {/* ========================================================================= */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
            {/* Header Title Bar */}
            <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                  <FaStar className="text-amber-500" /> 5. Testimonials & Reviews Settings
                </h3>
              </div>

              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-black rounded-xl border border-amber-200 self-start sm:self-auto">
                Customer Testimonials
              </span>
            </div>

            {/* Part 1: Section Header & Display Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60">
              {/* Title & Icon with Upload and Palette Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h4 className="text-xs font-black text-green-950 uppercase">
                    Section Title & Icon
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  {/* Icon Selector Button with Popover */}
                  <div className="sm:col-span-5 relative">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Section Icon (Icon / Image)
                    </label>
                    <button
                      type="button"
                      onClick={() => setTestimonialIconPickerOpen(!testimonialIconPickerOpen)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 hover:border-green-500 rounded-xl text-xs font-black flex items-center justify-between cursor-pointer transition shadow-2xs"
                    >
                      <span className="flex items-center gap-2 truncate">
                        {testimonialSectionIcon?.startsWith("data:") ||
                        testimonialSectionIcon?.startsWith("http") ||
                        testimonialSectionIcon?.startsWith("/") ? (
                          <img
                            src={testimonialSectionIcon}
                            alt="Section Icon"
                            className="w-5 h-5 object-contain rounded"
                          />
                        ) : (
                          <span className="text-base">{testimonialSectionIcon || "🍃"}</span>
                        )}
                        <span className="text-gray-700 font-bold text-[11px]">Select Icon</span>
                      </span>
                      <FaSlidersH className="text-gray-400 text-xs shrink-0" />
                    </button>

                    {/* Icon Selection Palette Popover */}
                    {testimonialIconPickerOpen && (
                      <div className="absolute top-full left-0 mt-1.5 z-40 bg-white rounded-2xl shadow-2xl border border-gray-300 p-3.5 w-68 space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                          <span className="text-[11px] font-black text-gray-800">
                            Choose Section Icon
                          </span>
                          <button
                            type="button"
                            onClick={() => setTestimonialIconPickerOpen(false)}
                            className="text-gray-400 hover:text-gray-600 text-xs"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Popular Emojis Grid */}
                        <div className="grid grid-cols-5 gap-1.5">
                          {["🍃", "⭐", "💬", "❤️", "🥭", "🌿", "🏆", "👑", "✨", "🔥", "👍", "🥇", "🌱", "📦", "💯"].map(
                            (ic) => (
                              <button
                                key={ic}
                                type="button"
                                onClick={() => {
                                  setTestimonialSectionIcon(ic);
                                  setTestimonialIconPickerOpen(false);
                                }}
                                className="w-9 h-9 rounded-xl hover:bg-yellow-100 text-lg flex items-center justify-center transition cursor-pointer border border-transparent hover:border-yellow-300"
                              >
                                {ic}
                              </button>
                            )
                          )}
                        </div>

                        {/* Direct Text/Emoji input */}
                        <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                          <input
                            type="text"
                            value={testimonialSectionIcon}
                            onChange={(e) => setTestimonialSectionIcon(e.target.value)}
                            placeholder="e.g. 🍃"
                            className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-center font-bold"
                          />
                        </div>

                        {/* Upload Custom Icon */}
                        <div className="pt-1 border-t border-gray-100">
                          <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-yellow-100 text-gray-700 text-[11px] font-bold rounded-lg cursor-pointer transition">
                            <FaUpload className="text-[10px]" /> <span>Upload Icon</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleTestimonialSectionIconUpload(e.target.files?.[0])
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section Title Input */}
                  <div className="sm:col-span-7">
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={testimonialSectionTitle}
                      onChange={(e) => setTestimonialSectionTitle(e.target.value)}
                      placeholder="Customer Testimonials"
                      className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-black text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Display Mode Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h4 className="text-xs font-black text-green-950 uppercase">
                    Review Display Mode
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setTestimonialDisplayMode("custom")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1 ${
                      testimonialDisplayMode === "custom"
                        ? "bg-green-600 text-white shadow-md"
                        : "text-gray-700 hover:text-green-900"
                    }`}
                  >
                    <span>⚡ Custom Reviews</span>
                    <span className="text-[10px] font-normal opacity-90">Auto Carousel Mode</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTestimonialDisplayMode("real")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1 ${
                      testimonialDisplayMode === "real"
                        ? "bg-green-600 text-white shadow-md"
                        : "text-gray-700 hover:text-green-900"
                    }`}
                  >
                    <span>🌟 Real Reviews</span>
                    <span className="text-[10px] font-normal opacity-90">Verified Customers</span>
                  </button>
                </div>

                {testimonialDisplayMode === "real" ? (
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
                    <span className="font-bold">ℹ️ Info:</span> Real reviews are loaded dynamically from verified customer reviews for each product.
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-[11px] text-green-900 leading-relaxed">
                    <span className="font-bold">✅ Active Mode:</span> Use the arrow buttons below to view and edit each review, or click "+ Add New Review" to add a new review.
                  </div>
                )}
              </div>
            </div>

            {/* Part 2: Carousel Behavior Controls */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h4 className="text-xs font-black text-green-950 uppercase">
                    Auto Carousel Controls
                  </h4>
                </div>
                <span className="text-xs font-bold text-gray-500">
                  {testimonialAutoPlay ? "Carousel Enabled" : "Carousel Disabled"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Auto Play</span>
                    <span className="text-[11px] text-gray-400">Reviews automatically rotate after set interval</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={testimonialAutoPlay}
                    onChange={(e) => setTestimonialAutoPlay(e.target.checked)}
                    className="toggle toggle-success"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Rotation Speed (s)</span>
                    <span className="text-[11px] text-gray-400">Display duration per review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[3, 4, 5, 6].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setTestimonialAutoPlayInterval(sec)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                          testimonialAutoPlayInterval === sec
                            ? "bg-green-600 text-white shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Part 3: Custom Reviews Manager with Left & Right Arrow Navigation (Hero Style) */}
            <div className="space-y-4">
              {/* Header with Counter, Add Modal trigger, and Delete Current */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h4 className="text-sm font-extrabold text-green-950">
                    Custom Reviews List (Total: {testimonialItems.length})
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-black text-xs border border-green-200">
                    Review {currentReviewIndex + 1} / {testimonialItems.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddReviewModalOpen(true)}
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <FaPlus /> <span>Add New Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteCurrentReview}
                    disabled={testimonialItems.length <= 1}
                    title="Delete this review"
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 border cursor-pointer ${
                      testimonialItems.length <= 1
                        ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    }`}
                  >
                    <FaTrash className="text-[11px]" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Review Card with Side Arrows (Hero Section style) */}
              <div className="relative">
                {testimonialItems.length > 1 && (
                  <>
                    {/* Left Navigation Arrow */}
                    <button
                      type="button"
                      onClick={handlePrevReview}
                      title="Previous Review"
                      className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-green-600 text-gray-700 hover:text-white border-2 border-gray-300 hover:border-green-600 shadow-xl flex items-center justify-center transition cursor-pointer group"
                    >
                      <FaChevronLeft className="text-sm group-hover:scale-125 transition" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                      type="button"
                      onClick={handleNextReview}
                      title="Next Review"
                      className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-green-600 text-gray-700 hover:text-white border-2 border-gray-300 hover:border-green-600 shadow-xl flex items-center justify-center transition cursor-pointer group"
                    >
                      <FaChevronRight className="text-sm group-hover:scale-125 transition" />
                    </button>
                  </>
                )}

                {/* Active Review Form Card */}
                {(() => {
                  const activeRev =
                    testimonialItems[currentReviewIndex] || testimonialItems[0] || {};
                  const selectedProduct = (products || []).find(
                    (p) => String(p._id || p.id || p.slug) === String(activeRev.productId)
                  );
                  const productThumb =
                    selectedProduct?.image ||
                    activeRev.productImage ||
                    (activeRev.avatar &&
                    (activeRev.avatar.startsWith("data:") ||
                      activeRev.avatar.startsWith("http") ||
                      activeRev.avatar.startsWith("/"))
                      ? activeRev.avatar
                      : "");

                  return (
                    <div className="p-5 sm:p-6 rounded-3xl bg-yellow-50/70 border-2 border-yellow-300 shadow-sm space-y-4">
                      {/* Top Bar showing which review is being edited */}
                      <div className="flex items-center justify-between border-b border-yellow-200 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-green-700 text-white font-black text-xs flex items-center justify-center shadow">
                            {currentReviewIndex + 1}
                          </span>
                          <span className="text-xs font-black text-green-950">
                            Editing Review #{currentReviewIndex + 1} — {activeRev.name || "Customer"}
                          </span>
                        </div>

                        {/* Review Slide Indicators */}
                        <div className="flex items-center gap-1.5">
                          {testimonialItems.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={() => setCurrentReviewIndex(dotIdx)}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                currentReviewIndex === dotIdx
                                  ? "w-6 bg-green-700 shadow"
                                  : "w-2 bg-gray-300 hover:bg-gray-400"
                              }`}
                              title={`Review #${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Fields Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                        {/* Selected Product Thumbnail Column */}
                        <div className="sm:col-span-3 space-y-2.5 text-center sm:text-left flex flex-col items-center sm:items-start">
                          <label className="block text-[11px] font-bold text-gray-700">
                            Product Thumbnail
                          </label>
                          <div className="w-20 h-20 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                            {productThumb ? (
                              <img
                                src={productThumb}
                                alt={activeRev.productName || "Product"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center p-2">
                                <span className="text-2xl block">🥭</span>
                                <span className="text-[10px] text-gray-400 font-bold block mt-0.5">No Product</span>
                              </div>
                            )}
                          </div>
                          {selectedProduct && (
                            <span className="text-[10px] font-extrabold text-green-800 bg-green-100 border border-green-200 px-2 py-0.5 rounded-lg line-clamp-1 max-w-[140px] text-center">
                              {selectedProduct.name_bn || selectedProduct.name}
                            </span>
                          )}
                        </div>

                        {/* Product Selector, Name, Location, Rating, Comment Column */}
                        <div className="sm:col-span-9 space-y-3.5">
                          {/* Target Product Selector Dropdown */}
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">
                              Target Product <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={activeRev.productId || ""}
                              onChange={(e) => {
                                const pId = e.target.value;
                                const sel = (products || []).find(
                                  (p) => String(p._id || p.id || p.slug) === String(pId)
                                );
                                handleUpdateTestimonial(currentReviewIndex, "productId", pId);
                                if (sel) {
                                  handleUpdateTestimonial(
                                    currentReviewIndex,
                                    "productName",
                                    sel.name_bn || sel.name
                                  );
                                  handleUpdateTestimonial(
                                    currentReviewIndex,
                                    "productImage",
                                    sel.image || ""
                                  );
                                  handleUpdateTestimonial(
                                    currentReviewIndex,
                                    "avatar",
                                    sel.image || ""
                                  );
                                }
                              }}
                              className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xs"
                            >
                              <option value="">-- Choose a Product --</option>
                              {(products || []).map((p) => (
                                <option key={p._id || p.id} value={p._id || p.id || p.slug}>
                                  {p.name_bn || p.name} {p.name_en ? `(${p.name_en})` : ""}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                Customer Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={activeRev.name}
                                onChange={(e) =>
                                  handleUpdateTestimonial(
                                    currentReviewIndex,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Mizanur Rahman"
                                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                Address / City
                              </label>
                              <input
                                type="text"
                                value={activeRev.location}
                                onChange={(e) =>
                                  handleUpdateTestimonial(
                                    currentReviewIndex,
                                    "location",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. Dhaka"
                                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xs"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                Star Rating
                              </label>
                              <div className="flex items-center gap-1 py-1.5">
                                {[1, 2, 3, 4, 5].map((st) => (
                                  <button
                                    key={st}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateTestimonial(currentReviewIndex, "rating", st)
                                    }
                                    className="cursor-pointer transition hover:scale-125"
                                  >
                                    <FaStar
                                      className={`text-lg ${
                                        st <= (activeRev.rating || 5)
                                          ? "text-amber-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                                <span className="text-xs font-bold text-gray-600 ml-1.5">
                                  ({activeRev.rating || 5}/5)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">
                              Review / Feedback Statement <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={3}
                              value={activeRev.comment}
                              onChange={(e) =>
                                handleUpdateTestimonial(
                                  currentReviewIndex,
                                  "comment",
                                  e.target.value
                                )
                              }
                              placeholder="Write customer review statement..."
                              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-500 shadow-2xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Part 4: Live Testimonials Carousel Preview */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gray-950 text-white space-y-4 shadow-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-white">
                      Live Testimonials Carousel Preview
                    </h4>
                    <p className="text-xs text-gray-400">
                      Real-time interactive rendering of customer reviews auto carousel
                    </p>
                  </div>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setTestimonialPreviewDevice("desktop")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      testimonialPreviewDevice === "desktop"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaDesktop /> <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestimonialPreviewDevice("mobile")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      testimonialPreviewDevice === "mobile"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt /> <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Rendered Live Carousel */}
              {testimonialPreviewDevice === "desktop" ? (
                /* DESKTOP PREVIEW (3 Cards Carousel) */
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 p-6 space-y-6">
                  {/* Section Title */}
                  <div className="text-center space-y-1">
                    <h3 className="text-2xl font-black text-white inline-flex items-center justify-center gap-2">
                      {testimonialSectionIcon?.startsWith("data:") ||
                      testimonialSectionIcon?.startsWith("http") ||
                      testimonialSectionIcon?.startsWith("/") ? (
                        <img
                          src={testimonialSectionIcon}
                          alt=""
                          className="w-7 h-7 object-contain rounded"
                        />
                      ) : (
                        <span>{testimonialSectionIcon || "🍃"}</span>
                      )}
                      <span>{testimonialSectionTitle || "গ্রাহকদের মতামত"}</span>
                    </h3>
                    {testimonialDisplayMode === "real" && (
                      <p className="text-[11px] text-emerald-400 font-bold">
                        ✓ 100% Verified Customer Experience & Direct Reviews
                      </p>
                    )}
                  </div>

                  {/* 3 Cards Slider Window */}
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-4">
                      {testimonialItems.slice(0, 3).map((rev, idx) => {
                        const isImg =
                          rev.avatar &&
                          (rev.avatar.startsWith("data:") ||
                            rev.avatar.startsWith("http") ||
                            rev.avatar.startsWith("/"));

                        return (
                          <div
                            key={idx}
                            className="rounded-2xl bg-yellow-50 text-gray-800 p-5 shadow-md border-l-[6px] border-emerald-500 border border-yellow-200/60 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-lg shadow-inner shrink-0 overflow-hidden">
                                  {isImg ? (
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
                                  <h5 className="font-extrabold text-sm text-gray-900 truncate">
                                    {rev.name}
                                  </h5>
                                  <p className="text-[10px] text-gray-500 truncate">
                                    {rev.location || "বাংলাদেশ"}
                                  </p>
                                </div>
                              </div>

                              <p className="py-3 text-xs text-gray-700 italic leading-relaxed">
                                "{rev.comment}"
                              </p>
                            </div>

                            <div className="flex items-center gap-0.5 text-amber-400 pt-2 border-t border-yellow-200/60">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`text-xs ${
                                    i < (rev.rating || 5)
                                      ? "text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Carousel indicator bar */}
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <span className="w-6 h-1.5 bg-emerald-500 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
                      <span className="text-[10px] text-gray-400 ml-2 font-bold">
                        Auto-carousel ({testimonialAutoPlayInterval}s)
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* SMARTPHONE FRAME MOCKUP (MOBILE PREVIEW) */
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-[340px] rounded-[38px] border-[6px] border-gray-700 bg-gray-950 shadow-2xl overflow-hidden relative">
                    {/* Notch */}
                    <div className="h-6 bg-gray-950 flex justify-center items-center">
                      <div className="w-20 h-3.5 bg-gray-900 rounded-full flex items-center justify-end pr-2 border border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                      </div>
                    </div>

                    {/* Mobile Content Screen */}
                    <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black p-4 space-y-4">
                      {/* Section Title */}
                      <div className="text-center space-y-1">
                        <h3 className="text-base font-black text-white inline-flex items-center justify-center gap-1.5">
                          {testimonialSectionIcon?.startsWith("data:") ||
                          testimonialSectionIcon?.startsWith("http") ||
                          testimonialSectionIcon?.startsWith("/") ? (
                            <img
                              src={testimonialSectionIcon}
                              alt=""
                              className="w-5 h-5 object-contain rounded"
                            />
                          ) : (
                            <span>{testimonialSectionIcon || "🍃"}</span>
                          )}
                          <span>{testimonialSectionTitle || "গ্রাহকদের মতামত"}</span>
                        </h3>
                        {testimonialDisplayMode === "real" && (
                          <p className="text-[9px] text-emerald-400 font-bold">
                            ✓ 100% Verified Customer Experience
                          </p>
                        )}
                      </div>

                      {/* Single Review Card in Mobile */}
                      {testimonialItems[0] && (
                        <div className="rounded-2xl bg-yellow-50 text-gray-800 p-4 shadow-md border-l-[6px] border-emerald-500 space-y-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-emerald-200 flex items-center justify-center text-base shadow-inner shrink-0 overflow-hidden">
                              {testimonialItems[0].avatar &&
                              (testimonialItems[0].avatar.startsWith("data:") ||
                                testimonialItems[0].avatar.startsWith("http") ||
                                testimonialItems[0].avatar.startsWith("/")) ? (
                                <img
                                  src={testimonialItems[0].avatar}
                                  alt={testimonialItems[0].name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span>{testimonialItems[0].avatar || "😊"}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h5 className="font-extrabold text-xs text-gray-900 truncate">
                                {testimonialItems[0].name}
                              </h5>
                              <p className="text-[10px] text-gray-500 truncate">
                                {testimonialItems[0].location || "বাংলাদেশ"}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-700 italic leading-relaxed">
                            "{testimonialItems[0].comment}"
                          </p>

                          <div className="flex items-center gap-0.5 text-amber-400 pt-1.5 border-t border-yellow-200">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-xs ${
                                  i < (testimonialItems[0].rating || 5)
                                    ? "text-amber-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mobile carousel dots */}
                      <div className="flex items-center justify-center gap-1.5 pt-1">
                        <span className="w-5 h-1.5 bg-emerald-500 rounded-full" />
                        <span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
                        <span className="w-1.5 h-1.5 bg-gray-700 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Bottom Save Settings Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-700 via-green-600 to-amber-600 hover:from-green-800 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition flex items-center gap-2 cursor-pointer text-sm"
              >
                <FaSave />
                <span>Save All Settings</span>
              </button>
            </div>
          </div>


        
          {/* ========================================================================= */}
          {/* Section 6: Footer Settings (Footer & Policy Settings) */}
          {/* ========================================================================= */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-8">
            {/* Header Title Bar */}
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-extrabold text-green-950 flex items-center gap-2">
                <FaBuilding className="text-green-600" /> 6. Footer Settings
              </h3>
            </div>

            {/* Part 1: Brand & Logo Settings */}
            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-5">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  <h4 className="text-xs font-black text-green-950 uppercase">
                    Footer Brand & Logo Settings
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFooterBrandMode("use_header")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      footerBrandMode === "use_header"
                        ? "bg-green-700 text-white shadow"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    🔗 Use Header Brand Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => setFooterBrandMode("custom")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      footerBrandMode === "custom"
                        ? "bg-green-700 text-white shadow"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    🎨 Custom Footer Brand Settings
                  </button>
                </div>
              </div>

              {footerBrandMode === "use_header" ? (
                <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 flex items-center gap-2.5">
                  <span className="text-base">ℹ️</span>
                  <span>
                    <strong>Header Sync Active:</strong> Footer logo, brand name, and tagline are synced from <strong>1. Header Settings</strong>.
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Display Mode Selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                      Footer Brand Display Style:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFooterBrandDisplay("logo_and_text")}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          footerBrandDisplay === "logo_and_text"
                            ? "border-green-600 bg-green-50 shadow-sm"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xs font-bold text-green-950 block">Logo + Brand Text</span>
                        <span className="text-[11px] text-gray-500">Circular logo icon with brand name and tagline</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFooterBrandDisplay("logo_only")}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          footerBrandDisplay === "logo_only"
                            ? "border-green-600 bg-green-50 shadow-sm"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xs font-bold text-green-950 block">Wide Logo Banner Only</span>
                        <span className="text-[11px] text-gray-500">Wide banner logo without extra text</span>
                      </button>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden shrink-0">
                      {footerLogo || websiteLogo ? (
                        <img
                          src={footerLogo || websiteLogo}
                          alt="Footer Logo"
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <FaLeaf className="text-2xl text-green-600" />
                      )}
                    </div>
                    <div className="space-y-2 flex-1 text-center sm:text-left">
                      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                        <label className="px-3.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shadow-xs">
                          <FaUpload className="text-[10px]" />
                          <span>Upload Custom Footer Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFooterLogoUpload}
                            className="hidden"
                          />
                        </label>
                        {footerLogo && (
                          <button
                            type="button"
                            onClick={() => setFooterLogo("")}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            Reset Logo
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">
                        Recommended: Transparent PNG or WebP logo format.
                      </p>
                    </div>
                  </div>

                  {/* Brand Title & Tagline inputs */}
                  {footerBrandDisplay === "logo_and_text" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          value={footerBrandTitle}
                          onChange={(e) => setFooterBrandTitle(e.target.value)}
                          placeholder="আমওয়ালা ভাইয়া"
                          className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Tagline / Subtitle
                        </label>
                        <input
                          type="text"
                          value={footerBrandTagline}
                          onChange={(e) => setFooterBrandTagline(e.target.value)}
                          placeholder="প্রিমিয়াম মানের দেশি আম"
                          className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text Color Customization (Solid & Gradient) */}
              <div className="pt-4 border-t border-amber-200/60 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-black text-green-950 uppercase flex items-center gap-1.5">
                      <FaPalette className="text-amber-500" /> Brand Text Color Customization (Title Color)
                    </h5>
                    <p className="text-[11px] text-gray-500">
                      Choose gradient or solid color for the footer brand title.
                    </p>
                  </div>

                  {/* Mode switcher (Gradient vs Solid) */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setFooterTitleColorType("gradient")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        footerTitleColorType === "gradient"
                          ? "bg-green-600 text-white shadow font-black"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      🌈 Gradient
                    </button>
                    <button
                      type="button"
                      onClick={() => setFooterTitleColorType("solid")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        footerTitleColorType === "solid"
                          ? "bg-green-600 text-white shadow font-black"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      🎨 Solid Color
                    </button>
                  </div>
                </div>

                {/* Gradient Presets */}
                {footerTitleColorType === "gradient" ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {FOOTER_TITLE_GRADIENT_PRESETS.map((gp) => (
                        <button
                          key={gp.id}
                          type="button"
                          onClick={() => setFooterTitleColorVal(gp.value)}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                            footerTitleColorVal === gp.value
                              ? "border-green-600 ring-2 ring-green-500/30 bg-green-50/50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className="h-4 rounded-md shadow-inner"
                            style={{ backgroundImage: gp.value }}
                          />
                          <span className="text-[10px] font-bold text-gray-700 truncate">
                            {gp.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Custom CSS Gradient Code:
                      </label>
                      <input
                        type="text"
                        value={footerTitleColorVal}
                        onChange={(e) => setFooterTitleColorVal(e.target.value)}
                        placeholder="linear-gradient(to right, #facc15, #4ade80)"
                        className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                ) : (
                  /* Solid Color Presets */
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {FOOTER_TITLE_SOLID_PRESETS.map((sp) => (
                        <button
                          key={sp.id}
                          type="button"
                          onClick={() => setFooterTitleColorVal(sp.value)}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                            footerTitleColorVal === sp.value
                              ? "border-green-600 ring-2 ring-green-500/30 bg-green-50/50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className="h-4 rounded-md shadow-inner border border-gray-200"
                            style={{ backgroundColor: sp.value }}
                          />
                          <span className="text-[10px] font-bold text-gray-700 truncate">
                            {sp.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Custom Hex Color Code:
                        </label>
                        <input
                          type="text"
                          value={footerTitleColorVal}
                          onChange={(e) => setFooterTitleColorVal(e.target.value)}
                          placeholder="#facc15"
                          className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="pt-5">
                        <input
                          type="color"
                          value={footerTitleColorVal.startsWith("#") ? footerTitleColorVal : "#facc15"}
                          onChange={(e) => setFooterTitleColorVal(e.target.value)}
                          className="w-10 h-10 rounded-xl border border-gray-300 p-0.5 cursor-pointer"
                          title="Open Color Picker"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Text Preview Box */}
                <div className="p-3 bg-gray-900 rounded-xl flex items-center justify-between border border-gray-800">
                  <span className="text-[11px] text-gray-400 font-bold">Live Title Preview:</span>
                  <span
                    className="text-lg font-black"
                    style={
                      footerTitleColorType === "gradient"
                        ? {
                            backgroundImage: footerTitleColorVal,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }
                        : { color: footerTitleColorVal }
                    }
                  >
                    {footerBrandTitle || "আমওয়ালা ভাইয়া"}
                  </span>
                </div>
              </div>
            </div>

            {/* Part 3: About / Description Text */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                <h4 className="text-sm font-extrabold text-green-950">
                  Footer About Description Paragraph
                </h4>
              </div>
              <textarea
                rows={3}
                value={footerAboutText}
                onChange={(e) => setFooterAboutText(e.target.value)}
                placeholder="Direct fresh garden mangoes delivered safely to your doorsteps..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Part 4: Social Media Links */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                <h4 className="text-sm font-extrabold text-green-950">
                  Social Media Profile Links
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {footerSocialLinks.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        {s.icon === "facebook" && <FaFacebookF className="text-blue-600" />}
                        {s.icon === "instagram" && <FaInstagram className="text-pink-600" />}
                        {s.icon === "youtube" && <FaYoutube className="text-red-600" />}
                        {s.icon === "whatsapp" && <FaWhatsapp className="text-green-600" />}
                        <span>{s.name} Link</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={s.show !== false}
                        onChange={(e) => {
                          const updated = [...footerSocialLinks];
                          updated[idx] = { ...updated[idx], show: e.target.checked };
                          setFooterSocialLinks(updated);
                        }}
                        className="toggle toggle-sm toggle-success"
                        title="Toggle Visibility"
                      />
                    </div>
                    <input
                      type="text"
                      value={s.link}
                      onChange={(e) => {
                        const updated = [...footerSocialLinks];
                        updated[idx] = { ...updated[idx], link: e.target.value };
                        setFooterSocialLinks(updated);
                      }}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Part 4 & 5: Column 2 (Quick Links) & Column 3 (Mango Varieties) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 2: Quick Links */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                  <div className="flex-1 pr-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                      Column 2 Title
                    </label>
                    <input
                      type="text"
                      value={footerCol2Title}
                      onChange={(e) => setFooterCol2Title(e.target.value)}
                      placeholder="Quick Links"
                      className="w-full px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-black text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFooterQuickLinks([
                        ...footerQuickLinks,
                        { name: "New Link", href: "#", icon: "🔗", show: true },
                      ]);
                    }}
                    className="px-2.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <FaPlus className="text-[9px]" /> <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {footerQuickLinks.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border border-gray-200 flex items-center gap-2 shadow-2xs"
                    >
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === `ql_${idx}` ? null : `ql_${idx}`)}
                          className="w-9 h-8 rounded-lg bg-gray-50 hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-sm transition cursor-pointer overflow-hidden shadow-2xs shrink-0"
                          title="Change Icon (Choose or Upload)"
                        >
                          {item.icon ? (
                            item.icon.startsWith("data:") || item.icon.startsWith("http") || item.icon.startsWith("/") ? (
                              <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
                            ) : (
                              <span>{item.icon}</span>
                            )
                          ) : (
                            <span className="text-gray-400">🔗</span>
                          )}
                        </button>

                        {/* Floating Icon Picker Popover */}
                        {activeFooterIconPicker === `ql_${idx}` && (
                          <div className="absolute top-9 left-0 z-50 p-2.5 bg-white rounded-2xl shadow-2xl border border-gray-200 w-60 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                              <span>Select Icon</span>
                              <button
                                type="button"
                                onClick={() => setActiveFooterIconPicker(null)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <div className="grid grid-cols-6 gap-1 max-h-36 overflow-y-auto pr-0.5">
                              {POPULAR_FOOTER_ICONS.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...footerQuickLinks];
                                    updated[idx] = { ...updated[idx], icon: emoji };
                                    setFooterQuickLinks(updated);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className="w-8 h-8 rounded-lg hover:bg-yellow-100 flex items-center justify-center text-sm transition cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                            <div className="pt-1 border-t border-gray-100 flex items-center gap-1">
                              <input
                                type="text"
                                value={item.icon?.startsWith("data:") ? "" : item.icon}
                                onChange={(e) => {
                                  const updated = [...footerQuickLinks];
                                  updated[idx] = { ...updated[idx], icon: e.target.value };
                                  setFooterQuickLinks(updated);
                                }}
                                placeholder="Custom emoji / text..."
                                className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <label className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 rounded-xl text-[10px] font-bold transition cursor-pointer">
                              <FaUpload className="text-[9px]" />
                              <span>Upload Custom Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFooterItemIconUpload(setFooterQuickLinks, footerQuickLinks, idx, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...footerQuickLinks];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFooterQuickLinks(updated);
                        }}
                        placeholder="Link Name"
                        className="flex-1 px-2.5 py-1 text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                      />
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => {
                          const updated = [...footerQuickLinks];
                          updated[idx] = { ...updated[idx], href: e.target.value };
                          setFooterQuickLinks(updated);
                        }}
                        placeholder="#home"
                        className="w-24 px-2 py-1 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        title="Target Link"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFooterQuickLinks(footerQuickLinks.filter((_, i) => i !== idx));
                        }}
                        className="w-7 h-7 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Mango Varieties */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                  <div className="flex-1 pr-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                      Column 3 Title
                    </label>
                    <input
                      type="text"
                      value={footerCol3Title}
                      onChange={(e) => setFooterCol3Title(e.target.value)}
                      placeholder="Mango Varieties"
                      className="w-full px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-black text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFooterMangoList([
                        ...footerMangoList,
                        { name: "New Variety", href: "#varieties", icon: "🥭", show: true },
                      ]);
                    }}
                    className="px-2.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <FaPlus className="text-[9px]" /> <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {footerMangoList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border border-gray-200 flex items-center gap-2 shadow-2xs"
                    >
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === `ml_${idx}` ? null : `ml_${idx}`)}
                          className="w-9 h-8 rounded-lg bg-gray-50 hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-sm transition cursor-pointer overflow-hidden shadow-2xs shrink-0"
                          title="Change Icon (Choose or Upload)"
                        >
                          {item.icon ? (
                            item.icon.startsWith("data:") || item.icon.startsWith("http") || item.icon.startsWith("/") ? (
                              <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
                            ) : (
                              <span>{item.icon}</span>
                            )
                          ) : (
                            <span className="text-gray-400">🥭</span>
                          )}
                        </button>

                        {/* Floating Icon Picker Popover */}
                        {activeFooterIconPicker === `ml_${idx}` && (
                          <div className="absolute top-9 left-0 z-50 p-2.5 bg-white rounded-2xl shadow-2xl border border-gray-200 w-60 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                              <span>Select Icon</span>
                              <button
                                type="button"
                                onClick={() => setActiveFooterIconPicker(null)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <div className="grid grid-cols-6 gap-1 max-h-36 overflow-y-auto pr-0.5">
                              {POPULAR_FOOTER_ICONS.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...footerMangoList];
                                    updated[idx] = { ...updated[idx], icon: emoji };
                                    setFooterMangoList(updated);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className="w-8 h-8 rounded-lg hover:bg-yellow-100 flex items-center justify-center text-sm transition cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                            <div className="pt-1 border-t border-gray-100 flex items-center gap-1">
                              <input
                                type="text"
                                value={item.icon?.startsWith("data:") ? "" : item.icon}
                                onChange={(e) => {
                                  const updated = [...footerMangoList];
                                  updated[idx] = { ...updated[idx], icon: e.target.value };
                                  setFooterMangoList(updated);
                                }}
                                placeholder="Custom emoji / text..."
                                className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <label className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 rounded-xl text-[10px] font-bold transition cursor-pointer">
                              <FaUpload className="text-[9px]" />
                              <span>Upload Custom Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFooterItemIconUpload(setFooterMangoList, footerMangoList, idx, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...footerMangoList];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFooterMangoList(updated);
                        }}
                        placeholder="Variety Name"
                        className="flex-1 px-2.5 py-1 text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                      />
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => {
                          const updated = [...footerMangoList];
                          updated[idx] = { ...updated[idx], href: e.target.value };
                          setFooterMangoList(updated);
                        }}
                        placeholder="#varieties"
                        className="w-24 px-2 py-1 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        title="Target Link"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFooterMangoList(footerMangoList.filter((_, i) => i !== idx));
                        }}
                        className="w-7 h-7 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 6: Column 4 — Contact & Operating Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                  <div className="flex-1 pr-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                      Column 4 Title (Contact)
                    </label>
                    <input
                      type="text"
                      value={footerCol4Title}
                      onChange={(e) => setFooterCol4Title(e.target.value)}
                      placeholder="Contact Us"
                      className="w-full px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-black text-green-950 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFooterContactItems([
                        ...footerContactItems,
                        { text: "New Info", link: "#", icon: "phone", show: true },
                      ]);
                    }}
                    className="px-2.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <FaPlus className="text-[9px]" /> <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {footerContactItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border border-gray-200 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === `ct_${idx}` ? null : `ct_${idx}`)}
                          className="w-9 h-8 rounded-lg bg-gray-50 hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-sm transition cursor-pointer overflow-hidden shadow-2xs shrink-0"
                          title="Change Icon (Preset or Custom)"
                        >
                          {item.icon === "phone" && <FaPhoneAlt className="text-yellow-600 text-xs" />}
                          {item.icon === "whatsapp" && <FaWhatsapp className="text-green-600 text-xs" />}
                          {item.icon === "envelope" && <FaEnvelope className="text-yellow-600 text-xs" />}
                          {item.icon === "map-marker" && <FaMapMarkerAlt className="text-red-500 text-xs" />}
                          {!["phone", "whatsapp", "envelope", "map-marker"].includes(item.icon) && (
                            item.icon?.startsWith("data:") || item.icon?.startsWith("http") || item.icon?.startsWith("/") ? (
                              <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
                            ) : (
                              <span>{item.icon || "📞"}</span>
                            )
                          )}
                        </button>

                        {/* Floating Contact Icon Picker */}
                        {activeFooterIconPicker === `ct_${idx}` && (
                          <div className="absolute top-9 left-0 z-50 p-2.5 bg-white rounded-2xl shadow-2xl border border-gray-200 w-64 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                              <span>Select Contact Icon</span>
                              <button
                                type="button"
                                onClick={() => setActiveFooterIconPicker(null)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                              {[
                                { key: "phone", label: "📞 Phone" },
                                { key: "whatsapp", label: "💬 WhatsApp" },
                                { key: "envelope", label: "✉️ Email" },
                                { key: "map-marker", label: "📍 Address" },
                              ].map((opt) => (
                                <button
                                  key={opt.key}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...footerContactItems];
                                    updated[idx] = { ...updated[idx], icon: opt.key };
                                    setFooterContactItems(updated);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className={`p-1.5 rounded-lg border text-center transition cursor-pointer text-[10px] ${
                                    item.icon === opt.key ? "bg-green-100 border-green-500" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-6 gap-1 max-h-24 overflow-y-auto pt-1 border-t border-gray-100">
                              {POPULAR_FOOTER_ICONS.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...footerContactItems];
                                    updated[idx] = { ...updated[idx], icon: emoji };
                                    setFooterContactItems(updated);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className="w-8 h-8 rounded-lg hover:bg-yellow-100 flex items-center justify-center text-sm transition cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                            <div className="pt-1 border-t border-gray-100 flex items-center gap-1">
                              <input
                                type="text"
                                value={item.icon?.startsWith("data:") ? "" : item.icon}
                                onChange={(e) => {
                                  const updated = [...footerContactItems];
                                  updated[idx] = { ...updated[idx], icon: e.target.value };
                                  setFooterContactItems(updated);
                                }}
                                placeholder="Custom emoji/code..."
                                className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <label className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 rounded-xl text-[10px] font-bold transition cursor-pointer">
                              <FaUpload className="text-[9px]" />
                              <span>Upload Custom Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFooterItemIconUpload(setFooterContactItems, footerContactItems, idx, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => {
                            const updated = [...footerContactItems];
                            updated[idx] = { ...updated[idx], text: e.target.value };
                            setFooterContactItems(updated);
                          }}
                          placeholder="Contact info (e.g. 01749-775030)"
                          className="flex-1 px-2.5 py-1 text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFooterContactItems(footerContactItems.filter((_, i) => i !== idx));
                          }}
                          className="w-7 h-7 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition cursor-pointer"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => {
                          const updated = [...footerContactItems];
                          updated[idx] = { ...updated[idx], link: e.target.value };
                          setFooterContactItems(updated);
                        }}
                        placeholder="Link (e.g. tel:01749775030)"
                        className="w-full px-2.5 py-1 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                  <div className="flex items-center gap-2 flex-1 pr-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === "hours" ? null : "hours")}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-sm transition cursor-pointer shadow-2xs font-bold shrink-0"
                        title="Choose or change icon"
                      >
                        {footerHoursIcon || "🕒"}
                      </button>

                      {activeFooterIconPicker === "hours" && (
                        <div className="absolute top-9 left-0 z-50 p-2.5 bg-white rounded-2xl shadow-2xl border border-gray-200 w-56 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                            <span>Opening Hours Icon</span>
                            <button
                              type="button"
                              onClick={() => setActiveFooterIconPicker(null)}
                              className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                            >
                              <FaTimes />
                            </button>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {["🕒", "⏰", "📅", "⌛", "⏱️", "⚡", "🔔", "☀️"].map((ic) => (
                              <button
                                key={ic}
                                type="button"
                                onClick={() => {
                                  setFooterHoursIcon(ic);
                                  setActiveFooterIconPicker(null);
                                }}
                                className="w-10 h-10 rounded-xl hover:bg-yellow-100 flex items-center justify-center text-lg transition cursor-pointer"
                              >
                                {ic}
                              </button>
                            ))}
                          </div>
                          <div className="pt-1 border-t border-gray-100">
                            <input
                              type="text"
                              value={footerHoursIcon}
                              onChange={(e) => setFooterHoursIcon(e.target.value)}
                              placeholder="Custom emoji..."
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={footerHoursTitle}
                      onChange={(e) => setFooterHoursTitle(e.target.value)}
                      placeholder="Operating Hours"
                      className="flex-1 px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-black text-green-950 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFooterHoursItems([
                        ...footerHoursItems,
                        { text: "New Schedule", show: true },
                      ]);
                    }}
                    className="px-2.5 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <FaPlus className="text-[9px]" /> <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {footerHoursItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-white rounded-xl border border-gray-200 flex items-center gap-2 shadow-2xs"
                    >
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => {
                          const updated = [...footerHoursItems];
                          updated[idx] = { ...updated[idx], text: e.target.value };
                          setFooterHoursItems(updated);
                        }}
                        placeholder="e.g. Mon-Sat: 8 AM - 8 PM"
                        className="flex-1 px-2.5 py-1 text-xs font-medium text-gray-800 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFooterHoursItems(footerHoursItems.filter((_, i) => i !== idx));
                        }}
                        className="w-7 h-7 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition cursor-pointer"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 7: Payment Methods & Return Policy */}
            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-6">
              {/* Payment Methods */}
              <div className="space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-amber-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === "payment" ? null : "payment")}
                        className="w-8 h-8 rounded-lg bg-white hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-sm transition cursor-pointer shadow-2xs font-bold shrink-0"
                        title="Change Payment Icon"
                      >
                        {footerPaymentIcon || "💳"}
                      </button>

                      {activeFooterIconPicker === "payment" && (
                        <div className="absolute top-9 left-0 z-50 p-2.5 bg-white rounded-2xl shadow-2xl border border-gray-200 w-56 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                            <span>Payment Icon</span>
                            <button
                              type="button"
                              onClick={() => setActiveFooterIconPicker(null)}
                              className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                            >
                              <FaTimes />
                            </button>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {["💳", "💰", "💸", "🪙", "🏦", "🏷️", "💵", "✨"].map((ic) => (
                              <button
                                key={ic}
                                type="button"
                                onClick={() => {
                                  setFooterPaymentIcon(ic);
                                  setActiveFooterIconPicker(null);
                                }}
                                className="w-10 h-10 rounded-xl hover:bg-yellow-100 flex items-center justify-center text-lg transition cursor-pointer"
                              >
                                {ic}
                              </button>
                            ))}
                          </div>
                          <div className="pt-1 border-t border-gray-100">
                            <input
                              type="text"
                              value={footerPaymentIcon}
                              onChange={(e) => setFooterPaymentIcon(e.target.value)}
                              placeholder="Custom emoji..."
                              className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={footerPaymentTitle}
                      onChange={(e) => setFooterPaymentTitle(e.target.value)}
                      placeholder="Payment Methods:"
                      className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-black text-gray-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFooterPaymentMethods([
                        ...footerPaymentMethods,
                        { name: "New Method", bgColor: "bg-blue-600", icon: "", show: true },
                      ]);
                    }}
                    className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer self-start sm:self-auto"
                  >
                    <FaPlus className="text-[10px]" /> <span>New Method Add</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {footerPaymentMethods.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-gray-200 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold text-white ${m.bgColor}`}>
                          {m.name || "Method"}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFooterPaymentMethods(footerPaymentMethods.filter((_, i) => i !== idx));
                          }}
                          className="text-red-500 hover:text-red-700 text-xs"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => {
                          const updated = [...footerPaymentMethods];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFooterPaymentMethods(updated);
                        }}
                        placeholder="Method Name (e.g. bKash)"
                        className="w-full px-2.5 py-1 text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg"
                      />

                      {/* Color badge picker */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {[
                          { cls: "bg-pink-600", name: "bKash" },
                          { cls: "bg-orange-500", name: "Nagad" },
                          { cls: "bg-purple-600", name: "Rocket" },
                          { cls: "bg-green-600", name: "Cash" },
                          { cls: "bg-blue-600", name: "Visa" },
                          { cls: "bg-slate-700", name: "Mastercard" },
                        ].map((c) => (
                          <button
                            key={c.cls}
                            type="button"
                            onClick={() => {
                              const updated = [...footerPaymentMethods];
                              updated[idx] = { ...updated[idx], bgColor: c.cls };
                              setFooterPaymentMethods(updated);
                            }}
                            className={`w-5 h-5 rounded-full ${c.cls} transition cursor-pointer ${
                              m.bgColor === c.cls ? "ring-2 ring-offset-1 ring-gray-600" : ""
                            }`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Policy (Totally Dynamic & Optional) */}
              <div className="pt-4 border-t border-amber-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                    <h5 className="text-xs font-black text-green-950 uppercase">
                      Return Policy Banner
                    </h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">
                      {footerReturnPolicyShow ? "Visible" : "Hidden"}
                    </span>
                    <input
                      type="checkbox"
                      checked={footerReturnPolicyShow}
                      onChange={(e) => setFooterReturnPolicyShow(e.target.checked)}
                      className="toggle toggle-sm toggle-success"
                    />
                  </div>
                </div>

                {footerReturnPolicyShow && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Icon
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === "return" ? null : "return")}
                          className="w-full px-3 py-1.5 text-xs bg-gray-50 hover:bg-yellow-50 border border-gray-200 hover:border-gray-300 rounded-lg text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer transition"
                          title="Change policy icon"
                        >
                          {footerReturnPolicyIcon?.startsWith("data:") ||
                          footerReturnPolicyIcon?.startsWith("http") ||
                          footerReturnPolicyIcon?.startsWith("/") ? (
                            <img
                              src={footerReturnPolicyIcon}
                              alt="Policy Icon"
                              className="w-4 h-4 object-contain rounded inline-block"
                            />
                          ) : (
                            <span>{footerReturnPolicyIcon || "🛡️"}</span>
                          )}
                          <span className="text-[10px] text-gray-500">(Change Icon)</span>
                        </button>

                        {activeFooterIconPicker === "return" && (
                          <div className="absolute top-9 left-0 z-50 p-2.5 bg-white rounded-2xl shadow-2xl border border-gray-200 w-64 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                              <span>Return Policy Icon</span>
                              <button
                                type="button"
                                onClick={() => setActiveFooterIconPicker(null)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                              {["🛡️", "🔄", "📦", "✅", "↩️", "🔒", "💯", "⭐"].map((ic) => (
                                <button
                                  key={ic}
                                  type="button"
                                  onClick={() => {
                                    setFooterReturnPolicyIcon(ic);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className="w-10 h-10 rounded-xl hover:bg-yellow-100 flex items-center justify-center text-lg transition cursor-pointer"
                                >
                                  {ic}
                                </button>
                              ))}
                            </div>
                            <div className="pt-1 border-t border-gray-100">
                              <input
                                type="text"
                                value={footerReturnPolicyIcon}
                                onChange={(e) => setFooterReturnPolicyIcon(e.target.value)}
                                placeholder="Custom emoji / text..."
                                className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            {/* Upload Custom Icon Option */}
                            <div className="pt-1 border-t border-gray-100">
                              <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-yellow-100 text-gray-700 text-[11px] font-bold rounded-lg cursor-pointer transition">
                                <FaUpload className="text-[10px]" /> <span>Upload Custom Icon</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleReturnPolicyIconUpload(e.target.files?.[0])}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Policy Text
                      </label>
                      <input
                        type="text"
                        value={footerReturnPolicyText}
                        onChange={(e) => setFooterReturnPolicyText(e.target.value)}
                        placeholder="7 Days Return Policy"
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Policy Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={footerReturnPolicyLink}
                        onChange={(e) => setFooterReturnPolicyLink(e.target.value)}
                        placeholder="# or /policy"
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg font-mono text-gray-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            
            {/* ========================================================================= */}
            {/* Part 7: Feature Highlights Bar */}
            {/* ========================================================================= */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/50 to-green-50/40 border border-amber-200/70 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-amber-200/60 pb-2.5">
                <div>
                  <h4 className="text-xs font-black text-green-950 uppercase flex items-center gap-1.5">
                    <FaMedal className="text-yellow-600" /> Feature Highlights Bar
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFooterFeatures([
                      ...footerFeatures,
                      { icon: "star", title: "New Feature", desc: "Feature details", show: true },
                    ]);
                  }}
                  className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <FaPlus className="text-[10px]" /> <span>Add New Feature</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                {footerFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-gray-200 space-y-2.5 shadow-2xs relative"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-[11px] font-black text-gray-700">Feature #{idx + 1}</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={feat.show !== false}
                          onChange={(e) => {
                            const updated = [...footerFeatures];
                            updated[idx] = { ...updated[idx], show: e.target.checked };
                            setFooterFeatures(updated);
                          }}
                          className="toggle toggle-xs toggle-success"
                          title="Toggle Visibility"
                        />
                        {footerFeatures.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setFooterFeatures(footerFeatures.filter((_, i) => i !== idx));
                            }}
                            className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Icon Picker */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveFooterIconPicker(activeFooterIconPicker === `feat_${idx}` ? null : `feat_${idx}`)}
                          className="w-10 h-10 rounded-xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 flex items-center justify-center text-lg text-yellow-700 transition cursor-pointer overflow-hidden shadow-inner shrink-0"
                          title="Change Icon (Click to Choose or Upload)"
                        >
                          {feat.icon === "truck" && <FaTruck />}
                          {feat.icon === "leaf" && <FaLeaf />}
                          {feat.icon === "headset" && <FaHeadset />}
                          {feat.icon === "medal" && <FaMedal />}
                          {feat.icon === "star" && <FaStar />}
                          {!["truck", "leaf", "headset", "medal", "star"].includes(feat.icon) && (
                            feat.icon?.startsWith("data:") || feat.icon?.startsWith("http") || feat.icon?.startsWith("/") ? (
                              <img src={feat.icon} alt="" className="w-6 h-6 object-contain" />
                            ) : (
                              <span>{feat.icon || "⭐"}</span>
                            )
                          )}
                        </button>

                        {/* Floating Feature Icon Picker */}
                        {activeFooterIconPicker === `feat_${idx}` && (
                          <div className="absolute top-11 left-0 z-50 p-3 bg-white rounded-2xl shadow-2xl border border-gray-200 w-64 space-y-2.5">
                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 border-b pb-1">
                              <span>Select Feature Icon</span>
                              <button
                                type="button"
                                onClick={() => setActiveFooterIconPicker(null)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
                              >
                                <FaTimes />
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5 text-xs">
                              {[
                                { key: "truck", label: "🚚 Truck" },
                                { key: "leaf", label: "🍃 Leaf" },
                                { key: "headset", label: "🎧 Support" },
                                { key: "medal", label: "🏅 Medal" },
                                { key: "star", label: "⭐ Star" },
                                { key: "shield", label: "🛡️ Shield" },
                              ].map((opt) => (
                                <button
                                  key={opt.key}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...footerFeatures];
                                    updated[idx] = { ...updated[idx], icon: opt.key };
                                    setFooterFeatures(updated);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className={`p-1.5 rounded-lg border text-center transition cursor-pointer text-[10px] font-bold ${
                                    feat.icon === opt.key ? "bg-green-100 border-green-500 text-green-900" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-6 gap-1 max-h-24 overflow-y-auto pt-1 border-t border-gray-100">
                              {POPULAR_FOOTER_ICONS.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...footerFeatures];
                                    updated[idx] = { ...updated[idx], icon: emoji };
                                    setFooterFeatures(updated);
                                    setActiveFooterIconPicker(null);
                                  }}
                                  className="w-8 h-8 rounded-lg hover:bg-yellow-100 flex items-center justify-center text-sm transition cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                            <div className="pt-1 border-t border-gray-100 flex items-center gap-1">
                              <input
                                type="text"
                                value={feat.icon?.startsWith("data:") ? "" : feat.icon}
                                onChange={(e) => {
                                  const updated = [...footerFeatures];
                                  updated[idx] = { ...updated[idx], icon: e.target.value };
                                  setFooterFeatures(updated);
                                }}
                                placeholder="Custom emoji/code..."
                                className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                              />
                            </div>
                            <label className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 rounded-xl text-[10px] font-bold transition cursor-pointer">
                              <FaUpload className="text-[9px]" />
                              <span>Upload Custom Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFooterItemIconUpload(setFooterFeatures, footerFeatures, idx, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">
                          Feature Title
                        </label>
                        <input
                          type="text"
                          value={feat.title}
                          onChange={(e) => {
                            const updated = [...footerFeatures];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setFooterFeatures(updated);
                          }}
                          placeholder="e.g. Nationwide Delivery"
                          className="w-full px-2.5 py-1 text-xs font-black text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">
                        Subtitle / Description
                      </label>
                      <input
                        type="text"
                        value={feat.desc}
                        onChange={(e) => {
                          const updated = [...footerFeatures];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          setFooterFeatures(updated);
                        }}
                        placeholder="e.g. Fast & Secure"
                        className="w-full px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Part 8: Copyright & Developer Credits */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                <h4 className="text-sm font-extrabold text-green-950">
                  Copyright & Policy Links Settings
                </h4>
              </div>

              

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Copyright Text
                  </label>
                  <input
                    type="text"
                    value={footerCopyrightText}
                    onChange={(e) => setFooterCopyrightText(e.target.value)}
                    placeholder="Ammwala Bhaiyer - All Rights Reserved"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-900"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-gray-700">
                    Policy Links (Privacy Policy & Terms of Service)
                  </label>

                  {/* Privacy Policy Toggle & Inputs */}
                  <div
                    className={`p-2.5 rounded-xl border transition-all ${
                      footerPrivacyPolicyShow
                        ? "bg-white border-green-300 shadow-2xs"
                        : "bg-gray-50 border-gray-200 opacity-75"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={footerPrivacyPolicyShow}
                          onChange={(e) => setFooterPrivacyPolicyShow(e.target.checked)}
                          className="w-3.5 h-3.5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-gray-800">
                          Privacy Policy
                        </span>
                      </label>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          footerPrivacyPolicyShow
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {footerPrivacyPolicyShow ? "Visible" : "Hidden"}
                      </span>
                    </div>

                    {footerPrivacyPolicyShow && (
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <input
                          type="text"
                          value={footerPrivacyPolicyText}
                          onChange={(e) => setFooterPrivacyPolicyText(e.target.value)}
                          placeholder="Privacy Policy"
                          className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={footerPrivacyPolicyLink}
                          onChange={(e) => setFooterPrivacyPolicyLink(e.target.value)}
                          placeholder="Link (#)"
                          className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {/* Terms of Service Toggle & Inputs */}
                  <div
                    className={`p-2.5 rounded-xl border transition-all ${
                      footerTermsShow
                        ? "bg-white border-green-300 shadow-2xs"
                        : "bg-gray-50 border-gray-200 opacity-75"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={footerTermsShow}
                          onChange={(e) => setFooterTermsShow(e.target.checked)}
                          className="w-3.5 h-3.5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-gray-800">
                          Terms of Service
                        </span>
                      </label>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          footerTermsShow
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {footerTermsShow ? "Visible" : "Hidden"}
                      </span>
                    </div>

                    {footerTermsShow && (
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <input
                          type="text"
                          value={footerTermsText}
                          onChange={(e) => setFooterTermsText(e.target.value)}
                          placeholder="Terms of Service"
                          className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={footerTermsLink}
                          onChange={(e) => setFooterTermsLink(e.target.value)}
                          placeholder="Link (#)"
                          className="px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              
            </div>

            {/* ========================================================================= */}
            {/* Live Footer Section Preview (Desktop & Mobile) */}
            {/* ========================================================================= */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gray-950 text-white space-y-4 shadow-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      Live Footer Section Preview
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {footerPreviewDevice === "desktop" ? "Desktop 1200px" : "Mobile 360px"}
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400">
                      Real-time interactive rendering of customer storefront footer
                    </p>
                  </div>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-xl text-xs font-bold self-start sm:self-auto border border-gray-800">
                  <button
                    type="button"
                    onClick={() => setFooterPreviewDevice("desktop")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      footerPreviewDevice === "desktop"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaDesktop /> <span>Desktop View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFooterPreviewDevice("mobile")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                      footerPreviewDevice === "mobile"
                        ? "bg-green-600 text-white shadow font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt /> <span>Mobile View</span>
                  </button>
                </div>
              </div>

              {/* Rendered Live Preview */}
              {footerPreviewDevice === "desktop" ? (
                /* DESKTOP FOOTER PREVIEW */
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-6 text-white space-y-6 shadow-inner overflow-hidden relative">
                  {/* Top Floating Scroll-to-Top Button */}
                  <div className="flex justify-center -mt-9 mb-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 text-green-950 flex items-center justify-center shadow-lg font-black text-xs border border-white/20">
                      <FaChevronUp />
                    </span>
                  </div>

                  {/* 4-Col Grid */}
                  <div className="grid grid-cols-4 gap-6 text-xs">
                    {/* Col 1: Brand & About */}
                    <div className="space-y-3">
                      {footerBrandDisplay === "logo_only" && (footerLogo || websiteLogo) ? (
                        <img
                          src={footerLogo || websiteLogo}
                          alt="Logo"
                          className="h-10 w-auto max-w-[160px] object-contain rounded bg-white/5 p-1"
                        />
                      ) : (
                        <div className="flex items-center space-x-2.5">
                          {footerLogo || websiteLogo ? (
                            <img
                              src={footerLogo || websiteLogo}
                              alt="Logo"
                              className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center">
                              <FaLeaf className="text-white text-lg" />
                            </div>
                          )}
                          <div>
                            <h4
                              className="font-black text-sm"
                              style={
                                footerTitleColorType === "gradient"
                                  ? {
                                      backgroundImage: footerTitleColorVal,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                    }
                                  : { color: footerTitleColorVal }
                              }
                            >
                              {footerBrandTitle || "আমওয়ালা ভাইয়া"}
                            </h4>
                            <p className="text-[10px] text-yellow-300">
                              {footerBrandTagline || "প্রিমিয়াম মানের দেশি আম"}
                            </p>
                          </div>
                        </div>
                      )}
                      <p className="text-gray-300 text-[11px] leading-relaxed line-clamp-3">
                        {footerAboutText}
                      </p>
                      <div className="flex gap-2 pt-1">
                        {footerSocialLinks
                          .filter((s) => s.show !== false)
                          .map((s, i) => (
                            <span
                              key={i}
                              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs hover:bg-white/20 transition cursor-default"
                            >
                              {s.icon === "facebook" && <FaFacebookF />}
                              {s.icon === "instagram" && <FaInstagram />}
                              {s.icon === "youtube" && <FaYoutube />}
                              {s.icon === "whatsapp" && <FaWhatsapp />}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="space-y-2.5">
                      <h5 className="font-bold border-l-2 border-yellow-400 pl-2 text-white">
                        {footerCol2Title || "দ্রুত লিংক"}
                      </h5>
                      <ul className="space-y-1.5 text-gray-300 text-[11px]">
                        {footerQuickLinks.slice(0, 5).map((l, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span>{l.icon}</span>
                            <span>{l.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Col 3: Mango Varieties */}
                    <div className="space-y-2.5">
                      <h5 className="font-bold border-l-2 border-yellow-400 pl-2 text-white">
                        {footerCol3Title || "আমের জাত"}
                      </h5>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-300">
                        {footerMangoList.slice(0, 8).map((m, i) => (
                          <div key={i} className="flex items-center gap-1 truncate">
                            <span>{m.icon}</span>
                            <span className="truncate">{m.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Col 4: Contact & Hours */}
                    <div className="space-y-2.5 text-[11px]">
                      <h5 className="font-bold border-l-2 border-yellow-400 pl-2 text-white">
                        {footerCol4Title || "যোগাযোগ"}
                      </h5>
                      <ul className="space-y-1 text-gray-300">
                        {footerContactItems.slice(0, 4).map((c, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <span className="text-yellow-400">
                              {c.icon === "phone" && <FaPhoneAlt className="text-[10px]" />}
                              {c.icon === "whatsapp" && <FaWhatsapp className="text-[10px]" />}
                              {c.icon === "envelope" && <FaEnvelope className="text-[10px]" />}
                              {c.icon === "map-marker" && <FaMapMarkerAlt className="text-[10px]" />}
                              {!["phone", "whatsapp", "envelope", "map-marker"].includes(c.icon) && (
                                <span>{c.icon || "📞"}</span>
                              )}
                            </span>
                            <span className="truncate">{c.text}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-white/10 text-[10px]">
                        <span className="font-bold text-yellow-400">
                          {footerHoursIcon} {footerHoursTitle}
                        </span>
                        <p className="text-gray-300 mt-0.5">
                          {footerHoursItems[0]?.text || "সোম-শনি: সকাল ৮টা - রাত ৮টা"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature Highlights Banner */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-t border-b border-white/10 text-center">
                    {footerFeatures.filter(f => f.show !== false).map((feat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-lg text-yellow-400 flex justify-center">
                          {feat.icon === "truck" && <FaTruck />}
                          {feat.icon === "leaf" && <FaLeaf />}
                          {feat.icon === "headset" && <FaHeadset />}
                          {feat.icon === "medal" && <FaMedal />}
                          {feat.icon === "star" && <FaStar />}
                          {!["truck", "leaf", "headset", "medal", "star"].includes(feat.icon) && (
                            feat.icon?.startsWith("data:") || feat.icon?.startsWith("http") || feat.icon?.startsWith("/") ? (
                              <img src={feat.icon} alt="" className="w-5 h-5 object-contain mx-auto" />
                            ) : (
                              <span>{feat.icon || "⭐"}</span>
                            )
                          )}
                        </div>
                        <h6 className="font-bold text-[11px] text-white">{feat.title}</h6>
                        <p className="text-[10px] text-gray-400">{feat.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Return */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">{footerPaymentIcon}</span>
                      <span className="text-gray-300 font-bold">{footerPaymentTitle}</span>
                      <div className="flex gap-1.5">
                        {footerPaymentMethods.map((m, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold shadow-xs ${m.bgColor}`}
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {footerReturnPolicyShow && (
                      <div className="flex items-center gap-1.5 text-green-300 font-bold">
                        {footerReturnPolicyIcon?.startsWith("data:") ||
                        footerReturnPolicyIcon?.startsWith("http") ||
                        footerReturnPolicyIcon?.startsWith("/") ? (
                          <img
                            src={footerReturnPolicyIcon}
                            alt=""
                            className="w-4 h-4 object-contain inline-block shrink-0"
                          />
                        ) : (
                          <span>{footerReturnPolicyIcon}</span>
                        )}
                        <span>{footerReturnPolicyText}</span>
                      </div>
                    )}
                  </div>

                  {/* Copyright (NO admin link, English DevHome) */}
                  <div className="pt-3 border-t border-white/10 text-center text-[11px] text-gray-400 space-y-1">
                    <p>
                      {footerCopyrightText.includes("{year}")
                        ? footerCopyrightText.replace(/{year}/gi, new Date().getFullYear())
                        : `© ${new Date().getFullYear()} ${footerCopyrightText.replace(/^©\s*/, "")}`}
                      {footerPrivacyPolicyShow && <> | {footerPrivacyPolicyText}</>}
                      {footerTermsShow && <> | {footerTermsText}</>}
                    </p>
                    <p className="text-gray-500 text-[10px]">
                      {footerDeveloperCreditText} <span className="text-yellow-400 font-bold">{footerDeveloperName}</span>
                    </p>
                  </div>
                </div>
              ) : (
                /* SMARTPHONE FRAME MOCKUP (MOBILE FOOTER PREVIEW) */
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-[360px] rounded-[42px] border-[8px] border-gray-800 bg-gray-950 shadow-2xl overflow-hidden relative">
                    {/* Dynamic Island / Notch */}
                    <div className="h-6 bg-gray-950 flex justify-center items-center">
                      <div className="w-24 h-4 bg-gray-900 rounded-full flex items-center justify-end pr-2 border border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                      </div>
                    </div>

                    {/* Mobile Screen Content */}
                    <div className="bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-4 text-white text-xs space-y-5 max-h-[580px] overflow-y-auto">
                      {/* Top Scroll button */}
                      <div className="flex justify-center -mt-6 mb-1">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 text-green-950 flex items-center justify-center shadow-lg font-black text-[10px]">
                          <FaChevronUp />
                        </span>
                      </div>

                      {/* Brand Info */}
                      <div className="space-y-2 text-center">
                        {footerLogo || websiteLogo ? (
                          <img
                            src={footerLogo || websiteLogo}
                            alt="Logo"
                            className="w-12 h-12 object-contain rounded-full bg-white p-0.5 mx-auto shadow"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow">
                            <FaLeaf className="text-white text-xl" />
                          </div>
                        )}
                        <h4
                          className="font-black text-base"
                          style={
                            footerTitleColorType === "gradient"
                              ? {
                                  backgroundImage: footerTitleColorVal,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                              : { color: footerTitleColorVal }
                          }
                        >
                          {footerBrandTitle || "আমওয়ালা ভাইয়া"}
                        </h4>
                        <p className="text-[10px] text-yellow-300">
                          {footerBrandTagline || "প্রিমিয়াম মানের দেশি আম"}
                        </p>
                        <p className="text-[10px] text-gray-300 line-clamp-3 leading-relaxed px-2">
                          {footerAboutText}
                        </p>

                        <div className="flex justify-center gap-2 pt-1">
                          {footerSocialLinks
                            .filter((s) => s.show !== false)
                            .map((s, i) => (
                              <span
                                key={i}
                                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs"
                              >
                                {s.icon === "facebook" && <FaFacebookF />}
                                {s.icon === "instagram" && <FaInstagram />}
                                {s.icon === "youtube" && <FaYoutube />}
                                {s.icon === "whatsapp" && <FaWhatsapp />}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Quick links in mobile */}
                      <div className="pt-2 border-t border-white/10 space-y-2">
                        <span className="font-bold text-yellow-400 block text-xs">{footerCol2Title}</span>
                        <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-300">
                          {footerQuickLinks.map((l, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5">
                              {l.icon} {l.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mango varieties in mobile */}
                      <div className="pt-2 border-t border-white/10 space-y-2">
                        <span className="font-bold text-yellow-400 block text-xs">{footerCol3Title}</span>
                        <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-300">
                          {footerMangoList.slice(0, 6).map((m, i) => (
                            <div key={i} className="flex items-center gap-1 truncate">
                              <span>{m.icon}</span>
                              <span className="truncate">{m.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact & Hours */}
                      <div className="pt-2 border-t border-white/10 space-y-2">
                        <span className="font-bold text-yellow-400 block text-xs">{footerCol4Title}</span>
                        <div className="space-y-1 text-[10px] text-gray-300">
                          {footerContactItems.map((c, i) => (
                            <p key={i} className="truncate">
                              {c.text}
                            </p>
                          ))}
                        </div>
                        <p className="text-[10px] text-green-300 pt-1">
                          {footerHoursIcon} {footerHoursItems[0]?.text || "সোম-শনি: সকাল ৮টা - রাত ৮টা"}
                        </p>
                      </div>

                      {/* Feature Highlights 2x2 */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
                        {footerFeatures.filter(f => f.show !== false).map((feat, idx) => (
                          <div key={idx} className="p-2 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-yellow-400 mx-auto mb-0.5 text-xs flex justify-center">
                              {feat.icon === "truck" && <FaTruck />}
                              {feat.icon === "leaf" && <FaLeaf />}
                              {feat.icon === "headset" && <FaHeadset />}
                              {feat.icon === "medal" && <FaMedal />}
                              {feat.icon === "star" && <FaStar />}
                              {!["truck", "leaf", "headset", "medal", "star"].includes(feat.icon) && (
                                feat.icon?.startsWith("data:") || feat.icon?.startsWith("http") || feat.icon?.startsWith("/") ? (
                                  <img src={feat.icon} alt="" className="w-4 h-4 object-contain mx-auto" />
                                ) : (
                                  <span>{feat.icon || "⭐"}</span>
                                )
                              )}
                            </div>
                            <p className="font-bold text-[10px]">{feat.title}</p>
                            <p className="text-[8px] text-gray-400">{feat.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Payment & Return */}
                      <div className="pt-2 border-t border-white/10 space-y-2 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {footerPaymentMethods.map((m, i) => (
                            <span key={i} className={`px-2 py-0.5 rounded text-[9px] font-bold ${m.bgColor}`}>
                              {m.name}
                            </span>
                          ))}
                        </div>
                        {footerReturnPolicyShow && (
                          <p className="text-[10px] text-green-300 font-bold flex items-center justify-center gap-1">
                            {footerReturnPolicyIcon?.startsWith("data:") ||
                            footerReturnPolicyIcon?.startsWith("http") ||
                            footerReturnPolicyIcon?.startsWith("/") ? (
                              <img
                                src={footerReturnPolicyIcon}
                                alt=""
                                className="w-3.5 h-3.5 object-contain inline-block shrink-0"
                              />
                            ) : (
                              <span>{footerReturnPolicyIcon}</span>
                            )}
                            <span>{footerReturnPolicyText}</span>
                          </p>
                        )}
                      </div>

                      {/* Copyright */}
                      <div className="pt-2 border-t border-white/10 text-center text-[9px] text-gray-400 space-y-0.5">
                        <p>
                          {footerCopyrightText.includes("{year}")
                            ? footerCopyrightText.replace(/{year}/gi, new Date().getFullYear())
                            : `© ${new Date().getFullYear()} ${footerCopyrightText.replace(/^©\s*/, "")}`}
                        </p>
                        <p>{footerDeveloperCreditText} <span className="text-yellow-400">{footerDeveloperName}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Save Settings Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-700 via-green-600 to-amber-600 hover:from-green-800 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition flex items-center gap-2 cursor-pointer text-sm"
              >
                <FaSave />
                <span>Save All Settings</span>
              </button>
            </div>
          </div>


        </form>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg shadow-sm">
                  <FaShieldAlt />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Change Admin Password</h3>
                  <p className="text-xs text-gray-400">Set a strong, verified password</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleChangePasswordSubmit} className="mt-5 space-y-4">
              {/* Field 1: Current Password */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Field 2: Type New Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-extrabold text-gray-700">
                    Type New Password <span className="text-red-500">*</span>
                  </label>
                  {newPassword && (
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${strengthBadge}`}
                    >
                      {strengthLabel}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Type new secure password"
                    className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Strength Progress Bar */}
                <div className="mt-2 space-y-1">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div
                      className={`h-full transition-all duration-300 ${progressBarColor}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-0.5">
                    <span>Weak</span>
                    <span>Normal</span>
                    <span>Strong</span>
                  </div>
                </div>
              </div>

              {/* Field 3: Confirm New Password */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Retype new password"
                    className={`w-full px-4 py-2.5 pr-10 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                      confirmNewPassword && !isConfirmMatching
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-green-500"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {confirmNewPassword && !isConfirmMatching && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                    <FaTimesCircle /> Passwords do not match
                  </p>
                )}
                {confirmNewPassword && isConfirmMatching && (
                  <p className="text-[11px] text-green-600 font-semibold mt-1 flex items-center gap-1">
                    <FaCheckCircle /> Passwords match perfectly
                  </p>
                )}
              </div>

              {/* Password Requirement Checklist */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <p className="text-[11px] font-black uppercase text-gray-500 tracking-wider">
                  Password Requirements:
                </p>
                <div className="space-y-1.5">
                  {passwordRules.map((rule) => {
                    const valid = rule.isValid(newPassword);
                    return (
                      <div
                        key={rule.id}
                        className={`text-xs flex items-center gap-2 transition ${
                          valid ? "text-green-700 font-bold" : "text-gray-500"
                        }`}
                      >
                        {valid ? (
                          <FaCheck className="text-green-600 text-[11px] shrink-0" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full border border-gray-300 shrink-0" />
                        )}
                        <span>{rule.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword || !isPasswordValid || !isConfirmMatching}
                  className={`px-5 py-2 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2 cursor-pointer ${
                    !isPasswordValid || !isConfirmMatching || isChangingPassword
                      ? "bg-gray-400 cursor-not-allowed opacity-60"
                      : "admin-btn-primary"
                  }`}
                >
                  <FaKey />
                  <span>{isChangingPassword ? "Updating..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
      {/* ADD REVIEW MODAL */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg shadow-sm">
                  <FaStar />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Add New Custom Review</h3>
                  <p className="text-xs text-gray-400">Add customer feedback, rating, and select target product</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddReviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateReviewSubmit} className="mt-5 space-y-4">
              {/* Field 0: Target Product Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={newRevProductId}
                  onChange={(e) => {
                    const pId = e.target.value;
                    const sel = (products || []).find((p) => String(p._id || p.id || p.slug) === String(pId));
                    setNewRevProductId(pId);
                    if (sel?.image) {
                      setNewRevAvatar(sel.image);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">-- Choose a Product --</option>
                  {(products || []).map((p) => (
                    <option key={p._id || p.id} value={p._id || p.id || p.slug}>
                      {p.name_bn || p.name} {p.name_en ? `(${p.name_en})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 1: Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newRevName}
                    onChange={(e) => setNewRevName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Address / City
                  </label>
                  <input
                    type="text"
                    value={newRevLocation}
                    onChange={(e) => setNewRevLocation(e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Field 2: Rating Stars */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNewRevRating(st)}
                      className="cursor-pointer transition hover:scale-125"
                    >
                      <FaStar
                        className={`text-2xl ${
                          st <= newRevRating ? "text-amber-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-2">
                    ({newRevRating} Stars)
                  </span>
                </div>
              </div>

              {/* Field 3: Product Thumbnail Display */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Product Thumbnail
                </label>
                {(() => {
                  const selProd = (products || []).find((p) => String(p._id || p.id || p.slug) === String(newRevProductId));
                  const thumb = selProd?.image || newRevAvatar;
                  return (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xs shrink-0 overflow-hidden border-2 border-amber-300">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt="Product"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl">🥭</span>
                        )}
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-gray-800 block">
                          {selProd ? (selProd.name_bn || selProd.name) : "No Product Selected"}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {selProd ? "Product thumbnail automatically linked" : "Please choose a product from the list above"}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Field 4: Comment Quote */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Review / Feedback Statement <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={newRevComment}
                  onChange={(e) => setNewRevComment(e.target.value)}
                  placeholder="Write customer review statement..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddReviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white text-xs font-extrabold hover:from-green-800 hover:to-green-700 shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FaPlus /> <span>Add Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

</div>
  );
}
