import { useQuery } from "@tanstack/react-query";
import type { BlogPageResponse } from "@/types/BlogPage.types";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

/**
 * Fetches Blog page data from Strapi with full population
 */
const fetchBlogPage = async (): Promise<BlogPageResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/blog?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.blog-hero][populate]=*&populate[page_content][on][shared.blog-categories][populate][categories][populate]=*&populate[page_content][on][shared.newsletter-cta][populate]=*&populate[page_content][on][shared.blog-posts-display][populate]=*&populate[blog_posts][populate][cover][fields][0]=url&populate[blog_posts][populate][cover][fields][1]=alternativeText&populate[blog_posts][populate][cover][fields][2]=width&populate[blog_posts][populate][cover][fields][3]=height`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch blog page: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook for fetching Blog page data
 */
export const useBlogPage = () =>
  useQuery({
    queryKey: ["blog-page"],
    queryFn: fetchBlogPage,
    refetchOnWindowFocus: false,
  });
