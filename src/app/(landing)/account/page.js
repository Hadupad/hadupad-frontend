'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

const tabs = [
  {
    name: 'Personal Information',
    href: '/account/personal-info',
    description: 'More information about you.',
  },
  {
    name: 'Login & Security',
    href: '/account/login-security',
    description: 'Manage your login credentials.',
  },
  {
    name: 'Payments',
    href: '/account/payments',
    description: 'Manage your payment methods.',
  },
];


function AccountMobileMenu() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('hadupad_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) return <p className="p-6">Loading...</p>;

  const name = `${userData.firstName} ${userData.lastName}`;
  const email = userData.email;

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
            <div className="font-semibold text-base hover:text-[#B94D3A]">{tab.name}</div>
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
      router.replace('/account/personal-info');
    }
  }, [router]);

  return null;
}

// Page Component
export default function AccountPage() {
  return (
    <>
      <AccountMobileMenu />
      <AccountDesktopRedirect />
    </>
  );
}
