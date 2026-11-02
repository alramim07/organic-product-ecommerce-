import mongoose from "mongoose";

const packageOptionSchema = new mongoose.Schema({
  kg: { type: Number, default: 1 },
  weight_label: { type: String, default: "" },
  label: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  badge: { type: String, default: "" },
});

const specSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name_bn: {
      type: String,
      required: [true, "Product Bengali name is required"],
      trim: true,
    },
    name_en: {
      type: String,
      trim: true,
      default: "",
    },
    subtitle_bn: {
      type: String,
      trim: true,
      default: "",
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category slug/key is required"],
      index: true,
      default: "mango",
    },
    category_bn: {
      type: String,
      default: "আম",
    },
    unit: {
      type: String,
      default: "কেজি", // e.g. "কেজি", "গ্রাম", "লিটার", "মিলি", "পিস", "বোতল", "জার", "বক্স", "ক্যারেট"
    },
    price_per_unit: {
      type: Number,
      required: [true, "Price per unit is required"],
    },
    regular_price_per_unit: {
      type: Number,
      default: 0,
    },
    discount_percent: {
      type: Number,
      default: 0,
    },
    min_order: {
      type: Number,
      default: 1,
    },
    stock_status: {
      type: String,
      default: "ইন স্টক",
    },
    image: {
      type: String,
      default: "/assets/mangoes/m1.jpg",
    },
    gallery: {
      type: [String],
      default: [],
    },
    origin: {
      type: String,
      default: "",
    },
    harvest_schedule: {
      type: String,
      default: "",
    },
    regionDates: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    highlights: {
      type: [String],
      default: [],
    },
    taste_specs: [specSchema],
    packages: [packageOptionSchema],
    tab1_title: {
      type: String,
      default: "🥭 বৈশিষ্ট্য ও স্বাদ",
    },
    tab2_title: {
      type: String,
      default: "📦 প্যাকেজিং ও ডেলিভারি",
    },
    packaging_description: {
      type: String,
      default:
        "আম অত্যন্ত সংবেদনশীল ফল। পরিবহনের ঝাঁকুনিতে যেন ফলের কোনো ক্ষতি না হয়, সেজন্য আমরা আন্তর্জাতিক মানের ৫-স্তরবিশিষ্ট (5-ply) ভেন্টিলেটেড হার্ডবোর্ড কার্টন ও ক্রেট ব্যবহার করি।",
    },
    packaging_steps: [
      {
        step: { type: String, default: "০১" },
        title: { type: String, default: "বাগান থেকে গ্রেডিং" },
        description: {
          type: String,
          default:
            "গাছ থেকে পাড়ার পর প্রতিটি আম আলাদাভাবে পরিদর্শন করে দাগহীন ও পুষ্ট আমগুলো বাছাই করা হয়।",
        },
      },
      {
        step: { type: String, default: "০২" },
        title: { type: String, default: "ফোম ও পেপার কুশনিং" },
        description: {
          type: String,
          default:
            "প্রতিটি আমের মাঝে ফুড-গ্রেড নরম কাগজ ও কুশনিং ব্যবহার করা হয় যেন একে অপরের সাথে ঘষা না লাগে।",
        },
      },
      {
        step: { type: String, default: "০৩" },
        title: { type: String, default: "এক্সপ্রেস হোম ডেলিভারি" },
        description: {
          type: String,
          default:
            "প্যাকিং শেষে শীতাতপ নিয়ন্ত্রিত এক্সপ্রেস কুরিয়ারে সরাসরি গ্রাহকের দরজায় পৌঁছে দেওয়া হয়।",
        },
      },
    ],
    tab3_title: {
      type: String,
      default: "💡 পাকা ও সংরক্ষণ নিয়ম",
    },
    storage_steps: [
      {
        step: { type: String, default: "১" },
        title: { type: String, default: "বক্স খোলার নিয়ম:" },
        description: {
          type: String,
          default:
            "বক্স পাওয়ার পর পরই ওপরের টেপ কেটে মুখ খুলে দিন। আমগুলো বের করে মেঝেতে কাগজ বিছিয়ে স্বাভাবিক আলো-বাতাসে ছড়িয়ে রাখুন।",
        },
      },
      {
        step: { type: String, default: "২" },
        title: { type: String, default: "ফ্রিজে রাখার নিয়ম:" },
        description: {
          type: String,
          default:
            "আম পুরোপুরি পাকার আগে কখনই ফ্রিজে রাখবেন না। মিষ্টি সুবাস বের হলে এবং খোসা নরম হলে খাওয়ার ২-৩ ঘণ্টা আগে ফ্রিজে রেখে ঠান্ডা করে খেলে সর্বোচ্চ স্বাদ পাওয়া যায়।",
        },
      },
      {
        step: { type: String, default: "৩" },
        title: { type: String, default: "রাসায়নিক মুক্ততার লক্ষণ:" },
        description: {
          type: String,
          default:
            "প্রাকৃতিক আম বোঁটার দিক থেকে পাকা শুরু করে এবং মুখে দিলে আসল গ্রামীণ মিষ্টি ফ্লেভার পাওয়া যায়। কোনো বিষাক্ত ঝাঁঝালো গন্ধ থাকে না।",
        },
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    total_reviews: {
      type: Number,
      default: 25,
    },
  },
  { timestamps: true, strict: false }
);

// Auto-generate slug before saving
productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug =
      (this.name_en || this.name_bn)
        .toLowerCase()
        .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString().slice(-4);
  }
  next();
});

export default mongoose.model("Product", productSchema);
