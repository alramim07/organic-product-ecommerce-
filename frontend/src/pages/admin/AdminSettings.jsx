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
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";
import { api } from "../../services/api";

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

  // File upload handlers (converts to base64 for persistent storage)
  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Favicon image size should be under 2MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFavicon(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Logo image size should be under 5MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Profile picture size should be under 5MB.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
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

  // Handle save settings
  const handleSave = (e) => {
    e?.preventDefault();

    updateSettings({
      favicon,
      logo,
      profilePic,
      businessName,
      ownerName,
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
            className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
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
              ? "bg-gradient-to-r from-green-800 to-green-700 text-white shadow-md"
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
              ? "bg-gradient-to-r from-green-800 to-green-700 text-white shadow-md"
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
                      onClick={() => setFavicon("")}
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
                      onClick={() => setLogo("")}
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
                      onClick={() => setProfilePic("")}
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
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-black text-xs sm:text-sm rounded-xl shadow transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <FaKey /> <span>Change Password</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: WEBSITE SETTINGS */}
      {activeTab === "website" && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Contact Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2">
              1. Contact & Hotline Information (Header & Footer)
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

          {/* Section 2: Delivery Fees */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaTruck className="text-green-600" /> 2. Delivery Fees & Shipping Charges
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

          {/* Section 3: Announcement Notice Bar */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <FaBullhorn className="text-yellow-600" /> 3. Top Announcement Notice Bar
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

          {/* Section 4: Hero Section Content */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2">
              4. Homepage Hero Section Texts
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

          {/* Section 5: Social Media Profiles */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-base font-extrabold text-green-900 border-b border-gray-100 pb-2">
              5. Social Media Profile Links
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
                      : "bg-green-700 hover:bg-green-800"
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
