// components/MapWithAddress.js
'use client';

import { MapPin } from "lucide-react";
import { Home } from 'lucide-react';

import BottomNav from "../BottomNav";

import SaveExitButton from "../SaveExitButton";


export default function MapWithAddress({ onNext, onBack, handleSaveExit }) {
  return (
    <>
          <SaveExitButton onClick={handleSaveExit} />

    <div className="w-full max-w-xl mx-auto space-y-4 text-center">

       <h2 className="text-2xl font-bold mt-1 mb-2">
        Where is your place located?
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Your address is only shared after reservations have been made
      </p>

      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow">
         <iframe
    title="Abuja Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63482.53484794267!2d7.4177549!3d9.05785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b04e48b2975%3A0x53916dfeefee1b5c!2sAbuja!5e0!3m2!1sen!2sng!4v1718999521011!5m2!1sen!2sng"
    width="100%"
    height="256"
    className="w-full h-64 border-0"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
   <MapPin className="text-gray-500 w-5 h-5" />
    <input
              type="text"
              placeholder="Ahmadu bellow way, AMAC, 900722, Federal Capital Territory"
              className="w-full outline-none bg-transparent text-sm placeholder-gray-500"
            />
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-rose-500 p-2 rounded-full text-white shadow-lg">
            <Home />
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-sm font-semibold">An entire place</p>
          <p className="text-xs text-gray-500">
            Guests have the entire place to themselves
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black relative after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
      </div> */}

        <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
