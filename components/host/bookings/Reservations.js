"use client";

import { useState, useEffect } from "react";
import { FaSortUp, FaSortDown, FaEye, FaPrint, FaTrash, FaChevronDown, FaChevronUp, FaCheck, FaTimes } from "react-icons/fa";
import useReservations from "../../../hooks/useReservations";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cancelBookingAsync, acceptBookingAsync, rejectBookingAsync } from "@/redux/slices/userBookingsSlice";

const tabs = [
  { label: "All Bookings", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Pending", value: "pending" },
];

export default function BookingsPage() {
  const { reservations, loading, error, refetch } = useReservations();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectAll, setSelectAll] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [reason, setReason] = useState("");

  const filteredReservations =
    activeTab === "all"
      ? reservations
      : reservations.filter((res) => res.status === activeTab);

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

  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCancelClick = (id) => {
    setSelectedBookingId(id);
    setModalType("cancel");
    setIsModalOpen(true);
  };

  const handleAcceptClick = async (id) => {
    try {
      await dispatch(acceptBookingAsync(id)).unwrap();
      await refetch();
      toast.success("Booking accepted successfully.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(`Failed to accept booking: ${error}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleRejectClick = (id) => {
    setSelectedBookingId(id);
    setModalType("reject");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error(`${modalType === "cancel" ? "Cancellation" : "Rejection"} reason cannot be empty.`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      if (modalType === "cancel") {
        await dispatch(cancelBookingAsync({ id: selectedBookingId, reason })).unwrap();
        toast.success("Booking cancelled successfully.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (modalType === "reject") {
        await dispatch(rejectBookingAsync({ id: selectedBookingId, reason })).unwrap();
        toast.success("Booking rejected successfully.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      await refetch();
      setIsModalOpen(false);
      setReason("");
      setSelectedBookingId(null);
      setModalType(null);
    } catch (error) {
      toast.error(`Failed to ${modalType === "cancel" ? "cancel" : "reject"} booking: ${error}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReason("");
    setSelectedBookingId(null);
    setModalType(null);
  };

  // Skeleton Loader Components
  const SkeletonTableRow = () => (
    <tr className="border-t border-gray-100">
      <td className="px-4 py-4">
        <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
        </div>
      </td>
    </tr>
  );

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
            <div>
              <div className="w-32 h-4 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="w-24 h-3 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
            <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 lg:px-6 py-6 lg:py-10">
      {/* Tabs */}
      <div className="flex items-center mb-6 border w-full lg:w-auto overflow-hidden p-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              setSelectAll(false);
            }}
            className={`flex-1 lg:flex-none px-2 lg:px-20 py-2 text-xs lg:text-sm font-semibold transition ${
              activeTab === tab.value
                ? "bg-[#EF4F24] text-white"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content - Desktop Table / Mobile Cards */}
      {loading ? (
        <>
          {/* Desktop Skeleton Table */}
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#F3F3F3] text-black">
                <tr>
                  <th className="px-4 py-3">
                    <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                  </th>
                  {renderSortableHeader("Name (Listing, Guest)", "property.title")}
                  {renderSortableHeader("Ref no.", "bookingCode")}
                  {renderSortableHeader("Price", "totalAmount")}
                  {renderSortableHeader("Nights", "nightsCount")}
                  {renderSortableHeader("Date", "checkInDate")}
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[...Array(5)].map((_, index) => (
                  <SkeletonTableRow key={index} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Skeleton Cards */}
          <div className="lg:hidden space-y-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </>
      ) : error ? (
        <div className="text-center py-12 text-red-500 text-lg font-medium">
          Failed to load bookings: {error}
        </div>
      ) : sortedReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-lg font-medium">
          No bookings found.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
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
                  {renderSortableHeader("Name (Listing, Guest)", "property.title")}
                  {renderSortableHeader("Ref no.", "bookingCode")}
                  {renderSortableHeader("Price", "totalAmount")}
                  {renderSortableHeader("Nights", "nightsCount")}
                  {renderSortableHeader("Date", "checkInDate")}
                  <th className="px-4 py-3">Status</th>
                  {activeTab === "all" && <th className="px-4 py-3">Action</th>}
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
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={res.guest?.profilePicture || "https://i.pravatar.cc/100"}
                          alt="guest"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>
                          {res.property?.title || "N/A"} ({res.guest?.firstName} {res.guest?.lastName})
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">{res.bookingCode || "N/A"}</td>
                    <td className="px-4 py-4">₦{parseFloat(res.totalAmount || 0).toLocaleString()}</td>
                    <td className="px-4 py-4">{res.nightsCount || "N/A"}</td>
                    <td className="px-4 py-4">{new Date(res.checkInDate).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          res.status === "upcoming"
                            ? "bg-gray-300 text-black"
                            : res.status === "completed"
                            ? "bg-green-300 text-black"
                            : res.status === "cancelled"
                            ? "bg-red-300 text-black"
                            : res.status === "pending"
                            ? "bg-yellow-200 text-black"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                      </span>
                    </td>
                    {activeTab === "all" && (
                      <td className="px-4 py-4 flex items-center gap-4 text-lg text-gray-500">
                        <FaEye className="cursor-pointer hover:text-black" />
                        <FaPrint className="cursor-pointer hover:text-black" />
                        {res.status === "pending" ? (
                          <>
                            <FaCheck
                              className="cursor-pointer hover:text-green-600"
                              onClick={() => handleAcceptClick(res.id)}
                            />
                            <FaTimes
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => handleRejectClick(res.id)}
                            />
                          </>
                        ) : (
                          <FaTrash
                            className="cursor-pointer hover:text-black"
                            onClick={() => handleCancelClick(res.id)}
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {sortedReservations.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleCardExpansion(res.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={res.guest?.profilePicture || "https://i.pravatar.cc/100"}
                        alt="guest"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{res.property?.title || "N/A"}</h3>
                        <p className="text-sm text-gray-500">{res.guest?.firstName} {res.guest?.lastName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          res.status === "upcoming"
                            ? "bg-gray-300 text-black"
                            : res.status === "completed"
                            ? "bg-green-300 text-black"
                            : res.status === "cancelled"
                            ? "bg-red-300 text-black"
                            : res.status === "pending"
                            ? "bg-yellow-200 text-black"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {res.status === "completed"
                          ? "Success"
                          : res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                      </span>
                      {expandedCards[res.id] ? (
                        <FaChevronUp className="text-gray-400" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedCards[res.id] && (
                  <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                    <div className="space-y-3 mt-4 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Ref No.</span>
                        <p className="font-medium">{res.bookingCode || "N/A"}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Price</span>
                        <p className="font-medium">₦{parseFloat(res.totalAmount || 0).toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Nights</span>
                        <p className="font-medium">{res.nightsCount || "N/A"}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Date</span>
                        <p className="font-medium">{new Date(res.checkInDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <span className="text-gray-500 text-sm">Action</span>
                      <div className="flex items-center gap-4 text-lg text-gray-500">
                        <FaEye className="cursor-pointer hover:text-black" />
                        <FaPrint className="cursor-pointer hover:text-black" />
                        {res.status === "pending" ? (
                          <>
                            <FaCheck
                              className="cursor-pointer hover:text-green-600"
                              onClick={() => handleAcceptClick(res.id)}
                            />
                            <FaTimes
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => handleRejectClick(res.id)}
                            />
                          </>
                        ) : (
                          <FaTrash
                            className="cursor-pointer hover:text-black"
                            onClick={() => handleCancelClick(res.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cancellation/Rejection Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={handleModalClose}
            >
              <div
                className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold text-black mb-4">
                  {modalType === "cancel" ? "Cancel Booking" : "Reject Booking"}
                </h2>
                <form onSubmit={handleModalSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="reason"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Reason for {modalType === "cancel" ? "Cancellation" : "Rejection"}
                    </label>
                    <textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder={`Enter your reason for ${modalType === "cancel" ? "cancelling" : "rejecting"} the booking`}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={handleModalClose}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 text-sm font-medium text-white ${
                        modalType === "cancel"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-red-600 hover:bg-red-700"
                      } rounded-md`}
                    >
                      {modalType === "cancel" ? "Cancel Booking" : "Reject Booking"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}