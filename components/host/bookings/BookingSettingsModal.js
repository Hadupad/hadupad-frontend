"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function BookingSettingsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("pricing");
  const [minNights, setMinNights] = useState(1);
  const [maxNights, setMaxNights] = useState(30);
  const [basePrice, setBasePrice] = useState(50000);
  const [advanceNotice, setAdvanceNotice] = useState("Same day");
  const [advanceNoticeTime, setAdvanceNoticeTime] = useState("19:00");
  const [availabilityWindow, setAvailabilityWindow] = useState("12 months in advance");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your booking settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle */}
        <div className="px-4 py-2 text-sm text-gray-600">
          These apply to all nights, unless you customize them by date.
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("pricing")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "pricing"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "availability"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Availability
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {activeTab === "pricing" && (
            <div className="space-y-6">
              {/* Base Price */}
              <div>
                <h3 className="font-semibold mb-4">Base Price</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Per night</span>
                    <span className="text-sm font-medium">NGN</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold">₦</span>
                    <input
                      type="number"
                      value={basePrice}
                      onChange={(e) => setBasePrice(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600">Custom weekend price</span>
                    <button className="text-sm text-red-600 font-medium">Add</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="space-y-6">
              {/* Trip Length */}
              <div>
                <h3 className="font-semibold mb-4">Trip Length</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Minimum nights</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setMinNights(Math.max(1, minNights - 1))}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={minNights}
                        onChange={(e) => setMinNights(Number(e.target.value))}
                        className="flex-1 text-center py-2 border-0 focus:outline-none"
                        min="1"
                      />
                      <button
                        onClick={() => setMinNights(minNights + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Maximum nights</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setMaxNights(Math.max(1, maxNights - 1))}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={maxNights}
                        onChange={(e) => setMaxNights(Number(e.target.value))}
                        className="flex-1 text-center py-2 border-0 focus:outline-none"
                        min="1"
                      />
                      <button
                        onClick={() => setMaxNights(maxNights + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold mb-4">Availability</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Advance notice</label>
                    <select
                      value={advanceNotice}
                      onChange={(e) => setAdvanceNotice(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Same day">Same day</option>
                      <option value="1 day">1 day</option>
                      <option value="2 days">2 days</option>
                      <option value="3 days">3 days</option>
                      <option value="1 week">1 week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Same day advance notice</label>
                    <select
                      value={advanceNoticeTime}
                      onChange={(e) => setAdvanceNoticeTime(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="19:00">19:00</option>
                      <option value="18:00">18:00</option>
                      <option value="17:00">17:00</option>
                      <option value="16:00">16:00</option>
                      <option value="15:00">15:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Availability window</label>
                    <select
                      value={availabilityWindow}
                      onChange={(e) => setAvailabilityWindow(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="3 months in advance">3 months in advance</option>
                      <option value="6 months in advance">6 months in advance</option>
                      <option value="12 months in advance">12 months in advance</option>
                      <option value="24 months in advance">24 months in advance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
