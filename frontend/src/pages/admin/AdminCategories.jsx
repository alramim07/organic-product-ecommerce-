import { useState } from "react";
import {
  FaLayerGroup,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaBoxes,
  FaCheckCircle,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../../context/AppContext";
import IconPicker from "../../components/common/IconPicker";

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useApp();

  // New Category Form State
  const [nameBn, setNameBn] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("📦");
  const [unit, setUnit] = useState("কেজি");
  const [allowedUnits, setAllowedUnits] = useState("কেজি, গ্রাম");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Modal State
  const [editingCategory, setEditingCategory] = useState(null);

  // Auto-slug from nameEn
  const handleNameEnChange = (val) => {
    setNameEn(val);
    if (!slug || slug === nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  // Handle Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!nameBn.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Category Name Required",
        text: "Please provide the Bengali category name.",
      });
      return;
    }

    setIsSubmitting(true);

    const generatedSlug =
      slug.trim() ||
      (nameEn.trim()
        ? nameEn
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : `cat-${Date.now().toString().slice(-4)}`);

    const unitsArray = allowedUnits
      .split(/[,،]+/)
      .map((u) => u.trim())
      .filter(Boolean);

    if (!unitsArray.includes(unit)) {
      unitsArray.unshift(unit);
    }

    const payload = {
      name_bn: nameBn.trim(),
      name_en: nameEn.trim() || nameBn.trim(),
      slug: generatedSlug,
      icon: icon.trim() || "📦",
      unit: unit.trim() || "কেজি",
      available_units: unitsArray,
      badge: badge.trim(),
      description: description.trim(),
    };

    try {
      await addCategory(payload);

      Swal.fire({
        icon: "success",
        title: "Category Created!",
        text: `"${nameBn}" has been added to categories and unit list.`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Reset form instantly without page reload
      setNameBn("");
      setNameEn("");
      setSlug("");
      setIcon("📦");
      setUnit("কেজি");
      setAllowedUnits("কেজি, গ্রাম");
      setBadge("");
      setDescription("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message || "Could not add category.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = (cat) => {
    if (cat.slug === "all") {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "Default 'All' category cannot be deleted.",
      });
      return;
    }

    Swal.fire({
      title: "Delete Category?",
      text: `Are you sure you want to delete "${cat.name_bn}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteCategory(cat._id || cat.slug);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `"${cat.name_bn}" was removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle Save Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    const unitsArray = Array.isArray(editingCategory.available_units)
      ? editingCategory.available_units
      : String(editingCategory.available_units || "")
          .split(/[,،]+/)
          .map((u) => u.trim())
          .filter(Boolean);

    await updateCategory(editingCategory._id || editingCategory.slug, {
      ...editingCategory,
      available_units: unitsArray,
    });

    Swal.fire({
      icon: "success",
      title: "Category Updated!",
      timer: 1500,
      showConfirmButton: false,
    });

    setEditingCategory(null);
  };

  // Filter out "all" from management table if needed, or keep for view
  const displayCategories = categories.filter((c) => c.slug !== "all");

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <FaLayerGroup className="text-green-700" /> Categories & Units Management
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Create custom categories (e.g. Mango, Honey, Ghee) and configure selling units (KG, Gram, Liter, Jar, Bottle).
          </p>
        </div>
        <div className="text-xs font-bold text-green-800 bg-green-50 border border-green-200 px-4 py-2 rounded-2xl">
          Total Categories: {displayCategories.length}
        </div>
      </div>

      {/* Top Section: Add New Category & Unit Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h3 className="text-lg font-black text-green-950 flex items-center gap-2">
            <FaPlusCircle className="text-green-600" /> Add New Category & Unit
          </h3>
          <p className="text-xs text-gray-400">
            Fill the fields below to create a new category and assign its default measurement units.
          </p>
        </div>

        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Bengali Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category Bengali Name *
              </label>
              <input
                type="text"
                required
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="e.g. খাঁটি মধু ও ঘি"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category English Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                English Name
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => handleNameEnChange(e.target.value)}
                placeholder="e.g. Pure Honey & Ghee"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                URL Slug (Unique ID)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. honey-ghee"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Icon / Emoji with IconPicker */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category Icon
              </label>
              <div className="pt-0.5">
                <IconPicker
                  value={icon}
                  onChange={setIcon}
                  label="আইকন"
                  colorScheme="green"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Primary Unit */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Primary Selling Unit *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <option value="কেজি">কেজি (KG)</option>
                <option value="গ্রাম">গ্রাম (Gram)</option>
                <option value="লিটার">লিটার (Liter)</option>
                <option value="মিলি">মিলি (ML)</option>
                <option value="পিস">পিস / টি (Piece)</option>
                <option value="বোতল">বোতল (Bottle)</option>
                <option value="জার">জার (Jar)</option>
                <option value="বক্স">বক্স (Box)</option>
                <option value="ক্যারেট">ক্যারেট (Crate)</option>
              </select>
            </div>

            {/* Allowed Units */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Additional Allowed Units (Comma separated)
              </label>
              <input
                type="text"
                value={allowedUnits}
                onChange={(e) => setAllowedUnits(e.target.value)}
                placeholder="e.g. কেজি, গ্রাম, জার"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Promotional Badge */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. নতুন / হট সিজন"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 admin-btn-primary text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <FaSave /> <span>{isSubmitting ? "Adding..." : "Add Category & Unit"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Section: Existing Categories Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-gray-900">Configured Categories & Units List</h3>
            <p className="text-xs text-gray-500">
              Live categories available for multi-business product assignment
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Icon</th>
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Slug ID</th>
                <th className="py-3.5 px-4">Primary Unit</th>
                <th className="py-3.5 px-4">Allowed Units</th>
                <th className="py-3.5 px-4">Active Products</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayCategories.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400">
                    No categories configured yet. Add your first category above!
                  </td>
                </tr>
              ) : (
                displayCategories.map((c) => {
                  const productCount = products.filter(
                    (p) => p.category === c.slug || p.category_bn === c.name_bn
                  ).length;

                  return (
                    <tr key={c._id || c.slug} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4">
                        <span className="w-10 h-10 rounded-2xl bg-amber-50 border border-yellow-200 flex items-center justify-center text-xl shadow-sm overflow-hidden">
                          {c.icon && (c.icon.startsWith("data:") || c.icon.startsWith("/") || c.icon.startsWith("http")) ? (
                            <img src={c.icon} alt="" className="w-6 h-6 object-contain" />
                          ) : (
                            c.icon || "📦"
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-extrabold text-gray-900 text-base">{c.name_bn}</p>
                        <p className="text-xs text-gray-500 font-medium">{c.name_en}</p>
                        {c.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-amber-800 border border-yellow-300 mt-1 inline-block">
                            {c.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-gray-600">
                        {c.slug}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-900 font-extrabold text-xs rounded-full border border-green-200">
                          {c.unit || "কেজি"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(c.available_units)
                            ? c.available_units
                            : [c.unit || "কেজি"]
                          ).map((u, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md"
                            >
                              {u}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1.5 font-bold text-xs text-gray-700">
                          <FaBoxes className="text-amber-600" /> {productCount} Items
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingCategory(c)}
                            className="p-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition text-xs font-bold cursor-pointer"
                            title="Edit Category"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(c)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition text-xs font-bold cursor-pointer"
                            title="Delete Category"
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

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditingCategory(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-lg font-black text-gray-900">
                Edit Category: {editingCategory.name_bn}
              </h3>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Bengali Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name_bn}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name_bn: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    English Name
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name_en || ""}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name_en: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Category Icon
                  </label>
                  <div className="pt-0.5">
                    <IconPicker
                      value={editingCategory.icon || "📦"}
                      onChange={(newIcon) =>
                        setEditingCategory({ ...editingCategory, icon: newIcon })
                      }
                      label="আইকন"
                      colorScheme="green"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Primary Unit
                  </label>
                  <input
                    type="text"
                    value={editingCategory.unit || "কেজি"}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, unit: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-green-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Allowed Units (Comma separated)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(editingCategory.available_units)
                      ? editingCategory.available_units.join(", ")
                      : editingCategory.available_units || ""
                  }
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      available_units: e.target.value.split(/[,،]+/).map((u) => u.trim()),
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 admin-btn-primary text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5"
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
