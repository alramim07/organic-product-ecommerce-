import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useApp } from "../context/AppContext";

export const mangoVarietiesData = [
  {
    id: 1,
    name_bn: "গুটি/স্থানীয়",
    price: "৳ ১২০/কেজি",
    image: "/assets/mangoes/m1.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে, নওগাঁ: ২২ মে, রাজশাহী: ১৫ মে",
  },
  {
    id: 2,
    name_bn: "গোপালভোগ",
    price: "৳ ১৮০/কেজি",
    image: "/assets/mangoes/m2.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে, নওগাঁ: ৩০ মে, রাজশাহী: ২২ মে",
  },
  {
    id: 3,
    name_bn: "ক্ষীরসাপাতি / হিমসাগর",
    price: "৳ ২২০/কেজি",
    image: "/assets/mangoes/m3.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৩ মে(ক্ষীর) ২২ মে(হিম), নওগাঁ: ২ জুন, রাজশাহী: ৩০ মে",
  },
  {
    id: 4,
    name_bn: "ল্যাংড়া",
    price: "৳ ১৬০/কেজি",
    image: "/assets/mangoes/m4.jpg",
    regionDates: "চুয়াডাঙ্গা: ২৮ মে, নওগাঁ: ১০ জুন, রাজশাহী: ১০ জুন",
  },
  {
    id: 5,
    name_bn: "আম্রপালি",
    price: "৳ ১৯০/কেজি",
    image: "/assets/mangoes/m5.jpg",
    regionDates: "চুয়াডাঙ্গা: ৫ জুন, নওগাঁ: ১৫ জুন, রাজশাহী: ১৫ জুন",
  },
  {
    id: 6,
    name_bn: "ফজলি",
    price: "৳ ২৫০/কেজি",
    image: "/assets/mangoes/m6.jpg",
    regionDates: "চুয়াডাঙ্গা: ১৫ জুন, নওগাঁ: ২৫ জুন, রাজশাহী: ১৫ জুন",
  },
  {
    id: 7,
    name_bn: "হাঁড়িভাঙ্গা",
    price: "৳ ১৪০/কেজি",
    image: "/assets/mangoes/m7.jpg",
    regionDates: "চুয়াডাঙ্গা: ২০ জুন, নওগাঁ: ১০ জুন, রাজশাহী: —",
  },
  {
    id: 8,
    name_bn: "বানানা ম্যাঙ্গো",
    price: "৳ ১৩০/কেজি",
    image: "/assets/mangoes/m8.jpg",
    regionDates: "চুয়াডাঙ্গা: ২২ জুন, নওগাঁ: ২৫ জুন, রাজশাহী: ১০ জুন",
  },
  {
    id: 9,
    name_bn: "আশিনা/বারি-৪",
    price: "৳ ১৭০/কেজি",
    image: "/assets/mangoes/m9.jpg",
    regionDates: "চুয়াডাঙ্গা: ৩০ জুন, নওগাঁ: ৫ জুলাই, রাজশাহী: ১০ জুলাই (আশিনা)",
  },
  {
    id: 10,
    name_bn: "গৌরমতি",
    price: "৳ ১৫০/কেজি",
    image: "/assets/mangoes/m10.jpg",
    regionDates: "চুয়াডাঙ্গা: ৩১ জুলাই, নওগাঁ: ৫ জুলাই, রাজশাহী: ১৫ জুলাই",
  },
  {
    id: 11,
    name_bn: "কাটিমন",
    price: "৳ ১৮৫/কেজি",
    image: "/assets/mangoes/m11.jpg",
    regionDates: "চুয়াডাঙ্গা: ৫ জুলাই, নওগাঁ: ৫ জুলাই, রাজশাহী: সারা বছর",
  },
];

export default function MangoVarieties({ onSelectMango }) {
  const { products } = useApp();
  // Filter mango products or fallback to mangoVarietiesData
  const mangoProducts =
    products && products.length > 0
      ? products.filter((p) => !p.category || p.category === "mango")
      : mangoVarietiesData;

  const displayProducts = mangoProducts.length > 0 ? mangoProducts : mangoVarietiesData;

  const handlePreOrder = (mango) => {
    const bookingSection = document.getElementById("second-booking") || document.getElementById("order");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }

    Swal.fire({
      icon: "info",
      title: "আম বাছাই",
      text: `"${mango.name_bn}" বাছাই করা হয়েছে। নিচের ফর্মটি পূরণ করুন।`,
      confirmButtonColor: "#eab308",
    });

    if (onSelectMango) {
      onSelectMango(mango);
    }
  };

  return (
    <section id="varieties" className="py-20 px-5 bg-gradient-to-t from-yellow-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 inline-block border-b-8 border-yellow-400 pb-2 px-2">
            🥭 আমের জাত ও মূল্য
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-5 text-lg">
            রাজশাহী, চুয়াডাঙ্গা, নওগাঁর মৌসুমি সেরা আম। নিচের কার্ড থেকে বেছে নিন আপনার পছন্দের জাত।
          </p>
        </div>

        {/* Mango Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.map((mango, index) => (
            <motion.div
              key={mango.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="card card-compact bg-white/90 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-yellow-200"
            >
              <Link to={`/product/${mango.id}`} className="block">
                <figure className="h-48 overflow-hidden bg-gray-100 relative group">
                  <img
                    src={mango.image}
                    alt={mango.name_bn}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/mangoes/m1.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-green-900 font-bold text-xs py-1.5 px-3 rounded-full shadow flex items-center gap-1.5">
                      <FaEye /> বিস্তারিত দেখুন
                    </span>
                  </div>
                </figure>
              </Link>
              <div className="card-body bg-gradient-to-br from-amber-50 to-green-50 p-5">
                <Link to={`/product/${mango.id}`} className="hover:text-green-700 transition">
                  <h2 className="card-title text-2xl text-green-800 font-bold">{mango.name_bn}</h2>
                </Link>
                <p className="text-yellow-700 font-bold text-xl">{mango.price}</p>
                <p className="text-sm text-gray-600 mt-1 flex items-start gap-1.5 min-h-[40px]">
                  <FaCalendarAlt className="mt-0.5 text-green-700 flex-shrink-0" />
                  <span>{mango.regionDates}</span>
                </p>
                <div className="card-actions justify-between items-center mt-3 pt-2 border-t border-yellow-200/60">
                  <Link
                    to={`/product/${mango.id}`}
                    className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1"
                  >
                    <FaEye /> বিস্তারিত
                  </Link>
                  <button
                    onClick={() => handlePreOrder(mango)}
                    className="btn btn-sm bg-green-600 text-white hover:bg-green-700 rounded-full border-none shadow px-4 py-1 cursor-pointer"
                  >
                    প্রি-অর্ডার করুন
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
