# Ammwala — Organic Product E-Commerce & Pre-Booking Platform

A modern, full-stack e-commerce and pre-booking platform tailored for premium seasonal fruits (mangoes, lychees) and natural organic products (raw honey, cold-pressed mustard oil, pure ghee).

---

## 🌟 Key Features

### 🛒 Customer-Facing Storefront
- **Dynamic Category Catalog:** Multi-category filtering for mangoes, raw forest honey, Dinajpur lychees, and mustard oil/ghee.
- **Dedicated Product Landing Pages:** High-converting product display with quantity pickers, weight/package selection, customer testimonials, and region-based harvest dates.
- **One-Click Pre-Booking System:** Streamlined pre-booking checkout without complicated registrations.
- **Real-Time Delivery & Bill Calculation:** Automated delivery fee calculation based on delivery area (inside/outside Dhaka).
- **Responsive UI/UX:** Mobile-first design built with TailwindCSS, smooth animations, and optimized media assets.

### 🛡️ Administrative Dashboard (`/admin`)
- **Real-Time Analytics & KPIs:** Live tracking of daily visitors, total store visitors, paid revenue, total revenue, and pending orders.
- **Order Management:** Filter, search, and manage orders with real-time payment status toggle (`Pending` / `Paid`), quick customer dialer, and direct WhatsApp chat integration.
- **Catalog Management:** Create, update, and manage products and categories.
- **Dual-Tab Settings:**
  - **Dashboard Settings:** Custom dashboard favicon upload, dashboard logo upload, admin profile picture upload (with automatic initial letter fallback), business name, owner name, and multi-rule password change modal with strength meter.
  - **Website Settings:** Store branding, announcement banner notices, hotlines, WhatsApp numbers, email, social media links, and delivery charges.
- **Route-Scoped Dynamic Favicon:** Dashboard favicon applies exclusively to `/admin` routes while public storefront retains original mango branding.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, DaisyUI, React Router v7, Lucide Icons & React Icons, SweetAlert2.
- **Backend:** Node.js, Express.js, MongoDB / Mongoose, In-Memory Mongo Fallback engine, JSON Web Tokens (JWT), Bcrypt.
- **Deployment & Tooling:** Vite Client Build, Cross-platform npm scripts.

---

## 🚀 Development Lifecycle & Setup

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **Git**

---

### 2. Installation

Clone the repository and install dependencies for both services:

```bash
# Clone the repository
git clone https://github.com/alramim07/organic-product-ecommerce-.git
cd organic-product-ecommerce-

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

---

### 3. Environment Variables

#### Backend (`backend/.env`)
Copy `.env.example` to `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ammwala_db
JWT_SECRET=ammwala_super_secret_jwt_key_2026_secured
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=Test123@#
FRONTEND_URL=http://localhost:5173
```
*(Note: If local MongoDB is not running, the backend automatically boots an embedded zero-config in-memory database).*

---

### 4. Running the Development Servers

#### Start Backend API Server:
```bash
cd backend
npm start
# Server runs on: http://localhost:5000/api
```

#### Start Frontend Client:
```bash
cd frontend
npm run dev
# Web app runs on: http://localhost:5173
```

---

### 5. Production Build

To test and compile production assets:

```bash
cd frontend
npm run build
```
Compiled static assets will be output to `frontend/dist`.

---

## 🔐 Default Admin Credentials

- **URL:** `http://localhost:5173/admin/login`
- **Email:** `admin@test.com`
- **Password:** `Test123@#`

---

## 📄 License
This project is proprietary and built for Ammwala Agro & Organic Foods.
