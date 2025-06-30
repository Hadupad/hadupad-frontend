"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";

export default function BookingCalendar() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  return (
    <div className="relative w-full h-[395px] rounded-xl overflow-hidden shadow-md">
      {/* Background Image */}
      <Image
        src="/images/host/calendar-bg.jpg"
        alt="Booking Background"
        fill
        className="object-cover"
        priority
      />

      {/* Calendar on top of the image */}
      <div className="absolute inset-0 z-10 p-4 flex items-center justify-center">
  <div className="rounded-xl bg-white p-3 w-full max-w-sm">
    <h2 className="text-lg font-bold mb-3 text-center">Booking Timeline</h2>
    <Calendar
    locale="en-US"
      onChange={setDateRange}
      value={dateRange}
      selectRange={true}
    />
  </div>
</div>

    </div>
  );
}
