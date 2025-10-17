import React from "react"

interface SidebarSearchbarProps {
  setSearchQuery: (_query: string) => void
  searchQuery: string
}

/** Sidebar search bar component.
 * To be used within the Sidebar component.
 * @example
 * <SidebarSearchbar
 *   searchQuery={searchQuery}
 *   setSearchQuery={setSearchQuery}
 * />
 * @param setSearchQuery - Function to update the search query state.
 * @param searchQuery - Current search query state.
 * @returns JSX.Element
 */
export default function SidebarSearchbar({
  setSearchQuery,
  searchQuery,
}: SidebarSearchbarProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
