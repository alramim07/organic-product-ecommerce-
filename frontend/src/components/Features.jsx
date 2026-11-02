import { motion } from "framer-motion";
import { FaTruck, FaLeaf, FaHeadset, FaMedal } from "react-icons/fa";

const features = [
  { icon: FaTruck, title: "সারাদেশ ডেলিভারি", subtitle: "দ্রুত ও নিরাপদ" },
  { icon: FaLeaf, title: "গুনগত মান", subtitle: "সতেজ ও বিশুদ্ধ" },
  { icon: FaHeadset, title: "২৪/৭ সাপোর্ট", subtitle: "যেকোনো সময় যোগাযোগ" },
  {
    icon: FaMedal,
    title: "প্রিমিয়াম কোয়ালিটি",
    subtitle: "বাগান থেকে সরাসরি",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-800 py-12 text-white md:py-16">
      <motion.div
        className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Icon className="text-3xl" />
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="mt-1 text-sm text-green-200">{feature.subtitle}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
