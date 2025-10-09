import React, { useState } from 'react';

const FeedbackForm = ({
  onSubmit = () => {},
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    message: '',
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const [hoveredRating, setHoveredRating] = useState(0);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRequired = (value) => {
    return value.trim().length > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? 'Please enter a valid email address' : '',
      }));
    } else if (name === 'name') {
      setErrors(prev => ({
        ...prev,
        name: value && !validateRequired(value) ? 'Name is required' : '',
      }));
    } else if (name === 'feedbackType') {
      setErrors(prev => ({
        ...prev,
        feedbackType: value && !validateRequired(value) ? 'Please select a feedback type' : '',
      }));
    } else if (name === 'message') {
      setErrors(prev => ({
        ...prev,
        message: value && !validateRequired(value) ? 'Message is required' : '',
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    setErrors(prev => ({
      ...prev,
      rating: rating > 0 ? '' : 'Please select a rating',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validateRequired(formData.feedbackType)) {
      newErrors.feedbackType = 'Please select a feedback type';
    }
    if (!validateRequired(formData.message)) {
      newErrors.message = 'Message is required';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= (hoveredRating || formData.rating);
      return (
        <button
          key={starNumber}
          type="button"
          onClick={() => handleRatingChange(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none"
        >
          <svg
            className={`w-8 h-8 ${isFilled ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
            fill={isFilled ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      );
    });
  };

  return (
    <div className={`max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Feedback Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">
            Feedback Type
          </label>
          <select
            id="feedbackType"
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.feedbackType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="bug">Bug</option>
            <option value="suggestion">Suggestion</option>
            <option value="general">General</option>
          </select>
          {errors.feedbackType && <p className="text-red-500 text-sm mt-1">{errors.feedbackType}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your feedback message"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex space-x-1">
            {renderStars()}
          </div>
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors transform hover:scale-105"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
