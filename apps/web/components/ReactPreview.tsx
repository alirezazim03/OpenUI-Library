import React, { useState, useEffect, useCallback, useRef } from "react"
import type { ReactPreviewProps } from "../types"

// Type declaration for Babel standalone - removed unused declaration

// Import Babel standalone
const BabelStandalone = require("@babel/standalone")

// Dynamic icon loader - only loads icons that are actually used
const loadReactIcon = async (
  iconPackage: string,
  iconName: string
): Promise<React.ComponentType<any> | null> => {
  try {
    // Use dynamic imports with explicit module paths that Next.js can resolve
    let iconModule
    switch (iconPackage) {
      case "ai":
        iconModule = await import("react-icons/ai")
        break
      case "bi":
        iconModule = await import("react-icons/bi")
        break
      case "bs":
        iconModule = await import("react-icons/bs")
        break
      case "cg":
        iconModule = await import("react-icons/cg")
        break
      case "ci":
        iconModule = await import("react-icons/ci")
        break
      case "di":
        iconModule = await import("react-icons/di")
        break
      case "fa":
        iconModule = await import("react-icons/fa")
        break
      case "fa6":
        iconModule = await import("react-icons/fa6")
        break
      case "fc":
        iconModule = await import("react-icons/fc")
        break
      case "fi":
        iconModule = await import("react-icons/fi")
        break
      case "gi":
        iconModule = await import("react-icons/gi")
        break
      case "go":
        iconModule = await import("react-icons/go")
        break
      case "gr":
        iconModule = await import("react-icons/gr")
        break
      case "hi":
        iconModule = await import("react-icons/hi")
        break
      case "hi2":
        iconModule = await import("react-icons/hi2")
        break
      case "im":
        iconModule = await import("react-icons/im")
        break
      case "io":
        iconModule = await import("react-icons/io")
        break
      case "io5":
        iconModule = await import("react-icons/io5")
        break
      case "lia":
        iconModule = await import("react-icons/lia")
        break
      case "lu":
        iconModule = await import("react-icons/lu")
        break
      case "md":
        iconModule = await import("react-icons/md")
        break
      case "pi":
        iconModule = await import("react-icons/pi")
        break
      case "ri":
        iconModule = await import("react-icons/ri")
        break
      case "rx":
        iconModule = await import("react-icons/rx")
        break
      case "si":
        iconModule = await import("react-icons/si")
        break
      case "sl":
        iconModule = await import("react-icons/sl")
        break
      case "tb":
        iconModule = await import("react-icons/tb")
        break
      case "tfi":
        iconModule = await import("react-icons/tfi")
        break
      case "ti":
        iconModule = await import("react-icons/ti")
        break
      case "vsc":
        iconModule = await import("react-icons/vsc")
        break
      case "wi":
        iconModule = await import("react-icons/wi")
        break
      default:
        // eslint-disable-next-line no-console
        console.warn(`Unsupported icon package: ${iconPackage}`)
        return null
    }

    const iconComponent = (iconModule as any)[iconName]
    if (iconComponent) {
      // eslint-disable-next-line no-console
      console.log(
        `Successfully loaded icon: ${iconName} from react-icons/${iconPackage}`
      )
      return iconComponent
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Icon ${iconName} not found in react-icons/${iconPackage}`)
      return null
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to load icon ${iconName} from react-icons/${iconPackage}:`,
      error
    )
    return null
  }
}

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
    async (
      code: string,
      componentName: string
    ): Promise<React.ComponentType<any>> => {
      try {
        // Extract react-icons imports and their variables
        const reactIconsImports: { [key: string]: string[] } = {}
        const reactIconsRegex =
          /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]react-icons\/([^'"]+)['"];?/g
        let match

        while ((match = reactIconsRegex.exec(code)) !== null) {
          const iconNames = match[1].split(",").map(name => name.trim())
          const iconPackage = match[2]
          reactIconsImports[iconPackage] = iconNames
          // eslint-disable-next-line no-console
          console.log(
            `Found react-icons import: ${iconNames.join(", ")} from react-icons/${iconPackage}`
          )
        }

        // Check for unsupported icon library imports
        const unsupportedIconLibraries = [
          "lucide-react",
          "@heroicons/react",
          "@tabler/icons",
          "@phosphor-icons/react",
          "feather-icons",
          "@fortawesome/react-fontawesome",
          "@mui/icons-material",
          "react-feather",
          "@ant-design/icons",
          "react-bootstrap-icons",
          "@radix-ui/react-icons",
        ]

        const unsupportedImports: string[] = []
        unsupportedIconLibraries.forEach(library => {
          const unsupportedRegex = new RegExp(
            `import\\s*.*?from\\s*['"]${library.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}.*?['"];?`,
            "g"
          )
          if (unsupportedRegex.test(code)) {
            unsupportedImports.push(library)
          }
        })

        // If unsupported icon imports are found, return a warning component
        if (unsupportedImports.length > 0) {
          const WarningComponent = () => (
            <div className="w-full p-6 border-2 border-orange-300 bg-orange-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-orange-600"
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
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">
                    Unsupported Icon Library Detected
                  </h3>
                  <p className="text-orange-700 mb-3">
                    This component uses{" "}
                    <strong>{unsupportedImports.join(", ")}</strong> which is
                    not supported in the preview system.
                  </p>
                  <div className="bg-white p-4 rounded border border-orange-200 mb-3">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>✅ Supported:</strong> Only{" "}
                      <code className="bg-gray-100 px-1 rounded">
                        react-icons
                      </code>{" "}
                      is supported
                    </p>
                    <p className="text-sm text-gray-600">
                      Please replace your icon imports with equivalent icons
                      from react-icons:
                    </p>
                    <code className="block mt-2 text-sm bg-gray-100 p-2 rounded">
                      import &#123; IconName &#125; from
                      &quot;react-icons/[package]&quot;
                    </code>
                  </div>
                  <div className="text-sm text-orange-600">
                    <p>
                      📚 Browse available icons at:
                      <a
                        href="https://react-icons.github.io/react-icons"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline ml-1"
                      >
                        react-icons.github.io
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
          WarningComponent.displayName = "UnsupportedIconWarning"
          return WarningComponent
        }

        // Dynamically load only the required icons
        const iconVariables: { [key: string]: any } = {}

        for (const [iconPackage, iconNames] of Object.entries(
          reactIconsImports
        )) {
          for (const iconName of iconNames) {
            const IconComponent = await loadReactIcon(iconPackage, iconName)
            if (IconComponent) {
              iconVariables[iconName] = IconComponent
            } else {
              // Create a fallback icon component if the specific icon doesn't exist
              iconVariables[iconName] = ({ className, ...props }: any) =>
                React.createElement("div", {
                  className: `inline-block w-4 h-4 bg-gray-400 rounded ${className || ""}`,
                  title: `Icon: ${iconName} (not found)`,
                  ...props,
                })
            }
          }
        }

        // Use Babel to transform JSX to JavaScript
        let cleanCode = code
          // Remove all imports except react-icons (we'll handle those separately)
          .replace(
            /import\s+.*?from\s+['"](?!react-icons\/)[^'"]*['"];?\s*/g,
            ""
          )
          // Remove react-icons imports (we'll inject them)
          .replace(
            /import\s*\{\s*[^}]+\s*\}\s*from\s*['"]react-icons\/[^'"]+['"];?\s*/g,
            ""
          )
          .replace(/export\s+default\s+/, "")
          .replace(/export\s+/, "")
          // Replace Next.js Image with regular img tag to avoid Image constructor issues
          .replace(/import\s+Image\s+from\s+['"]next\/image['"];?\s*/g, "")
          .replace(/<Image\s+/g, "<img ")
          .replace(
            /\bfill(?=\s|$|>)/g,
            "style={{width: \"100%\", height: \"100%\", objectFit: \"cover\"}}"
          )
          // Replace useTheme calls with a mock implementation
          .replace(/useTheme\(\)/g, "(() => ({ theme: 'dark', setTheme: () => {}, toggleTheme: () => {} }))()")
          // Also replace useTheme imports and usage
          .replace(/import\s*\{\s*useTheme[^}]*\}\s*from\s*['"][^'"]*['"];?\s*/g, "")
          .replace(/const\s*\[\s*[^,]*,\s*[^]]*\]\s*=\s*useTheme\(\);?/g, "const theme = 'dark'; const setTheme = () => {}; const toggleTheme = () => {};")
          .replace(/const\s*\{[^}]*useTheme[^}]*\}\s*=\s*useTheme\(\);?/g, "const theme = 'dark'; const setTheme = () => {}; const toggleTheme = () => {};")

        // Transform JSX using Babel
        const transformedResult = BabelStandalone.transform(cleanCode, {
          presets: [
            [
              "react",
              {
                runtime: "classic",
              },
            ],
          ],
          plugins: [],
        })

        const transformedCode = transformedResult.code || cleanCode

        const wrappedCode = `
        (function(React, useState, useEffect, useRef, iconVariables) {
          // Inject icon variables into the scope
          ${Object.keys(iconVariables)
            .map(iconName => `const ${iconName} = iconVariables.${iconName};`)
            .join("\n          ")}

          ${transformedCode}

          return ${extractComponentName(code)};
        })
      `

        // Execute the wrapped code
        const componentFactory = eval(wrappedCode)
        const Component = componentFactory(
          React,
          useState,
          useEffect,
          useRef,
          iconVariables
        )

        if (typeof Component === "function") {
          Component.displayName = componentName
          return Component
        }

        throw new Error("Component is not a function")
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error creating component:", error)

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
        FallbackComponent.displayName = "FallbackComponent"
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
          file => file.endsWith(".jsx") || file.endsWith(".js")
        )

        if (!mainFile) {
          throw new Error("No React component file found")
        }

        const componentCode = componentFiles[mainFile]

        // Special handling for milestone-fireworks component
        if (componentName === "milestone-fireworks") {
          const StaticPreview = () => (
            <div className="relative w-full h-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 animate-pulse"></div>

              {/* Lightweight fireworks simulation - just a few key particles */}
              <div className="absolute inset-0">
                {/* Single firework burst with minimal particles */}
                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full opacity-80"
                     style={{ left: "30%", top: "35%", animation: "firework 2s ease-out infinite" }} />
                <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70"
                     style={{ left: "50%", top: "40%", animation: "firework 2s ease-out infinite 0.3s" }} />
                <div className="absolute w-2.5 h-2.5 bg-red-400 rounded-full opacity-75"
                     style={{ left: "70%", top: "30%", animation: "firework 2s ease-out infinite 0.6s" }} />
                <div className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-80"
                     style={{ left: "40%", top: "50%", animation: "firework 2s ease-out infinite 0.9s" }} />
              </div>

              {/* Milestone text overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className="text-4xl font-bold text-white animate-bounce">
                  10,000
                </div>
                <div className="text-lg mt-2 text-yellow-300">
                  Users Reached! 🎉
                </div>
              </div>

              {/* Demo info */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="text-white/80 text-sm bg-black/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                  🎆 Milestone Fireworks Animation Preview
                </div>
              </div>

              <style jsx>{`
                @keyframes firework {
                  0% { opacity: 0; transform: scale(0); }
                  50% { opacity: 1; transform: scale(1.2); }
                  100% { opacity: 0; transform: scale(0.8); }
                }
              `}</style>
            </div>
          )
          StaticPreview.displayName = "StaticMilestoneFireworksPreview"
          setRenderedComponent(() => StaticPreview)
        } else {
          // For other components, try the dynamic approach
          const Component = await createComponentFromCode(
            componentCode,
            componentName
          )

          if (!Component || typeof Component !== "function") {
            throw new Error("Could not extract React component")
          }

          // Create wrapper with theme context for components that might need it
          const ComponentWrapper = () => {
            // Create a simple theme provider mock
            const ThemeProviderMock = ({ children }: { children: React.ReactNode }) => {
              return React.createElement("div", {
                "data-theme": "dark",
                className: "theme-provider-mock"
              }, children)
            }

            // Wrap component in mock theme provider
            const wrappedComponent = React.createElement(ThemeProviderMock, null, React.createElement(Component))

            return (
              <div className="w-full" style={{ minHeight: "200px" }}>
                {wrappedComponent}
              </div>
            )
          }
          ComponentWrapper.displayName = "ComponentWrapper"

          setRenderedComponent(() => ComponentWrapper)
        }
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
        if (!["defaultProps", "props", "state", "config"].includes(name)) {
          return name
        }
      }
    }

    return "Component"
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
            backgroundSize: "20px 20px",
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
          backgroundSize: "20px 20px",
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
