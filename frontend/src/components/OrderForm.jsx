import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";

export default function OrderForm({ selectedMango, onSuccess }) {
  const { products, addBooking } = useApp();

  const mangoOptions =
    products && products.length > 0
      ? products.map((p) => `${p.name_bn} (${p.price || `৳ ${p.price_per_kg}/কেজি`})`)
      : [
          "গুটি/স্থানীয় (৳ ১২০/কেজি)",
          "গোপালভোগ (৳ ১৮০/কেজি)",
          "ক্ষীরসাপাতি / হিমসাগর (৳ ২২০/কেজি)",
          "ল্যাংড়া (৳ ১৬০/কেজি)",
          "আম্রপালি (৳ ১৯০/কেজি)",
          "ফজলি (৳ ২৫০/কেজি)",
          "হাঁড়িভাঙ্গা (৳ ১৪০/কেজি)",
          "বানানা ম্যাঙ্গো (৳ ১৩০/কেজি)",
          "আশিনা/বারি-৪ (৳ ১৭০/কেজি)",
          "গৌরমতি (৳ ১৫০/কেজি)",
          "কাটিমন (৳ ১৮৫/কেজি)",
        ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    mangoType: "",
    quantity: "",
    receiveDate: "",
  });

  useEffect(() => {
    if (selectedMango) {
      const match = mangoOptions.find((opt) => opt.includes(selectedMango.name_bn));
      if (match) {
        setFormData((prev) => ({ ...prev, mangoType: match }));
      }
    }
  }, [selectedMango, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.mangoType || !formData.quantity) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: "দয়া করে নাম, ফোন, আমের ধরণ এবং পরিমাণ পূরণ করুন",
        confirmButtonColor: "#eab308",
      });
      return;
    }

    // Dynamic calculation
    const qtyKg = parseInt(formData.quantity) || 5;
    const matchedProduct = products.find((p) => formData.mangoType.includes(p.name_bn));
    const ratePerKg = matchedProduct ? matchedProduct.price_per_kg || 180 : 180;
    const subtotal = ratePerKg * qtyKg;
    const deliveryCharge = 120;
    const totalAmount = subtotal + deliveryCharge;

    // Add directly to admin bookings state
    const createdBooking = addBooking({
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerAddress: formData.address.trim() || "ঠিকানা উল্লেখ নেই",
      mangoId: matchedProduct?.id || 1,
      mangoName: matchedProduct?.name_bn || formData.mangoType,
      packageLabel: `${qtyKg} কেজি`,
      packageKg: qtyKg,
      quantity: 1,
      deliveryArea: "dhaka",
      deliveryCharge,
      subtotal,
      totalAmount,
      deliveryDate: formData.receiveDate || new Date().toISOString().split("T")[0],
      paymentMethod: "cod",
      customerNote: "হোম পেজ প্রি-অর্ডার ফর্ম থেকে বুকিং",
    });

    Swal.fire({
      icon: "success",
      title: "প্রি-অর্ডার সফল হয়েছে!",
      html: `
        <div class="text-left text-sm space-y-1 mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p><strong>অর্ডার আইডি:</strong> ${createdBooking.id}</p>
          <p><strong>গ্রাহক:</strong> ${formData.name}</p>
          <p><strong>আমের ধরণ:</strong> ${formData.mangoType}</p>
          <p><strong>পরিমাণ:</strong> ${formData.quantity}</p>
          <p><strong>সম্ভাব্য বিল:</strong> ৳ ${totalAmount}</p>
        </div>
      `,
      confirmButtonColor: "#84cc16",
    });

    setFormData({
      name: "",
      phone: "",
      address: "",
      mangoType: "",
      quantity: "",
      receiveDate: "",
    });

    if (onSuccess) onSuccess();
  };

  return (
    <section id="second-booking" className="py-16 px-6 bg-gradient-to-b from-yellow-100 to-green-100">
      <div id="order" className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border border-amber-200"
          style={{ boxShadow: "0 20px 35px -12px rgba(234, 179, 8, 0.3)" }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 text-center border-b-4 border-yellow-400 inline-block w-full pb-3 mb-6 whitespace-nowrap overflow-hidden text-ellipsis md:overflow-visible">
            📋 পুনরায় অর্ডার ফর্ম - আপনার পছন্দের আম এখনই প্রি-বুক করুন
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">আপনার নাম *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="যেমন: মোহাম্মদ সাব্বির"
                className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">আমের জাত নির্বাচন *</label>
                <select
                  name="mangoType"
                  value={formData.mangoType}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
                >
                  <option value="" disabled>আমের জাত বাছুন</option>
                  {mangoOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">পরিমাণ (কেজি) *</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="যেমন: 10, 20 বা 50"
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ডেলিভারি তারিখ</label>
                <input
                  type="date"
                  name="receiveDate"
                  value={formData.receiveDate}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">সম্পূর্ণ ডেলিভারি ঠিকানা</label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                placeholder="বাসা নং, রোড নং, থানা, জেলা"
                className="textarea textarea-bordered w-full bg-yellow-50/80 border-amber-300 focus:border-green-500 text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-green-600 text-white font-bold text-lg hover:from-yellow-600 hover:to-green-700 border-none shadow-lg mt-4 cursor-pointer"
            >
              সংরক্ষণ করুন & অর্ডার জমা দিন
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6 font-medium">
            প্রি-অর্ডার করার পর আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব। ডেলিভারি চার্জ অর্ডারের উপর নির্ভরশীল।
          </p>
        </motion.div>
      </div>
    </section>
  );
}
