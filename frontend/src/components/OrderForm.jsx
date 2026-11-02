import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";
import ProductMultiSelector from "./ProductMultiSelector";
import OrderInvoiceModal from "./OrderInvoiceModal";

export default function OrderForm({ selectedMango, onSuccess }) {
  const { products, addBooking } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    receiveDate: "",
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // If a mango was clicked from product list or card
  useEffect(() => {
    if (selectedMango && products && products.length > 0) {
      const matched = products.find(
        (p) =>
          (p._id && p._id === selectedMango._id) ||
          (p.id && p.id === selectedMango.id) ||
          (p.name_bn && p.name_bn.includes(selectedMango.name_bn))
      );
      if (matched) {
        const unit = matched.unit || "কেজি";
        const price = matched.price_per_unit || matched.price_per_kg || matched.price || 180;
        const defaultQty = unit === "কেজি" ? 5 : 1;
        setSelectedItems([
          {
            id: matched._id || matched.id,
            productId: matched._id || matched.id,
            name: matched.name_bn,
            productName: matched.name_bn,
            unit,
            price,
            quantity: defaultQty,
            total: defaultQty * price,
            image: matched.image || "/assets/mangoes/m1.jpg",
          },
        ]);
      }
    }
  }, [selectedMango, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate live total price
  const totalAmount = selectedItems.reduce((acc, it) => acc + (it.total || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: "দয়া করে আপনার নাম ও মোবাইল নম্বর পূরণ করুন",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "পণ্য নির্বাচন করুন!",
        text: "অনুগ্রহ করে অন্তত একটি পণ্য নির্বাচন করুন",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    const orderPayload = {
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerAddress: formData.address.trim() || "ঠিকানা উল্লেখ নেই",
      items: selectedItems.map((it) => ({
        productId: it.productId,
        productName: it.productName || it.name,
        unit: it.unit || "কেজি",
        quantity: it.quantity,
        price: it.price,
        total: it.total,
      })),
      mangoName: selectedItems.map((it) => it.name).join(", "),
      quantity: selectedItems.reduce((sum, it) => sum + it.quantity, 0),
      packageLabel: selectedItems.map((it) => `${it.name} (${it.quantity} ${it.unit})`).join(", "),
      subtotal: totalAmount,
      totalAmount,
      deliveryDate: formData.receiveDate || new Date().toISOString().split("T")[0],
      paymentMethod: "cod",
      customerNote: "পুনরায় অর্ডার ফর্ম থেকে বুকিং",
    };

    try {
      const savedBooking = await addBooking(orderPayload);
      setCreatedOrder(savedBooking || { ...orderPayload, id: `AMW-${Date.now().toString().slice(-6)}` });
      setShowInvoiceModal(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        receiveDate: "",
      });
      setSelectedItems([]);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Order submission error:", err);
      Swal.fire({
        icon: "error",
        title: "অর্ডার গ্রহণ ব্যর্থ হয়েছে",
        text: "দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
      });
    }
  };

  return (
    <>
      <section id="second-booking" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-yellow-100 to-green-100">
        <div id="order" className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border border-amber-200"
            style={{ boxShadow: "0 20px 35px -12px rgba(234, 179, 8, 0.3)" }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-green-800 text-center border-b-4 border-yellow-400 inline-block w-full pb-3 mb-6">
              📋 পুনরায় অর্ডার ফর্ম - আপনার পছন্দের আম এখনই প্রি-বুক করুন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              {/* Customer Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="যেমন: মোহাম্মদ সাব্বির"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 text-xs sm:text-sm"
                />
              </div>

              {/* Mobile Phone & Delivery Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                    ডেলিভারি তারিখ
                  </label>
                  <input
                    type="date"
                    name="receiveDate"
                    value={formData.receiveDate}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Product Multi-Selector with Search & Individual Units */}
              <ProductMultiSelector
                selectedItems={selectedItems}
                onChange={setSelectedItems}
              />

              {/* Delivery Address */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  সম্পূর্ণ ডেলিভারি ঠিকানা
                </label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="বাসা নং, রোড নং, থানা, জেলা"
                  className="textarea textarea-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800 text-xs sm:text-sm"
                />
              </div>

              {/* Live Total Price Display Box (Marked in Red in Image 4!) */}
              <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 border-2 border-amber-400 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-black text-gray-800">
                    সর্বমোট মূল্য (Total Amount):
                  </span>
                </div>
                <span className="text-2xl font-black text-green-900">
                  ৳ {totalAmount}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-green-600 hover:from-yellow-600 hover:to-green-700 text-white font-black text-base sm:text-lg border-none shadow-lg mt-2 cursor-pointer transition transform hover:scale-[1.01]"
              >
                সংরক্ষণ করুন & অর্ডার জমা দিন
              </button>
            </form>

            <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 font-medium">
              প্রি-অর্ডার করার পর আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব। ডেলিভারি চার্জ অর্ডারের উপর নির্ভরশীল।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Downloadable Order Invoice Modal */}
      <OrderInvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        order={createdOrder}
      />
    </>
  );
}
