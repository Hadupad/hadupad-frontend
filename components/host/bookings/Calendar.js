"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Settings from "./Settings";

export default function BookingCalendar() {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  return (
    // <div className="p-6 bg-white rounded-lg shadow-md">
    //   <h2 className="text-lg font-semibold mb-4">Booking Timeline</h2>

    //   <DayPicker
    //     mode="range"
    //     selected={range}
    //     onSelect={setRange}
    //     numberOfMonths={2}
    //     pagedNavigation
    //     fromMonth={new Date()}
    //     toYear={new Date().getFullYear() + 2}
    //     showOutsideDays
    //   />

    //   <div className="mt-4 text-sm">
    //     {range.from && range.to && (
    //       <p>
    //         You selected from <strong>{range.from.toDateString()}</strong> to{" "}
    //         <strong>{range.to.toDateString()}</strong>
    //       </p>
    //     )}
    //   </div>
    //    <div className="flex gap-4 mt-6 items-center justify-end text-xs text-gray-700">
    //     <div className="flex items-center gap-2">
    //       <div className="w-4 h-4 bg-[#EF4F24] rounded"></div>
    //       Check-In Dates
    //     </div>
    //     <div className="flex items-center gap-2">
    //       <div className="w-4 h-4 bg-gray-200 rounded"></div>
    //       Booking Timelines Indicator
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-row w-full gap-2 p-2">
      {/* Booking Timeline - takes 2/3 of the width */}
      <div className="w-2/3 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Booking Timeline</h2>
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          pagedNavigation
          fromMonth={new Date()}
          toYear={new Date().getFullYear() + 2}
          showOutsideDays
        />
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

      <div className="w-1/3 p-2 rounded-lg shadow-md">
     <Settings />
     </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// export default function BookingCalendar() {
//   const [range, setRange] = useState({ from: undefined, to: undefined });

//   return (
//     <>
//       {/* <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//         <div className="p-6 bg-white rounded-lg shadow-md">
//           <style>{`
//         .rdp-day_selected,
//         .rdp-day_range_start,
//         .rdp-day_range_end,
//         .rdp-day_range_middle {
//           background-color: #EF4F24 !important;
//           color: white !important;
//         }

//         .rdp-day:focus {
//           outline: none;
//           box-shadow: none;
//         }
//       `}</style>

//           <h2 className="text-lg font-semibold mb-4">Booking Timeline</h2>

//           <DayPicker
//             mode="range"
//             selected={range}
//             onSelect={setRange}
//             numberOfMonths={3}
//             pagedNavigation
//             fromMonth={new Date()}
//             toYear={new Date().getFullYear() + 2}
//             showOutsideDays
//           />

//           <div className="mt-4 text-sm">
//             {range.from && range.to && (
//               <p>
//                 You selected from <strong>{range.from.toDateString()}</strong>{" "}
//                 to <strong>{range.to.toDateString()}</strong>
//               </p>
//             )}
//           </div>

//           <div className="flex gap-4 mt-6 items-center justify-end text-xs text-gray-700">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-[#EF4F24] rounded"></div>
//               Check-In Dates
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-gray-200 rounded"></div>
//               Booking Timelines Indicator
//             </div>
//           </div>
//         </div>
//         </div>
//         <div className="sticky top-4 h-fit">

//         </div>
//       </div> */}

//     </>
//   );
// }
