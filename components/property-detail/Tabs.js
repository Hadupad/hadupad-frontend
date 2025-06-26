"use client";
import { useState } from "react";
import HostInfo from "./HostInfo";
import Reviews from "./Reviews";
import BasicInfo from "./BasicInfo";
import Description from "./Description";
import LocationInfo from "./LocationInfo";
import AmenitiesInfo from "./AmenitiesInfo";
import InstructionInfo from "./InstructionInfo";
import BookingCard from "./BookingCard";

const tabList = [
  { label: "Details" },
  { label: "Description" },
  { label: "Location" },
  { label: "Amenities" },
  { label: "Instruction" },
];

export default function Tabs({ data }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mb-8">
      <div className="flex">
        <div className="flex gap-8 border-b border-gray-200">
          {tabList.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActive(idx)}
              className={`py-3 px-6 text-xl font-semibold transition-all
              ${
                active === idx
                  ? "border-b-2 border-[#B94D3A] text-[#B94D3A] bg-white"
                  : "text-gray-500 hover:text-[#B94D3A] border-b-2 border-transparent"
              }
            `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
      </div>

      <div className="p-6 bg-white rounded-b-xl shadow-sm">
        {/* Render tab content here based on active */}
        {active === 0 && (
          <div>
            <BasicInfo />
            <HostInfo />
            <Reviews />
          </div>
        )}
        {active === 1 && (
          <div>
            <Description />
          </div>
        )}
        {active === 2 && (
          <div>
            <LocationInfo />
          </div>
        )}
        {active === 3 && (
          <div>
            <AmenitiesInfo />
          </div>
        )}
        {active === 4 && (
          <div>
            <InstructionInfo />
          </div>
        )}
      </div>
    </div>
  );
}
