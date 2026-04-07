import { useQuery } from "@tanstack/react-query";
import type { LandingPageResponse } from "@/types/LandingPage.types";
import { fetchLandingPageData } from "@/lib/landingPage.shared";

export const useLandingPage = (initialData?: LandingPageResponse) => {
  const queryResult = useQuery({
    queryKey: ["landing-page"],
    queryFn: fetchLandingPageData,
    initialData,
    refetchOnWindowFocus: false,
    refetchOnMount: initialData ? false : "always",
    staleTime: 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    throwOnError: true,
  });
  return queryResult;
};