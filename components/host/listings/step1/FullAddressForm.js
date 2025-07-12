// components/FullAddressForm.js
'use client';

import BottomNav from "../BottomNav";

import SaveExitButton from "../SaveExitButton";


export default function FullAddressForm({ onNext, onBack, handleSaveExit }) {
  return (
    <>
          <SaveExitButton onClick={handleSaveExit} />

    <div className="w-full max-w-xl mx-auto space-y-3 text-center">
      <h2 className="text-2xl font-bold mt-1 mb-2">
        Please confirm your address
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Your address is only shared after reservations have been made
      </p>

      

<div className="w-full max-w-xl space-y-4">

  {/* Country/Region Select */}
  <div className="relative w-full">
    <select
      id="country"
      defaultValue=""
      className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-black"
    >
      <option value="" disabled hidden></option>
      <option>Nigeria</option>
      <option>Ghana</option>
      <option>Kenya</option>
    </select>
    <label
      htmlFor="country"
      className="absolute left-4 top-2 text-gray-500 text-xs transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
    >
      Country/Region
    </label>
  </div>

  {/* Street Address */}
  <div className="relative w-full">
    <input
      type="text"
      id="street"
      placeholder=" "
      className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
    />
    <label
      htmlFor="street"
      className="absolute left-4 top-2 text-gray-500 text-xs transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
    >
      Street address
    </label>
  </div>

  {/* Apt or Suite */}
  <div className="relative w-full">
    <input
      type="text"
      id="apt"
      placeholder=" "
      className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
    />
    <label
      htmlFor="apt"
      className="absolute left-4 top-2 text-gray-500 text-xs transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
    >
      Apt or suite number
    </label>
  </div>

  {/* City */}
  <div className="relative w-full">
    <input
      type="text"
      id="city"
      placeholder=" "
      className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
    />
    <label
      htmlFor="city"
      className="absolute left-4 top-2 text-gray-500 text-xs transition-all
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
    >
      City
    </label>
  </div>

  {/* State and Zip Code */}
  <div className="flex gap-2">
    {/* State */}
    <div className="relative w-1/2">
      <input
        type="text"
        id="state"
        placeholder=" "
        className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
      />
      <label
        htmlFor="state"
        className="absolute left-4 top-2 text-gray-500 text-xs transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
      >
        State
      </label>
    </div>

    {/* Zip Code */}
    <div className="relative w-1/2">
      <input
        type="text"
        id="zip"
        placeholder=" "
        className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
      />
      <label
        htmlFor="zip"
        className="absolute left-4 top-2 text-gray-500 text-xs transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
      >
        Zip code
      </label>
    </div>
  </div>

</div>


        <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}
