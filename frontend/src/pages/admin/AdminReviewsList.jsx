import { useState, useEffect } from "react";
import {
  FaStar,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
  FaEye,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBoxOpen,
  FaImage,
  FaTimes,
  FaUserCheck,
  FaQuoteLeft,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";

export default function AdminReviewsList() {
  const {
    reviews,
    reviewsStats,
    fetchAdminReviews,
    updateReviewStatus,
    deleteReview,
  } = useApp();

  const [activeTab, setActiveTab] = useState("all"); // "all" | "pending" | "approved" | "rejected"
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalReview, setActiveModalReview] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchAdminReviews(activeTab === "all" ? "" : activeTab);
  }, [activeTab]);

  const handleStatusChange = async (id, newStatus, customerName) => {
    const actionText =
      newStatus === "approved"
        ? "অনুমোদন (Approve)"
        : newStatus === "rejected"
        ? "বাতিল (Reject)"
        : "পেন্ডিং (Pending)";

    const result = await Swal.fire({
      title: `মতামত ${actionText} করবেন?`,
      text: `"${customerName}" এর রিভিউটি ${actionText} করতে চান?`,
      icon: newStatus === "approved" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#16a34a" : "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, নিশ্চিত করুন",
      cancelButtonText: "বাতিল",
    });

    if (result.isConfirmed) {
      const res = await updateReviewStatus(id, newStatus);
      if (res.success) {
        if (activeModalReview && (activeModalReview._id === id || activeModalReview.id === id)) {
          setActiveModalReview((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `রিভিউ স্ট্যাটাস "${newStatus}" করা হয়েছে!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const handleDelete = (id, customerName) => {
    Swal.fire({
      title: "রিভিউ মুছে ফেলবেন?",
      text: `"${customerName}" এর রিভিউটি স্থায়ীভাবে মুছে ফেলতে চান?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const deleted = await deleteReview(id);
        if (deleted.success) {
          if (activeModalReview && (activeModalReview._id === id || activeModalReview.id === id)) {
            setActiveModalReview(null);
          }
          Swal.fire({
            icon: "success",
            title: "মুছে ফেলা হয়েছে!",
            text: "রিভিউটি সফলভাবে মুছে ফেলা হয়েছে।",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesTab = activeTab === "all" || r.status === activeTab;
    const matchesSearch =
      searchTerm.trim() === "" ||
      r.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-green-950 flex items-center justify-center text-2xl shadow-md">
              <FaStar />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                গ্রাহক রিভিউ ও মতামত ব্যবস্থাপনা
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                গ্রাহকদের পাঠানো প্রোডাক্ট রিভিউ অনুমোদন বা বাতিল করুন। অনুমোদিত রিভিউ ওয়েবসাইটে স্বয়ংক্রিয়ভাবে দেখাবে।
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl border border-gray-200">
            মোট: {reviewsStats.total || reviews.length}
          </span>
          <span className="px-3 py-1.5 bg-amber-50 text-amber-800 font-bold text-xs rounded-xl border border-amber-200">
            অপেক্ষমাণ: {reviewsStats.pending || 0}
          </span>
          <span className="px-3 py-1.5 bg-green-50 text-green-800 font-bold text-xs rounded-xl border border-green-200">
            অনুমোদিত: {reviewsStats.approved || 0}
          </span>
          <span className="px-3 py-1.5 bg-red-50 text-red-800 font-bold text-xs rounded-xl border border-red-200">
            বাতিল: {reviewsStats.rejected || 0}
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: "all", label: "সব রিভিউ", count: reviewsStats.total || reviews.length },
            { id: "pending", label: "পেন্ডিং (Pending)", count: reviewsStats.pending },
            { id: "approved", label: "অনুমোদিত (Approved)", count: reviewsStats.approved },
            { id: "rejected", label: "বাতিল (Rejected)", count: reviewsStats.rejected },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    activeTab === tab.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="গ্রাহক, শহর বা মতামত খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Reviews Table / List View */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">গ্রাহক ও এলাকা</th>
                <th className="py-3.5 px-4 whitespace-nowrap">পণ্য</th>
                <th className="py-3.5 px-4 whitespace-nowrap">রেটিং</th>
                <th className="py-3.5 px-4 whitespace-nowrap">মতামত ও ছবি</th>
                <th className="py-3.5 px-4 whitespace-nowrap">স্ট্যাটাস</th>
                <th className="py-3.5 px-4 whitespace-nowrap">তারিখ</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400">
                    <div className="w-14 h-14 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                      <FaStar />
                    </div>
                    <p className="font-bold text-gray-600 text-sm">কোনো রিভিউ পাওয়া যায়নি</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeTab !== "all"
                        ? `"${activeTab}" ক্যাটাগরিতে কোনো মতামত নেই`
                        : "গ্রাহকরা মতামত পাঠালে এখানে স্বয়ংক্রিয়ভাবে জমা হবে"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => {
                  const isApproved = rev.status === "approved";
                  const isPending = rev.status === "pending";
                  const isRejected = rev.status === "rejected";

                  const formattedDate = new Date(rev.createdAt).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <tr
                      key={rev._id}
                      className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                      onClick={() => setActiveModalReview(rev)}
                    >
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm block">
                            {rev.customerName}
                          </span>
                          {rev.isVerified && (
                            <span className="text-[10px] bg-green-100 text-green-800 font-extrabold px-1.5 py-0.2 rounded">
                              ভেরিফাইড
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt className="text-gray-400 text-[10px]" />
                          <span>{rev.customerLocation || "ঠিকানা দেওয়া হয়নি"}</span>
                        </p>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                          <FaBoxOpen className="text-amber-600 text-xs" />
                          <span>{rev.productName || "আম"}</span>
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center text-yellow-400 text-xs">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < rev.rating ? "text-yellow-400" : "text-gray-200"}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-gray-700 ml-1">
                            ({rev.rating}/5)
                          </span>
                        </div>
                      </td>

                      {/* Comment & Photos Badge */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-xs text-gray-700 truncate font-medium">
                          "{rev.comment}"
                        </p>
                        {rev.images && rev.images.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                              <FaImage className="text-[10px]" /> {rev.images.length}টি ছবি সংযুক্ত
                            </span>
                            <div className="flex items-center -space-x-1.5">
                              {rev.images.slice(0, 3).map((img, i) => (
                                <img
                                  key={i}
                                  src={img}
                                  alt="Thumb"
                                  className="w-5 h-5 rounded-full object-cover border border-white shadow-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-black px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${
                            isApproved
                              ? "bg-green-100 text-green-800 border-green-300"
                              : isPending
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : "bg-red-100 text-red-800 border-red-300"
                          }`}
                        >
                          {isApproved
                            ? "✓ অনুমোদিত"
                            : isPending
                            ? "⏳ অপেক্ষমাণ"
                            : "✕ বাতিল"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-gray-500 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <FaCalendarAlt className="text-gray-400 text-[10px]" />
                          <span>{formattedDate}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* View Modal Button */}
                          <button
                            type="button"
                            onClick={() => setActiveModalReview(rev)}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-xl transition cursor-pointer"
                            title="বিস্তারিত দেখুন (View Details)"
                          >
                            <FaEye className="text-xs" />
                          </button>

                          {/* Quick Approve / Reject Buttons */}
                          {!isApproved && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(rev._id, "approved", rev.customerName)}
                              className="p-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl transition cursor-pointer"
                              title="অনুমোদন করুন (Approve)"
                            >
                              <FaCheckCircle className="text-xs" />
                            </button>
                          )}

                          {!isRejected && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(rev._id, "rejected", rev.customerName)}
                              className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition cursor-pointer"
                              title="বাতিল করুন (Reject)"
                            >
                              <FaTimesCircle className="text-xs" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(rev._id, rev.customerName)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <FaTrashAlt className="text-xs" />
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

      {/* Review Details Modal */}
      {activeModalReview && (
        <div
          onClick={() => setActiveModalReview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 cursor-default animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-4.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-base">
                  <FaStar />
                </div>
                <div>
                  <h3 className="font-black text-base leading-tight">গ্রাহক রিভিউ ও মতামত বিস্তারিত</h3>
                  <p className="text-[11px] text-yellow-100 font-medium">Customer Review & Feedback Details</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalReview(null)}
                className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/30 flex items-center justify-center text-white transition cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Customer Profile & Info Card */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-black text-gray-900">
                      {activeModalReview.customerName}
                    </h4>
                    {activeModalReview.isVerified && (
                      <span className="text-[11px] font-extrabold bg-green-100 text-green-800 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <FaUserCheck className="text-[10px]" /> ভেরিফাইড ক্রেতা
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-amber-600" />
                    <span>{activeModalReview.customerLocation || "ঠিকানা দেওয়া হয়নি"}</span>
                  </p>

                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <FaBoxOpen className="text-green-700" />
                    <span className="font-bold text-gray-800">পণ্য:</span>
                    <span>{activeModalReview.productName || "আম"}</span>
                  </p>
                </div>

                <div className="text-right space-y-1.5">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full border inline-block ${
                      activeModalReview.status === "approved"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : activeModalReview.status === "pending"
                        ? "bg-amber-100 text-amber-800 border-amber-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    }`}
                  >
                    {activeModalReview.status === "approved"
                      ? "✓ অনুমোদিত (Live)"
                      : activeModalReview.status === "pending"
                      ? "⏳ অপেক্ষমাণ (Pending)"
                      : "✕ বাতিল (Rejected)"}
                  </span>

                  <p className="text-[11px] text-gray-500 flex items-center justify-end gap-1">
                    <FaCalendarAlt className="text-gray-400 text-[10px]" />
                    <span>
                      {new Date(activeModalReview.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/* Star Rating Highlight */}
              <div className="flex items-center justify-between p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                <span className="text-xs font-bold text-amber-900">রেটিং পয়েন্ট:</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < activeModalReview.rating ? "text-amber-500" : "text-gray-200"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-black text-amber-950">
                    ৫ এর মধ্যে {activeModalReview.rating} ({activeModalReview.rating}/5)
                  </span>
                </div>
              </div>

              {/* Review Comment Quote */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <FaQuoteLeft className="text-amber-600 text-[10px]" /> গ্রাহকের মতামত ও রিভিউ বক্তব্য:
                </label>
                <div className="p-4 bg-yellow-50/40 rounded-2xl border border-yellow-200 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  "{activeModalReview.comment}"
                </div>
              </div>

              {/* Uploaded Photos Gallery */}
              {activeModalReview.images && activeModalReview.images.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <FaImage className="text-green-600" />
                    <span>সংযুক্ত পণ্যের ছবি ({activeModalReview.images.length}টি):</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {activeModalReview.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setPreviewImage(img)}
                        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xs cursor-pointer group hover:border-green-500 transition"
                      >
                        <img
                          src={img}
                          alt="Review attachment"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                          <FaEye className="text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Action Buttons */}
              <div className="pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-600 block mb-2">
                  স্ট্যাটাস পরিবর্তন করুন:
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {activeModalReview.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          activeModalReview._id,
                          "approved",
                          activeModalReview.customerName
                        )
                      }
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaCheckCircle />
                      <span>অনুমোদন করুন (Approve Live)</span>
                    </button>
                  )}

                  {activeModalReview.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          activeModalReview._id,
                          "rejected",
                          activeModalReview.customerName
                        )
                      }
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FaTimesCircle />
                      <span>বাতিল করুন (Reject)</span>
                    </button>
                  )}

                  {activeModalReview.status !== "pending" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          activeModalReview._id,
                          "pending",
                          activeModalReview.customerName
                        )
                      }
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>অপেক্ষমাণ রাখুন (Set Pending)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDelete(activeModalReview._id, activeModalReview.customerName)}
                className="px-3.5 py-1.5 text-red-600 hover:bg-red-50 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <FaTrashAlt />
                <span>রিভিউ ডিলিট করুন</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalReview(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Size Image Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 cursor-default"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition"
            >
              <FaTimes />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
