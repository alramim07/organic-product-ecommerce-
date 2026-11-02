import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaCalendarAlt } from "react-icons/fa";

export default function CalendarDropdown({ value, onSelect, onClose }) {
  const dropdownRef = useRef(null);
  const now = new Date();

  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-11
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  const monthNamesBn = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    const bnMonth = monthNamesBn[currentMonth];
    const enMonth = monthNamesEn[currentMonth];
    const formattedBn = `${day} ${bnMonth} ${currentYear} থেকে ডেলিভারি`;
    onSelect(formattedBn, { day, month: currentMonth + 1, year: currentYear });
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-blue-200 p-4 space-y-3 animate-fadeIn"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <span className="text-xs font-black text-blue-950 flex items-center gap-1.5">
          <FaCalendarAlt className="text-blue-600" />
          {monthNamesBn[currentMonth]} {currentYear}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition cursor-pointer"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition cursor-pointer"
          >
            <FaChevronRight className="text-xs" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer ml-1"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"].map((d) => (
          <span key={d} className="text-[10px] font-bold text-gray-400">
            {d}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <span key={`empty-${i}`} className="w-8 h-8" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isSelected = selectedDay === day;
          const isToday =
            now.getDate() === day &&
            now.getMonth() === currentMonth &&
            now.getFullYear() === currentYear;

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDaySelect(day)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white font-black shadow-md scale-105"
                  : isToday
                  ? "bg-blue-50 text-blue-800 border border-blue-300"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer Quick Pick */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
        <button
          type="button"
          onClick={() => {
            const today = now.getDate();
            setCurrentYear(now.getFullYear());
            setCurrentMonth(now.getMonth());
            handleDaySelect(today);
          }}
          className="text-blue-700 hover:underline font-bold cursor-pointer"
        >
          আজকের তারিখ
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
