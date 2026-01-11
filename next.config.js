/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  // Next.js 16: optimizePackageImports는 안정화되어 experimental에서 제거됨
  optimizePackageImports: ['@/components'],
}

module.exports = nextConfig

