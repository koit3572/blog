/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output:"export",
  env: {
    BASE_URL:process.env.BASE_URL
  }
}

module.exports = nextConfig
