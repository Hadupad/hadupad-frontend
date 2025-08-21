"use client";

import { useState } from 'react';

const sections = [
  { id: 'details', label: 'Details' },
  { id: 'description', label: 'Description' },
  { id: 'location', label: 'Location' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'instructions', label: 'Instructions' }
];

export default function PropertySectionNav({ activeSection, onSectionChange }) {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeSection === section.id
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
