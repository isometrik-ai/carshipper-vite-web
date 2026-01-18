import { useQuery } from "@tanstack/react-query";
import type { LandingPageResponse } from "@/types/LandingPage.types";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337/api";

const fetchLandingPage = async (): Promise<LandingPageResponse> => {
    const response = await fetch(
        `${STRAPI_API_URL}/landing-page?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.hero-section][populate][trust_indicators][populate]=*&populate[page_content][on][shared.hero-section][populate][statistics][populate]=*&populate[page_content][on][shared.hero-section][populate][background_image][fields][0]=url&populate[page_content][on][shared.hero-section][populate][background_image][fields][1]=alternativeText&populate[page_content][on][shared.hero-section][populate][background_image][fields][2]=width&populate[page_content][on][shared.hero-section][populate][background_image][fields][3]=height&populate[page_content][on][shared.stats-bar][populate][statistics][populate]=*&populate[page_content][on][shared.process-section][populate][steps][populate]=*&populate[page_content][on][shared.process-section][populate][cta_button][populate]=*&populate[page_content][on][shared.comparison-section][populate][columns][populate][features][populate]=*&populate[page_content][on][shared.comparison-section][populate][columns][populate][bullet_points][populate]=*&populate[page_content][on][shared.pricing-display][populate][routes][populate]=*&populate[page_content][on][shared.pricing-display][populate][cta_button][populate]=*&populate[page_content][on][shared.testimonials-display][populate][testimonials][populate]=*&populate[page_content][on][shared.testimonials-display][populate][ratings][populate]=*&populate[page_content][on][shared.faq-display][populate][faq_items][populate]=*&populate[page_content][on][shared.faq-display][populate][contact_cta][populate]=*&populate[page_content][on][shared.call-to-action][populate][primary_button][populate]=*&populate[page_content][on][shared.call-to-action][populate][secondary_button][populate]=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch landing page: ${response.statusText}`);
    }

    return response.json();
};

export const useLandingPage = () =>
    useQuery({
        queryKey: ["landing-page"],
        queryFn: fetchLandingPage,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
