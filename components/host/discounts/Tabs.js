"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DiscountList from "./DiscountList";

const tabs = [
  { label: "All Discounts", filter: "all" },
  { label: "Active Discounts", filter: "active" },
  { label: "Expired Discounts", filter: "expired" },
];

const filterOptions = [
  { label: "Active", filter: "active" },
  { label: "Expired", filter: "expired" }, 
  { label: "All", filter: "all" }
];

export default function Discounts() {
  const [activeTab, setActiveTab] = useState(1); // Default to "Active Discounts"
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[1]); // Default to "Active"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentFilter = tabs[activeTab]?.filter || "all";

  return (
    <div className="space-y-4">
      {/* Mobile Filter Dropdown */}
      <div className="lg:hidden px-4">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-left"
          >
            <span className="text-gray-900 font-medium">{selectedFilter.label}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <button
                  key={option.filter}
                  onClick={() => {
                    setSelectedFilter(option);
                    setIsDropdownOpen(false);
                    // Map filter to tab index
                    const tabIndex = tabs.findIndex(tab => tab.filter === option.filter);
                    setActiveTab(tabIndex !== -1 ? tabIndex : 0);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                    selectedFilter.filter === option.filter ? 'text-[#B94D3A] font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden lg:block relative border-b border-gray-200 px-4 lg:px-0">
        <div className="flex gap-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 font-medium relative cursor-pointer transition-colors duration-200 ${
                activeTab === idx
                  ? "text-[#B94D3A]"
                  : "text-gray-500 hover:text-[#B94D3A]"
              }`}
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
        <DiscountList filter={currentFilter} />
      </div>
    </div>
  );
}
