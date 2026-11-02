import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaTimes,
  FaPrint,
  FaDownload,
  FaLeaf,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingBag,
} from "react-icons/fa";

export default function OrderInvoiceModal({ isOpen, onClose, order }) {
  const printRef = useRef(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const items = order.items && order.items.length > 0 ? order.items : [
    {
      productName: order.mangoName || "আম",
      unit: "কেজি",
      quantity: order.packageKg || order.quantity || 1,
      price: order.subtotal ? Math.round(order.subtotal / (order.packageKg || 1)) : 180,
      total: order.subtotal || order.totalAmount || 180,
    }
  ];

  const totalAmount = order.totalAmount || order.subtotal || 0;
  const orderId = order.orderId || order.id || `AMW-${Date.now().toString().slice(-6)}`;
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-amber-200 my-8 print:shadow-none print:border-none print:my-0 print:max-w-none print:w-full"
        >
          {/* Printable Invoice Container */}
          <div ref={printRef} className="p-6 sm:p-8 space-y-6 print:p-8">
            {/* Header / Brand */}
            <div className="flex items-start justify-between border-b border-amber-200 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md">
                  <FaLeaf />
                </div>
                <div>
                  <h3 className="text-xl font-black text-green-900 tracking-tight">
                    আমওয়ালা ভাইয়া
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold">
                    অর্ডার ইনভয়েস ও রসিদ (Customer Invoice)
                  </p>
                </div>
              </div>

              {/* Close Button (Hidden on Print) */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition print:hidden cursor-pointer"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Success Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 print:border-gray-200">
              <FaCheckCircle className="text-emerald-600 text-2xl shrink-0" />
              <div>
                <p className="text-xs font-black text-emerald-900">
                  আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
                </p>
                <p className="text-[11px] text-emerald-700">
                  খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে ফোনে যোগাযোগ করবেন।
                </p>
              </div>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 gap-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 text-xs">
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">
                  ইনভয়েস / অর্ডার নম্বর
                </span>
                <span className="font-mono font-black text-green-950 text-sm">
                  #{orderId}
                </span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">
                  অর্ডারের তারিখ
                </span>
                <span className="font-bold text-gray-800">{orderDate}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <h4 className="font-black text-gray-900 uppercase text-[11px] tracking-wide border-b border-gray-200 pb-1">
                গ্রাহকের তথ্য (Customer Details)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                <p>
                  <span className="font-bold text-gray-900">নাম:</span>{" "}
                  {order.customerName || "গ্রাহক"}
                </p>
                <p className="flex items-center gap-1.5">
                  <FaPhoneAlt className="text-green-600 text-[10px]" />
                  <span className="font-bold text-gray-900">ফোন:</span>{" "}
                  {order.customerPhone || "N/A"}
                </p>
                <p className="sm:col-span-2 flex items-start gap-1.5">
                  <FaMapMarkerAlt className="text-amber-600 text-[11px] mt-0.5 shrink-0" />
                  <span>
                    <span className="font-bold text-gray-900">ডেলিভারি ঠিকানা:</span>{" "}
                    {order.customerAddress || "ঠিকানা উল্লেখ নেই"}
                  </span>
                </p>
                {order.deliveryDate && (
                  <p className="sm:col-span-2 flex items-center gap-1.5 text-green-800 font-bold">
                    <FaCalendarAlt className="text-[11px]" />
                    <span>প্রত্যাশিত ডেলিভারি তারিখ: {order.deliveryDate}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-gradient-to-r from-amber-100/80 to-yellow-100/80 text-green-950 font-black border-b border-amber-200">
                  <tr>
                    <th className="py-2.5 px-3">পণ্য (Product)</th>
                    <th className="py-2.5 px-3 text-center">দর (Price)</th>
                    <th className="py-2.5 px-3 text-center">পরিমাণ (Qty)</th>
                    <th className="py-2.5 px-3 text-right">মোট (Subtotal)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40">
                      <td className="py-2.5 px-3 font-bold text-gray-900">
                        {item.productName}
                      </td>
                      <td className="py-2.5 px-3 text-center text-gray-700">
                        ৳ {item.price}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-green-800">
                        {item.quantity} {item.unit || "কেজি"}
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-gray-900">
                        ৳ {item.total || item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Grand Total */}
            <div className="bg-gradient-to-r from-green-50 to-amber-50 p-4 rounded-2xl border border-green-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-600 block">
                  পরিশোধের ধরণ: ক্যাশ অন ডেলিভারি (COD)
                </span>
                <span className="text-[11px] text-gray-400">
                  পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-500 block">
                  সর্বমোট মূল্য
                </span>
                <span className="text-2xl font-black text-green-800">
                  ৳ {totalAmount}
                </span>
              </div>
            </div>

            {/* Print Note */}
            <p className="text-[10px] text-center text-gray-400 border-t border-gray-100 pt-3">
              হটলাইন: ০১৭৪৯-৭৭৫০৩০ | ওয়েবসাইট: ammwala.com | ধন্যবাদ আমওয়ালা ভাইয়ার সাথে থাকার জন্য!
            </p>
          </div>

          {/* Action Buttons (Hidden on Print) */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaDownload /> <span>ইনভয়েস ডাউনলোড / প্রিন্ট করুন</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              ঠিক আছে (Close)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
