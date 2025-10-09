import React from "react"
import { FaSpaceShuttle } from "react-icons/fa"

const defaultProps = {
  navItems: ["Work", "About", "Playground", "Resource"],
  email: "ihyaet@gmail.com",
}

export default function TechNavbar({ navItems = defaultProps.navItems, email = defaultProps.email }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 mx-auto mt-8 max-w-4xl bg-gray-900 rounded-full shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
        <FaSpaceShuttle className="text-2xl text-gray-900" />
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className="text-white text-lg font-medium transition-colors hover:text-gray-300"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Email */}
      <div className="px-6 py-2 bg-white rounded-full">
        <span className="text-gray-900 text-lg font-medium">{email}</span>
      </div>
    </nav>
  )
}

// attach default props
TechNavbar.defaultProps = defaultProps
