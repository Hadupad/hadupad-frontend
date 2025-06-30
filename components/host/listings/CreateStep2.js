// "use client";

// import Image from "next/image";

// export default function CreateStep2() {
//   return (
//     <div className="">
//       <div className="flex justify-between items-center">
//         <div>
//           <h4 className="text-sm text-black font-bold uppercase">Step 1</h4>
//           <h2 className="text-2xl font-bold mt-1 mb-2">Tell us about your place</h2>
//           <p className="text-gray-600 max-w-md">
//             In this step, we’ll ask you which type of property you have and if
//             guests will book the entire place or just a room. Then let us know the
//             location and how many guests can stay
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

//       {/* Horizontal Rule with added spacing above */}
//       <hr className="mt-25 mb-8 border-gray-300" />

//       {/* Button with margin above */}
//       <div className="mt-10 flex justify-end">
//         <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";

export default function CreateStep2({ onNext, onBack }) {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm text-black font-bold uppercase">Step 2</h4>
          <h2 className="text-2xl font-bold mt-1 mb-2">Add some details</h2>
          <p className="text-gray-600 max-w-md">
            Provide more information like amenities, pricing, and availability.
          </p>
        </div>
        <div>
          <Image
            src="/images/host/listings/two-houseplants.png"
            alt="Step 2 Illustration"
            width={300}
            height={315}
          />
        </div>
      </div>


      {/* <div className="mt-10 flex justify-between">
        <p
          onClick={onBack}
          className="text-black font-bold text-sm cursor-pointer hover:underline"
        >
          Back
        </p>

        <button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium"
        >
          Next
        </button>
      </div> */}
        <div className="fixed bottom-0 left-56 w-[calc(100%-14rem)] border-t border-gray-300 px-6 py-4 flex justify-between items-center z-50 shadow">
        <button
          
          className="text-black underline text-sm font-semibold hover:text-gray-700"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
