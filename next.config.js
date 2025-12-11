/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    }
  ]
})

const nextConfig = {
  experimental: {
    appDir: true
  },
  transpilePackages: [
    '@react-three/fiber',
    '@react-three/drei',
    'three'
  ]
}

module.exports = withPWA(nextConfig)