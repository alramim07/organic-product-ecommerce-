import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      index: true,
    },
    dateString: {
      type: String, // "YYYY-MM-DD" in local time
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      default: "",
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound unique index: ensures 1 record per IP per calendar day!
visitorSchema.index({ ip: 1, dateString: 1 }, { unique: true });

export default mongoose.model("Visitor", visitorSchema);
