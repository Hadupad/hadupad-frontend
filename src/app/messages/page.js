"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [hasAutoSelected, setHasAutoSelected] = useState(false);
  
  const { user } = useSelector((state) => state.profile);
  const { conversations } = useSelector((state) => state.conversations);
  const { previousConversation, loading, error } = useSelector((state) => state.fetchConversation);

  // Detect mobile screen size
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

  // Update selectedConversation when previousConversation is fetched
  useEffect(() => {
    // console.log('previousConversation updated:', previousConversation);
    
    if (previousConversation) {
      // Check different possible response structures
      let conversationData = null;
      let messagesData = [];

      // Structure 1: { conversation: {...}, messages: [...] }
      if (previousConversation.conversation && previousConversation.messages) {
        conversationData = previousConversation.conversation;
        messagesData = previousConversation.messages;
      }
      // Structure 2: { data: { conversation: {...}, messages: [...] } }
      else if (previousConversation.data?.conversation && previousConversation.data?.messages) {
        conversationData = previousConversation.data.conversation;
        messagesData = previousConversation.data.messages;
      }
      // Structure 3: Direct conversation object with messages array
      else if (previousConversation.id && previousConversation.messages) {
        conversationData = previousConversation;
        messagesData = previousConversation.messages;
      }

      // console.log('Extracted conversationData:', conversationData);
      // console.log('Extracted messagesData:', messagesData);

      if (conversationData) {
        const conversationWithMessages = {
          ...conversationData,
          messages: Array.isArray(messagesData) 
            ? [...messagesData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            : [],
        };
        
        // console.log('Setting conversation with messages:', conversationWithMessages);
        setSelectedConversation(conversationWithMessages);
        
        if (isMobile) {
          setShowSidebar(false);
        }
      }
    }
  }, [previousConversation, isMobile]);

  // Handle conversation selection
  const handleSelectConversation = useCallback((conversation) => {
    // console.log('Conversation selected:', conversation);
    if (conversation && conversation.id) {
      // Don't set selectedConversation here - wait for previousConversation
      // console.log('Fetching conversation details for ID:', conversation.id);
      dispatch(fetchPreviousConversationAsync({ conversationId: conversation.id }));
    } else {
      console.warn('No valid conversation ID');
    }
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [dispatch, isMobile]);

  const handleBackToSidebar = useCallback(() => {
    setShowSidebar(true);
    if (isMobile) {
      setSelectedConversation(null);
    }
  }, [isMobile]);

  // Auto-select first conversation
  useEffect(() => {
    if (!hasAutoSelected && !selectedConversation && conversations.length > 0) {
      const firstConversation = conversations[0];
      // console.log('Auto-selecting first conversation:', firstConversation.id);
      dispatch(fetchPreviousConversationAsync({ conversationId: firstConversation.id }));
      setHasAutoSelected(true);
    } else if (!selectedConversation && conversations.length === 0) {
      dispatch(clearFetchConversationState());
    }
  }, [conversations.length, hasAutoSelected, selectedConversation, dispatch]);

  // Clear error state
  useEffect(() => {
    if (error) {
      console.warn('Error fetching conversation:', error);
      dispatch(clearFetchConversationState());
    }
  }, [error, dispatch]);

  // Handle loading state
  if (loading && !selectedConversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error && !selectedConversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error === 'You are not a participant in this conversation' 
              ? "You don't have access to this conversation." 
              : `Error: ${error}`}
          </p>
          <button
            onClick={() => dispatch(clearFetchConversationState())}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Messages
          </button>
        </div>
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