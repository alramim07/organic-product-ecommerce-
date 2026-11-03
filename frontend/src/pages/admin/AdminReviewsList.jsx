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
  FaPlus,
  FaPen,
  FaCamera,
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
    products,
    submitReview,
  } = useApp();

  const [activeTab, setActiveTab] = useState("all"); // "all" | "pending" | "approved" | "rejected"
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalReview, setActiveModalReview] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Add Custom Review Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);
  const [customForm, setCustomForm] = useState({
    productId: "",
    productName: "",
    customerName: "",
    customerLocation: "",
    rating: 5,
    comment: "",
    images: [],
    status: "approved", // Default: Approved so it immediately displays on the product page
  });

  useEffect(() => {
    fetchAdminReviews(activeTab === "all" ? "" : activeTab);
  }, [activeTab]);

  const handleStatusChange = async (id, newStatus, customerName) => {
    const actionText =
      newStatus === "approved"
        ? "Approve (Live)"
        : newStatus === "rejected"
        ? "Reject"
        : "Set as Pending";

    const result = await Swal.fire({
      title: `${actionText} Review?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} review for "${customerName}"?`,
      icon: newStatus === "approved" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#16a34a" : "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: "Cancel",
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
          title: `Review status updated to "${newStatus}"!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const handleDelete = (id, customerName) => {
    Swal.fire({
      title: "Delete Review?",
      text: `Are you sure you want to permanently delete the review from "${customerName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const deleted = await deleteReview(id);
        if (deleted.success) {
          if (activeModalReview && (activeModalReview._id === id || activeModalReview.id === id)) {
            setActiveModalReview(null);
          }
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Review has been permanently removed.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  // Handle Photo Upload for Custom Review
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (customForm.images.length + files.length > 4) {
      Swal.fire({
        icon: "warning",
        title: "Photo Limit Exceeded",
        text: "You can upload a maximum of 4 photos per review.",
      });
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Each image must be under 5MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        setCustomForm((prev) => ({
          ...prev,
          images: [...prev.images, loadEvt.target.result].slice(0, 4),
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setCustomForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Submit Custom Review
  const handleCustomReviewSubmit = async (e) => {
    e.preventDefault();

    if (!customForm.productId) {
      Swal.fire({
        icon: "warning",
        title: "Product Required",
        text: "Please select a product for this custom review.",
      });
      return;
    }

    if (!customForm.customerName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Customer Name Required",
        text: "Please enter the customer name.",
      });
      return;
    }

    if (!customForm.comment.trim() || customForm.comment.trim().length < 5) {
      Swal.fire({
        icon: "warning",
        title: "Comment Required",
        text: "Review message must be at least 5 characters long.",
      });
      return;
    }

    setIsSubmittingCustom(true);
    try {
      const selectedProduct = products.find(
        (p) => String(p._id || p.id || p.slug) === String(customForm.productId)
      );

      const payload = {
        productId: String(selectedProduct?._id || selectedProduct?.id || selectedProduct?.slug || customForm.productId),
        productName: selectedProduct?.name_bn || selectedProduct?.name || selectedProduct?.name_en || customForm.productName || "Product",
        customerName: customForm.customerName.trim(),
        customerLocation: customForm.customerLocation.trim() || "Bangladesh",
        rating: Number(customForm.rating) || 5,
        comment: customForm.comment.trim(),
        images: customForm.images,
        status: customForm.status || "approved",
      };

      const res = await submitReview(payload);
      if (res && res.success) {
        Swal.fire({
          icon: "success",
          title: "Review Added!",
          text: `Custom review for "${payload.productName}" added with status "${payload.status}".`,
          confirmButtonColor: "#16a34a",
        });

        // Reset and close
        setCustomForm({
          productId: "",
          productName: "",
          customerName: "",
          customerLocation: "",
          rating: 5,
          comment: "",
          images: [],
          status: "approved",
        });
        setShowAddModal(false);
        fetchAdminReviews(activeTab === "all" ? "" : activeTab);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Could not add custom review. Please try again.",
        });
      }
    } catch (err) {
      console.error("Custom review submit error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while adding review.",
      });
    } finally {
      setIsSubmittingCustom(false);
    }
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-green-950 flex items-center justify-center text-2xl shadow-md">
              <FaStar />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Customer Reviews & Feedback Management
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                Moderate incoming customer reviews or add custom verified reviews per product. Approved reviews automatically display live on each product page.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats & Add Review Button */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl border border-gray-200">
              Total: {reviewsStats.total || reviews.length}
            </span>
            <span className="px-3 py-1.5 bg-amber-50 text-amber-800 font-bold text-xs rounded-xl border border-amber-200">
              Pending: {reviewsStats.pending || 0}
            </span>
            <span className="px-3 py-1.5 bg-green-50 text-green-800 font-bold text-xs rounded-xl border border-green-200">
              Approved: {reviewsStats.approved || 0}
            </span>
            <span className="px-3 py-1.5 bg-red-50 text-red-800 font-bold text-xs rounded-xl border border-red-200">
              Rejected: {reviewsStats.rejected || 0}
            </span>
          </div>

          {/* Add Custom Review Button */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer transform active:scale-95"
          >
            <FaPlus className="text-[10px]" />
            <span>Add Custom Review</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: "all", label: "All Reviews", count: reviewsStats.total || reviews.length },
            { id: "pending", label: "Pending", count: reviewsStats.pending },
            { id: "approved", label: "Approved", count: reviewsStats.approved },
            { id: "rejected", label: "Rejected", count: reviewsStats.rejected },
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
            placeholder="Search customer, city, comment or product..."
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
                <th className="py-3.5 px-4 whitespace-nowrap">Customer & Location</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Target Product</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Rating</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Feedback & Photos</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Date</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400">
                    <div className="w-14 h-14 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                      <FaStar />
                    </div>
                    <p className="font-bold text-gray-600 text-sm">No reviews found</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeTab !== "all"
                        ? `No reviews in "${activeTab}" category`
                        : "Customer reviews will appear here once submitted or added."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => {
                  const isApproved = rev.status === "approved";
                  const isPending = rev.status === "pending";
                  const isRejected = rev.status === "rejected";

                  const formattedDate = new Date(rev.createdAt).toLocaleDateString("en-US", {
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
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt className="text-gray-400 text-[10px]" />
                          <span>{rev.customerLocation || "Location not provided"}</span>
                        </p>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                          <FaBoxOpen className="text-amber-600 text-xs" />
                          <span>{rev.productName || "Product"}</span>
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
                              <FaImage className="text-[10px]" /> {rev.images.length} Photos attached
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
                            ? "✓ Approved (Live)"
                            : isPending
                            ? "⏳ Pending"
                            : "✕ Rejected"}
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
                            title="View Review Details"
                          >
                            <FaEye className="text-xs" />
                          </button>

                          {/* Quick Approve / Reject Buttons */}
                          {!isApproved && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(rev._id, "approved", rev.customerName)}
                              className="p-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl transition cursor-pointer"
                              title="Approve Review"
                            >
                              <FaCheckCircle className="text-xs" />
                            </button>
                          )}

                          {!isRejected && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(rev._id, "rejected", rev.customerName)}
                              className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl transition cursor-pointer"
                              title="Reject Review"
                            >
                              <FaTimesCircle className="text-xs" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(rev._id, rev.customerName)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Delete Review"
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

      {/* ========================================================================= */}
      {/* ADD CUSTOM REVIEW MODAL (With Product Selector) */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
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
                  <FaPen />
                </div>
                <div>
                  <h3 className="font-black text-base leading-tight">Add Custom Product Review</h3>
                  <p className="text-[11px] text-yellow-100 font-medium">
                    Create a verified customer review for a selected product
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/30 flex items-center justify-center text-white transition cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCustomReviewSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              {/* Product Selector Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <FaBoxOpen className="text-amber-600" />
                  <span>Select Product (পণ্য নির্বাচন করুন) *</span>
                </label>
                <select
                  required
                  value={customForm.productId}
                  onChange={(e) => {
                    const selected = products.find(
                      (p) => String(p._id || p.id || p.slug) === String(e.target.value)
                    );
                    setCustomForm((prev) => ({
                      ...prev,
                      productId: e.target.value,
                      productName: selected ? (selected.name_bn || selected.name || selected.name_en) : "",
                    }));
                  }}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
                >
                  <option value="">-- Choose a Product --</option>
                  {products.map((p) => {
                    const pId = String(p._id || p.id || p.slug);
                    return (
                      <option key={pId} value={pId}>
                        {p.name_bn} {p.name_en ? `(${p.name_en})` : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Customer Name & City/Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Customer Name (গ্রাহকের নাম) *
                  </label>
                  <input
                    type="text"
                    required
                    value={customForm.customerName}
                    onChange={(e) => setCustomForm({ ...customForm, customerName: e.target.value })}
                    placeholder="e.g. ইঞ্জি. মোস্তফা কামাল"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Address / City (ঠিকানা / শহর)
                  </label>
                  <input
                    type="text"
                    value={customForm.customerLocation}
                    onChange={(e) => setCustomForm({ ...customForm, customerLocation: e.target.value })}
                    placeholder="e.g. ধানমন্ডি, ঢাকা"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Star Rating & Status Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* Rating Stars */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Star Rating (স্টার রেটিং)
                  </label>
                  <div className="flex items-center gap-1.5 p-2 bg-amber-50/60 rounded-xl border border-yellow-200">
                    <div className="flex text-amber-500 text-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setCustomForm({ ...customForm, rating: star })}
                          className="hover:scale-110 transition cursor-pointer p-0.5"
                        >
                          <FaStar
                            className={star <= customForm.rating ? "text-amber-500" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-black text-amber-900 ml-1">
                      ({customForm.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Publication Status */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Initial Status (স্ট্যাটাস)
                  </label>
                  <select
                    value={customForm.status}
                    onChange={(e) => setCustomForm({ ...customForm, status: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
                  >
                    <option value="approved">Approved (Live on Product Page)</option>
                    <option value="pending">Pending (Review Later)</option>
                    <option value="rejected">Rejected (Archived)</option>
                  </select>
                </div>
              </div>

              {/* Review Comment / Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Review Statement (মতামত / রিভিউ বক্তব্য) *
                </label>
                <textarea
                  required
                  rows="3"
                  value={customForm.comment}
                  onChange={(e) => setCustomForm({ ...customForm, comment: e.target.value })}
                  placeholder="Write the customer's detailed experience or feedback here..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition resize-none"
                />
              </div>

              {/* Photo Upload Section */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Upload Product Photos (পণ্যের ছবি আপলোড, ঐচ্ছিক সর্বোচ্চ ৪টি)
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {customForm.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-300 shadow-xs group">
                      <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600 transition cursor-pointer"
                        title="Remove photo"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}

                  {customForm.images.length < 4 && (
                    <label className="w-16 h-16 rounded-xl border-2 border-dashed border-yellow-300 hover:border-yellow-400 bg-yellow-50/50 hover:bg-yellow-100/50 flex flex-col items-center justify-center text-amber-700 cursor-pointer transition">
                      <FaCamera className="text-base" />
                      <span className="text-[9px] font-bold mt-0.5">+ Photo</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCustom}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-green-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingCustom ? "Adding..." : "Publish Custom Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REVIEW DETAILS VIEW MODAL (Opened with Eye Icon) */}
      {/* ========================================================================= */}
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
                  <h3 className="font-black text-base leading-tight">Review & Feedback Details</h3>
                  <p className="text-[11px] text-yellow-100 font-medium">Verified Customer Feedback</p>
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
                        <FaUserCheck className="text-[10px]" /> Verified Buyer
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-amber-600" />
                    <span>{activeModalReview.customerLocation || "Location not provided"}</span>
                  </p>

                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <FaBoxOpen className="text-green-700" />
                    <span className="font-bold text-gray-800">Target Product:</span>
                    <span>{activeModalReview.productName || "Product"}</span>
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
                      ? "✓ Approved (Live)"
                      : activeModalReview.status === "pending"
                      ? "⏳ Pending Moderation"
                      : "✕ Rejected"}
                  </span>

                  <p className="text-[11px] text-gray-500 flex items-center justify-end gap-1">
                    <FaCalendarAlt className="text-gray-400 text-[10px]" />
                    <span>
                      {new Date(activeModalReview.createdAt).toLocaleDateString("en-US", {
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
                <span className="text-xs font-bold text-amber-900">Rating Score:</span>
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
                    {activeModalReview.rating} out of 5.0
                  </span>
                </div>
              </div>

              {/* Review Comment Quote */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <FaQuoteLeft className="text-amber-600 text-[10px]" /> Customer Feedback Message:
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
                    <span>Attached Product Photos ({activeModalReview.images.length}):</span>
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
                  Change Review Status:
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
                      <span>Approve (Publish Live)</span>
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
                      <span>Reject Review</span>
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
                      <span>Mark as Pending</span>
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
                <span>Delete Review</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalReview(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close
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
