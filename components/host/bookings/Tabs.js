"use client";
import { useState } from "react";
import Reservations from "./Reservations";
import Calendar from "./Calendar";

const tabs = [
  { label: "Reservations", component: <Reservations /> },
  { label: "Calendar", component: <Calendar /> }
];

export default function Tabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4">
      {/* Tabs Navigation */}
      <div className="relative border-b border-gray-200">
        <div className="flex gap-8"> {/* Increased gap between tabs */}
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 font-medium relative cursor-pointer transition-colors duration-200
                ${
                  activeTab === idx
                    ? "text-[#B94D3A]"
                    : "text-gray-500 hover:text-[#B94D3A]"
                }`
              }
            >
              {tab.label}
              {activeTab === idx && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#B94D3A]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {tabs[activeTab].component}
      </div>
    </div>
  );
}