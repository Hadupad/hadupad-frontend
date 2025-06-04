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

     
    </div>
  );
}
