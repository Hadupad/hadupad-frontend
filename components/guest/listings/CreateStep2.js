

"use client";

import Image from "next/image";
import BottomNav from "./BottomNav";


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
        {/* <div className="fixed bottom-0 left-56 w-[calc(100%-14rem)] border-t border-gray-300 px-6 py-4 flex justify-between items-center z-50 shadow">
        <button
          
          className="text-black underline text-sm font-semibold hover:text-gray-700"
        >
            onClick={onBack}
          Back
        </button>

        <button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-semibold"
        >
          Next
        </button>
      </div> */}

       <div className="mb-2">
                <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
              </div>
    </div>
  );
}
