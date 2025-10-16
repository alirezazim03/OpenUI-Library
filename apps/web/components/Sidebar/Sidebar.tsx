import dynamic from "next/dynamic"

// Dynamically import ThemeToggle to avoid SSR issues
const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
  ssr: false,
  loading: () => (
    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
      {/* Loading placeholder */}
    </div>
  ),
})

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
    <aside className="hidden min-[590px]:block w-64 p-6 bg-white shadow-sm border-r border-t overflow-y-auto dark:bg-gray-800 dark:border-gray-700 ">
      {children}
    </aside>
  )
}
