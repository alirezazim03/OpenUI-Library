import React, { useState, useEffect } from "react"

// Demo component to showcase different circular progress states
const CircularProgressDemo = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8 p-6">
      <CircularProgress value={progress} showPercentage={true} />
      <CircularProgress value={progress} showPercentage={false} />
      <CircularProgress
        value={progress}
        color="red"
        size="lg"
        showPercentage={true}
      />
      <CircularProgress
        value={progress}
        color="green"
        size="sm"
        showPercentage={true}
      />
      <CircularProgress
        value={progress}
        color="blue"
        size="md"
        showPercentage={true}
      />
    </div>
  )
}

const CircularProgress = ({
  value = 0,
  indeterminate = false,
  color = "blue",
  size = "md",
  thickness = "normal",
  showPercentage = true,
  animated = true,
  duration = 1000,
}) => {
  // Clamp value between 0 and 100 for determinate mode
  const clampedValue = Math.min(100, Math.max(0, value))

  // State for animating the progress value
  const [displayValue, setDisplayValue] = useState(clampedValue)

  // Calculate SVG parameters
  const getSizeInPixels = () => {
    switch (size) {
      case "sm":
        return 64
      case "md":
        return 96
      case "lg":
        return 128
      default:
        return 96
    }
  }

  const getStrokeWidth = () => {
    switch (thickness) {
      case "thin":
        return getSizeInPixels() * 0.04
      case "normal":
        return getSizeInPixels() * 0.06
      case "thick":
        return getSizeInPixels() * 0.08
      default:
        return getSizeInPixels() * 0.06
    }
  }

  // SVG parameters
  const sizeInPixels = getSizeInPixels()
  const strokeWidth = getStrokeWidth()
  const radius = (sizeInPixels - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const currentProgress = indeterminate
    ? 0
    : animated
      ? displayValue
      : clampedValue

  const normalizedProgress = Math.min(100, Math.max(0, currentProgress))
  const isComplete = normalizedProgress >= 99.999
  const strokeDashoffset = indeterminate
    ? circumference * 0.75
    : isComplete
      ? 0
      : circumference * (1 - normalizedProgress / 100)

  // Center position
  const center = sizeInPixels / 2

  // Font size based on circle size
  const fontSize = sizeInPixels * 0.22

  // Animation effect for the progress value
  useEffect(() => {
    if (indeterminate) {
      setDisplayValue(0)
      return
    }

    if (!animated) {
      setDisplayValue(clampedValue)
      return
    }

    const startValue = displayValue
    const endValue = clampedValue
    if (startValue === endValue) return

    const startTime = performance.now()
    let frameId

    const animateValue = timestamp => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuad(progress)
      const currentValue = startValue + (endValue - startValue) * easedProgress

      setDisplayValue(currentValue)

      if (progress < 1) {
        frameId = requestAnimationFrame(animateValue)
      } else {
        setDisplayValue(endValue)
      }
    }

    frameId = requestAnimationFrame(animateValue)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [clampedValue, animated, indeterminate, duration])

  // Easing function for smooth animation
  const easeOutQuad = t => t * (2 - t)

  // Color mapping for both track and progress
  const colorClasses = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    red: "stroke-red-500",
    yellow: "stroke-yellow-500",
    purple: "stroke-purple-500",
    pink: "stroke-pink-500",
    indigo: "stroke-indigo-500",
    gray: "stroke-gray-500",
  }

  const textColorClasses = {
    blue: "text-gray-800",
    green: "text-gray-800",
    red: "text-gray-800",
    yellow: "text-gray-800",
    purple: "text-gray-800",
    pink: "text-gray-800",
    indigo: "text-gray-800",
    gray: "text-gray-800",
  }

  const progressColor = colorClasses[color] || colorClasses.blue
  const textColor = textColorClasses[color] || textColorClasses.blue

  return (
    <div
      className="relative inline-block"
      style={{ width: sizeInPixels, height: sizeInPixels }}
    >
      {/* Background circle */}
      <svg
        className="w-full h-full rotate-[-90deg] overflow-visible"
        viewBox={`0 0 ${sizeInPixels} ${sizeInPixels}`}
        style={{ width: sizeInPixels, height: sizeInPixels }}
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-gray-200 fill-none"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        {indeterminate ? (
          // Indeterminate spinner animation
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={`fill-none ${progressColor}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.75}
            strokeLinecap="round"
            style={{
              animation: "spin 1.5s linear infinite",
            }}
          />
        ) : (
          // Determinate progress circle
          <circle
            cx={center}
            cy={center}
            r={radius}
            className={`fill-none ${progressColor}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: animated
                ? `stroke-dashoffset ${duration * 0.001}s ease`
                : "none",
            }}
          />
        )}
      </svg>

      {/* Percentage text in the center */}
      {showPercentage && !indeterminate && (
        <div
          className="absolute inset-0 flex items-center justify-center font-semibold"
          style={{
            fontSize,
            color: "#1f2937",
            WebkitTextFillColor: "#1f2937",
          }}
        >
          {Math.round(normalizedProgress)}%
        </div>
      )}

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default CircularProgressDemo
export { CircularProgress }
