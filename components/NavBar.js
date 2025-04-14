"use client"

import { useState } from "react";
import Link from "next/link"; // Import Link from next/link

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-transparent md:bg-white fixed w-full z-50">
      <nav className="max-w-[1440px] mx-auto mt-5 px-[5%] flex items-center justify-between h-[80px] relative">
        {/* Logo */}
        <div>
          <img
            className="cursor-pointer w-10 h-10"
            src="/images/logo/icon.png"
            alt="HADUPAD LOGO"
          />
        </div>

        {/* Navigation links */}
        <div
          className={`absolute md:static left-0 right-0 top-[80px] md:top-0 bg-white md:bg-transparent transition-all duration-500 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[4vw] z-50`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-8 md:gap-[4vw] font-medium">
            <li>
              <Link href="/" className="text-[#DC4731] font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/properties" className="text-black hover:text-[#DC4731]">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="text-black hover:text-[#DC4731]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-black hover:text-[#DC4731]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="text-black hover:text-[#DC4731]">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Register button */}
        <div className="hidden md:flex">
          <button className="bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg flex items-center gap-[10px]">
            <img
              src="/images/logo/li_user.png"
              alt="User Icon"
              className="w-5 h-5"
            />
            <span className="font-normal">Register</span>
          </button>
        </div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
