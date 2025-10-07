"use client"

import React from "react"

// --- 1. The Reusable Tooltip Component Logic ---
function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div
      style={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div style={styles.tooltipBox}>{text}</div>}
    </div>
  )
}


// --- 2. The Preview Component (Default Export) ---
// This is what your UI library will render.
export default function TooltipPreview() {
  return (
    <div style={styles.previewContainer}>
      <Tooltip text="Copy to clipboard">
        <button style={styles.button}>📄 Copy</button>
      </Tooltip>
      <Tooltip text="View user profile">
        <button style={styles.button}>👤 Profile</button>
      </Tooltip>
    </div>
  )
}


// --- 3. Self-Contained Styles ---
const styles = {
  previewContainer: {
    display: "flex",
    gap: "30px",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontFamily: "sans-serif",
  },
  button: {
    backgroundColor: "#ffffff",
    border: "1px solid #ccd0d5",
    borderRadius: "6px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  tooltipContainer: {
    position: "relative",
    display: "inline-block",
  },
  tooltipBox: {
    position: "absolute",
    bottom: "125%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    width: "max-content",
    zIndex: 10,
    animation: "fadeIn 0.2s",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}