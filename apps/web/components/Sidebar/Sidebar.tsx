import React from "react"

interface SidebarProps {
  children?: React.ReactNode
}

/**
 * Sidebar component for filtering and navigating through UI components.
 * Hidden below 590px screen width.
 * @returns
 */
export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="hidden h-screen sticky top-0 min-[590px]:block w-64 p-6 bg-white shadow-sm border-r border-t overflow-y-auto dark:bg-gray-800 dark:border-gray-700 ">
      {children}
    </aside>
  )
}
