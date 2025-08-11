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

    <div className="w-full flex flex-col gap-6 items-center">
      <h2 className="text-2xl font-bold mt-1 mb-2">
        What type of place will the guests have?
      </h2>

      <div className="flex flex-col gap-4 mb-12">
        {options.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelected(option.label)}
            className={`w-[644px] border rounded-xl px-6 py-4 text-left flex justify-between items-start ${
              selected === option.label ? 'border-black' : 'border-gray-300'
            }`}
          >
            <div className="flex flex-col justify-center">
              <p className="font-medium text-lg mb-1">{option.label}</p>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
            <div className="text-black">{option.icon}</div>
          </button>
        ))}
      </div>

     <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
