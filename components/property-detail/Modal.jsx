'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, children }) {
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

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-4 pt-8 overflow-y-auto"
      style={{ zIndex: 999999 }}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto my-8 relative">
        {children}
      </div>
    </div>,
    document.body
  );
}
