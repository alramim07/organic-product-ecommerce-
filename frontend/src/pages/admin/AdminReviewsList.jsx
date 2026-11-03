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
            { id: "pending", label: "পেন্ডিং (Pending)", count: reviewsStats.pending, color: "text-amber-700" },
            { id: "approved", label: "অনুমোদিত (Approved)", count: reviewsStats.approved, color: "text-green-700" },
            { id: "rejected", label: "বাতিল (Rejected)", count: reviewsStats.rejected, color: "text-red-700" },
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

      {/* Reviews Cards List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
            <FaStar />
          </div>
          <h3 className="text-base font-bold text-gray-700">কোনো রিভিউ পাওয়া যায়নি</h3>
          <p className="text-gray-400 text-xs mt-1">
            {activeTab !== "all"
              ? `"${activeTab}" ক্যাটাগরিতে কোনো মতামত নেই`
              : "গ্রাহকরা মতামত পাঠালে এখানে স্বয়ংক্রিয়ভাবে জমা হবে"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => {
            const isApproved = rev.status === "approved";
            const isPending = rev.status === "pending";
            const isRejected = rev.status === "rejected";

            const formattedDate = new Date(rev.createdAt).toLocaleDateString("bn-BD", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={rev._id}
                className={`bg-white rounded-2xl p-5 border transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ${
                  isPending
                    ? "border-amber-300 bg-amber-50/20"
                    : isApproved
                    ? "border-green-200"
                    : "border-red-200 bg-red-50/10"
                }`}
              >
                <div>
                  {/* Top Row: Customer Info & Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        <span>{rev.customerName}</span>
                        {rev.isVerified && (
                          <span className="text-[10px] bg-green-100 text-green-800 font-extrabold px-1.5 py-0.5 rounded">
                            ভেরিফাইড
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt className="text-gray-400 text-[10px]" />
                        <span>{rev.customerLocation || "ঠিকানা দেওয়া হয়নি"}</span>
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${
                        isApproved
                          ? "bg-green-100 text-green-800 border-green-200"
                          : isPending
                          ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {isApproved ? "✓ অনুমোদিত (Live)" : isPending ? "⏳ অপেক্ষমাণ (Pending)" : "✕ বাতিল (Rejected)"}
                    </span>
                  </div>

                  {/* Rating & Product Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < rev.rating ? "text-yellow-400" : "text-gray-200"}
                        />
                      ))}
                      <span className="text-gray-600 font-bold ml-1">({rev.rating}/5)</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1 font-medium text-gray-600">
                        <FaBoxOpen className="text-amber-600" />
                        <span>{rev.productName || "আম"}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        <span>{formattedDate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    "{rev.comment}"
                  </p>

                  {/* Uploaded Photos Gallery (if any) */}
                  {rev.images && rev.images.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[11px] font-bold text-gray-500 mb-1.5 flex items-center gap-1">
                        <FaImage className="text-green-600" />
                        <span>সংযুক্ত ছবি ({rev.images.length}টি):</span>
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {rev.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setPreviewImage(img)}
                            className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer group hover:scale-105 transition"
                          >
                            <img
                              src={img}
                              alt="Review attachment"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                              <FaEye />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Bottom Bar */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {/* Approve Button */}
                    {!isApproved && (
                      <button
                        onClick={() => handleStatusChange(rev._id, "approved", rev.customerName)}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <FaCheckCircle />
                        <span>অনুমোদন করুন (Approve)</span>
                      </button>
                    )}

                    {/* Reject Button */}
                    {!isRejected && (
                      <button
                        onClick={() => handleStatusChange(rev._id, "rejected", rev.customerName)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <FaTimesCircle />
                        <span>বাতিল করুন (Reject)</span>
                      </button>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(rev._id, rev.customerName)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                    title="রিভিউ ডিলিট করুন"
                  >
                    <FaTrashAlt className="text-xs" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
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
