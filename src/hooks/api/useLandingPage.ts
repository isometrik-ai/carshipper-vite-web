import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { LandingPageData } from "@/types/landing-page.types";

interface LandingPageResponse {
  data: LandingPageData;
}

const fetchLandingPage = async (): Promise<LandingPageData> => {
  const { data } = await apiClient.get<LandingPageResponse>(
    "/api/landing-page?populate[FAQSection][populate]=*&populate[TestimonialsSection][populate]=*&populate[landingPageSeo][populate]=*&populate[FinalCTA][populate]=*&populate[trustBar][populate]=*&populate[why_choose_us][populate]=*&populate[pricing_section][populate]=*&populate[hero_section][populate]=*"
  );
  return data.data;
};

export const useLandingPage = () => {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: fetchLandingPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
