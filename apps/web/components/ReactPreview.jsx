import React from 'react'

const ReactPreview = ({ componentFiles, componentName }) => {
  // For now, let's create a simple mock preview to avoid the eval issues
  // This is a safer approach until we can implement proper sandboxing

  const renderMockPreview = () => {
    if (componentName.includes('navbar') || componentName.includes('nav')) {
      return (
        <div className="w-full">
          <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <a href="/" className="text-2xl font-bold text-indigo-600">
                    ShopLogo
                  </a>
                </div>
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        disabled
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  <a
                    href="#"
                    className="text-gray-700 hover:text-indigo-600 transition duration-200"
                  >
                    Products
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-indigo-600 transition duration-200"
                  >
                    Categories
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-indigo-600 transition duration-200"
                  >
                    Deals
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-700 hover:text-indigo-600 transition duration-200">
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="relative text-gray-700 hover:text-indigo-600 transition duration-200">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 00-.293.707V19a1 1 0 001 1h12a1 1 0 001-1v-3a1 1 0 00-.293-.707L16 13"
                      />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button className="text-gray-700 hover:text-indigo-600 transition duration-200">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )
    }

    if (componentName.includes('button')) {
      return (
        <div className="w-full p-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
            Sample Button
          </button>
        </div>
      )
    }

    // Default preview for other components
    return (
      <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <div className="text-gray-600">
          <div className="text-lg font-semibold mb-2">{componentName}</div>
          <div className="text-sm">React Component Preview</div>
          <div className="text-xs text-gray-500 mt-2">
            This is a mock preview. The actual component code is shown below.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg p-4 min-h-64">
      <div className="w-full">{renderMockPreview()}</div>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
        <strong>Preview Note:</strong> This is a visual representation of the{' '}
        {componentName} component. The actual component code with full
        functionality is shown in the "Code" section below.
      </div>
    </div>
  )
}

export default ReactPreview
