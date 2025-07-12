"use client";
import { useState } from "react";
import Image from "next/image";

export default function Search() {
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  return (
    <>
      {/* --- Mobile Search Box --- */}
      <div className="md:hidden bg-white text-black rounded-full shadow-lg px-4 py-3 flex items-center justify-between w-full max-w-md mx-auto mt-6">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold">Where to?</span>
            <input
              type="text"
              placeholder="Enter address e.g Wuse 2"
              className="text-xs outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
        <button className="bg-white rounded-full p-2 shadow-md border border-gray-200">
          <img
            src="/images/hero/mobile-search-vector.png"
            alt="Filter Icon"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* --- Desktop Search Box --- */}
      <div
        className="hidden md:flex bg-white text-black shadow-lg px-4 py-3 items-center justify-between gap-6 w-full md:ml-auto md:mr-4 md:max-w-5xl mt-6"
        style={{ borderRadius: "3rem" }}
      >
        {/* Where */}
        <div className="flex flex-col w-44 ml-8">
          <label className="block font-medium text-left">Where</label>
          <input
            type="text"
            placeholder="Enter address e.g Wuse 2"
            className="outline-none text-sm text-left w-full placeholder-gray-400 py-1"
          />
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-300" />

        {/* Budget */}
        <div className="flex flex-col w-44">
          <label className="font-medium text-left">Budget</label>
          <div className="relative">
           
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={`outline-none text-sm w-full pr-6 appearance-none bg-transparent ${
                budget === "" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <option value="" disabled>
                None
              </option>
              <option value="#50k-100k">#50,000 - #100,000</option>
              <option value="#100k-200k">#100,000 - #200,000</option>
              <option value="#200k-400k">#200,000 - #400,000</option>
              <option value="#400k-800k">#400,000 - #800,000</option>
            </select>

            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-300" />

        {/* Bedrooms */}
        <div className="flex flex-col w-44">
          <label className="font-medium text-left">Bedrooms</label>
          <div className="relative">
          
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className={`outline-none text-sm w-full pr-8 appearance-none bg-transparent ${
                bedrooms === "" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <option value="" disabled>
                Unselected
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-300" />

        {/* Who */}
        <div className="flex flex-col w-44">
          <label className="font-medium text-left">Who</label>
          <div className="relative">
       
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={`outline-none text-sm w-full pr-6 appearance-none bg-transparent ${
                guests === "" ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <option value="" disabled>
                Add guests
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-[#DC4731] text-white p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
