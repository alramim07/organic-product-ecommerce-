import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { seedDatabase } from "./seeders/seed.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// Security & Utility Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      // Support tunnel domains, localhost, and live previews cleanly
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Apply rate limiting to all /api/ routes
app.use("/api", apiLimiter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Ammwala Agro & Organic E-Commerce Platform API",
    version: "1.0.0",
  });
});

// Mount Resource Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/visitors", visitorRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Connect DB, Seed initial data, and Start Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`\n=================================================`);
      console.log(`🚀 Ammwala Backend Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`🌐 Local API Base URL: http://localhost:${PORT}/api`);
      console.log(`🛡️ Admin Credentials:`);
      console.log(`   Email:    ${process.env.ADMIN_EMAIL || "admin@test.com"}`);
      console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Test123@#"}`);
      console.log(`=================================================\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
