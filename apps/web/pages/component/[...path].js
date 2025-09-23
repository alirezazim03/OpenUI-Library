import Link from 'next/link'
import { getComponentsData, getComponentByPath } from '../../lib/components'

export default function ComponentPage({ component }) {
  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Component not found
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  const isHtmlTailwind = component.framework === 'html' || component.framework === 'tailwind'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to components
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {component.name}
          </h1>
          <div className="flex items-center space-x-4 mt-2">
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Preview
              </h2>
              {isHtmlTailwind && component.files['index.html'] ? (
                <div className="bg-white border rounded-lg p-4">
                  <iframe
                    srcDoc={component.files['index.html']}
                    className="w-full h-64 border-0"
                    title={`${component.name} preview`}
                  />
                </div>
              ) : (
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    Preview not available for {component.framework} components
                  </p>
                </div>
              )}
            </div>

            {/* Metadata Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Component Info
              </h2>
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                {component.author && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Author</dt>
                    <dd className="text-sm text-gray-900">{component.author}</dd>
                  </div>
                )}
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900 capitalize">{component.category}</dd>
                </div>

                {component.tags && component.tags.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tags</dt>
                    <dd className="flex flex-wrap gap-1 mt-1">
                      {component.tags.map((tag) => (
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
                    <dt className="text-sm font-medium text-gray-500">Demo URL</dt>
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
          </div>

          {/* Code Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Code
            </h2>
            <div className="space-y-4">
              {Object.entries(component.files).map(([filename, content]) => (
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

export async function getStaticPaths() {
  const components = getComponentsData()
  
  const paths = components.map((component) => ({
    params: {
      path: component.path.split('/')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const componentPath = params.path.join('/')
  const component = getComponentByPath(componentPath)

  return {
    props: {
      component
    }
  }
}
