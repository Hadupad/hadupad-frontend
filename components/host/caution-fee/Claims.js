"use client";

import { useState } from "react";
import { FaSortUp, FaSortDown, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const tabs = [
  { label: "Cleared Guests", value: "cleared" },
  { label: "Claimed Funds", value: "claimed" },
];

const sampleReservations = [
  {
    id: "1",
    listingName: "Home away from Home",
    guestName: "Faith Oyeniyi",
    ref: "12FWKL4",
    price: 350000,
    nights: 7,
    date: "04/17/23 at 8:25 PM",
    status: "completed",
    paymentStatus: "pending",
    propertyImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: "2",
    listingName: "Mountain Cabin",
    guestName: "Alice Green",
    ref: "CLR102",
    price: 62000,
    nights: 4,
    date: "2023-06-12",
    status: "completed",
    paymentStatus: "unpaid",
    propertyImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: "3",
    listingName: "Desert Retreat",
    guestName: "Charlie Rose",
    ref: "CLR103",
    price: 48000,
    nights: 2,
    date: "2023-06-18",
    status: "completed",
    paymentStatus: "pending",
    propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: "4",
    listingName: "Beach Villa",
    guestName: "Jane Smith",
    ref: "CLM789",
    price: 120000,
    nights: 7,
    date: "2023-06-15",
    status: "completed",
    paymentStatus: "paid",
    propertyImage: "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: "5",
    listingName: "City Loft",
    guestName: "David Cooper",
    ref: "CLM790",
    price: 95000,
    nights: 6,
    date: "2023-07-01",
    status: "completed",
    paymentStatus: "paid",
    propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&crop=center",
  },
  {
    id: "6",
    listingName: "Country House",
    guestName: "Emily Stone",
    ref: "CLM791",
    price: 110000,
    nights: 5,
    date: "2023-07-05",
    status: "completed",
    paymentStatus: "paid",
    propertyImage: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=100&h=100&fit=crop&crop=center",
  },
];

export default function Claims() {
  const reservations = sampleReservations;
  const loading = false;

  const [activeTab, setActiveTab] = useState("cleared");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState({});

  const filteredReservations = reservations.filter((res) => {
    const status = res.status?.toLowerCase();
    const paymentStatus = res.paymentStatus?.toLowerCase();

    return activeTab === "cleared"
      ? status === "completed" && paymentStatus !== "paid"
      : status === "completed" && paymentStatus === "paid";
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleClearGuest = (id) => {
    console.log("Clearing guest with ID:", id);
  };

  const toggleCardExpansion = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase?.() || "";
    const valB = b[sortConfig.key]?.toString().toLowerCase?.() || "";
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortableHeader = (label, key) => (
    <th className="px-4 py-3 cursor-pointer select-none" onClick={() => handleSort(key)}>
      <div className="flex items-center gap-1">
        {label}
        <span className="flex flex-col ml-1 leading-tight">
          <FaSortUp
            className={`text-[10px] ${
              sortConfig.key === key && sortConfig.direction === "asc"
                ? "text-black"
                : "text-gray-300"
            }`}
          />
          <FaSortDown
            className={`-mt-1 text-[10px] ${
              sortConfig.key === key && sortConfig.direction === "desc"
                ? "text-black"
                : "text-gray-300"
            }`}
          />
        </span>
      </div>
    </th>
  );

  return (
    <div className="min-h-screen px-4 lg:px-6 py-4 lg:py-10">
      {/* Mobile: Dropdown Filter */}
      <div className="lg:hidden mb-4">
        <div className="relative">
          <select 
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value);
              setSelectAll(false);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 appearance-none pr-10"
          >
            <option value="cleared">Cleared guests</option>
            <option value="claimed">Claimed Funds</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Desktop: Tabs */}
      <div className="hidden lg:flex mb-4 lg:mb-6 border w-full p-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              setSelectAll(false);
            }}
            className={`flex-1 py-2 lg:py-3 text-xs lg:text-sm font-semibold transition ${
              activeTab === tab.value ? "bg-[#DC4731] text-white" : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : sortedReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-lg font-medium">
          No {activeTab === "cleared" ? "cleared guests" : "claimed funds"} found.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#F3F3F3] text-black">
                <tr>
                  <th className="px-4 py-3">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  </th>
                  {renderSortableHeader("Name (Listing, Guest)", "listingName")}
                  {renderSortableHeader("Ref no.", "ref")}
                  {renderSortableHeader(activeTab === "cleared" ? "Fee" : "Price", "price")}
                  {renderSortableHeader("Nights", "nights")}
                  {renderSortableHeader("Date", "date")}
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {sortedReservations.map((res) => (
                  <tr key={res.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <input type="checkbox" checked={selectAll} readOnly />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={res.guestAvatar || "https://i.pravatar.cc/100"}
                          alt="guest"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{res.guestName || "Guest"}</p>
                          <p className="text-xs text-gray-500">{res.listingName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{res.ref || "N/A"}</td>
                    <td className="px-4 py-4">₦{res.price.toLocaleString()}</td>
                    <td className="px-4 py-4">{res.nights}</td>
                    <td className="px-4 py-4">
                      <div>
                        <div>{res.date}</div>
                        <div className="text-xs text-gray-500">@ 12:30</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          activeTab === "claimed"
                            ? "bg-[#FEE2E2] text-[#DC4731]"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {activeTab === "claimed" ? "Cleared" : "Completed"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {activeTab === "cleared" ? (
                        <button
                          onClick={() => handleClearGuest(res.id)}
                          className="text-xs bg-[#EF4F24] text-white px-3 py-1 rounded hover:bg-[#DC4731] transition"
                        >
                          Clear
                        </button>
                      ) : (
                        <div className="flex items-center gap-4 text-lg text-gray-500">
                          <FaEye className="cursor-pointer hover:text-black" />
                          <FaPrint className="cursor-pointer hover:text-black" />
                          <FaTrash className="cursor-pointer hover:text-black" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {sortedReservations.map((res) => (
              <div key={res.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {/* Card Header */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleCardExpansion(res.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={res.propertyImage || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop&crop=center"}
                        alt="property"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{res.listingName}</p>
                        <p className="text-xs text-gray-500">{res.guestName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedCards[res.id] ? (
                        <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {expandedCards[res.id] && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="space-y-3 mt-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ref No.</span>
                        <span className="font-medium">{res.ref || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price</span>
                        <span className="font-medium">₦{res.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nights</span>
                        <span className="font-medium">{res.nights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium">{res.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            activeTab === "claimed"
                              ? "bg-[#FEE2E2] text-[#DC4731]"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {activeTab === "claimed" ? "Cleared" : "Claimed"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Action</span>
                        <div className="flex items-center gap-3">
                          {activeTab === "cleared" ? (
                            <button
                              onClick={() => handleClearGuest(res.id)}
                              className="text-xs bg-[#EF4F24] text-white px-3 py-1 rounded hover:bg-[#DC4731] transition"
                            >
                              Clear
                            </button>
                          ) : (
                            <div className="flex items-center gap-3 text-gray-500">
                              <FaEye className="cursor-pointer hover:text-black text-sm" />
                              <FaPrint className="cursor-pointer hover:text-black text-sm" />
                              <FaTrash className="cursor-pointer hover:text-black text-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
