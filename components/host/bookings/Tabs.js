// "use client";
// import { useState } from "react";

// import Reservations from "./Reservations";
// import Calendar from "./Calendar";


// const tabList = [
//   { label: "Reservations" },
//   { label: "Calendar" },
// ];

// export default function Tabs({ data }) {
//   const [active, setActive] = useState(0);

//   return (
//     <div className="mb-8">
//       <div className="relative">
//         {/* Gray HR line above all tabs */}
//         <hr className="absolute top-0 left-0 right-0 border-t border-gray-200" />
        
//         <div className="flex">
//           <div className="flex relative pt-[1px]"> {/* Removed gap-8 since we only have two tabs */}
//             {tabList.map((tab, idx) => (
//               <button
//                 key={tab.label}
//                 onClick={() => setActive(idx)}
//                 className={`py-3 px-6 text-xl font-semibold transition-all relative
//                   ${
//                     active === idx
//                       ? "text-[#B94D3A] "
//                       : "text-gray-500 hover:text-[#B94D3A]"
//                   }
//                 `}
//               >
//                 {tab.label}
//                 {active === idx && (
//                   <div className="absolute top-[-1px] left-0 right-0 h-[2px] bg-[#B94D3A]"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="">
//         {/* Render tab content here bassed on active */}
//         {active === 0 && <div><Reservations /></div>}
//         {active === 1 && <div><Calendar /></div>}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Reservations from "./Reservations";
import Calendar from "./Calendar";

const tabs = [
  { label: "Reservations", component: <Reservations /> },
  { label: "Calendar", component: <Calendar /> }
];

export default function Tabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-2">
      {/* Tabs Navigation */}
      <div className="relative border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-2 font-medium relative
                ${
                  activeTab === idx
                    ? "text-[#B94D3A]"
                    : "text-gray-500 hover:text-[#B94D3A]"
                }`
              }
            >
              {tab.label}
              {activeTab === idx && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#B94D3A]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {tabs[activeTab].component}
      </div>
    </div>
  );
}