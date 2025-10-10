import React from 'react'

/**
 * ShinyHoverButton UI Component
 * @param {Object} props
 * @param {string} [props.text] - Button label text
 * @param {string} [props.className] - Additional Tailwind classes to customize styling
 */
const ShinyHoverButton = ({ text = 'Hover me', className = '' }) => {
  return (
    <div>
      <button
        type="button"
        className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-neutral-400/50 ${className}`}
      >
        <span>{text}</span>
        <div
          aria-hidden="true"
          className="absolute inset-0 flex h-full w-full justify-center transition-transform duration-700 ease-out [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"
        >
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button>
    </div>
  )
}

export default ShinyHoverButton
