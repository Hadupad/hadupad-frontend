"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosWarning } from "react-icons/io";


import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Wallet,
  Percent,
  MessageCircle,
  User,
  LogOut,
} from "lucide-react";

const topMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/host" },
  { label: "Listings (10)", icon: Home, href: "/host/listings" },
  { label: "Bookings", icon: CalendarDays, href: "/host/bookings" },
  // { label: "Caution Fee", icon: Percent, href: "/host/caution-fee" },
  { label: "Caution Fee", icon: IoIosWarning, href: "/host/caution-fee" },

  { label: "Wallet", icon: Wallet, href: "/host/wallet" },
  { label: "Discounts", icon: Percent, href: "/host/discounts" },
  { label: "Messages", icon: MessageCircle, href: "/host/messages" },
  { label: "Account", icon: User, href: "/host/account" },
];

const logoutItem = { label: "Logout", icon: LogOut, href: "/logout" };

export default function Sidebar() {
  const pathname = usePathname();
  const LogoutIcon = logoutItem.icon;
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogoutModalOpen(false);
    window.location.href = "/"; 
  };

  // Don't render sidebar on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <aside className="fixed top-16 md:top-[72px] left-0 h-[calc(100vh-64px)] w-56 bg-white text-black p-4 flex flex-col justify-between shadow-md z-50">
      {/* Top Menu */}
      <div className="space-y-4">
        {topMenuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={index}>
              <div
                className={`flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer transition ${
                  isActive ? "bg-[#DC4731] text-white mx-0" : "hover:bg-gray-100 mx-0"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-red-600"
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logout at Bottom */}
      <div className="pt-6 mt-6">
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <LogoutIcon className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium">{logoutItem.label}</span>
        </button>
      </div>

      {/* Logout Modal */}
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
    </aside>
  );
}
