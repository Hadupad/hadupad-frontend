"use client";

import { useEffect, useState } from "react";
import AccountTabNav from "../../../../components/accounts/AccountTabNav";
import Sidebar from "../../../../components/guest/Sidebar";
import Navbar from "../../../../components/guest/Navbar";

export default function AccountLayout({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Only runs on client side
    const storedUser = localStorage.getItem("hadupad_user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
  }, []);

  const basicUserInfo = userData
    ? {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      }
    : {
        name: "Faith Oyeniyi",
        email: "faithoyeniyi21@gmail.com",
        phoneNumber: "",
      };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Header */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 hidden sm:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-20">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Account</h1>
            <p className="text-sm text-gray-700">
              <span className="font-bold">{basicUserInfo.name}</span> —{" "}
              {basicUserInfo.email}
            </p>
          </header>

          {/* Tabs Navigation */}
          <div className="mb-4 hidden sm:block">
            <AccountTabNav />
          </div>

          {/* Page Content */}
          <section>{children}</section>
        </main>
      </div>
    </div>
  );
}
