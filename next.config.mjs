import path from "path";
import { dedupeRemotePatterns, toRemotePattern, toRemotePatternFromHost } from "./src/lib/urlHelpers.mjs";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://5.161.218.11:7008";
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const strapiProductionUrl = process.env.NEXT_PUBLIC_STRAPI_PRODUCTION_URL;
const gumletHost = process.env.NEXT_PUBLIC_GUMLET_HOST || process.env.NEXT_PUBLIC_GUMLET_CDN_HOST;

const remotePatterns = dedupeRemotePatterns([
  ...(strapiUrl ? [toRemotePattern(strapiUrl)] : []),
  ...(strapiProductionUrl ? [toRemotePattern(strapiProductionUrl)] : []),
  ...(gumletHost ? [toRemotePatternFromHost(gumletHost)] : []),
  { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
  { protocol: "https", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
]);

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // async rewrites() {
  //   return [{ source: "/api/backend/:path*", destination: `${backendUrl}/:path*` }];
  // },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("./src"),
    };
    return config;
  },
};

export default nextConfig;
