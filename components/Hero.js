"use client";
import { useState } from "react";
import Search from "./Search";

export default function Hero() {
  return (
<div className="relative">
  <section
    className="relative z-0 bg-cover bg-center bg-no-repeat h-[100vh] flex flex-col justify-between items-center text-white px-6 md:px-12 pt-[80px] pb-12"
    style={{
      backgroundImage: "url('/images/hero/hero.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-black/70"></div> {/* Overlay */}
    
    {/* Text Content - Top Section */}
    <div className="relative z-10 text-center max-w-4xl mt-40">
      <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
        Find your Sanctuary. <br />
        <span>Cozy comforts, Big Adventures</span>
      </h1>
      <p className="text-white text-lg md:text-xl font-light mb-10">
        Seamlessly rent your property or find your perfect getaway. We
        connect <br className="hidden md:block" />
        homeowners with travelers, creating unforgettable experiences
      </p>
    </div>

    {/* Search Component - Bottom Section */}
    <div className="relative z-10 w-full max-w-4xl pb-8">
      <Search />
    </div>
  </section>
</div>
  );
}
