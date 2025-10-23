"use client";

import { Check, CheckCheck } from "lucide-react";

export default function MessageBubble({ message, showAvatar, showTimestamp }) {
  const getStatusIcon = () => {
    if (!message.isOwn) return null;

    switch (message.status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case "image":
        return (
          <div className="max-w-xs">
            <img
              src={message.imageUrl}
              alt="Shared image"
              className="rounded-lg w-full h-auto"
            />
            {message.caption && (
              <p className="mt-2 text-sm">{message.caption}</p>
            )}
          </div>
        );
      case "text":
      default:
        return <p className="text-sm">{message.text}</p>;
    }
  };

  return (
    <div className={`flex mb-4 ${message.isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}>
        <div>
          <div
            className={`px-4 py-2 rounded-2xl ${
              message.isOwn
                ? "bg-[#FFEED8] text-gray-900 rounded-br-md"
                : "bg-[#F4F4F4] text-gray-900 border border-gray-200 rounded-bl-md"
            }`}
          >
            {renderMessageContent()}
          </div>
          <div className="flex items-center justify-end mt-1 space-x-1 text-gray-500">
            {getStatusIcon()}
            <span className="text-xs">{message.timestamp}</span>
          </div>
        </div>
        {showAvatar && message.isOwn && (
          <div className="flex-shrink-0 w-10"></div>
        )}
      </div>
    </div>
  );
}