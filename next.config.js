/** @type {import('next').NextConfig} */
const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://5.161.218.11:7008';
/** Strapi API base (dev/staging/prod) — used for app + image remotePatterns */
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
/** Optional: production Strapi origin if it differs from NEXT_PUBLIC_STRAPI_API_URL in some builds */
const strapiProductionUrl = process.env.NEXT_PUBLIC_STRAPI_PRODUCTION_URL;
const gumletHost = process.env.NEXT_PUBLIC_GUMLET_HOST || process.env.NEXT_PUBLIC_GUMLET_CDN_HOST;

function toRemotePattern(urlString) {
  if (!urlString) return null;
  try {
    const u = new URL(urlString);
    return {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      port: u.port || "",
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

function toRemotePatternFromHost(hostString) {
  if (!hostString) return null;
  try {
    const u = new URL(hostString.startsWith("http") ? hostString : `https://${hostString}`);
    return {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      port: u.port || "",
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

function dedupeRemotePatterns(patterns) {
  const seen = new Set();
  return patterns.filter((p) => {
    if (!p) return false;
    const key = `${p.protocol}://${p.hostname}:${p.port || ""}${p.pathname}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Allow Next/Image for Strapi (env + optional prod), Gumlet, and local Strapi dev */
const remotePatterns = dedupeRemotePatterns([
  toRemotePattern(strapiUrl),
  toRemotePattern(strapiProductionUrl),
  toRemotePatternFromHost(gumletHost),
  // Local Strapi (no env required for dev)
  {
    protocol: "http",
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**",
  },
  {
    protocol: "https",
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**",
  },
]);
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  async rewrites() {
    return [
      { source: '/api/backend/:path*', destination: `${backendUrl}/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  typescript: {
    // Temporarily ignore type errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    /** Viewport widths for `sizes` / `fill` srcset (mobile → desktop) */
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920, 2048, 3840],
    /** Fixed layout / icon breakpoints */
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns,
  },
  // Keep existing path alias support
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
    };
    return config;
  },
};

module.exports = nextConfig;

