import React, { useState } from "react"
import Image from "next/image"

const defaultProps = {
  title: "Deep Blue Nights",
  description:
    "For those who crave peace louder than the city. This view isn't just scenery, it's a whole reset.",
  price: "$2,999",
  badges: ["Top Pick", "Only 9 vibes left"],
  images: [
    "https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/placeholder3.jpg",
    "https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/placeholder2.jpg",
    "https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/placeholder1.jpg",
  ],
  buttonText: "Add to Cart",
  onPrimaryClick: () => {},
}

export default function ProductCard({
  title = defaultProps.title,
  description = defaultProps.description,
  price = defaultProps.price,
  badges = defaultProps.badges,
  images = defaultProps.images,
  buttonText = defaultProps.buttonText,
}) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = e => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd

    // Minimum distance for swipe
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      nextSlide() // swipe left
    } else if (distance < -minSwipeDistance) {
      prevSlide() // swipe right
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-md h-[600px] sm:h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            priority={currentIndex === 0} // preload the first image
            className="object-cover transition-all duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/60 via-teal-900/40 to-slate-900/80 pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-4 sm:p-8">
          {/* Top Section */}
          <div>
            {/* Carousel Dots */}
            <div className="flex justify-center gap-1.5 mt-6"></div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-1.5 sm:p-2 rounded-full hover:bg-white/40 transition text-sm sm:text-base"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-1.5 sm:p-2 rounded-full hover:bg-white/40 transition text-sm sm:text-base"
          >
            ▶
          </button>

          {/* Bottom Section */}
          <div>
            <div>
              {/* Carousel Dots */}
              <div className="flex justify-center gap-1.5 mt-4 sm:mt-6 mb-3 sm:mb-4">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-6 sm:w-8 h-1 bg-white"
                        : "w-1.5 h-1 bg-white/40 "
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Title and Price */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                {title}
              </h2>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-base sm:text-lg font-semibold whitespace-nowrap ml-2">
                {price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              {description}
            </p>

            {/* Badges */}
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800/60 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-white text-slate-900 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
