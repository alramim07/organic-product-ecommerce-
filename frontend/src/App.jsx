import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SingleProductPage from "./pages/SingleProductPage";
import NotFound from "./components/NotFound";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductList from "./pages/admin/AdminProductList";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminBookingsList from "./pages/admin/AdminBookingsList";
import AdminReviewsList from "./pages/admin/AdminReviewsList";
import AdminSettings from "./pages/admin/AdminSettings";

import "./App.css";

function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // 1. If navigation arrived with state.scrollTo (from other pages like product page):
    if (state?.scrollTo) {
      const targetId = String(state.scrollTo).replace(/^#/, "");
      const timer = setTimeout(() => {
        if (targetId === "home" || !targetId) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        // Ensure browser URL remains clean without hash
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }, 150);
      return () => clearTimeout(timer);
    }

    // 2. If URL directly has a hash (e.g. from an old link or external bookmark):
    if (hash) {
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Immediately remove hash from address bar so it stays completely clean
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }, 150);
      return () => clearTimeout(timer);
    }

    // 3. Normal navigation scroll to top
    window.scrollTo(0, 0);
  }, [pathname, hash, state]);

  return null;
}

export default function App() {
  const location = useLocation();
  const { settings } = useApp();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/login";

  // Dynamic Favicon Switcher:
  // Admin dashboard uses dashboard favicon; Frontend public website uses website favicon.
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    if (isAdminRoute) {
      link.href = settings?.favicon || "/favicon.svg";
    } else {
      link.href = settings?.websiteFavicon || "/favicon.svg";
    }
  }, [isAdminRoute, settings?.favicon, settings?.websiteFavicon]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans selection:bg-yellow-300 selection:text-green-900 max-w-full overflow-x-hidden">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/product" element={<SingleProductPage />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductList />} />
              <Route path="products/add" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="bookings" element={<AdminBookingsList />} />
              <Route path="reviews" element={<AdminReviewsList />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
