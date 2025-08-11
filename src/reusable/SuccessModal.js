'use client';

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { toast } from 'react-toastify';

// Custom CSS to ensure semi-transparent overlay
const styles = `
  .success-modal-overlay {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export default function SuccessModal({ isOpen, onClose, message = "Success!", useToast = false }) {
  // If useToast is true, show a toast instead of the modal
  if (useToast && isOpen) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
      bodyClassName: 'flex items-center',
    });
    // Trigger onClose immediately to prevent modal rendering
    setTimeout(onClose, 0);
    return null;
  }

  return (
    <>
      <style>{styles}</style>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center success-modal-overlay z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-lg relative overflow-hidden"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 opacity-50"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {message}
                </h2>
                <button
                  onClick={onClose}
                  className="mt-1 bg-[#DC4731] text-white py-4 px-6 rounded-md hover:bg-[#c03d29] transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}