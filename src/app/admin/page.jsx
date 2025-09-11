'use client';

import { useState } from 'react';
import { Users, Home, Calendar, DollarSign, MapPin, Eye, CheckCircle, X } from 'lucide-react';

export default function AdminDashboard() {
  const [showAllProfit, setShowAllProfit] = useState(false);
  const [showAllGrowth, setShowAllGrowth] = useState(false);
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Sample data for listings approval
  const pendingListings = [
    {
      id: 1,
      image: '/images/hero/hero1.jpg',
      title: 'Home away from home',
      host: 'Faith Oyeniyi',
      code: '19FWKL4',
      price: '₦ 350,000',
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      date: '04/17/25 at 6:52pm'
    },
    {
      id: 2,
      image: '/images/hero/hero2.jpg',
      title: 'Home away from home',
      host: 'Faith Oyeniyi',
      code: '19FWKL4',
      price: '₦ 350,000',
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      date: '04/17/25 at 6:52pm'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of guests and hosts platform and metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col h-full">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Total Users</p>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">12</p>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9500]" />
              </div>
            </div>
          </div>
        </div>

        {/* New Listings */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col h-full">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">New Listings</p>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">8</p>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F80ED]" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col h-full">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Active Bookings</p>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">12</p>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#27AE60]" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col h-full">
            <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">Total Revenue</p>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">12</p>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#9B51E0]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your profit this year */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your profit this year</h3>
            <button 
              onClick={() => setShowAllProfit(!showAllProfit)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              Show All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-8 mb-6">
            <div>
              <p className="text-sm text-gray-600">Average last period</p>
              <p className="text-xl font-bold text-gray-900">$ 211,411,253</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average this period</p>
              <p className="text-xl font-bold text-[#DC4731]">$ 339,000,000</p>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <path
                d="M 20 150 Q 80 120 120 130 T 200 110 T 280 90 T 360 70"
                stroke="#DC4731"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 20 170 Q 80 160 120 155 T 200 145 T 280 140 T 360 135"
                stroke="#FFA500"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Customer Growth- 2 Provinces */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Growth- 2 Provinces</h3>
            <button 
              onClick={() => setShowAllGrowth(!showAllGrowth)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              Show All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Lagos (50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Abuja (50%)</span>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Nigeria Map View</p>
              <p className="text-xs text-gray-400">Customer distribution across provinces</p>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Listings Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Approve Listing</h3>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{listing.title}</p>
                        <p className="text-sm text-gray-500">{listing.host}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <p>{listing.code}</p>
                      <p className="font-semibold">{listing.price}</p>
                      <p className="text-gray-500">
                        {listing.guests} guests • {listing.bedrooms} bedroom • {listing.bathrooms} bath
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {listing.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="bg-[#DC4731] text-white px-4 py-2 rounded-lg hover:bg-[#B83A29] transition-colors">
                        Accept
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                        Decline
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
          {pendingListings.map((listing, index) => (
            <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Name</span>
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
                      <p className="font-medium text-gray-900">{listing.title}</p>
                      <p className="text-sm text-gray-500">{listing.host}</p>
                    </div>
                  </div>
                </div>

                {/* Collapsible content */}
                {expandedItems[index] && (
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Ref No.</span>
                      <span className="text-sm font-medium">{listing.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="text-sm font-medium">{listing.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Nights</span>
                      <span className="text-sm font-medium">{listing.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date</span>
                      <span className="text-sm font-medium">{listing.date} at 8:25 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <div className="flex space-x-2">
                        <button className="bg-[#DC4731] text-white px-3 py-1 rounded text-xs">
                          Accept
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs">
                          Decline
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

      {/* Recent Activities Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {[
            {
              id: 1,
              title: "Home away from Home listing",
              tag: "#12FKayL",
              details: "2 Guests • 1 Bed • 1 Bath",
              image: "/images/properties/property1.jpg"
            },
            {
              id: 2,
              title: "New city, New adventure listing",
              tag: "#12FKayL",
              details: "2 Guests • 1 Bed • 1 Bath",
              image: "/images/properties/property2.jpg"
            }
          ].map((activity) => (
            <div key={activity.id} className="p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {activity.tag}
                    </span>
                    <span className="text-xs text-gray-500">{activity.details}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4">
          {[
            {
              id: 1,
              title: "Review reported accounts",
              description: "Review, resolve or suspend reported account in five days or account will be suspended automatically.",
              priority: "high"
            },
            {
              id: 2,
              title: "Approve listings",
              description: "Approve new listings by host in 24hrs to enable them to receive bookings.",
              priority: "medium"
            },
            {
              id: 3,
              title: "Review reported accounts",
              description: "Review, resolve or suspend reported account in five days or account will be suspended automatically.",
              priority: "high"
            }
          ].map((task) => (
            <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  task.priority === 'high' 
                    ? 'border-red-500 bg-red-100' 
                    : 'border-orange-500 bg-orange-100'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${
                    task.priority === 'high' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
