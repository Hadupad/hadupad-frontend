"use client";

import { MapPin } from "lucide-react";
import BottomNav from "../BottomNav";

import SaveExitButton from "../SaveExitButton";

export default function AddressInput({ onNext, onBack, handleSaveExit }) {
  return (
    <>
      <SaveExitButton onClick={handleSaveExit} />
    
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mt-1 mb-2">
        Where is your place located?
      </h2>
      <p className="text-sm text-gray-600 mb-2">
        Your address is only shared after reservations have been made
      </p>
      <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-md">
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
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4">
          <div className="bg-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg w-full">
            <MapPin className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full outline-none bg-transparent text-sm placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
