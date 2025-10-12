"use client";

import { useState, useEffect } from 'react';

export default function AddAccountDetailsModal({ isOpen, onClose, onSave }) {
  const [fullName, setFullName] = useState('FAITH OYENIYI');
  const [accountNumber, setAccountNumber] = useState('2267945310');
  const [bankName, setBankName] = useState('Zenith Bank');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSave = () => {
    const accountData = {
      fullName,
      accountNumber,
      bankName
    };
    onSave(accountData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Add account details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
              placeholder="Enter full name"
            />
            <p className="text-xs text-gray-500 mt-1">As it appears in your bank</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
              placeholder="Enter account number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank name
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
            >
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="First Bank">First Bank</option>
              <option value="UBA">UBA</option>
              <option value="Access Bank">Access Bank</option>
              <option value="Fidelity Bank">Fidelity Bank</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-[#DC4731] text-white py-2 px-4 rounded-md hover:bg-[#c13e2a] font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
