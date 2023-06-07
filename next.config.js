/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  typescript: {
    // todo: remove this, turning it on to get code out quicker
    ignoreBuildErrors: true,
  }
};
