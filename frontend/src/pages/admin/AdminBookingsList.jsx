import { useState } from "react";
import {
  FaClipboardList,
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaTrashAlt,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";

export default function AdminBookingsList() {
  const {
    bookings,
    updateBookingStatus,
    updateBookingPaymentStatus,
    deleteBooking,
  } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeModalBooking, setActiveModalBooking] = useState(null);

  const handleDelete = (id, customerName) => {
    Swal.fire({
      title: "Delete Order?",
      text: `Are you sure you want to delete the order (${id}) for "${customerName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteBooking(id);
        Swal.fire({
          icon: "success",
          title: "Order Deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `Status updated to "${newStatus}"`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handlePaymentStatusChange = (id, newPaymentStatus) => {
    if (updateBookingPaymentStatus) {
      updateBookingPaymentStatus(id, newPaymentStatus);
    } else {
      const target = bookings.find((b) => b.id === id || b._id === id || b.orderId === id);
      updateBookingStatus(id, target?.status || "Pending", newPaymentStatus);
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `Payment marked as "${newPaymentStatus}"`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const filteredBookings = bookings.filter((b) => {
    const bookingId = b.id || b.orderId || b._id || "";
    const matchesSearch =
      (b.customerName && b.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.customerPhone && b.customerPhone.includes(searchTerm)) ||
      (bookingId && bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.mangoName && b.mangoName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <FaClipboardList className="text-green-700" /> Orders
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time customer pre-orders received from website and product landing pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-gray-400 block font-semibold">Total Orders</span>
            <span className="text-xl font-black text-green-800">{bookings.length} Orders</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto gap-2 pb-2 text-xs font-bold">
          {[
            { id: "all", label: `All (${bookings.length})` },
            { id: "Pending", label: `Pending (${bookings.filter((b) => b.status === "Pending").length})` },
            { id: "Confirmed", label: `Confirmed (${bookings.filter((b) => b.status === "Confirmed").length})` },
            { id: "Shipped", label: `Shipped (${bookings.filter((b) => b.status === "Shipped").length})` },
            { id: "Delivered", label: `Delivered (${bookings.filter((b) => b.status === "Delivered").length})` },
            { id: "Cancelled", label: `Cancelled (${bookings.filter((b) => b.status === "Cancelled").length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? "bg-green-700 text-white shadow font-black"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer name, phone, order ID..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">Order ID & Date</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Customer Details</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Item & Package</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Payment Status</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Bill</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const bookingId = b.id || b.orderId || b._id;
                  return (
                    <tr key={bookingId} className="hover:bg-gray-50/70 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-xs text-gray-900 block">
                          {bookingId}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "—"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-extrabold text-gray-900">{b.customerName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`tel:${b.customerPhone}`}
                            className="text-xs text-green-700 hover:underline flex items-center gap-1 font-mono font-semibold"
                          >
                            <FaPhoneAlt className="text-[10px]" /> {b.customerPhone}
                          </a>
                          <a
                            href={`https://wa.me/88${String(b.customerPhone).replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 text-sm"
                            title="Chat on WhatsApp"
                          >
                            <FaWhatsapp />
                          </a>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-green-900">{b.mangoName}</p>
                        <p className="text-xs text-gray-500">
                          {b.packageLabel} ({b.quantity} qty)
                        </p>
                        {b.deliveryDate && (
                          <p className="text-[11px] text-amber-700 flex items-center gap-1 mt-0.5">
                            <FaCalendarAlt className="text-[9px]" /> Date: {b.deliveryDate}
                          </p>
                        )}
                      </td>
                      {/* Payment Status Dropdown (Pending / Paid) */}
                      <td className="py-3.5 px-4">
                        <select
                          value={b.paymentStatus === "Paid" ? "Paid" : "Pending"}
                          onChange={(e) => handlePaymentStatusChange(bookingId, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none transition ${
                            b.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </td>

                      {/* Bill Amount Only */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-black text-green-800 text-base">
                          ৳ {b.totalAmount}
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(bookingId, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${getStatusBadge(
                            b.status
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveModalBooking(b)}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition text-xs cursor-pointer"
                            title="View Invoice Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(bookingId, b.customerName)}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition text-xs cursor-pointer"
                            title="Delete Order"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {activeModalBooking && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModalBooking(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="border-b border-gray-100 pb-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                Order Invoice
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-2">
                Order ID: {activeModalBooking.id || activeModalBooking.orderId}
              </h3>
              <p className="text-xs text-gray-400">
                Created At: {new Date(activeModalBooking.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              {/* Customer Box */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Customer Details:</h4>
                <p className="font-bold text-gray-900 text-base">
                  {activeModalBooking.customerName}
                </p>
                <p className="text-xs text-gray-600 font-mono mt-0.5">
                  Phone: {activeModalBooking.customerPhone}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Address: {activeModalBooking.customerAddress}
                </p>
              </div>

              {/* Product Box */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-yellow-200">
                <h4 className="font-bold text-xs text-gray-500 uppercase mb-2">Order Items:</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-green-900">{activeModalBooking.mangoName}</p>
                    <p className="text-xs text-gray-600">
                      Package: {activeModalBooking.packageLabel} x {activeModalBooking.quantity}
                    </p>
                  </div>
                  <p className="font-black text-green-800 text-base">
                    ৳ {activeModalBooking.subtotal}
                  </p>
                </div>
              </div>

              {/* Bill Details */}
              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>৳ {activeModalBooking.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Charge</span>
                  <span>৳ {activeModalBooking.deliveryCharge || 120}</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span className="text-green-800">৳ {activeModalBooking.totalAmount}</span>
                </div>
              </div>

              {activeModalBooking.customerNote && (
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs">
                  <span className="font-bold text-yellow-900">Customer Note: </span>
                  <span className="text-gray-700">{activeModalBooking.customerNote}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <a
                href={`tel:${activeModalBooking.customerPhone}`}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <FaPhoneAlt /> Call Customer Directly
              </a>
              <button
                type="button"
                onClick={() => setActiveModalBooking(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
