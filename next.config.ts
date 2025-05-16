import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@vercel/og'],
  },
};

export default nextConfig;
