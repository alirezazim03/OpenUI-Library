import Link from 'next/link'
import { getComponentsData } from '../lib/components'

export default function Home({ components }) {
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = []
    }
    acc[component.category].push(component)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Open UI Library</h1>
          <p className="mt-2 text-gray-600">
            A community-driven, open-source library of reusable UI components
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {Object.keys(groupedComponents).length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No components found
              </h2>
              <p className="text-gray-600">
                Add your first component to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedComponents).map(
                ([category, categoryComponents]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryComponents.map(component => (
                        <Link
                          key={component.path}
                          href={`/component/${encodeURIComponent(component.path)}`}
                          className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {component.name}
                            </h3>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {component.framework}
                              </span>
                              <span className="text-sm text-gray-500">
                                v{component.version}
                              </span>
                            </div>
                            {component.tags && component.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {component.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {component.author && (
                              <p className="text-sm text-gray-600">
                                by {component.author}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Open UI Library - MIT License
          </p>
        </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  console.log('getServerSideProps called from:', process.cwd())
  const components = getComponentsData()
  console.log('Components found in getServerSideProps:', components.length)

  return {
    props: {
      components,
    },
  }
}
