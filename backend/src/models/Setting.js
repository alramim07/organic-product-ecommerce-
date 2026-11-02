import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    favicon: { type: String, default: "" },
    logo: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    businessName: { type: String, default: "Ammwala Agro & Organic Food" },
    ownerName: { type: String, default: "Md. Admin" },
    // Admin Dashboard Theme Settings
    themeSidebarType: { type: String, default: "gradient" },
    themeSidebarBg: {
      type: String,
      default: "linear-gradient(180deg, #052e16 0%, #14532d 50%, #451a03 100%)",
    },
    themePrimaryBtn: {
      type: String,
      default: "linear-gradient(135deg, #16a34a 0%, #ca8a04 100%)",
    },
    themeSecondaryBtn: {
      type: String,
      default: "linear-gradient(135deg, #d97706 0%, #eab308 100%)",
    },
    // Frontend Website Header Settings
    websiteFavicon: { type: String, default: "" },
    websiteLogo: { type: String, default: "" },
    headerBrandDisplay: {
      type: String,
      enum: ["logo_only", "logo_and_text"],
      default: "logo_only",
    },
    headerNavLinks: {
      type: [
        {
          name: { type: String, default: "" },
          href: { type: String, default: "" },
          icon: { type: String, default: "" },
          showIcon: { type: Boolean, default: true },
        },
      ],
      default: [
        { name: "হোম", href: "#home", icon: "🏠", showIcon: true },
        { name: "আমের জাত", href: "#varieties", icon: "🥭", showIcon: true },
        { name: "পরিচয়", href: "#about", icon: "📖", showIcon: true },
        { name: "মতামত", href: "#reviews", icon: "⭐", showIcon: true },
        { name: "অর্ডার করুন", href: "#order", icon: "📦", showIcon: true },
      ],
    },
    headerCallBtnText: { type: String, default: "কল করুন" },
    headerCallBtnPhone: { type: String, default: "01749775030" },
    headerCallBtnShow: { type: Boolean, default: true },
    headerWhatsappNumber: { type: String, default: "8801749775030" },
    headerWhatsappShow: { type: Boolean, default: true },
    headerCartShow: { type: Boolean, default: true },
    siteName: { type: String, default: "আমওয়ালা ভাইয়া" },
    tagline: { type: String, default: "প্রিমিয়াম মানের দেশি আম ও খাঁটি প্রাকৃতিক খাদ্যপণ্য" },
    hotlinePhone: { type: String, default: "০১৭৪৯-৭৭৫০৩০" },
    rawHotlinePhone: { type: String, default: "01749775030" },
    whatsappNumber: { type: String, default: "8801749775030" },
    email: { type: String, default: "ammwalaaviya@gmail.com" },
    officeAddress: { type: String, default: "রাজশাহী, বাংলাদেশ - ৬২০৩" },
    deliveryFeeDhaka: { type: Number, default: 120 },
    deliveryFeeOutside: { type: Number, default: 150 },
    facebookUrl: { type: String, default: "https://facebook.com" },
    instagramUrl: { type: String, default: "https://instagram.com" },
    youtubeUrl: { type: String, default: "https://youtube.com" },
    noticeText: {
      type: String,
      default:
        "📢 রাজশাহীর বিখ্যাত হিমসাগর, গোপালভোগ আম এবং সুন্দরবনের খাঁটি মধুর প্রি-অর্ডার শুরু হয়েছে!",
    },
    heroTitle: {
      type: String,
      default: "রাজশাহীর সেরা ও খাঁটি আম এবং প্রাকৃতিক পণ্য, বাগান থেকে সরাসরি আপনার ঘরে",
    },
    heroSubtitle: {
      type: String,
      default:
        "কোনো প্রকার কেমিক্যাল বা ক্ষতিকর প্রিজারভেটিভ ছাড়া শতভাগ খাঁটি ও ফ্রেশ পণ্য ডেলিভারির নিশ্চয়তা।",
    },
    // Hero Section Detailed Settings
    heroBgMode: {
      type: String,
      enum: ["carousel", "single"],
      default: "carousel",
    },
    heroTextMode: {
      type: String,
      enum: ["single", "multi"],
      default: "single",
    },
    heroHotlinePhone: {
      type: String,
      default: "০১৭৪৯-৭৭৫০৩০",
    },
    heroSingleImage: {
      type: String,
      default: "/assets/one.avif",
    },
    heroSlides: {
      type: [
        {
          url: { type: String, default: "" },
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
        },
      ],
      default: [
        { url: "/assets/one.avif", title: "তাজা ও রসালো আম", subtitle: "সরাসরি বাগান থেকে" },
        { url: "/assets/two.avif", title: "প্রিমিয়াম কোয়ালিটি", subtitle: "কেমিক্যাল মুক্ত" },
        { url: "/assets/three.avif", title: "সারা দেশ ডেলিভারি", subtitle: "দ্রুত ও নিরাপদ" },
        { url: "/assets/four.avif", title: "১১+ জাতের আম", subtitle: "বাছাই করুন আপনার পছন্দ" },
      ],
    },
    heroTopBadgeText: {
      type: String,
      default: "কেমিক্যাল মুক্ত",
    },
    heroTopBadgeIcon: {
      type: String,
      default: "🍃",
    },
    heroMainTitlePart1: {
      type: String,
      default: "আমওয়ালা",
    },
    heroMainTitlePart2: {
      type: String,
      default: "ভাইয়া",
    },
    heroSubtitleText: {
      type: String,
      default: "প্রিমিয়াম কোয়ালিটি",
    },
    heroDescriptionText: {
      type: String,
      default:
        "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।",
    },
    heroTrustBadge1Text: {
      type: String,
      default: "১০০% রেকমেন্ডেড",
    },
    heroTrustBadge1Icon: {
      type: String,
      default: "✓",
    },
    heroTrustBadge2Text: {
      type: String,
      default: "৬+ গ্রাহক রিভিউ",
    },
    heroTrustBadge2Icon: {
      type: String,
      default: "★",
    },
    heroHighlights: {
      type: [
        {
          text: { type: String, default: "" },
          icon: { type: String, default: "truck" },
        },
      ],
      default: [
        { text: "সারা দেশ ডেলিভারি", icon: "truck" },
        { text: "কেমিক্যাল ফ্রি", icon: "leaf" },
        { text: "০১৭৪৯-৭৭৫০৩০", icon: "phone" },
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Setting", settingSchema);
