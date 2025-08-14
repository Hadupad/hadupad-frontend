'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePhoto, resetProfilePhotoState } from '../../../../redux/slices/profilePhotoSlice';
import { X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to extract userId from persist:root string
const getUserIdFromPersistRoot = () => {
  try {
    const persistRootString = localStorage.getItem('persist:root');
    if (!persistRootString) return null;
    const persistRoot = JSON.parse(persistRootString);
    const initiate = JSON.parse(persistRoot.initiate);
    return initiate.user?.userId || null;
  } catch (error) {
    console.error('Error parsing persist:root:', error);
    return null;
  }
};

const ProfilePhotoCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.profilePhoto);
  // Fallback to Redux state, localStorage, or persist:root for userId
  const reduxUserId = useSelector((state) => state.guestSignup?.user?.id || state.initiate?.user?.id);
  const localStorageUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const userId = reduxUserId || localStorageUserId || getUserIdFromPersistRoot();

  const handleBack = () => {
    router.back();
  };

  const handleComplete = (result) => {
    // Handle completion logic here if needed
    console.log('Profile photo upload completed:', result);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toastOptions = {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
    bodyClassName: 'flex items-center',
  };

  useEffect(() => {
    dispatch(resetProfilePhotoState()); // Reset state on mount

    // Show toast if userId is missing
    if (!userId) {
      toast.error('User ID is missing. Please complete the signup process first.', {
        ...toastOptions,
      });
    }

    return () => {
      dispatch(resetProfilePhotoState()); // Reset state on unmount
    };
  }, [dispatch, userId]);

  useEffect(() => {
    // Debug: Log state to diagnose button disabling
    console.log('ProfilePhotoCard State:', { userId, imageError, loading, selectedImage: !!selectedImage });
  }, [userId, imageError, loading, selectedImage]);

  const validateImage = (file) => {
    if (!file) {
      return 'Please select an image';
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return 'Please upload a valid image (JPEG, PNG, or GIF)';
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'Image size must be less than 5MB';
    }
    return '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const error = validateImage(file);
      setImageError(error);
      if (!error) {
        setImagePreviewUrl(URL.createObjectURL(file));
      } else {
        setImagePreviewUrl(null);
      }
    } else {
      setImageError('Please select an image');
      setImagePreviewUrl(null);
    }
  };

  const handlePhotoSubmit = async () => {
    const validationError = validateImage(selectedImage);
    if (validationError) {
      toast.error(validationError, { ...toastOptions });
      return;
    }
    if (!userId) {
      toast.error('User ID is required to upload a profile photo.', { ...toastOptions });
      return;
    }

    try {
      const result = await dispatch(uploadProfilePhoto({ userId, image: selectedImage })).unwrap();
      toast.success('Profile photo uploaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
      setIsSuccess(true);
      // Clear userId from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
      }
      setTimeout(() => {
        handleComplete(result);
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error('Upload error details:', err); // Log detailed error
      toast.error(err.message || 'An error occurred during photo upload.', {
        ...toastOptions,
      });
    }
  };

  const handleSkip = () => {
    toast.success('Skipped profile photo. Redirecting to homepage...', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
      bodyClassName: 'flex items-center',
    });
    setIsSuccess(true);
    // Clear userId from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
    }
    setTimeout(() => {
      handleComplete(null);
      router.push('/');
    }, 2000);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Slide}
      />
      <div className='bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative'>
        <button
          onClick={handleBack}
          className='absolute left-4 text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#DC4731] rounded cursor-pointer'
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className='text-center py-10'>
            <CheckCircle2 className='mx-auto h-16 w-16 text-green-500 mb-4' />
            <h2 className='text-xl font-bold mb-2'>Registration Successful!</h2>
            <p className='text-gray-600'>Redirecting you to the homepage...</p>
          </div>
        ) : (
          <>
            <h2 className='text-center text-xl font-semibold mb-4'>Create your profile</h2>

            <hr className='border-t border-gray-100 -mx-4 mt-4 mb-8' />

            <div className='text-center'>
              <p className='text-sm text-gray-600 mb-6'>
                Pick an image that shows your face. Agents won't see it until your reservation is confirmed.
              </p>

              <div className='flex flex-col items-center mb-6'>
                <div className='w-24 h-24 rounded-full overflow-hidden bg-gray-200'>
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt='Selected'
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <Image
                      src='/images/proflie/pf.png'
                      alt='profile-image'
                      width={96}
                      height={96}
                      className='object-cover rounded-full'
                    />
                  )}
                </div>
              </div>

              <div>
                <input
                  id='fileInput'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  className={`w-full py-3 rounded-lg border font-semibold text-sm mb-2 ${
                    imageError ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {selectedImage ? 'Change photo' : 'Upload a photo'}
                </button>
                {imageError && <p className='text-red-500 text-xs mt-1'>{imageError}</p>}
              </div>

              {selectedImage && (
                <button
                  onClick={handlePhotoSubmit}
                  disabled={loading || !!imageError || !userId}
                  className={`w-full py-3 rounded-lg text-white font-semibold ${
                    loading || imageError || !userId
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#DC4731] hover:bg-[#c03d29]'
                  } transition mb-3`}
                >
                  {loading ? 'Uploading...' : 'Done'}
                </button>
              )}

              <button
                onClick={handleSkip}
                className='underline text-gray-600 hover:text-black text-sm'
              >
                I'll do this later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoCard;