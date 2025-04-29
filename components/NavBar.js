"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegisterMenu from "./auth/RegisterMenu";
import GuestSignupModal from "./auth/GuestSignupModal";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const pathname = usePathname();
  const registerMenuRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setRegisterMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        registerMenuRef.current &&
        !registerMenuRef.current.contains(event.target)
      ) {
        setRegisterMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestClick = () => {
    setRegisterMenuOpen(false);
    setGuestModalOpen(true);
  };

  return (
    <header className="bg-white fixed w-full z-50">
      <nav className="shadow-lg shadow-black/50 w-full mx-auto px-[5%] flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/properties", label: "Properties" },
            { href: "/about-us", label: "About Us" },
            { href: "/contact", label: "Contact" },
            { href: "/faqs", label: "FAQs" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "text-[#DC4731] font-semibold"
                  : "hover:text-[#DC4731]"
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Register Menu Button */}
        <div className="relative" ref={registerMenuRef}>
          <button
            onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
            className="hidden md:flex items-center gap-2 bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg"
          >
            <img
              src="/images/logo/li_user.png"
              alt="User"
              className="w-5 h-5"
            />
            <span>Register</span>
          </button>

          {/* Mobile Icon */}
          <div className="md:hidden flex items-center gap-4 ml-auto">
            <button
              onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
              className="flex items-center gap-2 bg-white text-[#DC4731] px-3 py-2 rounded-full shadow-md"
            >
              <img
                src="/images/logo/li_user.png"
                alt="User"
                className="w-6 h-6"
              />
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white shadow-md"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-[#DC4731]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-[#DC4731]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Register Dropdown */}
          {registerMenuOpen && (
            <div className="absolute top-full right-0 z-50">
              <RegisterMenu
                onGuestClick={handleGuestClick}
                className="w-[220px]"
              />
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {/* {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-40">
            <div className="flex flex-col gap-4">
              {[
                { href: "/", label: "Home" },
                { href: "/properties", label: "Properties" },
                { href: "/about-us", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/faqs", label: "FAQs" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={
                    pathname === href
                      ? "text-[#DC4731] font-semibold"
                      : "hover:text-[#DC4731]"
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )} */}

        {mobileMenuOpen && (
          <div
            className={`fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6 px-6 transform transition-transform duration-300 ease-in-out
   ${
     mobileMenuOpen
       ? "translate-y-0 opacity-100"
       : "translate-y-full opacity-0 pointer-events-none"
   }
 `}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 text-[#DC4731] text-5xl"
              aria-label="Close Menu"
            >
              &times;
            </button>

            {[
              { href: "/", label: "Home" },
              { href: "/properties", label: "Properties" },
              { href: "/about-us", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/faqs", label: "FAQs" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={
                  pathname === href
                    ? "text-[#DC4731] text-xl font-semibold"
                    : "text-xl hover:text-[#DC4731]"
                }
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Guest Signup Modal */}
        {guestModalOpen && (
          <GuestSignupModal onClose={() => setGuestModalOpen(false)} />
        )}
      </nav>
    </header>
  );
}
