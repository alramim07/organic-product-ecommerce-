import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaImage,
  FaCloudUploadAlt,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTruck,
  FaShieldAlt,
  FaBoxOpen,
  FaAward,
  FaLeaf,
  FaStar,
  FaEdit,
  FaEye,
  FaPercentage,
  FaTag,
  FaLayerGroup,
  FaClock,
  FaFileAlt,
  FaCheck,
  FaTimes,
  FaLink,
} from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";
import IconPicker from "../../components/common/IconPicker";
import ScheduleDateTimePicker from "../../components/common/ScheduleDateTimePicker";
import CalendarDropdown from "../../components/common/CalendarDropdown";

const defaultPackagingSteps = [
  {
    step: "০১",
    title: "বাগান থেকে গ্রেডিং",
    description:
      "গাছ থেকে পাড়ার পর প্রতিটি আম আলাদাভাবে পরিদর্শন করে দাগহীন ও পুষ্ট আমগুলো বাছাই করা হয়।",
  },
  {
    step: "০২",
    title: "ফোম ও পেপার কুশনিং",
    description:
      "প্রতিটি আমের মাঝে ফুড-গ্রেড নরম কাগজ ও কুশনিং ব্যবহার করা হয় যেন একে অপরের সাথে ঘষা না লাগে।",
  },
  {
    step: "০৩",
    title: "এক্সপ্রেস হোম ডেলিভারি",
    description:
      "প্যাকিং শেষে শীতাতপ নিয়ন্ত্রিত এক্সপ্রেস কুরিয়ারে সরাসরি গ্রাহকের দরজায় পৌঁছে দেওয়া হয়।",
  },
];

