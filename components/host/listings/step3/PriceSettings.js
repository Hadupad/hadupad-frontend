// "use client";

// import { MdEdit } from "react-icons/md";

// export default function PriceSettings() {
//   return (
//     <div className="w-full flex flex-col gap-2 items-center">
//       {/* Headings */}
//       <h2 className="text-2xl font-semibold leading-snug text-center">
//         Now, set your price per night
//       </h2>
//       <p className="text-gray-400 text-sm mb-8">You can change it anytime</p>
//       <div className="flex items-baseline mb-10">
//         <span className="text-[86.85px] font-semibold leading-none">#</span>
//         <div className="flex items-baseline">
//           <p className="text-[86.85px] font-semibold leading-none pl-4">
//             50,000
//           </p>
//           <div className="relative w-6 h-6 ml-2">
//             {/* Light circle */}
//             <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
//               {/* Edit icon centered */}
//               <MdEdit className="text-gray-700 text-xs" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Price Breakdown Box */}
//       <div className="flex flex-col items-center gap-4">
//         <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
//           <div className="p-4 space-y-3">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">Base Price</p>
//               <p className="text-sm text-black">₦50,000</p>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">Caution Fee</p>
//               <p className="text-sm text-black">₦10,000</p>
//             </div>
//           </div>
//           <div className="p-4">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">Guest prices before taxes</p>
//               <p className="text-sm text-black">₦50,000</p>
//             </div>
//           </div>
//         </div>

//         {/* You Earn Box */}
//         <div className="border border-black/10 rounded-md divide-y w-[230px]">
//           <div className="p-4">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">You earn</p>
//               <p className="text-sm text-black">₦50,000</p>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// "use client";

// import { MdEdit } from "react-icons/md";
// import BottomNav from "../BottomNav";
// import SaveExitButton from "../SaveExitButton";

// export default function PriceSettings({ onBack, onNext, handleSaveExit }) {
//   return (
//     <>
//       <SaveExitButton onClick={handleSaveExit} />

//       <div className="w-full flex flex-col gap-2 items-center pb-10">
//         {" "}
       
//         <h2 className="text-2xl font-semibold leading-snug text-center">
//           Now, set your price per night
//         </h2>
//         <p className="text-gray-400 text-sm mb-8">You can change it anytime</p>
//         {/* Price Display */}
//         <div className="flex items-baseline mb-2">
//           <span className="text-[86.85px] font-semibold leading-none">#</span>
//           <div className="flex items-baseline">
//             <p className="text-[86.85px] font-semibold leading-none pl-4">
//               50,000
//             </p>
//             <div className="relative w-6 h-6 ml-2">
//               {/* Light circle */}
//               <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
//                 {/* Edit icon centered */}
//                 <MdEdit className="text-gray-700 text-xs" />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Price Breakdown Boxes */}
//         <div className="flex flex-col items-center gap-4 mb-8">
//           {" "}
//           {/* Added mb-8 for spacing */}
//           <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
//             <div className="p-4 space-y-3">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-black">Base Price</p>
//                 <p className="text-sm text-black">₦50,000</p>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-black">Caution Fee</p>
//                 <p className="text-sm text-black">₦10,000</p>
//               </div>
//             </div>
//             <div className="p-4">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-black">Guest prices before taxes</p>
//                 <p className="text-sm text-black">₦50,000</p>
//               </div>
//             </div>
//           </div>
//           <div className="border border-black/10 rounded-md divide-y w-[230px]">
//             <div className="p-4">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm text-black">You earn</p>
//                 <p className="text-sm text-black">₦50,000</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Bottom Navigation */}
//         <div className="fixed bottom-0 left-0 right-0">
//           <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { MdEdit } from "react-icons/md";
import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";

export default function PriceSettings({ onBack, onNext, handleSaveExit }) {
  return (
   

    <>
          <SaveExitButton onClick={handleSaveExit} />
    
      <div className=" flex flex-col items-center justify-between -mt-15">
        {/* Top Section */}
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-2xl font-semibold leading-snug text-center">
            Now, set your price per night
          </h2>
          <p className="text-gray-400 text-sm mt-1">You can change it anytime</p>

          {/* Price Display */}
          <div className="flex items-baseline mt-10">
            <span className="text-[86.85px] font-semibold leading-none">#</span>
            <p className="text-[86.85px] font-semibold leading-none pl-4">50,000</p>
            <div className="relative w-6 h-6 ml-2 mt-2">
              <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
                <MdEdit className="text-gray-700 text-xs" />
              </div>
            </div>
          </div>

          {/* Price Breakdown Boxes */}
          <div className="flex flex-col items-center gap-4">
            <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black">Base Price</p>
                  <p className="text-sm text-black">₦50,000</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black">Caution Fee</p>
                  <p className="text-sm text-black">₦10,000</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black">Guest prices before taxes</p>
                  <p className="text-sm text-black">₦50,000</p>
                </div>
              </div>
            </div>
            <div className="border border-black/10 rounded-md w-[230px] p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-black">You earn</p>
                <p className="text-sm text-black">₦50,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - naturally at the bottom */}
        <div className="mb-2">
          <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
        </div>
      </div>
      </>
  );
}


// "use client";

// import { MdEdit } from "react-icons/md";

// import BottomNav from "../BottomNav";
// import SaveExitButton from "../SaveExitButton";

// export default function PriceSettings({ onBack, onNext, handleSaveExit }) {
//   return (
//     //     <div className="w-full flex flex-col gap-2 items-center">
//     //       {/* Headings */}
//     //       <h2 className="text-2xl font-semibold leading-snug text-center">
//     //         Now, set your price per night
//     //       </h2>
//     //       <p className="text-gray-400 text-sm mb-8">You can change it anytime</p>
//     //       <div className="flex items-baseline mb-10">
//     //         <span className="text-[86.85px] font-semibold leading-none">#</span>
//     //         <div className="flex items-baseline">
//     //           <p className="text-[86.85px] font-semibold leading-none pl-4">
//     //             50,000
//     //           </p>
//     //           <div className="relative w-6 h-6 ml-2">
//     //             {/* Light circle */}
//     //             <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
//     //               {/* Edit icon centered */}
//     //               <MdEdit className="text-gray-700 text-xs" />
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>

//     //       {/* Price Breakdown Box */}
//     //       <div className="flex flex-col items-center gap-4">
//     //         <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
//     //           <div className="p-4 space-y-3">
//     //             <div className="flex justify-between items-center">
//     //               <p className="text-sm text-black">Base Price</p>
//     //               <p className="text-sm text-black">₦50,000</p>
//     //             </div>
//     //             <div className="flex justify-between items-center">
//     //               <p className="text-sm text-black">Caution Fee</p>
//     //               <p className="text-sm text-black">₦10,000</p>
//     //             </div>
//     //           </div>
//     //           <div className="p-4">
//     //             <div className="flex justify-between items-center">
//     //               <p className="text-sm text-black">Guest prices before taxes</p>
//     //               <p className="text-sm text-black">₦50,000</p>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         {/* You Earn Box */}
//     //         <div className="border border-black/10 rounded-md divide-y w-[230px]">
//     //           <div className="p-4">
//     //             <div className="flex justify-between items-center">
//     //               <p className="text-sm text-black">You earn</p>
//     //               <p className="text-sm text-black">₦50,000</p>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //  <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
//     //     </div>
// <>
//  <SaveExitButton onClick={handleSaveExit} />
//     <div
//       className="flex flex-col items-center absolute"
//       style={{
//         width: "613px",
//         height: "449.76px",
//         top: "",
//         left: "519px",
//         gap: "10px",
//       }}
//     >
        

//       {/* Headings */}
//       <div className="flex flex-col items-center">
//         <h2 className="text-2xl font-semibold leading-snug text-center">
//           Now, set your price per night
//         </h2>
//         <p className="text-gray-400 text-sm">You can change it anytime</p>
//       </div>

//       {/* Price Display */}
//       <div className="flex items-baseline">
//         <span className="text-[86.85px] font-semibold leading-none">#</span>
//         <div className="flex items-baseline">
//           <p className="text-[86.85px] font-semibold leading-none pl-4">
//             50,000
//           </p>
//           <div className="relative w-6 h-6 ml-2">
//             <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
//               <MdEdit className="text-gray-700 text-xs" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Price Breakdown Boxes */}
//       <div className="flex flex-col items-center" style={{ gap: "40px" }}>
//         <div
//           className="border border-black/50 rounded-md divide-y divide-black/10"
//           style={{ width: "230px" }}
//         >
//           <div className="p-4 space-y-3">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">Base Price</p>
//               <p className="text-sm text-black">₦50,000</p>
//             </div>
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">Caution Fee</p>
//               <p className="text-sm text-black">₦10,000</p>
//             </div>
//           </div>
//           <div className="p-4">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">Guest prices before taxes</p>
//               <p className="text-sm text-black">₦50,000</p>
//             </div>
//           </div>
//         </div>

//         <div
//           className="border border-black/10 rounded-md divide-y"
//           style={{ width: "230px" }}
//         >
//           <div className="p-4">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-black">You earn</p>
//               <p className="text-sm text-black">₦50,000</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
//     </div>
    
// </>
//   );
// }
