import Image, { type ImageLoader, type ImageProps } from "next/image";

type GumletImageProps = Omit<ImageProps, "loader"> & {
  /**
   * Optional Gumlet CDN host (no trailing slash), e.g. "https://your-zone.gumlet.io".
   * If not provided, falls back to the original `src`.
   */
  gumletHost?: string;
  /**
   * If provided, only rewrite image URLs that start with this origin (no trailing slash),
   * e.g. "https://cms.example.com". Helpful when your `src` is a full Strapi URL.
   */
  sourceOrigin?: string;
};

function normalizeNoTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function tryUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function buildGumletUrl(params: {
  src: string;
  gumletHost?: string;
  sourceOrigin?: string;
  width: number;
  quality?: number;
}) {
  const { src, gumletHost, sourceOrigin, width, quality } = params;
  if (!gumletHost) return src;

  const gumletBase = normalizeNoTrailingSlash(gumletHost);
  const srcUrl = tryUrl(src);

  // Local/static image or non-URL src -> let Next handle it
  if (!srcUrl) return src;

  // If `sourceOrigin` is provided, only rewrite matching URLs
  if (sourceOrigin) {
    const origin = normalizeNoTrailingSlash(sourceOrigin);
    if (!src.startsWith(origin)) return src;
  }

  // Map origin to Gumlet host while keeping path.
  // Assumes your Gumlet source is configured to fetch from the original origin.
  const out = new URL(`${gumletBase}${srcUrl.pathname}`);
  out.searchParams.set("w", String(width));
  out.searchParams.set("q", String(quality ?? 75));
  out.searchParams.set("auto", "format");

  return out.toString();
}

const gumletLoader: ImageLoader = ({ src, width, quality }) => {
  // We read env at runtime so this component works across environments.
  const gumletHost =
    process.env.NEXT_PUBLIC_GUMLET_HOST ||
    process.env.NEXT_PUBLIC_GUMLET_CDN_HOST ||
    "";
  const sourceOrigin = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";

  return buildGumletUrl({
    src,
    gumletHost: gumletHost || undefined,
    sourceOrigin: sourceOrigin || undefined,
    width,
    quality,
  });
};

export default function GumletImage({
  gumletHost,
  sourceOrigin,
  ...props
}: GumletImageProps) {
  const loader: ImageLoader = (args) =>
    buildGumletUrl({
      src: args.src,
      width: args.width,
      quality: args.quality,
      gumletHost:
        gumletHost ??
        process.env.NEXT_PUBLIC_GUMLET_HOST ??
        process.env.NEXT_PUBLIC_GUMLET_CDN_HOST ??
        undefined,
      sourceOrigin: sourceOrigin ?? process.env.NEXT_PUBLIC_STRAPI_API_URL ?? undefined,
    });

  return <Image {...props} loader={loader} />;
}

