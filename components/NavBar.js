"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);
  const pathname = usePathname();

  const registerMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        registerMenuRef.current &&
        !registerMenuRef.current.contains(event.target)
      ) {
        setIsRegisterMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white fixed w-full z-50">
      <nav className="shadow-lg shadow-black/50 w-full mx-auto px-[5%] flex items-center justify-between h-[80px] relative">
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
          className={`absolute md:static left-0 right-0 top-[80px] md:top-0 ${
            isOpen ? "h-[calc(100vh-80px)]" : "h-0"
          } overflow-hidden md:h-auto bg-white md:bg-transparent transition-all duration-500 ease-in-out md:flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[4vw] z-40`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-8 md:gap-[4vw] font-medium">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === "/" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/properties"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === "/properties" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
                }`}
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === "/about-us" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === "/contact" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                onClick={() => setIsOpen(false)}
                className={`${
                  pathname === "/faqs" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
                }`}
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Register Button */}
        <div className="hidden md:flex relative" ref={registerMenuRef}>
          <button
            onClick={() => setIsRegisterMenuOpen(!isRegisterMenuOpen)}
            className="cursor-pointer bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg flex items-center gap-[10px]"
          >
            <img
              src="/images/logo/li_user.png"
              alt="User Icon"
              className="w-5 h-5"
            />
            <span className="font-normal">Register</span>
          </button>

          {/* Dropdown menu */}
          {isRegisterMenuOpen && (
            <div className="absolute right-0 top-14 w-64 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4">
              <Link href="/register-guest" className="hover:text-[#DC4731]">
                Register as a guest
              </Link>
              <Link href="/login" className="hover:text-[#DC4731]">
                Log in
              </Link>
              <div className="border-t border-gray-300 my-2"></div>
              <Link href="/become-host" className="hover:text-[#DC4731]">
                Become a host
              </Link>
              <Link href="/list-property" className="hover:text-[#DC4731]">
                List your property
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Register Button + Hamburger */}
        <div className="flex md:hidden items-center gap-3 relative" ref={registerMenuRef}>
          {/* Small register button (only icon) */}
          <button
            onClick={() => setIsRegisterMenuOpen(!isRegisterMenuOpen)}
            className="px-5 py-2 rounded-2xl bg-white shadow-md"
          >
            <img
              src="/images/logo/li_user.png"
              alt="User Icon"
              className="w-5 h-5"
            />
          </button>

          {/* Mobile Dropdown menu */}
          {isRegisterMenuOpen && (
            <div className="absolute right-12 top-14 w-48 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-3">
              <Link href="/register-guest" className="hover:text-[#DC4731]">
                Register as a guest
              </Link>
              <Link href="/login" className="hover:text-[#DC4731]">
                Log in
              </Link>
              <div className="border-t border-gray-300 my-2"></div>
              <Link href="/become-host" className="hover:text-[#DC4731]">
                Become a host
              </Link>
              <Link href="/list-property" className="hover:text-[#DC4731]">
                List your property
              </Link>
            </div>
          )}

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-3 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-[#DC4731]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
