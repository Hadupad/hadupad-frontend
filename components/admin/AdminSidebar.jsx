'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', count: null },
    { icon: Users, label: 'Users', href: '/admin/users', count: null },
    { icon: Home, label: 'Listings', href: '/admin/listings', count: '10' },
    { icon: Calendar, label: 'Bookings', href: '/admin/bookings', count: null },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments', count: null },
    { icon: BarChart3, label: 'Reports', href: '/admin/reports', count: null },
    { icon: Settings, label: 'Settings', href: '/admin/settings', count: null },
    { icon: HelpCircle, label: 'Support', href: '/admin/support', count: null },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex-shrink-0 h-[calc(100vh-72px)] overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#DC4731] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive ? 'bg-white text-[#DC4731]' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
