import Image, { ImageLoaderProps, type ImageLoader, type ImageProps } from "next/image";
import { buildGumletUrl } from "@/lib/urlHelpers.mjs";

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

const gumletLoader: ImageLoader = ({ src, width, quality }) => {
  // We read env at runtime so this component works across environments.
  const gumletHost = process.env.NEXT_PUBLIC_GUMLET_HOST ?? process.env.NEXT_PUBLIC_GUMLET_CDN_HOST ?? undefined;
  const sourceOrigin = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? undefined;
  if (!gumletHost || !sourceOrigin) {
    throw new Error("Missing required environment variables for GumletImage");
  }

  return buildGumletUrl({
    src,
    gumletHost: gumletHost || undefined,
    sourceOrigin: sourceOrigin || undefined,
    width,
    quality,
  });
};
const loader = (args: any): string =>
  buildGumletUrl({
    src: args.src,
    width: args.width,
    quality: args.quality,
    gumletHost:
      args?.gumletHost ??
      process.env.NEXT_PUBLIC_GUMLET_HOST ??
      process.env.NEXT_PUBLIC_GUMLET_CDN_HOST ??
      undefined,
    sourceOrigin: args?.sourceOrigin ?? process.env.NEXT_PUBLIC_STRAPI_API_URL ?? undefined,
  });

export default function GumletImage({
  gumletHost,
  sourceOrigin,
  ...props
}: GumletImageProps) {
  return <Image {...props} loader={() => loader(props)} />;
}

