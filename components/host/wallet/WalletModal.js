"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Wallet({ isOpen, onClose }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const resetState = () => {
    setAccountNumber("");
    setBankName("");
  };

  const handleSubmit = () => {
    alert("Details submitted!");
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
        <h2 className="text-center font-semibold text-lg mb-4">
          Caution Fee Claim
        </h2>

        {/* Account Number Input */}
        <label className="block mb-2 text-sm font-medium">Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          className="w-full border border-gray-300 px-4 py-2 rounded-full mb-4 focus:outline-none focus:border-[#DC4731]"
        />

        {/* Bank Name Dropdown */}
        <label className="block mb-2 text-sm font-medium">Bank Name</label>
        <select
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-[#DC4731]"
        >
          <option value="">Select Bank</option>
          <option value="access">Access Bank</option>
          <option value="gtb">GTBank</option>
          <option value="uba">UBA</option>
          <option value="zenith">Zenith Bank</option>
          <option value="first">First Bank</option>
        </select>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 text-white rounded bg-[#DC4731] hover:bg-[#c03e2b]"
        >
          Add wallet
        </button>

        
      </div>
    </div>
  );
}
