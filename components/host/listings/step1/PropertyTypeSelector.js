

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

    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mt-1 mb-2">
        Which of these best describes your place?
      </h2>

      <div className="flex gap-4 mb-12">
        {types.map((type) => (
          <button
            key={type.name}
            onClick={() => setSelected(type.name)}
            className={`px-6 py-4 border rounded-xl flex flex-col items-center gap-2 ${
              selected === type.name ? "border-black" : "border-gray-300"
            }`}
          >
            {type.icon}
            <span className="text-sm">{type.name}</span>
          </button>
        ))}
      </div>

      <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
