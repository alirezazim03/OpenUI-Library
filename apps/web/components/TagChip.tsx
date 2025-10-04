import React from "react"

interface TagChipProps {
  tag: string
  active: boolean
  onToggle: (_tag: string) => void
}

/**
 * Accessible tag chip button used for filtering.
 * - Uses aria-pressed to indicate toggle state
 * - Keeps visual focus outline for keyboard users
 */
export function TagChip(props: TagChipProps) {
  const { tag, active, onToggle } = props
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onToggle(tag)}
      className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 focus-visible:ring-offset-white ${
        active
          ? "bg-blue-100 border-blue-200 text-blue-700"
          : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {tag}
    </button>
  )
}

export default TagChip
