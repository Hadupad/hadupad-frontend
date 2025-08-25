"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function MessageSidebar({ onSelectConversation, hasConversations = true }) {
  const [selectedId, setSelectedId] = useState(1);

  const conversations = [
    { 
      id: 1, 
      name: 'Favour Oyeniyi', 
      message: 'Aerial photography from the bathro', 
      time: '9:41 AM',
      avatar: 'https://i.pravatar.cc/40?img=1',
      online: true
    },
    { 
      id: 2, 
      name: 'Chioma Ridderland', 
      message: "Hey, what's good?", 
      time: '9:16 AM', 
      unread: true, 
      unreadCount: 80,
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    { 
      id: 3, 
      name: 'Tonye Omono', 
      message: 'You Store is out of stock', 
      time: 'Yesterday',
      avatar: 'https://i.pravatar.cc/40?img=3',
      muted: true
    },
    { 
      id: 4, 
      name: 'Reah Livers', 
      message: "I've been there!", 
      time: 'Thursday',
      avatar: 'https://i.pravatar.cc/40?img=4'
    },
    { 
      id: 5, 
      name: 'Lela Walsh', 
      message: "Next time it's my turn!", 
      time: '12/22/21',
      avatar: 'https://i.pravatar.cc/40?img=5'
    },
    { 
      id: 6, 
      name: 'Roland Marks', 
      message: '@woulda Glad to hear that 😊', 
      time: '12/16/21',
      avatar: 'https://i.pravatar.cc/40?img=6'
    },
    { 
      id: 7, 
      name: 'Helen Flatley', 
      message: 'You Ok', 
      time: '12/13/21',
      avatar: 'https://i.pravatar.cc/40?img=7',
      hasCheckmark: true
    },
    { 
      id: 8, 
      name: 'Roland Marks', 
      message: '@woulda Glad to hear that 😊', 
      time: '12/16/21',
      avatar: 'https://i.pravatar.cc/40?img=8'
    },
    { 
      id: 9, 
      name: 'Roland Marks', 
      message: '@woulda Glad to hear that 😊', 
      time: '12/16/21',
      avatar: 'https://i.pravatar.cc/40?img=9'
    }
  ];

  const handleSelectConversation = (conversation) => {
    setSelectedId(conversation.id);
    onSelectConversation?.(conversation);
  };

  // Auto-select first conversation on mount
  useEffect(() => {
    if (conversations.length > 0 && onSelectConversation) {
      onSelectConversation(conversations[0]);
    }
  }, [onSelectConversation]);

  if (!hasConversations) {
    return (
      <aside className="w-[320px] flex-shrink-0 p-4 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              className="w-full rounded-full pl-10 pr-4 py-2 border border-gray-300 placeholder:text-gray-400 text-sm"
              placeholder="Search"
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">You currently have no channels</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[320px] flex-shrink-0 p-4 overflow-y-auto border-r border-gray-200 bg-white">
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className="w-full rounded-full pl-10 pr-4 py-2 border border-gray-300 placeholder:text-gray-400 text-sm"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="space-y-1">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id} 
            onClick={() => handleSelectConversation(conversation)}
            className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
              selectedId === conversation.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="relative">
              <img 
                src={conversation.avatar} 
                alt={conversation.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-gray-900 truncate">{conversation.name}</p>
                <div className="flex items-center gap-1">
                  {conversation.hasCheckmark && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.message}</p>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              {conversation.unread && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {conversation.unreadCount}
                </span>
              )}
              {conversation.muted && (
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.793A1 1 0 019.383 3.076zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
