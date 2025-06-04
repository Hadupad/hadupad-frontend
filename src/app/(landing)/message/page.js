'use client';

import React from "react";
import Sidebar from "../../../../components/messages/Sidebar";
import MainBar from "../../../../components/messages/MainBar";
import SubHeader from "../../../../components/messages/SubHeader";
import { useChat } from "../../../../hooks/useChat";

export default function App() {
  const {
    channels,
    selectedChannel,
    setSelectedChannel,
    clearMessages,
    restoreMessages,
  } = useChat();

  return (
    <div className="flex flex-col h-screen pt-30">
      {/* 🔹 SubHeader always on top below Navbar */}
      <SubHeader selectedChannel={selectedChannel}/>

      {/* 🔹 Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          channels={channels}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />
        <MainBar selectedChannel={selectedChannel} />
      </div>

      {/* 🔹 Floating control buttons */}
      <div className="fixed bottom-4 right-4 space-x-2 z-50">
        <button
          onClick={clearMessages}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove Messages
        </button>
        <button
          onClick={restoreMessages}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Bring Back Messages
        </button>
      </div>
    </div>
  );
}
