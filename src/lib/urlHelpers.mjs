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

export function buildGumletUrl(params) {
  const { src, gumletHost, sourceOrigin, width, quality } = params;
  if (!gumletHost) return src;

  const gumletBase = normalizeNoTrailingSlash(gumletHost);
  const srcUrl = tryUrl(src);
  if (!srcUrl) return src;

  if (sourceOrigin) {
    const origin = normalizeNoTrailingSlash(sourceOrigin);
    if (!src.startsWith(origin)) return src;
  }

  const out = new URL(`${gumletBase}${srcUrl.pathname}`);
  out.searchParams.set("w", String(width));
  out.searchParams.set("q", String(quality ?? 75));
  out.searchParams.set("auto", "format");
  return out.toString();
}
