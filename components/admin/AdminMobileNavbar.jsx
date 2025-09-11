'use client';

import { useState } from 'react';
import { Menu, X, Search, Bell, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminMobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Listings', href: '/admin/listings' },
    { label: 'Bookings', href: '/admin/bookings' },
    { label: 'Payments', href: '/admin/payments' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Support', href: '/admin/support' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <img className="w-8 h-8" src="/images/logo/icon.png" alt="Logo" />
            <span className="ml-2 font-bold text-lg text-gray-900">Hadupad</span>
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC4731] text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC4731] text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img className="w-8 h-8" src="/images/logo/icon.png" alt="Logo" />
            <span className="ml-2 font-bold text-lg text-gray-900">Admin</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#DC4731] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
