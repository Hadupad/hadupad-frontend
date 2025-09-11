'use client';

import { useState } from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';

export default function AdminNavbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
          <span className="ml-2 font-bold text-xl text-gray-900">Hadupad</span>
          <span className="ml-2 text-sm text-gray-500">Admin</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC4731] text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DC4731] text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Hadupad</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <img
              src="/images/logo/li_user.png"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