const defaultStorageSteps = [
  {
    step: "১",
    title: "বক্স খোলার নিয়ম:",
    description:
      "বক্স পাওয়ার পর পরই ওপরের টেপ কেটে মুখ খুলে দিন। আমগুলো বের করে মেঝেতে কাগজ বিছিয়ে স্বাভাবিক আলো-বাতাসে ছড়িয়ে রাখুন।",
  },
  {
    step: "২",
    title: "ফ্রিজে রাখার নিয়ম:",
    description:
      "আম পুরোপুরি পাকার আগে কখনই ফ্রিজে রাখবেন না। মিষ্টি সুবাস বের হলে এবং খোসা নরম হলে খাওয়ার ২-৩ ঘণ্টা আগে ফ্রিজে রেখে ঠান্ডা করে খেলে সর্বোচ্চ স্বাদ পাওয়া যায়।",
  },
  {
    step: "৩",
    title: "রাসায়নিক মুক্ততার লক্ষণ:",
    description:
      "প্রাকৃতিক আম বোঁটার দিক থেকে পাকা শুরু করে এবং মুখে দিলে আসল গ্রামীণ মিষ্টি ফ্লেভার পাওয়া যায়। কোনো বিষাক্ত ঝাঁঝালো গন্ধ থাকে না।",
  },
];

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useApp();

  const isEdit = Boolean(id);
  const existingProduct = isEdit
    ? products.find((p) => String(p.id) === String(id) || String(p._id) === String(id))
    : null;

  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // General & Category State
  const [category, setCategory] = useState("mango");
  const [unit, setUnit] = useState("কেজি");
  const [isFeatured, setIsFeatured] = useState(false);

  // Main Product Info (Blank by default for Add New Product)
  const [nameBn, setNameBn] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [subtitleBn, setSubtitleBn] = useState("");
  const [slug, setSlug] = useState("");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [rating, setRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Origin & Schedule
  const [origin, setOrigin] = useState("");
  const [stockStatus, setStockStatus] = useState("ইন স্টক");
  const [stockQuantity, setStockQuantity] = useState("");
  const [harvestSchedule, setHarvestSchedule] = useState("");
  const [regionDates, setRegionDates] = useState("");
  const [showRegionSchedule, setShowRegionSchedule] = useState(false);
  const [regionScheduleTitle, setRegionScheduleTitle] = useState("আঞ্চলিক পাকা ও ডেলিভারি শিডিউল:");
  const [showPreorderCalendar, setShowPreorderCalendar] = useState(false);

  // Pricing & Auto-counted Discount
  const [regularPricePerUnit, setRegularPricePerUnit] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [minOrder, setMinOrder] = useState("");

  // Publication Status & Scheduling (Default to 'draft' for all new products)
  const [publicationStatus, setPublicationStatus] = useState("draft");
  const [scheduledAt, setScheduledAt] = useState("");
  const [showSchedulePopover, setShowSchedulePopover] = useState(false);

  // Auto-Save Draft States
  const [savedDraftId, setSavedDraftId] = useState(id || null);
  const [autoSaveStatus, setAutoSaveStatus] = useState("idle"); // "idle" | "saving" | "saved" | "error"
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const isInitialMount = useRef(true);
  const isSubmittingRef = useRef(false);

  // Dynamic Image Badges
  const [imageBadges, setImageBadges] = useState([]);

  // Images & Media
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // Package Options
  const [packages, setPackages] = useState([]);

  // Tab 1: Specs & Taste (Icon + Title separate)
  const [tab1Icon, setTab1Icon] = useState("🥭");
  const [tab1Title, setTab1Title] = useState("বৈশিষ্ট্য ও স্বাদ");
  const [descriptionTitle, setDescriptionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasteSpecs, setTasteSpecs] = useState([]);
  const [highlights, setHighlights] = useState([]);

  // SEO & Product Meta Info
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // Tab 2: Packaging & Shipping (Icon + Title separate)
  const [tab2Icon, setTab2Icon] = useState("📦");
  const [tab2Title, setTab2Title] = useState("প্যাকেজিং ও ডেলিভারি");
  const [packagingDescription, setPackagingDescription] = useState(
    "আম অত্যন্ত সংবেদনশীল ফল। পরিবহনের ঝাঁকুনিতে যেন ফলের কোনো ক্ষতি না হয়, সেজন্য আমরা আন্তর্জাতিক মানের ৫-স্তরবিশিষ্ট (5-ply) ভেন্টিলেটেড হার্ডবোর্ড কার্টন ও ক্রেট ব্যবহার করি।"
  );
  const [packagingSteps, setPackagingSteps] = useState(defaultPackagingSteps);

  // Tab 3: Storage & Care (Icon + Title separate)
  const [tab3Icon, setTab3Icon] = useState("💡");
  const [tab3Title, setTab3Title] = useState("পাকা ও সংরক্ষণ নিয়ম");
  const [storageSteps, setStorageSteps] = useState(defaultStorageSteps);

  // Active Tab for preview
  const [activeTab, setActiveTab] = useState("tab1");

  // Synchronize Discount Calculation Bidirectionally
  const handleRegularPriceChange = (regPrice) => {
    const reg = Number(regPrice) || 0;
    setRegularPricePerUnit(reg);
    if (reg > 0 && discountPercent > 0) {
      const calculatedSelling = Math.round(reg - (reg * discountPercent) / 100);
      setPricePerUnit(calculatedSelling);
    }
  };

  const handleDiscountPercentChange = (discPct) => {
    const disc = Number(discPct) || 0;
    setDiscountPercent(disc);
    if (regularPricePerUnit > 0) {
      const calculatedSelling = Math.round(
        regularPricePerUnit - (regularPricePerUnit * disc) / 100
      );
      setPricePerUnit(calculatedSelling);
    }
    // Auto update discount badge text
    setImageBadges((prev) =>
      prev.map((b) => (b.type === "discount" ? { ...b, text: `${disc}% ছাড়` } : b))
    );
  };

  const handleSellingPriceChange = (sellPrice) => {
    const selling = Number(sellPrice) || 0;
    setPricePerUnit(selling);
    if (regularPricePerUnit > 0 && regularPricePerUnit > selling) {
      const disc = Math.round(
        ((regularPricePerUnit - selling) / regularPricePerUnit) * 100
      );
      setDiscountPercent(disc);
      // Auto update discount badge text
      setImageBadges((prev) =>
        prev.map((b) => (b.type === "discount" ? { ...b, text: `${disc}% ছাড়` } : b))
      );
    }
  };

  // Badge Management Handlers
  const addBadge = (type = "normal", position = "top-left") => {
    const isRight = position.includes("right");
    const newBadge = {
      id: `b_${Date.now()}`,
      text: type === "discount" ? `${discountPercent}% ছাড়` : "নতুন ট্যাগ",
      type: type,
      position: position,
      side: isRight ? "right" : "left",
      color: type === "discount" ? "red" : isRight ? "amber" : "green",
      fontSize: 12,
    };
    setImageBadges((prev) => [...prev, newBadge]);
  };

  const removeBadge = (badgeId) => {
    setImageBadges((prev) => prev.filter((b) => b.id !== badgeId));
  };

  const updateBadge = (badgeId, field, value) => {
    setImageBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, [field]: value } : b))
    );
  };

  // Mouse drag-to-resize badge handle directly on the image
  const handleBadgeResizeMouseDown = (e, badgeId, currentSize = 12) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = currentSize;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const delta = Math.round((deltaX + deltaY) / 3);
      const newSize = Math.max(9, Math.min(32, startSize + delta));
      updateBadge(badgeId, "fontSize", newSize);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Helper to format text into URL-friendly slug
  const slugify = (text) => {
    return (text || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9\u0980-\u09FF-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameBnChange = (val) => {
    setNameBn(val);
    if (!isCustomSlug && !isEdit && !nameEn) {
      setSlug(slugify(val));
    }
  };

  const handleNameEnChange = (val) => {
    setNameEn(val);
    if (!isCustomSlug && !isEdit) {
      setSlug(slugify(val || nameBn));
    }
  };

  const handleSlugChange = (val) => {
    setIsCustomSlug(true);
    setSlug(slugify(val));
  };

  // Reset form to clean default state for Add New Product route (/admin/products/add)
  const resetForm = () => {
    setCategory("mango");
    setUnit("কেজি");
    setIsFeatured(false);
    setNameBn("");
    setNameEn("");
    setSubtitleBn("");
    setSlug("");
    setIsCustomSlug(false);
    setRating(5.0);
    setTotalReviews(0);
    setOrigin("");
    setStockStatus("ইন স্টক");
    setStockQuantity("");
    setHarvestSchedule("");
    setRegionDates("");
    setShowRegionSchedule(false);
    setRegionScheduleTitle("আঞ্চলিক পাকা ও ডেলিভারি শিডিউল:");
    setShowPreorderCalendar(false);
    setRegularPricePerUnit("");
    setDiscountPercent(0);
    setPricePerUnit("");
    setMinOrder("");
    setPublicationStatus("draft");
    setScheduledAt("");
    setShowSchedulePopover(false);
    setSavedDraftId(null);
    setAutoSaveStatus("idle");
    setLastSavedTime(null);
    setImageBadges([]);
    setImage("");
    setGallery([]);
    setPackages([]);
    setTab1Icon("🥭");
    setTab1Title("বৈশিষ্ট্য ও স্বাদ");
    setDescriptionTitle("");
    setDescription("");
    setTasteSpecs([]);
    setHighlights([]);
    setTab2Icon("📦");
    setTab2Title("প্যাকেজিং ও ডেলিভারি");
    setPackagingDescription(
      "আম অত্যন্ত সংবেদনশীল ফল। পরিবহনের ঝাঁকুনিতে যেন ফলের কোনো ক্ষতি না হয়, সেজন্য আমরা আন্তর্জাতিক মানের ৫-স্তরবিশিষ্ট (5-ply) ভেন্টিলেটেড হার্ডবোর্ড কার্টন ও ক্রেট ব্যবহার করি।"
    );
    setPackagingSteps(defaultPackagingSteps);
    setTab3Icon("💡");
    setTab3Title("পাকা ও সংরক্ষণ নিয়ম");
    setStorageSteps(defaultStorageSteps);
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setActiveTab("tab1");
    isInitialMount.current = true;
  };

  // Load existing product in edit mode or reset when navigating to Add Product
  useEffect(() => {
    if (isEdit) {
      if (existingProduct) {
        setCategory(existingProduct.category || "mango");
        setUnit(existingProduct.unit || "কেজি");
        setIsFeatured(Boolean(existingProduct.is_featured));
        setNameBn(existingProduct.name_bn || "");
        setNameEn(existingProduct.name_en || "");
        setSubtitleBn(existingProduct.subtitle_bn || "");
        setSlug(existingProduct.slug || "");
        setIsCustomSlug(Boolean(existingProduct.slug));
        setRating(existingProduct.rating || 4.9);
        setTotalReviews(existingProduct.total_reviews || 25);
        setOrigin(existingProduct.origin || "বাঘা ও পুঠিয়া, রাজশাহী");
        setStockStatus(existingProduct.stock_status || "ইন স্টক");
        setHarvestSchedule(existingProduct.harvest_schedule || "");
        setRegionDates(existingProduct.regionDates || "");
        setShowRegionSchedule(
          existingProduct.show_region_schedule !== undefined
            ? Boolean(existingProduct.show_region_schedule)
            : Boolean(existingProduct.regionDates)
        );
        setRegionScheduleTitle(
          existingProduct.region_schedule_title || "আঞ্চলিক পাকা ও ডেলিভারি শিডিউল:"
        );

        const regPrice =
          existingProduct.regular_price_per_unit ||
          existingProduct.regular_price_per_kg ||
          210;
        const sellPrice =
          existingProduct.price_per_unit ||
          existingProduct.price_per_kg ||
          existingProduct.price ||
          180;
        setRegularPricePerUnit(regPrice);
        setPricePerUnit(sellPrice);

        const disc =
          existingProduct.discount_percent ||
          (regPrice > sellPrice
            ? Math.round(((regPrice - sellPrice) / regPrice) * 100)
            : 0);
        setDiscountPercent(disc);

        setMinOrder(
          existingProduct.min_order_kg
            ? `${existingProduct.min_order_kg} ${existingProduct.unit || "কেজি"} বক্স`
            : existingProduct.min_order || ""
        );
        setImage(existingProduct.image || "");

        if (existingProduct.gallery && existingProduct.gallery.length > 0) {
          setGallery(existingProduct.gallery);
        } else if (existingProduct.image) {
          setGallery([existingProduct.image]);
        } else {
          setGallery([]);
        }

        setImageBadges(existingProduct.image_badges || []);
        setPackages(existingProduct.packages || []);
        setDescriptionTitle(existingProduct.description_title || "");
        setDescription(existingProduct.description || "");

        // Tab icons & titles
        if (existingProduct.tab1_title) {
          setTab1Title(existingProduct.tab1_title.replace(/^[^\s\w\u0980-\u09FF]+\s*/, ""));
        }
        if (existingProduct.tab1_icon !== undefined) {
          setTab1Icon(existingProduct.tab1_icon);
        }

        if (existingProduct.tab2_title) {
          setTab2Title(existingProduct.tab2_title.replace(/^[^\s\w\u0980-\u09FF]+\s*/, ""));
        }
        if (existingProduct.tab2_icon !== undefined) {
          setTab2Icon(existingProduct.tab2_icon);
        }

        if (existingProduct.tab3_title) {
          setTab3Title(existingProduct.tab3_title.replace(/^[^\s\w\u0980-\u09FF]+\s*/, ""));
        }
        if (existingProduct.tab3_icon !== undefined) {
          setTab3Icon(existingProduct.tab3_icon);
        }

        setTasteSpecs(existingProduct.taste_specs || []);
        setHighlights(existingProduct.highlights || []);

        if (existingProduct.packaging_description) {
          setPackagingDescription(existingProduct.packaging_description);
        }

        if (existingProduct.packaging_steps && existingProduct.packaging_steps.length > 0) {
          setPackagingSteps(existingProduct.packaging_steps);
        }

        if (existingProduct.storage_steps && existingProduct.storage_steps.length > 0) {
          setStorageSteps(existingProduct.storage_steps);
        }

        if (existingProduct.stock_quantity !== undefined) {
          setStockQuantity(existingProduct.stock_quantity);
        }

        if (existingProduct.publication_status) {
          setPublicationStatus(existingProduct.publication_status);
        }

        if (existingProduct.scheduled_at) {
          setScheduledAt(existingProduct.scheduled_at);
        }

        if (existingProduct._id || existingProduct.id) {
          setSavedDraftId(existingProduct._id || existingProduct.id);
        }

        setMetaTitle(existingProduct.meta_title || "");
        setMetaDescription(existingProduct.meta_description || "");
        setMetaKeywords(existingProduct.meta_keywords || "");
      }
    } else {
      // User navigated to Add New Product route (/admin/products/add) -> Reset cleanly!
      resetForm();
    }
  }, [id, existingProduct, isEdit]);

  // Real-time Slug Uniqueness Check
  const currentId = savedDraftId || (isEdit ? id : null);
  const cleanSlug = slug.trim().toLowerCase();
  const isSlugTaken = Boolean(
    cleanSlug &&
      products.some(
        (p) =>
          p.slug &&
          p.slug.trim().toLowerCase() === cleanSlug &&
          String(p._id || p.id) !== String(currentId)
      )
  );

  // Image Upload Handlers
  const handleImageUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Format",
        text: "Please select an image file (JPG, PNG, WEBP)",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImage(dataUrl);
      if (!gallery.includes(dataUrl)) {
        setGallery((prev) => [dataUrl, ...prev.slice(0, 3)]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryAdd = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setGallery((prev) => [...prev, dataUrl]);
      if (!image) {
        setImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeGalleryImage = (idx) => {
    const targetImg = gallery[idx];
    const newGallery = gallery.filter((_, i) => i !== idx);
    setGallery(newGallery);
    if (image === targetImg) {
      setImage(newGallery.length > 0 ? newGallery[0] : "");
    }
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Package handlers
  const handlePackageChange = (idx, field, val) => {
    setPackages((prev) =>
      prev.map((pkg, i) => (i === idx ? { ...pkg, [field]: val } : pkg))
    );
  };
  const addPackage = () => {
    setPackages((prev) => [
      ...prev,
      {
        kg: (prev.length + 1) * 5,
        label: `${(prev.length + 1) * 5} ${unit} মেগা প্যাক`,
        price: (Number(pricePerUnit) || 180) * (prev.length + 1) * 5,
        originalPrice: (Number(regularPricePerUnit) || 210) * (prev.length + 1) * 5,
        badge: "স্পেশাল",
      },
    ]);
  };
  const removePackage = (idx) => {
    setPackages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Taste Specs Handlers
  const handleSpecChange = (idx, field, val) => {
    setTasteSpecs((prev) =>
      prev.map((spec, i) => (i === idx ? { ...spec, [field]: val } : spec))
    );
  };
  const addSpec = () => {
    setTasteSpecs((prev) => [
      ...prev,
      { label: "নতুন প্যারামিটার", value: "মান লিখুন" },
    ]);
  };
  const removeSpec = (idx) => {
    setTasteSpecs((prev) => prev.filter((_, i) => i !== idx));
  };

  // Highlights Handlers
  const handleHighlightChange = (idx, val) => {
    setHighlights((prev) => prev.map((h, i) => (i === idx ? val : h)));
  };
  const addHighlight = () => {
    setHighlights((prev) => [...prev, "নতুন বিশেষ বৈশিষ্ট্য"]);
  };
  const removeHighlight = (idx) => {
    setHighlights((prev) => prev.filter((_, i) => i !== idx));
  };

  // Packaging Steps Handlers
  const handlePackagingStepChange = (idx, field, val) => {
    setPackagingSteps((prev) =>
      prev.map((st, i) => (i === idx ? { ...st, [field]: val } : st))
    );
  };
  const addPackagingStep = () => {
    setPackagingSteps((prev) => [
      ...prev,
      {
        step: `০${prev.length + 1}`,
        title: "",
        description: "",
      },
    ]);
  };
  const removePackagingStep = (idx) => {
    setPackagingSteps((prev) => prev.filter((_, i) => i !== idx));
  };

  // Storage Steps Handlers
  const handleStorageStepChange = (idx, field, val) => {
    setStorageSteps((prev) =>
      prev.map((st, i) => (i === idx ? { ...st, [field]: val } : st))
    );
  };
  const addStorageStep = () => {
    setStorageSteps((prev) => [
      ...prev,
      {
        step: `${prev.length + 1}`,
        title: "",
        description: "",
      },
    ]);
  };
  const removeStorageStep = (idx) => {
    setStorageSteps((prev) => prev.filter((_, i) => i !== idx));
  };

  // Selected Category Object & Available Units
  const currentCategoryObj = categories.find((c) => c.slug === category);
  const categoryAvailableUnits =
    currentCategoryObj?.available_units && currentCategoryObj.available_units.length > 0
      ? currentCategoryObj.available_units
      : ["কেজি", "গ্রাম", "লিটার", "মিলি", "পিস", "বোতল", "জার", "বক্স", "ক্যারেট"];

  // Auto-Save Effect (Debounced 2.5 seconds)
  useEffect(() => {
    // Avoid running on initial mount / while state is loading
    if (isInitialMount.current) {
      const t = setTimeout(() => {
        isInitialMount.current = false;
      }, 1500);
      return () => clearTimeout(t);
    }

    // Do not auto-save if manual submit was triggered, product name is empty, or slug collides
    if (isSubmittingRef.current || !nameBn.trim() || (cleanSlug && isSlugTaken)) {
      return;
    }

    const timer = setTimeout(async () => {
      if (isSubmittingRef.current || !nameBn.trim() || (cleanSlug && isSlugTaken)) return;

      try {
        setAutoSaveStatus("saving");

        const selectedCatObj = categories.find((c) => c.slug === category);
        const draftStatus =
          isEdit && existingProduct?.publication_status === "published"
            ? "published"
            : "draft";

        const draftPayload = {
          name_bn: nameBn.trim(),
          name_en: nameEn || nameBn,
          subtitle_bn: subtitleBn,
          slug: cleanSlug || undefined,
          category: category,
          category_bn: selectedCatObj ? selectedCatObj.name_bn : "সাধারণ পণ্য",
          unit: unit,
          price: `৳ ${pricePerUnit || 0}/${unit}`,
          price_per_unit: Number(pricePerUnit) || 0,
          price_per_kg: Number(pricePerUnit) || 0,
          regular_price_per_unit: Number(regularPricePerUnit) || 0,
          regular_price_per_kg: Number(regularPricePerUnit) || 0,
          discount_percent: Number(discountPercent) || 0,
          stock_status: stockStatus,
          stock_quantity:
            stockStatus === "সীমিত স্টক" ? Number(stockQuantity) || 0 : undefined,
          origin: origin,
          harvest_schedule: harvestSchedule,
          show_region_schedule: showRegionSchedule,
          region_schedule_title: regionScheduleTitle,
          regionDates: regionDates,
          min_order: minOrder,
          image: image,
          gallery: gallery.length > 0 ? gallery : image ? [image] : [],
          image_badges: imageBadges,
          description_title: descriptionTitle,
          description: description,
          rating: Number(rating) || 5.0,
          total_reviews: Number(totalReviews) || 0,
          is_featured: isFeatured,
          packages: packages,
          taste_specs: tasteSpecs,
          highlights: highlights,
          tab1_icon: (tab1Icon || "").trim(),
          tab1_title: (tab1Title || "").trim(),
          tab2_icon: (tab2Icon || "").trim(),
          tab2_title: (tab2Title || "").trim(),
          packaging_description: packagingDescription,
          packaging_steps: packagingSteps,
          tab3_icon: (tab3Icon || "").trim(),
          tab3_title: (tab3Title || "").trim(),
          storage_steps: storageSteps,
          meta_title: metaTitle,
          meta_description: metaDescription,
          meta_keywords: metaKeywords,
          publication_status: draftStatus,
          scheduled_at: null,
        };

        const activeId = savedDraftId || (isEdit ? id : null);
        if (activeId) {
          await updateProduct(activeId, draftPayload);
        } else {
          const res = await addProduct(draftPayload);
          const newId = res?._id || res?.id;
          if (newId) {
            setSavedDraftId(newId);
            window.history.replaceState(null, "", `/admin/products/edit/${newId}`);
          }
        }

        setAutoSaveStatus("saved");
        setLastSavedTime(new Date());
      } catch (err) {
        console.error("Auto-save draft error:", err);
        setAutoSaveStatus("error");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [
    nameBn,
    nameEn,
    subtitleBn,
    cleanSlug,
    isSlugTaken,
    category,
    unit,
    pricePerUnit,
    regularPricePerUnit,
    discountPercent,
    stockStatus,
    stockQuantity,
    origin,
    harvestSchedule,
    showRegionSchedule,
    regionScheduleTitle,
    regionDates,
    minOrder,
    image,
    gallery,
    imageBadges,
    descriptionTitle,
    description,
    rating,
    totalReviews,
    isFeatured,
    packages,
    tasteSpecs,
    highlights,
    tab1Icon,
    tab1Title,
    tab2Icon,
    tab2Title,
    packagingDescription,
    packagingSteps,
    tab3Icon,
    tab3Title,
    storageSteps,
    metaTitle,
    metaDescription,
    metaKeywords,
  ]);

  // WordPress-style Live Preview in New Tab
  const handleLivePreview = () => {
    const selectedCatObj = categories.find((c) => c.slug === category);
    const livePreviewData = {
      _id: savedDraftId || id || "preview-temp",
      id: savedDraftId || id || "preview-temp",
      name_bn: nameBn.trim() || "টেস্ট প্রোডাক্ট",
      name_en: nameEn || nameBn || "Test Product",
      subtitle_bn: subtitleBn,
      slug: cleanSlug || "preview",
      category: category,
      category_bn: selectedCatObj ? selectedCatObj.name_bn : "আম",
      unit: unit,
      price: `৳ ${pricePerUnit || 0}/${unit}`,
      price_per_unit: Number(pricePerUnit) || 0,
      price_per_kg: Number(pricePerUnit) || 0,
      regular_price_per_unit: Number(regularPricePerUnit) || 0,
      regular_price_per_kg: Number(regularPricePerUnit) || 0,
      discount_percent: Number(discountPercent) || 0,
      stock_status: stockStatus,
      stock_quantity: stockStatus === "সীমিত স্টক" ? Number(stockQuantity) || 0 : undefined,
      origin: origin,
      harvest_schedule: harvestSchedule,
      show_region_schedule: showRegionSchedule,
      region_schedule_title: regionScheduleTitle,
      regionDates: regionDates,
      min_order: minOrder,
      image: image || "/assets/mangoes/m1.jpg",
      gallery: gallery.length > 0 ? gallery : image ? [image] : ["/assets/mangoes/m1.jpg"],
      image_badges: imageBadges,
      description: description,
      description_title: descriptionTitle,
      rating: Number(rating) || 5.0,
      total_reviews: Number(totalReviews) || 0,
      is_featured: isFeatured,
      packages: packages,
      taste_specs: tasteSpecs,
      highlights: highlights,
      tab1_icon: tab1Icon,
      tab1_title: tab1Title,
      tab2_icon: tab2Icon,
      tab2_title: tab2Title,
      packaging_description: packagingDescription,
      packaging_steps: packagingSteps,
      tab3_icon: tab3Icon,
      tab3_title: tab3Title,
      storage_steps: storageSteps,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      publication_status: publicationStatus,
    };

    try {
      sessionStorage.setItem("live_product_preview", JSON.stringify(livePreviewData));
    } catch (e) {
      console.warn("Could not save to sessionStorage", e);
    }

    const previewTarget = cleanSlug || savedDraftId || id || "preview";
    window.open(`/product/${previewTarget}?preview=true`, "_blank");
  };

  // Save / Publish / Schedule / Draft Handler
  const handleSaveProduct = async (e, explicitStatus = null) => {
    if (e) e.preventDefault();
    isSubmittingRef.current = true;

    if (!nameBn.trim()) {
      isSubmittingRef.current = false;
      Swal.fire({
        icon: "warning",
        title: "Product Name Required",
        text: "Please provide the Bengali product name.",
      });
      return;
    }

    if (cleanSlug && isSlugTaken) {
      isSubmittingRef.current = false;
      Swal.fire({
        icon: "warning",
        title: "Duplicate URL Slug",
        text: "এই URL Slug টি ইতিমধ্যে অন্য পণ্যে ব্যবহৃত হচ্ছে। অনুগ্রহ করে একটি ইউনিক স্লাগ ব্যবহার করুন।",
      });
      return;
    }

    const targetStatus = explicitStatus || publicationStatus || "draft";

    if (targetStatus === "scheduled" && !scheduledAt) {
      isSubmittingRef.current = false;
      Swal.fire({
        icon: "warning",
        title: "Schedule Date & Time Required",
        text: "Please select when this product should be published.",
      });
      setShowSchedulePopover(true);
      return;
    }

    const selectedCatObj = categories.find((c) => c.slug === category);

    const productPayload = {
      name_bn: nameBn.trim(),
      name_en: nameEn || nameBn,
      subtitle_bn: subtitleBn,
      slug: cleanSlug || undefined,
      category: category,
      category_bn: selectedCatObj ? selectedCatObj.name_bn : "সাধারণ পণ্য",
      unit: unit,
      price: `৳ ${pricePerUnit || 0}/${unit}`,
      price_per_unit: Number(pricePerUnit) || 0,
      price_per_kg: Number(pricePerUnit) || 0,
      regular_price_per_unit: Number(regularPricePerUnit) || 0,
      regular_price_per_kg: Number(regularPricePerUnit) || 0,
      discount_percent: Number(discountPercent) || 0,
      stock_status: stockStatus,
      stock_quantity: stockStatus === "সীমিত স্টক" ? Number(stockQuantity) || 0 : undefined,
      origin: origin,
      harvest_schedule: harvestSchedule,
      show_region_schedule: showRegionSchedule,
      region_schedule_title: regionScheduleTitle,
      regionDates: regionDates,
      min_order: minOrder,
      image: image,
      gallery: gallery.length > 0 ? gallery : image ? [image] : [],
      image_badges: imageBadges,
      description_title: descriptionTitle,
      description: description,
      rating: Number(rating) || 5.0,
      total_reviews: Number(totalReviews) || 0,
      is_featured: isFeatured,
      packages: packages,
      taste_specs: tasteSpecs,
      highlights: highlights,
      tab1_icon: (tab1Icon || "").trim(),
      tab1_title: (tab1Title || "").trim(),
      tab2_icon: (tab2Icon || "").trim(),
      tab2_title: (tab2Title || "").trim(),
      packaging_description: packagingDescription,
      packaging_steps: packagingSteps,
      tab3_icon: (tab3Icon || "").trim(),
      tab3_title: (tab3Title || "").trim(),
      storage_steps: storageSteps,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      publication_status: targetStatus,
      scheduled_at: targetStatus === "scheduled" ? scheduledAt : null,
    };

    try {
      const targetId = savedDraftId || (isEdit ? id : null);
      if (targetId) {
        await updateProduct(targetId, productPayload);
        Swal.fire({
          icon: "success",
          title:
            targetStatus === "draft"
              ? "Saved as Draft!"
              : targetStatus === "scheduled"
              ? "Product Scheduled!"
              : "Product Updated!",
          text: `"${nameBn}" has been saved successfully (${targetStatus.toUpperCase()}).`,
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        await addProduct(productPayload);
        Swal.fire({
          icon: "success",
          title:
            targetStatus === "draft"
              ? "Saved as Draft!"
              : targetStatus === "scheduled"
              ? "Product Scheduled!"
              : "Product Published!",
          text: `"${nameBn}" has been created (${targetStatus.toUpperCase()}).`,
          timer: 1800,
          showConfirmButton: false,
        });
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Save product error:", err);
      isSubmittingRef.current = false;
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: err?.response?.data?.message || err?.message || "Failed to save product.",
      });
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Header Bar (Clean, without Live WYSIWYG badge or subtitle) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-30 backdrop-blur-md bg-white/95">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition text-sm cursor-pointer"
            title="Back to Product List"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-gray-900">
                {isEdit ? `Edit Product: ${nameBn || nameEn}` : "Add New Product"}
              </h2>

              {/* Status Badge */}
              {publicationStatus === "draft" && (
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-black rounded-full border border-gray-300">
                  📁 Draft
                </span>
              )}
              {publicationStatus === "published" && (
                <span className="px-2.5 py-0.5 bg-green-50 text-green-800 text-xs font-black rounded-full border border-green-300">
                  🟢 Live / Published
                </span>
              )}
              {publicationStatus === "scheduled" && (
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 text-xs font-black rounded-full border border-amber-300">
                  ⏰ Scheduled
                </span>
              )}

              {/* Auto-Save Status Badge */}
              {autoSaveStatus === "saving" && (
                <span className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300 font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping inline-block" />
                  Auto-saving to draft...
                </span>
              )}
              {autoSaveStatus === "saved" && (
                <span className="flex items-center gap-1.5 text-[11px] text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-300 font-bold">
                  <FaCheck className="text-[9px]" />
                  Draft auto-saved {lastSavedTime ? `at ${lastSavedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ""}
                </span>
              )}
              {autoSaveStatus === "error" && (
                <span className="flex items-center gap-1 text-[11px] text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-300 font-bold">
                  <FaTimes className="text-[9px]" /> Auto-save failed
                </span>
              )}
              {autoSaveStatus === "idle" && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                  <FaClock className="text-[9px]" /> Auto-save enabled
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Global Controls: Category, Unit, Draft, Schedule, Publish */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Dynamic Category Selector */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-bold">
            <span className="text-gray-500">Category:</span>
            <select
              value={category}
              onChange={(e) => {
                const newCatSlug = e.target.value;
                setCategory(newCatSlug);
                const found = categories.find((c) => c.slug === newCatSlug);
                if (found?.unit) {
                  setUnit(found.unit);
                }
              }}
              className="bg-transparent font-extrabold text-green-900 focus:outline-none cursor-pointer"
            >
              {categories
                .filter((c) => c.slug !== "all")
                .map((cat) => (
                  <option key={cat._id || cat.slug} value={cat.slug}>
                    {cat.icon || "📦"} {cat.name_bn}
                  </option>
                ))}
            </select>
          </div>

          {/* Dynamic Unit Selector */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-bold">
            <span className="text-gray-500">Unit:</span>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-transparent font-extrabold text-gray-800 focus:outline-none cursor-pointer"
            >
              {categoryAvailableUnits.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <Link
            to="/admin/categories"
            target="_blank"
            className="p-1.5 text-green-700 hover:text-green-900 hover:bg-green-50 rounded-xl transition text-xs font-bold flex items-center gap-1"
            title="Manage Categories and Units"
          >
            <FaLayerGroup /> <span className="hidden sm:inline">Categories</span>
          </Link>

          {/* Publication Status Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-bold">
            <span className="text-gray-500">Status:</span>
            <select
              value={publicationStatus}
              onChange={(e) => {
                const val = e.target.value;
                setPublicationStatus(val);
                if (val === "scheduled") {
                  setShowSchedulePopover(true);
                }
              }}
              className={`bg-transparent font-extrabold focus:outline-none cursor-pointer ${
                publicationStatus === "published"
                  ? "text-green-700"
                  : publicationStatus === "draft"
                  ? "text-gray-700"
                  : "text-amber-700"
              }`}
            >
              <option value="published">🟢 Published</option>
              <option value="draft">📁 Draft</option>
              <option value="scheduled">⏰ Scheduled</option>
            </select>
          </div>

          {/* Save / Update as Draft Button */}
          <button
            type="button"
            onClick={(e) => handleSaveProduct(e, "draft")}
            className={`px-3 py-1.5 font-bold text-xs rounded-xl border transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
              publicationStatus === "draft"
                ? "bg-gray-200 border-gray-400 text-gray-900"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
            }`}
            title="Save as Draft (will not show on live shop)"
          >
            <FaFileAlt className="text-gray-500 text-xs" />
            <span>{publicationStatus === "draft" ? "Update Draft" : "Save as Draft"}</span>
          </button>

          {/* Schedule Button with Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSchedulePopover(!showSchedulePopover)}
              className={`px-3 py-1.5 font-bold text-xs rounded-xl border transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                publicationStatus === "scheduled" || scheduledAt
                  ? "bg-amber-100 border-amber-400 text-amber-900"
                  : "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-800"
              }`}
              title="Schedule release with date and time"
            >
              <FaClock className="text-amber-600 text-xs" />
              <span>{scheduledAt ? "Scheduled" : "Schedule"}</span>
            </button>

            {/* Interactive Schedule Modal with Calendar and Analog Clock */}
            {showSchedulePopover && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
                <ScheduleDateTimePicker
                  initialValue={scheduledAt}
                  onConfirm={(formatted) => {
                    setScheduledAt(formatted);
                    setPublicationStatus("scheduled");
                    setShowSchedulePopover(false);
                    Swal.fire({
                      icon: "success",
                      title: "Schedule Saved!",
                      text: `Product scheduled for: ${formatted.replace("T", " ")}`,
                      timer: 1600,
                      showConfirmButton: false,
                    });
                  }}
                  onCancel={() => setShowSchedulePopover(false)}
                />
              </div>
            )}
          </div>

          {/* WordPress-style Live Preview in New Tab */}
          <button
            type="button"
            onClick={handleLivePreview}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            title="Open Live Preview in a new tab"
          >
            <FaEye className="text-xs text-blue-600" />
            <span>Live Preview</span>
          </button>

          {/* Publish / Update Button */}
          <button
            type="button"
            onClick={(e) => handleSaveProduct(e, "published")}
            className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-extrabold text-xs rounded-xl shadow hover:shadow-md transition flex items-center gap-1.5 cursor-pointer"
            title={publicationStatus === "draft" ? "Publish this draft to public shop" : "Save & update public product"}
          >
            <FaCheckCircle className="text-xs" />
            <span>
              {publicationStatus === "draft" ? "Publish Product" : isEdit ? "Update Product" : "Publish Product"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Single-Product-Page Layout Grid (12 Cols) */}
      <div className="bg-gradient-to-b from-amber-50/50 via-white to-green-50/30 rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl border border-yellow-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Featured Image + Badges & Upload (5 Cols)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual Main Image Container with Dynamic Badges */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-3xl overflow-hidden border-2 transition-all group h-80 sm:h-96 md:h-[430px] flex flex-col items-center justify-center bg-gray-50 ${
                dragOver
                  ? "border-green-600 bg-green-50/80 scale-[1.01]"
                  : "border-yellow-300 hover:border-green-500"
              }`}
            >
              {/* Product Image Preview or Empty State */}
              {image ? (
                <>
                  <img
                    src={image}
                    alt={nameBn || "Preview"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Explicit Delete Button for Main Image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const deletedImg = image;
                      setImage("");
                      setGallery((prev) => prev.filter((img) => img !== deletedImg));
                    }}
                    className="absolute top-3 right-3 z-30 px-3 py-1.5 bg-red-600/90 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
                    title="Delete Product Image"
                  >
                    <FaTrash className="text-xs" /> <span>Delete Image</span>
                  </button>

                  {/* Dynamic 4-Corner Badges Overlay: Top-Left, Top-Right, Bottom-Left, Bottom-Right */}
                  {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => {
                    const isLeft = pos.includes("left");
                    const isTop = pos.includes("top");
                    const badges = imageBadges.filter((b) => {
                      const bPos =
                        b.position || (b.side === "right" ? "top-right" : "top-left");
                      return bPos === pos;
                    });

                    if (badges.length === 0) return null;

                    return (
                      <div
                        key={pos}
                        className={`absolute ${isTop ? "top-4" : "bottom-4"} ${
                          isLeft ? "left-4 items-start" : "right-4 items-end"
                        } flex flex-col gap-2 z-10 pointer-events-none`}
                      >
                        {badges.map((b) => (
                          <div
                            key={b.id}
                            style={{
                              fontSize: `${b.fontSize || 12}px`,
                              padding: `${Math.max(
                                2,
                                Math.round((b.fontSize || 12) * 0.3)
                              )}px ${Math.round((b.fontSize || 12) * 0.75)}px`,
                            }}
                            className={`backdrop-blur-sm text-white font-bold rounded-full shadow-lg flex items-center gap-1.5 group/badge pointer-events-auto relative select-none transition-all ${
                              b.type === "discount" || b.color === "red"
                                ? "bg-red-500/95"
                                : b.color === "amber"
                                ? "bg-amber-500/95"
                                : b.color === "blue"
                                ? "bg-blue-600/95"
                                : b.color === "purple"
                                ? "bg-purple-600/95"
                                : "bg-green-600/95"
                            }`}
                          >
                            {b.type === "discount" ? (
                              <FaPercentage className="text-yellow-200 text-[10px]" />
                            ) : (
                              <FaLeaf className="text-yellow-300 text-[10px]" />
                            )}
                            <span>{b.text}</span>

                            {/* Mouse Drag Resize Handle directly on the Badge */}
                            <span
                              onMouseDown={(e) =>
                                handleBadgeResizeMouseDown(e, b.id, b.fontSize || 12)
                              }
                              className="cursor-se-resize ml-1 text-yellow-300 hover:text-white opacity-70 hover:opacity-100 font-mono text-[11px] p-0.5 rounded transition"
                              title="Click and drag mouse outward/inward to resize tag"
                            >
                              ⤡
                            </span>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeBadge(b.id);
                              }}
                              className="ml-0.5 opacity-60 hover:opacity-100 hover:text-white cursor-pointer"
                              title="Remove Tag"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {/* Hover Overlay with Upload Controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center text-white backdrop-blur-[2px]">
                    <FaCloudUploadAlt className="text-4xl text-yellow-300 mb-2 animate-bounce" />
                    <p className="font-extrabold text-base mb-1">Change Product Image</p>
                    <p className="text-xs text-gray-200 mb-4">
                      Drop new image here or click below to browse
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-green-950 font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                    >
                      <FaImage /> Choose New File
                    </button>
                    <span className="text-[10px] text-gray-300 mt-2">
                      Recommended: 800 x 800 px (Square JPG/PNG/WEBP, Max 5MB)
                    </span>
                  </div>
                </>
              ) : (
                /* Empty Upload Dropzone Matching User Spec */
                <div className="text-center p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow">
                    <FaCloudUploadAlt />
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 mb-2 cursor-pointer"
                  >
                    <FaImage /> Choose Files
                  </button>
                  <p className="text-xs text-gray-500 font-semibold mb-1">
                    or drop your images here
                  </p>
                  <p className="text-[11px] text-gray-400 border border-gray-200 rounded-md px-2.5 py-1 bg-white font-mono">
                    IMG Size: 800 x 800 px • Format: JPG, PNG, WEBP (Max 5MB)
                  </p>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* Dynamic Badges Manager Tool (Add / Configure Badges in 4 corners with Mouse Drag / Slider) */}
            <div className="p-4 bg-white rounded-2xl border border-yellow-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <FaTag className="text-amber-600" /> Image Badges (Top & Bottom • Left & Right):
                  </span>
                  <p className="text-[10px] text-gray-400">
                    Drag the mouse on the badge handle (⤡) or use the slider below to resize.
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => addBadge("normal", "top-left")}
                    className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-800 text-[10px] font-bold rounded-lg border border-green-200 transition cursor-pointer"
                  >
                    + Top-Left
                  </button>
                  <button
                    type="button"
                    onClick={() => addBadge("normal", "top-right")}
                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg border border-amber-200 transition cursor-pointer"
                  >
                    + Top-Right
                  </button>
                  <button
                    type="button"
                    onClick={() => addBadge("normal", "bottom-left")}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10px] font-bold rounded-lg border border-blue-200 transition cursor-pointer"
                  >
                    + Bottom-Left
                  </button>
                  <button
                    type="button"
                    onClick={() => addBadge("normal", "bottom-right")}
                    className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 text-[10px] font-bold rounded-lg border border-purple-200 transition cursor-pointer"
                  >
                    + Bottom-Right
                  </button>
                  <button
                    type="button"
                    onClick={() => addBadge("discount", "top-left")}
                    className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold rounded-lg border border-red-200 transition cursor-pointer"
                  >
                    + Discount Tag
                  </button>
                </div>
              </div>

              {/* Badges List & Config with Mouse Slider */}
              <div className="space-y-2 max-h-56 overflow-y-auto pt-1">
                {imageBadges.map((b) => {
                  const currentPos =
                    b.position || (b.side === "right" ? "top-right" : "top-left");

                  return (
                    <div
                      key={b.id}
                      className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-2"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Type */}
                        <select
                          value={b.type}
                          onChange={(e) => {
                            const newType = e.target.value;
                            updateBadge(b.id, "type", newType);
                            if (newType === "discount") {
                              updateBadge(b.id, "text", `${discountPercent}% ছাড়`);
                              updateBadge(b.id, "color", "red");
                            }
                          }}
                          className="px-2 py-1 bg-white border border-gray-200 rounded-lg font-bold text-gray-700 text-[11px]"
                        >
                          <option value="normal">Normal Tag</option>
                          <option value="discount">Discount Tag</option>
                        </select>

                        {/* 4-Corner Position */}
                        <select
                          value={currentPos}
                          onChange={(e) => {
                            const newPos = e.target.value;
                            updateBadge(b.id, "position", newPos);
                            updateBadge(
                              b.id,
                              "side",
                              newPos.includes("right") ? "right" : "left"
                            );
                          }}
                          className="px-2 py-1 bg-white border border-gray-200 rounded-lg font-bold text-gray-700 text-[11px]"
                        >
                          <option value="top-left">Top-Left (উপরের বামে)</option>
                          <option value="top-right">Top-Right (উপরের ডানে)</option>
                          <option value="bottom-left">Bottom-Left (নিচের বামে)</option>
                          <option value="bottom-right">Bottom-Right (নিচের ডানে)</option>
                        </select>

                        {/* Text */}
                        <input
                          type="text"
                          value={b.text}
                          onChange={(e) => updateBadge(b.id, "text", e.target.value)}
                          className="flex-1 min-w-[120px] px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none"
                        />

                        {/* Color */}
                        <select
                          value={b.color || "green"}
                          onChange={(e) => updateBadge(b.id, "color", e.target.value)}
                          className="px-1.5 py-1 bg-white border border-gray-200 rounded-lg text-[11px] font-bold"
                        >
                          <option value="green">Green</option>
                          <option value="amber">Amber</option>
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="purple">Purple</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => removeBadge(b.id)}
                          className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Delete Badge"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>

                      {/* Mouse Drag / Range Slider for Sizing */}
                      <div className="flex items-center gap-3 pt-1 border-t border-gray-200/60 text-[11px]">
                        <span className="text-gray-500 font-semibold flex items-center gap-1">
                          <span>Size:</span>
                          <span className="font-mono font-bold text-green-800">
                            {b.fontSize || 12}px
                          </span>
                        </span>
                        <input
                          type="range"
                          min="9"
                          max="30"
                          value={b.fontSize || 12}
                          onChange={(e) =>
                            updateBadge(b.id, "fontSize", Number(e.target.value))
                          }
                          className="flex-1 accent-green-600 cursor-pointer h-1.5"
                        />
                        <div className="flex items-center gap-1">
                          {[
                            { label: "S", sz: 10 },
                            { label: "M", sz: 12 },
                            { label: "L", sz: 16 },
                            { label: "XL", sz: 20 },
                          ].map((p) => (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => updateBadge(b.id, "fontSize", p.sz)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                (b.fontSize || 12) === p.sz
                                  ? "bg-green-600 text-white"
                                  : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Thumbnail Gallery Upload Strip */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-600">
                  Gallery Images ({gallery.length})
                </span>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1 cursor-pointer"
                >
                  <FaPlus className="text-[10px]" /> Add Thumbnail
                </button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleGalleryAdd(e.target.files[0]);
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all group ${
                      image === img
                        ? "border-green-600 ring-2 ring-green-300"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      onClick={() => setImage(img)}
                      className="w-full h-full object-cover cursor-pointer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/mangoes/m1.jpg";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-[9px] opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
                      title="Remove image"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 h-20 flex flex-col items-center justify-center text-gray-400 hover:text-green-700 transition cursor-pointer bg-white"
                >
                  <FaPlus className="text-sm mb-1" />
                  <span className="text-[10px] font-bold">Add Image</span>
                </button>
              </div>
            </div>

            {/* 3 Trust Badges (Under Gallery) */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
              <div className="p-2.5 bg-green-50/70 rounded-xl border border-green-100">
                <FaShieldAlt className="text-green-600 text-xl mx-auto mb-1" />
                <p className="text-[11px] font-bold text-green-900">বিষমুক্ত গ্যারান্টি</p>
                <p className="text-[9px] text-gray-500">কার্বাইড বা ফরমালিন নেই</p>
              </div>
              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-100">
                <FaTruck className="text-amber-600 text-xl mx-auto mb-1" />
                <p className="text-[11px] font-bold text-amber-900">দ্রুত ডেলিভারি</p>
                <p className="text-[9px] text-gray-500">বাগান থেকে ২৪-৪৮ ঘণ্টায়</p>
              </div>
              <div className="p-2.5 bg-yellow-50/70 rounded-xl border border-yellow-100">
                <FaBoxOpen className="text-yellow-600 text-xl mx-auto mb-1" />
                <p className="text-[11px] font-bold text-yellow-900">নিরাপদ প্যাকিং</p>
                <p className="text-[9px] text-gray-500">ড্যামেজ রিপ্লেসমেন্ট</p>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Real Single Page Info & Editable In-Place   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-5">
            {/* Origin, Stock Status & Schedule Chips */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Origin Tag */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-900 rounded-full text-xs font-bold border border-green-200">
                <FaMapMarkerAlt className="text-red-500" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="বাগান / অঞ্চল..."
                  className="bg-transparent border-b border-green-300 focus:outline-none text-xs font-bold w-36"
                />
              </div>

              {/* Stock Status Selector */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-200">
                <FaCheckCircle className="text-amber-600" />
                <select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                  className="bg-transparent font-bold text-xs focus:outline-none cursor-pointer"
                >
                  <option value="ইন স্টক">ইন স্টক (In Stock)</option>
                  <option value="প্রি-অর্ডার চলছে">প্রি-অর্ডার চলছে (Pre-Order)</option>
                  <option value="সীমিত স্টক">সীমিত স্টক (Limited)</option>
                  <option value="স্টক শেষ">স্টক শেষ (Out of Stock)</option>
                </select>
              </div>

              {/* Conditional Field: When Limited Stock -> Show Remaining Quantity Input */}
              {stockStatus === "সীমিত স্টক" && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-bold border border-amber-300 animate-fadeIn">
                  <span>স্টক বাকি:</span>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="১৫"
                    className="w-14 bg-white border border-amber-300 rounded px-1.5 py-0.5 text-center font-bold text-amber-950 focus:outline-none"
                  />
                  <span>{unit}</span>
                </div>
              )}

              {/* Conditional Field: When Pre-Order -> Show Delivery Schedule + In-Place Calendar Popover */}
              {stockStatus === "প্রি-অর্ডার চলছে" && (
                <div className="relative flex items-center gap-1.5 text-xs text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 ml-auto animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => setShowPreorderCalendar(!showPreorderCalendar)}
                    className="text-blue-700 hover:text-blue-950 cursor-pointer p-0.5"
                    title="ক্যালেন্ডার থেকে তারিখ নির্বাচন করুন"
                  >
                    <FaCalendarAlt />
                  </button>
                  <input
                    type="text"
                    value={harvestSchedule}
                    onChange={(e) => setHarvestSchedule(e.target.value)}
                    placeholder="মে মাসের তৃতীয় সপ্তাহ থেকে"
                    className="bg-transparent border-b border-blue-300 focus:outline-none text-xs w-44 font-medium text-blue-950"
                  />

                  {/* In-Place Popover Calendar (Positioned exactly below as marked) */}
                  {showPreorderCalendar && (
                    <CalendarDropdown
                      value={harvestSchedule}
                      onSelect={(formatted) => {
                        setHarvestSchedule(formatted);
                        setShowPreorderCalendar(false);
                      }}
                      onClose={() => setShowPreorderCalendar(false)}
                    />
                  )}
                </div>
              )}

              {/* If In Stock -> Ready notice */}
              {stockStatus === "ইন স্টক" && (
                <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 font-semibold ml-auto">
                  <FaTruck className="text-green-600 text-xs" />
                  <span>তাত্ক্ষণিক ডেলিভারি প্রস্তুত</span>
                </div>
              )}

              {/* If Out of Stock */}
              {stockStatus === "স্টক শেষ" && (
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 font-semibold ml-auto">
                  <span>বর্তমানে স্টক অমিল</span>
                </div>
              )}
            </div>

            {/* Product Name (Bangla) - Large Typography */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Bengali Product Name (Headline):
              </label>
              <input
                type="text"
                required
                value={nameBn}
                onChange={(e) => handleNameBnChange(e.target.value)}
                placeholder="যেমন: গোপালভোগ"
                className="w-full text-3xl sm:text-4xl font-extrabold text-green-900 bg-white/70 border border-yellow-200 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
            </div>

            {/* English Name & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  English / Roman Name:
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => handleNameEnChange(e.target.value)}
                  placeholder="e.g. Gopalbhog Mango"
                  className="w-full text-sm font-semibold text-amber-800 bg-white/70 border border-yellow-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Subtitle / One-line summary:
                </label>
                <input
                  type="text"
                  value={subtitleBn}
                  onChange={(e) => setSubtitleBn(e.target.value)}
                  placeholder="যেমন: রাজশাহীর রাজকীয় সুবাস ও মোলায়েম মিষ্টির ঐতিহ্য"
                  className="w-full text-sm text-gray-700 bg-white/70 border border-yellow-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                />
              </div>
            </div>

            {/* Custom URL Slug (SEO Permalink) */}
            <div className="bg-white/90 border border-yellow-200 rounded-2xl p-3 sm:p-3.5 space-y-2 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FaLink className="text-green-700" />
                  <span>Custom URL Slug (SEO Permalink):</span>
                </label>
                {cleanSlug && (
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-sm ${
                      isSlugTaken
                        ? "bg-red-50 text-red-700 border-red-300 animate-pulse"
                        : "bg-green-50 text-green-800 border-green-300"
                    }`}
                  >
                    {isSlugTaken ? "⚠️ Slug Already In Use!" : "✓ Unique & Available"}
                  </span>
                )}
              </div>

              <div className="flex items-center flex-wrap sm:flex-nowrap gap-2">
                <div
                  className={`flex items-center w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs font-mono transition shadow-inner ${
                    isSlugTaken
                      ? "border-red-400 ring-2 ring-red-200"
                      : "border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20"
                  }`}
                >
                  <span className="text-gray-400 select-none hidden sm:inline font-semibold">
                    domainname.com/product/
                  </span>
                  <span className="text-gray-400 select-none sm:hidden font-semibold">
                    /product/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="product-er-slug"
                    className="flex-1 bg-transparent font-bold text-green-950 focus:outline-none px-1"
                  />
                </div>

                {isCustomSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomSlug(false);
                      setSlug(slugify(nameEn || nameBn));
                    }}
                    className="px-2.5 py-2 text-[11px] font-bold text-gray-600 hover:text-green-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer whitespace-nowrap"
                    title="Auto-generate from product name"
                  >
                    Auto Reset
                  </button>
                )}
              </div>

              <p className="text-[10px] text-gray-500 flex items-center gap-1.5 flex-wrap">
                <span className="font-medium text-gray-600">🔗 লাইভ ইউআরএল প্রিভিউ:</span>
                <span className="font-mono text-green-800 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200 truncate max-w-full">
                  domainname.com/product/{cleanSlug || "product-er-slug"}
                </span>
                {cleanSlug && !isSlugTaken && (
                  <a
                    href={`/product/${cleanSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:text-green-800 hover:underline font-bold text-[10px] ml-auto flex items-center gap-1"
                  >
                    <FaEye className="text-[9px]" /> Open Preview
                  </a>
                )}
              </p>
            </div>

            {/* Rating & Review Mock */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100 flex-wrap">
              <div className="flex items-center text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-gray-700">Rating:</span>
                <input
                  type="number"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-12 bg-white border border-gray-200 rounded px-1.5 py-0.5 font-bold text-center"
                />
                <span className="text-gray-400">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>(</span>
                <input
                  type="number"
                  value={totalReviews}
                  onChange={(e) => setTotalReviews(e.target.value)}
                  className="w-14 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-center font-bold"
                />
                <span>টি ভেরিফাইড রিভিউ)</span>
              </div>
            </div>

            {/* Price Block with Linked Auto-counted Discount */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl border border-yellow-200 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500 font-bold block mb-1">
                  প্রতি {unit} বিক্রয় ও রেগুলার মূল্য (Discount Auto-counted)
                </span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  {/* Selling Price */}
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black text-green-800">৳</span>
                    <input
                      type="number"
                      required
                      value={pricePerUnit}
                      onChange={(e) => handleSellingPriceChange(e.target.value)}
                      title="বিক্রয় মূল্য"
                      className="w-24 text-3xl font-black text-green-800 bg-white border border-green-300 rounded-xl px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Regular / Strike Price */}
                  <div className="flex items-center gap-1 text-gray-400 line-through">
                    <span className="text-base font-bold">৳</span>
                    <input
                      type="number"
                      value={regularPricePerUnit}
                      onChange={(e) => handleRegularPriceChange(e.target.value)}
                      placeholder="রেগুলার দাম"
                      title="রেগুলার মূল্য"
                      className="w-20 text-base text-gray-400 line-through bg-white border border-gray-300 rounded-xl px-2 py-0.5 focus:outline-none"
                    />
                  </div>

                  {/* Discount Percentage Input (Linked) */}
                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full text-xs font-bold text-red-700">
                    <input
                      type="number"
                      value={discountPercent}
                      onChange={(e) => handleDiscountPercentChange(e.target.value)}
                      className="w-10 bg-transparent text-center font-black focus:outline-none text-red-700"
                    />
                    <span>% ছাড়</span>
                  </div>

                  {regularPricePerUnit > pricePerUnit && (
                    <span className="text-xs text-green-700 font-bold bg-green-100 px-2.5 py-1 rounded-full">
                      ৳{regularPricePerUnit - pricePerUnit} সাশ্রয়
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 font-bold block mb-1">
                  সর্বনিম্ন অর্ডার
                </span>
                <input
                  type="text"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  placeholder="5 কেজি বক্স"
                  className="w-32 bg-white border border-yellow-300 rounded-xl px-3 py-1 font-bold text-amber-900 text-sm text-right focus:outline-none"
                />
              </div>
            </div>

            {/* Regional Ripening Schedule Banner (Optional & Configurable) */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                showRegionSchedule
                  ? "bg-green-50/90 border-green-300 shadow-sm"
                  : "bg-gray-50/80 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showRegionSchedule}
                    onChange={(e) => setShowRegionSchedule(e.target.checked)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-green-700 text-xs" />
                    <span>আঞ্চলিক পাকা ও ডেলিভারি শিডিউল যুক্ত করুন (ঐচ্ছিক)</span>
                  </span>
                </label>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    showRegionSchedule
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-gray-200 text-gray-600 border-gray-300"
                  }`}
                >
                  {showRegionSchedule ? "সক্রিয় / Visible" : "লুকানো / Hidden"}
                </span>
              </div>

              {showRegionSchedule && (
                <div className="space-y-2 mt-2.5 pt-2.5 border-t border-green-200/60 animate-fadeIn">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      শিরোনাম / হেডিং (Editable Heading):
                    </label>
                    <input
                      type="text"
                      value={regionScheduleTitle}
                      onChange={(e) => setRegionScheduleTitle(e.target.value)}
                      placeholder="আঞ্চলিক পাকা ও ডেলিভারি শিডিউল:"
                      className="w-full bg-white border border-green-300 rounded-lg px-2.5 py-1 text-xs font-bold text-green-950 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      তারিখ ও অঞ্চলের তালিকা:
                    </label>
                    <input
                      type="text"
                      value={regionDates}
                      onChange={(e) => setRegionDates(e.target.value)}
                      placeholder="চুয়াডাঙ্গা: ১৩ মে, নওগাঁ: ৩০ মে, রাজশাহী: ২২ মে"
                      className="w-full bg-white border border-green-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Package Size Selection Cards */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <FaBoxOpen className="text-amber-600" /> প্যাকেজের সাইজ ও মূল্য নির্ধারণ:
                </label>
                <button
                  type="button"
                  onClick={addPackage}
                  className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1 cursor-pointer bg-green-50 px-2.5 py-1 rounded-lg border border-green-200"
                >
                  <FaPlus className="text-[10px]" /> Add Package
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border-2 border-green-500 bg-green-50/40 relative shadow-sm space-y-2"
                  >
                    <button
                      type="button"
                      onClick={() => removePackage(idx)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xs p-1 cursor-pointer"
                      title="Remove Package"
                    >
                      <FaTrash />
                    </button>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pkg.badge || ""}
                        onChange={(e) => handlePackageChange(idx, "badge", e.target.value)}
                        placeholder="Badge (যেমন: জনপ্রিয়)"
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-600 text-white w-24 text-center focus:outline-none"
                      />
                    </div>

                    <input
                      type="text"
                      value={pkg.label}
                      onChange={(e) => handlePackageChange(idx, "label", e.target.value)}
                      placeholder="প্যাকেজের নাম (যেমন: ৫ কেজি প্রিমিয়াম বক্স)"
                      className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-900 focus:outline-none"
                    />

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-green-800">৳</span>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) => handlePackageChange(idx, "price", Number(e.target.value))}
                          placeholder="মূল্য"
                          className="w-20 bg-white border border-green-300 rounded-lg px-2 py-0.5 text-sm font-black text-green-800 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 line-through">
                        <span className="text-xs">৳</span>
                        <input
                          type="number"
                          value={pkg.originalPrice || ""}
                          onChange={(e) => handlePackageChange(idx, "originalPrice", Number(e.target.value))}
                          placeholder="রেগুলার"
                          className="w-16 bg-white border border-gray-200 rounded-lg px-1.5 py-0.5 text-xs text-gray-400 line-through focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM SECTION: 3 Dynamic Tabs with TinyMCE & Separate Icon Option        */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-8 border-t border-yellow-200">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-lg font-black text-green-950 flex items-center gap-2">
                <FaEdit className="text-green-700" /> Dynamic Product Details & Specs Tabs
              </h3>
              <p className="text-xs text-gray-500">
                Configure tab icons, titles, and section contents. Icons are completely optional.
              </p>
            </div>
          </div>

          {/* Interactive Tab Switcher (Supports Emojis and Uploaded Custom Icons) */}
          <div className="flex border-b border-gray-200 overflow-x-auto gap-2 pb-2">
            {[
              { id: "tab1", icon: tab1Icon, title: tab1Title || "বৈশিষ্ট্য ও স্বাদ" },
              { id: "tab2", icon: tab2Icon, title: tab2Title || "প্যাকেজিং ও ডেলিভারি" },
              { id: "tab3", icon: tab3Icon, title: tab3Title || "পাকা ও সংরক্ষণ নিয়ম" },
            ].map((tb) => {
              const isImg =
                tb.icon &&
                (tb.icon.startsWith("data:") ||
                  tb.icon.startsWith("/") ||
                  tb.icon.startsWith("http"));

              return (
                <button
                  key={tb.id}
                  type="button"
                  onClick={() => setActiveTab(tb.id)}
                  className={`py-3 px-4 font-extrabold text-sm border-b-4 transition-all rounded-t-xl cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tb.id
                      ? "border-green-600 text-green-900 bg-white shadow-sm"
                      : "border-transparent text-gray-500 hover:text-green-800 bg-gray-50/50"
                  }`}
                >
                  {tb.icon &&
                    (isImg ? (
                      <img
                        src={tb.icon}
                        alt=""
                        className="w-4 h-4 object-contain inline-block rounded"
                      />
                    ) : (
                      <span>{tb.icon}</span>
                    ))}
                  <span>{tb.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1 Content Editor (With TinyMCE and Selective Centered Specs Grid) */}
          {activeTab === "tab1" && (
            <div className="bg-white p-6 sm:p-8 rounded-b-3xl shadow-sm border border-gray-200 border-t-0 space-y-6">
              {/* Tab Icon and Title Configuration (Separate Fields with Selective IconPicker) */}
              <div className="bg-green-50/60 p-4 rounded-2xl border border-green-200 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-bold text-green-900 shrink-0">
                  ১ম সেকশন / ট্যাবের কনফিগারেশন:
                </span>
                <div className="flex items-center gap-3 flex-1 flex-wrap">
                  {/* Selective Icon Picker */}
                  <IconPicker
                    value={tab1Icon}
                    onChange={setTab1Icon}
                    label="আইকন"
                    colorScheme="green"
                  />

                  {/* Title Input */}
                  <div className="flex-1 min-w-[200px] flex items-center gap-1 bg-white border border-green-300 rounded-xl px-3 py-1.5 shadow-sm">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">নাম:</span>
                    <input
                      type="text"
                      value={tab1Title}
                      onChange={(e) => setTab1Title(e.target.value)}
                      placeholder="ট্যাব নাম (যেমন: বৈশিষ্ট্য ও স্বাদ)"
                      className="w-full text-sm font-bold text-green-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Description Heading & Self-Hosted TinyMCE Rich Text Editor */}
              <div className="space-y-3">
                <div className="p-3.5 bg-green-50/50 rounded-2xl border border-green-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-green-950 flex items-center gap-1.5 mb-1">
                      <FaEdit className="text-green-700 text-xs" />
                      <span>বিবরণ সেকশন শিরোনাম (Description Heading on Live Page):</span>
                    </label>
                    <input
                      type="text"
                      value={descriptionTitle}
                      onChange={(e) => setDescriptionTitle(e.target.value)}
                      placeholder={`যেমন: ${nameBn || "পণ্য"} সম্পর্কে বিস্তারিত`}
                      className="w-full bg-white border border-green-300 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    />
                  </div>
                  <div className="text-[11px] text-gray-500 sm:max-w-[220px]">
                    লাইভ পেজে বিবরণীর ওপরে এই শিরোনামটি প্রদর্শিত হবে। ফাঁকা রাখলে স্বয়ংক্রিয়ভাবে "{nameBn || "পণ্য"} সম্পর্কে বিস্তারিত" দেখাবে।
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-2">
                    <span>পণ্যের বিস্তারিত বিবরণ (Self-hosted TinyMCE Rich Editor):</span>
                  </label>
                  <span className="text-[10px] font-normal text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    Formatting, Lists, Bold, Colors Available
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-white">
                  <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    value={description}
                    onEditorChange={(newContent) => setDescription(newContent)}
                    init={{
                      license_key: "gpl",
                      height: 280,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "charmap",
                        "preview",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | bold italic underline backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                      content_style:
                        "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; }",
                      branding: false,
                      promotion: false,
                    }}
                  />
                </div>
              </div>

              {/* 4. Selective Specs Grid (Add / Remove any cards, centered alignment) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block">
                      স্বাদ ও কোয়ালিটি প্যারামিটার (Specs Grid):
                    </label>
                    <p className="text-[11px] text-gray-400">
                      Add as many parameter cards as you wish. 5th and 6th cards will automatically align in the middle of the next row.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 text-xs font-bold rounded-xl border border-yellow-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Parameter Card
                  </button>
                </div>

                {/* Flexible & Centered Specs Grid Container */}
                <div className="flex flex-wrap justify-center gap-4">
                  {tasteSpecs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex-1 min-w-[200px] max-w-[260px] p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-yellow-200 relative group/spec shadow-sm space-y-2 text-center"
                    >
                      <button
                        type="button"
                        onClick={() => removeSpec(idx)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xs p-1 opacity-0 group-hover/spec:opacity-100 transition cursor-pointer"
                        title="Remove Card"
                      >
                        <FaTrash />
                      </button>
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(idx, "label", e.target.value)}
                        placeholder="প্যারামিটার নাম"
                        className="w-full bg-white/80 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-600 focus:outline-none text-center"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        placeholder="মান"
                        className="w-full bg-white border border-yellow-300 rounded-lg px-2 py-1 text-sm font-extrabold text-green-900 focus:outline-none text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights ("কেন এই আমটি সেরা?") */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700">
                    কেন এই পণ্যটি সেরা? (Highlights / Key Points):
                  </label>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1 cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" /> Add Point
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <FaCheckCircle className="text-green-600 shrink-0" />
                      <input
                        type="text"
                        value={h}
                        onChange={(e) => handleHighlightChange(idx, e.target.value)}
                        className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(idx)}
                        className="text-gray-400 hover:text-red-500 text-xs p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Content Editor (Packaging & Shipping with Selective IconPicker) */}
          {activeTab === "tab2" && (
            <div className="bg-white p-6 sm:p-8 rounded-b-3xl shadow-sm border border-gray-200 border-t-0 space-y-6">
              {/* Tab Icon and Title Configuration (Separate Fields) */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-bold text-amber-900 shrink-0">
                  ২য় সেকশন / ট্যাবের কনফিগারেশন:
                </span>
                <div className="flex items-center gap-3 flex-1 flex-wrap">
                  {/* Selective Icon Picker */}
                  <IconPicker
                    value={tab2Icon}
                    onChange={setTab2Icon}
                    label="আইকন"
                    colorScheme="amber"
                  />

                  {/* Title Input */}
                  <div className="flex-1 min-w-[200px] flex items-center gap-1 bg-white border border-amber-300 rounded-xl px-3 py-1.5 shadow-sm">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">নাম:</span>
                    <input
                      type="text"
                      value={tab2Title}
                      onChange={(e) => setTab2Title(e.target.value)}
                      placeholder="ট্যাব নাম (যেমন: প্যাকেজিং ও ডেলিভারি)"
                      className="w-full text-sm font-bold text-amber-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">
                  প্যাকেজিং ভূমিকা ও বিবরণ (Introductory Paragraph):
                </label>
                <textarea
                  rows="3"
                  value={packagingDescription}
                  onChange={(e) => setPackagingDescription(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Packaging Step Cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-gray-700">
                    প্যাকেজিং প্রক্রিয়া কার্ডসমূহ (Packaging Steps):
                  </label>
                  <button
                    type="button"
                    onClick={addPackagingStep}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>নতুন স্টেপ যোগ করুন</span>
                  </button>
                </div>

                {packagingSteps.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/50">
                    <p className="text-xs text-amber-800 font-semibold mb-2">
                      কোনো প্যাকেজিং স্টেপ কার্ড নেই
                    </p>
                    <button
                      type="button"
                      onClick={addPackagingStep}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      + প্রথম প্যাকেজিং স্টেপ যোগ করুন
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packagingSteps.map((st, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border space-y-3 relative group/card shadow-sm ${
                          idx === 0
                            ? "bg-amber-50 border-amber-200"
                            : idx === 1
                            ? "bg-green-50 border-green-200"
                            : "bg-yellow-50 border-yellow-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={st.step}
                            onChange={(e) => handlePackagingStepChange(idx, "step", e.target.value)}
                            className="w-14 text-2xl font-black text-amber-700 bg-transparent border-b border-amber-300 focus:outline-none"
                            placeholder="০১"
                            title="স্টেপ নম্বর"
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-400">Step {idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => removePackagingStep(idx)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition cursor-pointer"
                              title="স্টেপ মুছুন"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={st.title}
                          onChange={(e) => handlePackagingStepChange(idx, "title", e.target.value)}
                          placeholder="স্টেপ শিরোনাম (যেমন: বাগান থেকে গ্রেডিং)"
                          className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                        <textarea
                          rows="3"
                          value={st.description}
                          onChange={(e) => handlePackagingStepChange(idx, "description", e.target.value)}
                          placeholder="স্টেপ বিবরণ লিখুন..."
                          className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3 Content Editor (Storage Tips with Selective IconPicker) */}
          {activeTab === "tab3" && (
            <div className="bg-white p-6 sm:p-8 rounded-b-3xl shadow-sm border border-gray-200 border-t-0 space-y-6">
              {/* Tab Icon and Title Configuration (Separate Fields) */}
              <div className="bg-yellow-50/60 p-4 rounded-2xl border border-yellow-200 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-bold text-yellow-900 shrink-0">
                  ৩য় সেকশন / ট্যাবের কনফিগারেশন:
                </span>
                <div className="flex items-center gap-3 flex-1 flex-wrap">
                  {/* Selective Icon Picker */}
                  <IconPicker
                    value={tab3Icon}
                    onChange={setTab3Icon}
                    label="আইকন"
                    colorScheme="yellow"
                  />

                  {/* Title Input */}
                  <div className="flex-1 min-w-[200px] flex items-center gap-1 bg-white border border-yellow-300 rounded-xl px-3 py-1.5 shadow-sm">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">নাম:</span>
                    <input
                      type="text"
                      value={tab3Title}
                      onChange={(e) => setTab3Title(e.target.value)}
                      placeholder="ট্যাব নাম (যেমন: পাকা ও সংরক্ষণ নিয়ম)"
                      className="w-full text-sm font-bold text-yellow-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Storage Step Cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-gray-700">
                    সংরক্ষণ ও ব্যবহার নির্দেশিকা (Storage Tip Cards):
                  </label>
                  <button
                    type="button"
                    onClick={addStorageStep}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>নতুন টিপস যোগ করুন</span>
                  </button>
                </div>

                {storageSteps.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-yellow-300 rounded-2xl bg-yellow-50/50">
                    <p className="text-xs text-yellow-800 font-semibold mb-2">
                      কোনো সংরক্ষণ নির্দেশিকা কার্ড নেই
                    </p>
                    <button
                      type="button"
                      onClick={addStorageStep}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      + প্রথম নির্দেশিকা কার্ড যোগ করুন
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {storageSteps.map((st, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border-l-4 space-y-2 relative group/card shadow-sm ${
                          idx % 3 === 0
                            ? "bg-yellow-50 border-yellow-500 border border-yellow-200"
                            : idx % 3 === 1
                            ? "bg-green-50 border-green-500 border border-green-200"
                            : "bg-amber-50 border-amber-500 border border-amber-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={st.step !== undefined ? st.step : `${idx + 1}`}
                            onChange={(e) => handleStorageStepChange(idx, "step", e.target.value)}
                            placeholder="ট্যাগ"
                            className="w-14 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-black text-center text-amber-800 focus:outline-none"
                            title="স্টেপ নম্বর / ট্যাগ (যেমন: ১, ২, ৩)"
                          />
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => handleStorageStepChange(idx, "title", e.target.value)}
                            placeholder="যেমন: ১. বক্স খোলার নিয়ম:"
                            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                          />
                          <button
                            type="button"
                            onClick={() => removeStorageStep(idx)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="এই কার্ডটি মুছুন"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                        <textarea
                          rows="2"
                          value={st.description}
                          onChange={(e) => handleStorageStepChange(idx, "description", e.target.value)}
                          placeholder="বিস্তারিত পরামর্শ বা নিয়মাবলী লিখুন..."
                          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Engine Optimization (SEO) & Meta Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
              <span className="text-lg">🔍</span>
              <span>Search Engine Optimization (SEO & Meta Details)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              গুগল বা সোশ্যাল মিডিয়ায় আপনার এই পণ্যটির প্রিভিউ ও সার্চ র‍্যাঙ্কিং কেমন দেখাবে তা কাস্টমাইজ করুন।
            </p>
          </div>
          <button
            type="button"
            onClick={handleLivePreview}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <FaEye className="text-xs text-blue-600" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Google Search Result Live Preview Card */}
        <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-1.5 max-w-2xl">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Google Search Snippet Preview:
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-700 truncate">
            <span className="font-semibold text-gray-800">ammwala.com</span>
            <span className="text-gray-400">› product ›</span>
            <span className="text-gray-500 font-mono text-[11px] truncate">
              {cleanSlug || "product-slug"}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-blue-800 hover:underline cursor-pointer truncate">
            {metaTitle || `${nameBn || "Product Name"} | সেরা প্রিমিয়াম আম`}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {metaDescription ||
              subtitleBn ||
              "আমওয়ালা থেকে সরাসরি রাজশাহীর সেরা বাগানের কেমিক্যালমুক্ত মিষ্টি তাজা আম অর্ডার করুন। দ্রুত সারা দেশে হোম ডেলিভারি।"}
          </p>
        </div>

        {/* SEO Meta Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">
                SEO Meta Title (Browser & Search Engine Headline):
              </label>
              <span className={`text-[10px] font-bold ${metaTitle.length > 60 ? "text-amber-600" : "text-gray-400"}`}>
                {metaTitle.length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={`যেমন: ${nameBn || "গোপালভোগ আম"} - সরাসরি রাজশাহীর বিষমুক্ত মিষ্টি আম`}
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">
                SEO Meta Description (Google Search Snippet Description):
              </label>
              <span className={`text-[10px] font-bold ${metaDescription.length > 160 ? "text-amber-600" : "text-gray-400"}`}>
                {metaDescription.length} / 160 chars
              </span>
            </div>
            <textarea
              rows="3"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="গুগল সার্চ ফলাফলে পণ্যের লিঙ্কের নিচে যে বিবরণটি প্রদর্শিত হবে তা এখানে লিখুন..."
              className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              SEO Keywords / Meta Tags (Comma separated):
            </label>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              placeholder="যেমন: গোপালভোগ আম, রাজশাহী আম, কেমিক্যালমুক্ত ফল, gopalbhog mango"
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 z-40 bg-white/95 backdrop-blur-md p-3 sm:px-6 rounded-2xl shadow-2xl border border-yellow-200 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-xs font-bold text-gray-900 truncate max-w-xs">{nameBn || "(Untitled Product)"}</p>
          <p className="text-[10px] text-green-700 font-bold">
            {pricePerUnit ? `৳ ${pricePerUnit} / ${unit}` : "No price set"} • {stockStatus}
            {discountPercent > 0 && ` (${discountPercent}% OFF)`}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <Link
            to="/admin/products"
            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
          >
            Cancel
          </Link>

          {/* Live Preview Button */}
          <button
            type="button"
            onClick={handleLivePreview}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            title="Open Live Preview in a new tab"
          >
            <FaEye className="text-xs text-blue-600" />
            <span>Live Preview</span>
          </button>

          {/* Save as Draft */}
          <button
            type="button"
            onClick={(e) => handleSaveProduct(e, "draft")}
            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Save as Draft"
          >
            <FaFileAlt className="text-gray-500 text-xs" />
            <span>{publicationStatus === "draft" ? "Update Draft" : "Draft"}</span>
            {autoSaveStatus === "saved" && (
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-sm" title="Auto-saved" />
            )}
          </button>

          {/* Schedule Trigger */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowSchedulePopover(true);
            }}
            className={`px-3 py-1.5 font-bold text-xs rounded-xl border transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
              publicationStatus === "scheduled" || scheduledAt
                ? "bg-amber-100 border-amber-400 text-amber-900"
                : "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-800"
            }`}
          >
            <FaClock className="text-amber-600 text-xs" />
            <span>{scheduledAt ? "Scheduled" : "Schedule"}</span>
          </button>

          {/* Compact Publish / Update */}
          <button
            type="button"
            onClick={(e) => handleSaveProduct(e, "published")}
            className="px-4 py-1.5 admin-btn-primary text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <FaCheckCircle className="text-xs" />
            <span>
              {publicationStatus === "draft" ? "Publish Product" : isEdit ? "Update Product" : "Publish Product"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
