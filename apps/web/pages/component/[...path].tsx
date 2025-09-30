import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactPreview from '../../components/ReactPreview'
import type { ComponentWithFiles } from '../../types'

export default function ComponentPage() {
  const router = useRouter()
  const { path } = router.query
  const [component, setComponent] = useState<ComponentWithFiles | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!path) return

    const componentPath = Array.isArray(path) ? path.join('/') : path

    fetch(`/api/component/${componentPath}`)
      .then(res => res.json())
      .then(data => {
        if (data.component) {
          setComponent(data.component)
        } else {
          setError('Component not found')
        }
        setLoading(false)
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Failed to load component:', err)
        setError('Failed to load component')
        setLoading(false)
      })
  }, [path])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Loading component...
          </h1>
        </div>
      </div>
    )
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Component not found'}
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const isHtmlTailwind =
    component.framework === 'html' || component.framework === 'tailwind'
  const isReact = component.framework === 'react'

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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
            >
              ← Back to components
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {component.name}
            </h1>
            <div className="flex items-center space-x-4 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {component.framework}
              </span>
              <span className="text-sm text-gray-600">
                v{component.version}
              </span>
              {component.license && (
                <span className="text-sm text-gray-600">
                  {component.license} License
                </span>
              )}
              {component.author && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">by</span>
                  <a
                    href={`https://github.com/${component.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Preview
              </h2>
              {isHtmlTailwind && component.files['index.html'] ? (
                <div className="bg-gray-50 border rounded-xl shadow-sm p-6 relative">
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
                      backgroundSize: '20px 20px',
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
                        
                        /* Disable all interactive elements in preview */
                        button, input, textarea, select, a, [onclick], [onsubmit] {
                          pointer-events: none !important;
                          cursor: default !important;
                        }
                        
                        /* Disable form submission */
                        form {
                          pointer-events: none !important;
                        }
                        
                        /* Disable hover effects */
                        *:hover {
                          cursor: default !important;
                        }
                      </style>
                      ${component.files['index.html']}
                      <script>
                        // Prevent all form submissions and link navigation
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
                          
                          // Disable all links
                          const links = document.querySelectorAll('a');
                          links.forEach(link => {
                            link.addEventListener('click', function(e) {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            });
                          });
                          
                          // Disable all buttons
                          const buttons = document.querySelectorAll('button');
                          buttons.forEach(button => {
                            button.disabled = true;
                            button.addEventListener('click', function(e) {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            });
                          });
                          
                          // Disable all inputs
                          const inputs = document.querySelectorAll('input, textarea, select');
                          inputs.forEach(input => {
                            input.disabled = true;
                          });
                        });
                      </script>
                    `}
                    className="w-full h-64 border-0 relative z-10 rounded-lg"
                    title={`${component.name} preview`}
                  />
                </div>
              ) : isReact ? (
                <div className="bg-white border rounded-xl shadow-sm">
                  <ReactPreview
                    componentFiles={component.files}
                    componentName={component.name}
                  />
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                  <p className="text-gray-600 text-lg">
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

            {/* Code Section - Full Width */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Source Code
              </h2>
              <div className="space-y-4">
                {Object.entries(component.files).map(
                  ([filename, content]: [string, string]) => (
                    <div key={filename} className="bg-white rounded-lg shadow">
                      <div className="px-4 py-3 bg-gray-50 border-b rounded-t-lg">
                        <h3 className="text-sm font-medium text-gray-900">
                          {filename}
                        </h3>
                      </div>
                      <div className="p-4">
                        <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                          <code>{content}</code>
                        </pre>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

// No getServerSideProps needed - using client-side fetching
