"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ConversationSidebar from "../../../components/messages/ConversationSidebar";
import ChatWindow from "../../../components/messages/ChatWindow";
import WelcomeScreen from "../../../components/messages/WelcomeScreen";

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
    if (isMobile) {
      setSelectedConversation(null);
    }
  };

  return (
    <div className="h-full flex bg-gray-100">
      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? (showSidebar ? 'w-full' : 'hidden') 
          : 'w-80 border-r border-gray-300'
      } bg-white flex-shrink-0`}>
        <ConversationSidebar 
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          userType={user?.userType}
        />
      </div>

      {/* Chat Area */}
      <div className={`${
        isMobile 
          ? (showSidebar ? 'hidden' : 'w-full') 
          : 'flex-1'
      } flex flex-col`}>
        {selectedConversation ? (
          <ChatWindow 
            conversation={selectedConversation}
            onBack={handleBackToSidebar}
            showBackButton={isMobile}
            userType={user?.userType}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
}
