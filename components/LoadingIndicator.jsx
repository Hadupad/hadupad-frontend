'use client';

import { motion } from 'framer-motion';

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-10">
      <motion.div
        className="h-20 w-20 rounded-full border-4 border-t-4 border-white border-t-blue-700 shadow-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}