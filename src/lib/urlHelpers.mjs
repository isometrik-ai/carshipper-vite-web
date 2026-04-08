export function normalizeNoTrailingSlash(value) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function tryUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function toRemotePattern(urlString) {
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

export function toRemotePatternFromHost(hostString) {
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

export function dedupeRemotePatterns(patterns) {
  const seen = new Set();
  return patterns.filter((pattern) => {
    if (!pattern) return false;
    const key = `${pattern.protocol}://${pattern.hostname}:${pattern.port || ""}${pattern.pathname}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * @param {string | string[] | undefined} sourceOrigin
 *   One or more allowed URL prefixes (e.g. Strapi API + Strapi Cloud media host).
 *   Strapi often returns assets on `*.media.strapiapp.com` while the API is `*.strapiapp.com`.
 */
function normalizeSourceOrigins(sourceOrigin) {
  if (!sourceOrigin) return [];
  const list = Array.isArray(sourceOrigin) ? sourceOrigin : [sourceOrigin];
  return list.map((o) => normalizeNoTrailingSlash(String(o).trim())).filter(Boolean);
}

export function buildGumletUrl(params) {
  const { src, gumletHost, sourceOrigin, width, quality } = params;
  if (!gumletHost) return src;

  const gumletBase = normalizeNoTrailingSlash(gumletHost);
  const srcUrl = tryUrl(src);
  if (!srcUrl) return src;

  const origins = normalizeSourceOrigins(sourceOrigin);
  if (origins.length > 0) {
    const allowed = origins.some((origin) => src.startsWith(origin));
    if (!allowed) return src;
  }

  // Validate width and quality to be positive integers
  const validatedWidth = Number.isInteger(width) && width > 0 ? width : 75;
  const validatedQuality = Number.isInteger(quality) && quality > 0 ? quality : 75;

  const out = new URL(`${gumletBase}${srcUrl.pathname}`);
  out.searchParams.set("w", String(validatedWidth));
  out.searchParams.set("q", String(validatedQuality));
  out.searchParams.set("auto", "format");
  return out.toString();
}