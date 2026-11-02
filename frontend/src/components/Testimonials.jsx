import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "মিজানুর রহমান",
    comment: "আমওয়ালা ভাইয়ার আমের গুণগত মান অসাধারণ। হিমসাগর আমের স্বাদ সত্যিই অতুলনীয়। ডেলিভারি সময়মত পেয়েছি।",
    rating: 5,
    location: "ঢাকা",
  },
  {
    id: 2,
    name: "নুসরাত জাহান",
    comment: "প্রি-অর্ডার করেছিলাম ল্যাংড়া আম। ফ্রেশ এবং কেমিক্যাল ফ্রি। সবার কাছে সুপারিশ করব।",
    rating: 5,
    location: "চট্টগ্রাম",
  },
  {
    id: 3,
    name: "রফিকুল ইসলাম",
    comment: "আম্রপালি ও ফজলি দুটোই চমৎকার। প্যাকেজিং খুব ভালো ছিল। ধন্যবাদ আমওয়ালা ভাইয়াকে।",
    rating: 4,
    location: "রাজশাহী",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 px-4 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
          🍃 গ্রাহকদের মতামত
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card w-80 bg-yellow-50 shadow-xl border-l-8 border-green-400 transition-all hover:scale-105 duration-300"
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full bg-green-300 text-center flex items-center justify-center text-xl shadow">
                      😊
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{rev.name}</h3>
                    <p className="text-xs text-gray-500">{rev.location}</p>
                  </div>
                </div>

                <p className="py-3 italic text-gray-700 text-sm leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < rev.rating ? "text-yellow-400" : "text-gray-300"}
                      size={16}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
