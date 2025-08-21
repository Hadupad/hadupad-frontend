"use client";

import { useState, useEffect } from 'react';

export default function DeactivateAccountModal({ isOpen, onClose, onSave }) {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [confirmationText, setConfirmationText] = useState('');

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
    if (confirmationText.toLowerCase() !== 'deactivate') {
      alert('Please type "deactivate" to confirm');
      return;
    }
    onSave({ reason, feedback });
    onClose();
    // Reset form
    setReason('');
    setFeedback('');
    setConfirmText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">Deactivate account</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. Your account and all associated data will be permanently removed.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for deactivation
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select a reason</option>
              <option value="not_using">Not using the service anymore</option>
              <option value="privacy_concerns">Privacy concerns</option>
              <option value="found_alternative">Found a better alternative</option>
              <option value="too_expensive">Too expensive</option>
              <option value="technical_issues">Technical issues</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional feedback (optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Help us improve by sharing your feedback..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type "deactivate" to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Type deactivate"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDeactivate}
            disabled={!reason || confirmText.toLowerCase() !== 'deactivate'}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
}
