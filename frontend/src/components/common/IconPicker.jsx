import { useState, useEffect, useRef } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function IconPicker({
  value,
  onChange,
  label = "আইকন:",
  colorScheme = "green",
}) {
  const [showPicker, setShowPicker] = useState(false);
  const fileRef = useRef(null);
  const pickerRef = useRef(null);

  const presetIcons = [
    "🥭", "🍯", "🍒", "🫒", "🌿", "📦", "💡", "🏷️",
    "⭐", "🚚", "🛡️", "🌾", "🥣", "🍎", "🍋", "🍇",
    "🥒", "🥥", "🔥", "✨", "🥛", "🍯", "🧈", "🌶️", "🥬"
  ];

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPicker]);

  const handleCustomIconUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid Icon Format",
        text: "Please select an image file (SVG, PNG, WEBP, JPG)",
      });
      return;
    }
    if (file.size > 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "File Too Large",
        text: "Please upload an icon smaller than 1MB (Recommended: 64x64 px).",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
      setShowPicker(false);
    };
    reader.readAsDataURL(file);
  };

  const isImage =
    value &&
    (value.startsWith("data:") ||
      value.startsWith("/") ||
      value.startsWith("http"));

  return (
    <div className="relative inline-block" ref={pickerRef}>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:border-green-600 rounded-xl px-2.5 py-1.5 shadow-sm transition cursor-pointer text-xs font-bold text-gray-700"
        >
          <span className="text-[10px] text-gray-400 font-bold uppercase">{label}</span>
          {value ? (
            isImage ? (
              <img
                src={value}
                alt="Icon"
                className="w-5 h-5 object-contain rounded inline-block"
              />
            ) : (
              <span className="text-base leading-none">{value}</span>
            )
          ) : (
            <span className="text-gray-400 italic text-[11px]">(No Icon)</span>
          )}
          <span className="text-[9px] text-gray-400">▼</span>
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-gray-400 hover:text-red-500 text-xs p-1 transition cursor-pointer"
            title="Remove Icon"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showPicker && (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800">Choose or Upload Icon</span>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="text-gray-400 hover:text-gray-600 text-xs p-1 cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>

          {/* Preset Emojis Grid */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Preset Icons:
            </span>
            <div className="grid grid-cols-5 gap-1.5 max-h-40 overflow-y-auto p-0.5">
              {presetIcons.map((ic, i) => (
                <button
                  key={`${ic}-${i}`}
                  type="button"
                  onClick={() => {
                    onChange(ic);
                    setShowPicker(false);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg hover:bg-green-50 transition cursor-pointer ${
                    value === ic
                      ? "bg-green-100 ring-2 ring-green-500 scale-105"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Upload Drop/Button */}
          <div className="pt-2 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Custom Icon Upload:
            </span>
            <p className="text-[10px] text-gray-500 mb-2 leading-relaxed font-mono">
              Icon Size: 64 x 64 px • Format: SVG, PNG, WEBP, JPG (Max 1MB)
            </p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer border border-gray-300 shadow-sm"
            >
              <FaCloudUploadAlt className="text-sm text-green-700" /> Upload Custom Icon
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleCustomIconUpload(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Remove / Clear */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setShowPicker(false);
              }}
              className="text-[11px] text-red-600 hover:underline font-semibold cursor-pointer"
            >
              Remove Icon (No Icon)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
