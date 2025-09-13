'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown, MessageCircle, Send } from 'lucide-react';
import Modal from './Modal';

export default function ReviewSystem({ property }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const reviews = [
    {
      id: 1,
      name: "Jose",
      date: "December 2024",
      comment: "Host was very attentive.",
      avatar: "J",
      rating: 5,
      helpful: 12,
      unhelpful: 1,
      photos: []
    },
    {
      id: 2,
      name: "Luke", 
      date: "December 2024",
      comment: "Nice place to stay!",
      avatar: "L",
      rating: 5,
      helpful: 8,
      unhelpful: 0,
      photos: []
    },
    {
      id: 3,
      name: "Vladko",
      date: "November 2024", 
      comment: "This is amazing place. It has everything one needs for a monthly business stay. Very clean and organized place. Amazing hospitality affordable price",
      avatar: "V",
      rating: 5,
      helpful: 15,
      unhelpful: 2,
      photos: []
    },
    {
      id: 4,
      name: "Shayna",
      date: "December 2024",
      comment: "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive. Cool murphy bed.",
      avatar: "S",
      rating: 5,
      helpful: 20,
      unhelpful: 0,
      photos: []
    }
  ];

  const ratingCategories = [
    { key: 'cleanliness', name: "Cleanliness", rating: 5.0 },
    { key: 'communication', name: "Communication", rating: 5.0 },
    { key: 'checkin', name: "Check-in", rating: 5.0 },
    { key: 'accuracy', name: "Accuracy", rating: 5.0 },
    { key: 'location', name: "Location", rating: 4.9 },
    { key: 'value', name: "Value", rating: 4.7 }
  ];

  const handleStarClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    // Handle review submission
    console.log('Submitting review:', newReview);
    setShowReviewForm(false);
    setNewReview({
      rating: 0,
      comment: ''
    });
  };

  const StarRating = ({ rating, onStarClick, size = 'w-5 h-5', interactive = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating 
                ? 'text-red-500 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-red-400' : ''}`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (reviewFilter === 'all') return true;
    if (reviewFilter === 'recent') return review.date.includes('December 2024');
    if (reviewFilter === 'high') return review.rating >= 4;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  return (
    <div className="py-6 border-gray-200">
      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-red-500 fill-current" />
          <span className="text-lg font-medium">5.0 · {reviews.length} reviews</span>
        </div>
        <button
          onClick={() => setShowReviewForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Rating Categories */}
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
              <span className="text-sm text-gray-700 w-8">{category.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Sort Controls */}
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

      {/* Individual Reviews */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium text-sm">{review.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{review.name}</span>
                    <span className="text-sm text-gray-600">{review.date}</span>
                    <StarRating rating={review.rating} size="w-4 h-4" />
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3">{review.comment}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                    <ThumbsDown className="w-4 h-4" />
                    Not helpful ({review.unhelpful})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="px-6 py-2 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
          Show all {reviews.length} reviews
        </button>
      </div>

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
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Overall Rating
            </label>
            <div className="flex justify-center mb-2">
              <StarRating 
                rating={newReview.rating} 
                onStarClick={(rating) => handleStarClick(rating)}
                size="w-10 h-10"
                interactive={true}
              />
            </div>
            <p className="text-sm text-gray-500">
              {newReview.rating === 0 && "Click to rate"}
              {newReview.rating === 1 && "Poor"}
              {newReview.rating === 2 && "Fair"}
              {newReview.rating === 3 && "Good"}
              {newReview.rating === 4 && "Very Good"}
              {newReview.rating === 5 && "Excellent"}
            </p>
          </div>


          {/* Comment */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
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
            disabled={!newReview.rating && !newReview.comment.trim()}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit Review
          </button>
        </div>
      </Modal>
    </div>
  );
}
