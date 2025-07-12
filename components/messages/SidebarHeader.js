// components/messages/SidebarHeader.jsx
import React from 'react';
import { FiMenu } from 'react-icons/fi'; // hamburger icon
import { FiSearch } from 'react-icons/fi'; // search icon

const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 ">
      {/* Hamburger Icon */}
      <button className="text-xl text-gray-700 focus:outline-none">
        <FiMenu />
      </button>

      {/* Search Bar */}
      <div className="relative flex-1 ml-4">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default SidebarHeader;
