/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages:[
    'gsap'
  ],
  experimental:{
    workerThreads:false,
    cpus:1,
  }
}

module.exports = nextConfig
