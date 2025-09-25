import Link from 'next/link'
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
          >
            ← Back to components
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{component.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {component.framework}
            </span>
            <span className="text-sm text-gray-600">v{component.version}</span>
            {component.license && (
              <span className="text-sm text-gray-600">
                {component.license} License
              </span>
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
              <div className="bg-white border rounded-xl shadow-sm p-6">
                <iframe
                  srcDoc={component.files['index.html']}
                  className="w-full h-96 border-0"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Component Info Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Component Info
              </h2>
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                {component.author && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Author
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {component.author}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Category
                  </dt>
                  <dd className="text-sm text-gray-900 capitalize">
                    {component.category}
                  </dd>
                </div>

                {component.tags && component.tags.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tags</dt>
                    <dd className="flex flex-wrap gap-1 mt-1">
                      {component.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}

                {component.demoUrl && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Demo URL
                    </dt>
                    <dd>
                      <a
                        href={component.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Demo →
                      </a>
                    </dd>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Usage
              </h2>
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="prose prose-sm text-gray-600">
                  <p className="mb-4">
                    Copy the component code and customize it for your project:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Install required dependencies (React, Tailwind CSS)</li>
                    <li>Copy the component code to your project</li>
                    <li>Import and use the component in your application</li>
                    <li>Customize props and styling as needed</li>
                  </ol>
                </div>

                {component.props && component.props.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Props
                    </h3>
                    <div className="space-y-2">
                      {component.props.map((prop, index: number) => (
                        <div
                          key={index}
                          className="text-xs bg-gray-50 p-2 rounded"
                        >
                          <span className="font-medium text-indigo-600">
                            {prop.name}
                          </span>
                          <span className="text-gray-500 ml-2">
                            ({prop.type})
                          </span>
                          <p className="text-gray-600 mt-1">
                            {prop.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {component.demoUrl && (
                  <div className="pt-4 border-t">
                    <a
                      href={component.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Live Demo
                      <svg
                        className="ml-2 -mr-1 w-4 h-4"
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
              </div>
            </div>

            {/* Tips Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customization Tips
              </h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 text-indigo-500 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p>
                        <span className="font-medium">Styling:</span> Modify
                        Tailwind classes to match your design system
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 text-indigo-500 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p>
                        <span className="font-medium">Responsiveness:</span>{' '}
                        Test on different screen sizes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 text-indigo-500 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p>
                        <span className="font-medium">Accessibility:</span>{' '}
                        Ensure proper ARIA labels and keyboard navigation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Section - Full Width */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Source Code
            </h2>
            <div className="space-y-4">
              {Object.entries(component.files).map(([filename, content]: [string, string]) => (
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// No getServerSideProps needed - using client-side fetching
