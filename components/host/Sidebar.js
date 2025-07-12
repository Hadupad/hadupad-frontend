"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <aside className="fixed top-16 md:top-[72px] left-0 h-[calc(100vh-64px)] w-56 bg-white text-black p-4 flex flex-col justify-between shadow-md z-50">
      {/* Top Menu */}
      <div className="space-y-8">
        {topMenuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={index}>
              <div
                className={`flex items-center gap-3 py-4 rounded-lg cursor-pointer transition ${
                  isActive ? "bg-[#DC4731] text-white" : "hover:bg-gray-100"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-red-600"
                  }`}
                />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logout at Bottom */}
      <div className="pt-6 mt-6">
        <Link href={logoutItem.href}>
          <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <LogoutIcon className="w-5 h-5 text-orange-500" />
            <span>{logoutItem.label}</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
