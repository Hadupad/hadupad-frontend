// MainBar.jsx
"use client";

import Image from "next/image";
import React from "react";

export default function MainBar({ selectedChannel }) {
  return (
<div className="flex-1 flex flex-col bg-white">
      {selectedChannel ? (
        <>
          {/* Header */}
          <div className="flex items-center p-4 border-b bg-white">
            <img
              src={selectedChannel.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{selectedChannel.name}</h3>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4">
              <div className="bg-white p-3 rounded shadow w-fit">
                {selectedChannel.message}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {selectedChannel.time}
              </div>
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t bg-white flex items-center gap-2">
            <button className="text-gray-500 text-xl">📎</button>
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Type a message"
            />
            <button className="text-white bg-blue-600 px-4 py-2 rounded">
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="mb-2">
  <Image
    src="/images/messages/path.png"
    alt="No Chat"
    width={328}
    height={176}
    className="object-contain"
  />
</div>

          <p>You currently have no channels</p>
        </div>
      )}
    </div>
  );
}
