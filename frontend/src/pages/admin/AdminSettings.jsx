import { useState, useEffect } from "react";
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

  // Active Tab state: "dashboard" or "website"
  const [activeTab, setActiveTab] = useState("dashboard");

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
          onClick={() => setActiveTab("dashboard")}
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
          onClick={() => setActiveTab("website")}
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
                        className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-yellow-50 border border-gray-300 flex items-center justify-center text-lg shadow-inner cursor-pointer transition"
                        title="Click to select or change icon"
                      >
                        {item.icon ? (
                          item.icon.startsWith("data:") || item.icon.startsWith("http") ? (
                            <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
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
                              value={item.icon}
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

                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-2 text-xs">
                  <span className="text-gray-500 font-medium">Aligned Header Buttons:</span>
                  <div className="flex items-center gap-2 pointer-events-none">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow text-xl">
                      <FaWhatsapp />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center shadow text-base">
                      <FaShoppingCart />
                    </div>
                  </div>
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
                      Live Header Preview (লাইভ প্রিভিউ)
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
                          className="w-10 h-10 object-contain rounded-xl bg-white shadow-sm border border-gray-200"
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
                      <div>
                        <h5 className="text-sm font-black text-green-900 leading-tight">
                          {siteName || "আমওয়ালা ভাইয়া"}
                        </h5>
                        <p className="text-[10px] text-amber-700 font-semibold truncate max-w-[160px]">
                          {tagline || "প্রিমিয়াম মানের দেশি আম"}
                        </p>
                      </div>
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
                      {headerCartShow && (
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center shadow text-base">
                          <FaShoppingCart />
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
                            className="w-8 h-8 object-contain rounded-xl bg-white shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs shrink-0 shadow">
                            🍃
                          </div>
                        )}
                        <span className="text-xs font-black text-green-950 truncate">
                          {siteName || "আমওয়ালা ভাইয়া"}
                        </span>
                      </div>

                      {/* Right icons on mobile */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {headerWhatsappShow && (
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm shadow">
                            <FaWhatsapp />
                          </div>
                        )}
                        {headerCartShow && (
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center text-xs shadow">
                            <FaShoppingCart />
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

          {/* Section 2: Contact Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2">
              2. Contact & Hotline Information (Header & Footer)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaPhoneAlt className="text-green-600" /> Display Hotline Phone
                </label>
                <input
                  type="text"
                  value={hotlinePhone}
                  onChange={(e) => setHotlinePhone(e.target.value)}
                  placeholder="০১৭৪৯-৭৭৫০৩০"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaPhoneAlt className="text-gray-400" /> Raw Dialing Number (e.g. 01749775030)
                </label>
                <input
                  type="text"
                  value={rawHotlinePhone}
                  onChange={(e) => setRawHotlinePhone(e.target.value)}
                  placeholder="01749775030"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaWhatsapp className="text-emerald-600" /> WhatsApp Number (with Country Code)
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="8801749775030"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaEnvelope className="text-amber-600" /> Support Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ammwalaaviya@gmail.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-red-500" /> Physical Office Address
                </label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="রাজশাহী, বাংলাদেশ - ৬২০৩"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Fees */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaTruck className="text-green-600" /> 3. Delivery Fees & Shipping Charges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Inside Dhaka Delivery Fee (৳)
                </label>
                <input
                  type="number"
                  value={deliveryFeeDhaka}
                  onChange={(e) => setDeliveryFeeDhaka(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl font-black text-green-800 text-lg"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Applied automatically in checkout for inside Dhaka orders
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Outside Dhaka Delivery Fee (৳)
                </label>
                <input
                  type="number"
                  value={deliveryFeeOutside}
                  onChange={(e) => setDeliveryFeeOutside(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl font-black text-green-800 text-lg"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Applied automatically in checkout for nationwide outside Dhaka delivery
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Announcement Notice Bar */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaBullhorn className="text-yellow-600" /> 4. Top Announcement Notice Bar
            </h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Notice Text (Scrolls at the top of the store)
              </label>
              <textarea
                rows="2"
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                placeholder="📢 রাজশাহীর বিখ্যাত হিমসাগর, গোপালভোগ আম এবং সুন্দরবনের খাঁটি মধুর প্রি-অর্ডার শুরু হয়েছে!"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Section 5: Hero Section Content */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2">
              5. Homepage Hero Section Texts
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hero Main Headline
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="রাজশাহীর সেরা ও খাঁটি আম এবং প্রাকৃতিক পণ্য, বাগান থেকে সরাসরি আপনার ঘরে"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows="2"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="কোনো প্রকার কেমিক্যাল বা ক্ষতিকর প্রিজারভেটিভ ছাড়া শতভাগ খাঁটি ও ফ্রেশ পণ্য ডেলিভারির নিশ্চয়তা।"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Social Media Profiles */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2">
              6. Social Media Profile Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaFacebookF className="text-blue-600" /> Facebook Page URL
                </label>
                <input
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaInstagram className="text-pink-600" /> Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <FaYoutube className="text-red-600" /> YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>
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
