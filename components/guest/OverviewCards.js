"use client";

import {
  List,
  Home,
  Wallet,
  Percent,
} from "lucide-react";

const data = [
  {
    label: "Active Listing",
    value: 12,
    icon: <List className="w-5 h-5 text-orange-500" />,
    color: "bg-orange-100",
  },
  {
    label: "Listings",
    value: 8,
    icon: <Home className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-100",
  },
  {
    label: "Total Revenue",
    value: 12,
    icon: <Wallet className="w-5 h-5 text-pink-500" />,
    color: "bg-pink-100",
  },
  {
    label: "Closure Rate",
    value: 12,
    icon: <Percent className="w-5 h-5 text-green-500" />,
    color: "bg-green-100",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((card, i) => (
        <div
          key={i}
          className="p-4 rounded-xl shadow bg-white transition hover:shadow-md"
        >
          {/* Top Label */}
          <div className="text-sm font-bold text-gray-700 mb-4">
            {card.label}
          </div>

          {/* Icon + Value */}
          <div className="flex items-center gap-20">
            <div className={`p-2 rounded-full ${card.color}`}>
              {card.icon}
            </div>
            <div className="text-3xl font-bold">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
