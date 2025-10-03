import React from "react"
import { FaSpaceShuttle } from "react-icons/fa"

const defaultProps = {
  logo: <FaSpaceShuttle />,
  navItems: ["Work", "About", "Playground", "Resource"],
  email: "ihyaet@gmail.com",
}

export default function TechNavbar({ logo, navItems, email }) {
  return (
    <nav className="bg-gray-900 rounded-full px-8 py-4 flex items-center justify-between shadow-xl max-w-4xl mx-auto mt-8">
      {/* Logo */}
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
        <span className="text-2xl">{logo}</span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Email */}
      <div className="bg-white rounded-full px-6 py-2">
        <span className="text-gray-900 text-lg font-medium">{email}</span>
      </div>
    </nav>
  )
}

// attach default props
TechNavbar.defaultProps = defaultProps
