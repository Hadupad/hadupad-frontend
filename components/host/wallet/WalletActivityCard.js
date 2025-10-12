"use client";
import { useState } from "react";

const activityData = [
  { type: "Withdraw", time: "06:24:45 AM", amount: "₦50,000", status: "Pending" },
  { type: "Withdraw", time: "06:24:45 AM", amount: "₦50,000", status: "Completed" },
  { type: "Withdraw", time: "06:24:45 AM", amount: "₦50,000", status: "Canceled" },
  { type: "Withdraw", time: "06:24:45 AM", amount: "₦50,000", status: "Completed" },
  { type: "Withdraw", time: "06:24:45 AM", amount: "₦50,000", status: "Completed" },
];

export default function WalletActivityCard() {
  const [filter, setFilter] = useState("Today");

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-gray-400";
      case "Canceled":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-[28.81px] shadow-sm border p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Wallet Activity</h2>
          <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur</p>
        </div>
        <div className="flex gap-2">
          {["Monthly", "Weekly", "Today"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1 rounded-full text-sm ${
                filter === tab ? "bg-red-500 text-white" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {activityData.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                <span className={`${item.status === "Pending" ? "text-green-500" : "text-purple-500"}`}>
                  {item.status === "Pending" ? "↓" : "↑"}
                </span>
              </div>
              <span className="text-sm font-medium">{item.type}</span>
            </div>
            <span className="text-sm text-gray-500">{item.time}</span>
            <span className="text-sm font-medium">{item.amount}</span>
            <span className={`text-sm font-semibold ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
