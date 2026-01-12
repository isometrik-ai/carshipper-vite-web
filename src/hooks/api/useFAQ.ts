import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

interface FAQResponse {
  data: {
    FaqCategories: any[];
    title: string;
    sub_title: string;
    loading_faq_msg: string;
    no_mached_msg: string;
    still_question_title: string;
    button_label: string;
    faq_helmet_title: string;
  };
}

const fetchFAQ = async () => {
  const { data } = await apiClient.get<FAQResponse>(
    "/api/faq?populate[FaqCategories][populate]=FAQS"
  );
  return data.data;
};

export const useFAQ = () => {
  return useQuery({
    queryKey: ["faq"],
    queryFn: fetchFAQ,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
