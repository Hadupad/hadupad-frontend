"use client";

import { useState } from "react";
import { Plus, Send, Smile } from "lucide-react";

export default function MessageInput({ selectedConversation }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!selectedConversation) {
    return null;
  }

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message"
            className="w-full border border-gray-300 px-4 py-2.5 rounded-full outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <button className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors">
              <Smile className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className={`p-1.5 rounded-full transition-colors ${
                message.trim() 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
