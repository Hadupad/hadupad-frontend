"use client";

import { useState } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";
import BottomNav from "../BottomNav";

import SaveExitButton from "../SaveExitButton";

export default function BookingSetting({ onNext, onBack, handleSaveExit }) {
  const [selected, setSelected] = useState("An entire place");

  const options = [
    {
      label: "Approve Bookings",
      description:
        "Here, you can review reservation request and either accept or decline.",
      icon: <FaRegCalendarCheck size={32} />,
    },
    {
      label: "Instant Booking",
      description: "Let guests book automatically",
      icon: <BiSolidZap size={32} />,
    },
  ];

  return (
    <>
      <SaveExitButton onClick={handleSaveExit} />

      <div className="w-full flex flex-col gap-4 sm:gap-6 items-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold mt-1 mb-2 text-center">
          Pick your booking setting
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-2xl">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelected(option.label)}
              className={`w-full border rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start transition-all hover:shadow-md ${
                selected === option.label ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex flex-col justify-center flex-1 pr-3">
                <p className="font-medium text-base sm:text-lg mb-1">{option.label}</p>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{option.description}</p>
              </div>
              <div className="flex items-center justify-center flex-shrink-0">
                {option.icon}
              </div>
            </button>
          ))}
        </div>

        <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
      </div>
    </>
  );
}
