"use client";
import { useEffect, useState } from "react";
import AccountTabNav from "../../../../components/accounts/AccountTabNav";

export default function AccountLayout({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("hadupad_user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) return <p>Loading...</p>;

  const basicUserInfo = {
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="pt-20 p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Account</h1>
        <p className="text-sm text-black mb-6">
          {basicUserInfo.name}, {basicUserInfo.email}
        </p>
        <div className="hidden sm:block">
          <AccountTabNav />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
