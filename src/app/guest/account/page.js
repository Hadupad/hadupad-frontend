"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "lucide-react";



const tabs = [
  {
    name: "Personal Information",
    href: "/guest/account/personal-info",
    description: "More information about you.",
  },
  {
    name: "Login & Security",
    href: "/guest/account/login-security",
    description: "Manage your login credentials.",
  },
  {
    name: "Payments",
    href: "/guest/account/payments",
    description: "Manage your payment methods.",
  },
];

function AccountMobileMenu() {
  const router = useRouter();

  const name = "Guest User";
  const email = "guest@example.com";

  return (
    <div className="block sm:hidden p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Account</h1>
      <div className="mb-8">
        <span className="text-xl font-medium">{name}, </span>
        <span className="text-gray-500">{email}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tabs.map((tab) => (
          <div
            key={tab.href}
            onClick={() => router.push(tab.href)}
            className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <User className="text-[#B94D3A] mb-2" size={28} />
            <div className="font-semibold text-base hover:text-[#B94D3A]">
              {tab.name}
            </div>
            <div className="text-gray-500 text-sm">{tab.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountDesktopRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth >= 640) {
      router.replace("/guest/account/personal-info");
    }
  }, [router]);

  return null;
}

export default function AccountPage() {
  return (
    <>
    
      <div className="flex min-h-screen">
        {/* Sidebar only visible on desktop */}
        <div className="hidden sm:block">
       
        </div>

        {/* Main content */}
        <main className="flex-1">
          <AccountMobileMenu />
          <AccountDesktopRedirect />
        </main>
      </div>
    </>
  );
}
