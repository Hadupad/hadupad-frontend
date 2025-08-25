"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function OverviewBalanceCard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const weeks = [
    { label: "06", value: 300 },
    { label: "07", value: 500 },
    { label: "08", value: 700 },
    { label: "09", value: 400 },
    { label: "10", value: 800 },
    { label: "11", value: 600 },
    { label: "12", value: 900 },
    { label: "13", value: 1000 },
    { label: "14", value: 300 },
    { label: "15", value: 200 },
    { label: "16", value: 450 },
    { label: "17", value: 600 },
    { label: "18", value: 750 },
  ];

  return (
    <div className="bg-white rounded-[28.81px] shadow-sm border p-6 w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">Overview Balance</h2>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur
          </p>
          <p className="text-sm mt-2">
            Last Week{" "}
            <span className="text-green-600 font-semibold">$563,443</span>
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-1 text-sm rounded-full flex items-center gap-1"
            >
              Weekly (2020)
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow p-2 z-10">
                <div className="text-sm cursor-pointer hover:bg-gray-100 px-2 py-1">
                  Monthly
                </div>
                <div className="text-sm cursor-pointer hover:bg-gray-100 px-2 py-1">
                  Yearly
                </div>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold mt-2">$557,235.31</h3>
          <p className="text-sm text-green-600 font-medium">7% ↑</p>
        </div>
      </div>

      
      <div className="flex w-full  min-h-[300px]">
      
        <div className="flex flex-col justify-between mr-4 text-xs text-gray-400 py-2">
          {[1000, 800, 600, 400, 200].map((val) => (
            <div key={val} className="">
              {val}k
            </div>
          ))}
        </div>

       
        <div className="flex items-end justify-between w-full">
          {weeks.map((week, index) => {
            const percentHeight = (week.value / 1000) * 100;
            return (
              <div key={index} className="flex flex-col items-center w-4">
                <div className="relative flex-1 w-2 bg-gray-200 rounded-full overflow-hidden min-h-[160px]">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-[#DC4731]"
                    style={{ height: `${percentHeight}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-2 text-gray-500">{week.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
