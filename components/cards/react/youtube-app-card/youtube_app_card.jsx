import React, { useState } from "react"

const defaultProps = {
  appName: "YouTube",
  category: "Videos",
  isFree: true,
  rating: 5.0,
  size: "98.5 mb",
  downloads: "8.5m",
  isPaused: true,
  onActionClick: () => {},
}

const YouTubeAppCard = ({
  appName = defaultProps.appName,
  category = defaultProps.category,
  isFree = defaultProps.isFree,
  rating = defaultProps.rating,
  size = defaultProps.size,
  downloads = defaultProps.downloads,
  isPaused: initialPaused = defaultProps.isPaused,
  onActionClick = defaultProps.onActionClick,
}) => {
  const [isPaused, setIsPaused] = useState(initialPaused)
  return (
    <div className="relative bg-gray-50 rounded-3xl p-6 w-80 h-80 mx-auto shadow-lg overflow-hidden">
      {/* Brushstroke decorative element in bottom right */}
      <div className="absolute bottom-0 right-0">
        <svg
          className="w-32 h-32"
          viewBox="0 0 120 120"
          fill="none"
        >
          <path
            d="M80 120 C75 115, 70 110, 75 105 C80 100, 85 95, 90 100 C95 105, 100 110, 105 115 C110 120, 115 125, 120 120 L120 120 Z"
            fill="#ef4444"
            opacity="0.8"
          />
          <path
            d="M85 120 C80 110, 75 100, 80 95 C85 90, 90 85, 95 90 C100 95, 105 100, 110 105 C115 110, 120 115, 120 120 Z"
            fill="#dc2626"
            opacity="0.7"
          />
          <path
            d="M90 120 C85 105, 80 90, 85 85 C90 80, 95 75, 100 80 C105 85, 110 90, 115 95 C120 100, 120 110, 120 120 Z"
            fill="#b91c1c"
            opacity="0.6"
          />
          <path
            d="M95 120 C90 100, 85 80, 90 75 C95 70, 100 65, 105 70 C110 75, 115 80, 120 85 C120 90, 120 100, 120 120 Z"
            fill="#f87171"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        {/* YouTube Logo and Category */}
        <div className="flex flex-col items-start space-y-2">
          <div className="bg-red-600 rounded-lg p-2 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <span className="text-gray-700 text-sm font-normal">{category}</span>
        </div>

        {/* Free Badge */}
        {isFree && (
          <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Free
          </div>
        )}
      </div>

      {/* App Name */}
      <div className="relative z-10 mb-6">
        <h2 className="text-4xl font-black text-gray-900 font-sans tracking-tight">
          {appName}
        </h2>
      </div>

      {/* Metrics Row */}
      <div className="relative z-10 flex justify-start items-center gap-12 mb-6">
        <div className="text-left">
          <div className="text-gray-600 text-xs font-normal mb-1">Rating</div>
          <div className="text-gray-900 font-bold text-base">{rating}</div>
        </div>
        
        <div className="text-left">
          <div className="text-gray-600 text-xs font-normal mb-1">Size</div>
          <div className="text-gray-900 font-bold text-base">{size}</div>
        </div>
        
        <div className="text-left">
          <div className="text-gray-600 text-xs font-normal mb-1">Downloads</div>
          <div className="text-gray-900 font-bold text-base">{downloads}</div>
        </div>
      </div>

      {/* Progress/Action Button */}
      <div className="relative z-10">
        <button
          onClick={() => {
            setIsPaused(!isPaused)
            onActionClick(!isPaused)
          }}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <svg
              className="w-4 h-4 text-white ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default YouTubeAppCard