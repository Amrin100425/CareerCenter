import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // @ts-ignore
    allowedDevOrigins: ['192.168.72.1'],
  },
};

export default nextConfig;
