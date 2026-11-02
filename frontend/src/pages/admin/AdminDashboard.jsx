import { Link } from "react-router-dom";
import {
  FaBoxes,
  FaClipboardList,
  FaMoneyBillWave,
  FaClock,
  FaPlusCircle,
  FaArrowRight,
  FaCheckCircle,
  FaTruck,
  FaExclamationCircle,
  FaShoppingBag,
  FaChartLine,
  FaUserCheck,
  FaGlobe,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { products, bookings, updateBookingStatus, visitorStats, settings } = useApp();

  // Metrics calculation
  const isToday = (dateVal) => {
    if (!dateVal) return false;
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  // Revenue counted only from orders with payment status "Paid"
  const isPaidOrder = (b) => b.paymentStatus === "Paid";

  const todaysBookings = bookings.filter((b) => isToday(b.createdAt || b.date));
  const todaysBookingsCount = todaysBookings.length;
  const todaysPendingCount = todaysBookings.filter((b) => b.status === "Pending").length;
  const todaysRevenue = todaysBookings
    .filter(isPaidOrder)
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;
  const totalRevenue = bookings
    .filter(isPaidOrder)
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const recentBookings = [...bookings].slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-800 via-green-700 to-amber-700 text-white rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10 flex items-center gap-3">
          <span className="px-4 py-1.5 bg-yellow-400 text-green-950 font-black text-xs sm:text-sm rounded-full uppercase tracking-wider inline-block shadow">
            Welcome, {settings?.ownerName || "Admin"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <Link
            to="/admin/products/add"
            className="px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 text-green-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <FaPlusCircle /> Add New Product
          </Link>
          <Link
            to="/admin/bookings"
            className="px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-sm transition flex items-center gap-1.5"
          >
            <FaClipboardList /> View Orders
          </Link>
        </div>
      </div>

      {/* Row 1: Today's Metrics (4 Cards) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-gray-500">
            Today's Activity
          </h4>
          <span className="text-[11px] text-gray-400 font-medium">
            Live updates & daily stats
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Todays Pre-Bookings */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Todays Pre-Bookings
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaShoppingBag />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {todaysBookingsCount}
            </h3>
            <p className="text-[11px] sm:text-xs text-indigo-600 font-semibold mt-0.5 flex items-center gap-1 truncate">
              <FaClock className="text-[10px]" /> {todaysPendingCount} Pending Today
            </p>
          </div>

          {/* Card 2: Todays Revenue */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Todays Revenue
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaChartLine />
              </div>
            </div>
            <h3 className="text-2xl font-black text-teal-700 mt-1">
              ৳ {todaysRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] sm:text-xs text-teal-600 font-semibold mt-0.5 flex items-center gap-1 truncate">
              <FaCheckCircle className="text-[10px]" /> Paid orders today
            </p>
          </div>

          {/* Card 3: Todays Visitors */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Todays Visitors
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaUserCheck />
              </div>
            </div>
            <h3 className="text-2xl font-black text-rose-700 mt-1">
              {(visitorStats?.todaysVisitors || 1).toLocaleString()}
            </h3>
            <p className="text-[11px] sm:text-xs text-rose-600 font-semibold mt-0.5 flex items-center gap-1 truncate">
              {(visitorStats?.todaysVisitors || 1).toLocaleString()} People Visit The Store
            </p>
          </div>

          {/* Card 4: Total Visitors */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Total Visitors
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaGlobe />
              </div>
            </div>
            <h3 className="text-2xl font-black text-sky-700 mt-1">
              {(visitorStats?.totalVisitors || 1).toLocaleString()}
            </h3>
            <p className="text-[11px] sm:text-xs text-sky-600 font-semibold mt-0.5 flex items-center gap-1 truncate">
              All-time Store visitors
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: All-Time Overview (Existing 4 Cards) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-gray-500">
            Overall Overview
          </h4>
          <span className="text-[11px] text-gray-400 font-medium">
            Cumulative business summary
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 5: Total Bookings */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Total Pre-Bookings
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaClipboardList />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{totalBookings}</h3>
            <p className="text-[11px] sm:text-xs text-blue-600 font-semibold mt-0.5 flex items-center gap-1 truncate">
              <FaCheckCircle className="text-[10px]" /> {confirmedBookings} Confirmed
            </p>
          </div>

          {/* Card 6: Pending Orders */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Pending Orders
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaClock />
              </div>
            </div>
            <h3 className="text-2xl font-black text-amber-700 mt-1">{pendingBookings}</h3>
            <p className="text-[11px] sm:text-xs text-amber-700 font-semibold mt-0.5 flex items-center gap-1 truncate">
              <FaExclamationCircle className="text-[10px]" /> Action Required
            </p>
          </div>

          {/* Card 7: Total Revenue */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Total Revenue
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaMoneyBillWave />
              </div>
            </div>
            <h3 className="text-2xl font-black text-green-800 mt-1">
              ৳ {totalRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-500 font-semibold mt-0.5 truncate">
              Total of all paid orders
            </p>
          </div>

          {/* Card 8: Active Products */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                Active Products
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                <FaBoxes />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{products.length}</h3>
            <p className="text-[11px] sm:text-xs text-purple-600 font-semibold mt-0.5 flex items-center gap-1 truncate">
              <FaTruck className="text-[10px]" /> Live on Catalog
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-black text-gray-900">Recent Orders</h3>
            <p className="text-xs text-gray-500">
              Latest 5 customer orders received
            </p>
          </div>
          <Link
            to="/admin/bookings"
            className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1"
          >
            View All Orders <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer & Phone</th>
                <th className="py-3 px-4">Product & Package</th>
                <th className="py-3 px-4">Total Bill</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id || b._id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-gray-900">
                      {b.id || b.orderId}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-gray-900">{b.customerName}</p>
                      <p className="text-xs text-gray-500 font-mono">{b.customerPhone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-green-900">{b.mangoName}</p>
                      <p className="text-xs text-gray-500">
                        {b.packageLabel} ({b.quantity} qty)
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-black text-green-800">
                      ৳ {b.totalAmount}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-500">
                      {b.deliveryDate || new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id || b._id, e.target.value)}
                        className="text-xs font-bold bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catalog Snapshot */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-black text-gray-900">Products Catalog Snapshot</h3>
            <p className="text-xs text-gray-500">
              Live products displayed on website catalog
            </p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-green-700 hover:text-green-900 flex items-center gap-1"
          >
            Manage Product List <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p) => (
            <div
              key={p.id || p._id}
              className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex items-center gap-3"
            >
              <img
                src={p.image}
                alt={p.name_bn}
                className="w-14 h-14 rounded-xl object-cover border border-yellow-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/mangoes/m1.jpg";
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">{p.name_bn}</h4>
                <p className="text-xs font-black text-green-700">
                  ৳ {p.price_per_unit || p.price_per_kg || p.price} / {p.unit || "কেজি"}
                </p>
                <span className="text-[10px] text-gray-500">{p.stock_status || "In Stock"}</span>
              </div>
              <Link
                to={`/admin/products/edit/${p.id || p._id}`}
                className="p-2 text-gray-400 hover:text-green-800 transition"
                title="Edit Product"
              >
                ✏️
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
