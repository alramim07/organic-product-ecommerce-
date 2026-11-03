import Product from "../models/Product.js";

// @desc    Get all products (with category filter & search)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  const { category, search, stock_status, publication_status } = req.query;

  const query = {};

  if (category && category !== "all") {
    query.category = category;
  }

  if (stock_status) {
    query.stock_status = stock_status;
  }

  if (publication_status) {
    query.publication_status = publication_status;
  }

  if (search) {
    query.$or = [
      { name_bn: { $regex: search, $options: "i" } },
      { name_en: { $regex: search, $options: "i" } },
      { origin: { $regex: search, $options: "i" } },
      { category_bn: { $regex: search, $options: "i" } },
    ];
  }

  // Lean query with indexed reads for sub-millisecond latency
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  const { id } = req.params;

  let product;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(id).lean();
  } else {
    product = await Product.findOne({ slug: id }).lean();
  }

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "পণ্যটি খুঁজে পাওয়া যায়নি।",
    });
  }

  res.json({
    success: true,
    data: product,
  });
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res) => {
  if (req.body.slug && req.body.slug.trim()) {
    const slugClean = req.body.slug.trim().toLowerCase();
    const existing = await Product.findOne({ slug: slugClean });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "এই URL Slug টি ইতিমধ্যে অন্য পণ্যে ব্যবহৃত হচ্ছে! একটি ভিন্ন ইউনিক স্লাগ ব্যবহার করুন।",
      });
    }
    req.body.slug = slugClean;
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "নতুন পণ্য সফলভাবে তৈরি হয়েছে!",
    data: product,
  });
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res) => {
  if (req.body.slug && req.body.slug.trim()) {
    const slugClean = req.body.slug.trim().toLowerCase();
    const existing = await Product.findOne({
      slug: slugClean,
      _id: { $ne: req.params.id },
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "এই URL Slug টি ইতিমধ্যে অন্য পণ্যে ব্যবহৃত হচ্ছে! একটি ভিন্ন ইউনিক স্লাগ ব্যবহার করুন।",
      });
    }
    req.body.slug = slugClean;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "পণ্যটি খুঁজে পাওয়া যায়নি।",
    });
  }

  res.json({
    success: true,
    message: "পণ্যের তথ্য সফলভাবে আপডেট করা হয়েছে!",
    data: product,
  });
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "পণ্যটি খুঁজে পাওয়া যায়নি।",
    });
  }

  res.json({
    success: true,
    message: "পণ্যটি ক্যাটালগ থেকে মুছে ফেলা হয়েছে!",
  });
};
