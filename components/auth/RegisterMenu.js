"use client";

import Link from "next/link";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoginModal from "./LoginModal";

export default function RegisterMenu({ className = "", onGuestClick }) {
  const { user, isLoading, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isLoading) return null;

  return (
    <div
      className={`absolute right-0 top-8 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4 min-w-[200px] ${className}`}
    >
      {user ? (
        <>
          <Link href="/bookings" className="hover:text-[#DC4731]">
            My bookings
          </Link>
          <Link href="/wishlist" className="hover:text-[#DC4731]">
            Wishlist
          </Link>
          <Link href="/messages" className="hover:text-[#DC4731]">
            Messages
          </Link>
          <div className="border-t border-gray-300 my-2"></div>
          <Link href="/account" className="hover:text-[#DC4731]">
            Account
          </Link>
          <Link href="/help" className="hover:text-[#DC4731]">
            Help center
          </Link>
          <button onClick={logout} className="text-left hover:text-[#DC4731]">
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onGuestClick}
            className="w-35 cursor-pointer text-left hover:text-[#DC4731]"
          >
            Register as a guest
          </button>
          <Link
            href="#"
            className="hover:text-[#DC4731]"
            onClick={() => setShowLoginModal(true)}
          >
            Log in
          </Link>

          {showLoginModal && (
            <LoginModal
              isOpen={true}
              onClose={() => setShowLoginModal(false)}
            />
          )}
          <div className="border-t border-gray-300 my-2"></div>
          <Link href="/become-host" className="hover:text-[#DC4731]">
            Become a host
          </Link>
         
        </>
      )}
    </div>
  );
}
