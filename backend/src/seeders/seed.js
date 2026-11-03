import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Setting from "../models/Setting.js";

dotenv.config();

const categories = [
  {
    name_bn: "আম",
    name_en: "Mango",
    slug: "mango",
    icon: "🥭",
    unit: "কেজি",
    available_units: ["কেজি", "বক্স", "ক্যারেট"],
    badge: "সিজনাল সেরা",
    description: "রাজশাহী ও চাঁপাইনবাবগঞ্জের বিখ্যাত জিআই সনদপ্রাপ্ত রাসায়নিকমুক্ত আম",
    order: 1,
  },
  {
    name_bn: "খাঁটি মধু",
    name_en: "Pure Honey",
    slug: "honey",
    icon: "🍯",
    unit: "কেজি",
    available_units: ["কেজি", "গ্রাম", "জার", "বোতল"],
    badge: "১০০% অর্গানিক",
    description: "সুন্দরবন ও বরেন্দ্র অঞ্চলের অপরিশোধিত খাঁটি প্রাকৃতিক মধু",
    order: 2,
  },
  {
    name_bn: "দিনাজপুরের লিচু",
    name_en: "Dinajpur Lychee",
    slug: "lychee",
    icon: "🍒",
    unit: "পিস",
    available_units: ["পিস", "বক্স", "ক্যারেট"],
    badge: "মৌসুমী ফল",
    description: "দিনাজপুরের বিখ্যাত রসালো বেদানা ও চায়না-৩ জাতের মিষ্টি লিচু",
    order: 3,
  },
  {
    name_bn: "সরিষার তেল ও ঘি",
    name_en: "Mustard Oil & Ghee",
    slug: "oil-ghee",
    icon: "🫒",
    unit: "লিটার",
    available_units: ["লিটার", "মিলি", "বোতল", "জার"],
    badge: "ঘানিতে ভাঙা",
    description: "ঐতিহ্যবাহী কাঠের ঘানিতে ভাঙা খাঁটি সরিষার তেল এবং সুস্বাদু গাওয়া ঘি",
    order: 4,
  },
];

