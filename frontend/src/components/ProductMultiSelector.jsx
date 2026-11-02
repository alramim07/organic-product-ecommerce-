import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaTrash,
  FaCheck,
  FaChevronDown,
  FaBoxes,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";

export default function ProductMultiSelector({
  selectedItems = [],
  onChange,
  className = "",
}) {
  const { products } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter out of stock products
  const availableProducts = (products || []).filter((p) => {
    const status = (p.stock_status || "").toLowerCase();
    return (
      status !== "স্টক আউট" &&
      status !== "আউট অব স্টক" &&
      status !== "out of stock" &&
      p.inStock !== false
    );
  });

  // Filter based on search query
  const filteredProducts = availableProducts.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const nameBn = (p.name_bn || "").toLowerCase();
    const nameEn = (p.name_en || "").toLowerCase();
    const category = (p.category_bn || p.category || "").toLowerCase();
    return (
      nameBn.includes(term) || nameEn.includes(term) || category.includes(term)
    );
  });

  const getProductPrice = (p) => {
    return p.price_per_unit || p.price_per_kg || p.price || 180;
  };

  const getProductUnit = (p) => {
    return p.unit || "কেজি";
  };

  const handleSelectProduct = (product) => {
    const existingIndex = selectedItems.findIndex(
      (item) => item.id === (product._id || product.id)
    );

    if (existingIndex >= 0) {
      // If already selected, increase quantity by 1
      const updated = [...selectedItems];
      updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + 1;
      updated[existingIndex].total =
        updated[existingIndex].quantity * updated[existingIndex].price;
      onChange(updated);
    } else {
      // Add new product with initial quantity (5 for kg, 1 for others)
      const unit = getProductUnit(product);
      const defaultQty = unit === "কেজি" ? 5 : 1;
      const price = getProductPrice(product);
      const newItem = {
        id: product._id || product.id,
        productId: product._id || product.id,
        name: product.name_bn,
        productName: product.name_bn,
        unit,
        price,
        quantity: defaultQty,
        total: defaultQty * price,
        image: product.image || "/assets/mangoes/m1.jpg",
      };
      onChange([...selectedItems, newItem]);
    }
  };

  const handleQuantityChange = (id, newQty) => {
    const val = Math.max(1, parseInt(newQty) || 1);
    const updated = selectedItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: val,
          total: val * item.price,
        };
      }
      return item;
    });
    onChange(updated);
  };

  const handleRemoveItem = (id) => {
    const updated = selectedItems.filter((item) => item.id !== id);
    onChange(updated);
  };

  return (
    <div className={`space-y-3 ${className}`} ref={dropdownRef}>
      {/* Trigger & Search Bar Box */}
      <div className="relative">
        <label className="block text-xs font-bold text-gray-700 mb-1">
          <span className="flex items-center gap-1.5 text-green-950 font-black">
            <FaBoxes className="text-amber-500" /> পছন্দের পণ্য নির্বাচন করুন *
          </span>
        </label>

        {/* Dropdown Button / Selector Bar */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-yellow-50/90 border-2 border-amber-300 hover:border-green-500 rounded-xl px-3.5 py-2.5 flex items-center justify-between cursor-pointer shadow-sm transition"
        >
          <div className="flex items-center gap-2 truncate text-xs font-bold text-gray-700">
            <FaSearch className="text-amber-600 shrink-0" />
            <span>
              {selectedItems.length > 0
                ? `${selectedItems.length} টি পণ্য নির্বাচিত (ক্লিক করে আরও যোগ করুন)`
                : "পণ্য সার্চ ও নির্বাচন করতে এখানে ক্লিক করুন..."}
            </span>
          </div>
          <FaChevronDown
            className={`text-gray-400 text-xs transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Floating Search & Dropdown List */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white rounded-2xl shadow-2xl border border-amber-300 overflow-hidden divide-y divide-gray-100 max-h-72 flex flex-col">
            {/* Search Input */}
            <div className="p-2.5 bg-yellow-50/60 sticky top-0 z-10 flex items-center gap-2 border-b border-amber-200">
              <FaSearch className="text-gray-400 text-xs ml-1" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="পণ্যের নাম লিখে সার্চ করুন..."
                className="w-full bg-transparent border-none text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-gray-400 hover:text-gray-600 font-bold px-1.5 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Products List */}
            <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-500">
                  কোনো ইন-স্টক পণ্য পাওয়া যায়নি
                </div>
              ) : (
                filteredProducts.map((prod) => {
                  const price = getProductPrice(prod);
                  const unit = getProductUnit(prod);
                  const isAlreadySelected = selectedItems.some(
                    (it) => it.id === (prod._id || prod.id)
                  );

                  return (
                    <div
                      key={prod._id || prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className={`p-2.5 sm:px-3 hover:bg-amber-50 cursor-pointer flex items-center justify-between gap-3 transition ${
                        isAlreadySelected ? "bg-green-50/70" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prod.image || "/assets/mangoes/m1.jpg"}
                          alt={prod.name_bn}
                          className="w-9 h-9 object-cover rounded-lg border border-gray-200 shrink-0"
                        />
                        <div className="truncate">
                          <p className="text-xs font-black text-gray-900 truncate">
                            {prod.name_bn}
                          </p>
                          <p className="text-[11px] font-bold text-amber-700">
                            ৳ {price} / {unit}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {isAlreadySelected ? (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-green-600 text-white flex items-center gap-1">
                            <FaCheck className="text-[9px]" /> যুক্ত আছে
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-yellow-400 hover:bg-yellow-500 text-green-950 flex items-center gap-1 shadow-sm">
                            <FaPlus className="text-[9px]" /> যোগ করুন
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Items List with Dynamic Units & Quantities */}
      {selectedItems.length > 0 && (
        <div className="space-y-2 bg-white/80 p-3 rounded-2xl border border-amber-200/80 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-wider text-green-900 flex items-center justify-between">
            <span>নির্বাচিত পণ্য তালিকা ({selectedItems.length})</span>
            <span className="text-gray-400 font-normal">পরিমাণ পরিবর্তন করুন</span>
          </p>

          <div className="space-y-2 divide-y divide-amber-100">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="pt-2 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                {/* Item Info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.image || "/assets/mangoes/m1.jpg"}
                    alt={item.name}
                    className="w-8 h-8 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                  <div className="truncate">
                    <p className="font-black text-gray-900 truncate text-xs">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-500 font-semibold">
                      ৳ {item.price} প্রতি {item.unit || "কেজি"}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Dynamic Unit */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="flex items-center gap-1 bg-yellow-50/90 border border-amber-300 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white hover:bg-amber-200 text-gray-700 font-black text-xs flex items-center justify-center cursor-pointer transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-12 text-center bg-transparent border-none font-black text-gray-900 text-xs focus:outline-none"
                    />
                    <span className="text-[11px] font-bold text-green-900 pr-1.5">
                      {item.unit || "কেজি"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-white hover:bg-amber-200 text-gray-700 font-black text-xs flex items-center justify-center cursor-pointer transition"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-black text-green-950 text-xs min-w-[65px] text-right">
                    ৳ {item.total}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="w-6 h-6 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center transition cursor-pointer text-xs"
                    title="পণ্যটি বাদ দিন"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
