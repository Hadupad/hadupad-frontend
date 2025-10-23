"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Search, MessageCircle } from "lucide-react";
import { fetchConversationsAsync } from "@/redux/slices/conversationSlice";

export default function ConversationSidebar({ onSelectConversation, selectedConversation, userType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { conversations, loading, error } = useSelector((state) => state.conversations);

  // Fetch conversations on mount
  useEffect(() => {
    dispatch(fetchConversationsAsync());
  }, [dispatch]);

  // Log conversations after they are fetched
  useEffect(() => {
    //console.log("Conversations from Redux state:", conversations);
  }, [conversations]);

  // Handle conversation selection from query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const conversationId = params.get("conversationId");
    
    if (conversationId && conversations.length > 0) {
      const targetConversation = conversations.find(conv => conv.id === conversationId);
      if (targetConversation && targetConversation.id !== selectedConversation?.id) {
        //console.log("Auto-selecting conversation:", targetConversation);
        onSelectConversation(targetConversation);
        // Clear the query parameter to keep URL clean
        router.replace("/messages", undefined, { shallow: true });
      }
    }
  }, [conversations, router, onSelectConversation, selectedConversation]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) => {
    const participantName = conv.otherParticipants?.[0]
      ? `${conv.otherParticipants[0].firstName} ${conv.otherParticipants[0].lastName}`
      : "";
    return participantName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Log filtered conversations and search query
  useEffect(() => {
    //console.log("Search Query:", searchQuery);
    //console.log("Filtered Conversations:", filteredConversations);
  }, [searchQuery, filteredConversations]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="h-full flex flex-col bg-white animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        {/* Logo */}
        <div className="mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-1">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="p-1">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="relative mb-2">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-full h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Conversations List Skeleton */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-3 border-b border-gray-100"
            >
              {/* Avatar */}
              <div className="relative mr-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-3 w-12 bg-gray-300 rounded"></div>
                </div>
                <div className="h-3 w-36 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
          <p className="text-lg font-medium">Error: {error}</p>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium">No conversations found</p>
          <p className="text-sm">Start a new conversation</p>
        </div>
      ) : (
        <>
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
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  //console.log("Selected Conversation:", conversation);
                  onSelectConversation(conversation);
                }}
                className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                  selectedConversation?.id === conversation.id ? "bg-[#DBDDE1] border-l-4 border-l-[#DBDDE1]" : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative mr-3">
                  <img
                    src={conversation.otherParticipants?.[0]?.profilePicture || "https://i.pravatar.cc/40"}
                    alt={conversation.otherParticipants?.[0] ? `${conversation.otherParticipants[0].firstName} ${conversation.otherParticipants[0].lastName}` : "Unknown"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.otherParticipants?.[0]
                        ? `${conversation.otherParticipants[0].firstName} ${conversation.otherParticipants[0].lastName}`
                        : "Unknown Participant"}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessageAt
                          ? new Date(conversation.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                          : "Unknown Time"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {conversation.Property?.title || "No property title"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}