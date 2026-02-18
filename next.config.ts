import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
  ignoreDuringBuilds: true,
},
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-*/**",
      },
    ],
  },
};

export default nextConfig;
