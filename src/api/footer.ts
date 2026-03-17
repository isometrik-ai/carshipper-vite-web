import { useQuery } from "@tanstack/react-query";
import type { FooterResponse } from "@/types/Footer.types";
import { apiRequest } from "@/lib/api-client";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL;
const FOOTER_QUERY =
  "?populate[social_links][populate]=*&populate[link_groups][populate][links][populate]=*&populate[seo_link_groups][populate][links][populate]=*&populate[bottom_links][populate]=*";

const fetchFooter = (): Promise<FooterResponse> =>
  apiRequest<FooterResponse>(`${STRAPI_API_URL}/api/footer${FOOTER_QUERY}`, { method: "GET" });

export const useFooter = () =>
  useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (i) => Math.min(1000 * 2 ** i, 5000),
  });
