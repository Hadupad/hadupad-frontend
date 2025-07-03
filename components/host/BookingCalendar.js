// "use client";

// import { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import Image from "next/image";

// export default function BookingCalendar() {
//   const [dateRange, setDateRange] = useState([new Date(), new Date()]);

//   return (
//     <div className="relative w-full h-[395px] rounded-xl overflow-hidden shadow-md">
//       {/* Background Image */}
//       <Image
//         src="/images/host/calendar-bg.jpg"
//         alt="Booking Background"
//         fill
//         className="object-cover"
//         priority
//       />

//       {/* Calendar on top of the image */}
//       <div className="absolute inset-0 z-10 p-4 flex items-center justify-center">
//         <div className="rounded-xl bg-white p-3 w-full max-w-sm">
//           <h2 className="text-lg font-bold mb-3 text-center">
//             Booking Timeline
//           </h2>
//           <Calendar
//             locale="en-US"
//             onChange={setDateRange}
//             value={dateRange}
//             selectRange={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

export default function BookingCalendar() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [range, setRange] = useState({ from: undefined, to: undefined });

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
        <div className="rounded-xl bg-white p-3 w-full max-w-2xl">
          <h2 className="text-lg font-bold mb-3 text-center">
            Booking Timeline
          </h2>
          <Calendar
            locale="en-US"
            onChange={setDateRange}
            value={dateRange}
            selectRange={true}
            showDoubleView={true}
          />
        </div>
      </div>
      great
      <div className="mt-4 text-sm">
        {range.from && range.to && (
          <p>
            You selected from <strong>{range.from.toDateString()}</strong> to{" "}
            <strong>{range.to.toDateString()}</strong>
          </p>
        )}
      </div>
      <div className="flex gap-4 mt-6 items-center justify-end text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#EF4F24] rounded"></div>
          Check-In Dates
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          Booking Timelines Indicator
        </div>
      </div>
    </div>
  );
}
