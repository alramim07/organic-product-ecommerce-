import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLightbulb } from 'react-icons/fa'

const funFacts = [
  "আম বাংলাদেশের জাতীয় ফল!",
  "বিশ্বে ১০০০+ প্রজাতির আম আছে!",
  "আমে ভিটামিন সি প্রচুর পরিমাণে থাকে!",
  "বাংলাদেশের রাজশাহী আমের জন্য বিখ্যাত!",
  "কাঁচা আম দিয়ে চাটনি ও আচার তৈরি হয়!",
]

export default function FunFacts() {
  const [currentFact, setCurrentFact] = useState(0)

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length)
  }

  return (
    <section className="py-8 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FaLightbulb className="text-white text-xl" />
          </div>
          <span className="text-white font-bold text-lg">দিদি জানেন?</span>
        </div>
        <motion.p
          key={currentFact}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-white text-lg font-medium text-center flex-1"
        >
          {funFacts[currentFact]}
        </motion.p>
        <button
          onClick={nextFact}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-all"
        >
          পরবর্তী →
        </button>
      </div>
    </section>
  )
}
