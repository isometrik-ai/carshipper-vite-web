import { toRemotePattern, toRemotePatternFromHost } from "@/lib/urlHelpers.mjs";

type RemotePattern = NonNullable<ReturnType<typeof toRemotePattern>>;

function patternToOrigin(pattern: RemotePattern): string {
  const port = pattern.port ? `:${pattern.port}` : "";
  return `${pattern.protocol}://${pattern.hostname}${port}`;
}

function collectPreconnectOrigins(): string[] {
  const raw = new Set<string>();

  const gumlet =
    process.env.NEXT_PUBLIC_GUMLET_HOST ?? process.env.NEXT_PUBLIC_GUMLET_CDN_HOST;
  const gumletPattern = gumlet ? toRemotePatternFromHost(gumlet) : null;
  if (gumletPattern) raw.add(patternToOrigin(gumletPattern));

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiPattern = apiBase ? toRemotePattern(apiBase) : null;
  if (apiPattern) raw.add(patternToOrigin(apiPattern));

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const strapiPattern = strapiUrl ? toRemotePattern(strapiUrl) : null;
  if (strapiPattern) raw.add(patternToOrigin(strapiPattern));

  const strapiProduction = process.env.NEXT_PUBLIC_STRAPI_PRODUCTION_URL;
  const strapiProdPattern = strapiProduction ? toRemotePattern(strapiProduction) : null;
  if (strapiProdPattern) raw.add(patternToOrigin(strapiProdPattern));

  const mediaRaw = process.env.NEXT_PUBLIC_STRAPI_MEDIA_ORIGIN;
  if (mediaRaw) {
    for (const part of mediaRaw.split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const p = toRemotePattern(trimmed);
      if (p) raw.add(patternToOrigin(p));
    }
  }

  return Array.from(raw);
}

/** Adds preconnect link tags for configured CDN/API origins (LCP / API latency). */
export default function ResourceHints() {
  const origins = collectPreconnectOrigins();
  if (origins.length === 0) return null;

  return (
    <>
      {origins.map((href) => (
        <link key={href} rel="preconnect" href={href} crossOrigin="anonymous" />
      ))}
    </>
  );
}
