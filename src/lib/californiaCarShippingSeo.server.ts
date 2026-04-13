import { createBoundedPromiseCache } from "@/lib/boundedPromiseCache";
import { fetchStrapiSeoMetadata } from "@/lib/seo/strapiSeo";
import type { SeoMetadata } from "@/types/LandingPage.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const HAS_VALID_STRAPI_API_URL =
  typeof STRAPI_API_URL === "string" &&
  (STRAPI_API_URL.startsWith("http://") || STRAPI_API_URL.startsWith("https://"));

const strapiBaseUrl = HAS_VALID_STRAPI_API_URL ? STRAPI_API_URL : undefined;

async function fetchCaliforniaSeo(): Promise<SeoMetadata | null> {
  return fetchStrapiSeoMetadata(strapiBaseUrl, "/api/california-car-shipping", 60, 8000);
}

/** Bounded in-memory memoization (LRU + TTL) so repeated metadata generation cannot grow without limit. */
export const getCaliforniaSeo = createBoundedPromiseCache(fetchCaliforniaSeo, {
  maxEntries: 16,
  ttlMs: 60_000,
  keyFn: () => "california-car-shipping-seo",
});
