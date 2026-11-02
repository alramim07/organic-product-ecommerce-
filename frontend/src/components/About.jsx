import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-r from-amber-100 to-lime-100">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Founder Avatar */}
          <div className="avatar mb-6">
            <div className="w-28 h-28 rounded-full ring ring-yellow-500 ring-offset-4 overflow-hidden shadow-xl mx-auto">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                alt="Aam Wala Vaiya Founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300";
                }}
              />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-green-800">
            আমওয়ালা ভাইয়ার গল্প
          </h3>

          <div className="divider w-24 mx-auto my-4 border-t-4 border-yellow-500 rounded-full" />

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4 max-w-3xl mx-auto">
            প্রতিষ্ঠাতা মোহাম্মদ সাব্বির এর হাত ধরে যাত্রা শুরু “আমওয়ালা ভাইয়া” — রাজশাহী অঞ্চলের প্রিমিয়াম মানের আম উৎপাদন ও বিতরণে বিশ্বস্ত নাম। আমরা কৃষকদের সাথে সরাসরি কাজ করি, নিশ্চিত করি কেমিক্যাল-মুক্ত এবং পাকুতে দেওয়া প্রাকৃতিক আম। আমাদের লক্ষ্য বিদেশি আমের সাথে দেশি আমের জয়গান করা। প্রতিটি অর্ডারে থাকে তাজা গন্ধ ও সতেজতা।
          </p>

          {/* Stats Bar */}
          <div className="stats stats-vertical sm:stats-horizontal shadow-xl mt-10 bg-white/75 backdrop-blur-sm border border-yellow-300 rounded-2xl w-full max-w-2xl mx-auto">
            <div className="stat place-items-center py-6 px-4">
              <div className="stat-title text-green-700 font-semibold">মোট প্রি-অর্ডার</div>
              <div className="stat-value text-yellow-600 text-3xl md:text-4xl">৫০০+</div>
              <div className="stat-desc text-gray-500 font-medium">গত সিজন</div>
            </div>

            <div className="stat place-items-center py-6 px-4">
              <div className="stat-title text-green-700 font-semibold">আমের জাত</div>
              <div className="stat-value text-green-600 text-3xl md:text-4xl">১১+</div>
              <div className="stat-desc text-gray-500 font-medium">সরাসরি বাগান থেকে</div>
            </div>

            <div className="stat place-items-center py-6 px-4">
              <div className="stat-title text-green-700 font-semibold">গ্রাহক সন্তুষ্টি</div>
              <div className="stat-value text-yellow-600 text-3xl md:text-4xl">৯৮%</div>
              <div className="stat-desc text-gray-500 font-medium">⭐ রিভিউ এর ভিত্তিতে</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
