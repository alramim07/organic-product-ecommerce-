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
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";
import { api } from "../../services/api";

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
  const { settings, updateSettings, adminToken } = useApp();

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
                  Header-e sudhu matro single logo dekhaben, naki logo-r pashe Store Name & Tagline text dekhaben ta select korun ebong text edit korun.
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
                      Header-e sudhu matro uploaded single logo image show korbe. Kono extra text dekhabe na.
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
                      Logo icon-er pashe Store Name & Tagline text dekhabe (nicher box-e edit kora jabe).
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
                      Website-er title ebong tagline text ja header text mode ebong footer copyright-e use hoy.
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
                      Header text mode ebong Footer copyright-e show kore
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
                      Store name-er niche choto subtitle slogan
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                    <div className="w-full md:w-44">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase">
                        Link / Section Anchor
                      </label>
                      <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1.5">
                        <FaLink className="text-[10px] text-gray-400 shrink-0" />
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => handleUpdateMenuItem(index, "href", e.target.value)}
                          placeholder="#home or /page"
                          className="w-full bg-transparent text-xs font-mono font-semibold text-gray-700 focus:outline-none"
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
                    <div className="flex-1 bg-gray-900 px-4 py-1 rounded-lg text-center font-mono text-[11px] text-gray-300 truncate">
                      🔒 https://ammwala.com
                    </div>
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
                  Homepage-er top Hero Section-er background (Single Image vs Carousel), main headline, subtitles, trust badges ebong features control korun.
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
                  User chaile akta single static image o use korte pare (kono animation ba slider chara), athoba multi-image carousel use korte pare.
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
                      Just akta image static thakbe. Kono slider, next/prev arrow ba animation thakbe na.
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
                    <span className="text-sm font-black text-gray-900 block">Multiple Texts (Animation সহ)</span>
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
                            <FaPhoneAlt className="text-green-600" /> Phone / Hotline Number (ব্যানারে প্রদর্শিত হটলাইন নম্বর)
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
                          <p className="text-[11px] text-gray-400 mt-1">
                            Hero banner-er niche features list-e ei hotline number ti show korbe
                          </p>
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
                    {/* Browser Bar */}
                    <div className="bg-gray-800/90 px-4 py-2 border-b border-gray-700/60 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 max-w-sm mx-auto bg-gray-950/80 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono text-center border border-gray-700/50">
                        https://ammwalavaiya.com
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
    </div>
  );
}
