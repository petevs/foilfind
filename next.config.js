/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "www.armstrongfoils.com"]
  }
}

module.exports = nextConfig
