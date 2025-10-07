import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ReactPreview from "../../components/ReactPreview"
import type { ComponentWithFiles } from "../../types"

export default function ComponentPage() {
  const router = useRouter()
  const { path } = router.query
  const [component, setComponent] = useState<ComponentWithFiles | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  )
  const [wordWrap, setWordWrap] = useState(false)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (_err) {
      // Failed to copy to clipboard
    }
  }

  useEffect(() => {
    if (!path) return

    const componentPath = Array.isArray(path) ? path.join("/") : path

    fetch(`/api/component/${componentPath}`)
      .then(res => res.json())
      .then(data => {
        if (data.component) {
          setComponent(data.component)
        } else {
          setError("Component not found")
        }
        setLoading(false)
      })
      .catch(_err => {
        setError("Failed to load component")
        setLoading(false)
      })
  }, [path])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading component...
          </h1>
        </div>
      </div>
    )
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error || "Component not found"}
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const isHtmlTailwind =
    component.framework === "html" || component.framework === "tailwind"
  const isReact = component.framework === "react"
  const isVue = component.framework === "vue"

  return (
    <>
      <Head>
        <title>{component.name} - Open UI Library</title>
        <meta
          name="description"
          content={`${component.name} component for ${component.framework} - Open UI Library`}
        />
        <link
          rel="icon"
          href="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm mb-2 inline-block"
            >
              ← Back to components
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {component.name}
            </h1>
            <div className="flex items-center space-x-4 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {component.framework}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                v{component.version}
              </span>
              {component.license && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {component.license} License
                </span>
              )}
              {component.author && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                    by
                  </span>
                  <a
                    href={`https://github.com/${component.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    @{component.author}
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Preview Section - Full Width */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Preview
              </h2>
              {isHtmlTailwind && component.files["index.html"] ? (
                <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm p-6 relative">
                  {/* Subtle checkerboard pattern for better contrast */}
                  <div
                    className="absolute inset-6 opacity-30 rounded-lg"
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
                  <iframe
                    srcDoc={`
                      <style>
                        /* Contrast background for better visibility */
                        body {
                          background: #f8f9fa;
                          background-image: repeating-conic-gradient(
                            #f8f9fa 0% 25%,
                            #e9ecef 25% 50%,
                            #f8f9fa 50% 75%,
                            #e9ecef 75% 100%
                          );
                          background-size: 20px 20px;
                          margin: 0;
                          padding: 20px;
                        }
                        
                        /* Disable only redirect-causing elements in preview */
                        a[href]:not([href^="#"]):not([href=""]) {
                          pointer-events: none !important;
                          cursor: default !important;
                        }
                        
                        /* Disable form submission */
                        form {
                          pointer-events: none !important;
                        }
                        
                        /* Allow interactive elements like buttons to work */
                        button {
                          cursor: pointer !important;
                        }
                      </style>
                      ${component.files["index.html"]}
                      <script>
                        // Prevent only redirect-causing interactions
                        document.addEventListener('DOMContentLoaded', function() {
                          // Disable all forms
                          const forms = document.querySelectorAll('form');
                          forms.forEach(form => {
                            form.addEventListener('submit', function(e) {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            });
                          });
                          
                          // Disable only external links (not hash links or empty hrefs)
                          const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href=""])');
                          links.forEach(link => {
                            link.addEventListener('click', function(e) {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            });
                          });
                          
                          // Allow buttons to work normally - they should handle their own interactions
                          // Only prevent if they would cause navigation
                          const buttons = document.querySelectorAll('button');
                          buttons.forEach(button => {
                            // Check if button has onclick that might cause navigation
                            const onclickAttr = button.getAttribute('onclick');
                            if (onclickAttr && (onclickAttr.includes('window.location') || onclickAttr.includes('location.href'))) {
                              button.addEventListener('click', function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                              });
                            }
                          });
                          
                          // Allow inputs to work normally unless they're in forms
                          // Forms are already disabled above
                        });
                      </script>
                    `}
                    className="w-full h-64 border-0 relative z-10 rounded-lg"
                    title={`${component.name} preview`}
                  />
                </div>
              ) : isReact ? (
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm">
                  <ReactPreview
                    componentFiles={component.files}
                    componentName={component.name}
                  />
                </div>
              ) : isVue ? (
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm">
                  {(() => {
                    const files = component.files || {}
                    const entries = Object.entries(files)

                    // Check if there's an index.html file (browser-compatible Vue component)
                    const htmlEntry = entries.find(
                      ([fn]) => fn === "index.html"
                    )

                    if (htmlEntry) {
                      const [, htmlContent] = htmlEntry
                      return (
                        <iframe
                          srcDoc={htmlContent}
                          className="w-full h-64 border-0 relative z-10 rounded-lg"
                          title={`${component.name} preview`}
                          sandbox="allow-scripts"
                        />
                      )
                    }

                    // Fallback: Show message that Vue SFC needs compilation
                    return (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-center p-6">
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Vue Component Preview
                          </h3>
                          <p className="text-gray-600 mb-2">
                            This Vue component uses SFC syntax that requires
                            compilation.
                          </p>
                          <p className="text-sm text-gray-500">
                            The component code is available in the Code section
                            below.
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Preview not available for {component.framework} components
                  </p>
                </div>
              )}
            </div>

            {/* Optional: Show demo URL prominently if available */}
            {component.demoUrl && (
              <div className="mb-8">
                <a
                  href={component.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  View Live Demo
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {/* Code Section - Two Panel Layout */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Documentation & Code
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* README Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        README.md
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {component.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        A feature-rich {component.category} component designed
                        for {component.framework} applications.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <strong>Author:</strong>{" "}
                        <a
                          href={`https://github.com/${component.author}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          @{component.author}
                        </a>
                      </p>

                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Features
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                        <li>Modern and responsive design</li>
                        <li>Easy to customize</li>
                        <li>
                          Built with {component.framework}
                          {component.framework === "react"
                            ? " and Tailwind CSS"
                            : ""}
                        </li>
                      </ul>

                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Installation
                      </h2>
                      <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                        <li>Copy the component code to your project</li>
                        <li>
                          Install required dependencies (
                          {component.framework === "react"
                            ? "React, Tailwind CSS"
                            : "Tailwind CSS"}
                          )
                        </li>
                        <li>Import and use the component</li>
                      </ol>

                      {component.props && component.props.length > 0 && (
                        <>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Props
                          </h2>
                          <div className="overflow-x-auto mb-4">
                            <table className="min-w-full text-sm">
                              <thead>
                                <tr className="border-b dark:border-gray-600">
                                  <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">
                                    Prop
                                  </th>
                                  <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">
                                    Type
                                  </th>
                                  <th className="text-left py-2 text-gray-900 dark:text-white font-semibold">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {component.props.map((prop, index) => (
                                  <tr
                                    key={index}
                                    className="border-b dark:border-gray-600"
                                  >
                                    <td className="py-2 font-mono text-blue-600 dark:text-blue-400">
                                      {prop.name}
                                    </td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">
                                      {prop.type}
                                    </td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">
                                      {prop.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}

                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Customization
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                        <li>
                          Modify Tailwind classes to match your design system
                        </li>
                        <li>
                          Update colors, spacing, and typography as needed
                        </li>
                        <li>Add additional functionality as required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Component Code Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700/50 dark:to-slate-700/50 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-gray-600 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Component Code
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const allCode = Object.entries(component.files)
                            .filter(([filename]) => {
                              // Only include actual component files, exclude documentation
                              const lowerFilename = filename.toLowerCase()
                              return (
                                !lowerFilename.includes("readme") &&
                                !lowerFilename.includes(".md") &&
                                filename !== "component.json"
                              )
                            })
                            .map(
                              ([filename, content]) =>
                                `// ${filename}\n${content}`
                            )
                            .join("\n\n")
                          copyToClipboard(allCode, "component")
                        }}
                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                          copiedStates.component
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                      >
                        {copiedStates.component ? (
                          <>
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy All
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setWordWrap(!wordWrap)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                          wordWrap
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h7"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12l-4-4m4 4l-4 4"
                          />
                        </svg>
                        {wordWrap ? "Wrapped" : "Wrap"}
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {Object.entries(component.files)
                      .filter(([filename]) => {
                        // Only show actual component files, exclude documentation
                        const lowerFilename = filename.toLowerCase()
                        return (
                          !lowerFilename.includes("readme") &&
                          !lowerFilename.includes(".md") &&
                          filename !== "component.json"
                        )
                      })
                      .map(([filename, content]: [string, string], index) => (
                        <div key={filename}>
                          <div className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                            <span className="text-sm font-mono">
                              {filename}
                            </span>
                          </div>
                          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            <pre
                              className={`text-sm text-gray-800 dark:text-gray-100 overflow-x-auto ${wordWrap ? "whitespace-pre-wrap" : "whitespace-pre"}`}
                            >
                              <code>{content}</code>
                            </pre>
                          </div>
                          {index <
                            Object.entries(component.files).length - 1 && (
                            <div className="border-t border-gray-200 dark:border-gray-600"></div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

// No getServerSideProps needed - using client-side fetching
