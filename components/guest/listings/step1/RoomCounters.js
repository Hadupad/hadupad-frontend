// components/RoomCounters.js
'use client';

import { useState } from 'react';
import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";


export default function RoomCounters({ onNext, onBack, handleSaveExit }) {
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);

 
  const Counter = ({ label, value, setValue }) => (
    <div className="flex justify-between items-center border-b py-4">
      
      <p className="text-sm">{label}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="border rounded-full w-8 h-8 flex items-center justify-center"
        >
          −
        </button>
        <span>{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="border rounded-full w-8 h-8 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <>
  <SaveExitButton onClick={handleSaveExit} />
  
    <div className="w-full max-w-md mx-auto">

       <h2 className="text-xl font-bold mt-1 mb-2">
        Share some basic details about your place
      </h2>
      <Counter label="Guests" value={guests} setValue={setGuests} />
      <Counter label="Bedrooms" value={bedrooms} setValue={setBedrooms} />
      <Counter label="Bathroom" value={bathrooms} setValue={setBathrooms} />

         <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
