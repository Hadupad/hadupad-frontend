"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full fixed flex justify-between items-center p-4 bg-white border-b z-100">
      {/* Left: Logo */}
      <Link href="/guest" className="flex items-center">
        <Image
          src="/images/logo/icon.png"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </Link>

      {/* Right: User profile */}
      <div className="flex items-center gap-2">
        <Image
          src="/user-avatar.jpg"
          alt="User"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">Faith Oyeniyi</p>
          <p className="text-xs text-green-500">Guest</p>
        </div>
      </div>
    </nav>
  );
}
