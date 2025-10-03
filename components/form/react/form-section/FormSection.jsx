import React, { useState } from "react"

const FormSection = ({
  title = "Section Title",
  description = "",
  children,
  className = "",
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <fieldset
      className={`border border-gray-300 rounded-2xl mb-6 transition-all duration-300 ${className}`}
    >
      <legend
        className="flex items-center justify-between text-lg font-semibold text-gray-800 px-2 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-sm text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </legend>

      {description && (
        <p className="text-sm text-gray-600 px-2 mb-2">{description}</p>
      )}

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-4">{children}</div>
      </div>
    </fieldset>
  )
}

export default FormSection