const sampleProducts = [
  // Mango Products
  {
    name_bn: "ক্ষীরসাপাতি / হিমসাগর",
    name_en: "Khirsapati / Himsagar",
    subtitle_bn: "আমের রাজা - অতুলনীয় স্বাদ, মিষ্টি ও মিষ্টির স্বর্গ",
    slug: "khirsapati-himsagar",
    category: "mango",
    category_bn: "আম",
    unit: "কেজি",
    price_per_unit: 220,
    regular_price_per_unit: 250,
    discount_percent: 12,
    min_order: 5,
    stock_status: "প্রি-অর্ডার চলছে",
    image: "/assets/mangoes/m3.jpg",
    gallery: ["/assets/mangoes/m3.jpg", "/assets/mangoes/m1.jpg", "/assets/mangoes/m5.jpg"],
    origin: "শিবগঞ্জ, চাঁপাইনবাবগঞ্জ ও রাজশাহী",
    harvest_schedule: "মে মাসের শেষ সপ্তাহ থেকে জুনের মাঝামাঝি",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে(ক্ষীর) ২২ মে(হিম), নওগাঁ: ২ জুন, রাজশাহী: ৩০ মে",
    description:
      "ক্ষীরসাপাতি ও হিমসাগর বাংলাদেশের আমপ্রেমীদের হৃদয়ের স্পন্দন। চাঁপাইনবাবগঞ্জ ও রাজশাহীর ভৌগোলিক নির্দেশক (GI) সনদপ্রাপ্ত এই আমটির স্বাদ ক্ষীরের মতো ঘন ও মিষ্টি। এর ভেতর আঁশের লেশমাত্র নেই।",
    highlights: ["১০০% আঁশহীন সিল্কি মসৃণ পাল্প", "ভৌগোলিক নির্দেশক (GI) সনদপ্রাপ্ত", "বাগান থেকে সরাসরি ফ্রেশ হারভেস্ট"],
    taste_specs: [
      { label: "মিষ্টির মাত্রা", value: "২১ - ২৩° ব্রিক্স" },
      { label: "আঁশের পরিমাণ", value: "০% আঁশ (সম্পূর্ণ মাখনের মতো)" },
      { label: "ঘ্রাণ", value: "মনোরম স্বর্গীয় সুগন্ধ" },
      { label: "আকার", value: "মাঝারি থেকে ডিম্বাকৃতি" },
    ],
    packages: [
      { kg: 5, label: "৫ কেজি মাস্টার বক্স", price: 1100, originalPrice: 1250, badge: "টপ সেলার" },
      { kg: 10, label: "১০ কেজি ফ্যামিলি ক্যারেট", price: 2150, originalPrice: 2500, badge: "সবচেয়ে জনপ্রিয়" },
      { kg: 20, label: "২০ কেজি গিফট ক্রেইট", price: 4200, originalPrice: 5000, badge: "সর্বোচ্চ ছাড়" },
    ],
    is_featured: true,
  },
  {
    name_bn: "গোপালভোগ",
    name_en: "Gopalbhog Mango",
    subtitle_bn: "রাজশাহীর রাজকীয় সুবাস ও মোলায়েম মিষ্টির ঐতিহ্য",
    slug: "gopalbhog-mango",
    category: "mango",
    category_bn: "আম",
    unit: "কেজি",
    price_per_unit: 180,
    regular_price_per_unit: 210,
    discount_percent: 15,
    min_order: 5,
    stock_status: "প্রি-অর্ডার চলছে",
    image: "/assets/mangoes/m2.jpg",
    gallery: ["/assets/mangoes/m2.jpg", "/assets/mangoes/m1.jpg"],
    origin: "বাঘা ও পুঠিয়া, রাজশাহী",
    harvest_schedule: "মে মাসের তৃতীয় সপ্তাহ থেকে",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে, নওগাঁ: ৩০ মে, রাজশাহী: ২২ মে",
    description:
      "গোপালভোগ আম রাজশাহীর ঐতিহ্যবাহী এবং সবচেয়ে মর্যাদাপূর্ণ জাতগুলোর একটি। হলুদ-কমলা রঙের পাতলা খোসা এবং ভেতরে ঘন গাঢ় হলদে নরম শাঁস।",
    taste_specs: [
      { label: "মিষ্টির মাত্রা", value: "১৯ - ২১° ব্রিক্স" },
      { label: "আঁশের পরিমাণ", value: "সম্পূর্ণ আঁশহীন" },
      { label: "ঘ্রাণ", value: "রাজকীয় তীব্র সুগন্ধ" },
      { label: "আকার", value: "মাঝারি গোলাকার" },
    ],
    packages: [
      { kg: 5, label: "৫ কেজি প্রিমিয়াম বক্স", price: 900, originalPrice: 1050, badge: "জনপ্রিয়" },
      { kg: 10, label: "১০ কেজি স্পেশাল ক্যারেট", price: 1750, originalPrice: 2100, badge: "সেরা সঞ্চয়" },
    ],
  },
  {
    name_bn: "ল্যাংড়া",
    name_en: "Langra Mango",
    subtitle_bn: "পাতলা খোসা, কাঁচা অবস্থায় সবুজ এবং অসীম রসালো",
    slug: "langra-mango",
    category: "mango",
    category_bn: "আম",
    unit: "কেজি",
    price_per_unit: 160,
    regular_price_per_unit: 185,
    discount_percent: 13,
    min_order: 5,
    stock_status: "প্রি-অর্ডার চলছে",
    image: "/assets/mangoes/m4.jpg",
    origin: "রাজশাহী ও নওগাঁ",
    harvest_schedule: "জুন মাসের প্রথম সপ্তাহ থেকে",
    regionDates: "চুয়াডাঙ্গা: ২৮ মে, নওগাঁ: ১০ জুন, রাজশাহী: ১০ জুন",
    description:
      "ল্যাংড়া আমের বৈশিষ্ট্য হলো পাকার পরেও এর খোসা কিছুটা হালকা সবুজ থাকে, কিন্তু ভেতরটা গাঢ় হলুদ ও রসে টইটম্বুর হয়ে ওঠে।",
    packages: [
      { kg: 5, label: "৫ কেজি কার্টন", price: 800, originalPrice: 925, badge: "জনপ্রিয়" },
      { kg: 10, label: "১০ কেজি স্পেশাল বক্স", price: 1550, originalPrice: 1850, badge: "সেরা চয়েস" },
    ],
  },
  {
    name_bn: "আম্রপালি",
    name_en: "Amrapali Mango",
    subtitle_bn: "গাঢ় লালচে-কমলা শাঁস ও তীব্র মিষ্টির মোহনীয় স্বাদ",
    slug: "amrapali-mango",
    category: "mango",
    category_bn: "আম",
    unit: "কেজি",
    price_per_unit: 190,
    regular_price_per_unit: 220,
    discount_percent: 14,
    min_order: 5,
    stock_status: "প্রি-অর্ডার চলছে",
    image: "/assets/mangoes/m5.jpg",
    origin: "নওগাঁ (সাপাহার) ও রাজশাহী",
    harvest_schedule: "জুন মাসের দ্বিতীয় সপ্তাহ থেকে",
    regionDates: "চুয়াডাঙ্গা: ৫ জুন, নওগাঁ: ১৫ জুন, রাজশাহী: ১৫ জুন",
    description: "নওগাঁর বরেন্দ্র অঞ্চলের বিখ্যাত আম্রপালি আম এর মোহনীয় গাঢ় লালচে-কমলা শাঁসের জন্য বিশেষভাবে পরিচিত।",
    packages: [
      { kg: 5, label: "৫ কেজি স্পেশাল প্যাক", price: 950, originalPrice: 1100, badge: "জনপ্রিয়" },
      { kg: 10, label: "১০ কেজি ফ্যামিলি বক্স", price: 1850, originalPrice: 2200, badge: "সেরা সঞ্চয়" },
    ],
  },

  // Pure Honey Products
  {
    name_bn: "সুন্দরবনের খাঁটি খলিসা মধু",
    name_en: "Sundarbans Kholisa Raw Honey",
    subtitle_bn: "১০০% অপরিশোধিত কাঁচা প্রাকৃতিক মধু - মৌসুমের প্রথম সংগ্রহ",
    slug: "sundarbans-kholisa-honey",
    category: "honey",
    category_bn: "খাঁটি মধু",
    unit: "গ্রাম",
    price_per_unit: 1200,
    regular_price_per_unit: 1400,
    discount_percent: 14,
    min_order: 1,
    stock_status: "ইন স্টক",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
    ],
    origin: "সুন্দরবন (মৌয়ালদের থেকে সরাসরি সংগ্রহ)",
    harvest_schedule: "মার্চ - এপ্রিল সংগ্রহ",
    description:
      "সুন্দরবনের গভীর অরণ্যের প্রাকৃতিকভাবে চাক ভাঙা ১০০% খাঁটি খলিসা ফুলের মধু। এতে কোনো প্রকার প্রসেসিং, হিটিং বা চিনি মিশ্রণ নেই। প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট এবং এনজাইমে ভরপুর।",
    highlights: [
      "কোনো কৃত্রিম প্রসেসিং বা হিটিং নেই",
      "সুন্দরবনের বুনো ফুলের খাঁটি প্রাকৃতিক সুবাস",
      "হিমোগ্লোবিন বৃদ্ধি ও রোগ প্রতিরোধে অতুলনীয়",
      "ল্যাব টেস্টে শতভাগ বিশুদ্ধতা প্রমাণিত",
    ],
    taste_specs: [
      { label: "ফুলের উৎস", value: "খলিসা ও গরান ফুল" },
      { label: "প্রাকৃতিক আর্দ্রতা", value: "১৮ - ১৯%" },
      { label: "ঘনত্ব ও রঙ", value: "স্বচ্ছ সোনালী ও ঘন" },
      { label: "প্রক্রিয়া", value: "অপরিশোধিত কোল্ড এক্সট্রাক্ট" },
    ],
    packages: [
      { kg: 0.5, weight_label: "৫০০ গ্রাম", label: "৫০০ গ্রাম ফুড-গ্রেড জার", price: 650, originalPrice: 750, badge: "ট্রায়াল প্যাক" },
      { kg: 1, weight_label: "১ কেজি", label: "১ কেজি ফ্যামিলি জার", price: 1200, originalPrice: 1400, badge: "সেরা চয়েস" },
      { kg: 2, weight_label: "২ কেজি", label: "২ কেজি মাস্টার প্যাক", price: 2300, originalPrice: 2800, badge: "সাশ্রয়ী প্যাক" },
    ],
    is_featured: true,
  },
  {
    name_bn: "সরিষা ফুলের প্রাকৃতিক কাঁচা মধু",
    name_en: "Mustard Flower Raw Honey",
    subtitle_bn: "ক্রিমি সাদা মাখনের মতো জমে যাওয়া সুস্বাদু মিষ্টি মধু",
    slug: "mustard-flower-honey",
    category: "honey",
    category_bn: "খাঁটি মধু",
    unit: "গ্রাম",
    price_per_unit: 650,
    regular_price_per_unit: 800,
    discount_percent: 18,
    min_order: 1,
    stock_status: "ইন স্টক",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
    origin: "নাটোর ও সিরাজগঞ্জ সরিষা ক্ষেত",
    harvest_schedule: "শীতকালীন তাজা সংগ্রহ",
    description:
      "সরিষা ফুলের প্রাকৃতিক বৈশিষ্ট্যের কারণে শীতকালে এই মধু জমে হালকা মাখনের মতো ক্রিমি রূপ ধারণ করে, যা শিশুদের রুটি ও টোস্টের সাথে খেতে দারুণ পছন্দ।",
    packages: [
      { kg: 0.5, label: "৫০০ গ্রাম জার", price: 350, originalPrice: 420, badge: "জনপ্রিয়" },
      { kg: 1, label: "১ কেজি জার", price: 650, originalPrice: 800, badge: "সেরা সঞ্চয়" },
    ],
  },

  // Dinajpur Lychee Products
  {
    name_bn: "দিনাজপুরের বিখ্যাত বেদানা লিচু",
    name_en: "Dinajpur Bedana Lychee",
    subtitle_bn: "ছোট আঁটি, পুরু মিষ্টি শাঁস ও অসামান্য রসালো সুবাস",
    slug: "dinajpur-bedana-lychee",
    category: "lychee",
    category_bn: "দিনাজপুরের লিচু",
    unit: "পিস",
    price_per_unit: 8,
    regular_price_per_unit: 10,
    discount_percent: 20,
    min_order: 100,
    stock_status: "প্রি-অর্ডার চলছে",
    image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=600&q=80",
    origin: "মাশিমপুর ও বিরল, দিনাজপুর",
    harvest_schedule: "মে মাসের শেষ থেকে জুনের প্রথম সপ্তাহ",
    description:
      "দিনাজপুরের বেদানা জাতের লিচু বাংলাদেশের সবচেয়ে দামী ও রাজকীয় জাত। এর ভেতরে আঁটি অত্যন্ত ছোট এবং শাঁস অত্যন্ত রসালো ও মিষ্টি। কোনো টক ভাব নেই।",
    highlights: ["অত্যন্ত ক্ষুদ্রাতিক্ষুদ্র আঁটি", "রসালো মিষ্টি ও সুগন্ধযুক্ত শাঁস", "দিনাজপুরের বাগান থেকে ফ্রেশ পেড়ে ডেলিভারি"],
    taste_specs: [
      { label: "মিষ্টির মাত্রা", value: "২২° ব্রিক্স" },
      { label: "আঁটির আকার", value: "খুব ছোট (বেদানা)" },
      { label: "রঙ ও চামড়া", value: "উজ্জ্বল গোলাপী লাল" },
    ],
    packages: [
      { kg: 1, label: "১০০ পিস স্পেশাল কার্টন", price: 800, originalPrice: 1000, badge: "জনপ্রিয়" },
      { kg: 5, label: "৫০০ পিস ফ্যামিলি ক্যারেট", price: 3800, originalPrice: 4800, badge: "সেরা সঞ্চয়" },
      { kg: 10, label: "১০০০ পিস গিফট ক্রেইট", price: 7400, originalPrice: 9500, badge: "পাইকারি রেট" },
    ],
    is_featured: true,
  },

  // Mustard Oil & Ghee
  {
    name_bn: "কাঠের ঘানিতে ভাঙা খাঁটি সরিষার তেল",
    name_en: "Cold-Pressed Mustard Oil",
    subtitle_bn: "১০০% মাঘি সরিষার ঝাঁঝালো খাঁটি তেল - কোনো ভেজাল নেই",
    slug: "pure-mustard-oil",
    category: "oil-ghee",
    category_bn: "সরিষার তেল ও ঘি",
    unit: "লিটার",
    price_per_unit: 320,
    regular_price_per_unit: 380,
    discount_percent: 15,
    min_order: 1,
    stock_status: "ইন স্টক",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    origin: "পাবনা ও সিরাজগঞ্জ",
    description:
      "ঐতিহ্যবাহী কাঠের ঘানিতে কম তাপমাত্রায় নিষ্কাশিত প্রাকৃতিক সরিষার তেল। ফলে তেলের প্রাকৃতিক ঝাঁঝ, পুষ্টিগুণ ও উজ্জ্বল রঙ অটুট থাকে। রান্না ও ভর্তার জন্য সেরা।",
    packages: [
      { kg: 1, label: "১ লিটার বোতল", price: 320, originalPrice: 380, badge: "জনপ্রিয়" },
      { kg: 2, label: "২ লিটার ক্যান", price: 620, originalPrice: 750, badge: "সেরা সঞ্চয়" },
      { kg: 5, label: "৫ লিটার ফ্যামিলি জার", price: 1500, originalPrice: 1850, badge: "মেগা সেভ" },
    ],
  },
];

