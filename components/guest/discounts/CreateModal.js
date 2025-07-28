"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function CreateModal({ isOpen, onClose }) {
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");

  const resetState = () => {
    setReference("");
    setAmount("");
    setDays("");
  };

  const handleSubmit = () => {
    alert("Discount created!");
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={() => {
        resetState();
        onClose();
      }}
    >
      <div
        className="bg-white rounded-md w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            resetState();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <IoMdClose size={20} />
        </button>

        {/* Title */}
        <h2 className="text-center font-semibold text-lg mb-4">Create Discount</h2>

        {/* Name of Discount */}
        <label className="block mb-2 text-sm font-bold">
          Name of discount <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Enter discount name"
          className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-[#DC4731] mb-4"
        />

        {/* Amount and Days Side by Side */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-bold">
              Amount (₦) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-[#DC4731]"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-sm font-bold">
              No. of Days <span className="text-red-500">*</span>
            </label>
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-[#DC4731]"
            >
              <option value="">Select</option>
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} day{i + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={!reference || !amount || !days}
          onClick={handleSubmit}
          className={`w-full mt-2 py-2 text-white rounded ${
            reference && amount && days
              ? "bg-[#DC4731] hover:bg-[#c03e2b]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Submit Discount
        </button>

        <p className="text-xs text-center mt-3 text-gray-500">
          Keep calm, your discount will be processed shortly after review.
        </p>
      </div>
    </div>
  );
}
