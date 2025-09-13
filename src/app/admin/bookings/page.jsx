'use client';

import { useState } from 'react';
import { Calendar, Users, MapPin, DollarSign, Eye, CheckCircle, X, Filter, Search, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminBookings() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [isTabDropdownOpen, setIsTabDropdownOpen] = useState(false);

  // Mock booking data
  const bookings = [
    {
      id: 1,
      refNo: 'J2FWKL4',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      price: 350000,
      nights: 7,
      checkIn: '04/17/23',
      checkOut: '04/24/23',
      status: 'ongoing',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      refNo: '28YTBV6',
      guest: 'Tomi Ayeniko',
      property: 'Sunny side uptown home',
      price: 350000,
      nights: 5,
      checkIn: '04/17/23',
      checkOut: '04/22/23',
      status: 'cancelled',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      refNo: '28YTBV6',
      guest: 'Tomi Ayeniko',
      property: 'Sunny side uptown home',
      price: 350000,
      nights: 5,
      checkIn: '04/17/23',
      checkOut: '04/22/23',
      status: 'upcoming',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      refNo: 'J2FWKL4',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      price: 350000,
      nights: 7,
      checkIn: '04/17/23',
      checkOut: '04/24/23',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      refNo: 'J2FWKL4',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      price: 350000,
      nights: 7,
      checkIn: '04/17/23',
      checkOut: '04/24/23',
      status: 'ongoing',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      refNo: '28YTBV6',
      guest: 'Tomi Ayeniko',
      property: 'Sunny side uptown home',
      price: 350000,
      nights: 5,
      checkIn: '04/17/23',
      checkOut: '04/22/23',
      status: 'cancelled',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 7,
      refNo: '28YTBV6',
      guest: 'Tomi Ayeniko',
      property: 'Sunny side uptown home',
      price: 350000,
      nights: 5,
      checkIn: '04/17/23',
      checkOut: '04/22/23',
      status: 'upcoming',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 8,
      refNo: '390.00',
      guest: 'Faith Oyeniyi',
      property: 'Home away from home',
      price: 350000,
      nights: 7,
      checkIn: '04/17/23',
      checkOut: '04/24/23',
      status: 'completed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch = booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 hidden md:block">Manage all property bookings</p>
        </div>
        <div className="md:hidden">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Search Bar - Desktop Only */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.id === 'all' && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Tab Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsTabDropdownOpen(!isTabDropdownOpen)}
          className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg"
        >
          <span className="text-sm font-medium text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isTabDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isTabDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsTabDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                  activeTab === tab.id ? 'bg-red-50 text-red-600' : 'text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name (Listing, Guest)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ref no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nights
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={booking.avatar}
                        alt={booking.guest}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
                        }}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{booking.property}</div>
                        <div className="text-sm text-gray-500">{booking.guest}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.refNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₦ {booking.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.nights}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>{booking.checkIn}</div>
                    <div className="text-xs text-gray-500">at 6:25 PM</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Desktop Pagination */}
        <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            1 - 8 of 10 Pages
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">The page on</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>1</option>
              <option>2</option>
            </select>
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Accordion View */}
      <div className="md:hidden space-y-3">
        {filteredBookings.map((booking) => (
          <BookingAccordionItem 
            key={booking.id} 
            booking={booking} 
            isSelected={selectedBookings.includes(booking.id)}
            onSelect={() => handleSelectBooking(booking.id)}
            getStatusColor={getStatusColor}
          />
        ))}
      </div>
    </div>
  );
}

// Mobile Accordion Item Component
function BookingAccordionItem({ booking, isSelected, onSelect, getStatusColor }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Collapsed Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={booking.avatar}
            alt={booking.guest}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
            }}
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{booking.property}</div>
            <div className="text-sm text-gray-500">{booking.guest}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(booking.status)}`}>
            {booking.status}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <div className="space-y-3 pt-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Ref No.</span>
              <span className="text-sm font-medium text-gray-900">{booking.refNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-sm font-medium text-gray-900">₦ {booking.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Nights</span>
              <span className="text-sm font-medium text-gray-900">{booking.nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Date</span>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{booking.checkIn}</div>
                <div className="text-xs text-gray-500">at 6:25 PM</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-gray-600">Action</span>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
