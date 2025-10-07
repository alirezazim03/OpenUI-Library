"use client"

import React from "react"

// --- 1. The Reusable Popover Component Logic ---
function Popover({ children, content }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const popoverRef = React.useRef(null)

  // Effect to handle clicks outside the popover
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [popoverRef])

  return (
    <div style={styles.popoverWrapper} ref={popoverRef}>
   
      {React.cloneElement(children, { onClick: () => setIsOpen(!isOpen) })}
      {isOpen && <div style={styles.popoverContent}>{content}</div>}
    </div>
  )
}


// --- 2. The Preview Component (Default Export) ---
export default function PopoverPreview() {
  // Define the content for the popover preview
  const popoverSampleContent = (
    <div>
      <h3 style={styles.popoverTitle}>Account Settings</h3>
      <p style={styles.popoverBody}>
        Update your profile, password, and notification preferences.
      </p>
      <button style={{ ...styles.button, ...styles.popoverButton }}>
        Save Changes
      </button>
    </div>
  )

  return (
    <div style={styles.previewContainer}>
      <Popover content={popoverSampleContent}>
        <button style={styles.button}>Settings</button>
      </Popover>
    </div>
  )
}



const styles = {
  previewContainer: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "250px", 
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
  popoverWrapper: {
    position: "relative",
    display: "inline-block",
  },
  popoverContent: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: "50%",
    transform: "translateX(-50%)",
    width: "250px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "16px",
    zIndex: 10,
    animation: "fadeIn 0.2s",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateX(-50%) translateY(-5px)" },
    to: { opacity: 1, transform: "translateX(-50%) translateY(0)" },
  },
  popoverTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0 0 8px 0",
  },
  popoverBody: {
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0 0 16px 0",
    color: "#444",
  },
  popoverButton: {
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    width: "100%",
  },
}