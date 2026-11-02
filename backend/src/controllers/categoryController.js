import Category from "../models/Category.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ order: 1, createdAt: 1 }).lean();
  res.json({
    success: true,
    count: categories.length,
    data: categories,
  });
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin)
export const createCategory = async (req, res) => {
  const { name_bn, name_en, slug, icon, badge, description, unit, available_units } = req.body;

  const categorySlug =
    slug ||
    name_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const existing = await Category.findOne({ slug: categorySlug });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: "এই স্লাগ দিয়ে ইতিমধ্যে একটি ক্যাটাগরি রয়েছে।",
    });
  }

  const category = await Category.create({
    name_bn,
    name_en,
    slug: categorySlug,
    icon: icon || "📦",
    unit: unit || "কেজি",
    available_units: available_units && available_units.length > 0 ? available_units : [unit || "কেজি"],
    badge: badge || "",
    description: description || "",
  });

  res.status(201).json({
    success: true,
    message: "নতুন ক্যাটাগরি সফলভাবে তৈরি হয়েছে!",
    data: category,
  });
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
export const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "ক্যাটাগরি পাওয়া যায়নি।",
    });
  }

  res.json({
    success: true,
    message: "ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে!",
    data: category,
  });
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "ক্যাটাগরি পাওয়া যায়নি।",
    });
  }

  res.json({
    success: true,
    message: "ক্যাটাগরি মুছে ফেলা হয়েছে!",
  });
};
