import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone to load dev resources over Tailscale
  allowedDevOrigins: ['100.122.147.84', 'http://100.122.147.84:3333'],
};

export default nextConfig;
