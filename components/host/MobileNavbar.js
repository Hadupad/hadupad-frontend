"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "@/redux/slices/profileSlice";
import { Menu, X } from "lucide-react";
import LoadingIndicator from "components/LoadingIndicator";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile);
  }, [dispatch]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div>Error {error}</div>;

  return (
    <>
      <nav className="w-full fixed top-0 flex justify-between items-center p-4 bg-white border-b z-50">
        {/* Left: Logo */}
        <Link href="/host" className="flex items-center">
          <Image
            src="/images/logo/icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Right: Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 pt-20">
            <div className="p-6">
              {/* User Profile */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b">
                <Image
                  src={user?.profilePicture}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {user?.firstName || "Unknown First Name"} {user?.lastName || "Unknown Last Name"}
                  </p>
                  <p className="text-sm text-green-500">{user?.userType || "Unknown"}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4">
                <Link
                  href="/host"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/host/bookings"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bookings
                </Link>
                <Link
                  href="/host/listings"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Listings
                </Link>
                <Link
                  href="/host/caution-fee"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Caution Fee
                </Link>
                <Link
                  href="/host/wallet"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wallet
                </Link>
                <Link
                  href="/host/discounts"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Discounts
                </Link>
                <Link
                  href="/host/messages"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/host/account"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
