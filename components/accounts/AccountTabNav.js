'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Personal information', href: '/guest/account/personal-info' },
  { name: 'Login & Security', href: '/guest/account/login-security' },
  { name: 'Payments', href: '/guest/account/payments' },
];

export default function AccountTabNav() {
  const pathname = usePathname();

  return (
    <div className="flex space-x-6 border-b mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`pb-2 border-b-2 text-sm font-medium transition ${
            pathname.startsWith(tab.href)
              ? 'border-red-500 text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
