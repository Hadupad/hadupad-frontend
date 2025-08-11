"use client";

import { CalendarCheck, Zap } from "lucide-react";

export default function BookingControls() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Check-in Booking */}
      <div className="p-4 bg-white rounded-xl shadow">
        <p className="mb-2 font-medium text-center">Check-in Booking</p>
        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <CalendarCheck className="w-4 h-4" />
            CHECK-IN
          </button>
        </div>
      </div>

      {/* Instant Booking */}
      <div className="p-4 bg-white rounded-xl shadow">
        <p className="mb-2 font-medium text-center">Instant Booking</p>
        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            TURN OFF
          </button>
        </div>
      </div>
    </div>
  );
}