export const sampleOrders = [
  {
    orderId: "BK-22380",
    customerName: "খাদিজা বেগম",
    customerPhone: "01633445577",
    customerAddress: "খুলশী আবাসিক এলাকা, চট্টগ্রাম",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "সুন্দরবনের খলিশা ফুলের মধু",
    packageLabel: "২ কেজি ফ্যামিলি প্যাক",
    packageKg: 2,
    quantity: 1,
    subtotal: 2400,
    totalAmount: 2550,
    deliveryDate: "তাত্ক্ষণিক ডেলিভারি",
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: new Date("2026-11-01T15:20:00Z"),
  },
  {
    orderId: "BK-22363",
    customerName: "তৌহিদুল ইসলাম",
    customerPhone: "01722334488",
    customerAddress: "জিন্দাবাজার, সিলেট",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "সরিষার তেল ও ঘি কম্বো",
    packageLabel: "১ লিটার তেল + ৫০০ গ্রাম ঘি",
    packageKg: 2,
    quantity: 1,
    subtotal: 1450,
    totalAmount: 1600,
    deliveryDate: "তাত্ক্ষণিক ডেলিভারি",
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Confirmed",
    createdAt: new Date("2026-11-01T14:45:00Z"),
  },
  {
    orderId: "BK-22356",
    customerName: "নুসরাত জাহান",
    customerPhone: "01811223399",
    customerAddress: "ব্লক সি, বসুন্ধরা আ/এ, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "ফজলি আম",
    packageLabel: "২০ কেজি ক্রাফট কার্টন",
    packageKg: 20,
    quantity: 1,
    subtotal: 2800,
    totalAmount: 2920,
    deliveryDate: "১ জুলাই থেকে ৭ জুলাই",
    paymentMethod: "bkash",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: new Date("2026-11-01T14:15:00Z"),
  },
  {
    orderId: "BK-22338",
    customerName: "আরিফুল করিম",
    customerPhone: "01999001122",
    customerAddress: "বাঘা, রাজশাহী",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "ক্ষীরশাপাত আম",
    packageLabel: "১০ কেজি মাস্টার বক্স",
    packageKg: 10,
    quantity: 2,
    subtotal: 3800,
    totalAmount: 3950,
    deliveryDate: "২৮ মে থেকে ২ জুন",
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Confirmed",
    createdAt: new Date("2026-11-01T13:40:00Z"),
  },
  {
    orderId: "BK-22315",
    customerName: "আফসানা মিমি",
    customerPhone: "01788990011",
    customerAddress: "ব্লক ই, রোড ১১, বনানী, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "আম্রপালি আম",
    packageLabel: "১০ কেজি ফ্যামিলি বক্স",
    packageKg: 10,
    quantity: 1,
    subtotal: 1850,
    totalAmount: 1970,
    deliveryDate: "১৫ জুন থেকে ২০ জুন",
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Delivered",
    createdAt: new Date("2026-11-01T13:05:00Z"),
  },
  {
    orderId: "BK-22304",
    customerName: "মাহিনুল হক",
    customerPhone: "01677889900",
    customerAddress: "শিবগঞ্জ পয়েন্ট, সিলেট",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "দিনাজপুরের বেদানা লিচু",
    packageLabel: "১০০ পিস স্পেশাল গিফট বক্স",
    packageKg: 3,
    quantity: 1,
    subtotal: 1200,
    totalAmount: 1350,
    deliveryDate: "২৫ মে থেকে ৩০ মে",
    paymentMethod: "bkash",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: new Date("2026-11-01T12:30:00Z"),
  },
  {
    orderId: "BK-22283",
    customerName: "সানজিদা রহমান",
    customerPhone: "01755667788",
    customerAddress: "রোড ২, মিরপুর ডিওএইচএস, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "ল্যাংড়া আম",
    packageLabel: "১০ কেজি স্পেশাল বক্স",
    packageKg: 10,
    quantity: 1,
    subtotal: 1550,
    totalAmount: 1670,
    deliveryDate: "১০ জুন থেকে ১৫ জুন",
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Confirmed",
    createdAt: new Date("2026-11-01T12:00:00Z"),
  },
  {
    orderId: "BK-22262",
    customerName: "মোহাম্মদ রফিকুল ইসলাম",
    customerPhone: "01933445566",
    customerAddress: "জিইসি মোড়, চকবাজার, চট্টগ্রাম",
    deliveryArea: "outside",
    deliveryCharge: 150,
    mangoName: "সুন্দরবনের খাঁটি মধু",
    packageLabel: "১ কেজি প্রিমিয়াম জার",
    packageKg: 1,
    quantity: 2,
    subtotal: 1600,
    totalAmount: 1750,
    deliveryDate: "তাত্ক্ষণিক ডেলিভারি",
    paymentMethod: "cod",
    paymentStatus: "Pending",
    status: "Shipped",
    createdAt: new Date("2026-11-01T11:15:00Z"),
  },
  {
    orderId: "BK-22241",
    customerName: "ফারহানা চৌধুরী",
    customerPhone: "01822334455",
    customerAddress: "ফ্ল্যাট ৪বি, সেক্টর ৭, উত্তরা, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "গোপালভোগ আম",
    packageLabel: "৫ কেজি প্রিমিয়াম বক্স",
    packageKg: 5,
    quantity: 2,
    subtotal: 1800,
    totalAmount: 1920,
    deliveryDate: "১৫ মে থেকে ২০ মে",
    paymentMethod: "bkash",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: new Date("2026-11-01T10:45:00Z"),
  },
  {
    orderId: "BK-22219",
    customerName: "তানভীর আহমেদ",
    customerPhone: "01711223344",
    customerAddress: "হাউজ ১২, রোড ৫, ধানমন্ডি, ঢাকা",
    deliveryArea: "dhaka",
    deliveryCharge: 120,
    mangoName: "হিমসাগর আম",
    packageLabel: "১০ কেজি ফ্যামিলি ক্যারেট",
    packageKg: 10,
    quantity: 1,
    subtotal: 2150,
    totalAmount: 2270,
    deliveryDate: "২০ মে থেকে ২৫ মে",
    paymentMethod: "cod",
    paymentStatus: "Paid",
    status: "Confirmed",
    createdAt: new Date("2026-11-01T10:00:00Z"),
  },
];

