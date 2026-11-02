import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaWhatsapp, FaYoutube, FaPhone } from "react-icons/fa";

const socialButtons = [
  {
    icon: FaFacebook,
    color: "bg-blue-600",
    link: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaWhatsapp,
    color: "bg-green-500",
    link: "https://wa.me/8801749775030",
    label: "WhatsApp",
  },
  {
    icon: FaYoutube,
    color: "bg-red-600",
    link: "#",
    label: "YouTube",
  },
  {
    icon: FaPhone,
    color: "bg-amber-500",
    link: "tel:01749775030",
    label: "Phone",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function FloatingSocial() {
  return (
    <motion.div
      className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-3 z-40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialButtons.map(({ icon: Icon, color, link, label }) => (
        <motion.a
          key={label}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`${color} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`}
        >
          <Icon className="text-lg" />
        </motion.a>
      ))}
    </motion.div>
  );
}
