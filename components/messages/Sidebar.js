"use client";

import Image from "next/image";
import React from "react";
import SidebarHeader from "./SidebarHeader"; // Make sure this path is correct

export default function Sidebar({
  channels,
  selectedChannel,
  setSelectedChannel,
}) {
  return (
    <div className="w-1/4 border-r border-gray-300 p-4 bg-white">
      {/* Header with Hamburger and Search */}
      <SidebarHeader />

      {/* Channel List */}
      <div className="p-4">
        {channels.length === 0 ? (
          <div className="text-gray-400 text-center mt-20">
            <div className="mb-2 flex justify-center">
              <Image
                src="/images/messages/path.png"
                alt="No Chat"
                width={95}
                height={95}
                className="w-12 h-12 object-contain"
              />
              {/* <img src="/messages/path.png" alt="No Chats" className="w-12 h-12 object-contain" /> */}
            </div>
            <p>You currently have no channels</p>
          </div>
        ) : (
          <ul>
            {channels.map((channel) => (
              <li
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-100 ${
                  selectedChannel?.id === channel.id ? "bg-gray-200" : ""
                }`}
              >
                <img
                  src={channel.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{channel.name}</span>
                    <span className="text-xs text-gray-400">
                      {channel.time}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {channel.message}
                  </div>
                </div>
                {channel.unread && (
                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    1
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
