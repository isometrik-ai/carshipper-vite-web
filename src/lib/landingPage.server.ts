import { cache } from "react";
import { fetchLandingPage } from "@/api/landingPage";
import type { LandingPageResponse, SeoMetadata } from "@/types/LandingPage.types";

export const getLandingPageData = cache(async (): Promise<LandingPageResponse | undefined> => {
  try {
    return await fetchLandingPage();
  } catch {
    return undefined;
  }
});

export const getLandingSeoFromData = (data?: LandingPageResponse): SeoMetadata | null => {
  return data?.data?.seo_metadata ?? null;
};

