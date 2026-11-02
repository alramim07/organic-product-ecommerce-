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
    heroTextSlides: {
      type: [
        {
          topBadgeText: { type: String, default: "কেমিক্যাল মুক্ত" },
          topBadgeIcon: { type: String, default: "🍃" },
          mainTitlePart1: { type: String, default: "আমওয়ালা" },
          mainTitlePart2: { type: String, default: "ভাইয়া" },
          subtitleText: { type: String, default: "প্রিমিয়াম কোয়ালিটি" },
          descriptionText: {
            type: String,
            default:
              "তাজা, রাসায়নিকমুক্ত ও সুগন্ধি আমের প্রি-অর্ডার এখনই করুন। রাজশাহী, চুয়াডাঙ্গা, নওগাঁর সেরা জাত সরাসরি আপনার দোরগোড়ায়।",
          },
        },
      ],
      default: [
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
    // Product Section Settings
    productSectionTitle: {
      type: String,
      default: "আমের জাত ও মূল্য",
    },
    productSectionTitleIcon: {
      type: String,
      default: "🥭",
    },
    productSectionSubtitle: {
      type: String,
      default:
        "রাজশাহী, চুয়াডাঙ্গা, নওগাঁর মৌসুমি সেরা আম। নিচের কার্ড থেকে বেছে নিন আপনার পছন্দের জাত।",
    },
    productCardPreset: {
      type: String,
      enum: ["classic", "modern", "elevated", "bordered"],
      default: "classic",
    },
    productDisplayMode: {
      type: String,
      enum: ["auto", "custom"],
      default: "auto",
    },
    productCustomIds: {
      type: [String],
      default: [],
    },
    productShowMoreBtnText: {
      type: String,
      default: "Show More Products",
    },
    productCollapseBtnText: {
      type: String,
      default: "Collapse Products",
    },
    // About Section Settings
    aboutFounderImg: {
      type: String,
      default:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    },
    aboutTitle: {
      type: String,
      default: "আমওয়ালা ভাইয়ার গল্প",
    },
    aboutDescription: {
      type: String,
      default:
        "প্রতিষ্ঠাতা মোহাম্মদ সাব্বির এর হাত ধরে যাত্রা শুরু “আমওয়ালা ভাইয়া” — রাজশাহী অঞ্চলের প্রিমিয়াম মানের আম উৎপাদন ও বিতরণে বিশ্বস্ত নাম। আমরা কৃষকদের সাথে সরাসরি কাজ করি, নিশ্চিত করি কেমিক্যাল-মুক্ত এবং পাকুতে দেওয়া প্রাকৃতিক আম। আমাদের লক্ষ্য বিদেশি আমের সাথে দেশি আমের জয়গান করা। প্রতিটি অর্ডারে থাকে তাজা গন্ধ ও সতেজতা।",
    },
    // Stat 1: Total Orders
    aboutStat1Title: {
      type: String,
      default: "মোট অর্ডার",
    },
    aboutStat1ValueMode: {
      type: String,
      enum: ["real", "custom"],
      default: "custom",
    },
    aboutStat1CustomValue: {
      type: String,
      default: "৫০০+",
    },
    aboutStat1Subtitle: {
      type: String,
      default: "গত সিজন",
    },
    // Stat 2: Mango Varieties
    aboutStat2Title: {
      type: String,
      default: "আমের জাত",
    },
    aboutStat2ValueMode: {
      type: String,
      enum: ["real", "custom"],
      default: "custom",
    },
    aboutStat2CustomValue: {
      type: String,
      default: "১১+",
    },
    aboutStat2Subtitle: {
      type: String,
      default: "সরাসরি বাগান থেকে",
    },
    // Stat 3: Customer Satisfaction
    aboutStat3Title: {
      type: String,
      default: "গ্রাহক সন্তুষ্টি",
    },
    aboutStat3ValueMode: {
      type: String,
      enum: ["real", "custom"],
      default: "custom",
    },
    aboutStat3CustomValue: {
      type: String,
      default: "৯৮%",
    },
    aboutStat3Subtitle: {
      type: String,
      default: "⭐ রিভিউ এর ভিত্তিতে",
    },
    // Testimonials / Reviews Section Settings
    testimonialSectionTitle: {
      type: String,
      default: "গ্রাহকদের মতামত",
    },
    testimonialSectionIcon: {
      type: String,
      default: "🍃",
    },
    testimonialDisplayMode: {
      type: String,
      enum: ["custom", "real"],
      default: "custom",
    },
    testimonialAutoPlay: {
      type: Boolean,
      default: true,
    },
    testimonialAutoPlayInterval: {
      type: Number,
      default: 4,
    },
    testimonialItems: {
      type: [
        {
          name: { type: String, default: "" },
          location: { type: String, default: "" },
          comment: { type: String, default: "" },
          rating: { type: Number, default: 5 },
          avatar: { type: String, default: "😊" },
        },
      ],
      default: [
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
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Setting", settingSchema);
