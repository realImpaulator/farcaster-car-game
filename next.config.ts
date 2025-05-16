import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@vercel/og'],
  },
};

export default nextConfig;
