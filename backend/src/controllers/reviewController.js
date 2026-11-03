import Review from "../models/Review.js";

// Helper to sanitize strings and strip HTML/script tags (prevents XSS & injection)
const sanitizeText = (str) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/[\$]/g, "") // Strip mongo operator prefix
    .trim();
};

// @desc    Get approved reviews for a specific product (Public)
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const rawId = req.params.productId;
    if (!rawId || typeof rawId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const safeId = sanitizeText(rawId);

    const reviews = await Review.find({
      productId: safeId,
      status: "approved",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({ success: false, message: "মতামত লোড করতে ব্যর্থ হয়েছে" });
  }
};

// @desc    Get all reviews for Admin (with status filter)
// @route   GET /api/reviews
// @access  Private (Admin)
export const getAllReviews = async (req, res) => {
  try {
    const { status, productId } = req.query;
    const query = {};

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query.status = status;
    }

    if (productId && typeof productId === "string") {
      query.productId = sanitizeText(productId);
    }

    const reviews = await Review.find(query).sort({ createdAt: -1 });

    const stats = {
      total: await Review.countDocuments(),
      pending: await Review.countDocuments({ status: "pending" }),
      approved: await Review.countDocuments({ status: "approved" }),
      rejected: await Review.countDocuments({ status: "rejected" }),
    };

    res.json({
      success: true,
      count: reviews.length,
      stats,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching admin reviews:", error);
    res.status(500).json({ success: false, message: "রিভিউ তালিকা লোড করতে ব্যর্থ হয়েছে" });
  }
};

// @desc    Create new review (Public submission)
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
  try {
    const { productId, productName, customerName, customerLocation, rating, comment, images } = req.body;

    // Strict input validations
    if (!productId || typeof productId !== "string") {
      return res.status(400).json({ success: false, message: "পণ্যের আইডি আবশ্যক" });
    }

    const cleanName = sanitizeText(customerName);
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ success: false, message: "অনুগ্রহ করে আপনার সঠিক নাম লিখুন" });
    }

    const cleanComment = sanitizeText(comment);
    if (!cleanComment || cleanComment.length < 5) {
      return res.status(400).json({ success: false, message: "মতামত বা রিভিউ বক্তব্য ন্যূনতম ৫ অক্ষরের হতে হবে" });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ success: false, message: "স্টার রেটিং ১ থেকে ৫ এর মধ্যে হতে হবে" });
    }

    // Sanitize image array (max 4 images)
    let cleanImages = [];
    if (Array.isArray(images)) {
      cleanImages = images
        .filter((img) => typeof img === "string" && (img.startsWith("data:image/") || img.startsWith("http")))
        .slice(0, 4);
    }

    const reviewStatus =
      req.body.status && ["pending", "approved", "rejected"].includes(req.body.status)
        ? req.body.status
        : "pending";

    const newReview = await Review.create({
      productId: sanitizeText(productId),
      productName: sanitizeText(productName) || "পণ্য",
      customerName: cleanName,
      customerLocation: sanitizeText(customerLocation) || "বাংলাদেশ",
      rating: Math.round(numRating),
      comment: cleanComment,
      images: cleanImages,
      status: reviewStatus,
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: "আপনার মূল্যবান মতামতটি সফলভাবে গৃহীত হয়েছে! অ্যাডমিন পর্যালোচনার পর এটি প্রদর্শিত হবে।",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "মতামত সাবমিট করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।" });
  }
};

// @desc    Update review status (Approve / Reject)
// @route   PUT /api/reviews/:id/status
// @access  Private (Admin)
export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "অবৈধ স্ট্যাটাস" });
    }

    const review = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "রিভিউটি খুঁজে পাওয়া যায়নি" });
    }

    res.json({
      success: true,
      message: status === "approved" ? "রিভিউ সফলভাবে অনুমোদিত হয়েছে!" : status === "rejected" ? "রিভিউ বাতিল করা হয়েছে!" : "রিভিউ পেন্ডিং করা হয়েছে!",
      data: review,
    });
  } catch (error) {
    console.error("Error updating review status:", error);
    res.status(500).json({ success: false, message: "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে" });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ success: false, message: "রিভিউটি খুঁজে পাওয়া যায়নি" });
    }

    res.json({
      success: true,
      message: "রিভিউটি সফলভাবে মুছে ফেলা হয়েছে",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "মুছে ফেলতে ব্যর্থ হয়েছে" });
  }
};
