'use client';

import { useState } from 'react';
import { Eye, Printer, Trash2, Search } from 'lucide-react';

export default function AdminUsersPage() {
  const [activeMainTab, setActiveMainTab] = useState('guests');
  const [activeFilterTab, setActiveFilterTab] = useState('all');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '02',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'Pending',
      avatar: '/images/users/user1.jpg'
    },
    {
      id: 2,
      name: 'Tami Aiyeniko',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '00',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'Verified',
      avatar: '/images/users/user2.jpg'
    },
    {
      id: 3,
      name: 'Tami Aiyeniko',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '05',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'New',
      avatar: '/images/users/user3.jpg'
    },
    {
      id: 4,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '12',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'Verified',
      avatar: '/images/users/user4.jpg'
    },
    {
      id: 5,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '02',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'Pending',
      avatar: '/images/users/user5.jpg'
    },
    {
      id: 6,
      name: 'Tami Aiyeniko',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '02',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'Pending',
      avatar: '/images/users/user6.jpg'
    },
    {
      id: 7,
      name: 'Tami Aiyeniko',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '02',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'New',
      avatar: '/images/users/user7.jpg'
    },
    {
      id: 8,
      name: 'Faith Oyeniyi',
      email: 'faithoyeniyi20@gmail.com',
      phone: '08065527593',
      bookings: '02',
      dateJoined: '04/17/23 at 8:25 PM',
      status: 'Verified',
      avatar: '/images/users/user8.jpg'
    }
  ];

  const getFilteredUsers = () => {
    switch (activeFilterTab) {
      case 'new':
        return users.filter(user => user.status === 'New');
      case 'verified':
        return users.filter(user => user.status === 'Verified');
      case 'reported':
        return users.filter(user => user.status === 'Reported');
      default:
        return users;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    switch (status) {
      case 'Verified':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'New':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'Reported':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedUsers(getFilteredUsers().map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
      setSelectAll(false);
    }
  };

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex space-x-8 mb-6">
        <button
          onClick={() => setActiveMainTab('guests')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeMainTab === 'guests'
              ? 'border-[#DC4731] text-[#DC4731]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Guests
        </button>
        <button
          onClick={() => setActiveMainTab('hosts')}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeMainTab === 'hosts'
              ? 'border-[#DC4731] text-[#DC4731]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Hosts
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveFilterTab('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeFilterTab === 'all'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Guests
        </button>
        <button
          onClick={() => setActiveFilterTab('new')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeFilterTab === 'new'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          New Guests
        </button>
        <button
          onClick={() => setActiveFilterTab('verified')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeFilterTab === 'verified'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Verified Guests
        </button>
        <button
          onClick={() => setActiveFilterTab('reported')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeFilterTab === 'reported'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Reported
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#DC4731] focus:ring-[#DC4731]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. of Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      className="rounded border-gray-300 text-[#DC4731] focus:ring-[#DC4731]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.dateJoined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredUsers.map((user, index) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Full Name</span>
                        <button 
                          onClick={() => toggleExpanded(index)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedItems[index] ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                </div>

                {/* Collapsible content */}
                {expandedItems[index] && (
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Email address</span>
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Phone No</span>
                      <span className="text-sm font-medium">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">No. of Bookings</span>
                      <span className="text-sm font-medium">{user.bookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date joined</span>
                      <span className="text-sm font-medium">{user.dateJoined}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Action</span>
                      <div className="flex items-center space-x-3">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
