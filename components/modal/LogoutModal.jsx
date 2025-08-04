import { X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-gray-900 bg-opacity-10 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to log out? This will clear all local storage data.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-[#DC4731] rounded hover:bg-[#b93a29] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}