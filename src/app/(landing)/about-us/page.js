"use client";
import { useState } from "react";
import Image from "next/image";
import WhyChoose from "../../../../components/WhyChoose";
import GoalsAndMission from "../../../../components/GoalsAndMission";

export default function AboutUs() {
  const scrollToWhyChoose = () => {
    const whyChooseSection = document.getElementById("why-choose-us");
    if (whyChooseSection) {
      whyChooseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="relative z-0 bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center text-white px-6 md:px-12 pt-[80px]"
        style={{
          backgroundImage: "url('/images/hero/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
            About Us
          </h1>
          <p className="text-white text-lg md:text-xl font-light mb-10">
            Hadupad is a short term rental company located in Nigeria. The
            company was founded in 2020 and has established itself as a company
            that provides solutions to real estate difficulties, providing users
            with superb experiences while trying to buy, rent, sell or book a
            shortlet apartment in Nigeria from anywhere in the world.
          </p>
          <button 
            onClick={scrollToWhyChoose}
            className="bg-[#DC4731] hover:bg-[#B54228] text-white px-4 py-2 rounded mt-4 transition-colors duration-200"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Why Choose Us Section with ID */}
      <div id="why-choose-us">
        <WhyChoose />
      </div>

      <GoalsAndMission />
    </div>
  );
}