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

      <div className="w-full flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold mt-1 mb-2">
          Pick your booking setting
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelected(option.label)}
              className={`w-[644px] border rounded-xl px-6 py-4 text-left flex justify-between items-center ${
                selected === option.label ? "border-black" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col justify-center">
                <p className="font-medium text-lg mb-1">{option.label}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <div className="flex items-center justify-center">
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
