import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // resend optionally requires @react-email/render at runtime; keep it out of the bundle
  serverExternalPackages: ["resend"],
};

export default nextConfig;
