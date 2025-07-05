"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import RegisterMenu from "./auth/RegisterMenu";
import AuthModalContainer from "./auth/AuthModalContainer";

export default function NavBar() {
  const { user, isLoading, logout } = useAuth();
const [userType, setUserType] = useState("user");

  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const registerMenuRef = useRef(null);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setRegisterMenuOpen(false);
  }, [pathname]);

  // Close register menu when clicking outside
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
    // setRegisterMenuOpen(false);
    // setAuthModalOpen(true);
    setRegisterMenuOpen(false);
                  setUserType("user");
                  setAuthModalOpen(true);
  };

  const handleBecomeHostClick = () => {
    setRegisterMenuOpen(false);
    setUserType("host");
    setAuthModalOpen(true);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faqs", label: "FAQs" },
  ];

  return (
    <header className="bg-white fixed w-full z-50 shadow-lg shadow-black/50">
      <nav className="w-full mx-auto px-[5%] flex items-center justify-between h-[80px] z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
          <span className="ml-2 font-bold text-xl hidden sm:block">
            Hadupad
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? "text-[#DC4731] font-semibold"
                  : "text-gray-700 hover:text-[#DC4731] transition-colors"
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Register Menu */}
        <div className="relative" ref={registerMenuRef}>
          {/* Desktop Register Button */}
          <button
            onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
            className="hidden md:flex items-center gap-2 bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg hover:shadow-md transition-shadow"
          >
            <img
              src="/images/logo/li_user.png"
              alt="User"
              className="w-5 h-5"
            />
            {user ? (
              <>{user.firstName}</>
            ) : (
              <>
                <span>Register</span>{" "}
              </>
            )}
          </button>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
              className="flex items-center justify-center bg-white text-[#DC4731] p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="User menu"
            >
              <img
                src="/images/logo/li_user.png"
                alt="User"
                className="w-6 h-6"
              />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Main menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Register Dropdown */}
          {registerMenuOpen && (
            <div className="absolute top-full right-0 z-50 mt-2">
              {/* <RegisterMenu onGuestClick={handleGuestClick} /> */}
              <RegisterMenu
                onGuestClick = { handleGuestClick }
                onBecomeHostClick={handleBecomeHostClick}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 px-6 pt-20 pb-10 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 text-[#DC4731] p-2"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  pathname === href
                    ? "text-[#DC4731] text-xl font-semibold"
                    : "text-gray-700 text-xl hover:text-[#DC4731] transition-colors"
                }
              >
                {label}
              </Link>
            ))}

            {/* <div className="w-full max-w-xs mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={handleGuestClick}
                className="w-full bg-[#DC4731] text-white py-3 rounded-lg font-medium hover:bg-[#c03d29] transition-colors"
              >
                Continue as Guest
              </button>
            </div> */}
          </div>
        )}

        {/* Auth Modals */}
        {/* <AuthModalContainer
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        /> */}

        <AuthModalContainer
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          userType={userType}
        />
      </nav>
    </header>
  );
}
