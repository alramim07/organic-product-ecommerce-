import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

// Helper to convert English digits to Bengali
export const toBengaliNumber = (num) => {
  if (num === undefined || num === null) return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (w) => banglaDigits[+w]);
};

export default function About() {
  const { settings, products } = useApp();

  // Dynamic Content with fallbacks
  const founderImg =
    settings?.aboutFounderImg ||
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";

  const title = settings?.aboutTitle || (settings?.siteName ? `${settings.siteName}-এর গল্প` : "আমাদের গল্প");

  const description =
    settings?.aboutDescription ||
    "আমাদের যাত্রা শুরু প্রিমিয়াম মানের তাজা ও পুষ্টিকর খাদ্যপণ্য উৎপাদন ও বিতরণে বিশ্বস্ত নাম হিসেবে। আমরা কৃষকদের সাথে সরাসরি কাজ করি, নিশ্চিত করি সম্পূর্ণ কেমিক্যাল-মুক্ত এবং প্রাকৃতিক পণ্য। প্রতিটি অর্ডারে থাকে সতেজতা ও সেরা মানের নিশ্চয়তা।";

  // Stat 1: Total Orders
  const stat1Title = settings?.aboutStat1Title || "মোট অর্ডার";
  const stat1Value =
    settings?.aboutStat1ValueMode === "real"
      ? `${toBengaliNumber(settings?.realStats?.totalOrders ?? 0)}+`
      : settings?.aboutStat1CustomValue || "৫০০+";
  const stat1Subtitle = settings?.aboutStat1Subtitle || "গত সিজন";

  // Stat 2: Mango Varieties
  const stat2Title = settings?.aboutStat2Title || "আমের জাত";
  const stat2Value =
    settings?.aboutStat2ValueMode === "real"
      ? `${toBengaliNumber(settings?.realStats?.totalProducts ?? (products?.length || 11))}+`
      : settings?.aboutStat2CustomValue || "১১+";
  const stat2Subtitle = settings?.aboutStat2Subtitle || "সরাসরি বাগান থেকে";

  // Stat 3: Customer Satisfaction
  const stat3Title = settings?.aboutStat3Title || "গ্রাহক সন্তুষ্টি";
  const stat3Value =
    settings?.aboutStat3ValueMode === "real"
      ? `${toBengaliNumber(settings?.realStats?.satisfactionRate ?? 98)}%`
      : settings?.aboutStat3CustomValue || "৯৮%";
  const stat3Subtitle = settings?.aboutStat3Subtitle || "⭐ রিভিউ এর ভিত্তিতে";

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
            <div className="w-28 h-28 rounded-full ring ring-yellow-500 ring-offset-4 overflow-hidden shadow-xl mx-auto bg-amber-50">
              <img
                src={founderImg}
                alt="Aam Wala Vaiya Founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";
                }}
              />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-green-800">
            {title}
          </h3>

          <div className="divider w-24 mx-auto my-4 border-t-4 border-yellow-500 rounded-full" />

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4 max-w-3xl mx-auto">
            {description}
          </p>

          {/* Stats Bar */}
          <div className="stats stats-vertical sm:stats-horizontal shadow-xl mt-10 bg-white/75 backdrop-blur-sm border border-yellow-300 rounded-2xl w-full max-w-2xl mx-auto">
            <div className="stat place-items-center py-6 px-4">
              <div className="stat-title text-green-700 font-semibold">{stat1Title}</div>
              <div className="stat-value text-yellow-600 text-3xl md:text-4xl">{stat1Value}</div>
              <div className="stat-desc text-gray-500 font-medium">{stat1Subtitle}</div>
            </div>

            <div className="stat place-items-center py-6 px-4">
              <div className="stat-title text-green-700 font-semibold">{stat2Title}</div>
              <div className="stat-value text-green-600 text-3xl md:text-4xl">{stat2Value}</div>
              <div className="stat-desc text-gray-500 font-medium">{stat2Subtitle}</div>
            </div>

            <div className="stat place-items-center py-6 px-4">
              <div className="stat-title text-green-700 font-semibold">{stat3Title}</div>
              <div className="stat-value text-yellow-600 text-3xl md:text-4xl">{stat3Value}</div>
              <div className="stat-desc text-gray-500 font-medium">{stat3Subtitle}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
