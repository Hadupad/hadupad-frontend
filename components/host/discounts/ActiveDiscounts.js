"use client";

import { useState } from "react";
import { FaSortUp, FaSortDown, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import useReservations from "../../../hooks/useReservations";

export default function ActiveDiscounts() {
  const { reservations, loading } = useReservations();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectAll, setSelectAll] = useState(false);

  const getStatus = (dateStr) => {
    const today = new Date();
    const itemDate = new Date(dateStr);
    return itemDate >= today ? "Active" : "Expired";
  };

  const activeReservations = reservations.filter(
    (res) => getStatus(res.date) === "Active"
  );

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

  const sortedReservations = [...activeReservations].sort((a, b) => {
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

  return (
    <div className="min-h-screen px-6 py-10">
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : sortedReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-lg font-medium">
          No active discounts found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
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
              {sortedReservations.map((res) => (
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
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-4 flex items-center gap-4 text-lg text-gray-500">
                    <FaEye className="cursor-pointer hover:text-black" />
                    <FaPrint className="cursor-pointer hover:text-black" />
                    <FaTrash className="cursor-pointer hover:text-black" />
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
