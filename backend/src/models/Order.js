import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: { type: String, required: true },
  category: { type: String, default: "" },
  packageLabel: { type: String, default: "" },
  unit: { type: String, default: "কেজি" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone number is required"],
      trim: true,
    },
    customerAddress: {
      type: String,
      required: [true, "Delivery address is required"],
      trim: true,
    },
    deliveryArea: {
      type: String,
      enum: ["dhaka", "outside"],
      default: "dhaka",
    },
    deliveryCharge: {
      type: Number,
      default: 120,
    },
    items: [orderItemSchema],
    // Legacy single item fields for backward compatibility
    mangoId: { type: String, default: "" },
    mangoName: { type: String, default: "" },
    packageLabel: { type: String, default: "" },
    packageKg: { type: Number, default: 5 },
    quantity: { type: Number, default: 1 },
    subtotal: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "bkash", "nagad"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Unpaid"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      index: true,
    },
    customerNote: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Auto-assign human-readable orderId
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = `BK-${Date.now().toString().slice(-5)}`;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
