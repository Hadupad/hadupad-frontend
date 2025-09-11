"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Phone, Video, MoreVertical, Smile, Paperclip, Mic, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation, onBack, showBackButton, userType }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock messages data
  const mockMessages = [
    {
      id: 1,
      text: "Hi, did you get the deposit?",
      timestamp: "2:14 PM",
      senderId: conversation?.id,
      senderName: conversation?.name,
      isOwn: false,
      status: "read",
      type: "text"
    },
    {
      id: 2,
      text: "Okay, I need access to the rooms",
      timestamp: "2:16 PM",
      senderId: conversation?.id,
      senderName: conversation?.name,
      isOwn: false,
      status: "read",
      type: "text"
    },
    {
      id: 3,
      text: "Keys aren't available at the moment",
      timestamp: "2:18 PM",
      senderId: conversation?.id,
      senderName: conversation?.name,
      isOwn: false,
      status: "read",
      type: "text"
    },
    {
      id: 4,
      text: "Hey, I did, thanks",
      timestamp: "2:16 PM",
      senderId: "me",
      senderName: "You",
      isOwn: true,
      status: "read",
      type: "text"
    },
    {
      id: 5,
      text: "Oh no, they're on the shelf in the living room beside the plant",
      timestamp: "2:20 PM",
      senderId: "me",
      senderName: "You",
      isOwn: true,
      status: "read",
      type: "text"
    },
    {
      id: 6,
      text: "Check this",
      timestamp: "2:22 PM",
      senderId: conversation?.id,
      senderName: conversation?.name,
      isOwn: false,
      status: "read",
      type: "text"
    },
    {
      id: 7,
      text: "",
      timestamp: "2:22 PM",
      senderId: conversation?.id,
      senderName: conversation?.name,
      isOwn: false,
      status: "read",
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop",
      caption: "Aerial photograph from the bathroom"
    }
  ];

  useEffect(() => {
    if (conversation) {
      setMessages(mockMessages);
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      ...messageData,
      senderId: "me",
      senderName: "You",
      isOwn: true,
      status: "sent",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (!conversation) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
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
              src={conversation.avatar}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div>
            <h2 className="font-semibold text-gray-900">{conversation.name}</h2>
            <p className="text-sm text-gray-500">
              {conversation.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>

      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 bg-opacity-30">
        <div className="px-4 py-2">
          {messages.map((message, index) => (
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
                messages[index + 1].senderId !== message.senderId ||
                messages[index + 1].isOwn !== message.isOwn
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
