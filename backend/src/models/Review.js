import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    productName: {
      type: String,
      trim: true,
      default: "পণ্য",
    },
    customerName: {
      type: String,
      required: [true, "গ্রাহকের নাম আবশ্যক"],
      trim: true,
      maxlength: [100, "নাম ১০০ অক্ষরের বেশি হতে পারবে না"],
    },
    customerLocation: {
      type: String,
      trim: true,
      maxlength: [120, "ঠিকানা ১২০ অক্ষরের বেশি হতে পারবে না"],
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "স্টার রেটিং আবশ্যক"],
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
      required: [true, "মতামত বা রিভিউ বক্তব্য আবশ্যক"],
      trim: true,
      maxlength: [2000, "রিভিউ বক্তব্য ২০০০ অক্ষরের বেশি হতে পারবে না"],
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent NoSQL injection by ensuring strict schema query matching
reviewSchema.set("strict", true);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
