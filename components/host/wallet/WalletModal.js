"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";

export default function ClaimModal({ isOpen, onClose }) {
  const [reference, setReference] = useState("");
  const [attachments, setAttachments] = useState([]);

  const resetState = () => {
    setReference("");
    setAttachments([]);
  };

  const handleSubmit = () => {
    alert("Claim submitted!");
    resetState();
    onClose();
  };

  const handleFileRemove = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={() => {
        resetState();
        onClose();
      }}
    >
      <div
        className="bg-white rounded-md w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            resetState();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <IoMdClose size={20} />
        </button>

        {/* Title */}
        <h2 className="text-center font-semibold text-lg mb-4">
          Caution Fee Claim
        </h2>

        {/* Reference Input */}
        <label className="block mb-2 text-sm font-medium">
          Reference Number <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Input guest’s reference number"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-[#DC4731]"
          />
          <label className="cursor-pointer">
            <MdAttachFile className="text-gray-500 text-lg" />
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setAttachments((prev) => [...prev, ...files]);
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Attachments Preview */}
        {attachments.length > 0 ? (
  <>
    <p className="text-sm text-green-600 mb-2">
      {attachments.length} file{attachments.length > 1 ? "s" : ""} added successfully
    </p>
    <div className="space-y-2 mb-4 w-[200px]">
      {attachments.map((file, index) => (
        // <div
        //   key={index}
        //   className="text-sm flex items-center justify-between border border-gray-200 rounded px-2 py-1"
        // >
        //   <div className="truncate">
        //     <div className="font-medium">{file.name}</div>
        //     <div className="text-xs text-gray-500 ml-2">
        //       ({Math.round(file.size / 1024)} KB)
        //     </div>
        //   </div>
        //   <button
        //     onClick={() => handleFileRemove(index)}
        //     className="text-sm text-base font-bold hover:text-red-700 ml-2 cursor-pointer"
        //   >
        //     ✕
        //   </button>
        // </div>

        <div
  key={index}
  className="text-sm flex items-center justify-between border border-gray-200 rounded px-2 py-1 w-full"
>
  <div className="flex items-center gap-2">
    <span className="truncate max-w-[120px] font-medium block">
      {file.name}
    </span>
    <span className="text-xs text-gray-500">
      ({Math.round(file.size / 1024)} KB)
    </span>
  </div>
  <button
    onClick={() => handleFileRemove(index)}
    className="text-sm text-red-500 font-bold hover:text-red-700 ml-2 cursor-pointer"
  >
    ✕
  </button>
</div>

      ))}
    </div>
  </>
) : (
  reference && (
    <p className="text-sm text-red-500 mb-2">
      Please upload at least one attachment to support your claim
    </p>
  )
)}


        {/* Submit Button */}
        <button
          disabled={!reference || attachments.length === 0}
          onClick={handleSubmit}
          className={`w-full mt-4 py-2 text-white rounded ${
            reference && attachments.length
              ? "bg-[#DC4731] hover:bg-[#c03e2b]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Submit Claim
        </button>

        <p className="text-xs text-center mt-3 text-gray-500">
          Keep calm, your fee will be refunded after 24 hours of review
        </p>
      </div>
    </div>
  );
}
