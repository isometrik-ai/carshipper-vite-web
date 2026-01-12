import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

interface PrivacySeo {
  title: string;
  name: string;
  content: string;
  rel: string;
  href: string;
}

interface PolicySection {
  id: number;
  title: string;
  content: any;
}

interface PrivacyData {
  page_title: string;
  last_updated: string;
  privacySeo: PrivacySeo[];
  policy_section: PolicySection[];
}

interface PrivacyResponse {
  data: {
    attributes?: PrivacyData;
  } | PrivacyData;
}

const fetchPrivacy = async (): Promise<PrivacyData> => {
  const { data } = await apiClient.get<PrivacyResponse>("/api/privacy?populate=*");
  // Handle both Strapi v4 and v5 response formats
  const extractedData = (data.data as any).attributes || data.data;
  return extractedData;
};

export const usePrivacy = () => {
  return useQuery({
    queryKey: ["privacy"],
    queryFn: fetchPrivacy,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
