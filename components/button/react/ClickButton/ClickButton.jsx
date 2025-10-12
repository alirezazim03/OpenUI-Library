import React from 'react'

/**
 * ClickButton UI Component
 * @param {Object} props
 * @param {string} [props.text] - Button label
 * @param {string} [props.className] - Additional Tailwind classes
 */
const ClickButton = ({ text = 'Click me', className = '' }) => {
  return (
    <div>
      <button
        type="button"
        className={`relative overflow-hidden rounded-md bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110 focus:outline-none focus:ring-2 focus:ring-neutral-400/50 ${className}`}
      >
        {text}
      </button>
    </div>
  )
}

export default ClickButton
