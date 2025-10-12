'use client';

import { useState } from 'react';
import * as React from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown, MessageCircle, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { submitReviewAsync, likePropertyAsync } from '@/redux/slices/propertyInteractionsSlice';
import { fetchPublicPropertyById } from '@/redux/slices/publicPropertySlice';
import Modal from './Modal';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

export default function ReviewSystem({ property }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.propertyInteractions || {});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  // Check if user is authenticated using localStorage
  const isAuthenticated = !!localStorage.getItem('accessToken');

  // Use reviews from property prop
  const reviews = property?.reviews || [];
  const reviewCount = property?.rating || 0;
  const averageRating = property?.averageRating || 0;

  // Calculate rating categories dynamically (placeholder since API doesn't provide)
  const ratingCategories = [
    { key: 'cleanliness', name: 'Cleanliness', rating: 0 },
    { key: 'communication', name: 'Communication', rating: 0 },
    { key: 'checkin', name: 'Check-in', rating: 0 },
    { key: 'accuracy', name: 'Accuracy', rating: 0 },
    { key: 'location', name: 'Location', rating: 0 },
    { key: 'value', name: 'Value', rating: 0 },
  ];

  const handleStarClick = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to submit a review.', {
        position: 'top-right',
        duration: 4000,
      });
      return;
    }
    if (!newReview.rating || !newReview.comment.trim()) {
      toast.error('Please provide a rating and comment.', {
        position: 'top-right',
        duration: 4000,
      });
      return;
    }
    try {
      await dispatch(
        submitReviewAsync({
          propertyId: property.id,
          review: { rating: newReview.rating, comment: newReview.comment },
        })
      ).unwrap();
      toast.success('Review submitted successfully!', {
        position: 'top-right',
        duration: 4000,
      });
      // Refetch property to update reviews
      await dispatch(fetchPublicPropertyById(property.id)).unwrap();
      setShowReviewForm(false);
      setNewReview({ rating: 0, comment: '' });
    } catch (err) {
      const errorMessage = err === 'Not authorized, token failed' 
        ? 'Your session has expired. Please log in again.'
        : `Failed to submit review: ${err}`;
      toast.error(errorMessage, {
        position: 'top-right',
        duration: 4000,
      });
      console.error('Failed to submit review:', err);
    }
  };

  const handleLikeProperty = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to like this property.', {
        position: 'top-right',
        duration: 4000,
      });
      return;
    }
    try {
      await dispatch(likePropertyAsync(property.id)).unwrap();
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
  };

  const StarRating = ({ rating, onStarClick, size = 'w-5 h-5', interactive = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-red-500 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-red-400' : ''}`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter((review) => {
    if (reviewFilter === 'all') return true;
    if (reviewFilter === 'recent') {
      const reviewDate = new Date(review.createdAt);
      const now = new Date();
      return reviewDate >= new Date(now.setMonth(now.getMonth() - 3));
    }
    if (reviewFilter === 'high') return review.rating >= 4;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'helpful') return (b.helpful || 0) - (a.helpful || 0);
    return 0;
  });

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

      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-red-500 fill-current" />
          <span className="text-lg font-medium">
            {reviewCount > 0 ? `${averageRating.toFixed(1)} · ${reviewCount} reviews` : 'No reviews yet'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeProperty}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <ThumbsUp className="w-4 h-4" />
            Like Property
          </button>
          <button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Write a Review
          </button>
        </div>
      </div>

      {/* Rating Categories */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {ratingCategories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{category.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-1 bg-gray-900 rounded-full"
                    style={{ width: `${(category.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 w-8">{category.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter and Sort Controls */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Reviews</option>
              <option value="recent">Recent</option>
              <option value="high">High Rated</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>
      )}

      {/* Individual Reviews */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  {review.user?.profilePicture ? (
                    <img
                      src={review.user.profilePicture}
                      alt={`${review.user.firstName} ${review.user.lastName} profile`}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className="text-gray-600 font-medium text-sm" style={{ display: review.user?.profilePicture ? 'none' : 'flex' }}>
                    {`${review.user?.firstName?.[0] || 'G'}${review.user?.lastName?.[0] || ''}`.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">
                        {review.user?.firstName} {review.user?.lastName || ''}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </span>
                      <StarRating rating={review.rating || 0} size="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{review.comment || 'No comment provided.'}</p>
                  {/* <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful || 0})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                      <ThumbsDown className="w-4 h-4" />
                      Not helpful ({review.unhelpful || 0})
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-sm">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="mt-6">
          <button className="px-6 py-2 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
            Show all {reviewCount} reviews
          </button>
        </div>
      )}

      {/* Review Submission Modal */}
      <Modal isOpen={showReviewForm} onClose={() => setShowReviewForm(false)}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
            <p className="text-sm text-gray-500 mt-1">Share your experience with other guests</p>
          </div>
          <button
            onClick={() => setShowReviewForm(false)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Overall Rating */}
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-900 mb-3">Overall Rating</label>
            <div className="flex justify-center mb-2">
              <StarRating
                rating={newReview.rating}
                onStarClick={(rating) => handleStarClick(rating)}
                size="w-10 h-10"
                interactive={true}
              />
            </div>
            <p className="text-sm text-gray-500">
              {newReview.rating === 0 && 'Click to rate'}
              {newReview.rating === 1 && 'Poor'}
              {newReview.rating === 2 && 'Fair'}
              {newReview.rating === 3 && 'Good'}
              {newReview.rating === 4 && 'Very Good'}
              {newReview.rating === 5 && 'Excellent'}
            </p>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
              rows={4}
              placeholder="Share your experience with other guests..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">{newReview.comment.length}/500 characters</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <button
            onClick={() => setShowReviewForm(false)}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReview}
            disabled={loading || !newReview.rating || !newReview.comment.trim()}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit Review
          </button>
        </div>
      </Modal>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-sm mt-4">Error: {error}</p>
      )}
    </div>
  );
}

ReviewSystem.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        rating: PropTypes.number,
        comment: PropTypes.string,
        createdAt: PropTypes.string,
        user: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          profilePicture: PropTypes.string,
        }),
        helpful: PropTypes.number,
        unhelpful: PropTypes.number,
      })
    ),
    rating: PropTypes.number,
    averageRating: PropTypes.number,
  }).isRequired,
};