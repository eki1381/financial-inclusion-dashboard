import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['leaflet'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;
