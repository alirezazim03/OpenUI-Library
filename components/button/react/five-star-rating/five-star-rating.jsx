import React, { useState } from "react"

export default function FiveStarButton({
  onRatingChange,
  initialRating = 0,
  size = "md",
  className = "",
}) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const containerSizeClasses = {
    sm: "p-2 gap-1",
    md: "p-3 gap-1.5",
    lg: "p-4 gap-2",
  }

  const handleStarClick = (starIndex) => {
    const newRating = starIndex + 1
    setRating(newRating)
    onRatingChange?.(newRating)
  }

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex + 1)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const getStarColor = (starIndex) => {
    const currentRating = hoverRating || rating
    if (starIndex < currentRating) {
      return "text-yellow-400 fill-yellow-400"
    }
    return "text-gray-300 fill-gray-300 dark:text-gray-600 dark:fill-gray-600"
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-lg 
        bg-white border border-gray-200 shadow-sm
        hover:bg-gray-50 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
        transition-all duration-200 ease-in-out
        ${containerSizeClasses[size]} ${className}
      `}
      onMouseLeave={handleMouseLeave}
      aria-label={`Rate ${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`
            ${sizeClasses[size]} 
            ${getStarColor(index)}
            transition-all duration-200 ease-in-out
            hover:scale-110 cursor-pointer
          `}
          onClick={(e) => {
            e.preventDefault()
            handleStarClick(index)
          }}
          onMouseEnter={() => handleStarHover(index)}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </button>
  )
}