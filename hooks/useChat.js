// useChat.js
"use client"
import { useState } from "react";

export const useChat = () => {
  const initialChannels = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey! How are you?",
      time: "2:30 PM",
      avatar: "https://i.pravatar.cc/40",
      unread: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Meeting at 4PM",
      time: "1:10 PM",
      avatar: "https://i.pravatar.cc/41",
      unread: false,
    },
  ];

  const [channels, setChannels] = useState(initialChannels);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const clearMessages = () => {
    setChannels([]);
    setSelectedChannel(null);
  };

  const restoreMessages = () => {
    setChannels(initialChannels);
  };

  return {
    channels,
    selectedChannel,
    setSelectedChannel,
    clearMessages,
    restoreMessages,
  };
};
