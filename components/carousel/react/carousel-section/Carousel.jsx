"use client"

import React from "react"

const defaultSlides = [
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop",
    alt: "A lush green forest path with sunlight filtering through",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
    alt: "A serene lake with a mountain reflection",
  },
  {
    src: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1200&auto=format&fit=crop",
    alt: "A dramatic waterfall in a rocky landscape",
  },
]

const styles = {
  container: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
    margin: "auto",
    borderRadius: "12px",
    WebkitTapHighlightColor: "transparent",
  },

  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover", 
  },
  trackContainer: {
    width: "100%",
  },
  track: (currentIndex) => ({
    display: "flex",
    transition: "transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
    transform: `translateX(-${currentIndex * 100}%)`,
  }),
  slide: {
    minWidth: "100%",
    boxSizing: "border-box",
    userSelect: "none",
    WebkitUserDrag: "none",
    position: "relative",
    aspectRatio: "1200 / 500",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "28px",
    zIndex: 10,
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
  },
  arrowLeft: {
    left: "15px",
  },
  arrowRight: {
    right: "15px",
  },
  arrowDisabled: {
    opacity: 0.3,
    cursor: "not-allowed",
  },
  dotsContainer: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 10,
  },
  dot: (isActive) => ({
    border: "none",
    backgroundColor: isActive ? "#3b82f6" : "rgba(255, 255, 255, 0.5)",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 0,
    transition: "background-color 0.2s ease",
  }),
}


const Carousel = ({
  children,
  autoplay = false,
  interval = 3000,
  loop = true,
  showArrows = true,
  showDots = true,
}) => {
  const hasChildren = React.Children.count(children) > 0
  const slides = hasChildren
    ? React.Children.toArray(children)

    : defaultSlides.map((slide) => (
        <img key={slide.src} src={slide.src} alt={slide.alt} style={styles.slideImage} />
      ))

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const totalSlides = slides.length
  const autoplayRef = React.useRef(null)
  const touchStartX = React.useRef(0)
  const touchEndX = React.useRef(0)

  const goToNext = React.useCallback(() => {
    const isLastSlide = currentIndex === totalSlides - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    if (loop || !isLastSlide) {
      setCurrentIndex(newIndex)
    }
  }, [currentIndex, totalSlides, loop])

  const goToPrev = React.useCallback(() => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1
    if (loop || !isFirstSlide) {
      setCurrentIndex(newIndex)
    }
  }, [currentIndex, totalSlides, loop])

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  React.useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(goToNext, interval)
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, interval, goToNext])

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "ArrowLeft") {
        goToPrev()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [goToNext, goToPrev])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    const swipeThreshold = 50
    if (touchStartX.current - touchEndX.current > swipeThreshold) {
      goToNext()
    } else if (touchStartX.current - touchEndX.current < -swipeThreshold) {
      goToPrev()
    }
  }

  return (
    <div
      style={styles.container}
      role="region"
      aria-roledescription="carousel"
      aria-label="Content carousel"
    >
      <div
        style={styles.trackContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={styles.track(currentIndex)}>
          {slides.map((child, index) => (
            <div
              style={styles.slide}
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${totalSlides}`}
              aria-hidden={index !== currentIndex}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={goToPrev}
            style={{
              ...styles.arrow,
              ...styles.arrowLeft,
              ...((!loop && currentIndex === 0) ? styles.arrowDisabled : {}),
            }}
            aria-label="Previous slide"
            disabled={!loop && currentIndex === 0}
          >
            &#8249;
          </button>
          <button
            onClick={goToNext}
            style={{
              ...styles.arrow,
              ...styles.arrowRight,
              ...((!loop && currentIndex === totalSlides - 1) ? styles.arrowDisabled : {}),
            }}
            aria-label="Next slide"
            disabled={!loop && currentIndex === totalSlides - 1}
          >
            &#8250;
          </button>
        </>
      )}

      {showDots && (
        <div style={styles.dotsContainer} role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              style={styles.dot(currentIndex === index)}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel