"use client";

import { useState } from "react";
import { Search, MoreVertical, MessageCircle, Archive, Users } from "lucide-react";

export default function ConversationSidebar({ onSelectConversation, selectedConversation, userType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "Favour Oyeniyi",
      lastMessage: "Aerial photography from the bathroom",
      time: "9:41 AM",
      avatar: "https://i.pravatar.cc/40?img=1",
      unreadCount: 0,
      isOnline: true,
      isPinned: false,
      type: userType === 'host' ? 'guest' : 'host'
    },
    {
      id: 2,
      name: "Chioma Ridderland",
      lastMessage: "Hey, what's good?",
      time: "9:16 AM",
      avatar: "https://i.pravatar.cc/40?img=2",
      unreadCount: 80,
      isOnline: false,
      isPinned: true,
      type: userType === 'host' ? 'guest' : 'host'
    },
    {
      id: 3,
      name: "Tonye Omono",
      lastMessage: "You Store is out of stock",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/40?img=3",
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: true,
      type: userType === 'host' ? 'guest' : 'host'
    },
    {
      id: 4,
      name: "Reah Livers",
      lastMessage: "I've been there!",
      time: "Thursday",
      avatar: "https://i.pravatar.cc/40?img=4",
      unreadCount: 2,
      isOnline: true,
      isPinned: false,
      type: userType === 'host' ? 'guest' : 'host'
    },
    {
      id: 5,
      name: "Lela Walsh",
      lastMessage: "Next time it's my turn!",
      time: "12/22/21",
      avatar: "https://i.pravatar.cc/40?img=5",
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      type: userType === 'host' ? 'guest' : 'host'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        {/* Logo */}
        <div className="mb-4">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Your Messages</h1>
          </div>
          <button className="p-1">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-0 focus:bg-white"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No conversations found</p>
            <p className="text-sm">Start a new conversation</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                selectedConversation?.id === conversation.id ? "bg-[#DBDDE1] border-l-4 border-l-[#DBDDE1]" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative mr-3">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {conversation.isPinned && (
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    )}
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center space-x-2 ml-2">
                    {conversation.isMuted && (
                      <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                    {conversation.unreadCount > 0 && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
