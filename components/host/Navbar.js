"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/redux/slices/profileSlice";
import LoadingIndicator from "components/LoadingIndicator";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogoutModalOpen(false);
    window.location.href = "/"; 
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <div>Error {error}</div>;

  return (
    <>
      <nav className="w-full fixed flex justify-between items-center p-4 bg-white border-b z-50">
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

        {/* Right: User profile and logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={user?.profilePicture}
              alt=""
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">
                {user?.firstName || "Unknown First Name"}{" "}
                {user?.lastName || "Unknown Last Name"}
              </p>
              <p className="text-xs text-green-500">
                {user?.userType || "Unknown"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="relative text-sm font-medium text-white px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-red-500 to-red-700 animate-pulse hover:from-red-600 hover:to-red-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            <span className="relative z-10">Logout</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 animate-[gradient_3s_ease_infinite] hover:opacity-20" style={{ backgroundSize: "200% 200%" }}></span>
          </button>
        </div>
      </nav>


      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-full min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout? This will clear all local storage
              data.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}