import type { SeoMetadata } from "@/types/LandingPage.types";

export const STRAPI_SEO_FIELDS_QUERY =
  "populate[seo_metadata][fields][0]=meta_title" +
  "&populate[seo_metadata][fields][1]=meta_description" +
  "&populate[seo_metadata][fields][2]=meta_keywords" +
  "&populate[seo_metadata][fields][3]=canonical_url" +
  "&populate[seo_metadata][fields][4]=og_title" +
  "&populate[seo_metadata][fields][5]=og_description" +
  "&populate[seo_metadata][fields][6]=og_type" +
  "&populate[seo_metadata][fields][7]=og_url" +
  "&populate[seo_metadata][fields][8]=twitter_card" +
  "&populate[seo_metadata][fields][9]=twitter_title" +
  "&populate[seo_metadata][fields][10]=twitter_description" +
  "&populate[seo_metadata][fields][11]=robots";

type StrapiSeoResponse = {
  data?: {
    seo_metadata?: SeoMetadata | null;
  } | null;
};

export async function fetchStrapiSeoMetadata(
  apiBaseUrl: string | undefined,
  endpoint: string,
  revalidate = 60,
  timeoutMs = 8000,
  seoFieldsQuery = STRAPI_SEO_FIELDS_QUERY
): Promise<SeoMetadata | null> {
  if (!apiBaseUrl) return null;
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${apiBaseUrl}${endpoint}${separator}${seoFieldsQuery}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      next: { revalidate },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as StrapiSeoResponse;
    return payload?.data?.seo_metadata ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

