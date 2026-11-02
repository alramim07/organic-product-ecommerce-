import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name_bn: {
      type: String,
      required: [true, "Category Bengali name is required"],
      trim: true,
    },
    name_en: {
      type: String,
      required: [true, "Category English name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    icon: {
      type: String,
      default: "📦",
    },
    unit: {
      type: String,
      default: "কেজি",
    },
    available_units: {
      type: [String],
      default: ["কেজি"],
    },
    badge: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, strict: false }
);

export default mongoose.model("Category", categorySchema);
