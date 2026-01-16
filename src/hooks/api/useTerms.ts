import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { TERMS_ENDPOINT } from "@/constants/apiConstants";

interface TermsSeo {
  id: number;
  title: string;
  name: string | null;
  content: string;
  rel: string | null;
  href: string;
}

interface TermsSection {
  id: number;
  title: string;
  content: any;
}

interface TermsData {
  page_title: string;
  last_updated: string;
  terms_conditions: TermsSeo;
  terms_conditions_section: TermsSection[];
}

interface TermsResponse {
  data: TermsData;
}

const fetchTerms = async (): Promise<TermsData> => {
  const { data } = await apiClient.get<TermsResponse>(TERMS_ENDPOINT);
  return data.data;
};

export const useTerms = () => {
  return useQuery({
    queryKey: ["terms"],
    queryFn: fetchTerms,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
