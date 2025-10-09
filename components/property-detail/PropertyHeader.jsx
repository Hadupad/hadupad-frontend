'use client';

import { Star, MapPin, Share, Heart } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePropertyAsync } from '@/redux/slices/propertyInteractionsSlice';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function PropertyHeader({ property }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(property.userLiked || false);
  const [localLikesCount, setLocalLikesCount] = useState(property.likesCount || 0);
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleShare = async () => {
    const shareData = {
      title: property.name,
      text: `Check out this amazing property: ${property.name} in ${property.location}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Property shared successfully!', {
          position: 'top-right',
          duration: 4000,
        });
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Property URL copied to clipboard!', {
          position: 'top-right',
          duration: 4000,
        });
      }
    } catch (err) {
      toast.error('Failed to share property.', {
        position: 'top-right',
        duration: 4000,
      });
      console.error('Share error:', err);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to like this property.', {
        position: 'top-right',
        duration: 4000,
      });
      return;
    }

    if (isLiked) {
      // Simulate unlike on frontend
      setIsLiked(false);
      setLocalLikesCount((prev) => Math.max(0, prev - 1));
      toast.success('Property unliked successfully!', {
        position: 'top-right',
        duration: 4000,
      });
    } else {
      // Like the property via API
      try {
        await dispatch(likePropertyAsync(property.id)).unwrap();
        setIsLiked(true);
        setLocalLikesCount((prev) => prev + 1);
        toast.success('Property liked successfully!', {
          position: 'top-right',
          duration: 4000,
        });
      } catch (err) {
        const errorMessage = err === 'Not authorized, token failed'
          ? 'Your session has expired. Please log in again.'
          : `Failed to like property: ${err}`;
        toast.error(errorMessage, {
          position: 'top-right',
          duration: 4000,
        });
        console.error('Failed to like property:', err);
      }
    }
  };

  return (
    <div className="py-6 border-gray-200">
      {/* Toaster for notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 10000,
            maxWidth: '500px',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #4ade80',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {property.name}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="font-medium">{property.averageRating?.toFixed(1) || '0.0'}</span>
              <span>({property.rating} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="underline">{property.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Share className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
            />
            {isLiked ? 'Unlike' : 'Like'}{localLikesCount > 0 ? ` (${localLikesCount})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

PropertyHeader.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number,
    averageRating: PropTypes.number,
    likesCount: PropTypes.number,
    userLiked: PropTypes.bool,
  }).isRequired,
};