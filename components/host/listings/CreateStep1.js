"use client";

import Image from "next/image";

export default function CreateStep1({ onNext }) {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm text-black font-bold uppercase">Step 1</h4>
          <h2 className="text-2xl font-bold mt-1 mb-2">
            Tell us about your place
          </h2>
          <p className="text-gray-600 max-w-md">
            In this step, we’ll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know
            the location and how many guests can stay
          </p>
        </div>
        <div>
          <Image
            src="/images/host/listings/two-houseplants.png"
            alt="Create Listing Illustration"
            width={300}
            height={315}
          />
        </div>
      </div>

      <hr className="mt-100 mb-8 border-gray-300" />

      <div className="mt-10 flex justify-end">
        {/* <button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium cursor-pointer"
        >
          Get Started
        </button> */}
      <div className="fixed bottom-0 left-56 w-[calc(100%-14rem)] border-t border-gray-300 px-6 py-4 flex justify-end items-center z-50 shadow">
  <button
    onClick={onNext}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-semibold cursor-pointer"
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
}

// 'use client';

// import Image from "next/image";

// export default function CreateStep1({ onNext, onBack }) {
//   return (
//     <div className="relative min-h-screen pl-56 pr-6 pb-24 pt-10"> {/* pl-56 for sidebar space */}
//       {/* Page Content */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h4 className="text-sm text-black font-bold uppercase">Step 1</h4>
//           <h2 className="text-2xl font-bold mt-1 mb-2">Tell us about your place</h2>
//           <p className="text-gray-600 max-w-md">
//             In this step, we’ll ask you which type of property you have and if
//             guests will book the entire place or just a room. Then let us know the
//             location and how many guests can stay.
//           </p>
//         </div>
//         <div>
//           <Image
//             src="/images/host/listings/two-houseplants.png"
//             alt="Create Listing Illustration"
//             width={300}
//             height={315}
//           />
//         </div>
//       </div>

//       <hr className="mt-20 mb-8 border-gray-300" />

//       {/* Fixed Bottom Buttons */}
//       <div className="fixed bottom-0 left-56 w-[calc(100%-14rem)] bg-white border-t border-gray-300 px-6 py-4 flex justify-between items-center z-50 shadow">
//         <button
//           onClick={onBack}
//           className="text-black underline text-sm font-semibold hover:text-gray-700"
//         >
//           Back
//         </button>

//         <button
//           onClick={onNext}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-semibold"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
