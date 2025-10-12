"use client";

import {
  List,
  Home,
  HandCoins,
  Percent,
} from "lucide-react";

const data = [
  {
    label: "Active Listing",
    value: 12,
    icon: <List className="w-6 h-6 text-orange-600" />,
    color: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Listings",
    value: 8,
    icon: <Home className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Total Revenue",
    value: 12,
    icon: <HandCoins className="w-6 h-6 text-pink-600" />,
    color: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    label: "Closure Rate",
    value: 12,
    icon: <Percent className="w-6 h-6 text-green-600" />,
    color: "bg-green-50",
    borderColor: "border-green-200",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {data.map((card, i) => (
        <div
          key={i}
          className={`bg-white rounded-2xl border ${card.borderColor} p-4 lg:p-6 hover:shadow-lg transition-all duration-200 hover:scale-105`}
        >
          {/* Label */}
          <div className="text-xs lg:text-sm font-medium text-gray-600 mb-3 lg:mb-4">
            {card.label}
          </div>

          {/* Icon + Value */}
          <div className="flex items-center justify-between">
            <div className={`p-2 lg:p-3 rounded-xl ${card.color}`}>
              {card.icon}
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-gray-900">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
