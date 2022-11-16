/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.armstrongfoils.com', 'appletreesurfboards.com'],
  },
  async redirects() {
    return [
      {
        source: '/brands/:brand',
        destination: '/brands/:brand/products',
        permanent: true,
      }
      // {
      //   source: '/',
      //   destination: '/retailers',
      //   permanent: true,
      // },
    ]
  }
}

module.exports = nextConfig
