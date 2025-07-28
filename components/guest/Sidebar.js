// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   LayoutDashboard,
//   CalendarDays,
//   Heart,
//   MessageCircle,
//   User,
//   HelpCircle,
//   LogOut,
// } from "lucide-react";

// const menuItems = [
//   { label: "Dashboard", icon: LayoutDashboard, href: "/guest" },
//   { label: "My Bookings", icon: CalendarDays, href: "/guest/bookings" },
//   { label: "Wishlist", icon: Heart, href: "/guest/wishlist" },
//   { label: "Messages", icon: MessageCircle, href: "/guest/messages" },
//   { label: "Account", icon: User, href: "/guest/account" },
//   { label: "Help Centre", icon: HelpCircle, href: "/guest/help" },
// ];


// const logoutItem = { label: "Logout", icon: LogOut, href: "/logout" };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const LogoutIcon = logoutItem.icon;

//   return (
//     <aside className="fixed top-16 md:top-[72px] left-0 h-[calc(100vh-64px)] w-56 bg-white text-black p-4 flex flex-col justify-between shadow-md z-50">
//       {/* Main Menu */}
//       <div className="space-y-8">
//         {menuItems.map((item, index) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;

//           return (
//             <Link href={item.href} key={index}>
//               <div
//                 className={`flex items-center gap-3 py-4 rounded-lg cursor-pointer transition ${
//                   isActive ? "bg-[#DC4731] text-white" : "hover:bg-gray-100"
//                 }`}
//               >
//                 <Icon
//                   className={`w-5 h-5 ${
//                     isActive ? "text-white" : "text-red-600"
//                   }`}
//                 />

//                 <span>{item.label}</span>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Logout */}
//       <div className="pt-6 mt-6">
//         <Link href={logoutItem.href}>
//           <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//             <LogoutIcon className="w-5 h-5 text-orange-500" />
//             <span>{logoutItem.label}</span>
//           </div>
//         </Link>
//       </div>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  MessageCircle,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/guest" },
  { label: "My Bookings", icon: CalendarDays, href: "/guest/bookings" },
  { label: "Wishlist", icon: Heart, href: "/guest/wishlist" },
  { label: "Messages", icon: MessageCircle, href: "/guest/messages" },
  { label: "Account", icon: User, href: "/guest/account" },
  { label: "Help Centre", icon: HelpCircle, href: "/guest/help" },
];

const logoutItem = { label: "Logout", icon: LogOut, href: "/logout" };

export default function Sidebar() {
  const pathname = usePathname();
  const LogoutIcon = logoutItem.icon;

  return (
    <aside className="fixed top-16 md:top-[72px] left-0 h-[calc(100vh-64px)] w-56 bg-white text-black p-4 flex flex-col justify-between shadow-md z-50">
      {/* Main Menu */}
      <div className="space-y-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          // Special case for Account route and its children
          const isAccountPath =
            item.href === "/guest/account" &&
            pathname.startsWith("/guest/account");

          const isActive = pathname === item.href || isAccountPath;

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

      {/* Logout */}
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
