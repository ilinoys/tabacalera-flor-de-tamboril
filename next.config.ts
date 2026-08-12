import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseStorageHost = supabaseUrl
  ? new URL(supabaseUrl).hostname
  : undefined;

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.100.186",
    "localhost",
  ],

  images: {
    localPatterns: [
      {
        pathname: "/images/gallery/**",
      },
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    remotePatterns: supabaseStorageHost
      ? [
          {
            protocol: "https",
            hostname: supabaseStorageHost,
            pathname: "/storage/v1/object/public/products/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
