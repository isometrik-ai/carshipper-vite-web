import { Query, useQuery } from "@tanstack/react-query";
import type { BlogPageResponse } from "@/types/BlogPage.types";
import { apiRequest } from "@/lib/api-client";
import { BLOG_QUERY } from "./blog.query.constants";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const fetchBlogPage = async (): Promise<BlogPageResponse> => {
  if (!STRAPI_API_URL || !STRAPI_API_URL.startsWith("http")) {
    throw new Error("Invalid STRAPI_API_URL");
  }

  return apiRequest<BlogPageResponse>(`${STRAPI_API_URL}/api/blog${BLOG_QUERY}`, { method: "GET" });
};

export const useBlogPage = () =>
  useQuery({
    queryKey: ["blog-page"],
    queryFn: fetchBlogPage,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    gcTime: 1000 * 60 * 60, 
    retry: 2,
    retryDelay: (i) => Math.min(1000 * 2 ** i, 5000),
    throwOnError: (error: Error, _query: Query<BlogPageResponse, Error, BlogPageResponse, string[]>) => {
      console.error("Blog page fetch error:", error);
      return true;
    },
  });