export const seedDatabase = async () => {
  try {
    console.log("🌱 Checking and seeding database...");

    // 1. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || "admin@test.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Test123@#";
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      await User.create({
        name: "Super Admin",
        email: adminEmail,
        password: adminPassword,
        role: "superadmin",
      });
      console.log(`👤 Admin created: ${adminEmail}`);
    } else {
      console.log(`👤 Admin verified: ${adminEmail}`);
    }

    // 2. Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(categories);
      console.log(`📁 Seeded ${categories.length} categories.`);
    }

    // 3. Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(sampleProducts);
      console.log(`🛍️ Seeded ${sampleProducts.length} multi-category products.`);
    }

    // 4. Seed Initial Settings (or restore from persistent disk storage)
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      let initialSetting = {};
      const storageFile = path.resolve("data", "settings_storage.json");
      if (fs.existsSync(storageFile)) {
        try {
          const raw = fs.readFileSync(storageFile, "utf-8");
          const parsed = JSON.parse(raw);
          delete parsed._id;
          delete parsed.__v;
          initialSetting = parsed;
          console.log("💾 Restored custom website settings from persistent disk storage.");
        } catch (e) {
          console.warn("Could not parse settings storage file:", e.message);
        }
      }
      await Setting.create(initialSetting);
      console.log("⚙️ Seeded website settings.");
    }

    // 5. Seed Pre-bookings / Orders with fixed dates (or restore from persistent disk storage)
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      let ordersToInsert = sampleOrders;
      const ordersStorage = path.resolve("data", "orders_storage.json");
      if (fs.existsSync(ordersStorage)) {
        try {
          const raw = fs.readFileSync(ordersStorage, "utf-8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            ordersToInsert = parsed;
            console.log("💾 Restored live customer orders from persistent disk storage.");
          }
        } catch (e) {
          // fallback
        }
      }
      await Order.insertMany(ordersToInsert);
      console.log(`📋 Seeded ${ordersToInsert.length} customer orders.`);
    }

    console.log("🎉 Database seeding check completed!");
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
  }
};

// If run directly via `npm run seed`
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  connectDB().then(async () => {
    await seedDatabase();
    process.exit(0);
  });
}
