import React from "react"

const defaultProps = {
  title: "App Download"
}

const SimpleNavbar = ({ title = defaultProps.title }) => {
  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <div className="space-x-4">
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Home
          </button>
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            About
          </button>
          <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}

export default SimpleNavbar
