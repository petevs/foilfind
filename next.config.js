/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.armstrongfoils.com'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/retailers',
  //       permanent: true,
  //     },
  //   ]
  // }
}

module.exports = nextConfig
