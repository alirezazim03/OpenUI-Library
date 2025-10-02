import React, { useState, useEffect, useCallback } from 'react'
import type { ReactPreviewProps } from '../types'

// Type declaration for Babel standalone - removed unused declaration

// Import Babel standalone
const BabelStandalone = require('@babel/standalone')

const ReactPreview: React.FC<ReactPreviewProps> = ({
  componentFiles,
  componentName,
}) => {
  const [RenderedComponent, setRenderedComponent] =
    useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const createComponentFromCode = useCallback(
    (code: string, componentName: string): React.ComponentType<any> => {
      try {
        // Use a more direct approach - create a module with the component code
        // and use dynamic import to load it

        // Prepare the component code as a module
        const moduleCode = `
        import React, { useState, useEffect } from 'react';
        
        ${code}
      `

        // Create a blob URL for the module
        const blob = new Blob([moduleCode], { type: 'application/javascript' })
        const moduleUrl = URL.createObjectURL(blob)

        // Use Babel to transform JSX to JavaScript
        let cleanCode = code
          .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, '')
          .replace(/export\s+default\s+/, '')
          .replace(/export\s+/, '')

        // Transform JSX using Babel
        const transformedResult = BabelStandalone.transform(cleanCode, {
          presets: [
            [
              'react',
              {
                runtime: 'classic',
              },
            ],
          ],
          plugins: [],
        })

        const transformedCode = transformedResult.code || cleanCode

        const wrappedCode = `
        (function(React, useState, useEffect) {
          ${transformedCode}
          
          return ${extractComponentName(code)};
        })
      `

        // Execute the wrapped code
        const componentFactory = eval(wrappedCode)
        const Component = componentFactory(React, useState, useEffect)

        // Clean up the blob URL
        URL.revokeObjectURL(moduleUrl)

        if (typeof Component === 'function') {
          Component.displayName = componentName
          return Component
        }

        throw new Error('Component is not a function')
      } catch (error) {
        // Error creating component from code - using fallback component instead

        // Return fallback component that shows the error
        const FallbackComponent = () => (
          <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <div className="text-gray-600">
              <div className="text-lg font-semibold mb-2">{componentName}</div>
              <div className="text-sm text-red-600">
                Component Preview Error
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {error instanceof Error ? error.message : String(error)}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                The component code will be shown in the Code section below.
              </div>
            </div>
          </div>
        )
        FallbackComponent.displayName = 'FallbackComponent'
        return FallbackComponent
      }
    },
    []
  )

  useEffect(() => {
    if (!isClient) return

    const loadComponent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Find the main component file
        const mainFile = Object.keys(componentFiles).find(
          file => file.endsWith('.jsx') || file.endsWith('.js')
        )

        if (!mainFile) {
          throw new Error('No React component file found')
        }

        const componentCode = componentFiles[mainFile]

        // Since we can't safely execute arbitrary JSX code, let's create a visual representation
        // that matches the component structure instead of trying to execute it directly

        // For now, we'll show a realistic mock that represents what the component does
        // This is safer and more reliable than trying to execute arbitrary code

        const Component = createComponentFromCode(componentCode, componentName)

        if (!Component || typeof Component !== 'function') {
          throw new Error('Could not extract React component')
        }

        // Create wrapper without any props - components should have their own defaults
        const ComponentWrapper = () => {
          return (
            <div className="w-full" style={{ minHeight: '200px' }}>
              <Component />
            </div>
          )
        }
        ComponentWrapper.displayName = 'ComponentWrapper'

        setRenderedComponent(() => ComponentWrapper)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [componentFiles, componentName, isClient, createComponentFromCode])

  const extractComponentName = (code: string): string => {
    // Extract component name from various patterns
    const patterns = [
      /export\s+default\s+function\s+(\w+)/, // export default function ComponentName
      /export\s+default\s+(\w+)/, // export default ComponentName
      /const\s+(\w+)\s*=\s*\(/, // const ComponentName = (
      /function\s+(\w+)\s*\(/, // function ComponentName(
    ]

    for (const pattern of patterns) {
      const match = code.match(pattern)
      if (match && match[1]) {
        // Skip common non-component names
        const name = match[1]
        if (!['defaultProps', 'props', 'state', 'config'].includes(name)) {
          return name
        }
      }
    }

    return 'Component'
  }

  if (!isClient || loading) {
    return (
      <div className="bg-white border rounded-lg p-4 h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border rounded-lg p-4 h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg
              className="h-8 w-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 text-sm">Preview Error</p>
          <p className="text-gray-500 text-xs mt-1">{error}</p>
        </div>
      </div>
    )
  }

  if (RenderedComponent) {
    return (
      <div className="p-6 min-h-48 bg-gray-50 relative">
        {/* Subtle checkerboard pattern for better contrast */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-conic-gradient(
                #f8f9fa 0% 25%,
                #e9ecef 25% 50%,
                #f8f9fa 50% 75%,
                #e9ecef 75% 100%
              )
            `,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 w-full">
          <RenderedComponent />
        </div>
      </div>
    )
  }

  // Only render interactive content on client side to avoid hydration issues
  if (!isClient) {
    return (
      <div className="bg-white border rounded-lg p-4 h-48 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    )
  }

  // Fallback if no component could be rendered
  return (
    <div className="bg-gray-50 border rounded-lg p-4 min-h-48 relative">
      {/* Subtle checkerboard pattern for better contrast */}
      <div
        className="absolute inset-0 opacity-30 rounded-lg"
        style={{
          backgroundImage: `
            repeating-conic-gradient(
              #f8f9fa 0% 25%,
              #e9ecef 25% 50%,
              #f8f9fa 50% 75%,
              #e9ecef 75% 100%
            )
          `,
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative z-10 w-full">
        <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <div className="text-gray-600">
            <div className="text-lg font-semibold mb-2">{componentName}</div>
            <div className="text-sm">Component could not be rendered</div>
            <div className="text-xs text-gray-500 mt-2">
              Please check the component code for any issues.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactPreview
