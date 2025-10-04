import React, { useState } from "react"

const Navbar = ({ onGetStarted = () => {}, onLogin = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className={`bg-white/50 shadow sticky top-0 z-50 border-b border-gray-200 ${isMenuOpen ? "" : "rounded-full"} md:mx-25 md:mt-5 backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <a
            href="/"
            className="text-2xl font-extrabold text-orange-500 tracking-tight"
          >
            SaaSify
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            <a
              href="#features"
              className="text-gray-700 hover:text-orange-500 transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-orange-500 transition"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-orange-500 transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-orange-500 transition"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <a
              href="#login"
              onClick={onLogin}
              className="text-gray-700 hover:text-orange-500 cursor-pointer transition"
            >
              Login
            </a>
            <button
              onClick={onGetStarted}
              className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-label="Toggle menu"
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
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4 rounded-md bg-white/50 backdrop-blur-sm">
            <a
              href="#features"
              className="block px-4 py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#login"
              onClick={() => {
                onLogin()
                setIsMenuOpen(false)
              }}
              className="block px-4 py-2 text-gray-700 hover:text-orange-500 cursor-pointer"
            >
              Login
            </a>
            <button
              onClick={() => {
                onGetStarted()
                setIsMenuOpen(false)
              }}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
