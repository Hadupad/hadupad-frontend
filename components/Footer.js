"use client";

import React, { useState } from "react";
import Image from 'next/image';

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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [accordionOpen, setAccordionOpen] = useState(null);

  const toggleAccordion = (section) => {
    setAccordionOpen(accordionOpen === section ? null : section);
  };

  return (
    <footer className="bg-white text-black text-sm">
      <hr className="border-t py-10" style={{ borderColor: "#D8DADC" }} />

      {/* Footer Grid for Desktop */}
      <div className="max-w-7xl mx-auto px-4 py-8 hidden md:grid grid-cols-3 gap-8">
        {/* Column 1: Services, About, Support */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <h4 className="font-semibold mb-2">Services</h4>
              <ul className="space-y-1">
                <li className="font-light">List Property</li>
                <li className="font-light">Find property</li>
                <li className="font-light">Short-Lets</li>
                <li className="font-light">Agents</li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <ul className="space-y-1">
                <li className="font-light">About Us</li>
                <li className="font-light">Terms & Conditions</li>
                <li className="font-light">Privacy policy</li>
                <li className="font-light">Cancellation Policy</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-2">Support</h4>
              <ul className="space-y-1">
                <li className="font-light">Contact Us</li>
                <li className="font-light">Help</li>
                <li className="font-light">FAQs</li>
                <li className="font-light">Refunds</li>
              </ul>
            </div>
          </div>

          {/* Nigeria Flag */}
          <div className="flex items-center pt-20">
          <Image
  src="https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
  alt="Nigeria Flag"
  width={28} // w-7 = 1.75rem = 28px
  height={16} // h-4 = 1rem = 16px
  className="w-7 h-4 mr-2"
/>

            <span className="font-semibold tracking-wide">
              FEDERAL REPUBLIC OF NIGERIA (NGN)
            </span>
          </div>
        </div>

        {/* Empty Spacer */}
        <div></div>

        {/* Column 3: Signup Section */}
        <div className="max-w-md">
          <h3 className="font-semibold mb-3 uppercase">
            Sign up to get the latest
          </h3>
          <div className="flex flex-row items-center gap-2 w-full">
            <input
              type="email"
              placeholder="Your Email*"
              className="border border-gray-400 rounded px-4 py-2 w-full"
            />
            <button className="bg-[#DC4731] text-white px-5 py-2 rounded hover:bg-red-700 whitespace-nowrap">
              Submit
            </button>
          </div>
          <p className="mt-3 text-xs">
            By providing your email address, you agree to receive marketing
            communications from Peloton.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-black" /> 234-806-252-7593
            </li>
            <li className="flex items-center gap-2">
              <FaCommentDots className="text-black" /> START A LIVE CHAT
            </li>
            <li className="flex items-center gap-2">
              <FaQuestionCircle className="text-black" /> VISIT SUPPORT CENTER
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-3 text-white py-10">
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
      </div>

      {/* Mobile View: Social Icons + Accordion */}
      <div className="md:hidden px-4 py-6">
        {/* Sign Up Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase">
            Sign up to get the latest
          </h3>
          <div className="flex flex-row items-center gap-2 w-full">
            <input
              type="email"
              placeholder="Your Email*"
              className="border border-gray-400 rounded px-4 py-2 w-full"
            />
            <button className="bg-[#DC4731] text-white px-5 py-2 rounded hover:bg-red-700 whitespace-nowrap">
              Submit
            </button>
          </div>
          <p className="mt-3 text-xs">
            By providing your email address, you agree to receive marketing
            communications from Peloton.
          </p>
        </div>

        {/* Contact Info */}
        <ul className="space-y-2 text-sm mb-6">
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="text-black" /> 234-806-252-7593
          </li>
          <li className="flex items-center gap-2">
            <FaCommentDots className="text-black" /> START A LIVE CHAT
          </li>
          <li className="flex items-center gap-2">
            <FaQuestionCircle className="text-black" /> VISIT SUPPORT CENTER
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-3 text-white mb-6">
          {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
            <div
              key={idx}
              className="bg-[#DC4731] p-2 rounded-full hover:bg-[#C03A2B] transition"
            >
              <Icon />
            </div>
          ))}
        </div>

        {/* Accordion Sections */}
{[
  {
    label: "Services",
    content: ["List Property", "Find property", "Short-Lets", "Agents"],
  },
  {
    label: "About",
    content: [
      "About Us",
      "Terms & Conditions",
      "Privacy policy",
      "Cancellation Policy",
    ],
  },
  {
    label: "Support",
    content: ["Contact Us", "Help", "FAQs", "Refunds"],
  },
].map(({ label, content }) => (
  <div key={label} className="mb-4">
    <button
      onClick={() => toggleAccordion(label)}
      className="w-full flex justify-between items-center font-semibold py-2 border-b"
      style={{ borderColor: "#D8DADC" }} // Set the border color here
    >
      {label}
      {accordionOpen === label ? <FaChevronUp /> : <FaChevronDown />}
    </button>

    {accordionOpen === label && (
      <ul className="pl-4 mt-2 space-y-1">
        {content.map((item, idx) => (
          <li key={idx} className="font-light">
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
))}

      </div>

      <hr className="border-t" style={{ borderColor: "#D8DADC" }} />

      {/* Bottom Footer Row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex gap-4 text-xs text-gray-700 flex-wrap justify-center md:justify-start hidden md:flex">
  <span>Privacy Policy</span>
  <span>Terms of Service</span>
  <span>Membership Terms</span>
  <span>IP Policy</span>
  <span>Cookie Settings</span>
  <span>Accessibility</span>
</div>

        <div className="text-xs text-gray-600 text-center md:text-right">
          ©Hadupad {currentYear}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
