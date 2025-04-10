import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbo: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
