import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface NavbarProps {
  currentPage?: 'home' | 'contributors'
}

export default function Navbar({ currentPage = 'home' }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
                alt="Open UI Library Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Open UI Library
                </h1>
                <p className="text-xs text-gray-500">
                  Community-driven components
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {currentPage !== 'home' && (
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
            )}
            <Link
              href="/contributors"
              className={`font-medium transition-colors ${
                currentPage === 'contributors'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contributors
            </Link>
            <a
              href="https://github.com/alirezazim03/OpenUI-Library"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-700 hover:text-blue-600"
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
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 md:hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-700 hover:text-blue-600"
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

              <nav className="space-y-4">
                {currentPage !== 'home' && (
                  <Link
                    href="/"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <Link
                  href="/contributors"
                  className={`block font-medium transition-colors ${
                    currentPage === 'contributors'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  Contributors
                </Link>
                <a
                  href="https://github.com/alirezazim03/OpenUI-Library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
