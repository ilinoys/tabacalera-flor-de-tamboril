import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseStorageHost = supabaseUrl
  ? new URL(supabaseUrl).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
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
