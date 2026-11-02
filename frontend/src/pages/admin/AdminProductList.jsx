import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaBoxes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";

export default function AdminProductList() {
  const { products, deleteProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to permanently delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteProduct(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `"${name}" was deleted successfully.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      (p.name_bn && p.name_bn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.name_en && p.name_en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.origin && p.origin.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "in_stock" &&
        (p.stock_status?.toLowerCase().includes("in stock") ||
          p.stock_status?.includes("ইন স্টক"))) ||
      (statusFilter === "pre_order" &&
        (p.stock_status?.toLowerCase().includes("pre-order") ||
          p.stock_status?.includes("প্রি-অর্ডার")));

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <FaBoxes className="text-green-700" /> Product List
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Total {products.length} products available across categories
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="px-5 py-3 bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <FaPlusCircle /> <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, category, or origin..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            <option value="all">All Products ({products.length})</option>
            <option value="in_stock">In Stock</option>
            <option value="pre_order">Pre-Order</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Origin & Dates</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const prodId = p.id || p._id;
                  return (
                    <tr key={prodId} className="hover:bg-gray-50/80 transition">
                      <td className="py-3 px-4">
                        <img
                          src={p.image}
                          alt={p.name_bn}
                          className="w-14 h-14 rounded-2xl object-cover border border-yellow-200 shadow-sm"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/mangoes/m1.jpg";
                          }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <h4 className="font-extrabold text-gray-900 text-base">{p.name_bn}</h4>
                        <p className="text-xs text-gray-500 font-medium">
                          {p.name_en || "Premium Organic Item"}
                        </p>
                        <span className="text-[11px] text-amber-700 font-semibold line-clamp-1">
                          {p.subtitle_bn}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-black text-green-800 text-base">
                          ৳ {p.price_per_unit || p.price_per_kg || p.price}
                        </span>
                        <span className="text-xs text-gray-500 font-bold block">
                          / {p.unit || "কেজি"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <p className="font-semibold text-gray-800 flex items-center gap-1">
                          <FaMapMarkerAlt className="text-red-500 text-[10px]" /> {p.origin}
                        </p>
                        <p className="text-gray-500 text-[11px] mt-0.5">
                          {p.regionDates || p.harvest_schedule || "Available now"}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <span className="px-2.5 py-0.5 bg-green-50 border border-green-200 text-green-800 font-bold text-xs rounded-full inline-block">
                            {p.stock_status || "In Stock"}
                          </span>
                          {p.publication_status === "draft" && (
                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 text-gray-700 font-extrabold text-[10px] rounded-full block w-fit">
                              Draft
                            </span>
                          )}
                          {p.publication_status === "scheduled" && (
                            <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-[10px] rounded-full block w-fit">
                              Scheduled
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/product/${prodId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition text-xs font-bold"
                            title="View Public Page"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/admin/products/edit/${prodId}`}
                            className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition text-xs font-bold"
                            title="Edit Product"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(prodId, p.name_bn || p.name_en)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition text-xs font-bold cursor-pointer"
                            title="Delete Product"
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
    </div>
  );
}
