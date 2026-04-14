import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "subhamdas-portfolio.vercel.app",
      },
    ],
  },
};

export default nextConfig;
