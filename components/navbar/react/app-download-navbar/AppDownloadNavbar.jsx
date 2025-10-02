import React, { useState } from "react"

const AppDownloadNavbar = ({
  onSearch = () => {},
  onDownload = () => {},
  onRegister = () => {},
  onLogin = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Links */}
          <div className="flex items-center space-x-8">
            <a className="text-2xl font-semibold text-rose-600 tracking-tight">
              Supryze
            </a>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              <a className="text-gray-700 hover:text-rose-600 transition">Gifts</a>
              <a className="text-gray-700 hover:text-rose-600 transition">Flowers</a>
              <a className="text-gray-700 hover:text-rose-600 transition">About</a>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center max-w-md">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
            </form>
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <button
              onClick={onDownload}
              className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition"
            >
              Download App
            </button>
            <button
              onClick={onRegister}
              className="border border-rose-600 text-rose-600 px-4 py-2 rounded-md hover:bg-rose-50 transition"
            >
              Register
            </button>
            <a
              onClick={onLogin}
              className="text-gray-700 hover:text-rose-600 cursor-pointer transition"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-rose-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <form onSubmit={handleSearch} className="px-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </form>
            <div className="flex flex-col space-y-2 px-4 text-sm font-medium">
              <a className="py-2 text-gray-700 hover:text-rose-600">Gifts</a>
              <a className="py-2 text-gray-700 hover:text-rose-600">Flowers</a>
              <a className="py-2 text-gray-700 hover:text-rose-600">About</a>
              <button
                onClick={onDownload}
                className="w-full text-left py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
              >
                Download App
              </button>
              <button
                onClick={onRegister}
                className="w-full text-left py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50"
              >
                Register
              </button>
              <a
                onClick={onLogin}
                className="py-2 text-gray-700 hover:text-rose-600 cursor-pointer"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AppDownloadNavbar