

// components/PropertyTypeSelector.js
"use client";

import { useState } from "react";

import { MdHome, MdApartment } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import BottomNav from "../BottomNav";

import SaveExitButton from "../SaveExitButton";


export default function PropertyTypeSelector({ onNext, onBack, handleSaveExit }) {
  const [selected, setSelected] = useState("House");

  const types = [
    { name: "House", icon: <MdHome size={24} /> },
    { name: "Apartment", icon: <MdApartment size={24} /> },
    { name: "Cabin", icon: <GiWoodCabin size={24} /> },
  ];

  return (
<>
          <SaveExitButton onClick={handleSaveExit} />

    <div className="w-full flex flex-col items-center px-4">
      <h2 className="text-xl sm:text-2xl font-bold mt-1 mb-4 sm:mb-2 text-center">
        Which of these best describes your place?
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-md sm:max-w-none">
        {types.map((type) => (
          <button
            key={type.name}
            onClick={() => setSelected(type.name)}
            className={`px-4 sm:px-6 py-3 sm:py-4 border rounded-xl flex flex-col items-center gap-2 min-h-[80px] sm:min-h-[100px] transition-all ${
              selected === type.name ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="text-lg sm:text-xl">{type.icon}</div>
            <span className="text-xs sm:text-sm font-medium">{type.name}</span>
          </button>
        ))}
      </div>

      <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
