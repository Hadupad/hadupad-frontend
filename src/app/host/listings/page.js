"use client";

import { useState } from "react";
import useListings from "../../../../hooks/useListings";
import Image from "next/image";
import Sidebar from "../../../../components/host/Sidebar";
import Navbar from "../../../../components/host/Navbar";
import SubHeader from "../../../../components/host/listings/SubHeader";
import CreateListingFlow from "../../../../components/host/listings/CreateListingFlow";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      <main className="ml-56 p-6 pt-30 space-y-6">
        {step === 0 && (
          <SubHeader onCreateClick={() => setStep(1)} />
        )}

        {step > 0 ? (
          renderStep()
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center p-8 max-w-md">
              <p className="text-gray-500 text-lg">You have no listings yet</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {listings.map((item) => (
              <div key={item.id} className="flex flex-col text-left">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

