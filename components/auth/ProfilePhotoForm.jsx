import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import LoadingIndicator from '../LoadingIndicator';
import { User, UploadCloud, Facebook } from 'lucide-react';

export default function ProfilePhotoForm({ onProfileSuccess, onSkip, userId }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setImageError('Image size should be less than 2MB.');
        toast.error('Image size should be less than 2MB.');
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError('');
    }
  };

  const handlePhotoSubmit = async () => {
    if (!selectedImage) {
      // If no image, trigger file input instead of showing error
      fileInputRef.current.click();
      return;
    }
    if (!userId) {
      toast.error('User ID is not available.');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        toast.success('Profile photo updated!');
        onProfileSuccess({ photoUrl: imagePreview });
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col h-full p-6 sm:block sm:h-auto sm:px-8 sm:py-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      {/* Top Content */}
      <div>
        {/* Desktop Header */}
        <div className="hidden sm:block text-center mb-6">
          <p className="text-sm font-semibold text-gray-500">STEP 1 OF 1</p>
          <h2 className="text-2xl font-bold mt-1">Add a profile photo</h2>
        </div>
        <p className="text-center text-gray-600 sm:mb-6">
          Pick an image that shows your face. Agents won't be able to see your profile photo until your reservation is confirmed.
        </p>
        <div className="flex justify-center sm:py-2 mt-10 md:mt-0">
          <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed">
            {imagePreview ? (
              <Image src={imagePreview} alt="Selected preview" width={160} height={160} className="object-cover w-full h-full" />
            ) : (
              <User size={80} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom section for buttons */}
      <div>
        {imageError && <p className="text-red-500 text-sm text-center mb-4">{imageError}</p>}
        <div className="space-y-2">
          {/* Desktop Upload Button */}
          <button
            onClick={selectedImage ? handlePhotoSubmit : triggerFileInput}
            disabled={loading}
            className="w-full bg-[#DC4731] text-white py-3 rounded-lg font-bold hover:bg-[#b93a29] disabled:bg-gray-300 hidden sm:flex justify-center items-center gap-1"
          >
            {loading ? <LoadingIndicator /> : <><UploadCloud size={20} /> {selectedImage ? 'Continue' : 'Upload a photo'}</>}
          </button>
          
          {/* Mobile Continue Button */}
          <div className="flex justify-center mt-20 md:mt-0">
            <button
              onClick={handlePhotoSubmit}
              disabled={loading}
              className="w-full bg-[#DC4731] text-white py-3 rounded-lg font-bold hover:bg-[#b93a29] disabled:bg-gray-300 sm:hidden flex justify-center items-center gap-1"
            >
                {loading ? <LoadingIndicator /> : <><UploadCloud size={20} /> {selectedImage ? 'Continue' : 'Upload a photo'}</>}
            </button>

          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-400 rounded-lg p-3 hover:bg-gray-100 transition">
            <Facebook size={20} className="text-blue-600" />
            <span className="font-medium">Use Facebook photo</span>
          </button>
        </div>
        <button onClick={onSkip} className="w-full text-center mt-4 text-sm font-medium underline text-gray-600 hover:text-black">
          I'll do this later
        </button>
      </div>
    </div>
  </div>
  );
}
