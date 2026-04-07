import { apiRequest } from "@/lib/api-client";
import type { LandingPageResponse, SeoMetadata } from "@/types/LandingPage.types";
import { LANDING_QUERY } from "@/api/query.constants";

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ??
  (() => {
    throw new Error("Missing environment variable: NEXT_PUBLIC_STRAPI_API_URL");
  })();

export class LandingPageFetchError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "LandingPageFetchError";
  }
}

const toLandingPageFetchError = (error: unknown): LandingPageFetchError => {
  if (error instanceof LandingPageFetchError) return error;
  const message = error instanceof Error ? error.message : "Unknown error";
  return new LandingPageFetchError(`Failed to fetch landing page: ${message}`, error);
};

export const fetchLandingPageData = async (): Promise<LandingPageResponse> => {
  try {
    const response = await apiRequest<LandingPageResponse>(
      `${STRAPI_API_URL}/api/landing-page${LANDING_QUERY}`,
      { method: "GET" }
    );

    if (!response?.data) {
      throw new LandingPageFetchError("Landing page response is missing data");
    }

    return response;
  } catch (error) {
    throw toLandingPageFetchError(error);
  }
};

export const getLandingSeoFromData = (data?: LandingPageResponse): SeoMetadata | null => {
  return data?.data?.seo_metadata ?? null;
};

