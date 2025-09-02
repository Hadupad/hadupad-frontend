'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { updateTitleAsync } from '@/redux/slices/titleSlice';

export default function Title({ onNext, onBack, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const { title: savedTitle, description: savedDescription, loading, error } = useSelector((state) => state.title);
  const [title, setTitle] = useState(savedTitle || '');
  const [description, setDescription] = useState(savedDescription || '');
  const titleMaxLength = 30;
  const descriptionMinLength = 20;
  const descriptionMaxLength = 1000;
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNext = () => {
    if (!property?.id) {
      toast.error('Property ID not found. Please start over.');
      return;
    }

    if (!title.trim()) {
      toast.error('Please provide a title for your property.');
      return;
    }

    if (title.length > titleMaxLength) {
      toast.error(`Title must be ${titleMaxLength} characters or less.`);
      return;
    }

    if (!description.trim()) {
      toast.error('Please provide a description for your property.');
      return;
    }

    if (description.length < descriptionMinLength) {
      toast.error(`Description must be at least ${descriptionMinLength} characters.`);
      return;
    }

    if (description.length > descriptionMaxLength) {
      toast.error(`Description must be ${descriptionMaxLength} characters or less.`);
      return;
    }

    dispatch(updateTitleAsync({
      propertyId: property.id,
      data: { title, description, moveToNextStep: true },
    }))
      .unwrap()
      .then(() => {
        toast.success('Title and description updated successfully');
        onNext();
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : err.message || 'Failed to update title and description';
        toast.error(errorMessage);
      });
  };

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="flex flex-col items-center w-full p-6">
        <h2 className="text-2xl font-bold mt-1 mb-2">
          Now, let's give your house a title and description
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Provide a short title and a detailed description. You can change them later.
        </p>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Title Input */}
        <div className="relative w-full max-w-2xl mb-6">
          <h3 className="text-lg font-semibold mb-2">Title</h3>
          <textarea
            className="w-full p-4 focus:outline-none resize-none rounded-xl border-2 border-gray-300 focus:border-gray-500 shadow-md"
            placeholder="Write your title here..."
            maxLength={titleMaxLength}
            rows={3}
            value={title}
            onChange={handleTitleChange}
          />
          <div className="flex justify-between w-full max-w-2xl mt-1">
            <span className="text-sm text-gray-500">
              {title.length}/{titleMaxLength}
            </span>
          </div>
        </div>

        {/* Description Input */}
        <div className="relative w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <textarea
            className="w-full p-4 focus:outline-none resize-none rounded-xl border-2 border-gray-300 focus:border-gray-500 shadow-md"
            placeholder="Write your description here..."
            maxLength={descriptionMaxLength}
            rows={5}
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="flex justify-between w-full max-w-2xl mt-1">
            <span className="text-sm text-gray-500">
              {description.length}/{descriptionMaxLength}
            </span>
          </div>
        </div>

        <BottomNav
          onBack={onBack}
          onNext={handleNext}
          nextLabel="Continue"
          nextDisabled={loading}
        />
      </div>
    </>
  );
}