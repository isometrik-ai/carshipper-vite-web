import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { BlogResponse, BlogData } from "@/types/Blog.types";
import { BLOG_ENDPOINT } from "@/constants/apiConstants";

const fetchBlog = async (): Promise<BlogData> => {
    const { data } = await apiClient.get<BlogResponse>(BLOG_ENDPOINT);
    // The blog endpoint returns data directly in data.data, not nested in another data
    return data.data;
};

export const useBlog = () => {
    return useQuery({
        queryKey: ["blog"],
        queryFn: fetchBlog,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
