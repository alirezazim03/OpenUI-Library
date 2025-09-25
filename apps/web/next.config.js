/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@open-ui-library/ui-metadata'],
  typescript: {
    // Enable TypeScript checks during build
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
