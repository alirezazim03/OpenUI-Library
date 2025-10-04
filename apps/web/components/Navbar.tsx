import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import ThemeToggle to avoid SSR issues
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => (
    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
      {/* Loading placeholder */}
    </div>
  ),
})

interface NavbarProps {
  currentPage?: "home" | "contributors"
}

export default function Navbar({ currentPage = "home" }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
                alt="Open UI Library Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain rounded-lg p-1 bg-white/10 dark:bg-gray-800/50"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Open UI Library
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Community-driven components
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentPage !== "home" && (
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
              >
                Home
              </Link>
            )}
            <Link
              href="/contributors"
              className={`font-medium transition-colors ${
                currentPage === "contributors"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`}
            >
              Contributors
            </Link>
            <a
              href="https://github.com/alirezazim03/OpenUI-Library"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/649Q4HG3XK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
            >
              Discord
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay and sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 md:hidden dark:bg-gray-900">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {currentPage !== "home" && (
                  <Link
                    href="/"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <Link
                  href="/contributors"
                  className={`block font-medium transition-colors ${
                    currentPage === "contributors"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  Contributors
                </Link>
                <a
                  href="https://github.com/alirezazim03/OpenUI-Library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  GitHub
                </a>
                <a
                  href="https://discord.gg/649Q4HG3XK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Discord
                </a>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
