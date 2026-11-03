import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaChevronUp,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaLeaf,
  FaHeadset,
  FaMedal,
  FaCreditCard,
  FaShieldAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useApp();

  // Helper to render icon (image, emoji, or icon name)
  const renderIcon = (iconVal, defaultIcon = "🥭") => {
    if (!iconVal) return <span>{defaultIcon}</span>;
    if (
      iconVal.startsWith("data:") ||
      iconVal.startsWith("http") ||
      iconVal.startsWith("/")
    ) {
      return (
        <img
          src={iconVal}
          alt=""
          className="w-4 h-4 object-contain inline-block shrink-0"
        />
      );
    }
    // Check known icons
    if (iconVal === "phone") return <FaPhoneAlt className="text-yellow-500" />;
    if (iconVal === "whatsapp") return <FaWhatsapp className="text-green-500" />;
    if (iconVal === "envelope") return <FaEnvelope className="text-yellow-500" />;
    if (iconVal === "map-marker") return <FaMapMarkerAlt className="text-red-500" />;
    if (iconVal === "facebook") return <FaFacebookF />;
    if (iconVal === "instagram") return <FaInstagram />;
    if (iconVal === "youtube") return <FaYoutube />;
    if (iconVal === "clock") return <FaClock className="text-yellow-400" />;
    if (iconVal === "shield") return <FaShieldAlt className="text-green-400" />;
    if (iconVal === "credit-card") return <FaCreditCard className="text-yellow-500" />;
    if (iconVal === "truck") return <FaTruck className="text-yellow-500" />;
    if (iconVal === "leaf") return <FaLeaf className="text-yellow-500" />;
    if (iconVal === "headset") return <FaHeadset className="text-yellow-500" />;
    if (iconVal === "medal") return <FaMedal className="text-yellow-500" />;

    return <span>{iconVal}</span>;
  };

  // 1. Brand Logo & Display Mode
  const brandMode = settings?.footerBrandMode || "use_header";
  const brandDisplay =
    brandMode === "use_header"
      ? settings?.headerBrandDisplay || "logo_only"
      : settings?.footerBrandDisplay || "logo_and_text";

  const brandLogo =
    brandMode === "use_header"
      ? settings?.websiteLogo || settings?.logo || ""
      : settings?.footerLogo || settings?.websiteLogo || settings?.logo || "";

  const brandTitle =
    brandMode === "use_header"
      ? settings?.siteName || settings?.businessName || "Store"
      : settings?.footerBrandTitle || settings?.siteName || settings?.businessName || "Store";

  const brandTagline =
    brandMode === "use_header"
      ? settings?.tagline || ""
      : settings?.footerBrandTagline || settings?.tagline || "";

  // Color customization for brand title
  const titleColorType = settings?.footerTitleColorType || "gradient";
  const titleColorVal =
    settings?.footerTitleColorVal || "linear-gradient(to right, #facc15, #4ade80)";

  const titleStyle =
    titleColorType === "gradient"
      ? {
          backgroundImage: titleColorVal,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }
      : {
          color: titleColorVal,
        };

  // 2. About Description Text
  const aboutText =
    settings?.footerAboutText ||
    "রাজশাহী, চুয়াডাঙ্গা ও নওগাঁর সেরা জাতের আম সরাসরি বাগান থেকে আপনার ঘরে পৌঁছে দিচ্ছি। কেমিক্যাল-মুক্ত, পুষ্টিকর ও সুস্বাদু আমের অভিজ্ঞতা নিন।";

  // 3. Social Media Links
  const socialLinks =
    Array.isArray(settings?.footerSocialLinks) && settings.footerSocialLinks.length > 0
      ? settings.footerSocialLinks
      : [
          { name: "Facebook", icon: "facebook", link: settings?.facebookUrl || "https://facebook.com", color: "hover:bg-blue-600", show: true },
          { name: "Instagram", icon: "instagram", link: settings?.instagramUrl || "https://instagram.com", color: "hover:bg-pink-600", show: true },
          { name: "YouTube", icon: "youtube", link: settings?.youtubeUrl || "https://youtube.com", color: "hover:bg-red-600", show: true },
          { name: "WhatsApp", icon: "whatsapp", link: `https://wa.me/${settings?.whatsappNumber || "8801749775030"}`, color: "hover:bg-green-600", show: true },
        ];

  // 4. Col 2: Quick Links (দ্রুত লিংক)
  const col2Title = settings?.footerCol2Title || "দ্রুত লিংক";
  const quickLinks =
    Array.isArray(settings?.footerQuickLinks) && settings.footerQuickLinks.length > 0
      ? settings.footerQuickLinks
      : [
          { name: "হোম", href: "#home", icon: "🏠", show: true },
          { name: "আমের জাত", href: "#varieties", icon: "🥭", show: true },
          { name: "আমাদের সম্পর্কে", href: "#about", icon: "📖", show: true },
          { name: "গ্রাহক মতামত", href: "#reviews", icon: "⭐", show: true },
          { name: "অর্ডার করুন", href: "#order", icon: "📦", show: true },
        ];

  // 5. Col 3: Mango Varieties (আমের জাত)
  const col3Title = settings?.footerCol3Title || "আমের জাত";
  const mangoList =
    Array.isArray(settings?.footerMangoList) && settings.footerMangoList.length > 0
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
        ];

  // 6. Col 4: Contact & Opening Hours
  const col4Title = settings?.footerCol4Title || "যোগাযোগ";
  const contactItems =
    Array.isArray(settings?.footerContactItems) && settings.footerContactItems.length > 0
      ? settings.footerContactItems
      : [
          { text: settings?.hotlinePhone || "০১৭৪৯-৭৭৫০৩০", link: `tel:${settings?.rawHotlinePhone || "01749775030"}`, icon: "phone", show: true },
          { text: "WhatsApp", link: `https://wa.me/${settings?.whatsappNumber || "8801749775030"}`, icon: "whatsapp", show: true },
          { text: settings?.email || "ammwalaaviya@gmail.com", link: `mailto:${settings?.email || "ammwalaaviya@gmail.com"}`, icon: "envelope", show: true },
          { text: settings?.officeAddress || "রাজশাহী, বাংলাদেশ - ৬২০৩", link: "https://maps.google.com", icon: "map-marker", show: true },
        ];

  const hoursTitle = settings?.footerHoursTitle || "খোলার সময়";
  const hoursIcon = settings?.footerHoursIcon || "🕒";
  const hoursItems =
    Array.isArray(settings?.footerHoursItems) && settings.footerHoursItems.length > 0
      ? settings.footerHoursItems
      : [
          { text: "সোম-শনি: সকাল ৮টা - রাত ৮টা", show: true },
          { text: "রবিবার: সকাল ১০টা - সন্ধ্যা ৬টা", show: true },
          { text: "✨ অনলাইন অর্ডার ২৪/৭", show: true },
        ];

  // 7. Feature highlights (সারাদেশ ডেলিভারি, গুনগত মান, ইত্যাদি)
  const featuresList =
    Array.isArray(settings?.footerFeatures) && settings.footerFeatures.length > 0
      ? settings.footerFeatures
      : [
          { icon: "truck", title: "সারাদেশ ডেলিভারি", desc: "দ্রুত ও নিরাপদ", show: true },
          { icon: "leaf", title: "গুনগত মান", desc: "১০০% সতেজ ও বিশুদ্ধ", show: true },
          { icon: "headset", title: "২৪/৭ সাপোর্ট", desc: "যেকোনো সময় যোগাযোগ", show: true },
          { icon: "medal", title: "প্রিমিয়াম কোয়ালিটি", desc: "বাগান থেকে সরাসরি", show: true },
        ];

  // 8. Payment Methods
  const paymentTitle = settings?.footerPaymentTitle || "পেমেন্ট মেথড:";
  const paymentIcon = settings?.footerPaymentIcon || "💳";
  const paymentMethods =
    Array.isArray(settings?.footerPaymentMethods) && settings.footerPaymentMethods.length > 0
      ? settings.footerPaymentMethods
      : [
          { name: "বিকাশ", bgColor: "bg-pink-600", icon: "", show: true },
          { name: "নগদ", bgColor: "bg-orange-500", icon: "", show: true },
          { name: "রকেট", bgColor: "bg-purple-600", icon: "", show: true },
          { name: "ক্যাশ অন ডেলিভারি", bgColor: "bg-green-600", icon: "", show: true },
        ];

  // 9. Return Policy
  const returnPolicyShow = settings?.footerReturnPolicyShow !== false;
  const returnPolicyIcon = settings?.footerReturnPolicyIcon || "🛡️";
  const returnPolicyText = settings?.footerReturnPolicyText || "৭ দিনের রিটার্ন পলিসি";
  const returnPolicyLink = settings?.footerReturnPolicyLink || "#";

  // 10. Copyright & Developer Credits (Auto Dynamic Year)
  const defaultCopyright = `${settings?.businessName || settings?.siteName || "Store"} - All Rights Reserved`;
  const rawCopyright = settings?.footerCopyrightText || defaultCopyright;
  const processedCopyright = rawCopyright.includes("{year}")
    ? rawCopyright.replace(/{year}/gi, currentYear)
    : rawCopyright;
  const startsWithCopyright = processedCopyright.trim().startsWith("©");
  const includesYear = processedCopyright.includes(String(currentYear));

  const displayCopyright = startsWithCopyright
    ? (includesYear ? processedCopyright : `© ${currentYear} ${processedCopyright.replace(/^©\s*/, "")}`)
    : (includesYear ? `© ${processedCopyright}` : `© ${currentYear} ${processedCopyright}`);

  const privacyText = settings?.footerPrivacyPolicyText || "গোপনীয়তা নীতি";
  const privacyLink = settings?.footerPrivacyPolicyLink || "#";
  const termsText = settings?.footerTermsText || "সেবার শর্তাবলী";
  const termsLink = settings?.footerTermsLink || "#";

  const devCreditText = settings?.footerDeveloperCreditText || "Designed & Developed with";
  const devName = settings?.footerDeveloperName || "DevHome";
  const devLink = settings?.footerDeveloperLink || "https://devhome.onrender.com/";

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const handleNavClick = (e, href) => {
    if (!href || href === "#") return;
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.replace(/^#/, "");
      if (window.location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        if (sectionId === "home" || !sectionId) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target = document.getElementById(sectionId) || document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-amber-900 text-white pt-16 pb-6">
      {/* Top Colorful Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400" />

      {/* Decorative Faint Mango Icon */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <FaLeaf className="text-8xl text-yellow-400 transform rotate-45" />
      </div>

      {/* Scroll-to-Top Button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
        <motion.button
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="bg-gradient-to-r from-yellow-500 to-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 border-2 border-white/80 cursor-pointer transition-all"
          aria-label="উপরে যান"
        >
          <FaChevronUp className="text-lg" />
        </motion.button>
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pt-6">
          {/* Col 1: Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Brand Logo & Text based on Brand Display Mode */}
            {brandDisplay === "logo_only" && brandLogo ? (
              <div className="py-1">
                <img
                  src={brandLogo}
                  alt={brandTitle}
                  className="h-12 sm:h-14 w-auto max-w-[220px] object-contain rounded bg-white/5 p-1"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {brandLogo ? (
                  <img
                    src={brandLogo}
                    alt={brandTitle}
                    className="w-12 h-12 object-contain rounded-full bg-white shadow-lg p-0.5 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                    <FaLeaf className="text-white text-2xl" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold truncate" style={titleStyle}>
                    {brandTitle}
                  </h3>
                  <p className="text-sm text-yellow-300 truncate">{brandTagline}</p>
                </div>
              </div>
            )}

            <p className="text-gray-300 text-sm leading-relaxed">
              {aboutText}
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks
                .filter((item) => item.show !== false)
                .map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    className={`w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white transition-all ${
                      item.color || "hover:bg-green-600"
                    } hover:text-white shadow`}
                    title={item.name}
                  >
                    {renderIcon(item.icon, "🔗")}
                  </motion.a>
                ))}
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold border-l-4 border-yellow-500 pl-3">
              {col2Title}
            </h4>
            <ul className="space-y-2">
              {quickLinks
                .filter((item) => item.show !== false)
                .map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={item.href || "#"}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <span className="text-base">{renderIcon(item.icon, "🏠")}</span>
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                ))}
            </ul>
          </motion.div>

          {/* Col 3: Mango Varieties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold border-l-4 border-yellow-500 pl-3">
              {col3Title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {mangoList
                .filter((item) => item.show !== false)
                .map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-300 text-sm flex items-center gap-1.5"
                  >
                    <a
                      href={item.href || "#varieties"}
                      onClick={(e) => handleNavClick(e, item.href || "#varieties")}
                      className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      <span className="text-yellow-500 shrink-0">
                        {renderIcon(item.icon, "🥭")}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </a>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Col 4: Contact & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold border-l-4 border-yellow-500 pl-3">
              {col4Title}
            </h4>
            <ul className="space-y-3">
              {contactItems
                .filter((item) => item.show !== false)
                .map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <a
                      href={item.link || "#"}
                      target={item.link?.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <span className="text-base shrink-0">
                        {renderIcon(item.icon, "📞")}
                      </span>
                      <span className="break-all">{item.text}</span>
                    </a>
                  </motion.li>
                ))}
            </ul>

            <div className="pt-4 border-t border-white/10">
              <h5 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2 text-sm">
                <span>{renderIcon(hoursIcon, "🕒")}</span>
                <span>{hoursTitle}</span>
              </h5>
              {hoursItems
                .filter((item) => item.show !== false)
                .map((item, idx) => (
                  <p
                    key={idx}
                    className={`text-xs ${
                      item.text?.includes("২৪/৭") || item.text?.includes("অনলাইন")
                        ? "text-green-400 mt-1 font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {item.text}
                  </p>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-white/10 my-8"
        >
          {featuresList
            .filter((item) => item.show !== false)
            .map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-3xl text-yellow-500 flex justify-center">
                  {renderIcon(item.icon, "⭐")}
                </div>
                <h5 className="font-semibold text-sm">{item.title}</h5>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
        </motion.div>

        {/* Payment Methods & Return Policy */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <span className="text-xl text-yellow-500">{renderIcon(paymentIcon, "💳")}</span>
            <span className="text-sm text-gray-300 font-semibold">{paymentTitle}</span>
            <div className="flex flex-wrap gap-2">
              {paymentMethods
                .filter((item) => item.show !== false)
                .map((method, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm ${
                      method.bgColor || "bg-green-600"
                    }`}
                  >
                    {method.icon && (
                      <span className="shrink-0">{renderIcon(method.icon, "")}</span>
                    )}
                    <span>{method.name}</span>
                  </span>
                ))}
            </div>
          </div>

          {/* Return Policy (Totally dynamic and optional) */}
          {returnPolicyShow && (
            <a
              href={returnPolicyLink || "#"}
              className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
            >
              <span className="text-green-400 text-base">
                {renderIcon(returnPolicyIcon, "🛡️")}
              </span>
              <span className="text-xs text-gray-300 hover:text-white font-medium">
                {returnPolicyText}
              </span>
            </a>
          )}
        </div>

        {/* Bottom Copyright & Credits (NO Admin Dashboard link, English DevHome credit) */}
        <div className="text-center pt-6 border-t border-white/10 space-y-2">
          <p className="text-gray-400 text-sm">
            {displayCopyright}
            {settings?.footerPrivacyPolicyShow !== false && (
              <>
                {" | "}
                <a
                  href={privacyLink || "#"}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {privacyText}
                </a>
              </>
            )}
            {settings?.footerTermsShow !== false && (
              <>
                {" | "}
                <a
                  href={termsLink || "#"}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {termsText}
                </a>
              </>
            )}
          </p>

          {/* Developer credit (Permanent in English, non-editable) */}
          <p className="text-gray-400 text-xs">
            Designed & Developed with{" "}
            <a
              href="https://devhome.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline transition-colors"
            >
              DevHome
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
