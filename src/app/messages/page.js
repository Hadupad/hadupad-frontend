

"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPreviousConversationAsync, clearFetchConversationState } from "@/redux/slices/fetchConversationSlice";
import ConversationSidebar from "../../../components/messages/ConversationSidebar";
import ChatWindow from "../../../components/messages/ChatWindow";
import WelcomeScreen from "../../../components/messages/WelcomeScreen";

export default function Messages() {
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { user } = useSelector((state) => state.profile);
  const { conversations } = useSelector((state) => state.conversations);
  const { previousConversation, loading, error } = useSelector((state) => state.fetchConversation);

  // Detect mobile screen size and adjust sidebar visibility
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Log conversations and user for debugging
  useEffect(() => {
    //console.log('Conversations from state:', conversations);
    //console.log('User:', user);
  }, [conversations, user]);

  // Update selectedConversation when previousConversation is fetched
  useEffect(() => {
    //console.log('Previous Conversation State:', previousConversation);
    if (previousConversation && previousConversation.conversation) {
      const conversationWithMessages = {
        ...previousConversation.conversation,
        messages: [...(previousConversation.messages || [])].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ),
      };
      setSelectedConversation(conversationWithMessages);
      //console.log('Set Selected Conversation:', conversationWithMessages);
      if (isMobile) {
        setShowSidebar(false);
      }
    }
  }, [previousConversation, isMobile]);

  // Handle conversation selection from sidebar
  const handleSelectConversation = (conversation) => {
    //console.log('Conversation Selected from Sidebar:', conversation);
    if (conversation && conversation.id) {
      setSelectedConversation(conversation);
      //console.log('Fetching conversation details for ID:', conversation.id);
      dispatch(fetchPreviousConversationAsync({ conversationId: conversation.id }));
    } else {
      console.warn('No valid conversation ID found in selected conversation');
    }
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

  // Select first conversation if none is selected and conversations exist
  useEffect(() => {
    if (!selectedConversation && conversations.length > 0) {
      const firstConversation = conversations[0];
      //console.log('Selecting first available conversation:', firstConversation);
      dispatch(fetchPreviousConversationAsync({ conversationId: firstConversation.id }));
    } else if (!selectedConversation && conversations.length === 0) {
      //console.log('No conversations available, showing WelcomeScreen');
      dispatch(clearFetchConversationState());
    }
  }, [dispatch, selectedConversation, conversations]);

  // Clear error state
  useEffect(() => {
    if (error) {
      console.warn('Error fetching conversation:', error);
      dispatch(clearFetchConversationState());
    }
  }, [error, dispatch]);

  // Handle loading and error states
  //console.log('Loading State:', loading, 'Error State:', error);
  if (loading) {
    return <div className="h-full flex items-center justify-center bg-gray-100">Loading conversation...</div>;
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        {error === 'You are not a participant in this conversation' ? (
          <p>You don't have access to this conversation.</p>
        ) : (
          <p>Error: {error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-100">
      <div
        className={`${
          isMobile
            ? showSidebar
              ? "w-full"
              : "hidden"
            : "w-80 border-r border-gray-300"
        } bg-white flex-shrink-0`}
      >
        <ConversationSidebar
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          userType={user?.userType}
        />
      </div>
      <div
        className={`${
          isMobile
            ? showSidebar
              ? "hidden"
              : "w-full"
            : "flex-1"
        } flex flex-col`}
      >
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