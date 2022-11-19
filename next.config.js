/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.armstrongfoils.com', 
    'https://armstrongfoils.com', 
    'armstrongfoils.com', 
    'appletreesurfboards.com', 
    'cdn.shopify.com', 
    'firebasestorage.googleapis.com', 
    'www.f-one.world', 
    'cdn.boards-and-more.com',
    'img.youtube.com'
  ],
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
