import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { productsData as initialProducts } from "../data/products";
import { initialOrders } from "../data/orders";

const AppContext = createContext();

const initialCategories = [
  { _id: "c1", name_bn: "সবগুলো", slug: "all", icon: "✨" },
  { _id: "c2", name_bn: "আম", slug: "mango", icon: "🥭" },
  { _id: "c3", name_bn: "খাঁটি মধু", slug: "honey", icon: "🍯" },
  { _id: "c4", name_bn: "দিনাজপুরের লিচু", slug: "lychee", icon: "🍒" },
  { _id: "c5", name_bn: "সরিষার তেল ও ঘি", slug: "oil-ghee", icon: "🫒" },
];

// Helper to safely write to localStorage without crashing on quota exceeded
const safeSetLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch (err) {
    console.warn(`[Storage] Quota exceeded or storage disabled for ${key}:`, err.message);
  }
};

export function AppProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_categories");
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_bookings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_settings");
      return saved
        ? JSON.parse(saved)
        : {
            favicon: "",
            logo: "",
            profilePic: "",
            businessName: "Ammwala Agro & Organic Food",
            ownerName: "Md. Admin",
            siteName: "আমওয়ালা ভাইয়া",
            tagline: "প্রিমিয়াম মানের দেশি আম ও খাঁটি প্রাকৃতিক খাদ্যপণ্য",
            hotlinePhone: "০১৭৪৯-৭৭৫০৩০",
            rawHotlinePhone: "01749775030",
            whatsappNumber: "8801749775030",
            email: "ammwalaaviya@gmail.com",
            officeAddress: "রাজশাহী, বাংলাদেশ - ৬২০৩",
            deliveryFeeDhaka: 120,
            deliveryFeeOutside: 150,
            noticeText:
              "📢 রাজশাহীর বিখ্যাত হিমসাগর, গোপালভোগ আম এবং সুন্দরবনের খাঁটি মধুর প্রি-অর্ডার শুরু হয়েছে!",
          };
    } catch {
      return {};
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem("ammwala_admin_token") || null;
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_admin_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [visitorStats, setVisitorStats] = useState(() => {
    try {
      const saved = localStorage.getItem("ammwala_visitor_stats");
      return saved ? JSON.parse(saved) : { todaysVisitors: 1, totalVisitors: 1 };
    } catch {
      return { todaysVisitors: 1, totalVisitors: 1 };
    }
  });

  // Sync state to backend API on mount
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Categories
      const catRes = await api.categories.getAll();
      if (catRes.success && catRes.data?.length > 0) {
        setCategories([
          { _id: "all", name_bn: "সবগুলো", slug: "all", icon: "✨" },
          ...catRes.data,
        ]);
        safeSetLocalStorage("ammwala_categories", catRes.data);
      }

      // 2. Fetch Products
      const prodRes = await api.products.getAll();
      if (prodRes.success && prodRes.data?.length > 0) {
        // Map backend product structure to match frontend expectations
        const formatted = prodRes.data.map((p, idx) => ({
          ...p,
          id: p._id || p.id || idx + 1,
          price: p.price_per_unit ? `৳ ${p.price_per_unit}/${p.unit || "কেজি"}` : p.price,
          price_per_kg: p.price_per_unit || p.price_per_kg || 180,
          regular_price_per_kg: p.regular_price_per_unit || p.regular_price_per_kg || 210,
        }));
        setProducts(formatted);
        safeSetLocalStorage("ammwala_products", formatted);
      }

      // 3. Fetch Settings
      const setRes = await api.settings.get();
      if (setRes.success && setRes.data) {
        setSettings(setRes.data);
        safeSetLocalStorage("ammwala_settings", setRes.data);
      }

      // 4. If logged in, fetch orders
      if (adminToken) {
        const orderRes = await api.orders.getAll({}, adminToken);
        if (orderRes.success && orderRes.data) {
          const mappedOrders = orderRes.data.map((o) => ({
            ...o,
            id: o.orderId || o._id,
          }));
          setBookings(mappedOrders);
          safeSetLocalStorage("ammwala_bookings", mappedOrders);
        }
      }

      // 5. Visitor Tracking
      try {
        const visRes = await api.visitors.record();
        if (visRes.success && visRes.data) {
          const stats = {
            todaysVisitors: visRes.data.todaysVisitors || 1,
            totalVisitors: visRes.data.totalVisitors || 1,
          };
          setVisitorStats(stats);
          safeSetLocalStorage("ammwala_visitor_stats", stats);
        }
      } catch (err) {
        // keep existing visitor stats
      }
    } catch (err) {
      console.warn("API offline or loading error, using local state:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [adminToken]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sync to LocalStorage on updates safely
  useEffect(() => {
    safeSetLocalStorage("ammwala_products", products);
  }, [products]);

  useEffect(() => {
    safeSetLocalStorage("ammwala_bookings", bookings);
  }, [bookings]);

  useEffect(() => {
    safeSetLocalStorage("ammwala_settings", settings);
  }, [settings]);

  // Product Operations
  const addProduct = async (newProduct) => {
    try {
      const payload = {
        ...newProduct,
        price_per_unit: Number(newProduct.price_per_kg || newProduct.price_per_unit || 180),
        regular_price_per_unit: Number(newProduct.regular_price_per_kg || 210),
      };
      const res = await api.products.create(payload, adminToken);
      if (res.success && res.data) {
        const created = {
          ...res.data,
          id: res.data._id,
          price: `৳ ${res.data.price_per_unit}/${res.data.unit || "কেজি"}`,
          price_per_kg: res.data.price_per_unit,
        };
        setProducts((prev) => [created, ...prev]);
        return created;
      }
    } catch {
      // Local fallback
    }

    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id || 0)) + 1 : 1;
    const fallbackProduct = { ...newProduct, id: nextId };
    setProducts((prev) => [fallbackProduct, ...prev]);
    return fallbackProduct;
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const mongoId = id.toString().match(/^[0-9a-fA-F]{24}$/)
        ? id
        : products.find((p) => p.id === id)?._id;
      if (mongoId) {
        await api.products.update(mongoId, updatedData, adminToken);
      }
    } catch {
      // Local fallback
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id || p._id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = async (id) => {
    try {
      const mongoId = id.toString().match(/^[0-9a-fA-F]{24}$/)
        ? id
        : products.find((p) => p.id === id)?._id;
      if (mongoId) {
        await api.products.delete(mongoId, adminToken);
      }
    } catch {
      // Local fallback
    }

    setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
  };

  // Booking / Order Operations
  const addBooking = async (bookingData) => {
    try {
      const res = await api.orders.create(bookingData);
      if (res.success && res.data) {
        const order = { ...res.data, id: res.data.orderId || res.data._id };
        setBookings((prev) => [order, ...prev]);
        return order;
      }
    } catch {
      // Local fallback
    }

    const nextId = `BK-${Date.now().toString().slice(-4)}`;
    const newBooking = {
      ...bookingData,
      id: nextId,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = async (id, newStatus, paymentStatus = null) => {
    try {
      const target = bookings.find((b) => b.id === id || b._id === id || b.orderId === id);
      const mongoId = target?._id || (id.toString().match(/^[0-9a-fA-F]{24}$/) ? id : null);
      if (mongoId) {
        await api.orders.updateStatus(mongoId, newStatus, paymentStatus, adminToken);
      }
    } catch {
      // Local fallback
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id || b._id === id || b.orderId === id
          ? { ...b, status: newStatus, ...(paymentStatus ? { paymentStatus } : {}) }
          : b
      )
    );
  };

  const updateBookingPaymentStatus = async (id, paymentStatus) => {
    try {
      const target = bookings.find((b) => b.id === id || b._id === id || b.orderId === id);
      const mongoId = target?._id || (id.toString().match(/^[0-9a-fA-F]{24}$/) ? id : null);
      if (mongoId) {
        await api.orders.updateStatus(mongoId, target?.status || "Pending", paymentStatus, adminToken);
      }
    } catch {
      // Local fallback
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id || b._id === id || b.orderId === id
          ? { ...b, paymentStatus }
          : b
      )
    );
  };

  const deleteBooking = async (id) => {
    try {
      const target = bookings.find((b) => b.id === id);
      const mongoId = target?._id || (id.match(/^[0-9a-fA-F]{24}$/) ? id : null);
      if (mongoId) {
        await api.orders.delete(mongoId, adminToken);
      }
    } catch {
      // Local fallback
    }

    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Category Operations
  const addCategory = async (categoryData) => {
    try {
      const res = await api.categories.create(categoryData, adminToken);
      if (res.success && res.data) {
        setCategories((prev) => [...prev, res.data]);
        return res.data;
      }
    } catch (err) {
      console.warn("Backend category create failed, using local:", err.message);
    }
    const newCat = {
      _id: `cat_${Date.now()}`,
      ...categoryData,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = async (id, categoryData) => {
    try {
      await api.categories.update(id, categoryData, adminToken);
    } catch (err) {
      console.warn("Backend category update failed, using local:", err.message);
    }
    setCategories((prev) =>
      prev.map((c) => (c._id === id || c.slug === id ? { ...c, ...categoryData } : c))
    );
  };

  const deleteCategory = async (id) => {
    try {
      await api.categories.delete(id, adminToken);
    } catch (err) {
      console.warn("Backend category delete failed, using local:", err.message);
    }
    setCategories((prev) => prev.filter((c) => c._id !== id && c.slug !== id));
  };

  // Settings Operation
  const updateSettings = async (newSettings) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem("ammwala_settings", JSON.stringify(merged));
      } catch (err) {
        console.warn("Storage quota warning:", err);
      }
      return merged;
    });

    try {
      await api.settings.update(newSettings, adminToken);
    } catch (e) {
      console.warn("Backend settings update error:", e);
    }
  };

  // Auth Operations
  const loginAdmin = async (email, password) => {
    try {
      const res = await api.auth.login(email, password);
      if (res.success && res.token) {
        setAdminToken(res.token);
        setAdminUser(res.user);
        localStorage.setItem("ammwala_admin_token", res.token);
        localStorage.setItem("ammwala_admin_session", JSON.stringify(res.user));
        refreshData();
        return { success: true };
      }
      return {
        success: false,
        message: res.message || "Invalid email or password! Please check your credentials.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Unable to connect to authentication server. Please check your connection.",
      };
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem("ammwala_admin_token");
    localStorage.removeItem("ammwala_admin_session");
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        selectedCategory,
        setSelectedCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        bookings,
        addBooking,
        updateBookingStatus,
        updateBookingPaymentStatus,
        deleteBooking,
        settings,
        updateSettings,
        adminUser,
        adminToken,
        loginAdmin,
        logoutAdmin,
        isAuthenticated: !!adminUser,
        visitorStats,
        isLoading,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
