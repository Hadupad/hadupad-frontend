'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminListingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('active');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedListings, setSelectedListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  // Sample listings data - matching actual property data
  const allListings = [
    {
      id: 1,
      name: 'Luxury Waterfront Villa',
      host: 'Adebayo Johnson',
      listingNo: '12FWKL4',
      price: '₦ 150,000',
      amenities: '4 guests • 4 bedroom\n4 bed • 3 bath',
      availability: '04/17/25 till\n05/17/25',
      status: 'Approved',
      avatar: '/images/users/user1.jpg'
    },
    {
      id: 2,
      name: 'Modern Penthouse Suite',
      host: 'Funmi Adebisi',
      listingNo: '12FWKL5',
      price: '₦ 250,000',
      amenities: '3 guests • 3 bedroom\n3 bed • 2 bath',
      availability: '04/17/25 till\n05/17/25',
      status: 'Approved',
      avatar: '/images/users/user2.jpg'
    },
    {
      id: 3,
      name: 'Cozy Garden Apartment',
      host: 'Chidi Okafor',
      listingNo: '12FWKL6',
      price: '₦ 85,000',
      amenities: '2 guests • 2 bedroom\n2 bed • 2 bath',
      availability: '04/17/25 till\n05/17/25',
      status: 'Approved',
      avatar: '/images/users/user3.jpg'
    },
    {
      id: 4,
      name: 'Executive Duplex',
      host: 'Kemi Adesanya',
      listingNo: '13GWML5',
      price: '₦ 300,000',
      amenities: '5 guests • 5 bedroom\n5 bed • 4 bath',
      availability: '05/01/25 till\n06/01/25',
      status: 'Pending',
      avatar: '/images/users/user4.jpg'
    },
    {
      id: 5,
      name: 'Beachfront Bungalow',
      host: 'Tunde Bakare',
      listingNo: '14HXNM6',
      price: '₦ 120,000',
      amenities: '3 guests • 3 bedroom\n3 bed • 2 bath',
      availability: '06/15/25 till\n07/15/25',
      status: 'Reported',
      avatar: '/images/users/user5.jpg'
    },
    {
      id: 6,
      name: 'City Center Studio',
      host: 'Aisha Mohammed',
      listingNo: '15IYON7',
      price: '₦ 65,000',
      amenities: '1 guests • 1 bedroom\n1 bed • 1 bath',
      availability: '07/01/25 till\n08/01/25',
      status: 'Pending',
      avatar: '/images/users/user6.jpg'
    }
  ];

  const getFilteredListings = () => {
    switch (activeTab) {
      case 'all':
        return allListings;
      case 'pending':
        return allListings.filter(listing => listing.status === 'Pending');
      case 'active':
        return allListings.filter(listing => listing.status === 'Approved');
      case 'reported':
        return allListings.filter(listing => listing.status === 'Reported');
      default:
        return allListings;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded text-xs font-medium";
    switch (status) {
      case 'Approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Reported':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getActionButton = (status) => {
    const baseClasses = "px-3 py-1 rounded text-xs font-medium";
    switch (status) {
      case 'Approved':
        return `${baseClasses} bg-gray-200 text-gray-700`;
      case 'Pending':
        return `${baseClasses} bg-gray-200 text-gray-700`;
      case 'Reported':
        return `${baseClasses} bg-gray-200 text-gray-700`;
      default:
        return `${baseClasses} bg-gray-200 text-gray-700`;
    }
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedListings(getFilteredListings().map(listing => listing.id));
    } else {
      setSelectedListings([]);
    }
  };

  const handleSelectListing = (listingId, checked) => {
    if (checked) {
      setSelectedListings(prev => [...prev, listingId]);
    } else {
      setSelectedListings(prev => prev.filter(id => id !== listingId));
      setSelectAll(false);
    }
  };

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePropertyClick = (listing) => {
    const propertyName = listing.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/admin/property/${listing.id}/${propertyName}`);
  };

  const filteredListings = getFilteredListings();
  const totalPages = 10; // As shown in the UI

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
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

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'all'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Listings
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'pending'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'active'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active Listings
        </button>
        <button
          onClick={() => setActiveTab('reported')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'reported'
              ? 'bg-[#DC4731] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Reported Listings
        </button>
      </div>

      {/* Listings Table */}
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
                  Name (Listing, Guest)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amenities
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedListings.includes(listing.id)}
                      onChange={(e) => handleSelectListing(listing.id, e.target.checked)}
                      className="rounded border-gray-300 text-[#DC4731] focus:ring-[#DC4731]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={listing.avatar}
                        alt={listing.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <button
                          onClick={() => handlePropertyClick(listing)}
                          className="text-sm font-medium text-gray-900 hover:text-[#DC4731] cursor-pointer transition-colors text-left"
                        >
                          {listing.name}
                        </button>
                        <div className="text-sm text-gray-500">{listing.host}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {listing.listingNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {listing.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="whitespace-pre-line">{listing.amenities}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="whitespace-pre-line">{listing.availability}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={getStatusBadge(listing.status)}>
                        {listing.status}
                      </span>
                      <button className={getActionButton(listing.status)}>
                        Review
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
          {filteredListings.map((listing, index) => (
            <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={listing.avatar}
                      alt={listing.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-500">Name (Listing, Guest)</span>
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
                      <button
                        onClick={() => handlePropertyClick(listing)}
                        className="font-medium text-gray-900 hover:text-[#DC4731] cursor-pointer transition-colors text-left"
                      >
                        {listing.name}
                      </button>
                      <p className="text-sm text-gray-500">{listing.host}</p>
                    </div>
                  </div>
                </div>

                {/* Collapsible content */}
                {expandedItems[index] && (
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Listing no.</span>
                      <span className="text-sm font-medium">{listing.listingNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="text-sm font-medium">{listing.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amenities</span>
                      <span className="text-sm font-medium text-right whitespace-pre-line">{listing.amenities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Availability</span>
                      <span className="text-sm font-medium text-right whitespace-pre-line">{listing.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <div className="flex items-center space-x-2">
                        <span className={getStatusBadge(listing.status)}>
                          {listing.status}
                        </span>
                        <button className={getActionButton(listing.status)}>
                          Review
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          1 - 6 of {totalPages} Pages
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">The page on</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
