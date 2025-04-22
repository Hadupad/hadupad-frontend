"use client"

import React, { useState } from "react";

import {
  FaPhoneAlt,
  FaCommentDots,
  FaQuestionCircle,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


export default function LetsTalk() {

  return (
   
<section className="px-6 py-16 px-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-start">
  <div className="space-y-6 py-20 pt-20 md:col-span-1">
    <h2 className="text-2xl md:text-3xl font-bold">Let&apos;s Talk</h2>
    <p className="text-gray-700">
      Hadupad is here to help you;
      Our experts are available to answer any questions you might have. We&apos;ve got the answers.
    </p>

    <div>
      <h4 className="font-semibold mb-1">Visit Us</h4>
      <p className="text-gray-700">
        Office no. G-02 Building 1, Ground Floor. Abuja
        Media City – Lagos
      </p>
    </div>

    <div>
      <h4 className="font-semibold mb-1">Email Us</h4>
      <a href="mailto:hadupad@gmail.com" className="underline">hadupad@gmail.com</a>
    </div>
    <h4>OUR CHANELS</h4>

    {/* Social Icons */}
              <div className="flex gap-3 text-white py-2">
                {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
                  <div
                    key={idx}
                    className="bg-[#DC4731] p-2 rounded-full hover:bg-[#C03A2B] transition"
                  >
                    <Icon />
                  </div>
                ))}
              </div>
  </div>

  <div className="relative w-full h-[500px] md:col-span-2 hidden md:block">
    {/* First image pair */}
    <div className="absolute top-0 left-30 overflow-hidden shadow-lg">
      <image src="/images/contact/2.png" alt="" className="w-full h-full object-cover" />
    </div>
    <div className="absolute top-50 left-2 overflow-hidden shadow-lg" style={{ zIndex: 10 }}>
      <image src="/images/contact/4.png" alt="" className="w-full h-full object-cover" />
    </div>

    {/* Second image pair */}
    <div className="absolute bottom-20 right-12 overflow-hidden shadow-lg">
      <image src="/images/contact/1.png" alt="" className="w-full h-full object-cover" />
    </div>
    <div className="absolute top-70 right-40 overflow-hidden shadow-lg" style={{ zIndex: 10 }}>
      <image src="/images/contact/3.png" alt="" className="w-full h-full object-cover" />
    </div>
  </div>
</section>
  );
}