"use client";

import { useState } from "react";
import { FaSortUp, FaSortDown, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import useReservations from "../../../hooks/useReservations";

export default function DiscountList({ filter = "all" }) {
  const { reservations, loading } = useReservations();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectAll, setSelectAll] = useState(false);
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const getStatus = (dateStr) => {
    const today = new Date();
    const itemDate = new Date(dateStr);
    return itemDate >= today ? "Active" : "Expired";
  };

  // Filter reservations based on the filter prop
  const getFilteredReservations = () => {
    switch (filter.toLowerCase()) {
      case "active":
        return reservations.filter((res) => getStatus(res.date) === "Active");
      case "expired":
        return reservations.filter((res) => getStatus(res.date) === "Expired");
      default:
        return reservations;
    }
  };

  const filteredReservations = getFilteredReservations();

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

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
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
    <th
      className="px-4 py-3 cursor-pointer select-none"
      onClick={() => handleSort(key)}
    >
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

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "Active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-red-100 text-red-800`;
  };

  const getEmptyMessage = () => {
    switch (filter.toLowerCase()) {
      case "active":
        return "No active discounts found.";
      case "expired":
        return "No expired discounts found.";
      default:
        return "No discounts found.";
    }
  };

  return (
    <div className="px-4 lg:px-6 py-4 lg:py-10">
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : sortedReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-lg font-medium">
          {getEmptyMessage()}
        </div>
      ) : (
        <>
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {sortedReservations.map((res, index) => {
              const status = getStatus(res.date);
              return (
                <div key={res.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
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
                        <p className="font-medium text-gray-900">{res.listingName}</p>
                      </div>
                    </div>

                    {/* Collapsible content */}
                    {expandedItems[index] && (
                      <div className="space-y-3 pt-2 border-t border-gray-100">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Ref No.</span>
                          <span className="text-sm font-medium">{res.ref || "12FWKL4"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Price</span>
                          <span className="text-sm font-medium">₦{res.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Nights</span>
                          <span className="text-sm font-medium">{res.nights}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Date</span>
                          <span className="text-sm font-medium">{res.date} at 8:25 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status</span>
                          <span className={getStatusBadge(status)}>
                            {status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Action</span>
                          <div className="flex items-center gap-3 text-gray-500">
                            <FaEye className="cursor-pointer hover:text-black" />
                            <FaPrint className="cursor-pointer hover:text-black" />
                            <FaTrash className="cursor-pointer hover:text-black" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#F3F3F3] text-black">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {renderSortableHeader("Name", "listingName")}
                  {renderSortableHeader("Discount Code", "ref")}
                  {renderSortableHeader("Price", "price")}
                  {renderSortableHeader("Days", "nights")}
                  {renderSortableHeader("Date", "date")}
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {sortedReservations.map((res) => {
                  const status = getStatus(res.date);
                  return (
                    <tr
                      key={res.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-4">
                        <input type="checkbox" checked={selectAll} readOnly />
                      </td>
                      <td className="px-4 py-4">{res.listingName}</td>
                      <td className="px-4 py-4">{res.ref || "R2iopJk"}</td>
                      <td className="px-4 py-4">₦{res.price.toLocaleString()}</td>
                      <td className="px-4 py-4">{res.nights}</td>
                      <td className="px-4 py-4">{res.date}</td>
                      <td className="px-4 py-4">
                        <span className={getStatusBadge(status)}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-4 flex items-center gap-4 text-lg text-gray-500">
                        <FaEye className="cursor-pointer hover:text-black" />
                        <FaPrint className="cursor-pointer hover:text-black" />
                        <FaTrash className="cursor-pointer hover:text-black" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
