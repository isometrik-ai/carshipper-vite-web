import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { buildGumletUrl } from "@/lib/urlHelpers.mjs";

type GumletImageProps = Omit<ImageProps, "loader"> & {
  /**
   * Optional Gumlet CDN host (no trailing slash), e.g. "https://your-zone.gumlet.io".
   * If not provided, falls back to the original `src`.
   */
  gumletHost?: string;
  /**
   * Allowed source URL prefix(es). Defaults to env: API URL, optional production URL, and
   * `NEXT_PUBLIC_STRAPI_MEDIA_ORIGIN` (Strapi Cloud media host, e.g. `https://xxx.media.strapiapp.com`).
   */
  sourceOrigin?: string | string[];
};

function gumletSourceOriginsFromEnv(): string[] {
  const raw = [
    process.env.NEXT_PUBLIC_STRAPI_API_URL,
    process.env.NEXT_PUBLIC_STRAPI_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_STRAPI_MEDIA_ORIGIN,
  ];
  const out: string[] = [];
  for (const r of raw) {
    if (!r) continue;
    for (const part of r.split(",")) {
      const s = part.trim();
      if (s) out.push(s);
    }
  }
  return out;
}

function resolveGumletLoaderArgs(gumletHost?: string, sourceOrigin?: string | string[]) {
  const origins =
    sourceOrigin !== undefined
      ? Array.isArray(sourceOrigin)
        ? sourceOrigin
        : [sourceOrigin]
      : gumletSourceOriginsFromEnv();

  const host =
    gumletHost ??
    process.env.NEXT_PUBLIC_GUMLET_HOST ??
    process.env.NEXT_PUBLIC_GUMLET_CDN_HOST ??
    undefined;

  return { host, origins };
}

export default function GumletImage({
  gumletHost,
  sourceOrigin,
  className,
  fill,
  ...props
}: GumletImageProps) {
  const { host, origins } = resolveGumletLoaderArgs(gumletHost, sourceOrigin);
  /** Default `object-cover` for `fill` layouts so parents keep a stable box (CLS). Override via `className`. */
  const mergedClassName = cn(fill && "object-cover", className);

  // No Gumlet account: use Next.js default optimizer (see `images.remotePatterns` in next.config).
  if (!host || origins.length === 0) {
    return <Image {...props} fill={fill} className={mergedClassName} />;
  }

  return (
    <Image
      {...props}
      fill={fill}
      className={mergedClassName}
      loader={({ src, width, quality }) =>
        buildGumletUrl({
          src,
          width,
          quality,
          gumletHost: host,
          sourceOrigin: origins,
        })
      }
    />
  );
}

