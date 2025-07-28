"use client";

import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";
import { useState } from "react";

export default function Description({ onNext, onBack, handleSaveExit }) {
  const [title, setTitle] = useState("");
  const maxLength = 300;

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <SaveExitButton onClick={handleSaveExit} />
    
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mt-1 mb-2">
Create your description
      </h2>
      <p className="text-sm text-gray-600 mb-2">
What makes your home special? Share it!
      </p>
      <div className="relative w-full max-w-2xl">
        <textarea
          className="w-full p-4 focus:outline-none resize-none rounded-xl border-2 border-gray-300 focus:border-gray-500 shadow-md"
          placeholder="Write your title here..."
          maxLength={maxLength}
          rows={3}
          value={title}
          onChange={handleChange}
        />
        <div className="flex justify-between w-full max-w-2xl mt-1">
          <span className="text-sm text-gray-500">
            {title.length}/{maxLength}
          </span>
        </div>
      </div>
      <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
    </div>
    </>
  );
}