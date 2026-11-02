const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth APIs
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    },
    getMe: async (token) => {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getHeaders(token),
      });
      return await res.json();
    },
    changePassword: async (currentPassword, newPassword, token) => {
      const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      return await res.json();
    },
  },

  // Category APIs
  categories: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/categories`);
      return await res.json();
    },
    create: async (data, token) => {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    update: async (id, data, token) => {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    delete: async (id, token) => {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: "DELETE",
        headers: getHeaders(token),
      });
      return await res.json();
    },
  },

  // Product APIs
  products: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams();
      if (params.category && params.category !== "all") {
        query.append("category", params.category);
      }
      if (params.search) {
        query.append("search", params.search);
      }
      if (params.stock_status) {
        query.append("stock_status", params.stock_status);
      }

      const queryString = query.toString() ? `?${query.toString()}` : "";
      const res = await fetch(`${API_BASE_URL}/products${queryString}`);
      return await res.json();
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      return await res.json();
    },
    create: async (data, token) => {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    update: async (id, data, token) => {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    delete: async (id, token) => {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: getHeaders(token),
      });
      return await res.json();
    },
  },

  // Order / Pre-Booking APIs
  orders: {
    create: async (data) => {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    },
    getAll: async (params = {}, token) => {
      const query = new URLSearchParams();
      if (params.status && params.status !== "all") {
        query.append("status", params.status);
      }
      if (params.search) {
        query.append("search", params.search);
      }
      const queryString = query.toString() ? `?${query.toString()}` : "";

      const res = await fetch(`${API_BASE_URL}/orders${queryString}`, {
        headers: getHeaders(token),
      });
      return await res.json();
    },
    getStats: async (token) => {
      const res = await fetch(`${API_BASE_URL}/orders/stats`, {
        headers: getHeaders(token),
      });
      return await res.json();
    },
    updateStatus: async (id, status, paymentStatus, token) => {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify({ status, paymentStatus }),
      });
      return await res.json();
    },
    delete: async (id, token) => {
      const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: "DELETE",
        headers: getHeaders(token),
      });
      return await res.json();
    },
  },

  // Settings APIs
  settings: {
    get: async () => {
      const res = await fetch(`${API_BASE_URL}/settings`);
      return await res.json();
    },
    update: async (data, token) => {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return await res.json();
    },
  },

  // Visitor Tracking APIs
  visitors: {
    record: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/visitors/record`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        return await res.json();
      } catch (e) {
        return { success: false };
      }
    },
    getStats: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/visitors/stats`);
        return await res.json();
      } catch (e) {
        return { success: false };
      }
    },
  },
};
