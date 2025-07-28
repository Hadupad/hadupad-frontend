"use client";

import { Save } from "lucide-react"; // Or use a different icon if preferred

export default function SaveExitButton({ onClick, label = "Save & Exit" }) {
  return (<div className="flex justify-end mb-5 -mt-5">
  <button
    onClick={onClick}
    className="flex items-center h-9 px-4 rounded-full bg-white hover:bg-gray-100 shadow border transition-all duration-300 w-32"
  >
    <span className="text-sm text-gray-700 whitespace-nowrap">
      {label}
    </span>
  </button>
</div>

    
  );
}
