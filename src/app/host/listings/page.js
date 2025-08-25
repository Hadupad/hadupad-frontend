"use client";

import { useState } from "react";
import useListings from "../../../../hooks/useListings";
import Image from "next/image";
import SubHeader from "../../../../components/host/listings/SubHeader";
import CreateListingFlow from "../../../../components/host/listings/CreateListingFlow";
import CreateListingFlowV2 from "../../../../components/host/listings/CreateListingFlowV2";

export default function Listings() {
  const listings = useListings();
  const [step, setStep] = useState(0); // 0 = default view, 1+ = create steps

  const renderStep = () => {
    if (step > 0) {
      return <CreateListingFlow />;
    }
    return null;
  };

  return (
    <div className="space-y-6 mt-30">
      {step === 0 && (
        <SubHeader onCreateClick={() => setStep(1)} />
      )}

      {step > 0 ? (
        <CreateListingFlowV2 />
      ) : listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-xl font-normal text-gray-900 mb-2">You have no listings yet</h2>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

