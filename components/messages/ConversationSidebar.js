"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, MessageCircle } from "lucide-react";
import { fetchConversationsAsync } from "@/redux/slices/conversationSlice";

export default function ConversationSidebar({ onSelectConversation, selectedConversation, userType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const dispatch = useDispatch();
  const { conversations, loading, error } = useSelector((state) => state.conversations);

  // Fetch conversations only once
  useEffect(() => {
    if (!hasFetched) {
      // console.log("Fetching conversations...");
      dispatch(fetchConversationsAsync());
      setHasFetched(true);
    }
  }, [hasFetched, dispatch]);

  // Memoize filtered conversations
  const filteredConversations = useMemo(() => {
    if (!Array.isArray(conversations)) return [];
    
    return conversations.filter((conv) => {
      const participantName = conv.otherParticipants?.[0]
        ? `${conv.otherParticipants[0].firstName} ${conv.otherParticipants[0].lastName}`
        : "";
      return participantName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [conversations, searchQuery]);

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="h-full flex flex-col bg-white animate-pulse">
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-10 bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="flex items-center px-4 py-3 border-b">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-36 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p className="text-lg font-medium">Error: {error}</p>
        <button 
          onClick={() => {
            setHasFetched(false);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex flex-col items-center justify-center flex-1 text-gray-500">
          <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No conversations yet</p>
          <p className="text-sm">Start a new conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="mb-4">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Your Messages</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p className="text-sm">No conversations match your search</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                selectedConversation?.id === conversation.id ? "bg-[#DBDDE1] border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="relative mr-3">
                <img
                  src={conversation.otherParticipants?.[0]?.profilePicture || "https://i.pravatar.cc/40"}
                  alt={conversation.otherParticipants?.[0] ? `${conversation.otherParticipants[0].firstName}` : "User"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {conversation.otherParticipants?.[0]
                      ? `${conversation.otherParticipants[0].firstName} ${conversation.otherParticipants[0].lastName}`
                      : "Unknown User"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {conversation.lastMessageAt
                      ? new Date(conversation.lastMessageAt).toLocaleTimeString([], { 
                          hour: "2-digit", 
                          minute: "2-digit" 
                        })
                      : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.Property?.title || "No property"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}