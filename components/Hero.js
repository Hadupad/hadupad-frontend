"use client";
import { useState } from "react";

export default function Hero() {
  return (
    <div className="relative">
      <section
        className="relative z-0 bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center text-white px-6 md:px-12 pt-[80px]"
        style={{
          backgroundImage: "url('/images/hero/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div> {/* Overlay */}
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
            Find your Sanctuary. <br />
            <span>Cozy comforts, Big Adventures</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-light mb-10">
            Seamlessly rent your property or find your perfect getaway. We
            connect <br className="hidden md:block" />
            homeowners with travelers, creating unforgettable experiences
          </p>

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
          <div className="hidden md:flex bg-white text-black rounded-2xl shadow-lg px-6 py-3 items-center justify-between gap-6 max-w-6xl mx-auto w-full mt-6">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1">Where</label>
              <input
                type="text"
                placeholder="Enter address e.g Wuse 2"
                className="outline-none text-sm"
              />
            </div>

            <div className="hidden md:block h-8 w-px bg-gray-300" />

            <div className="flex flex-col">
              <label className="text-xs font-medium">Budget</label>
              <input
                type="text"
                placeholder="None"
                className="outline-none text-sm text-center"
              />
            </div>

            <div className="hidden md:block h-8 w-px bg-gray-300" />

            <div className="flex flex-col">
              <label className="text-xs font-medium">Bedrooms</label>
              <input
                type="text"
                placeholder="Unselected"
                className="outline-none text-sm text-center"
              />
            </div>

            <div className="hidden md:block h-8 w-px bg-gray-300" />

            <div className="flex flex-col">
              <label className="text-xs font-medium">Who</label>
              <input
                type="text"
                placeholder="Add guests"
                className="outline-none text-sm text-center"
              />
            </div>

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
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
