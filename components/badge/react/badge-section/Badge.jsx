"use client"

import React from "react"

// Color definitions for different schemes
const colorSchemes = {
  default: { background: "#e4e6eb", color: "#050505" },
  danger: { background: "#fce8e6", color: "#c5221f" },
  success: { background: "#e6f4ea", color: "#1e8e3e" },
  warning: { background: "#fff0e1", color: "#d96f00" },
  info: { background: "#e8f0fe", color: "#1a73e8" },
  purple: { background: "#f3e8fd", color: "#632ca6" },
}

// --- Reusable Badge Component ---
const Badge = ({ children, colorScheme = "default" }) => {
  const badgeStyle = {
    ...styles.base,
    ...colorSchemes[colorScheme],
  }
  return <span style={badgeStyle}>{children}</span>
}

// --- Main Preview Component to Render ---
export default function BadgePreview() {
  return (
    <div style={styles.previewContainer}>
      <div style={styles.section}>
        <h3 style={styles.heading}>Badges</h3>
        <div style={styles.componentRow}>
          <Badge colorScheme="danger">New</Badge>
          <Badge colorScheme="success">Complete</Badge>
          <Badge colorScheme="info">99+</Badge>
          <Badge colorScheme="default">Archived</Badge>
          <Badge colorScheme="purple">Admin</Badge>
        </div>
      </div>
    </div>
  )
}

// All styles are defined in this object
const styles = {
  previewContainer: {
    fontFamily: "sans-serif",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  section: {
    marginBottom: "1rem",
  },
  heading: {
    color: "#343a40",
    borderBottom: "1px solid #dee2e6",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  componentRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  base: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25em 0.6em",
    fontSize: "12px",
    fontWeight: "600",
    borderRadius: "16px",
    lineHeight: "1.5",
  },
}