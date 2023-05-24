/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};
