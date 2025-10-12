"use client";

import { useState, useEffect } from 'react';

export default function AddAuthenticationModal({ isOpen, onClose, onSave }) {
  const [authMethod, setAuthMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

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
    const authData = {
      method: authMethod,
      ...(authMethod === 'sms' && { phoneNumber }),
      ...(authMethod === 'email' && { email }),
    };
    onSave(authData);
    onClose();
    // Reset form
    setAuthMethod('');
    setPhoneNumber('');
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add two-factor authentication</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose authentication method
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="authenticator"
                  checked={authMethod === 'authenticator'}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Authenticator app</div>
                  <div className="text-sm text-gray-500">Use Google Authenticator or similar app</div>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="sms"
                  checked={authMethod === 'sms'}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">SMS</div>
                  <div className="text-sm text-gray-500">Receive codes via text message</div>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={authMethod === 'email'}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-500">Receive codes via email</div>
                </div>
              </label>
            </div>
          </div>
          
          {authMethod === 'sms' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
          )}
          
          {authMethod === 'email' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!authMethod}
            className="px-4 py-2 bg-[#DC4731] text-white rounded-md hover:bg-[#c13e2a] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
