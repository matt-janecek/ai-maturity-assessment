/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server actions for form submissions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
