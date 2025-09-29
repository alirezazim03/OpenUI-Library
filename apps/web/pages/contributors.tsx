import Link from 'next/link'
import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Contributors() {
  return (
    <>
      <Head>
        <title>Contributors - Open UI Library</title>
        <meta
          name="description"
          content="Contributors to the Open UI Library project"
        />
        <link
          rel="icon"
          href="https://xbllreuvbgzawhgemndh.supabase.co/storage/v1/object/public/material/openUI.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar currentPage="contributors" />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            {/* Construction Icon */}
            <div className="mx-auto w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-8">
              <svg
                className="w-16 h-16 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contributors Page
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl font-semibold text-yellow-600 mb-6">
              Under Construction
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We&apos;re building an amazing contributors page to showcase all
              the talented developers who help make Open UI Library better.
              Check back soon to see our community heroes!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ← Back to Components
              </Link>
              <a
                href="https://github.com/alirezazim03/OpenUI-Library"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                Contribute on GitHub
              </a>
            </div>

            {/* Coming Soon Features */}
            <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Coming Soon
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Contributor profiles and avatars</li>
                <li>• Contribution statistics and metrics</li>
                <li>• Component attribution</li>
                <li>• Community highlights and features</li>
              </ul>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                Open UI Library - MIT License
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="https://github.com/alirezazim03/OpenUI-Library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Contributing
                </a>
                <a
                  href="https://github.com/alirezazim03/OpenUI-Library/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
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
