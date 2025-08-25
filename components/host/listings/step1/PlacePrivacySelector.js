'use client';

import { useState } from 'react';
import { MdHome, MdOutlineMeetingRoom } from "react-icons/md";
import BottomNav from "../BottomNav";

import SaveExitButton from "../SaveExitButton";


export default function PlacePrivacySelector({ onNext, onBack, handleSaveExit }) {
  const [selected, setSelected] = useState('An entire place');

  const options = [
    {
      label: 'An entire place',
      description: 'Guests have the entire place to themselves',
      icon: <MdHome size={32} />,
    },
    {
      label: 'A room',
      description: 'Guests have their own room in a home plus access to shared spaces',
      icon: <MdOutlineMeetingRoom size={32} />,
    },
  ];

  return (
    <>
          <SaveExitButton onClick={handleSaveExit} />

    <div className="w-full flex flex-col gap-4 sm:gap-6 items-center px-4">
      <h2 className="text-xl sm:text-2xl font-bold mt-1 mb-2 text-center">
        What type of place will the guests have?
      </h2>

      <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-2xl">
        {options.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelected(option.label)}
            className={`w-full border rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-start transition-all hover:shadow-md ${
              selected === option.label ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex flex-col justify-center flex-1 pr-3">
              <p className="font-medium text-base sm:text-lg mb-1">{option.label}</p>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{option.description}</p>
            </div>
            <div className="text-black flex-shrink-0">{option.icon}</div>
          </button>
        ))}
      </div>

     <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
