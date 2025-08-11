"use client";

import { useState } from "react";
import { FaSortUp, FaSortDown, FaEye, FaPrint, FaTrash } from "react-icons/fa";

const tabs = [
  { label: "Cleared Guests", value: "cleared" },
  { label: "Claimed Funds", value: "claimed" },
];

const sampleReservations = [
  {
    id: "1",
    listingName: "Luxury Apartment",
    guestName: "John Doe",
    ref: "CLR456",
    price: 75000,
    nights: 5,
    date: "2023-05-20",
    status: "completed",
    paymentStatus: "pending",
    guestAvatar: "https://i.pravatar.cc/100?img=1",
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
    guestAvatar: "https://i.pravatar.cc/100?img=4",
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
    guestAvatar: "https://i.pravatar.cc/100?img=5",
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
    guestAvatar: "https://i.pravatar.cc/100?img=2",
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
    guestAvatar: "https://i.pravatar.cc/100?img=6",
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
    guestAvatar: "https://i.pravatar.cc/100?img=7",
  },
];

export default function Claims() {
  const reservations = sampleReservations;
  const loading = false;

  const [activeTab, setActiveTab] = useState("cleared");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectAll, setSelectAll] = useState(false);

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
    <div className="min-h-screen px-6 py-10">
      {/* Tabs */}
      <div className="flex mb-6 border w-full p-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              setSelectAll(false);
            }}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              activeTab === tab.value ? "bg-[#DC4731] text-white" : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table or Empty State */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : sortedReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-lg font-medium">
          No {activeTab === "cleared" ? "cleared guests" : "claimed funds"} found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
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
      )}
    </div>
  );
}
