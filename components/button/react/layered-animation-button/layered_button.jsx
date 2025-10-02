import React from "react"

const LayeredButton = ({
  children = "HOVER ME",
  onClick = () => {},
  className = "",
  disabled = false,
  variant = "primary",
}) => {
  const baseClasses =
    "relative inline-block px-8 py-4 font-bold text-white text-lg rounded-full transition-all duration-300 ease-in-out transform cursor-pointer select-none"

  const variantClasses = {
    primary: "bg-emerald-500 hover:bg-emerald-600",
    secondary: "bg-blue-500 hover:bg-blue-600",
    accent: "bg-purple-500 hover:bg-purple-600",
  }

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:-translate-y-1 active:translate-y-0 active:scale-95"

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${className}
        shadow-[0_4px_0_#000000]
        hover:shadow-[0_6px_0_#fbbf24,0_10px_0_#3b82f6,0_14px_0_#000000]
        active:shadow-[0_2px_0_#000000]
      `}
      style={{
        border: "3px solid #000000",
      }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default LayeredButton
