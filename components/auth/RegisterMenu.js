"use client";

import Link from "next/link";

export default function RegisterMenu({ className = "", onGuestClick }) {
  return (
    <div className={`absolute right-0 top-8 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4 ${className}`}>
      <button
        onClick={onGuestClick}
        className="w-35 max-w-* cursor-pointer text-left hover:text-[#DC4731]"
      >
        Register as a guest
      </button>
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
  );
}