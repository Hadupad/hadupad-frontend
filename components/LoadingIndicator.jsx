'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <motion.div
        className="flex items-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/images/logo/icon.png"
          alt="Loading..."
          width={60}
          height={60}
          priority
        />
        <span className="ml-4 font-bold text-4xl text-gray-800">
          Hadupad
        </span>
      </motion.div>
    </div>
  );
}