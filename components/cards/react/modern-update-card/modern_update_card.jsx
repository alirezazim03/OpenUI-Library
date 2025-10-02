import React from 'react'

const defaultProps = {
  title: "What's on your mind?",
  description:
    "You've confirmed abc@xyz.com. You're all ready to start a new group for chatting",
  primaryButtonText: "What's new?",
  secondaryButtonText: 'Later',
  onPrimaryClick: () => {},
  onSecondaryClick: () => {},
  imageUrl:
    'https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/placeholder1.jpg',
}

const ModernUpdateCard = ({
  title = defaultProps.title,
  description = defaultProps.description,
  primaryButtonText = defaultProps.primaryButtonText,
  secondaryButtonText = defaultProps.secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  imageUrl = defaultProps.imageUrl,
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick()
    }
  }

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
      {/* Header with Image */}
      <div className="bg-green-100 p-6 relative">
        <div className="absolute inset-0 bg-green-100 opacity-90"></div>
        <div className="relative z-10">
          <img
            src={imageUrl}
            alt="Chat illustration"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-4 left-8 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-6 left-12 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-3 left-16 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-5 left-20 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-2 left-24 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-4 left-28 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-6 left-32 w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrimaryClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {primaryButtonText}
          </button>
          <button
            onClick={handleSecondaryClick}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200 focus:outline-none"
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModernUpdateCard
