"use client";

import { useState, useRef } from "react";
import { Smile, Paperclip, Mic, Send, X, Image, File, Camera } from "lucide-react";

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({
        text: message.trim(),
        type: "text"
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file);
      setShowAttachMenu(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onSendMessage({
          text: "",
          type: "image",
          imageUrl: e.target.result,
          caption: ""
        });
      };
      reader.readAsDataURL(file);
      setShowAttachMenu(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Handle voice recording logic here
  };

  const emojis = ["😀", "😂", "😍", "🥰", "😊", "😎", "🤔", "😢", "😡", "👍", "👎", "❤️", "🔥", "💯", "🎉", "👏"];

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      {/* Attachment Menu */}
      {showAttachMenu && (
        <div className="absolute bottom-16 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
          <div className="grid grid-cols-2 gap-2 w-48">
            <button
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Image className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Photo</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <File className="w-5 h-5 text-green-500" />
              <span className="text-sm">Document</span>
            </button>
            <button className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Camera className="w-5 h-5 text-purple-500" />
              <span className="text-sm">Camera</span>
            </button>
            <button className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Mic className="w-5 h-5 text-red-500" />
              <span className="text-sm">Audio</span>
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
          <div className="grid grid-cols-8 gap-2 w-64">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addEmoji(emoji)}
                className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end space-x-2">
        {/* Attachment Button */}
        <button
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          {showAttachMenu ? <X className="w-5 h-5" /> : <Paperclip className="w-5 h-5" />}
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent max-h-32 overflow-y-auto"
            style={{
              minHeight: "40px",
              height: "auto"
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
            }}
          />
          
          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Send/Voice Button */}
        {message.trim() ? (
          <button
            onClick={handleSend}
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-full transition-colors ${
              isRecording
                ? "bg-red-500 text-white hover:bg-red-600"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
