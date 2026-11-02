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
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
