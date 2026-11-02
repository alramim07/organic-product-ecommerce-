import { useState, useEffect, useRef } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function ScheduleDateTimePicker({
  initialValue,
  onConfirm,
  onCancel,
}) {
  const now = new Date();

  // Parse initial value or default to now
  const parsedDate = initialValue ? new Date(initialValue) : now;
  const validParsed = isNaN(parsedDate.getTime()) ? now : parsedDate;

  // State
  const [selectedYear, setSelectedYear] = useState(validParsed.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(validParsed.getMonth()); // 0-11
  const [selectedDay, setSelectedDay] = useState(validParsed.getDate());

  // Time state (12-hour format for clock display)
  const initialHours24 = validParsed.getHours();
  const [hour12, setHour12] = useState(
    initialHours24 % 12 === 0 ? 12 : initialHours24 % 12
  );
  const [minute, setMinute] = useState(validParsed.getMinutes());
  const [period, setPeriod] = useState(initialHours24 >= 12 ? "PM" : "AM");
  const [clockMode, setClockMode] = useState("hours"); // 'hours' or 'minutes'

  const clockRef = useRef(null);

  // Month Names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Days in selected month
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();

  // Navigation
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  // Clock Hand Calculations
  // Hour hand angle: (hour % 12 + min / 60) * 30
  const hourAngle = ((hour12 % 12) + minute / 60) * 30;
  // Minute hand angle: minute * 6
  const minuteAngle = minute * 6;

  // Handle click on clock face
  const handleClockClick = (e) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    // Angle in degrees from 12 o'clock (0 deg) clockwise
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    if (clockMode === "hours") {
      let h = Math.round(angle / 30);
      if (h === 0) h = 12;
      setHour12(h);
      // Auto switch to minutes for great UX
      setClockMode("minutes");
    } else {
      let m = Math.round(angle / 6);
      if (m === 60) m = 0;
      setMinute(m);
    }
  };

  // Build combined ISO or formatted datetime string
  const handleSave = () => {
    let hours24 = hour12 % 12;
    if (period === "PM") hours24 += 12;

    const d = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      hours24,
      minute,
      0
    );

    // Format local ISO: YYYY-MM-DDTHH:mm
    const pad = (n) => String(n).padStart(2, "0");
    const formattedLocal = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

    onConfirm(formattedLocal, d);
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-amber-200 p-4 sm:p-6 w-full max-w-xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold shadow-sm">
            <FaClock />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-gray-900">
              Interactive Schedule Date & Time
            </h3>
            <p className="text-[11px] text-gray-500">
              Pick date on calendar and set time with the analog clock
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Grid: Calendar on Left, Analog Clock on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* ================= CALENDAR ================= */}
        <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-800">
              {monthNames[selectedMonth]} {selectedYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 hover:bg-gray-200 rounded-lg text-gray-600 transition cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 hover:bg-gray-200 rounded-lg text-gray-600 transition cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {dayNames.map((d) => (
              <span
                key={d}
                className="text-[10px] font-bold text-gray-400 uppercase py-0.5"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty offset days */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <span key={`empty-${i}`} className="w-7 h-7" />
            ))}

            {/* Month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;
              const isToday =
                now.getDate() === day &&
                now.getMonth() === selectedMonth &&
                now.getFullYear() === selectedYear;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`w-7 h-7 text-xs font-bold rounded-lg flex items-center justify-center transition cursor-pointer ${
                    isSelected
                      ? "bg-amber-600 text-white shadow-md font-black scale-105"
                      : isToday
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-[11px]">
            <button
              type="button"
              onClick={() => {
                setSelectedYear(now.getFullYear());
                setSelectedMonth(now.getMonth());
                setSelectedDay(now.getDate());
              }}
              className="text-amber-700 hover:underline font-bold cursor-pointer"
            >
              Today
            </button>
            <span className="font-mono text-gray-500 font-semibold">
              {selectedYear}-{pad(selectedMonth + 1)}-{pad(selectedDay)}
            </span>
          </div>
        </div>

        {/* ================= ANALOG CLOCK ================= */}
        <div className="flex flex-col items-center justify-between space-y-3 bg-gradient-to-b from-amber-50/50 to-orange-50/30 p-3.5 rounded-2xl border border-amber-200">
          {/* Mode Tabs & AM/PM Toggle */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setClockMode("hours")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  clockMode === "hours"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Hour ({hour12})
              </button>
              <button
                type="button"
                onClick={() => setClockMode("minutes")}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  clockMode === "minutes"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Min ({pad(minute)})
              </button>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPeriod("AM")}
                className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                  period === "AM"
                    ? "bg-yellow-500 text-green-950 font-black shadow-sm"
                    : "text-gray-500"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => setPeriod("PM")}
                className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                  period === "PM"
                    ? "bg-yellow-500 text-green-950 font-black shadow-sm"
                    : "text-gray-500"
                }`}
              >
                PM
              </button>
            </div>
          </div>

          {/* Clock Dial Face */}
          <div
            ref={clockRef}
            onClick={handleClockClick}
            className="w-44 h-44 rounded-full bg-white border-4 border-amber-400 shadow-inner relative flex items-center justify-center cursor-pointer select-none group"
            title={`Click on the clock dial to set ${clockMode}`}
          >
            {/* Center Pivot Pin */}
            <div className="w-3.5 h-3.5 rounded-full bg-amber-700 z-30 shadow-md ring-2 ring-white" />

            {/* Hour Hand */}
            <div
              style={{
                transform: `rotate(${hourAngle}deg)`,
                transformOrigin: "bottom center",
                height: "46px",
                bottom: "50%",
                left: "calc(50% - 2.5px)",
              }}
              className="absolute w-[5px] bg-gray-800 rounded-full z-20 transition-transform duration-200"
            />

            {/* Minute Hand */}
            <div
              style={{
                transform: `rotate(${minuteAngle}deg)`,
                transformOrigin: "bottom center",
                height: "64px",
                bottom: "50%",
                left: "calc(50% - 1.5px)",
              }}
              className="absolute w-[3px] bg-amber-600 rounded-full z-20 transition-transform duration-150"
            />

            {/* 12 Hour Numbers along the circumference */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
              const angle = num * 30 - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 64; // distance from center in px
              const x = Math.round(radius * Math.cos(rad));
              const y = Math.round(radius * Math.sin(rad));

              const isCurrentHour = clockMode === "hours" && hour12 === num;

              return (
                <div
                  key={num}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                    isCurrentHour
                      ? "bg-amber-600 text-white scale-125 z-10 shadow"
                      : "text-gray-700 hover:text-amber-700"
                  }`}
                >
                  {num}
                </div>
              );
            })}
          </div>

          {/* Digital Readout */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-base font-black text-amber-900 bg-white px-3 py-1 rounded-xl border border-amber-300 font-mono shadow-sm">
              {pad(hour12)} : {pad(minute)} {period}
            </span>
            <span className="text-[10px] text-gray-400">
              (Click dial to adjust)
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-gray-600 font-bold">
          <span className="text-gray-400">Scheduled for: </span>
          <span className="text-amber-800">
            {monthNames[selectedMonth]} {selectedDay}, {selectedYear} at {pad(hour12)}:{pad(minute)} {period}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white text-xs font-extrabold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <FaCheck /> Confirm & Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
