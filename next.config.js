/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure output for static site generation if needed
  output: 'standalone',
};

module.exports = nextConfig;
