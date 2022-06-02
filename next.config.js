/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "www.armstrongfoils.com", "cdn.shopify.com"]
  }
}

module.exports = nextConfig
