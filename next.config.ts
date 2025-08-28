/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // ✅ WAJIB kalau pakai App Router
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/isbn/**', // semua gambar di folder isbn
      },
    ],
  },
};

module.exports = nextConfig;
