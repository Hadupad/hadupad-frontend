"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import SubHeader from "../../../../components/host/listings/SubHeader";
import CreateListingFlowV2 from "../../../../components/host/listings/CreateListingFlowV2";
import { getHostProperties } from "@/redux/slices/hostPropertySlice";

export default function Listings() {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.properties);
  const [step, setStep] = useState(0);

  useEffect(() => {
    dispatch(getHostProperties());
  }, [dispatch]);

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
        >
          <div className="relative w-full h-48 bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 mt-30">
      {step === 0 && <SubHeader onCreateClick={() => setStep(1)} />}

      {step > 0 ? (
        <CreateListingFlowV2 />
      ) : loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-xl font-normal text-gray-900 mb-2">
              Error: {error}
            </h2>
          </div>
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-xl font-normal text-gray-900 mb-2">
              You have no listings yet
            </h2>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.photos[0]}
                  alt={'image url'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.city}, {item.state}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}