
"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { sendMessageAsync } from "@/redux/slices/sendMessageSlice";
import { fetchPreviousConversationAsync } from "@/redux/slices/fetchConversationSlice";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation, onBack, showBackButton, userType }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      //console.log('Conversation Prop:', conversation); // Debug log
      const formattedMessages = (conversation.messages || [])
        .map((msg) => ({
          id: msg.id,
          text: msg.decryptedContent,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: msg.senderId,
          senderName: msg.sender?.firstName || (msg.senderId === user?.id ? "You" : "Unknown"),
          isOwn: msg.senderId === user?.id,
          status: msg.readAt ? "read" : "sent",
          type: "text",
          createdAt: msg.createdAt,
        }))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      //console.log('Formatted Messages:', formattedMessages); // Debug log
      setMessages(formattedMessages);
      setIsLoading(false);
    } else {
      //console.log('No conversation provided'); // Debug log
      setIsLoading(false);
    }
  }, [conversation, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageData) => {
    if (!messageData.text?.trim() && !messageData.imageUrl) return;

    const tempId = Date.now().toString();
    const optimisticMessage = {
      id: tempId,
      text: messageData.text || "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      senderName: "You",
      isOwn: true,
      status: "sending",
      type: messageData.type || "text",
      imageUrl: messageData.imageUrl || null,
      createdAt: new Date().toISOString(),
    };

    //console.log('Adding optimistic message:', optimisticMessage); // Debug log
    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const conversationId = conversation.id;
      if (!conversationId) {
        throw new Error("Missing conversation ID");
      }

      const result = await dispatch(
        sendMessageAsync({
          conversationId,
          message: messageData.text,
          type: messageData.type,
        })
      ).unwrap();

      //console.log('Send message result:', result); 
      const serverMessage = {
        ...optimisticMessage,
        id: result.id || tempId,
        status: "sent",
        createdAt: result.createdAt || new Date().toISOString(),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? serverMessage : msg))
      );

      if (conversation.id) {
        //console.log('Fetching updated conversation:', conversation.id); 
        await dispatch(fetchPreviousConversationAsync({ conversationId: conversation.id }));
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const SkeletonLoader = () => (
    <div className="flex flex-col h-full bg-white animate-pulse">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <div className="p-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
          )}
          <div className="relative">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 bg-opacity-30">
        <div className="px-4 py-2 space-y-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex items-end space-x-2 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div
                  className={`h-10 w-${index % 2 === 0 ? "32" : "48"} bg-gray-300 rounded-lg`}
                ></div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  if (!conversation || isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div className="relative">
            <img
              src={conversation.otherParticipants?.[0]?.profilePicture || "/default-avatar.png"}
              alt={conversation.otherParticipants?.[0]?.firstName || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {conversation.otherParticipants?.[0]?.firstName || "Unknown"}
            </h2>
            <p className="text-sm text-gray-500">Last seen recently</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 bg-opacity-30">
        <div className="px-4 py-2">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                showAvatar={
                  index === 0 ||
                  messages[index - 1].senderId !== message.senderId ||
                  messages[index - 1].isOwn !== message.isOwn
                }
                showTimestamp={
                  index === messages.length - 1 ||
                  messages[index + 1]?.senderId !== message.senderId ||
                  messages[index + 1]?.isOwn !== message.isOwn
                }
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}