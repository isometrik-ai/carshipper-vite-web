import { cache } from "react";
import type { LandingPageResponse } from "@/types/LandingPage.types";
import { fetchLandingPageData } from "@/lib/landingPage.shared";

export const getLandingPageData = cache(async (): Promise<LandingPageResponse | undefined> => {
  try {
    return await fetchLandingPageData();
  } catch {
    return undefined;
  }
});
