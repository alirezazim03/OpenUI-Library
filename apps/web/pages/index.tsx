import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import type { ComponentMetadata } from '../types'

export default function Home() {
  const [components, setComponents] = useState<ComponentMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetch('/api/components')
      .then(res => res.json())
      .then(data => {
        setComponents(data.components || [])
        setLoading(false)
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Failed to load components:', err)
        setLoading(false)
      })
  }, [])

  const groupedComponents = components.reduce(
    (acc: Record<string, ComponentMetadata[]>, component) => {
      if (!acc[component.category]) {
        acc[component.category] = []
      }
      acc[component.category].push(component)
      return acc
    },
    {}
  )

  // Filter components based on search query and selected category
  const filteredComponents = components.filter(component => {
    const matchesSearch =
      searchQuery === '' ||
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags?.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      component.author?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === null || component.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const filteredGroupedComponents = filteredComponents.reduce(
    (acc: Record<string, ComponentMetadata[]>, component) => {
      if (!acc[component.category]) {
        acc[component.category] = []
      }
      acc[component.category].push(component)
      return acc
    },
    {}
  )

  const categories = Object.keys(groupedComponents).sort()

  return (
    <>
      <Head>
        <title>Open UI Library - Community-driven UI Components</title>
        <meta
          name="description"
          content="A community-driven, open-source library of reusable UI components"
        />
        <link
          rel="icon"
          href="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Enhanced Navigation Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3">
                  <img
                    src="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
                    alt="Open UI Library Logo"
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      Open UI Library
                    </h1>
                    <p className="text-xs text-gray-500">
                      Community-driven components
                    </p>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Components
                </Link>
                <Link
                  href="#contributors"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Contributors
                </Link>
                <a
                  href="https://github.com/your-repo/openui-library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  GitHub
                </a>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 relative">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative inset-y-0 left-0 z-50 md:z-auto
          w-64 bg-white shadow-sm border-r overflow-y-auto transition-transform duration-300 ease-in-out
        `}
          >
            <div className="p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === null
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Components ({components.length})
                  </button>
                  {categories.map(category => {
                    const count = groupedComponents[category]?.length || 0
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="capitalize">{category}</span>
                        <span className="text-gray-500 ml-2">({count})</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory
                    ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Components`
                    : 'All Components'}
                </h2>
                <p className="text-gray-600">
                  {searchQuery && `Search results for "${searchQuery}" • `}
                  {Object.values(filteredGroupedComponents).flat().length}{' '}
                  component
                  {Object.values(filteredGroupedComponents).flat().length !== 1
                    ? 's'
                    : ''}{' '}
                  found
                </p>
              </div>

              {/* Content */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Loading components...
                  </h2>
                </div>
              ) : Object.keys(filteredGroupedComponents).length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-gray-400"
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No components found' : 'No components yet'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? 'Try adjusting your search terms or browse by category.'
                      : 'Add your first component to get started!'}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-12">
                  {Object.entries(filteredGroupedComponents).map(
                    ([category, categoryComponents]) => (
                      <section key={category}>
                        {!selectedCategory && (
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 capitalize">
                              {category}
                            </h3>
                            <button
                              onClick={() => setSelectedCategory(category)}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              View all →
                            </button>
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {categoryComponents.map(
                            (component: ComponentMetadata) => (
                              <Link
                                key={component.path}
                                href={`/component/${encodeURIComponent(component.path)}`}
                                className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-200"
                              >
                                <div className="p-6">
                                  <div className="flex items-start justify-between mb-3">
                                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {component.name}
                                    </h4>
                                    <div className="flex items-center space-x-1">
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {component.framework}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
                                    <span>v{component.version}</span>
                                    {component.author && (
                                      <>
                                        <span>•</span>
                                        <span>by {component.author}</span>
                                      </>
                                    )}
                                  </div>

                                  {component.tags &&
                                    component.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1">
                                        {component.tags
                                          .slice(0, 3)
                                          .map((tag: string) => (
                                            <span
                                              key={tag}
                                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        {component.tags.length > 3 && (
                                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                            +{component.tags.length - 3} more
                                          </span>
                                        )}
                                      </div>
                                    )}
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </section>
                    )
                  )}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Fixed Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                Open UI Library - MIT License
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Contributing
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  License
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// No getServerSideProps needed - using client-side fetching
