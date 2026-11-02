import Order from "../models/Order.js";
import fs from "fs";
import path from "path";

const storageDir = path.resolve("data");
const ordersFile = path.join(storageDir, "orders_storage.json");

const persistOrdersToDisk = async () => {
  try {
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    const all = await Order.find().lean();
    fs.writeFileSync(ordersFile, JSON.stringify(all, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to backup orders to disk:", err.message);
  }
};

// @desc    Create new order / pre-booking
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerAddress,
    deliveryArea,
    deliveryCharge,
    items,
    mangoId,
    mangoName,
    packageLabel,
    packageKg,
    quantity,
    subtotal,
    totalAmount,
    deliveryDate,
    paymentMethod,
    customerNote,
  } = req.body;

  if (!customerName || !customerPhone || !customerAddress) {
    return res.status(400).json({
      success: false,
      message: "গ্রাহকের নাম, মোবাইল নম্বর এবং পূর্ণ ঠিকানা আবশ্যক।",
    });
  }

  const order = await Order.create({
    customerName,
    customerPhone,
    customerAddress,
    deliveryArea: deliveryArea || "dhaka",
    deliveryCharge: deliveryCharge || 120,
    items: items || [],
    mangoId: mangoId || "",
    mangoName: mangoName || "",
    packageLabel: packageLabel || "",
    packageKg: packageKg || 5,
    quantity: quantity || 1,
    subtotal: subtotal || 0,
    totalAmount: totalAmount || subtotal + (deliveryCharge || 120),
    deliveryDate: deliveryDate || "",
    paymentMethod: paymentMethod || "cod",
    paymentStatus: paymentMethod === "bkash" ? "Paid" : "Unpaid",
    status: "Pending",
    customerNote: customerNote || "",
  });

  persistOrdersToDisk();

  res.status(201).json({
    success: true,
    message: "প্রি-বুকিং সফলভাবে সম্পন্ন হয়েছে!",
    data: order,
  });
};

// @desc    Get all orders with filter & search
// @route   GET /api/orders
// @access  Private (Admin)
export const getOrders = async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { orderId: { $regex: search, $options: "i" } },
      { customerName: { $regex: search, $options: "i" } },
      { customerPhone: { $regex: search, $options: "i" } },
      { mangoName: { $regex: search, $options: "i" } },
    ];
  }

  const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
};

// @desc    Get order dashboard stats
// @route   GET /api/orders/stats
// @access  Private (Admin)
export const getOrderStats = async (req, res) => {
  const allOrders = await Order.find().select("totalAmount status").lean();

  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter((o) => o.status === "Pending").length;
  const confirmedOrders = allOrders.filter((o) => o.status === "Confirmed").length;
  const deliveredOrders = allOrders.filter((o) => o.status === "Delivered").length;
  const totalRevenue = allOrders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  res.json({
    success: true,
    data: {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      totalRevenue,
    },
  });
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private (Admin)
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "অর্ডার পাওয়া যায়নি।",
    });
  }

  res.json({
    success: true,
    data: order,
  });
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
export const updateOrderStatus = async (req, res) => {
  const { status, paymentStatus } = req.body;

  const updateFields = {};
  if (status) updateFields.status = status;
  if (paymentStatus) updateFields.paymentStatus = paymentStatus;

  const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
  });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "অর্ডার পাওয়া যায়নি।",
    });
  }

  persistOrdersToDisk();

  res.json({
    success: true,
    message: "Order status updated successfully!",
    data: order,
  });
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
export const deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  }

  persistOrdersToDisk();

  res.json({
    success: true,
    message: "Order removed successfully!",
  });
};
